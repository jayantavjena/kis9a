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
		default:
			showHelp()
		}
	}
}

func showHelp() {
	fmt.Println("// print expected args")
}
