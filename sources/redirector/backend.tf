# backend
terraform {
  backend "s3" {
    key     = "terraform-wa_1.tfstate"
    bucket  = "kis9a-terraform-states"
    region  = "ap-northeast-1"
    profile = "kis9a"
    encrypt = true
  }
}

# provider
provider "aws" {
  profile = "kis9a"
  region  = "ap-northeast-1"
}

provider "aws" {
  alias   = "cloudfront"
  profile = "kis9a"
  region  = "ap-northeast-1"
}
