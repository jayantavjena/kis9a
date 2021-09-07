[vim 正規表現リファレンス - Qiita](https://qiita.com/kawaz/items/d0708a4ab08e572f38f3)

[vimでmarkdownのクォート内をシンタックスハイライトする方法とプラグイン - Qiita](https://qiita.com/joker1007/items/19632542492f6d6395d6)

```vim
"----------------------------------------------------------------
" Celestia Star Catalog Numbers
"----------------------------------------------------------------

" Regular int like number with - + or nothing in front
syn match celNumber '\d\+' contained display
syn match celNumber '[-+]\d\+' contained display

" Floating point number with decimal no E or e (+,-)
syn match celNumber '\d\+\.\d*' contained display
syn match celNumber '[-+]\d\+\.\d*' contained display

" Floating point like number with E and no decimal point (+,-)
syn match celNumber '[-+]\=\d[[:digit:]]*[eE][\-+]\=\d\+' contained display
syn match celNumber '\d[[:digit:]]*[eE][\-+]\=\d\+' contained display

" Floating point like number with E and decimal point (+,-)
syn match celNumber '[-+]\=\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+' contained display
syn match celNumber '\d[[:digit:]]*\.\d*[eE][\-+]\=\d\+' contained display

syn region celString start='"' end='"' contained
syn region celDesc start='"' end='"'

syn match celHip '\d\{1,6}' nextgroup=celString
syn region celDescBlock start="{" end="}" fold transparent contains=ALLBUT,celHip,celString

syn keyword celBlockCmd RA Dec Distance AbsMag nextgroup=celNumber
syn keyword celBlockCmd SpectralType nextgroup=celDesc

let b:current_syntax = "cel"

hi def link celTodo        Todo
hi def link celComment     Comment
hi def link celBlockCmd    Statement
hi def link celHip         Type
hi def link celString      Constant
hi def link celDesc        PreProc
hi def link celNumber      Constant

syn keyword celTodo contained TODO FIXME XXX NOTE
syn match celComment "#.*$" contains=celTodo
```
