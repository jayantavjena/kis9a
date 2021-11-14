> [【React/Vue】なぜコンポーネントベースで Web アプリを作るのか](https://zenn.dev/thim/articles/cc4f2d40307b24b6af1b)

## コンポーネント 5 つ特徴

### 単一責任の原則

コンポーネントが責任を持つ問題は 1 つにするべき。
可読性が向上します。また、ソース変更時の影響範囲が明確になることで保守性が向上します。

### カプセル化されている

コンポーネントを使いたいとき、インターフェースだけ知っていれば内部の実装を気にしなくて良いです。

### 置換可能である

インターフェースさえ同じであれば違うコンポーネントに差し替えることができます。

### 再利用可能である

再利用可能なコンポーネントは、そのコンポーネントが担っている責務に対して過不足なく機能を提供していると言えます。
「過不足なく」というのは意外と難しく、特にありがちなのが機能を過剰につけてしまうことです。
ある画面の文脈では必要な機能でも、別の画面では邪魔になることもあります。
コンポーネントの責務を常に意識し、再利用性を損なわないようにすることが大切です。

### 組み合わせて別の大きなコンポーネントを作成可能である

再利用性が十分に高いことの裏付けです。
一つ一つのコンポーネントは小さな問題しか解決できませんが、大きな問題を小さな問題に分割し、適切なコンポーネントに振り分ける役割を持つコンポーネントを作れば、それ自体が大きな問題を解決するコンポーネントになります。