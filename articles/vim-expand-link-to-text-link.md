---
title: "Vim. カーソル下のリンクのタイトルを取得して、テキストリンクに置き換える。"
slug: "vim-expand-link-to-text-link"
emoji: "🛠"
type: "tech"
topics: ["vim", "markdown"]
published: false
---

## 初めに

Vim では、リンクの上で`gx`をタイプすることで、ブラウザーでそのリンクを開くことができます。それを参考に、今回はカーソル下のリンクのタイトルを取得して、テキストリンクに置き換える関数を書いてみました。単純ですが、個人的に markdown でメモを取る時や、参考 URL を書く時などに便利に使用しています。

## イメージ

![](/images/vim-expand-link-to-text-link.gif =600x)
_vim-expand-link-to-text-link_

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

function! s:putTextLink()
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

## その他

参考にした `gx` マッピング周りの関数

```vim
if !exists("g:netrw_nogx")
 if maparg('gx','n') == ""
  if !hasmapto('<Plug>NetrwBrowseX')
   nmap <unique> gx <Plug>NetrwBrowseX
  endif
  nno <silent> <Plug>NetrwBrowseX :call netrw#BrowseX(expand((exists("g:netrw_gx")? g:netrw_gx : '<cfile>')),netrw#CheckIfRemote())<cr>
 endif
 if maparg('gx','v') == ""
  if !hasmapto('<Plug>NetrwBrowseXVis')
   vmap <unique> gx <Plug>NetrwBrowseXVis
  endif
  vno <silent> <Plug>NetrwBrowseXVis :<c-u>call netrw#BrowseXVis()<cr>
 endif
endif
```

ノーマルモードの時は、netrw#BrowseX(fname, remote) 関数が呼ばれます。　　
ヴィジュアルモードの時は、NetrwBrowseXVis() が呼ばれます。
ここら辺の関数も様々なオプションによって制御されているので、興味があれば一度みてみると良いかもしれません。単純に、ブラウザで URL を開くときも、既存の関数を使う方が良い場合もあります。

```vim
:call netrw#BrowseX("https://zenn.dev", 0)
```

vim の界隈では、`gx` マッピングのカスタマイズは、結構している人も多そうなので、検索して更に深掘りできそうです。 [GitHub - stsewd/gx-extended.vim: Extend gx to use it beyond just URLs!](https://github.com/stsewd/gx-extended.vim) / [Google - vim+customize+gx+mapping](https://google.com/search?q=+vim+customize+gx+mapping)

コマンドラインで使用したい場合は、
~/.zshrc や ~/.bashrc に次のような関数を記述してください。

```bash:~/.zshrc
function mi() {
  echo -n '['"$( curl -sL "$1" | grep -o "<title>[^<]*" | tail -c+8 )"']('"$1"')'
}

# usage: mi 'https://github.com/'
```

## 終わりに

ブラウザから、ページタイトルをコピペしてくる必要はないです。
自分は、簡単な vim script しか書けませんが、
簡単でシンプルなアイデアが、今回 生産性をあげました。
これからも Vim にはお世話になりそうなので、  
Vim script 力も地味に上げていきたいと思います。
