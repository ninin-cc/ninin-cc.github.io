    const { useState, useEffect, useRef } = React;

    const RPG_THEME_CONFIG = {
      appName: "キャリアの宿屋™",
      appSubtitle: "-RIESM™　RoleTRADE™クエスト-",
      appTagline: "～あなたの休息と、旅立ちに祝福を～",
      documentTitle: "キャリアの宿屋™ -RIESM™ RoleTRADE™クエスト- ～あなたの休息と、旅立ちに祝福を～",
      exportTitle: "キャリアの宿屋™ - RIESM™ RoleTRADE™クエスト -",
      defaultAge: 40,
      ageSelectMin: 15,
      ageSelectMax: 99,
      memoryStartAge: 20,

      char1NameFull: "老魔法使いリフレム",
      char1NameShort: "リフレム",
      char1Type: "reflem",
      char1Img: "./img/rf.png",

      char2NameFull: "弟子 ハルカ",
      char2NameShort: "ハルカ",
      char2Type: "haruka",
      char2Img: "./img/hr.png",

      bookingUrl: "https://ninin-cc.github.io/",
      bookingButtonText: "人に話してみる",
      soloTooltipText: "「あなたの物語を、ゆっくり見つめる時間も大切。また別の場所で出会えるといいですね♪」",
      bookingTooltipText: "「誰かと話すことで考えがよりまとまる事もある。そうじゃのぉ、nininｷｬﾘｱﾙｰﾑには女性男性の二名が在籍しているそうじゃぞ✨」",
      companyUrl: "https://ninin-cc.github.io/",
      otherGuestsImg: "./img/kyaku.jpg",
      introResultPreviewImg: "./img/reflmn.jpg",

      backgroundImages: {
        tavern: "./img/sakaba.jpg",
        room: "./img/heya.jpg",
        journey: "./img/tabidachi.jpg"
      },

      colors: {
        pageBg: "#000000",
        baseText: "#f3f4f6",
        windowBg: "#000000",
        border: "#ffffff",
        buttonBg: "#000000",
        buttonText: "#ffffff",
        buttonHoverBg: "#ffffff",
        buttonHoverText: "#000000"
      },

      char1: {
        nameFull: "老魔法使いリフレム",
        nameShort: "リフレム",
        role: "老魔法使い",
        type: "reflem",
        img: "./img/rf.png",
        dialogColor: "bg-amber-900 border-yellow-500",
        dialogBg: "bg-amber-900",
        portraitBg: "bg-gradient-to-b from-amber-700 to-amber-950"
      },

      char2: {
        nameFull: "弟子 ハルカ",
        nameShort: "ハルカ",
        role: "弟子",
        type: "haruka",
        img: "./img/hr.png",
        dialogColor: "bg-rose-900 border-rose-400",
        dialogBg: "bg-rose-900",
        portraitBg: "bg-gradient-to-b from-rose-700 to-rose-950"
      },

      scenarioText: {
        intro: {
          firstGuide: "「このアプリでは、キャリアデザインでよく使われる『WILL・CAN・MUST』を洗い出し、それぞれをつなげながら、お主自身の気づきを見つけていけるのじゃー。」",
          secondGuide: "「30分くらいの時間をとって、じっくり自分と向き合ってみてくださいね。\n\nスマホでもできますが、できれば魔法箱――パソコンの大きな画面で取り組むのがおすすめです！」"
        },
        can: {},
        memory: {},
        chart: {},
        will: {},
        must: {},
        summary: {}
      }
    };

    const createThemeConfig = (overrides = {}) => {
      const char1 = {
        ...RPG_THEME_CONFIG.char1,
        ...(overrides.char1 || {})
      };
      const char2 = {
        ...RPG_THEME_CONFIG.char2,
        ...(overrides.char2 || {})
      };

      return {
        ...RPG_THEME_CONFIG,
        ...overrides,
        backgroundImages: {
          ...RPG_THEME_CONFIG.backgroundImages,
          ...(overrides.backgroundImages || {})
        },
        colors: {
          ...RPG_THEME_CONFIG.colors,
          ...(overrides.colors || {})
        },
        char1,
        char2,
        char1NameFull: char1.nameFull,
        char1NameShort: char1.nameShort,
        char1Type: char1.type,
        char1Img: char1.img,
        char2NameFull: char2.nameFull,
        char2NameShort: char2.nameShort,
        char2Type: char2.type,
        char2Img: char2.img,
        scenarioText: {
          ...RPG_THEME_CONFIG.scenarioText,
          ...(overrides.scenarioText || {}),
          intro: {
            ...RPG_THEME_CONFIG.scenarioText.intro,
            ...((overrides.scenarioText || {}).intro || {})
          }
        }
      };
    };

    const THEMES = {
      rpg: createThemeConfig({
        themeId: "rpg",
        themeLabel: "RPG風",
        nextThemeLabel: "喫茶店風"
      }),
      cafe: createThemeConfig({
        themeId: "cafe",
        themeLabel: "喫茶店風",
        nextThemeLabel: "RPG風",
        appName: "キャリアカフェ™",
        documentTitle: "キャリアカフェ™ -RIESM™ RoleTRADE™クエスト- ～あなたの休息と、旅立ちに祝福を～",
        exportTitle: "キャリアカフェ™ - RIESM™ RoleTRADE™クエスト -",
        backgroundImages: {
          tavern: "./img/cafei.jpg",
          room: "./img/jishitsu.jpg",
          journey: "./img/cafee.jpg"
        },
        colors: {
          pageBg: "#fdf6e3",
          baseText: "#1e293b",
          windowBg: "#fefce8",
          border: "#8d6e63",
          buttonBg: "#4a3f35",
          buttonText: "#fdf6e3",
          buttonHoverBg: "#1e293b",
          buttonHoverText: "#ffffff"
        },
        char1: {
          nameFull: "オーナー",
          nameShort: "オーナー",
          role: "喫茶店のオーナー",
          img: "./img/mt.png",
          dialogColor: "bg-[#fefce8] border-[#8d6e63]",
          dialogBg: "bg-[#fefce8]",
          portraitBg: "bg-gradient-to-b from-[#f6e7bf] to-[#d7b98f]"
        },
        char2: {
          nameFull: "理澄",
          nameShort: "理澄",
          role: "看板娘",
          img: "./img/rz.png",
          dialogColor: "bg-[#fefce8] border-[#8d6e63]",
          dialogBg: "bg-[#fefce8]",
          portraitBg: "bg-gradient-to-b from-[#f6e7bf] to-[#d7b98f]"
        }
      })
    };

    const UI_FRAME_THEMES = {
      default: {
        id: "default",
        label: "標準",
        description: "いつもの黒いRPGウィンドウ",
        windowClass: "",
        titleClass: "",
        swatchClass: "ui-swatch-default"
      },
      0: {
        id: 0,
        label: "羊皮紙",
        description: "手書きの記録に近いあたたかい質感",
        windowClass: "ui-frame-letter",
        titleClass: "ui-frame-title-letter",
        swatchClass: "ui-swatch-letter"
      },
      1: {
        id: 1,
        label: "透明",
        description: "背景を活かした軽い見え方",
        windowClass: "ui-frame-transparent",
        titleClass: "ui-frame-title-transparent",
        swatchClass: "ui-swatch-transparent"
      },
      2: {
        id: 2,
        label: "少し暗い",
        description: "背景を少し透かす落ち着いた質感",
        windowClass: "ui-frame-soft",
        titleClass: "ui-frame-title-soft",
        swatchClass: "ui-swatch-soft"
      },
      3: {
        id: 3,
        label: "黒",
        description: "文字が一番読みやすい黒い質感",
        windowClass: "ui-frame-black",
        titleClass: "ui-frame-title-black",
        swatchClass: "ui-swatch-black"
      }
    };

    let APP_CONFIG = THEMES.rpg;
    let APP_UI_FRAME_THEME = UI_FRAME_THEMES.default;

    document.title = APP_CONFIG.documentTitle;

    const charName = (type, style = 'short') => {
      const isChar2 = type === APP_CONFIG.char2Type;
      const configKey = isChar2 ? 'char2' : 'char1';
      return APP_CONFIG[`${configKey}Name${style === 'full' ? 'Full' : 'Short'}`];
    };

    const applyThemeText = (value = '') => {
      if (APP_CONFIG.themeId !== 'cafe') return value;
      return String(value)
        .replace(/リフレム/g, APP_CONFIG.char1NameShort)
        .replace(/ハルカ/g, APP_CONFIG.char2NameShort)
        .replace(/おぬし/g, 'あなた')
        .replace(/お主/g, 'あなた')
        .replace(/のじゃー。/g, 'んだよ。')
        .replace(/のじゃー/g, 'んだよ')
        .replace(/のじゃよ。/g, 'んだよ。')
        .replace(/のじゃよ/g, 'んだよ')
        .replace(/のじゃ。/g, 'んだ。')
        .replace(/のじゃ/g, 'んだ');
    };
