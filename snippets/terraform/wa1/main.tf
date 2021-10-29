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
  default = "Z0540267XUON08PR449J"
}

variable "aws_profile" {
  type    = string
  default = "kis9a"
}

variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "instance_image" {
  type    = string
  default = "ami-0df99b3a8349462c6" # ubuntu 20.04
}

variable "acm_certificate_arn" {
  type    = string
  default = "arn:aws:acm:ap-northeast-1:298276046670:certificate/9c14a474-4fa4-4713-876a-deca1facab93"
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
resource "aws_security_group" "ec2" {
  name   = "${var.name}-ec2"
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

  tags = {
    Name = var.name
  }
}

resource "aws_security_group" "alb" {
  name   = "${var.name}-alb"
  vpc_id = aws_vpc.this.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.name
  }
}

## ec2
resource "aws_instance" "this" {
  count                  = 1
  ami                    = var.instance_image
  instance_type          = var.instance_type
  key_name               = var.name
  vpc_security_group_ids = ["${aws_security_group.ec2.id}"]
  subnet_id              = aws_subnet.a.id
  iam_instance_profile   = aws_iam_instance_profile.this.name

  tags = {
    Name = var.name
  }
}

## eip
resource "aws_eip" "this" {
  vpc      = true
  instance = aws_instance.this[0].id
}

## alb
resource "aws_lb" "this" {
  name                       = var.name
  security_groups            = [aws_security_group.alb.id]
  subnets                    = [aws_subnet.a.id, aws_subnet.c.id]
  internal                   = false
  enable_deletion_protection = false

  tags = {
    Name = var.name
  }
}

resource "aws_lb_target_group" "this" {
  name       = var.name
  depends_on = [aws_lb.this]
  port       = 80
  protocol   = "HTTP"
  vpc_id     = aws_vpc.this.id


  health_check {
    protocol            = "HTTP"
    path                = "/"
    port                = 80
    unhealthy_threshold = 5
    timeout             = 5
    interval            = 10
    matcher             = 200
  }
}

resource "aws_lb_target_group_attachment" "this" {
  count            = 1
  target_group_arn = aws_lb_target_group.this.arn
  target_id        = aws_instance.this[0].id
  port             = 80
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.this.arn
  certificate_arn   = var.acm_certificate_arn
  port              = "443"
  protocol          = "HTTPS"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.id
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
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

## SSM
data "aws_iam_policy_document" "this" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "this" {
  name               = "ssm-role-ec2"
  assume_role_policy = data.aws_iam_policy_document.this.json

  tags = {
    Name = var.name
  }
}

data "aws_iam_policy" "this" {
  arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = data.aws_iam_policy.this.arn
}

resource "aws_iam_instance_profile" "this" {
  name = "${var.name}-ssm-role-ec2"
  role = aws_iam_role.this.name

  tags = {
    Name = "${var.name}-ssm-role-ec2"
  }
}

module "stop_ec2_instance" {
  source                         = "diodonfrost/lambda-scheduler-stop-start/aws"
  name                           = "${var.name}_instance_stop"
  cloudwatch_schedule_expression = "cron(0 14 * * ? *)"
  schedule_action                = "stop"
  ec2_schedule                   = "true"
  scheduler_tag = {
    key   = "Name"
    value = var.name
  }
}

module "start_ec2_instance" {
  source                         = "diodonfrost/lambda-scheduler-stop-start/aws"
  name                           = "${var.name}_instance_start"
  cloudwatch_schedule_expression = "cron(0 1 * * ? *)"
  schedule_action                = "start"
  ec2_schedule                   = "true"
  scheduler_tag = {
    key   = "Name"
    value = var.name
  }
}
