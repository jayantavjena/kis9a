package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/mmcdole/gofeed"
)

func main() {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL("https://zenn.dev/kis9a/feed")
	if err != nil {
		log.Fatal(err)
	}
	items := feed.Items
	res, err := json.Marshal(items)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(res))
}
