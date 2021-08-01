---
title: "Vim script. カーソル下のリンクの<title>を取得して、テキストリンクに置き換える。"
slug: "vim-expand-link-to-text-link"
emoji: "🛠"
type: "tech"
topics: ["vim", "markdown"]
published: false
---

## 初めに

Vim では、リンクの上で`gx`をタイプすることで、ブラウザーでそのリンクを開くことができます。それを参考に、今回はカーソル下のリンクの<title>を取得して、テキストリンクに置き換える関数を書いてみました。単純ですが、個人的に markdown でメモを取る時や、参考 URL を書く時などに便利に使用しています。

### 1.カーソル下のリンクを取得する。

これが、結構難しいと思っていましたが、案外簡単でした。

```vim
expand('<cfile>') "	<cfile> file name under the cursor
```

でカーソル下のファイル名（URL）を含むを取得し、

```vim
if (netrw#CheckIfRemote() == 0 && a:fname =~ '^https\=:')
```

で URL かを判断します。

### 2.テキストリンクを取得する。

```vim
function! s:getTextLink(link)
   if executable('curl')
    let cmd = "curl -sL '". a:link ."' | grep -o '<title>[^<]*' | tail -c+8"
    let title = substitute(system(cmd), '\n$', '', '')
    return "[". title ."](". a:link .")"
  endif
endfunction
```

curl と grep,tail を使用し簡単に <title> を取得してテキストリンクに整形して返します。

### 3.リンクをテキストリンクに置き換える。

```vim
function! s:replaceToTextLink(fname, remote)
  if (a:remote == 0 && a:fname =~ '^https\=:')
    let linkText=s:getTextLink(a:fname)
    execute line(".") . "s;" . a:fname . ";" . linkText . ";g"
  endif
endfunction
```

現在の行のリンクをテキストリンクに置き換えます。
置換文字列が、`/`を含む場合、区切り文字は`;`で記述します。

## イメージ

![](/images/vim-expand-link-to-text-link.gif)

## ソースコード

```vim:.vimrc
function! s:getUserInput(label)
  let curline = getline('.')
  echohl Question
  call inputsave()
  let input=input(a:label . " > ")
  echohl NONE
  call inputrestore()
  call setline('.', curline)
  return input
endfunction

function! s:getTextLink(link)
   if executable('curl')
    let cmd = "curl -sL '". a:link ."' | grep -o '<title>[^<]*' | tail -c+8"
    let title = substitute(system(cmd), '\n$', '', '')
    return "[". title ."](". a:link .")"
  endif
endfunction

function! s:replaceToTextLink(fname, remote)
  if (a:remote == 0 && a:fname =~ '^https\=:')
    let linkText=s:getTextLink(a:fname)
    execute line(".") . "s;" . a:fname . ";" . linkText . ";g"
  endif
endfunction

function s:putTextLink()
  let link = s:getUserInput("link")
  if (link =~ '^https\=:')
    put=s:getTextLink(link)
  else
    echoerr link . " =~ '^https\=:' is false"
  endif
endfunction

nnoremap <silent> ml :call <SID>replaceToTextLink(expand('<cfile>'), netrw#CheckIfRemote())<CR>
nnoremap <silent> mi :call <SID>putTextLink()<CR>
```

## 終わりに

毎回、ブラウザから、ページタイトルをコピペしてくる必要はないのです。
自分は、簡単な vim script しか書けませんが、
簡単でシンプルなアイデアが、今回 生産性をあげました。
これからも Vim にはお世話になりそうなので、Vim script 力も地味に上げていきたいと思います。強い Vim scripter の皆様、お手柔らかにお願いします！
