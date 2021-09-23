package main

import "fmt"

func main() {
	a := []string{"A", "B", "C"}
	var b []*string
	for _, str := range a {
		fmt.Println(&str) // address
		b = append(b, &str)
	}
	for _, str := range b {
		fmt.Println(*str)
	}
	// output CCC

	for i := 0; i < len(a); i++ {
		b = append(b, &a[i])
	}
	for _, str := range b {
		fmt.Println(*str)
	}
	// output ABC
}

// [Goのfor rangeでのポインタでハマったこと - Qiita](https://qiita.com/uchiko/items/1c611f0db618ce9dc0a9)
// referenced: [Goのfor rangeでポインタを使用する際に気をつけたいこと - Qiita](https://qiita.com/RunEagler/items/008e2b304f27b7fb168a#%E5%AE%9F%E8%A3%85%E4%BE%8B)
