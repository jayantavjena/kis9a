[ssh 公開鍵認証設定まとめ - Qiita](https://qiita.com/ir-yk/items/af8550fea92b5c5f7fca#%E3%83%AF%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%8A%E3%83%BC%E3%81%A7%E5%AF%BE%E8%B1%A1%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AEauthorized_keys%E3%81%B8%E8%BF%BD%E8%A8%98%E3%81%99%E3%82%8B)

鍵作成

```
ssh-keygen -t rsa
ssh-keygen -t rsa -b 4096


# 公開鍵: ~/.ssh/id_rsa.pub
# 秘密鍵: ~/.ssh/id_rsa

```

設定ファイル

```
/etc/ssh/sshd_config

# PasswordAuthentication no
# PermitRootLogin no

systemctl restart sshd
```

エイリアス

```
/home/$user_name/.ssh/config

Host $alias
  HostName $remote_host_name
  User $remote_user_name
  IdentityFile /home/$user_name/.ssh/$secret_key
```
