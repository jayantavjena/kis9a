```
CREATE USER 'datadog'@'localhost' IDENTIFIED BY '';
GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO 'datadog'@'localhost';
show databases like 'performance_schema';
GRANT SELECT ON performance_schema.* TO 'datadog'@'localhost';
```

```
init_config:

instances:
  - server: 127.0.0.1
    user: datadog
    pass: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
    port: "<YOUR_MYSQL_PORT>" # e.g. 3306
    options:
      replication: false
      galera_cluster: true
      extra_status_metrics: true
      extra_innodb_metrics: true
      extra_performance_metrics: true
      schema_size_metrics: false
      disable_innodb_metrics: false
```

sudo systemctl restart datadog-agent
sudo datadog-agent configcheck
sudo datadog-agent status
