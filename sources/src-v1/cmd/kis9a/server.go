package main

import (
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/fsnotify/fsnotify"
)

func server(port string) {
	err := initializeDist()
	if err != nil {
		log.Fatal(err)
	}
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()
	done := make(chan bool)
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Create == fsnotify.Create {
					if err := bundle(); err != nil {
						log.Println(err)
					}
				}
				if event.Op&fsnotify.Remove == fsnotify.Remove {
					if err := bundle(); err != nil {
						log.Println(err)
					}
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					if err := bundle(); err != nil {
						log.Println(err)
					}
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println(err)
			}
		}
	}()
	if err := filepath.Walk(getSrcPath(), func(path string, fi os.FileInfo, err error) error {
		if fi.Mode().IsDir() {
			return watcher.Add(path)
		}
		return nil
	}); err != nil {
		log.Fatal(err)
	}
	err = ws()
	if err != nil {
		log.Fatal(err)
	}
	<-done
}

func commandExists(cmd string) bool {
	if _, err := exec.LookPath(cmd); err != nil {
		return false
	} else {
		return true
	}
}

func ws() error {
	var err error
	port := cmdopts.Server.Port
	if commandExists("live-server") {
		var cmd string
		if port != "" {
			cmd = strings.Join([]string{"live-server ", getDistPath(), " --port=", port}, "")
		} else {
			cmd = strings.Join([]string{"live-server ", getDistPath()}, "")
		}
		log.Println("Listening...", port)
		_, err := execOutput(cmd)
		if err != nil {
			return err
		}
	} else {
		fs := http.FileServer(http.Dir(getDistPath()))
		http.Handle("/", fs)
		port = strings.Join([]string{":", port}, "")
		log.Println("Listening...", port)
		err = http.ListenAndServe(port, nil)
	}
	return err
}
