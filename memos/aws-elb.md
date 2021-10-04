- [AWS 入門 ELB を使った負荷分散（ロードバランサー） - Qiita](https://qiita.com/tseno/items/2041e82a7f2f8e721a18)

[Elastic Load Balancing（複数のターゲットにわたる着信トラフィックの分配）| AWS](https://aws.amazon.com/jp/elasticloadbalancing/?whats-new-cards-elb.sort-by=item.additionalFields.postDateTime&whats-new-cards-elb.sort-order=desc)

- Application Load Balancer（ALB） L7 レイヤーでの負荷分散を行う。CLB より後に登場。

[Application Load Balancer とは? - Elastic Load Balancing Application Load Balancer とは? - Elastic Load Balancing](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/introduction.html)

Elastic Load Balancing は、受信したトラフィックを複数のアベイラビリティーゾーンの複数のターゲット (EC2 インスタンス、コンテナ、IP アドレスなど) に自動的に分散させます。登録されているターゲットの状態をモニタリングし、正常なターゲットにのみトラフィックをルーティングします。Elastic Load Balancing は、受信トラフィックの時間的な変化に応じて、ロードバランサーをスケーリングします。また、大半のワークロードに合わせて自動的にスケーリングできます。

Elastic Load Balancing は、Application Load Balancer、Network Load Balancer、Gateway Load Balancer、Classic Load Balancer といったロードバランサーをサポートします。
