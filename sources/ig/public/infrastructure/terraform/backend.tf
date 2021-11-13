terraform {
  backend "s3" {
    key                    = "kis9a-ig.tfstate"
    bucket                 = "kis9a-terraform-states"
    region                 = "ap-northeast-1"
    encrypt                = true
    skip_region_validation = true
  }
}
