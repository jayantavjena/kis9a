- コメント（注釈）付きの場合
  git tag -a タグ -m 'タグのコメント'

- コメント（注釈）なしの場合
  git tag タグ

- 後から tag をつける場合
  git tag -a タグ -m 'コメント' コミット
  例）　 git tag -a v1.2 -m 'version 1.2' 9fceb02

- tag の共有
  git push origin タグ名
  例) git push origin v1.5

- tag の確認 一覧の表示
  git tag

- 特定の tag を確認
  git show タグ名

- タグの削除 まだ push していない
  git tag -d タグ名

[git tag の使い方まとめ - Qiita](https://qiita.com/growsic/items/ed67e03fda5ab7ef9d08) より引用
