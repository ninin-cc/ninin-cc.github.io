// RoleTRADE Mentalia - 体験調整用設定
// 画面遷移の「間」、カード確認、物語文面など、今後よく触る値をここに集めています。
// app.js はこの値を読み込みます。未指定の項目は app.js 側の既定値が使われます。

window.ROLETRADE_EXPERIENCE = {
  timing: {
    // 全ページ遷移。CSS の --rt-stage-fade-out-duration と近い値にすると自然です。
    stageFadeOutMs: 1200,

    // Page 3: 5枚のカードが左上へ寄ってから確認に入るまで。
    initialCardGatherMs: 1600,

    // Page 3: 確認カードをタップして次のカードへ移るまで。
    initialCardReviewAdvanceMs: 420,

    // Page 3: 最後の確認カードからハルカのセリフへ戻る余韻。
    initialCardReviewFinalReturnMs: 1180,

    // Page 3: 「最初の交換へ」ボタン後、場面遷移に入るまで。
    initialHandJourneyDelayMs: 760,

    // Page 15-16: 最終決定の余韻。
    resultDecisionHoldMs: 3000,
    resultDecisionCloseMs: 620,

    // Page 4/7以降: 交換成立後、余韻画面へ入るまで。
    exchangeSettleMs: 600
  },

  copy: window.ROLETRADE_COPY || {}
};
