## VPC

- Virtual Private Cloud の略で、AWS アカウントを作成するとデフォルトで作成される。
- ネットワーク的に分離された領域。インターネット GW をアタッチしないと外と通信もできない。
- FW はセキュリティグループと呼ばれるもので制御する。
- VPC の中にサブネットを作成し、セグメント単位での管理が可能
- ルートテーブルでルーティング制御ができる

## VPC 設計

IP アドレスの範囲は rfc1918 に準拠した範囲を指定すること
http://www.faqs.org/rfcs/rfc1918.html

10.0.0.0 - 10.255.255.255 (10/8 プレフィックス)
172.16.0.0 - 172.31.255.255 (172.16/12 プレフィックス)
192.168.0.0 - 192.168.255.255 (192.168/16 プレフィックス)

## VPC ピアリングの特徴

- IP アドレスの重複がないこと
- 同じリージョンであること
- 二つ先の VPC には直接通信ができない。

- 環境(本番、ステージング、開発)で VPC を分ける
- いったん攻撃を受けてしまったら、同一 VPC は影響を受ける可能性が非常に高い
- レイヤー(WEB、DB、フロント(LB))はサブネットで分ける
- インターネットとの接続点は明確に最小限に分けておく

| 環境 | IP
| Prod | 10.0.0.0/16
| Stg | 10.1.0.0/16
| Dev | 10.2.0.0/16

1 本番環境 10.100.0.0/16 10.100.0.0/24~10.100.255.0/24
2 検証環境 10.101.0.0/16 10.101.0.0/24~10.101.255.0/24
3 開発環境 10.102.0.0/16 10.102.0.0/24~10.102.255.0/24

[Amazon VPC 設計時に気をつけたい基本の 5 のこと | DevelopersIO](https://dev.classmethod.jp/articles/amazon-vpc-5-tips/)
