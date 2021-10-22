表に列を追加する

```
ALTER TABLE テーブル名 ADD
     列名1  VARCHAR (10) DEFAULT '' NOT NULL
    ,列名2  VARCHAR (10) DEFAULT '' NOT NULL
```

表の列定義を変更する

```
ALTER TABLE テーブル名 ALTER COLUMN 変更する列名 データ型
例：ALTER TABLE TABLE_A ALTER COLUMN COLUMN_1 VARCHAR(200)
```

表の列を削除する

```
ALTER TABLE テーブル名 DROP COLUMN
     列名1,列名2
```

表の名前を変更する

```
EXEC sp_rename '現在のテーブル名','変更するテーブル名','OBJECT'
```

表の列名を変更する

```
EXEC sp_rename 'テーブル名.現在の列名','変更する列名','COLUMN'
```
