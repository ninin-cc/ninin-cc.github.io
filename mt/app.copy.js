// RoleTRADE Mentalia - セリフ/文言設定
// セリフや説明文など、頻繁に修正するコピーはこのファイルに集約します。
// experience.config.js は window.ROLETRADE_COPY を読み込み、app.js に渡します。

window.ROLETRADE_COPY = {
    // Page 2: リフレムの導入
    rulesGuideScreens: [
      [
        '<p class="roletrade-opening-statement">人は役割を通じて世界と接し、</p>',
        '<p class="roletrade-opening-statement">その役割の引き受け方を変えることで、</p>',
        '<p class="roletrade-opening-statement">世界との関わり方を変えることができる。</p>',
        '<div class="roletrade-opening-top-copy"><p class="roletrade-opening-top-lead">ここはメンテーリア。<br>役割と物語が、人の未来を少しだけ変える世界。</p><p>あなたは今、これまでの記憶と経験を持ったまま、<br>もう一度、<span class="roletrade-opening-top-emphasis">18歳の自分</span>として旅立とうとしています。</p><p>けれど、<span class="roletrade-opening-top-emphasis">持っていける役割は5つだけ</span>。<br>あなたは、どんな役割を未来の自分に託しますか？</p></div>'
      ],
      [
        '<p>ようこそ、旅人よ。</p>',
        '<p>この世界では、</p><p>人はひとつの役割【Role】だけで</p><p>生きているわけではない…。</p>',
        '<p>ほれ、<br>お主も身に覚えがあるじゃろう？</p>',
        '<p>そう、人は、場面のひとつひとつで</p><p>様々な役割を使っておるのじゃ。</p>',
        '<p>誰かを守る役割。</p><p>新しい道をひらく役割。</p><p>静かに観察する役割。</p><p>場をあたためる役割</p><p>まさに、無数の役割じゃ…。</p>'
      ],
      [
        '<p>おぬしは、これから</p><p>5つのカードを得る。</p>',
        '<p>それは、おぬしの性格を</p><p>決めるものではない。</p>',
        '<p>これからの人生で、</p><p>どんな力を使っていきたいのかを</p><p>見つめるためのカードなのじゃよ。</p>'
      ]
    ],

    // Page 2: ハルカのルール説明
    rulesDetailBlocks: [
      '<p>わたしからは<br>ルールの説明をしますね。</p>',
      '<p>①持っていける役割カードは<br>　5枚だけです。</p>',
      '<p>②最初に私が<br>　カードをお渡しします。</p>',
      '<p>③その後はここから出て<br>　旅の酒場で、ほかの旅人たちと<br>　役割カードを交換…。</p>',
      '<p>④最後は<br>　この部屋に戻ってきてくださいね。</p>',
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
      '<p>あ！そうだ！</p><p>大事なことを言い忘れてた！</p><div class="h-1.5 sm:h-2"></div><p>酒場では「必ず」</p><p>カードを交換しなくちゃいけないの。</p><p>これは忘れないでね。</p>',
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
  };
