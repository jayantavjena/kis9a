[ECS 運用のノウハウ - Qiita](https://qiita.com/naomichi-y/items/d933867127f27524686a)
[コンテナ運用に関する 7 つのベストプラクティス - TechLunch](https://techlunch.hatenablog.com/entry/2018/08/16/095749)

コントロールプレーン ECS EKS
データプレーン EC2 Fargate

ECS task definition container definition cluster service
fargate task execution
ECS servie

latest 運用はやめよう

- deploy structure

- buildspec.yml

codepipeline -> codecommit -> codebuild
-> tag -> ecr
-> s3 definition.json, ECS

github action

- configure-aws-credentials

- amazon-ecr-login

- amazon-ecs-render-task-definition

- amazon-ecs-deploy-task-definition

IaC との競合

- don't manage all resource in IaC
- task definition placeholder, application deploy cycle
- terraform lifecycle block ignore resource diff
