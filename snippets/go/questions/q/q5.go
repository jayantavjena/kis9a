package q

import (
	"fmt"
	"reflect"
)

func Q5() {
	// is slice
	slice := []string{"a", "b"}
	rt := reflect.TypeOf(slice)
	fmt.Println("is Array", rt.Kind() == reflect.Slice)

	// is array
	arr := [2]string{"a", "b"}
	rt = reflect.TypeOf(arr)
	fmt.Println("is Array", rt.Kind() == reflect.Array)
}
