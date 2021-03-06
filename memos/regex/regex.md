- [正規表現の正規とは何か気になったら正規表現の歴史を紐解くことになってしまった話](https://zenn.dev/yucatio/articles/0b554e59db0158)
- [基本的な正規表現一覧 | murashun.jp](https://murashun.jp/article/programming/regular-expression.html)

| 正規表現の例 | 意味 | マッチする例 |
| --- | --- | --- |
| 通常の文字 | そのままの文字 | 「abc」なら「abc」 |
| . | 任意の1文字 | 「a」でも「b」でも何でも |
| \\n | 改行 |  |
| \\t | タブ |  |
| \\. \\( \\) \\[ \\] \\^ \\$ \\\ | 記号ではなく文字 | 「.」「(」「)」「[」「]」「^」「$」「\\」 |

| 正規表現の例 | 意味 | マッチする例 |
| --- | --- | --- |
| [abc] | abcのうち1文字 | 「a」「b」「c」のいずれか |
| [^abc] | abc以外の1文字 | 「d」など |
| [A-Za-z] | AからZ、aからzのうちの1文字 | 「d」など |
| \\d | 数字1文字 | 「0」から「9」までのいずれか |
| \\w | 英数字1文字 | 「a」「B」「7」など |
| \\s | 空白文字1文字 | 空白、改行、タブなど |
| \\p{InBasicLatin} | ラテン文字1文字 | 「a」「B」記号など |
| \\p{InHiragana} | 平仮名1文字 | 「あ」「ん」など |
| \\p{InKatakana} | 片仮名1文字 | 「ア」「ン」など |
| \\p{InCJKUnifiedIdeographs} | 漢字1文字 | 「漢」「字」など |

| 正規表現の例 | 意味 | マッチする例 |
| --- | --- | --- |
| ^ | 行頭 | 「^un」は「un」で始まる文字列 |
| $ | 行末 | 「ing$」は「ing」で終わる文字列 |

| 正規表現の例 | 意味 | マッチする例 |
| --- | --- | --- |
| ? | 直前の文字が0個か1個 | 「e?grep」は「grep」か「egrep」 |
| \* | 直前の文字が0個以上 | 「.\*」は 0文字以上の任意の文字列 |
| + | 直前の文字が1個以上 | 「.+」は 1文字以上の任意の文字列 |
| \\{n} | 直前の文字がn個 | 「a\\{2}」は「aa」 |
| \\{n,} | 直前の文字がn個以上 | 「a\\{2,}」は「aa」「aaa」... |
| \\{n,m} | 直前の文字がn個以上,m個以下 | 「a\\{2,3}」は「aa」「aaa」 |
| +? | 直前の文字が1個以上，ただしマッチする最小の範囲 |  |

| 正規表現の例 | 意味 | 備考 |
| --- | --- | --- |
| tdu\|dendai | tdu または dendai | 範囲を区切るため全体を()で囲むことが多い |
| () | グループ分け | group(n)でn番目のグループにマッチした文字列を参照できる |


\d{4}-\d{2}-\d{2}
