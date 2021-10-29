# backend
terraform {
  backend "s3" {
    key                    = "terraform-wa_2.tfstate"
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
  default = "wa2"
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
  default = "t2.nano"
}

variable "instance_image" {
  type    = string
  default = "ami-0df99b3a8349462c6" # ubuntu 20.04
}

## ec2
resource "aws_instance" "this" {
  count         = 1
  ami           = var.instance_image
  instance_type = var.instance_type
  key_name      = var.name

  tags = {
    Name = var.name
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
