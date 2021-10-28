```
curl -H "Origin: http://example.com" --verbose \
  https://www.googleapis.com/discovery/v1/apis?fields=

curl -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: X-Requested-With" \
  -X OPTIONS --verbose \
  https://www.googleapis.com/discovery/v1/apis?fields=

curl -H "Origin: #{アクセス元のドメイン}" \
   -H "Access-Control-Request-Method: #{メソッド}" \
   -X OPTIONS --verbose \
      #{アクセス先のURL}

CORS設定でexample.comを許可している場合、
レスポンスに Access-Control-Allow-OriginやAccess-Control-Allow-Methodsが返ってくる。
```
