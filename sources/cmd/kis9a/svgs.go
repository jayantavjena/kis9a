package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

type SvgsIndex struct {
	Name string `json:"name"`
}

func svgs2json() {
	files, err := ioutil.ReadDir(getSvgsPath())
	if err != nil {
		log.Fatal(err)
	}
	var index SvgsIndex
	var indexes []SvgsIndex
	for _, f := range files {
		index.Name = f.Name()
		indexes = append(indexes, index)
	}
	indexesJson, err := json.Marshal(indexes)
	if err != nil {
		log.Fatal(err)
	}
	err = writeFile(getSvgsIndexesJson(), indexesJson)
	if err != nil {
		log.Fatal(err)
	}
}
