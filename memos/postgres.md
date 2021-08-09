Creating user, database and adding access on PostgreSQL
Creating user. $ sudo -u postgres createuser <username>
Creating Database. $ sudo -u postgres createdb <dbname>
Giving the user a password. $ sudo -u postgres psql. ...
Granting privileges on database. psql=# grant all privileges on database <dbname> to <username> ;

\du

```
$ psql -d postgres

d : データベースを指定（未指定でログインユーザー名のデータベース）
U : ユーザーを指定（未指定だとログインユーザー）
h : ホスト名（未指定だとlocalhost)

データベース一覧
$ psql -l

ユーザー一覧表示
# \du

データベース一覧
# \l

ユーザーを作る
# create user username;
CREATE ROLE

ユーザーにパスワードを指定する
# \password username（エンターキー）
Enter new password:
Enter it again:

データベースを作る
# create database db_name;
CREATE DATABASE

接続中のデータベースの情報を表示
postgres=# \conninfo

テーブル一覧を表示
postgres=# \z

他のデータベースに接続
postgres=# \c dbname

psqlの終了
postgres=# \q

ファイルからコマンドを実行
postgres=# \i filename.sql

コマンドラインの履歴の表示
postgres=# \s

'\'に関するヘルプの表示
postgres=# \?

```

```
テーブル一覧の表示
\dt;

テーブル構造の表示
\d テーブル名;

テーブル内のデータを一覧
select * from テーブル名;

指定したカラムの内容を小さい順に表示
select * from テーブル名 order by カラム;

指定したカラムの内容を大きい順に表示
select * from テーブル名 order by カラム desc;

表示数指定
select * from テーブル名 limit 数;

表示の開始位置指定
select * from テーブル名 offset 数;

カラム内の任意の文字を表示
select distinct カラム名 from テーブル名;

カラム内の合計値
select sum(カラム名) from テーブル名;

カラム内の最大値
select max(カラム名) from テーブル名;

カラム内の最小値
select min(カラム名) from テーブル名;

カラム内の平均値
select avg(カラム名) from テーブル名;

データの更新
update テーブル名 set 更新内容;

データの削除
delete from テーブル名 where 条件;

テーブルのオーナーの変更
alter table テーブル名 owner to オーナー名;

viewの作成
create view ビュー名 as viewに指定するコマンド;

view一覧の確認
\dv;

viewの使用方法
select * from ビュー名;

viewの削除
drop view ビュー名;

インデックス追加
create index インデックス名 on テーブル名(カラム名);

インデックス削除
drop index インデックス名;

カラムの追加
alter table テーブル名 add カラム名 データ型;

カラムの削除
alter table テーブル名 drop カラム名;

カラム名の変更
alter table テーブル名 rename カラム名 to 新カラム名;

カラムのデータ型を変更する
alter table テーブル名 alter カラム名 type データ型;

文字数
select length(カラム名) from テーブル名;

文字列連結
select concat(文字列, 文字列, ...) from テーブル名;

サービスの起動
postgres -D /usr/local/var/postgres
```

```sql
create table test01 (
  val1 serial, -- 自動増分4バイト整数
  val2 numeric(10, 2), -- 数値
  val3 char(10), -- 固定長文字列
  val4 varchar(10), -- 可変長文字列
  val5 timestamp, -- 日付と時刻
  val6 date, -- 日付
  val7 bytea, -- バイナリ
  primary key (val1, val2) -- 主キー
);

# テーブルが存在しない場合作成する場合
# create table if not exists テーブル名
```

```sql
-- Database: goauth
CREATE DATABASE goauth WITH OWNER = postgres ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION
LIMIT = - 1;

-- Table: users

CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        PASSWORD VARCHAR(355) NOT NULL,
        email VARCHAR(355) UNIQUE NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )

ALTER TABLE users OWNER TO postgres;
```
