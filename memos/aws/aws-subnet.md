| 名称            | 概要                                           |
| --------------- | ---------------------------------------------- |
| Public Subnet   | Internet Gateway へのルートを持つ              |
| Private Subnet  | Internet へのルートを持たない                  |
| Nat Subnet      | NAT Gateway へのルートを持つ                   |
| Transit Subnet  | Transit Gateway へアタッチする                 |
| Internal Subnet | Direct Connect や VPN でオンプレミスと接続する |
| LB Subnet       | ALB, NLB 専用のサブネット                      |

| サブネットマスク | サブネット数 | サブネット当たりの IP アドレス数 |
| ---------------- | ------------ | -------------------------------- |
| /18              | 4            | 16,379                           |
| /20              | 16           | 4091                             |
| /22              | 64           | 1019                             |
| /24              | 256          | 251                              |
| /26              | 1,024        | 59                               |
| /28              | 4,096        | 11                               |

| ホストアドレス | 用途                           |
| -------------- | ------------------------------ |
| .0             | ネットワークアドレス           |
| .1             | VPC ルータ                     |
| .2             | Amazon が提供する DNS サービス |
| .3             | AWS で予約されているアドレス   |
| .255           | ブロードキャストアドレス       |

システムは Multi-AZ で組みたいものです。
どの AZ に置くかということに悩む人は少ないかもしれません。
ほとんどは 2 つ、東京リージョンだと AZ-A と AZ-C が多いように思います。

私のお薦めは 全ての AZ に置く です。
外部接続の都合などで VPC CIDR を狭くしないとならないケースを除いて、VPC CIDR を大きくとり数多くのサブネットを作れるようにしておくべきです。

その理由の 1 つは AZ 障害発生時の切り離しを素早く行うためです。
[複数の Availability Zone にプロビジョニングした ELB(ALB) / AutoScaling Group から特定 Availability Zone 上のリソースをパージする | DevelopersIO](https://dev.classmethod.jp/articles/purge-resources-specific-az/)
