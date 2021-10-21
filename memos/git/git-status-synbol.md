```
$ git ls-files

-c, --cached          show cached files in the output (default)
-d, --deleted         show deleted files in the output
-m, --modified        show modified files in the output
-o, --others          show other files in the output
-i, --ignored         show ignored files in the output
-s, --stage           show staged contents' object name in the output
-k, --killed          show files on the filesystem that need to be removed
-u, --unmerged        show unmerged files in the output

```

```
UU（both modified）
3ウェイマージした結果のコンフリクトファイル．
=>コンフリクトしている箇所を編集する必要あり．

AA（both added）
マージされるブランチ（HEAD）にあるファイルと、マージするブランチにあるファイルをマージした結果、変更箇所がコンフリクトしているファイル
=>コンフリクトしている箇所を編集する必要あり．

UD（deleted by them)
マージされるブランチ（HEAD)に存在するファイルが、マージするブランチでは削除されているファイル
=>ファイルを削除するか， 残すか選択

DU（deleted by us）
マージするブランチに存在するファイルが、マージされるブランチ（HEAD）では削除されているファイル.
=>ファイルを削除するか， 残すか選択

修正が不要
AU（added by us）
マージされるブランチ（HEAD）にのみ存在するファイル．
=>ファイルはそのまま

UA（added by them）
マージするブランチにのみ存在するファイルです。
=>自動的にstagingに乗る．

DD（both deleted)
マージされるブランチ（HEAD）及び、マージするブランチから削除されたファイル.
=>自動で削除
```
