package main

import (
	"fmt"
	"math/big"
	"strconv"
)

// 8bit = 1byte
// Int64は符号付き64ビット整数なので64bit=8byteだから16つの16進数文字で表せます。

func main() {
	// fmt.Println(mathBig(1200))                // 4b0
	fmt.Println(parseBinToHex("10010110000")) // 4b0
	fmt.Println(parseBase("10010110000", 2, 16))
}

func formatInt(dig int64, base int) string {
	return strconv.FormatInt(dig, base)
}

func mathBig(dig int64) string {
	return big.NewInt(dig).Text(16)
}

func parseBase(digStr string, base int, next int) (uint64, error) {
	return strconv.ParseUint(digStr, base, next*4)
}

func parseBinToHex(s string) string {
	ui, err := strconv.ParseUint(s, 2, 64)
	if err != nil {
		return "error"
	}
	return fmt.Sprintf("%x", ui)
}
