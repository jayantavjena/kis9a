package main

import (
	"fmt"
	"main/q"
	"os"
)

/*

Questions:
referenced https://gist.github.com/kenmori/1961ce0140dc3307a0e641c8dde6701d
*/

func main() {
	args := os.Args
	ok := len(args) > 0
	arg := os.Args[1:]
	if ok {
		switch arg[0] {
		case "1":
			/*
			 merge { a: 'aa' }, { b: 'bb' }
			*/
			q.Q1()
		case "2":
			/*
				['aa','bb','cc','dd','ee','ff','gg'];
				to new array ["ee", "ff", "gg"]
			*/
			q.Q2()
		case "3":
			/*
				['a','b'];
				output: "a" "b"
			*/
			q.Q3()
		case "4":
			/*
				['a', 'b']の各要素にindex値を足した文字列を出力 -> 'a0'と'b1'
			*/
			q.Q4()
		case "5":
			/*
				任意の変数を定義して配列(arr, slice)かどうかを評価
			*/
			q.Q5()
		// case "6":
		// 	/*

		// 	 */
		// 	q.Q6()
		// case "7":
		// 	/*

		// 	 */
		// 	q.Q7()
		case "8":
			/*
			 { a: 'aa', b: 'bb' } keyとvalue全て出力
			*/
			q.Q8()
		case "9":
			/*
			  ['a', 'b', 'c'] 配列の中の全ての要素を結合し、1つの文字列として出力
			*/
			q.Q9()
		// case "10":
		// 	/*
		// 	 */
		// 	q.Q10()
		case "11":
			/*
				[ {id:9}, {id:2}, {id:4}, {id:3} ];
				sort by id
			*/
			q.Q11()
		case "a1":
			/*
				buble sort
				// 配列の中から「大きさが逆転している部分があったら swap する」を繰り返す
			*/
			q.A1()
		case "a2":
			/*
				selection sort
				// 配列から最小値を探し、配列の先頭要素と入れ替えていくことで並べ替える。
			*/
			q.A2()
		case "a3":
			/*
				quick sort
				//	閾値を決める
					データの集合を２つのデータの集合に分割して集合単位でソートする
					閾値以下（or 未満）のデータを集めた集合
					閾値以上（or 超える）のデータを集めた集合
					２つの集合をそれぞれ個別に同様の方法でソートする
			*/
			q.A3()
		case "a4":
			/*
				Insertion sort
				// 挿入ソートとは、与えられたデータ列を大小などの順序通りになるよう並べ替えるソート
				未整列の要素を一つずつ、整列済みの列の適切な位置に挿入していくもの
			*/
			q.A4()
		case "a5":
			/*
				メソッド mergeSort() は、与えられた配列 a[ ] をほぼ2等分し、それぞれの配列を mergeSort() で並べ替えた後、2つを併合して1つの配列にしています。
			*/
			q.A5()
		default:
			showHelp()
		}
	}
}

func showHelp() {
	fmt.Println("// print expected args")
}
