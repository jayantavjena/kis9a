```
resource "aws_kms_key" "demo" {
  description             = "for demo"
  key_usage               = "ENCRYPT_DECRYPT"
  enable_key_rotation     = true
  deletion_window_in_days = 7
}

resource "aws_kms_alias" "demo" {
  name          = "alias/demo-alias"
  target_key_id = aws_kms_key.demo.id
}
```

# KEYID に登録

$ export KEYID=$(aws kms list-aliases \
--query 'Aliases[?AliasName==`alias/demo-alias`]' | jq -r '.[].AliasArn')

# 確認

$ echo $KEYID
arn:aws:kms:ap-northeast-1:{aws-account}:alias/demo-alias

export KEYID=$(aws kms list-aliases \
--query 'Aliases[?AliasName==`alias/palette-explorer-prod`]' | jq -r '.[].AliasArn')

