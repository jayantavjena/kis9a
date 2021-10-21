XSS 問題

> 今回の場合は JWT を Cookie に保存しているため XSS の脆弱性が残ります。
> XSS の対策は Cookie の HttpOnly 属性を true にすることです。
> HttpOnly を true にすることで、JavaScript から対象の Cookie へアクセスすることができなくなります。今回の場合は「アクセストークン JWT」「リフレッシュトークン JWT」に HttpOnly を設定します。「アクセストークン CSRF 対策トークン」と「リフレッシュトークン CSRF 対策トークン」に関しては HttpOnly 属性は設定しません。これらの使い方は以下の CSRF 問題で説明します。
