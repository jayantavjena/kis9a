package main

import (
	"errors"
	"fmt"
	"io/fs"
)

func main() {
	err := f()
	if errors.Is(err, fs.ErrNotExist) {
		fmt.Println("ファイルが開けませんでした")
	}
}

func f() error {
	if err := open("hoge.txt"); err != nil {
		return fmt.Errorf("f(): %w", err)
	}
	return nil
}

func open(name string) error {
	return fs.ErrNotExist
}
