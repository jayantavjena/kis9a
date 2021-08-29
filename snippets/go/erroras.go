package main

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
)

func main() {
	err := f()
	var pathError *os.PathError
	if errors.As(err, &pathError) {
		fmt.Println("ファイルが開けませんでした", pathError)
	}
}

func f() error {
	if err := open("hoge.txt"); err != nil {
		return fmt.Errorf("f(): %w", err)
	}
	return nil
}

func open(name string) error {
	err := &fs.PathError{
		Op:   "open",
		Path: name,
		Err:  fs.ErrNotExist,
	}
	return err
}
