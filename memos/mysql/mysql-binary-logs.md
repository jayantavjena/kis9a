show binary logs;
flush binary logs;
show binary logs;
show binlog events in 'bin.000001';
show variables like 'binlog_format';
use mydb;
desc t1;
show binlog events in 'awsstg-db001-bin.000011';
show variables like 'binlog_format';
set session binlog_format='STATEMENT';
