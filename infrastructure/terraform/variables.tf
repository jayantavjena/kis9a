variable "bucket_name" {
  type = string
}

variable "region" {
  type = string
}

variable "host_zone_id" {
  type    = string
  default = "Z09579232JIYGMEX3JQS5"
}

variable "domain" {
  type    = string
  default = "ig.kis9a.com"
}

variable "ssl_domain" {
  type    = string
  default = "arn:aws:acm:us-east-1:298276046670:certificate/55c5ce44-b780-45ea-b5b2-c550cdcde710"
}
