```
sed
'/^[[:space:]]*$/d'
'/^\s*$/d'
'/^$/d'
-n '/^\s*$/!p'

grep
-v '^$'
-v '^\s*$'
-v '^[[:space:]]*$'

awk
/./
'NF'
'length'
'/^[ \t]*$/ {next;} {print}'
'!/^[ \t]*$/'
```
