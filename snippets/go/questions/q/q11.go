package q

import (
	"fmt"
	"sort"
)

func Q11() {
	slice := []map[string]int{{"Id": 9}, {"Id": 2}, {"Id": 4}, {"Id": 3}}
	fmt.Println("before sort: ", slice)
	sort.Slice(slice, func(i, j int) bool {
		return slice[i]["Id"] < slice[j]["Id"]
	})
	fmt.Println("after sort: ", slice)
}
