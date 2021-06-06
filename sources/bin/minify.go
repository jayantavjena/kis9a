package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
	"github.com/tdewolff/minify/v2/js"
	"github.com/tdewolff/minify/v2/json"
	"github.com/tdewolff/minify/v2/svg"
)

var minifyWalkBase = ""

func minifySrc() {
	minifyWalkBase = paths.Src
	if err := filepath.Walk(minifyWalkBase, walkMinify); err != nil {
		log.Fatal(err)
	}
}

func minifyPages() {
	minifyWalkBase = paths.Pages
	if err := filepath.Walk(minifyWalkBase, walkMinify); err != nil {
		log.Fatal(err)
	}
}

func walkMinify(path string, fi os.FileInfo, err error) error {
	m := minify.New()
	fileType := getFileType(path)
	switch fileType {
	case JS:
		if err := minifyJS(m, path); err != nil {
			log.Fatal(err)
		}
	case CSS:
		if err := minifyCSS(m, path); err != nil {
			log.Fatal(err)
		}
	case HTML:
		if err := minifyHTML(m, path); err != nil {
			log.Fatal(err)
		}
	case JSON:
		if err := minifyJson(m, path); err != nil {
			log.Fatal(err)
		}
	case SVG:
		if err := minifySVG(m, path); err != nil {
			log.Fatal(err)
		}
	default:
		if !fi.IsDir() {
			copyFileToDist(path)
		}
	}
	return nil
}

func getMinifyRW(path string) (*os.File, *os.File, error) {
	var r *os.File
	var w *os.File
	var err error
	r, err = os.Open(path)
	if err != nil {
		log.Fatal(err)
		return r, w, err
	}
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		log.Fatal(err)
		return r, w, err
	}
	wp := filepath.Join(paths.Dist, rp)
	bd := filepath.Dir(wp)
	if !isExistPath(bd) {
		os.MkdirAll(bd, 0755)
	}
	w, err = os.Create(wp)
	if err != nil {
		log.Fatal(err)
		return r, w, err
	}
	return r, w, err
}

func minifyJS(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = js.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyCSS(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = css.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyHTML(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		return err
	}
	err = html.Minify(m, w, r, nil)
	if err != nil {
		return err
	}
	return err
}

func minifyJson(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		log.Fatal(err)
	}
	err = json.Minify(m, w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func minifySVG(m *minify.M, path string) error {
	r, w, err := getMinifyRW(path)
	if err != nil {
		log.Fatal(err)
	}
	err = svg.Minify(m, w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	return err
}

func copyFileToDist(path string) error {
	rp, err := filepath.Rel(minifyWalkBase, path)
	if err != nil {
		return err
	}
	wp := filepath.Join(paths.Dist, rp)
	copyFile(path, wp)
	return err
}
