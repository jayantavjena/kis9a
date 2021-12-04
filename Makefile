PROFILE_PATH := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
PROFILE_NAME := $(shell basename $(PROFILE_PATH))
LINKFILES := memos images
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
DATE := $(shell date +"%F")
.DEFAULT_GOAL := help

pa: push-all
pbz: publish-zenn
pbs: publish-sources
help: show-help

push: ## push ${dir}
	@git reset .
	@git add ${dir}
	@make check-staged
	@git commit -m "${dir}: update ${DATE} ${msg}"
	@git push

push-all: ## push all
	@$(foreach val, $(DIRS), make push dir=$(val);)

publish-sources: ## publish sources
	-@(which gh-pages >/dev/null && gh-pages -b dist -d sources/src/dist -t)
	-@(which gh-pages >/dev/null || npx gh-pages -b dist -d sources/src/dist -t)

publish-zenn: ## publish zenn
	-@(which gh-pages >/dev/null && gh-pages -b zenn -d zenn -t)
	-@(which gh-pages >/dev/null || npx gh-pages -b zenn -d zenn -t)

check-staged:
	@git status --short | grep '^\w.' # show staged files or error stop

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
