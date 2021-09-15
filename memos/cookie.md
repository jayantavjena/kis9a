リクエスト送信時に withCredentials=true をしないと set-cookie 情報があってもブラウザが Cookie をセットしてくれない
withCredentials=true をしても、サーバ側で Access-Controll-Allow-Credentials=true をレスポンスヘッダにセットしないと、ブラウザがレスポンスを処理してくれない。ただし、Cookie 情報は保存される。
Access-Control-Allow-Origin ヘッダーにワイルドカードを指定できない
ブラウザの設定でサードパーティ Cookie を拒否している場合、set-cookie 情報があっても保存されない(Safari はデフォルトブロック)
