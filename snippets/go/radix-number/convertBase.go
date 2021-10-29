package main

import (
	"fmt"
	"strconv"
)


func main() {
	n, err := convertBase("127", 8, 4)
	fmt.Println(n, err) // 1113 <nil>
}

func convertBase(base string, before int, next int) (string, error) {
	ten, err := strconv.ParseInt(base, before, 64)
	if err != nil {
		return "", err
	}
	return strconv.FormatInt(ten, next), err
}
