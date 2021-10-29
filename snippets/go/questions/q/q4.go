package q

import (
	"fmt"
	"strconv"
)

func Q4() {
	arr := []string{"a", "b"}
	for k, v := range arr {
		fmt.Println(v + strconv.Itoa(k))
	}
}
