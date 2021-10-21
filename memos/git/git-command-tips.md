### delete all local branch

```sh
git branch | grep -v '^*' | xargs git branch -D
```

### find commits yet to be applied to upstream

https://git-scm.com/docs/git-cherry

```sh
git cherry [-v] [<upstream> [<head> [<limit>]]]

```

```
o search the commit log (across all branches) for the given text:

git log --all --grep='Build 0051'
To search the actual content of commits through a repo's history, use:

git grep 'Build 0051' $(git rev-list --all)
### new base branch --onto <newbase>

```

### git rebase --onto

```sh
git rebase --onto
```

git rebase --root -i.
git log --pretty=fuller
git rebase --committer-date-is-author-date

### git clone with submodule

```
git clone -b v1 --depth=1 https://github.com/nkjm/bootcamp-sushi-bot.git
```

```
alias gco=gco
function gco() {
date=$(date -v -$1d)
git commit --date $date
}
alias gcoa='git rebase HEAD~ --committer-date-is-author-date'

git credential fill
git credential reject

git remote set-url origin git://<userid>:<passwd>@github.com/user/myapp.git`
git config --global url."https://<userid>@github.com".insteadOf "https://github.com"

まだaddされていない部分だけを一時保存
git stash -k

まだgit管理に入っていないファイルもstashする。
git stash -u

stash all
git stash -a

gitignore files show
git ls-files --others -i --exclude-standard
```

- by [Github で一番有名な Git TIPS 集 - Qiita](https://qiita.com/rana_kualu/items/4d5e27244256e9689304)

git gc --aggressive --prune

```
git shortlog --since="$(date +"%Y-%m-%d") 00:00:00" --no-merges -sn
git config --global alias.today "log --since=midnight --author='$(git config user.name)' --oneline"
```

[git gc の仕組みを原理から理解してサイズを 136MB → 7.2MB(95%減)まで削減した時の勉強メモ](https://zenn.dev/ulwlu/articles/cc2443d32e2444)

```
#!/bin/bash

function main() {
	user=$(git config --list | grep user.name | cut -f 2 -d "=")

  if [[ 'kis9a' = "$user" ]]; then
		git config --global user.name 'kis9ax'
		git config --global github.user 'kis9ax'
		git config --global user.email 'kaito@gmail.com'
  elif [[ 'kis9ax' = "$user" ]]; then
		git config --global user.name 'kis9a'
		git config --global github.user 'kis9a'
		git config --global user.email 'kis9ax@gmail.com'
  fi

   user=$(git config --list | grep user.name | cut -f 2 -d "=")
   email=$(git config --list | grep user.email | cut -f 2 -d "=")

   echo "$user" "$email"
}

main
```
