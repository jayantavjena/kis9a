package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

type Ds struct {
	Name string `json:"name"`
}

func main() {
	ds, err := getDs()
	if err != nil {
		log.Fatal(err)
	}
	js, err := json.Marshal(ds)
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile("ds.json", js, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

func getDs() ([]Ds, error) {
	var ds []Ds
	fs, err := ioutil.ReadDir(".")
	if err != nil {
		return ds, err
	}
	for _, f := range fs {
		if f.IsDir() {
			var d Ds
			d.Name = f.Name()
			ds = append(ds, d)
		}
	}
	return ds, err
}
