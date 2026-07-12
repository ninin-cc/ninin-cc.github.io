    const TRADE_AVATAR_PROFILES = [
      { src: "https://ninin-cc.github.io/img/rt/1.jpg", voice: "olderMale", gender: "male" },
      { src: "https://ninin-cc.github.io/img/rt/2.jpg", voice: "youngFemale", gender: "female" },
      { src: "https://ninin-cc.github.io/img/rt/3.jpg", voice: "youngFemale", gender: "female" },
      { src: "https://ninin-cc.github.io/img/rt/4.jpg", voice: "male", gender: "male" },
      { src: "https://ninin-cc.github.io/img/rt/5.jpg", voice: "male", gender: "male" },
      { src: "https://ninin-cc.github.io/img/rt/6.jpg", voice: "youngFemale", gender: "female" },
      { src: "https://ninin-cc.github.io/img/rt/7.jpg", voice: "male", gender: "male" }
    ];

    const TRADE_AVATARS_LIST = TRADE_AVATAR_PROFILES.map(profile => profile.src);

    const TRADE_MESSAGE_VARIANTS = {
      olderMale: [
        "おぬしの持つカード、なかなか面白そうだな。旅の途中で役に立つかもしれん。",
        "新しい役割を持って進むのも悪くない。ここでは互いにカードを交換する流れだ。",
        "旅は、思いがけない役割に助けられるものだ。交換して進むとしよう。",
        "正直に言うと、おぬしの持つカードの中に、俺の都合がいいものがありそうでな。",
        "交換というのは、損得だけではない。だが今回は、俺も少し得をしたい気分でな。",
        "互いの旅を少し進めるとしよう。俺の代わりの役割を渡すぞ。",
        "ここでは役割を交換するものらしい。なら、淡々と一枚ずつ差し出してみるのも悪くない。",
        "交換しなければならん流れなら、俺からはこのカードを出そう。"
      ],
      male: [
        "君の持つカード、少し気になるな。俺の役割と交換して進もう。",
        "お互いの旅に、新しい役割を連れていく価値がありそうだ。",
        "自分では選ばなかった役割が、道をひらくこともある。ここで交換して道を変えてみよう。",
        "手元のカードを手放したら、別の景色が見えるかもしれない。次へ行こう。",
        "悪いが、君のカードの中に俺が欲しいものがあるんだ。条件は対等だろう？",
        "今の俺には、新しい役割が必要なんだ。代わりに俺のカードを持っていってくれ。",
        "心配はいらない。交換した役割も、旅の中で意味を持つ。ただ、一度見比べてほしい。",
        "交換の場なら、交換する。それだけだ。俺からはこれを出す。",
        "決まりだから差し出す、というのも変な話だが……まあ、俺からも出そう。",
        "君の持つカードが俺の旅に噛み合いそうだ。少し自分勝手だが、交換を頼みたい。"
      ],
      youngFemale: [
        "あなたのカードの中に、少し気になるものがあるな。私の役割と交換しよう。",
        "自分では選ばなかった役割が、旅の途中で必要になることもあるよ。ここで交換して進もう。",
        "新しい役割を持ったあなたも見てみたいな。交換して、次の旅に持っていって。",
        "旅の途中だからこそ、いつもと違う役割を試せるのかも。交換して、少し景色を変えてみよう。",
        "ごめんね、少し自分勝手かもしれない。でも、あなたの手札が今の私には必要なんだ。",
        "このカードもあなたに合いそう。私からの役割として、ここで受け取ってほしいな。",
        "交換する場所なら、交換してみる。理由はそれだけでもいいのかもしれないね。",
        "交換しなきゃいけないらしいから……えっと、私からはこれを出してみるね。",
        "ここでの交換が、あなたの旅にも私の旅にも意味がありそう。互いの旅を進めよう。",
        "私はこっちの役割を手放してみる。そちらのどれかと交換して、次へ進みたいな。"
      ]
    };

    const TRADE_MESSAGES = {
      2: "君の持つカード、少し気になるな。俺の役割と交換してくれないか。",
      3: "自分では選ばなかった役割が、旅の途中で必要になることもある。ここで交換して進もう。",
      4: "だいぶ自分の強みが見えてきたんじゃない？ でも、他者と関わることで変わるものもある。さあ、交換しよう。",
      5: "もうすぐ次の場所へ向かう時だ。最後にこのカードを渡そう。一見苦手に見える役割も、きっと君を助けるはずだ。"
    };

    function getRandomTradeMessage(voice, usedMessages = []) {
      const messages = TRADE_MESSAGE_VARIANTS[voice] || TRADE_MESSAGE_VARIANTS.male;
      const availableMessages = messages.filter(message => !usedMessages.includes(message));
      return randomItem(availableMessages.length > 0 ? availableMessages : messages);
    }

    function getTravelerOfferCue(voice, offerCount) {
      const offerLabel = offerCount >= 4 ? '四つ' : (offerCount === 3 ? '三つ' : (offerCount === 2 ? '二つ' : '一枚'));
      const isMultiCardOffer = offerCount > 1;
      if (voice === 'youngFemale') {
        return isMultiCardOffer
          ? 'この' + offerLabel + 'のどれかと、あなたの一枚を交換してほしいな。'
          : 'この一枚と、あなたのどれか一枚を交換してほしいな。';
      }
      if (voice === 'olderMale') {
        return isMultiCardOffer
          ? 'この' + offerLabel + 'のどれかと、おぬしの一枚を交換してくれ。'
          : 'この一枚と、おぬしのどれか一枚を交換してくれ。';
      }
      return isMultiCardOffer
        ? 'この' + offerLabel + 'のどれかと、君の一枚を交換してくれ。'
        : 'この一枚と、君のどれか一枚を交換してくれ。';
    }

    function withTravelerOfferCue(message, voice, offerCount) {
      const cue = getTravelerOfferCue(voice, offerCount);
      return message.includes(cue) ? message : message + ' ' + cue;
    }

    function getRequestedHandTradeMessage(message, voice, requestedCard) {
      const requestedName = requestedCard?.name || 'そのカード';
      let cue = 'できれば「' + requestedName + '」と、この一枚を交換してくれ。断ってもいいが、応じてくれると助かる。';
      if (voice === 'youngFemale') {
        cue = 'できれば「' + requestedName + '」と、この一枚を交換してほしいな。断っても大丈夫だけど、応じてくれたら助かるよ。';
      } else if (voice === 'olderMale') {
        cue = 'できれば「' + requestedName + '」と、この一枚を交換してくれんか。断ってもよいが、応じてくれると助かる。';
      }
      return message.includes(requestedName) ? message : message + ' ' + cue;
    }

    function getTradeToneFromMessage(message = '') {
      if (message.includes('自分勝手') || message.includes('都合') || message.includes('得をしたい') || message.includes('欲しい') || message.includes('必要なんだ')) return 'selfish';
      if (message.includes('心配はいらない') || message.includes('役に立つ') || message.includes('合いそう') || message.includes('持っていって') || message.includes('景色を変えて')) return 'gentle';
      if (message.includes('交換する場所') || message.includes('交換の場') || message.includes('淡々') || message.includes('理由はそれだけ')) return 'flat';
      if (message.includes('しなきゃ') || message.includes('決まり') || message.includes('ならん流れ')) return 'reluctant';
      return 'balanced';
    }

    function getTradeProfileByAvatar(src) {
      return TRADE_AVATAR_PROFILES.find(profile => profile.src === src) || null;
    }

    function getRandomTradeEncounter(usedAvatarImgs = [], usedMessages = []) {
      const availableAvatars = TRADE_AVATAR_PROFILES.filter(profile => !usedAvatarImgs.includes(profile.src));
      const avatar = randomItem(availableAvatars.length > 0 ? availableAvatars : TRADE_AVATAR_PROFILES);
      const message = getRandomTradeMessage(avatar.voice, usedMessages);
      return {
        avatarImg: avatar.src,
        message,
        voice: avatar.voice,
        tone: getTradeToneFromMessage(message)
      };
    }
    const FAREWELL_MESSAGES = [
      "うむ。<br/><br/>選んだ役割は、おぬしを縛る鎖ではない。<br/><br/>必要なときに思い出す、<br/><br/>小さな灯火じゃ。"
    ];

    function getRandomFarewellMessage() {
      return randomItem(FAREWELL_MESSAGES);
    }

    const ROLETRADE_SCENE_IMG = "./roletrade_ichimaie.jpg";
    const MACHI_SCENE_IMG = "./machi.jpg";
    const HARUKA_AVATAR = ROLETRADE_SCENE_IMG;
    const REFREM_AVATAR = ROLETRADE_SCENE_IMG;
    const HARUKA_CROP_POSITION = "62% 44%";
    const REFREM_CROP_POSITION = "42% 40%";
    const HARUKA_SCENE_ZOOM = 1.38;
    const HARUKA_SCENE_ORIGIN = "62% 36%";
    const BG_START_MENTALIA = ROLETRADE_SCENE_IMG;

    const GUIDE_MESSAGES = {
      1: {
        name: "ハルカ",
        place: "役割の庭",
        avatar: HARUKA_AVATAR,
        avatarPosition: HARUKA_CROP_POSITION,
        avatarZoom: 2.35,
        avatarOrigin: "62% 32%",
        icon: "Sparkles",
        color: "text-orange-700",
        message: "<p>じゃあ、</p><p>私と最初のカード交換をしましょう。</p><p>手元の5つのうち、ひとつを手放して、</p><p>私が持ってるカードの中から、</p><p>ひとつを 迎えてください。</p>"
      },
      7: {
        name: "リフレム",
        place: "灯火の間",
        avatar: REFREM_AVATAR,
        avatarPosition: REFREM_CROP_POSITION,
        avatarZoom: 2.25,
        avatarOrigin: "42% 29%",
        icon: "Flame",
        color: "text-orange-700",
        message: "<p>さぁ、これで最後じゃ。</p><p>変えても、変えなくても</p><p>よいのじゃぞ。</p>"
      }
    };
