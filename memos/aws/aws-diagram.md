[DynamoDB を使いこなして精神的安定を手に入れた - Qiita](https://qiita.com/walkers/items/9b39d752cc5b8df7b4b5#%E7%94%A8%E8%AA%9E%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0)

```
aws dynamodb put-item --table-name Music --item '{ "Artist": "apple" }'
aws dynamodb put-item --table-name Music --item '{ "Artist": "apple" }'
aws dynamodb put-item --table-name Music --item '{ "Artist": "apple" }'
aws dynamodb scan --table-name Music
aws dynamodb get-item --table-name Music  --key '{ "Artist": "apple" }'
aws dynamodb query --table-name Music --key-condition-expression 'Artist = :Artist' --expression-attribute-values '{ ":Artist"
: "apple"}'
```

[DynamoDB のキー・インデックスについてまとめてみた - Qiita](https://qiita.com/shibataka000/items/e3f3792201d6fcc397fd)

> o dynamo{{{

- パーティションキー
- ソートキー
- プライマリキー
- ローカルセカンダリインデックス
- グローバルセカンダリインデックス

パーティションキー
データをどのパーティションに配置するか決定する。
各パーティションへのアクセスがなるべく均一になるようパーティションキーを設計すると良い。
ソートキー
ソートキーによってデータはパーティション内で並べ替えられて物理的に近くなるように配置される。
QueryAPI ではソートキーを指定して取り出すデータの範囲をフィルタできる。
ソートキーの設定は任意。
プライマリキー
「パーティションキー」または「パーティションキーとソートキーの複合キー」のこと。
プライマリキーによってデータは一意に識別される。

API

- データの作成
  - PutItem
    プライマリキーを指定して単一のデータを書き込む。
  - BatchWriteItem
    PutItem のバッチ版。
- データの読み取り
  - GetItem
    プライマリキーを指定して単一のデータを取り出す。
  - BatchGetItem
    GetItem のバッチ版。
  - Query
    パーティションキーを指定して複数のデータを取り出す。ソートキーを指定して取り出すデータの範囲をフィルタすることができる。
  - Scan
    テーブルの全てのデータを取り出す。
- データの更新
  - UpdateItem
    プライマリキーを指定して単一のデータを更新する。
- データの削除
  - DeleteItem
    プライマリキーを指定して単一のデータを削除する。
  - BatchWriteItem
    DeleteItem のバッチ版。

|                              | グローバルセカンダリインデックス (GSI) | ローカルセカンダリインデックス(LSI) |
| ---------------------------- | -------------------------------------- | ----------------------------------- |
| 新しく設定するキー           | パーティションキー、ソートキー（\*1）  | ソートキーのみ                      |
| キーの重複（\*2）            | 可                                     | 可                                  |
| インデックス数の上限         | 5                                      | 5                                   |
| 項目コレクションのサイズ制限 | なし                                   | 10GB 以下                           |
| テーブル作成後の追加         | 可                                     | 不可                                |
| 読み込み整合性               | 結果整合性                             | 結果整合性、強い整合性              |
| キャパシティユニットの消費   | GSI から消費                           | ベーステーブルから消費              |

グローバルセカンダリインデックスはテーブル作成後に作成
ローカルセカンダリインデックスはテーブル作成時に作成

<!--}}}-->

[AWS DynamoDB のテーブル設計における注意点 - Qiita](https://qiita.com/etaroid/items/a95f03bcf11a0a34e9ad#dynamodb%E3%81%AE%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E8%A8%AD%E8%A8%88%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)
