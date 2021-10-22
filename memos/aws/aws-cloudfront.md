HTTP Error Code : 403 Forbidden
オリジン（今回は S3）が返却するステータスコード を入力します。
S3 の場合は前述の通り、存在しないファイルでも 403 を返します。

Error Caching Minum TTL（Seconds) : 300
「Response Page Path」で指定するファイルのキャッシュ時間です。
任意値で設定します。

Customize Error Response : Yes
カスタムファイルである error.html を表示させたいので「Yes」を選択します。

Response Page Path : /error.html
カスタムファイルの Path を指定します。
/error.html とした場合、アクセス URL は https://domain/error.html となります。

HTTP Response Code : 404 NotFound
条件に合致して「Response Page Path」のファイルを表示した際に、「CloudFront がクライアントに返却するステータスコード」を指定します。
