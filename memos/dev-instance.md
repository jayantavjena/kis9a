## 何故か?

同一のローカル開発環境を複数の PC に構築するのがめんどくさい。
データベース等も、docker-compose 等使用して、ローカルから SSH 接続して使用する。
開発環境も SSH クライアントがあれば、使用できるので良い。

## 開発段階

スペックを t2.micro で実験しコスト削減。

## インスタンス スペック

- AMI origin: ubuntu 20.04 ami-0df99b3a8349462c6
- t2.medium, CPU 2, memory 4, 5000(yen)/month, 720h.

## インフラ周りのプロビジョニング

terraform: v1.0

## ミドルウェアのプロビジョニング

terraform とは別に実行する。
terraform で作成したリソースの値の取得を awscli で持ってくる。
Ansible 等でプロビジョニングする。

### SSM でのインスタンスログイン

<!-- ### 基本的な構成は、VPC の上にネットワークを構成する。 -->

-> 複雑化させないために必要になれば検討。

### EIP を関連ずける。

### Git 管理。

<https://github.com/kis9a/terraform-dev1>

## コスト削減

必要な時間帯だけインスタンスを起動 -> JST AM:10 ~ PM:12

## MySQL

mysql:8

## PostgreSQL

psql:14

## Mosh

## Local PC の 設定。

## nvim を使用して快適な開発ができる。

## 便利なツール群のインストールと自動化。

aws-cli, docker, terraform, ansible, gh, jq, pup, html2md, redis, shellcheck, watchman.
tmux, zsh, z, fzf, fd, ripgrep, mosh, nginx.

## dotfiles の管理。最適化。環境依存の解決。

## 各言語の開発環境の構築。

Go, Lua, Node, Rust, Python.

## セキュリティーの強化。

### Linux ユーザーの作成。パスワード設定。

### credential なファイル群の権限管理。

### root user にパスワードを設定 -> sudo su - の禁止。

### インスタンスログイン、SSH, SSM + ... 認証。

### ec2 auto-scaling で月に一度インスタンスを新規に作成する。

- この際の要件。local pc でホスト名の設定。
- データベースのデータを移行する。

## iPad の Blink-shell からログイン。
