> 21.29.4 INFORMATION_SCHEMA INNODB_TRX テーブル
> INNODB_TRX テーブルには、トランザクションがロックを待機しているかどうか、トランザクションが開始した時点、トランザクションが実行している SQL ステートメント (存在する場合) など、InnoDB 内部で現在実行している (読み取り専用トランザクションを除く) すべてのトランザクションに関する情報が含まれます。
> transaction in a stored procedure.

SHOW VARIABLES;

mysql> mysql_secure_installation
mysql> mysqladmin -u root password 'new-password'

mysql> select \* from mysql.user where user='root'\G;
mysql> select user, host from mysql.user;

- [MySQL :: MySQL 8.0 Reference Manual :: 13.3.7 SET TRANSACTION Statement](https://dev.mysql.com/doc/refman/8.0/en/set-transaction.html)
- [ストアドプロシージャの基本的ななにか - Qiita](https://qiita.com/setsuna82001/items/e742338eb93e3a48ba46)
- [Do Not Pass This Way Again - The Grimoire](https://grimoire.ca/mysql/choose-something-else/)
- [第 134 回　 DDL と暗黙的なコミットについて：MySQL 道普請便り｜ gihyo.jp … 技術評論社](https://gihyo.jp/dev/serial/01/mysql-road-construction-news/0134)
- [MySQL トラブルシューティング - ERROR 1045 (28000): Access denied for user &#39;root&#39;@&#39;localhost&#39; (using password: NO) - 長生村本郷 Engineers&#39;Blog](https://kenzo0107.hatenablog.com/entry/2016/01/15/105803?_fsi=lVAPVbs5)
- [Mysql 5.7\* パスワードを Policy に合わせるとめんどくさい件について - Qiita](https://qiita.com/keisukeYamagishi/items/d897e5c52fe9fd8d9273)
- [どうしよう！困った時の Mac 上の MySQL のアンインストール＆再インストール、動作確認手順 - Qiita](https://qiita.com/akiko-pusu/items/aef52b723da2cb5dc596)
- [MySQL の LOCK TABLES とは？何をしているのか - Qiita](https://qiita.com/a-nishimura/items/8325ecad3edb2660abf1)
- [MySQL :: MySQL 5.6 リファレンスマニュアル :: 21.29.4 INFORMATION_SCHEMA INNODB_TRX テーブル](https://dev.mysql.com/doc/refman/5.6/ja/information-schema-innodb-trx-table.html)
- [MySQL :: MySQL 8.0 Reference Manual :: 13.3.6 LOCK TABLES and UNLOCK TABLES Statements](https://dev.mysql.com/doc/refman/8.0/en/lock-tables.html)
- [MySQL :: MySQL 8.0 Reference Manual :: 12.16 Information Functions](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html)
- [ストアドプロシージャの基本的ななにか - Qiita](https://qiita.com/setsuna82001/items/e742338eb93e3a48ba46)

```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

MySQL：~/.my.cnf で設定

[client]
database=DB 名
user=ユーザー名
password=パスワード
