- [github actions で zenn 記事の予約投稿を実現する](https://zenn.dev/ryo_kawamata/articles/schedule-publish-on-zenn-article)
- [昔作った GitHub の Label を供養する](https://zenn.dev/sh090/articles/8291abdb1be48f5765ec)
- [github-script は便利です - Qiita](https://qiita.com/bugfire/items/a2fa85fa58dd20322e3f)
- [GitHub Actions の記事一覧 | Zenn](https://zenn.dev/topics/githubactions)
- [GitHub - actions/checkout: Action for checking out a repo](https://github.com/actions/checkout)
- [GitHub - actions/github-script: Write workflows scripting the GitHub API in JavaScript](https://github.com/actions/github-script)
- [GitHub - technote-space/get-diff-action: GitHub Actions to get git diff](https://github.com/technote-space/get-diff-action)
- [awesome-terraform-pipeline/awesome-terraform-pipeline.yml at main · bmbferreira/awesome-terraform-pipeline · GitHub](https://github.com/bmbferreira/awesome-terraform-pipeline/blob/main/.github/workflows/awesome-terraform-pipeline.yml)

- [github-action-push-to-another-repository/action.yml at main · cpina/github-action-push-to-another-repository · GitHub](https://github.com/cpina/github-action-push-to-another-repository/blob/main/action.yml)

```
# name: test

# on:
#   push:
#     branches:
#       - main
#   pull_request:
#     branches:
#       - main

# jobs:
#   tf_plan:
#     runs-on: ubuntu-latest
#     strategy:
#       matrix:
#         dir: [infra/]
#     steps:
#       # - uses: actions/checkout@v2
#       - uses: hashicorp/setup-terraform@v1.2.1
#         with:
#           terraform_version: 0.15.3

#       - name: Terraform format
#         id: fmt
#         run: terraform fmt -check -recursive
#         working-directory: ${{ matrix.dir }}
#         continue-on-error: true

#       - name: Configure aws credentials
#         uses: aws-actions/configure-aws-credentials@v1
#         with:
#           aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
#           aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
#           aws-region: ap-northeast-3

#       - name: Terraform Init
#         id: init
#         run: terraform init
#         working-directory: ${{ matrix.dir }}

#       - name: Terraform Plan
#         id: plan
#         run: terraform plan -no-color
#         continue-on-error: true
```

CircleCI（テストやデプロイなど）
GitHub Actions（テストやデプロイなど）
AWS CodeBuild（主に Terraform など AWS リソースにアクセスする場合）
Google Cloud Build（主に Google Cloud のリソースにアクセスする場合）
Jenkins（定期実行や手動実行に特化したジョブ）
このうち GitHub Actions は以下の点が優れていると感じています。

monorepo 構成の場合にマイクロサービスごとに独立して Workflow を定義できる
公開 Action のエコシステムが発達している
Workflow の定期実行やパラメータ付き手動実行にも対応している
一方で、クラウドに統合されている CI サービスと比較すると、GitHub Actions には以下の課題があります。

Organization あたりのジョブの同時実行数が制限されている（正確な情報はドキュメントを参照してください）
実行環境からクラウドリソースにアクセスするにはクレデンシャル（例えば AWS では IAM access key）を渡す必要があるが、漏洩リスクやローテーション管理負荷を考えると避けたい
実行環境の時間単価が若干高めに設定されている
GitHub Actions には Self-hosted Runner という仕組みがあり、自分で用意した環境でジョブを実行することも可能です。 Self-hosted Runner を利用するとこれらの課題を解決できるのではないかと考えました。

GitHub Actions (GitHub-hosted Runner) には以下の課題があることを冒頭で説明しました。

Organization あたりのジョブの同時実行数が制限されている
実行環境からクラウドリソースにアクセスするにはクレデンシャルを渡す必要があるが、漏洩リスクやローテーション管理負荷を考えると避けたい
実行環境の時間単価が若干高めに設定されている
Self-hosted Runner の導入により、以下のように課題を解決できたと考えています。

同時実行数の制限がなくなった
IAM Roles for Service Accounts を利用することで、クレデンシャルを使わずに権限を割り当てられる（セキュリティの改善）
EC2 Spot Instances を利用することで、インスタンスの時間単価を抑えられる（コストの改善）

```
name: zenn
on:
  schedule:
    - cron: "* * * * 1"
  push:
    branches:
      - master

jobs:
  zenn:
    runs-on: ubuntu-20.04
    env:
      REPO_TOKEN: ${{ secrets.REPO_TOKEN }}
    steps:
      - name: install go
        uses: actions/setup-go@v2
        with:
          go-version: ^1.16
      - name: version
        run: go version
      - name: go get aws-services
        run: go get github.com/kis9a/aws-services
      - name: checkout
        uses: actions/checkout@v2
        with:
          repository: kis9a/kis9a
          path: kis9a
      - name: update zenn article
        run: |
          cd kis9a/
          git config user.name "kis9a"
          git config user.email "kis9ax@gmail.com"
          aws-services jp -t zenn/articles/aws-services.template -o zenn/articles/aws-services.md
          ls -la zenn/articles
          echo $REPO_TOKEN
          git add zenn/articles/aws-services.md
          git push https://kis9a:$REPO_TOKEN@github.com/kis9a/kis9a.git

```

```
name: Test

on: [push]

jobs:
  skipci:
    runs-on: ubuntu-18.04
    steps:
      - run: echo "[skip ci] ${{ contains(github.event.head_commit.message, '[skip ci]') }}"

  test:
    runs-on: ubuntu-18.04
    if: contains(github.event.head_commit.message, '[skip ci]') == false
    steps:
```
