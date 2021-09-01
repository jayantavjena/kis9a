## GORM

- [Go 言語の Gorm を実践投入する時に最低限知っておくべきことのまとめ【ORM】 - Qiita](https://qiita.com/ttiger55/items/3606b8dd570637c12387)

新規レコードを作成する時は Create
既存レコードを更新する時はできるだけ Update
更新時に空値を含めて Struct で更新したい場合は Save
更新時に空値を含めて Map で更新したい時は Update

- [GO の ORM を分かりやすくまとめてみた【GORM 公式ドキュメントの焼き回し】 - Qiita](https://qiita.com/gold-kou/items/45a95d61d253184b0f33)

migrate を使うことで得られるメリットは

スキーマが壊れにくい
正しい順番でマイグレーションを行うことができる。
スキーマ変更を効率的に行える
定義ファイルを作ることで複数の環境で同じマイグレーションを再現できる。
学習コストが低い
go 環境のマイグレーションツールは、他に goose や sql-migrate などがある。
これらは定義ファイルに -- +goose Up などの独自の記法で記載するが、migrate はそれがないので覚えることが少ない。
