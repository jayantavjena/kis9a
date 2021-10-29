package q

import "fmt"

func Q1() {
	a := map[string]string{
		"a": "aa",
	}
	b := map[string]string{
		"b": "bb",
	}
	res := mergeStringMaps(a, b)
	fmt.Println(res)
}

func mergeStringMaps(maps ...map[string]string) map[string]string {
	res := map[string]string{}
	for _, m := range maps {
		for k, v := range m {
			fmt.Println(v, k)
			res[k] = v
		}
	}
	return res
}
