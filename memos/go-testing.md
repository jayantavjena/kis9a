[GitHub - gohandson/testing-ja: テストの書き方やテクニックを学ぶハンズオンです](https://github.com/gohandson/testing-ja)

[go test で出来ること - Qiita](https://qiita.com/taizo/items/82930518430f940721a0)

- func (\*T) Fail
  実行後にそのテストは失敗となるが、そのテストの処理は続く

- format 構造や変数を渡してメッセージを表示させたい場合
  func (*T) Error
  func (*T) Errorf

- func (\*T) FatalNow
  実行後にそのテストは失敗となり、そのテストの処理は止まる。
  format 構造や変数を渡してメッセージを表示させたい場合
  func (*T) Fatal
  func (*T) Fatalf

- t.Skip()
  そのテストをスキップする。
  func (*T) Skip は func (*T) SkipNow のエイリアス。
  両方とも、その後の処理は実行されない。

- t.Log()
  Println などと同じように、値を実行時に表示してくれる。
  直接 fmt.Println()を使う場合との違いは、行数をきちんと出してくれる。
  ちなみに出力は、go test は、テキストは失敗するか
  -v オプションをつけたときしか表示されない。

- go test command options

-v : 詳細を表示する
-cpu : 実行する並列度を指定する
-race : データの競合が起きないかテストする
-cover : カバレッジを取得する

- testing pkg

```go
type Hex int

func (h Hex) String() string {
  return fmt.Sprintf("x", int(h))
}

package mypkg_test

import "testing"

func TestHex_String(t *testing.T) {
  expect := "a"
  actual := mypkg.Hex(10).String()
  if actual != expect {
    t.Errorf(`expect="%s" actual="%s"`, expect, actual)
  }
}

```

```
■ 失敗理由を出力してテストを失敗させる
  ● Error, Errorf, Fatal, Fatalf
■ テスト 並列実行
  ● Parallel
  ● go test􏰁-parallel オプションで並列数を指定 ■ ベンチマーク
  ● \*testing.B 型を使う
■ ブラックボックステスト
  ● testing/quick パッケージ

coverprofile
go test -coverprofile=profile fmt
go tool cover -html=profile

■ テストしやすいコード
● 個々機能が疎結合で単体でテストしやすい
● 外部と接続部分が抽象化されている
● データベース接続、ネットワークやファイルへ􏰁アクセス
● 抽象化されている部分をモックに差し替えれる

■ 外部に繋がる部分􏰀モックに差し替え可能にする

type DB interface {
   Get(key string) string
   Set(key, value string) error
}
type Server struct { DB DB }

テスト用􏰁ヘルパー関数
● ヘルパー関数􏰀エラーを返さない
● *testing.Tを受け取ってテストを落とす
● Go 1.9から􏰀T.Helperを使って情報を補足する

https://pkg.go.dev/testing#T.Helper
```
