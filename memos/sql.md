# [SQLBolt - Learn SQL - Introduction to SQL](https://sqlbolt.com/)

## SQL Lesson 1: SELECT queries 101

```sql

SELECT title FROM movies;
SELECT * FROM movies;
SELECT title, description FROM movies;

```

### SQL Lesson 2: Queries with constraints (Pt. 1)

```sql
SELECT id, title FROM movies WHERE id = 6;
# Find the movies released in the years between 2000 and 2010 ✓
SELECT title, year FROM movies WHERE year BETWEEN 2000 AND 2010;
# Find the movies not released in the years between 2000 and 2010 ✓
SELECT title, year FROM movies WHERE year < 2000 OR year > 2010;

show table status from emails where name='email_threads_10'
"select * from email_threads_10 where bid=", bid, "limit 20"
 SHOW TABLES FORM wordpress LIKE "%meta";

```

```
DROP TABLE test_db_transaction_lua;

CREATE TABLE IF NOT EXISTS test_db_transaction_lua (
    id BIGINT(20) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ins_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

INSERT INTO test_db_transaction_lua (name) VALUES ("one");

DESCRIBE article;
DROP DATABASE media;
```

CREATE DATABASE db;
SHOW databases;
USE db;
.

CREATE TABLE no.test (
id INT VARCHAR(56) AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(50),
content TEXT,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

"SELECT from*unixtime(ins_t, '%Y/%m/%d') as '日付け',
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'あたり数',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'はずれ数',
SUM( CASE WHEN msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS '参加数'
FROM msgs*$bid WHERE oname='line' AND `from`='bot' AND ins_t between $start and $end
AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY from_unixtime(ins_t, '%Y/%m/%d');"

SELECT
Date(from_unixtime(ins_t)) as date,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY Date(from_unixtime(ins_t));

SELECT oid as uid,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY CAST(ins_t as DATE);

SELECT CASE WHEN name LIKE 'nick-1%' THEN 'nick'
WHEN name LIKE 'vicky-1%' THEN 'vicky'
ELSE NULL END AS Name,
COUNT(\*) AS Count
FROM dummytable
GROUP BY CASE WHEN name LIKE 'nick-1%' THEN 'nick'
WHEN name LIKE 'vicky-1%' THEN 'vicky'
ELSE NULL END

SELECT oid as uid, count(oid) as count from msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'fuck_fail%' GROUP BY oid

SELECT dept,
SUM( CASE WHEN gender = "1" THEN 1 ELSE 0 END) AS "男性社員の人数",
SUM( CASE WHEN gender = "2" THEN 1 ELSE 0 END) AS "女性社員の人数",
SUM( CASE WHEN gender = "3" THEN 1 ELSE 0 END) AS "その他の社員の人数"
FROM name_dept_gender_score
GROUP BY dept;

SELECT oid as uid,
SUM( CASE WHEN msg LIKE)
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck_fail%' THEN 1 ELSE 0 END) AS 'fail',
FROM msgs_741
GROUP BY oid

SELECT oid as uid,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck_fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741
GROUP BY oid;

SELECT CASE
WHEN msg LIKE 'fuck_fail%' THEN 'fail'
WHEN msg LIKE 'Greet-suc%' THEN 'suc'
ELSE NULL END as Name,
COUNT(\*) AS Count
FROM msgs_741 WHERE oname='line' AND `from`='bot'
GROUP BY CASE
WHEN msg LIKE 'fuck_fail%' THEN 'fail'
WHEN msg LIKE 'Greet-suc%' THEN 'suc'
ELSE NULL END;

```

```

text 型が扱える文字数は、2 の 16 乗の 65,535 文字（約 64K バイト）
mediumtext 型が扱える文字数は、2 の 24 乗の 16,777,215 文字（約 16M バイト）
longtext 型が扱える文字数は、2 の 32 乗の 4,294,967,295 文字(約 4G バイト）

- [MySQL の Index をはるコツ - Qiita](https://qiita.com/katsukii/items/3409e3c3c96580d37c2b)

整数型
整数型には「tinyint 型」「smallint 型」「int 型」「bigint 型」「bit 型」の 5 種類があります。

tinyint 型
tinyint 型の有効なデータ(値)の範囲は「0 ～ 255」になります。

smallint 型
smallint 型の有効なデータ(値)の範囲は「-32,768 ～ 32,767」になります。

int 型
int 型の有効なデータ(値)の範囲は「-2,147,483,648 ～ 2,147,483,647」になります。

bigint 型
bigint 型の有効なデータ(値)の範囲は「-9,223,372,036,854,775,808 ～ 9,223,372,036,854,775,807」になります。

bit 型
bit 型の有効なデータ(値)の範囲は「0 ～ 1」になります。
bit 型は「0: False」または「1: True」の真偽値を管理します。

10 進数小数型
10 進数小数型には「decimal 型」と「numeric 型」があります。

decimal 型
decimal 型の有効なデータ(値)の範囲は「-10^38 +1 から 10^38 – 1 (-38 桁～ 38 桁)」になります。
decimal(38)なら
-99999999999999999999999999999999999999 ～ 99999999999999999999999999999999999999
decimal(38, 1)なら
-9999999999999999999999999999999999999.9 ～ 9999999999999999999999999999999999999.9
になります。

decimal で桁数を指定する際は decimal(p, s)とし、p が全体の桁数、s が小数部の桁数になります。

p が整数部の桁数、s が小数部の桁数ではないので注意が必要です。p は全体の桁数になります。
例えば整数部が 5 桁、小数部が 3 桁の 10 進数小数型の指定は decimal(8, 3)になります。
numeric 型
decimal 型と同じです。

浮動小数点数型
浮動小数点数型には「float 型」と「real 型」があります。

float 型
float 型の有効なデータ(値)の範囲は「-1.79E+308 ～ -2.23E-308、0、および 2.23E-308 ～ 1.79E+308」になります。

real 型
real 型の有効なデータ(値)の範囲は「-3.40E+38 ～ -1.18E-38、0、および 1.18E-38 ～ 3.40E+38」になります。

金額型
金額型には「smallmoney 型」と「money 型」があります。

smallmoney 型
smallmoney 型の有効なデータ(値)の範囲は「-214,748.3648 ～ 214,748.3647」になります。

money 型
money 型の有効なデータ(値)の範囲は「-922,337,203,685,477.5808 ～ 922,337,203,685,477.5807」になります。

| MySQL      | Postgres  | 容量                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------ |
| TINYINT    | -         | 1B                                                                                   |
| SMALLINT   | SMALLINT  | 2B                                                                                   |
| INT        | INT       | 4B                                                                                   |
| BIGINT     | BIGINT    | 8B                                                                                   |
| FLOAT      | NUMERIC   | 4B                                                                                   |
| DATE       | DATE      | 1000-01-01〜9999-12-31 4713-01-01 BC〜:9999-12-31                                    |
| DATETIME   | -         | 1000-01-01 00:00:00〜9999-12-31 23:59:59                                             |
| TIME       | TIME      | 00:00:00〜23:59:59                                                                   |
| TIMESTAMP  | TIMESTAMP | 1970-01-01 00:00:01〜2038-01-19 03:14:07 4713-01-01 00:00:00 BC〜9999-12-31 00:00:00 |
| CHAR       | CHAR      | 255B 1GB                                                                             |
| VARCHAR    | VARCHAR   | 65KB 1GB                                                                             |
| TINYTEXT   | -         | 255B                                                                                 |
| TEXT       | TEXT      | 65KB 1GB                                                                             |
| MEDIUMTEXT | -         | 16MB                                                                                 |
| LONGTEXT   | -         | 4GB                                                                                  |
