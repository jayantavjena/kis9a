```sql
// [sqlboiler 参照編まとめ - Qiita](https://qiita.com/sagae_twins_developper/items/da5a6453c1e02eab6951)
var err error
var users models.UserSlice
if users, err = models.Users(
  qm.Select("id", "name"),
  qm.InnerJoin("credit_cards c on c.user_id = users.id"),
  qm.Where("age > ?", 30),
  qm.AndIn("c.kind in ?", "visa", "mastercard"),
  qm.Or("email like ?", `%aol.com%`),
  qm.GroupBy("id", "name"),
  qm.Having("count(c.id) > ?", 2),
  qm.Limit(5),
  qm.Offset(6),
).All(ctx, db); err != nil {
  fmt.Println(err.Error())
}
```

type safe

```sql

var err error
var users models.UserSlice
if users, err = models.Users(
ID
  qm.Select(UserColumns.ID, UserColumns.Name),  // 「テーブル名Columns」のように、各テーブルのカラムがstructとして生成されます
  InnerJoin(
      fmt.Sprintf("%s on %s.%s = %s.%s", TableNames.CreditCards, TableNames.CreditCards CreditCardColumns.ID, TableNames.Users, UserColumns.ID),
  ),
  qm.Where(fmt.Sprintf("%s > ?", UserColumns.Age), 30),
  qm.AndIn(fmt.Sprintf("%s.%s in ?", CreditCardColumns.Kind), "visa", "mastercard"),
  qm.Or(fmt.Sprintf("%s like ?", UserColumns.Email), `%aol.com%`),
  qm.GroupBy(UserColumns.ID, UserColumns.Name),
  qm.Having(fmt.Sprintf("count(%s) > ?", CreditCardColumns.ID), 2),
  qm.Limit(5),
  qm.Offset(6),
).All(ctx, db); err != nil {
  fmt.Println(err.Error())
}
```
