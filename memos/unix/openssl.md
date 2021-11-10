openssl x509 -text -noout -in 証明書
openssl rsa -text -noout -in 秘密鍵
openssl req -text -noout -in CSR

CSR
「—–BEGIN CERTIFICATE REQUEST—–」からはじまり
「—–END CERTIFICATE REQUEST—–」で終わるファイルです。


秘密鍵
「—–BEGIN RSA PRIVATE KEY—–」からはじまり
「—–END RSA PRIVATE KEY—–」で終わるファイルです。


CER 証明書（公開鍵）
「—–BEGIN CERTIFICATE —–」からはじまり
「—–END CERTIFICATE—–」で終わるファイルです。


SSL証明書とは
ウェブサイトでSSL(https)を利用する場合、SSL証明書が必要となります。SSL証明書には、通信の暗号化に必要な鍵とサイト所有者の情報が含まれており、「通信の暗号化」と「サイト所有者の身元証明」の2つの役割を持ちます。
SSLによる暗号化通信は、「共通鍵暗号方式」・「公開鍵暗号方式」の仕組みを利用します。公開鍵暗号方式では、公開鍵の成りすましを防止するために公開鍵証明書が使われます。この公開鍵証明書は偽装されないようにデジタル署名が使われており、認証局（CA）が署名を行い、証明書の正当性を保証します。この証明書をサーバー側に格納して、通信の暗号化に使用します。証明書には証明書の有効期間、発行者、署名アルゴリズムなどの情報も含まれ、サイトを運営する方は有効期間内に証明書を更新する必要があります。
SSL証明書は、AWSのACM（Certificate Manager）を利用したり、外部プロバイダー（GMOなど）やLet’s Encryptなど無料のサービスで発行することも可能です。外部プロバイダーに証明書を要求する場合のCSR 作成やACMへのインポートは、下記記事を参照ください。
やさしいCSRの作り方

echo 'U2FsdGVkX19Qvh8L0t+zpptfNhgHX4a/RzpNB2nql9g=' | base64 -d | openssl enc -d -aes256 -pbkdf2 -pass file:<(echo 'zNn6...' | base64 -d)
