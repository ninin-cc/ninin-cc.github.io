# RoleTRADE Mentalia 調整メモ

今後の微妙な体験調整で触る場所を分けています。

- `experience.config.js`
  - 画面遷移の待ち時間
  - Page 2 / Page 3 / Page 5 / Page 6 / Page 12 のセリフ
  - カード確認の待ち時間

- `experience.css`
  - フェードアウト / フェードインの体感速度
  - Page 3 のカード寄せ速度
  - Page 6 の文章表示のフェード感

- `app.js`
  - ゲーム進行、カード交換、状態管理
  - 体験調整だけなら、まず `experience.config.js` を見る

- `styles.css`
  - 基本レイアウト、カード、画面全体の見た目
  - 体験速度は CSS 変数で `experience.css` から上書き

読み込み順は `index.html` で、
`styles.css` → `experience.css`、`experience.config.js` → `app.js` です。
