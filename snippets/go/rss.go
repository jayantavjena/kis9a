package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gorilla/feeds"
)

func main() {
	now := time.Now()
	feed := &feeds.Feed{
		Title:       "ブログタイトル",
		Link:        &feeds.Link{Href: "http://hoge.com/blog"},
		Description: "ブログの詳細",
		Author:      &feeds.Author{Name: "ohnishi", Email: "ohnishi@hoge.com"},
		Created:     now,
	}

	feed.Items = []*feeds.Item{
		&feeds.Item{
			Title:       "記事タイトル１",
			Link:        &feeds.Link{Href: "http://hoge.com/blog/article1"},
			Description: "記事の詳細1",
			Created:     now,
		},
		&feeds.Item{
			Title:       "記事タイトル2",
			Link:        &feeds.Link{Href: "http://hoge.com/blog/article2"},
			Description: "記事の詳細2",
			Created:     now,
		},
	}

	atom, err := feed.ToAtom()
	if err != nil {
		log.Fatal(err)
	}

	rss, err := feed.ToRss()
	if err != nil {
		log.Fatal(err)
	}

	json, err := feed.ToJSON()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(atom, "\n", rss, "\n", json)
}
