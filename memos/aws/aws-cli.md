> [aws-cli でパラシを作ろう # 目次](https://zenn.dev/yamadayu/articles/19a250b2fc87c4)

```
aws s3api list-buckets \
    --output json \
    --query "Buckets[].{Name:Name, CreationDate:CreationDate}" \
    | jq -r ".[] \
    | [.Name, .CreationDate] \
    | @csv"

aws iam list-roles \
    --output json \
    --query "Roles[].{RoleName:RoleName, Arn:Arn, Description:Description, Path:Path, CreateDate:CreateDate}" \
    | jq -r ".[] \
    | [.RoleName, .Arn, .Description, .Path, .CreateDate ] \
    | @csv"

aws iam list-policies \
    --output json \
    --query "Policies[].{PolicyName:PolicyName, Path:Path, AttachmentCount:AttachmentCount, CreateDate:CreateDate, UpdateDate:UpdateDate}" \
    | jq -r ".[] \
    | [.PolicyName, .Path, .AttachmentCount, .CreateDate, .UpdateDate ] \
    | @csv"

aws sns list-topics \
    --output json \
    --query "Topics[].{TopicArn:TopicArn}" \
    | jq -r ".[] | [.TopicArn] | @csv"

aws lambda list-functions \
    --output json \
    --query "Functions[].{FunctionName:FunctionName, Description:Description, PackageType:PackageType, Runtime:Runtime, CodeSize:CodeSize, MemorySize:MemorySize, Timeout:Timeout, LastModified:LastModified}" \
    | jq -r ".[] \
    | [.FunctionName, .Description, .PackageType, .Runtime, .CodeSize, .MemorySize, .Timeout, .LastModified] \
    | @csv"
```
