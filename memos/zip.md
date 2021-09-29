>

```
zip 圧縮
zip -r FILENAME.zip FILE_DIR

zip 圧縮（パスワード付き）
zip -re FILENAME.zip FILE_DIR

zip 圧縮（DS_Store、**MACOSX を含めない）
zip -r FILENAME.zip FILE_DIR -x "_.DS_Store" "_**MACOSX*"

zip 圧縮（パスワード付き：DS_Store、\_\_MACOSX を含めない）
zip -r -P PASSWORD FILENAME.zip FILE_DIR -x "*.DS_Store" "_\_\_MACOSX_"

zip から DS_Store、**MACOSX を削除
zip --delete FILENAME.zip "_.DS_Store" "_**MACOSX\*"

zip 解凍
unzip FILENAME.zip
```

[zip コマンド - Qiita](https://qiita.com/seyself/items/ae47f1c22a7375a736f3)
