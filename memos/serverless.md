- serverless framework
- Auth0
- Algolia
- stdlib
- dynamodb / lambda / s3 / sqs / api gateway / cloud watch / sns / cloudwatch event

sls deploy command

<https://github.com/memememomo/clean-serverless-book-sample>

- [Serverless Framework での AWS Lambda + Go ローカル開発事情 - Qiita](https://qiita.com/frozenbonito/items/effcc31ca2117789f0e9)

[AWS SAM と Golang で Lambda 関数の開発環境をつくる | デロイト トーマツ ウェブサービス株式会社（DWS）公式ブログ](https://blog.mmmcorp.co.jp/blog/2018/06/08/aws-sam-go/)

sls invoke local --function read

sls invoke local --function read --data 'text'

sls deploy --region ap-northeast-1

cloudWatch

> environment でテーブル名を環境変数に設定している
> ${self:xxx}はserverless.ymlの内容を、${opt:xxx}はコマンドライン引数にアクセスできる
> たとえば sls deploy --stage prod が実行されたら${opt:stage}はprodになる
${opt:xxx, self:xxx}の場合、前者が存在すればその値を、なければ後者の値を使用する
> ${self:provider.stage}のデフォルト値は'dev'
ということで今回は引数がなければDYNAMODB_TABLE=sls-hello-world-devが環境変数に追加される
> iamRoleStatementsでlambdaから他のAWSリソースを触る際に必要なIAMロールを設定する
ActionでDynamoDBへの各種アクションを許可
Resourceで対象となるリソースを設定
${opt:region, self:provider.region}は前述の通り region が引数として指定されていればその値を、なければ provider の値を、それもなければデフォルト値（us-east-1）が使用される
> 今回は region:us-west-2 を指定しているのでリソース名は arn:aws:dynamodb:us-west-2:\*:table/sls-hello-world-dev となる

[Serverless Framework 勉強する](https://zenn.dev/kawarimidoll/scraps/258ef38ecfdd39)

```yml
plugins:
  - serverless-domain-manager

custom:
  customDomain:
    domainName: api.domain.com
    basePath: lambda
    certificateName: "*.domain.com"
    createRoute53Record: true
    endpointType: "regional"
    securityPolicy: tls_1_2
```

[Serverless アプリケーションをローカルで開発する - Qiita](https://qiita.com/noralife/items/e36621ddd0e5b8ff4447)
[Serverless Framework &amp; Docker によるローカルフレンドリーな Lambda 開発・運用](https://zenn.dev/samuraikun/articles/4b5e2becae7c6b)

[Vercel を使わずに AWS だけで Next.js の ISR 対応!【serverless-next.js】](https://zenn.dev/makumattun/articles/6e260f3a5af117)

[AWS cognito を使って React SPA に認証機能を導入してみた](https://zenn.dev/tatsurom/articles/b6e5fc200035a0ef9467)
[真のサーバーレスに一段近づけるフロントエンドアーキテクチャーの話](https://zenn.dev/teatwo/articles/efb99ea52876fb)
[DynamoDB + Lambda + CloudFront + S3 でシンプルなウェブサービスを作る話](https://zenn.dev/yutafujii/articles/8dc4be02ade7ef)
[API Gateway + Lambda + DynamoDB でサーバーレスな API 作成](https://zenn.dev/ombran/articles/serverless-apigateway-lambda-dynamodb)
