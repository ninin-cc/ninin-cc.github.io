# pmアプリ データ管理メモ

このフォルダは、心理学者クイズアプリの追加データ置き場です。

## ファイル

- `psychologists.js`: 心理学者一覧。五十音順・理論別一覧・受験別頻出表示で使います。
- `questions-career.js`: キャリア理論系の問題データ。NotebookLMで作った問題はまずここへ追加します。
- `question-banks.js`: 問題バンクの紐づけ。今後、分野別の問題ファイルを増やすときに編集します。

## 追加の基本手順

1. 新しい心理学者なら、先に `psychologists.js` へ人物データを追加します。
2. `questions-career.js` の `QUESTIONS_CAREER` 配列に問題オブジェクトを追加します。
3. `id`、`psychologistId`、`image`、`answer`、`pastExam.answer` を確認します。
4. `examTags` に `careerConsultant` または `industrialCounselor` を入れます。

`index.html` は画面・採点・一覧表示の本体です。問題追加だけなら、基本的に `index.html` は触らなくて大丈夫です。
