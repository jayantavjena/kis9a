> [VPC CIDR についてちょっと調べた - Qiita](https://qiita.com/daikissdd/items/101679f19de246f22df4)

1. VPC の作成
   まず全ての入れ物を作る（アドレスの範囲を設定 ※あとから変更できない）
   CIDR block:[/28](16個のアドレスが設定できる) 〜 [/16](16個のアドレスが設定できる)

2. Subnet の作成
   次に小分け袋を作る（Network ACL により、どこと通信できるか設定）
   こちらも Subnet ごとにアドレスを設定できる
   AZ ごとと private ごとに subnet を作る

3. Route Table の作成
   Subnet 間や外部通信用の設定
   Subnet と Internet Gateway の設定
   メインテーブルとして設定する

4. Internet Gateway の作成
   インターネットと通信することを Route Table に許可する
   VPC にアタッチして、Route Table に紐づける

5. Network ACL の設定
   Subnet の InBound（内部への通信）と OutBound（外部への通信）制御の設定
   デフォルトで OK

6. Security Group の設定
   インスタンスの InBound（内部への通信）と OutBound（外部への通信）制御の設定
   インスタンスごとに作成

> CIDR とは IP アドレスの記述形式です。
> VPC 内で決める IP アドレスは、VPC 内でのみ利用するため自由に設定できます。（いくつかのルールは存在します）
> 1 つの CIDR ブロックを VPC に割り当てることができま。
> 許可されているのは、/28 ネットマスクから /16 ネットマスクの間のブロックサイズです。
> つまり、VPC には 16 ～ 65,536 個の IP アドレスを含めることができます。
