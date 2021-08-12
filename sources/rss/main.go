package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/mmcdole/gofeed"
)

func Handler() (interface{}, error) {
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL("https://zenn.dev/kis9a/feed")
	items := feed.Items
	res, err := json.Marshal(items)
	return string(res), err
}

func main() {
	lambda.Start(Handler)
}
