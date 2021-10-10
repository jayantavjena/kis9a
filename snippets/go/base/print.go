// Go は、`printf` の慣習に従った素晴らしい文字列フォーマットを
// サポートします。以下は、よく使う文字列フォーマットの例です。

package main

import (
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func main() {
	// Go は、一般的な Go の値をフォーマットするために設計された、
	// いくつかの表示用 "フォーマット指定子 (verbs)" を提供します。
	// 例えば、次の例は、`point` 構造体をのインスタンスを表示します。
	p := point{1, 2}
	fmt.Printf("%v\n", p)

	// 値が構造体の場合、`%+v` とすれば構造体のフィールド名も含みます。
	fmt.Printf("%+v\n", p)

	// `%#v` は、その値の Go の構文表現を表示します。
	// つまり、その値を生成するソースコード片です。
	fmt.Printf("%#v\n", p)

	// 値の型を表示するには、`%T` を使います。
	fmt.Printf("%T\n", p)

	// 真偽値のフォーマットは単純です。
	fmt.Printf("%t\n", true)

	// 整数のフォーマットには、多くのオプションがあります。
	// 通常の 10 進表現には、`%d` を使います。
	fmt.Printf("%d\n", 123)

	// 次の例は、2 進表現で表示します。
	fmt.Printf("%b\n", 14)

	// 次の例は、整数に対応する文字を表示します。
	fmt.Printf("%c\n", 33)

	// `%x` は、16進表現となります。
	fmt.Printf("%x\n", 456)

	// 浮動小数にもいくつかのフォーマットオプションがあります。
	// 通常の 10 進表現には、`%f` を使います。
	fmt.Printf("%f\n", 78.9)

	// `%e` と `%E` は、浮動小数を (微妙に異なる)
	// 指数表記でフォーマットします。
	fmt.Printf("%e\n", 123400000.0)
	fmt.Printf("%E\n", 123400000.0)

	// 基本的な文字列の表示には、`%s` を使います。
	fmt.Printf("%s\n", "\"string\"")

	// Go のソースコードのように文字列をダブルクォーテーションで
	// 囲むには、`%q` を使います。
	fmt.Printf("%q\n", "\"string\"")

	// 整数の例でも見ましたが、`%x` は文字列を
	// 1 バイトにつき 2 文字の 16 進数で表示することもできます。
	fmt.Printf("%x\n", "hex this")

	// ポインタ表現で表示するには、`%p` を使います。
	fmt.Printf("%p\n", &p)

	// 数値をフォーマットする場合、出力の幅や精度を制御したいと
	// 思うでしょう。整数の幅を指定するためには、
	// フォーマット指定子の `%` の後に数字を使います。
	// デフォルトでは、右寄せになり、空白でパディングされます。
	fmt.Printf("|%6d|%6d|\n", 12, 345)

	// 浮動小数の表示幅を指定することもできますが、
	// 通常は幅だけでなく、小数点以下の精度も制限したいと思うでしょう。
	// `width.precision` という構文で指定できます。
	fmt.Printf("|%6.2f|%6.2f|\n", 1.2, 3.45)

	// 左寄せにするためには、`-` フラグを使います。
	fmt.Printf("|%-6.2f|%-6.2f|\n", 1.2, 3.45)

	// 文字列のフォーマットでも幅を制御したいと思うかもしれません。
	// 特に、テーブルのような出力で整列させたい場合などです。
	// 通常の右寄せは、次の通りです。
	fmt.Printf("|%6s|%6s|\n", "foo", "b")

	// 左寄せの場合は、数値と同様に `-` フラグを使います。
	fmt.Printf("|%-6s|%-6s|\n", "foo", "b")

	// ここまで、フォーマットされた文字列を `os.Stdout`
	// に表示する `Printf` 関数を見てきました。
	// `Sprintf` 関数は、フォーマットした文字列をどこにも表示せず、
	// 戻り値として返します。
	s := fmt.Sprintf("a %s", "string")
	fmt.Println(s)

	// また、`Fprintf` 関数を使えば、フォーマットした文字列を
	// `os.Stdout` 以外の `io.Writers` へ出力することができます。
	fmt.Fprintf(os.Stderr, "an %s\n", "error")
}
