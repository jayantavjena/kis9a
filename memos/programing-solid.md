SOLID 原則:

- Single Responsibility Principle：単一責任の原則:
  一つのクラスにメソッドを詰め込みすぎると、変更するときに２つ以上の要素を変えないといけなくなる。とにかく分割継承して役割単一にして、物体を変更する際には理由が１つだけになる事。

- Open/closed principle：オープン/クロースドの原則:
  拡張に対して開かれて、修正に対して閉じる、と書いても意味がわかりづらいが、interface にしてメソッドとしては開きつつ元の関数は修正あまりさせない感じ。これがわかりやすい。

- Liskov substitution principle：リスコフの置換原則:
  派生元と派生先は置換しても大丈夫でなければいけない。変に派生先で独自メソッドやパラメータを入れると置換できなくなり、これを修正した際に大量の物体を修正する必要が出る。

- Interface segregation principle：インターフェース分離の原則:
  ビジネスロジックの中で、使わないメソッドを依存しない。これは単純に継承して使えないなどたくさんデメリットがある。

- Dependency inversion principle：依存性逆転の原則:
  上位のモジュールは下位のモジュールに依存してはならなくて、どちらも抽象に依存してる状態にする事。これは上述通り。

- Single responsibility principle: 単一責務の原則
- Open/closed principle: 開放閉鎖の原則
- Liskov substitution principle: リスコフの置換原則
- Interface segregation principle: インターフェース分離の原則
- Dependency inversion principle: 依存性逆転の原則
