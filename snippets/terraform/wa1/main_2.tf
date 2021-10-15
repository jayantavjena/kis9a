# backend
terraform {
  backend "s3" {
    key                    = "terraform-wa_1.tfstate"
    bucket                 = "kis9a-terraform-states"
    region                 = "ap-northeast-1"
    profile                = "kis9a"
    encrypt                = true
    skip_region_validation = true
  }
}

# provider
provider "aws" {
  profile                = var.aws_profile
  region                 = var.aws_region
  skip_region_validation = true
}

provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

# variables
variable "name" {
  type    = string
  default = "wa1"
}

variable "domain" {
  type    = string
  default = "kis9b.com"
}

variable "sub_domain" {
  type    = string
  default = "wa1.kis9b.com"
}

variable "host_zone_id" {
  default = "Z05827262KY6L97QK16DY" # kis9b.com
}

variable "aws_profile" {
  type    = string
  default = "kis9a"
}

variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "instance-type" {
  type    = string
  default = "t2.micro"
}

variable "instance-name" {
  type    = string
  default = "wa1"
}

variable "instance-image" {
  type    = string
  default = "ami-0df99b3a8349462c6" # ubuntu 20.04
}

# resources
## vpc
resource "aws_vpc" "this" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = var.name
  }
}

## subnet (a)
resource "aws_subnet" "a" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-1a"

  tags = {
    Name = "${var.name}-1a"
  }
}

### subnet (c)
resource "aws_subnet" "c" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ap-northeast-1c"

  tags = {
    Name = "${var.name}-1c"
  }
}

### route_table (0.0.0.0/0)
resource "aws_route_table" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = var.name
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.wa1-web_GW.id
  }
}

### route_table (a)
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.a.id
  route_table_id = aws_route_table.this.id
}

### route_table (c)
resource "aws_route_table_association" "c" {
  subnet_id      = aws_subnet.c.id
  route_table_id = aws_route_table.this.id
}

### gateway
resource "aws_internet_gateway" "wa1-web_GW" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = var.name
  }
}

# security_group
resource "aws_security_group" "this" {
  name   = var.name
  vpc_id = aws_vpc.this.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    to_port     = 22
    from_port   = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = var.name
  }
}

##  network interface
resource "aws_network_interface" "this" {
  subnet_id = aws_subnet.a.id

  tags = {
    Name = var.name
  }
}

## ec2
resource "aws_instance" "this" {
  count         = 1
  ami           = var.instance-image
  instance_type = var.instance-type
  key_name      = var.name

  network_interface {
    network_interface_id = aws_network_interface.this.id
    device_index         = 0
  }

  tags = {
    Name = var.name
  }
}

## eip
resource "aws_eip" "this" {
  instance = aws_instance.this[0].id
  vpc      = true
}


## alb
resource "aws_lb" "this" {
  name                       = var.name
  security_groups            = [aws_security_group.this.id]
  subnets                    = [aws_subnet.a.id, aws_subnet.c.id]
  internal                   = false
  enable_deletion_protection = false

  tags = {
    Name = var.name
  }
}

resource "aws_lb_target_group" "this" {
  name        = var.name
  depends_on  = [aws_lb.this]
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.this.id
  target_type = "ip"


  health_check {
    protocol            = "HTTP"
    path                = "/ping"
    port                = 80
    unhealthy_threshold = 5
    timeout             = 5
    interval            = 10
    matcher             = 200
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.this.arn
  # certificate_arn   = aws_acm_certificate.this.arn
  certificate_arn = aws_acm_certificate.this.arn
  port            = "443"
  protocol        = "HTTPS"
  depends_on = [
    aws_acm_certificate.this
  ]

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.id
  }
}

## Route53
resource "aws_route53_record" "this" {
  type    = "A"
  name    = var.sub_domain
  zone_id = var.host_zone_id

  alias {
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  ttl             = 60
  allow_overwrite = true
  zone_id         = var.host_zone_id
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  depends_on      = [aws_acm_certificate.this]
}

## ACM
resource "aws_acm_certificate" "this" {
  provider          = aws.virginia
  domain_name       = var.sub_domain
  validation_method = "DNS"
  tags = {
    Name = var.name
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
}
