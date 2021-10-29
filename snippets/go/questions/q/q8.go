package q

import "fmt"

func Q8() {
	m := map[string]string{
		"a": "aa",
		"b": "bb",
	}
	for k, v := range m {
		fmt.Println(k, v)
	}
}
