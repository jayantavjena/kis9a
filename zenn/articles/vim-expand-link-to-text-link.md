---
title: "カーソル下のリンクの<title>を取得して、テキストリンクに置き換える。Vim script."
slug: "vim-expand-link-to-text-link"
emoji: "🛠"
type: "tech"
topics: ["vim", "markdown"]
published: false
---

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
