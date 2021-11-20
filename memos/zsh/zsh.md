1. global) /etc/zshenv
2. local ) ~/.zshenv
3. global) /etc/zshrc
4. local ) ~/.zshrc

$ zcompile ~/.zshrc
.zshrc.zwc

| コマンド        | 内容                                              |
| --------------- | ------------------------------------------------- |
| man zsh         | zsh の概要                                        |
| man zshall      | zsh man ページのまとめ                            |
| man zshbuiltins | zsh ビルトインコマンド概要                        |
| man zshcalsys   | zsh のカレンダーシステム概要                      |
| man zshcompsys  | zsh のコマンドライン補完の概要                    |
| man zshexpn     | zsh 展開の概要                                    |
| man zshmisc     | 文字通り雑多な詰め合わせ(パイプ、リダイレクト等） |
| man zshoptions  | zsh で設定可能なオプション一覧                    |
| man zshparam    | zsh の変数関係の記号や使い方                      |
| man zshzle      | zsh のコマンドラインエディタ概要                  |

chpwd
Executed whenever the current working directory is changed.

periodic
If the parameter PERIOD is set, this function is executed every $PERIOD seconds, just before a prompt.

precmd
Executed before each prompt.

preexec
Executed just after a command has been read and is about to be executed. If the history mechanism is active, the string to be executed is passed as an argument.

TRAPNAL
If defined and non-null, this function will be executed whenever the shell catches a signal SIGNAL, where NAL is a signal name as specified for the kill builtin. The signal number will be passed as the first parameter to the function.
If a function of this form is defined and null, the shell and processes spawned by it will ignore SIGNAL.

TRAPDEBUG
Executed after each command.

TRAPEXIT
Executed when the shell exits, or when the current function exits if defined inside a function.

TRAPZERR
Executed whenever a command has a non-zero exit status.
The functions beginning `TRAP' may alternatively be defined with the trap builtin: this may be preferable for some uses, as they are then run in the environment of the calling process, rather than in their own function environment.
