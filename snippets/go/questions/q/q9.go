package q

import "fmt"

func Q9() {
	slice := []string{"a", "b", "c"}
	var res string
	for _, v := range slice {
		res = res + v
	}
	fmt.Println(res)
}
