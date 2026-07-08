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
    resultDecisionHoldMs: 1400,
    resultDecisionCloseMs: 620,

    // Page 4/7以降: 交換成立後、余韻画面へ入るまで。
    exchangeSettleMs: 600
  },

  copy: {
    // Page 2: リフレムの導入
    rulesGuideScreens: [
      [
        '<p>この世界では、</p><p>人はひとつの役割【Role】だけで</p><p>生きているわけではない…。</p>',
        '<p>ほれ、お主も身に覚えがあるじゃろう？</p>',
        '<p>そう、人は、場面のひとつひとつで</p><p>様々な役割を使っておるのじゃ。</p>',
        '<p>誰かを守る役割。</p><p>新しい道をひらく役割。</p><p>静かに観察する役割。</p><p>場をあたためる役割…。</p>'
      ],
      [
        '<p>おぬしは、これから</p><p>5つのカードを得るじゃろう。</p>',
        '<p>それは、おぬしの性格を</p><p>決めるものではない。</p>',
        '<p>これからの人生で、</p><p>どんな力を使っていきたいのかを</p><p>見つめるためのカードなのじゃよ。</p>'
      ]
    ],

    // Page 2: ハルカのルール説明
    rulesDetailBlocks: [
      '<p>①持っていける役割カードは<br>　5枚だけです。</p>',
      '<p>②最初に私が<br>　カードをお渡ししますね。</p>',
      '<p>③その後はここから出て<br>　旅の酒場で、ほかの旅人たちと<br>　役割カードを交換…。</p>',
      '<p>④最後はこの部屋に戻ってきてくださいね。</p>',
      '<p>これは、自分を見つめる<br>時間なんです。</p>'
    ],

    // Page 3: カード確認前
    initialHandDialogueBlocks: [
      '<p>これが、今のあなたに</p><p>最初に渡される</p><p>5つの役割です。</p>',
      '<p>まずは、</p><p>ひとつひとつのカードを</p><p>読んでみてくださいね。</p>'
    ],

    // Page 3: 5枚の確認後
    initialHandPostReviewBlocks: [
      '<p>５枚の役割カードをみて</p><p>どんな気持ちになりましたか？</p>',
      '<p>今のその気持ち</p><p>大事にしてくださいね。</p>',
      '<p>じゃあ、わたしと、最初の…</p><p>役割カードの交換</p><p>【RoleTRADE™】をしましょうか</p>'
    ],

    // Page 5
    leaveShopDialogueBlocks: [
      '<p>すてきな役割を</p><p>選びましたね！</p>',
      '<p>この先にある酒場の</p><p>『RIESM亭』には、</p><p>あなたと同じような旅人たちが</p><p>集まってるんですよ。</p>',
      '<p>いろんな役割のカードを</p><p>持った人たちに</p><p>出会えるといいですね</p>',
      '<p>準備はいい？</p>',
      '<p>じゃあ、</p><p>楽しんできてね！</p>'
    ],

    // Page 6
    beforeTavernDialogueBlocks: [
      '<p>あなたは手元の役割カードを大事にしまうと、</p><p>石畳の道へ一歩踏み出した。</p><div class="h-1.5 sm:h-2"></div><p>半刻ばかり歩くと大通りの端に、</p><p>「RIESM亭」という酒場が見えてきた。</p><p>さっき聞いた通りの店構えだ。</p>',
      '<p>扉の向こうから、笑い声とグラスの音が聞こえてくる。</p><div class="h-1.5 sm:h-2"></div><p>さあ、他の旅人たちと出会う時間だ。</p>'
    ],

    // Page 12
    finalShopGuideIntro: '<p>よくぞ戻ってきた。</p><div class="h-1.5 sm:h-2"></div><p>大切なのは</p><div class="h-1.5 sm:h-2"></div><p>おぬしが、なぜそれを残し、<br>今の自分に必要だと感じたのか……じゃな。</p>',
    finalShopGuideDetail1: '<p>最後にもう一度だけ、<br>役割を入れ替えることができるぞ。</p><div class="h-1.5 sm:h-2"></div><p>変えても、変えなくてもよい。</p>',
    finalShopGuideDetail2: '<p>大切なのは<br>選んだ理由を、<br>おぬし自身の言葉で<br>受け取ることじゃよ。</p>',

    // Page 3: 5枚確認後、セリフ内に出る進行表示
    startInitialExchangeLabel: 'ハルカと最初の交換へ'
  }
};
