Chef

- メリット
  Ruby を採用しているため、Ansible と比べて繰り返し処理を書きやすい
  大規模な構成でも対応可能なツールが揃っている(Chef-Server など)
  Chef-Server があれば WebUI をつかって確認が可能

- デメリット
  学習コストがすごく高い
  設定ファイルの記述が Ruby そのもの
  Chef の構成要素が多く、変更コストも高い
  プロビジョニング対象に Chef を入れておく必要がある(Chef-server,Chef-client)

Ansible

- メリット
  言語仕様として YAML を採用
  YAML のおかげで記述をシンプルかつ可読性高く
  学習コストが少
  必要なファイル群が少
  プロビジョニング先に Ansible をインストールする必要はなし

- デメリット
  繰り返しの実行などがモジュールによっては複雑
  プロビジョニング対象が大規模になるとコードが属人化
  大規模な構成の場合 ディレクトリ構成を決めて管理する必要がある
  **ansible の template jinja2 が vim と相性悪い**
  vim のデフォルトの foldmarker(折りたたみマーク)は{{{,}}}なんですが、これが jinja2 のテンプレートの syntax とバッティングしてエラーになります。
  foldmarker を変えれば済む話なのですが、すでに書いてしまった conf ファイルを template 化するときに気をつける必要があります。
  **chef の not_if 相当のことができない**
  chef ではリソース実行のときに not_if でコマンドを実行し、結果を元に実行の可否を判断できましたが、ansible だと一旦コマンドを実行してから register: result みたいに保存して後ろで判定しなければいけないのがちょっと面倒です。

[chef から ansible に乗り換えた 5 つの理由｜ TechRacho by BPS 株式会社](https://techracho.bpsinc.jp/yamasita-taisuke/2014_05_29/17567)
