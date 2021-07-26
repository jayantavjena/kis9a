Creating user, database and adding access on PostgreSQL
Creating user. $ sudo -u postgres createuser <username>
Creating Database. $ sudo -u postgres createdb <dbname>
Giving the user a password. $ sudo -u postgres psql. ...
Granting privileges on database. psql=# grant all privileges on database <dbname> to <username> ;

\du
