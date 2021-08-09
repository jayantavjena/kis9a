package main

import (
	"log"

	"github.com/PuerkitoBio/goquery"
	"github.com/ktr0731/go-fuzzyfinder"
	"github.com/pkg/browser"
)

var url = "https://qiita.com"

type Item struct {
	Title string
	Link  string
}

func main() {
	items, err := getTrends()
	if err != nil {
		log.Fatal(err)
	}
	idx, err := getInput(items)
	if err != nil {
		log.Fatal(err)
	}
	for _, i := range idx {
		browser.OpenURL(items[i].Link)
	}
}

func getInput(items []Item) ([]int, error) {
	idx, err := fuzzyfinder.FindMulti(
		items,
		func(i int) string {
			return items[i].Title
		},
	)
	return idx, err
}

func getTrends() ([]Item, error) {
	items := []Item{}
	doc, err := goquery.NewDocument(url)
	if err != nil {
		return items, err
	}
	h2 := doc.Find(".p-home_main h2")
	h2.Each(func(_ int, item *goquery.Selection) {
		link, _ := item.Find("a").Attr("href")
		items = append(items, Item{Title: item.Text(), Link: link})
	})
	return items, err
}
