package main

import "fmt"

func main() {
	str := Rev("string")
	fmt.Println(str)
	str = Rev("アイウエオ")
	fmt.Println(str)
}

func Rev(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

// func TestReverse(t *testing.T) {
// 	for _, c := range []struct {
// 		in, want string
// 	}{
// 		{"Hello, world", "dlrow ,olleH"},
// 		{"Hello, 世界", "界世 ,olleH"},
// 		{"", ""},
// 	} {
// 		got := Reverse(c.in)
// 		if got != c.want {
// 			t.Errorf("Reverse(%q) == %q, want %q", c.in, got, c.want)
// 		}
// 	}
// }
