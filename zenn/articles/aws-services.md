---
title: "AWSサービス一覧（{{.Date}}更新)"
slug: "aws-services-scraping-{{.Date}}"
emoji: "📆"
type: "tech"
topics: ["aws", "githubactions", "scraping"]
published: false
---

## AWS サービス一覧

{{.Content}}

## 概要

Qiita の記事（[AWS サービス一覧（2019/03 版）※2021/05/11 更新 - Qiita](https://qiita.com/moritalous/items/31a56acbf2ce367b712d)）のコンセプトを真似しました。また Zenn での自動更新系の記事の作成方法を Github Actions の scheduler で試してみようと思いこの記事を作成しました。  
ページの構造がやや複雑で、変更に弱そうな、セレクタを設定しコードが冗長になりそうだったので、サービスごとのグループ分けはしてません。重たい、AWS の公式サイト、Qiita を開きたくない個人用です。

## 更新履歴

[Search · update by .github/workflows/zenn-aws-services.yml · GitHub](https://github.com/kis9a/kis9a/search?q=update+by+.github%2Fworkflows%2Fzenn-aws-services.yml&type=commits)

## スクリプト

毎週 UTC13:00 頃（[crontab.guru/#0*13*\_\_\_\_1](https://crontab.guru/#0_13_*_*_1)）にチェックアウトして、  
自作のスクレイピングコマンド （[GitHub - kis9a/aws-services](https://github.com/kis9a/aws-services/)）で、
テンプレートファイル（[scripts/aws-services/aws-services.template](https://github.com/kis9a/kis9a/blob/master/zenn/scripts/aws-services/aws-services.template)）を介して、  
記事（[articles/aws-services.md](https://github.com/kis9a/kis9a/blob/master/zenn/articles/aws-services.md)）を更新して、コミットしています。

### Action

:::details .github/workflows/zenn-aws-services.yml

```yml:.github/workflows/zenn-aws-services.yml
name: zenn-aws-services

on:
  push:
    branches:
      - master
    paths:
      - ".github/workflows/zenn-aws-services.yml"
      - "zenn/articles/aws-services.md"
      - "zenn/scripts/aws-services/*"
  schedule:
    - cron: "0 13 * * 1"

jobs:
  zenn:
    runs-on: ubuntu-20.04
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
      - name: update zenn article
        run: |
          aws-services jp -t zenn/scripts/aws-services/aws-services.template -o zenn/articles/aws-services.md
      - uses: stefanzweifel/git-auto-commit-action@v3.0.0
        with:
          commit_message: update by .github/workflows/zenn-aws-services.yml
```

:::
