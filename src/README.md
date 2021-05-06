最近のフロントエンド技術の流れは早く、
さまざまなツールが次々と生まれています。
また、ほとんどのツールの特定の機能は、2~3 年経つと使うことがなくなったり、
メンテナーの消失により、依存関係のバグの発生などして、使い物にならなくなります。
特に他のモジュールに依存しているプロジェクトほど。

開発は、ツール駆動よりミッション駆動の方が早いです。
あなたのプロジェクトに、React を使う必要がありますか？Vue を使う必要がありますか？
特定の機能のためだけに大きなモジュールを管理する必要がありますか？
何も考えず、闇雲にツールを選択すると、ミッションの本質的以外での対応に苦しむことになるでしょう。

---

hyperapp は、開発段階であるため、モジュールの変更やモジュールの存在自体なくなるなど、
utilities を含めた、最適な組み合わせを見つける事や、
package.json, npm で、モジュールで管理するのは、自分にとって至難の業でした。
過去の version 1 や version 2 初期のオープンソースのプロジェクトを npm を使って試しましたが、
依存関係を解消できなかったり、大変な思いをします。

このプロジェクトでは、
モジュールではなく、関数で管理し、
現段階での hyperapp のベストプラクティスの調査、
または、副作用を含めた、実用的なシステムの構築を目標の一つとします。