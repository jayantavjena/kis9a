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

vvv

```

tl;dr: there is no difference between -v and -vvv.

Specifying -v multiple times usually means to increase verbosity accordingly.

This is true, e.g for a software like memcached:

-v            verbose (print errors/warnings while in event loop)
-vv           very verbose (also print client commands/reponses)
-vvv          extremely verbose (also print internal state transitions)
(behind the scenes the options parser accumulates the level of verbosity).

But with curl command-line tool this is not the case. As you can see from tool_getparam.c, passing -v simply toggles the so-called trace type to TRACE_PLAIN. Passing -vv or -vvv does the same.

```
