```
This example triggers the workflow every day at 5:30 and 17:30 UTC:

on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '30 5,17 * * *'

Cron syntax has five fields separated by a space, and each field represents a unit of time.

┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
You can use these operators in any of the five fields:
```

```
// 毎日毎時 30 分 (UTC) に実行する:

30 * * * *

// 毎日 10:45 (UTC) に実行する:

45 10 * * *

// 3 日毎に 1 回 08:00 (UTC) に実行する:

0 8 */3 * *

// 毎週月曜日の 15:00 (UTC) に実行する:

0 15 * * 1
```
