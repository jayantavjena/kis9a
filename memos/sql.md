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