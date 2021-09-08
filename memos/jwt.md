> (1) ログイン画面から ID・PW を入力し、ログインボタンを押下(クライアント)
> (2) ログインボタンが押下されたら、入力された ID と PW をリクエストボディにのせログイン用エンドポイント（/login など）にリクエストを投げる(クライアント)
> (3) サーバ側はリクエストから ID・PW を取り出し、ユーザの検証（DB との比較など）を行う(サーバ)
> (4) ID・PW の組み合わせが不正な場合はステータスコード「401」を返す。(サーバ)
> (5) ID・PW の組み合わせが正しい場合は、JWT 等を生成し Cookie にセットし、ステータスコード「200」を返す。この際、Cookie にセットされる情報は以下の 4 つ(サーバ)
> 「アクセストークン JWT」
> 「リフレッシュトークン JWT」
> 「アクセストークン CSRF 対策トークン」
> 「リフレッシュトークン CSRF 対策トークン」
> (6) エラーコードを受け取った場合は再度認証を促す(クライアント)
> (7) ステータスコード「200」を受け取った場合は、ログイン後画面に遷移する(クライアント)
> (8) API リクエストを行う際は、Cookie の「アクセストークン JWT」をサーバ側に送る。また、CSRF 対策として、「アクセストークン CSRF 対策トークン」をヘッダーにセットしてサーバに送る。(クライアント)
> (9) API リクエストを受けったサーバは Cookie から「アクセストークン JWT」を取り出し、検証を行う。検証内容は「JWT の改ざんが行われていないか」「JWT の有効期限が切れていないか」。合わせて「アクセストークン CSRF 対策トークン」の検証も行う(サーバ)
> (10) JWT の改ざんが行われている場合はエラーを返し、ログイン画面に強制的にリダイレクト返す。検証に成功した場合は正しい API レスポンスを返す(サーバ)
> (12) JWT の有効期限が切れていた場合は、ステータスコード「401」を返す(サーバ)
> (13) 401 エラーを受け取ったクライアント側はトークンリフレッシュ用のエンドポイント（/refresh など)にリクエストを投げる(クライアント)
> (14) サーバは「リフレッシュトークン JWT」の検証（項番 9 と同等）と「リフレッシュトークン CSRF 対策トークン」の検証を行い、問題なければ、新しい「アクセストークン JWT」「リフレッシュトークン JWT」「アクセストークン CSRF 対策トークン」「リフレッシュトークン CSRF 対策トークン」を Cookie にセットし成功レスポンスを返す(サーバ)
> (15) リフレッシュトークンの検証に失敗した場合はエラーを返し、ログイン画面に強制的にリダイレクトする(サーバ)

JWT のように長い文字列を DB に保存する際、インデックス化に問題が生じることがあ ri アクセストークンを永続化せずにオンメモリで保持し、文字列長が短いリフレッシュトークンを保存する

[JOSE]は[Javascript Object Signing and Encryption]

https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/

[JWT を使った今どきの SPA の認証について | HiCustomer Lab - HiCustomer Developer&#39;s Blog](https://tech.hicustomer.jp/posts/modern-authentication-in-hosting-spa/)

- The user logs in with a login API call.
- Server generates JWT Token and refresh_token
- Server sets a HttpOnly cookie with refresh_token. jwt_token and jwt_token_expiry are returned back to the client as a JSON payload.
- The jwt_token is stored in memory.
- A countdown to a future silent refresh is started based on jwt_token_expiry
- <https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#login_usage>
