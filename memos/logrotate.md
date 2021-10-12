[ログローテートソフトウエア logrotate についてまとめ - Qiita](https://qiita.com/shotets/items/e13e1d1739eaea7b1ff9)

## ファイル構成

| パス                      | 役割                                             |
| ------------------------- | ------------------------------------------------ |
| /etc/logrotate.conf       | ログローテーション全体の設定ファイル             |
| /etc/logrotate.d/\*       | 各サービスごとの設定ファイル                     |
| /var/lib/logrotate.status | 最後にローテーションした日時を管理するファイル。 |
