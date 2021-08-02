## Local editing

##### dev: Only copy template on save

- [sar configuration ./sar.toml](./sar.toml)

```sh
(cd $PROFILE; sar -c zenn/scripts/aws-services/sar.toml)
```

##### prod: Actually replace {{.Content}}

```
aws-services jp -t zenn/scripts/aws-services/aws-services.template -o zenn/articles/aws-services.md
```

##### pre-installation

```go
go get github.com/kis9a/sar
go get github.com/kis9a/aws-services
```

- [GitHub - kis9a/sar: save and run](https://github.com/kis9a/sar)
- [GitHub - kis9a/aws-services: output aws service name and short description table](https://github.com/kis9a/aws-services)
