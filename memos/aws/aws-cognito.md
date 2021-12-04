[Cognito ユーザープールことはじめ | ゴミ箱](https://53ningen.com/cognito-userpool-tutorial/)

serverless application -> userpopl

```

Cognito User Pool
^
|
User

-- access-token --> API Gateway -- context -> Lambda -> DynamoDB

```

```
Cognito Identity Pool
^
|
User -- Temporary AWS Credentials -> AppSync -> DynamoDB
         |-> S3

```

```
Google, Facebook
^
|
Cognito User Pool
         ^
         |
User -> ALB -> Fargate
```

```
Backeup system Every 12 hour (cloudwatch event rule)

Cognito User Pool < -- fetch data -- CodeBuild -- upload CSV --> S#

```
