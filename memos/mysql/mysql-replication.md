o レプリケーションについて読む
o [MySQL 入門　レプリケーション編 - Qiita](https://qiita.com/Tocyuki/items/c224cef57493f536a941)
o [MySQL で Master-Slave 構成のレプリケーション設定 - Qiita](https://qiita.com/ksugawara61/items/fdd5ae9b78931540887f)
o [MySQL on EC2 → Aurora にレプリケーションをしてみた - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2017/02/03/223834)

ホスト名 IP アドレス 役割
web001 192.168.33.10 Master DB サーバ
web002 192.168.33.20 Slave DB サーバ

## master side

1. my.conf add server id and get bynary log setting.
2. sudo systemctl restart mysqld.service
3. create database for replication mysql -u root -p; create database replication;
4. add slave account
   mysql> create user 'repl'@'192.168.33.20' identified by 'Slave-passw0rd';
   mysql> grant replication slave on _._ to 'repl'@'192.168.33.20';
5. mysqldump --single-transaction -u root -p replication > replication.dump
6. unlock talbes

## slave side

1. my.cnf add server id
2. sudo systemctl restart mysqld.service
3. create database replication.
   mysql> create database replication;
   mysql> use example;
   mysql> source ~/replication.dump; # dump データをコピー

<https://qiita.com/ksugawara61/items/fdd5ae9b78931540887f#3-slave%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%82%92%E4%BD%9C%E6%88%90>

4. set connection information.
   mysql> change master to
   -> master_host='192.168.33.10', # Master DB サーバのホスト名/IP アドレス
   -> master_user='repl', # Master DB サーバへ接続するユーザ名
   -> master_password='Slave-passw0rd', # 接続するユーザ名のパスワード
   -> master_log_file='web001-bin.000001', # バイナリログのファイル名
   -> master_log_pos=619; # バイナリログの現在位置
   show slave status\G
5. mysql> change replication filter replicate_do_db = (example);
6. start replication
   start slave;

| 機能          | 説明                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| mysqlfailover | レプリケーション環境の自動フェイルオーバー                              |
| mysqlpladmin  | レプリケーション環境の管理（一部機能のみ GTID に依存）                  |
| mysqlplms     | ランドロビン接続によるマルチソースレプリケーション                      |
| mysqlrplsync  | レプリケーションの同期状況を確認                                        |
| mysqlslavetrx | スレーブでトランザクションをスキップ（MySQL Utilities1.6 にて追加予定） |

| オプション              | 説明                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| --master-data=2         | バックアップ取得のバイナリファイル名とバイナリファイル内の位置（Position）をコメントとしてバックアップファイルに記録                             |
| --hex-blob              | バイナリ型（BINARY, VARBINARY, BLOG）と BIT 型のデータを 16 進数表記で出力                                                                       |
| --default-character-set | ` mysqldump` がデフォルトで利用するキャラクタセットを指定。通常は MySQL サーバのシステム変数 ` default-character-set` と同じものを指定すれば良い |
| --all-databases         | 全てのデータベースをバックアップ                                                                                                                 |
| --lock-all-tables       | 全てのテーブルをロックしてバックアップを取得する                                                                                                 |
| --single-transaction    | InnoDB がサポートしているトランザクションの仕組みを利用して、InnoDB テーブルに限り一貫性のとれたバックアップを取得する                           |

| コマンド            | 説明                                                 |
| ------------------- | ---------------------------------------------------- |
| SHOW MASTER STATUS  | 現在使用中のバイナリログファイル名とポジションを確認 |
| SHOW MASTER LOGS    | コマンドで全てのバイナリログファイル名を列挙         |
| FLUSH [BINARY] LOGS | ログのローテーション（または再起動で実現可能）       |
| PURGE MASTER        | 特定の時点までのバイナリログを削除                   |
| RESET MASTER        | 全てのバイナリログを削除                             |
| SHOW BINLOG EVENTS  | バイナリログファイルの中身を確認                     |

| コマンド                  | 説明         |
| ------------------------- | ------------ |
| START SLAVE [SLAVE\_TYPE] | スレーブ起動 |
| STOP SLAVE [SLAVE\_TYPE]  | スレーブ停止 |

| パラメータ                              | 概要                                                    |
| --------------------------------------- | ------------------------------------------------------- |
| replicate-do-db=db_name                 | 指定した DB（スキーマ）だけをレプリケーション対象にする |
| replicate-do-table=db_name.tbl_name     | 指定したテーブルだけをレプリケーション対象にする        |
| replicate-ignore-db=db_name             | 指定した DB（スキーマ）をレプリケーション対象から除く   |
| replicate-ignore-table=db_name.tbl_name | 指定したテーブルをレプリケーション対象から除く          |
