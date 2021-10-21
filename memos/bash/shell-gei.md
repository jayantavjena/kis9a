```
echo あいうえお| grep -o . | tac | awk '{a=a?$0a$0:$0;print a}' | xargs -I@ bash -c 'printf "%*s\n" $(( (27 + $(printf @ | wc -c)) / 2 )) @' | sed 's/   /　/g'

echo あいうえお|grep -o .|tac|awk '{a=a?$0a$0:$0;$0=a;printf("%9s\n",a)}'|tac|tee >(tac)|sed 's/  /　/g;1i.' | uniq

echo あいうえお|grep -o .|awk '{a=a?a$0:$0;"echo "a"|rev|sed s/^.//"|getline b;printf("%9s\n",a b)}'|tac|tee >(tac)|sed 's/  /　/g'|uniq

echo 響け！ユーフォニアム|sed ':a;p;s/\(.\)\(.*\)/\2\1/;ba'|xargs -I@ bash -c 'clear;echo @|sed -ne"p;s/\(.\)\(.*\)/\\2\\1/;#"{0..9}|grep --color=always 響;sleep 0.1'

echo 1213141516170819 | rev | sed -r -e's/[0-9]{4}/&,/g' -e's/,/'{万,億,兆,京,垓}'/1' -e's/0+([^0-9])/\1/g;s/([^0-9])([^0-9])/\2/g;s/[^0-9]$//g' -e's/([0-9]{3})([0-9])/\1,\2/g' | rev

script -fq >(awk '{print strftime("%F %T ") $0}{fflush() }'>> PATH)

seq 3 8 | nl | xargs -n2 bash -c 'seq $1 | sed "s/^/printf \$(tput setaf 0)\$(tput setab $(($0 % 9)))$1\$(tput sgr0)\": \"/g;s/$/;echo;/g"|bash'

echo $(( 3 ** 3 ))
階乗

yes | nl | xargs -L 1 bash -c 'sleep 0.1; sed -n $((${0} % $(wc -l < /Users/kis9a/dev/Vim/neovim/runtime/menu.vim)))p | lolcat /Users/kis9a/dev/Vim/neovim/runtime/menu.vim'
yes | nl | xargs -L 1 bash -c 'sleep 0.1; sed -n $((${0} % $(wc -l < /Users/kis9a/dev/Vim/neovim/runtime/menu.vim)))p /Users/kis9a/dev/Vim/neovim/runtime/menu.vim'
```

- [個人的なシェル芸(シェルワンライナー)のまとめ | 俺的備忘録 〜なんかいろいろ〜](https://orebibou.com/ja/documents/shellgei/)
