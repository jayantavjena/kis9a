PROFILE_PATH := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))
PROFILE_NAME := $(shell basename $(PROFILE_PATH))
LINKFILES := memos images
EXCLUDES := Makefile .git .gitignore
DIRS := $(filter-out $(EXCLUDES), $(wildcard ??*))
DATE := $(shell date +"%F")
.DEFAULT_GOAL := help

ss: serve-sources
sz: serve-zenn
sm: serve-memos
ls: show-list
pa: push-all
pbz: publish-zenn
pbs: publish-sources
help: show-help

install: ## install
	@$(0) sources/install
	@(cd ./sources/src; yarn)

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

serve-zenn: ## serve zenn
	-@(which zenn >/dev/null && (cd ./zenn; zenn preview -p 7000 &))
	-@(which zenn >/dev/null || (cd ./zenn; npx zenn preview -p 7000 &))

serve-sources: ## serve sources
	@(cd ./sources/src; yarn serve)

serve-memos: ## serve memos
	@make memos-create-sidebar-file
	-@(which live-server >/dev/null && live-server ./memos)
	-@(which live-server >/dev/null || npx live-server ./memos)

memos-create-sidebar-file: ## memos create sidebar file
	@ls memos | grep .md | xargs -I {} bash -c "echo - [{}]\({}\) >> ./memos/_sidebar.md"
	@sort -u ./memos/_sidebar.md | tee ./memos/_sidebar.md

link: ## link data files
	@$(foreach val, $(LINKFILES), ln -sfnv $(abspath $(val)) $(PROFILE_PATH)/sources/src/dist/data/$(val);)

unlink: ## unlink data files
	@$(foreach val, $(LINKFILES), unlink $(PROFILE_PATH)/sources/src/dist/data/$(val);)

check-staged:
	@git status --short | grep '^\w.' # show staged files or error stop

show-list: ## show list dir
	@$(foreach val, $(DIRS), /bin/ls -dF $(val);)

show-help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# V1
# serve-sources: ## serve sources
#   @${PROFILE_NAME} bundle
#   @${PROFILE_NAME} server -d
