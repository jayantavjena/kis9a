| 種別     | 説明                                                                |
| -------- | ------------------------------------------------------------------- |
| htpasswd | MD5 や SHA1、Bcrypt でパスワードがエンコードされたファイル。        |
| OSIAM    | REST で使用できる認証管理サーバ。                                   |
| Simple   | 引数でユーザとパスワードを指定。                                    |
| OAuth2   | ご存じ OAuth2。現在は組み込みプロバイダとして GitHub のみサポート。 |

JWT

- header, payload, signature,

authentication step
authorization step
desiisions step
token validation

HTTP Basic と HTTP Digest 認証
サードパーティ認証：QQ、weibo、doubian、OPENID、google、github、facebook および twitter
カスタム定義のユーザログイン、サインアップ、ログアウトは一般的に session、cookie 認証にもとづいています。
