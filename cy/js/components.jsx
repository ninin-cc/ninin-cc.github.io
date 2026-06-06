    const WindowBox = ({ title, children, iconName, className = "" }) => {
      const shouldApplyUiFrame = !className.includes('print-friendly') && !className.includes('no-ui-frame');
      const frameTheme = shouldApplyUiFrame ? APP_UI_FRAME_THEME : UI_FRAME_THEMES.default;

      return (
        <div className={`bg-black text-white border-4 border-white p-4 rounded-lg shadow-md relative w-full ${frameTheme.windowClass} ${className} animate-fade-in`}>
          {title && (
            <div className={`window-box-title absolute -top-4 left-4 bg-black px-2 flex items-center space-x-2 ${frameTheme.titleClass}`}>
              {iconName && <i className={iconName}></i>}
              <h2 className="text-xl font-bold tracking-widest">{title}</h2>
            </div>
          )}
          <div className="window-box-content mt-2 w-full">{children}</div>
        </div>
      );
    };

    const renderTextLines = (value) => (
      value.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)
    );

    const getDialogVisualConfig = (type) => {
      const config = {
        [APP_CONFIG.char1Type]: { color: APP_CONFIG.char1.dialogColor, imgBg: APP_CONFIG.char1.portraitBg, img: APP_CONFIG.char1.img },
        [APP_CONFIG.char2Type]: { color: APP_CONFIG.char2.dialogColor, imgBg: APP_CONFIG.char2.portraitBg, img: APP_CONFIG.char2.img }
      };
      return config[type] || config[APP_CONFIG.char1Type];
    };

    const DialogBox = ({ speaker, type = 'reflem', text, onFinish, imageSide = 'left' }) => {
      const themedText = applyThemeText(text);
      const [displayedText, setDisplayedText] = useState("");
      const [isFinished, setIsFinished] = useState(false);
      const finishedRef = useRef(false);

      useEffect(() => {
        let index = 0;
        finishedRef.current = false;
        setDisplayedText("");
        setIsFinished(false);

        const finishOnce = () => {
          if (finishedRef.current) return;
          finishedRef.current = true;
          setIsFinished(true);
          if (onFinish) onFinish();
        };

        const timer = setInterval(() => {
          index++;
          setDisplayedText(themedText.slice(0, index));
          if (index >= themedText.length) {
            clearInterval(timer);
            finishOnce();
          }
        }, 40);

        return () => clearInterval(timer);
      }, [themedText]);

      const handleSkip = () => {
        if (!finishedRef.current) {
          setDisplayedText(themedText);
          finishedRef.current = true;
          setIsFinished(true);
          if (onFinish) onFinish();
        }
      };

      const { color, imgBg, img } = getDialogVisualConfig(type);
      const isImageRight = imageSide === 'right';

      return (
        <div onClick={handleSkip} className={`dialog-window-translucent w-full ${color} border-2 p-3 md:p-4 rounded-lg mb-5 relative animate-fade-in shadow-xl mt-6 md:mt-8 cursor-pointer`}>
          <div className={`dialog-nameplate-translucent absolute -top-3 ${isImageRight ? 'right-4' : 'left-4'} ${color.split(' ')[0]} px-3 border border-white rounded-full text-white text-xs md:text-sm font-bold tracking-widest shadow-sm z-10`}>
            {speaker}
          </div>
          <div className={`flex items-start gap-4 md:gap-6 mt-1 md:mt-2 ${isImageRight ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 self-start w-20 h-20 md:w-28 md:h-28 ${imgBg} border-2 border-white rounded-md overflow-hidden flex items-center justify-center shadow-inner relative`}>
              <img
                src={img}
                alt={speaker}
                className="w-full h-full object-contain"
                style={{
                  imageRendering: 'pixelated',
                  transform: isImageRight && type === 'haruka' ? 'scaleX(-1) scale(1.1)' : 'scale(1.1)'
                }}
              />
            </div>
            <div className="text-white text-sm md:text-base leading-relaxed flex-1 min-h-[4rem] text-left">
              <div className="grid">
                <div className="invisible col-start-1 row-start-1 pointer-events-none select-none" aria-hidden="true">
                  {renderTextLines(themedText)}
                  <span className="ml-1">▼</span>
                </div>
                <div className="col-start-1 row-start-1">
                  {renderTextLines(displayedText)}
                  {!isFinished && <span className="animate-pulse ml-1">▼</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const DialogPlaceholder = ({ speaker, type = 'reflem', imageSide = 'left' }) => {
      const { color, imgBg, img } = getDialogVisualConfig(type);
      const isImageRight = imageSide === 'right';

      return (
        <div className={`dialog-window-translucent w-full ${color} border-2 p-3 md:p-4 rounded-lg mb-5 relative shadow-xl mt-6 md:mt-8 opacity-90`}>
          <div className={`dialog-nameplate-translucent absolute -top-3 ${isImageRight ? 'right-4' : 'left-4'} ${color.split(' ')[0]} px-3 border border-white rounded-full text-white text-xs md:text-sm font-bold tracking-widest shadow-sm z-10`}>
            {speaker}
          </div>
          <div className={`flex items-start gap-4 md:gap-6 mt-1 md:mt-2 ${isImageRight ? 'flex-row-reverse' : ''}`}>
            <div className={`shrink-0 self-start w-20 h-20 md:w-28 md:h-28 ${imgBg} border-2 border-white rounded-md overflow-hidden flex items-center justify-center shadow-inner relative`}>
              <img
                src={img}
                alt={speaker}
                className="w-full h-full object-contain"
                style={{
                  imageRendering: 'pixelated',
                  transform: isImageRight && type === APP_CONFIG.char2Type ? 'scaleX(-1) scale(1.1)' : 'scale(1.1)'
                }}
              />
            </div>
            <div className="text-white text-sm md:text-base leading-relaxed flex-1 min-h-[4rem] text-left opacity-0" aria-hidden="true">
              ...
            </div>
          </div>
        </div>
      );
    };

    const MemoryDialogBox = ({ speaker, text }) => {
      const themedText = applyThemeText(text);
      const config = {
        reflem: { color: APP_CONFIG.char1.dialogColor, imgBg: APP_CONFIG.char1.portraitBg, img: APP_CONFIG.char1.img }
      };
      const { color, imgBg, img } = config.reflem;

      return (
        <div className={`dialog-window-translucent w-full ${color} border-2 p-3 md:p-4 rounded-lg mb-5 relative shadow-xl mt-6 md:mt-8 animate-memory-fade`}>
          <div className={`dialog-nameplate-translucent absolute -top-3 left-4 ${color.split(' ')[0]} px-3 border border-white rounded-full text-white text-xs md:text-sm font-bold tracking-widest shadow-sm z-10`}>
            {speaker}
          </div>
          <div className="flex items-start gap-4 md:gap-6 mt-1 md:mt-2">
            <div className={`shrink-0 self-start w-20 h-20 md:w-28 md:h-28 ${imgBg} border-2 border-white rounded-md overflow-hidden flex items-center justify-center shadow-inner relative opacity-80`}>
              <img src={img} alt={speaker} className="w-full h-full object-contain scale-110" style={{ imageRendering: 'pixelated' }} />
            </div>
            <div className="text-white text-sm md:text-base leading-relaxed flex-1 min-h-[4rem] text-left italic">
              {renderTextLines(themedText)}
            </div>
          </div>
        </div>
      );
    };

    const MemoryHarukaBox = ({ speaker, text }) => {
      const themedText = applyThemeText(text);
      const color = APP_CONFIG.char2.dialogColor;
      const imgBg = APP_CONFIG.char2.portraitBg;
      const img = APP_CONFIG.char2.img;

      return (
        <div className={`dialog-window-translucent w-full ${color} border-2 p-3 md:p-4 rounded-lg mb-5 relative shadow-xl mt-4 animate-memory-fade`}>
          <div className="dialog-nameplate-translucent absolute -top-3 right-4 bg-rose-900 px-3 border border-white rounded-full text-white text-xs md:text-sm font-bold tracking-widest shadow-sm z-10">
            {speaker}
          </div>
          <div className="flex flex-row-reverse items-start gap-4 md:gap-6 mt-1 md:mt-2">
            <div className={`shrink-0 self-start w-20 h-20 md:w-28 md:h-28 ${imgBg} border-2 border-white rounded-md overflow-hidden flex items-center justify-center shadow-inner relative opacity-85`}>
              <img src={img} alt={speaker} className="w-full h-full object-contain" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1) scale(1.1)' }} />
            </div>
            <div className="text-white text-sm md:text-base leading-relaxed flex-1 min-h-[4rem] text-left italic">
              {renderTextLines(themedText)}
            </div>
          </div>
        </div>
      );
    };

    const DialogGroup = ({ dialogs, children, reserveDialogSlots = 0, afterDialog = {}, previewUpcoming = false }) => {
      const [currentIdx, setCurrentIdx] = useState(0);
      const [allFinished, setAllFinished] = useState(false);
      const dialogSignature = dialogs.map(d => `${d.speaker}:${d.text}`).join('|');
      const reserveStyle = reserveDialogSlots > 0
        ? { minHeight: `${reserveDialogSlots * 13}rem` }
        : undefined;

      useEffect(() => {
        setCurrentIdx(0);
        setAllFinished(false);
      }, [dialogSignature]);

      return (
        <div className="w-full flex flex-col items-center" style={reserveStyle}>
          {dialogs.slice(0, currentIdx + 1).map((d, i) => (
             <React.Fragment key={`${d.text}-${i}`}>
               <DialogBox
                 speaker={d.speaker}
                 type={d.type}
                 text={d.text}
                 imageSide={d.imageSide || (d.type === APP_CONFIG.char2Type ? 'right' : 'left')}
                 onFinish={() => {
                   if (i === currentIdx && currentIdx < dialogs.length - 1) {
                     setCurrentIdx(currentIdx + 1);
                   } else if (i === dialogs.length - 1) {
                     setAllFinished(true);
                   }
                 }}
               />
               {afterDialog[i] && (
                 <div className="w-full animate-fade-in">
                   {afterDialog[i]}
                 </div>
               )}
             </React.Fragment>
          ))}
          {previewUpcoming && currentIdx < dialogs.length - 1 && dialogs.slice(currentIdx + 1).map((d, offset) => (
            <DialogPlaceholder
              key={`placeholder-${dialogSignature}-${currentIdx}-${offset}`}
              speaker={d.speaker}
              type={d.type}
              imageSide={d.imageSide || (d.type === APP_CONFIG.char2Type ? 'right' : 'left')}
            />
          ))}
          {allFinished && children && (
            <div className="w-full animate-fade-in mt-4">
              {children}
            </div>
          )}
        </div>
      );
    };

    const NarrationBox = ({ text, iconName, onFinish }) => {
      const themedText = applyThemeText(text);
      const [displayedText, setDisplayedText] = useState("");
      const [isFinished, setIsFinished] = useState(false);
      const finishedRef = useRef(false);

      useEffect(() => {
        let index = 0;
        finishedRef.current = false;
        setDisplayedText("");
        setIsFinished(false);

        const finishOnce = () => {
          if (finishedRef.current) return;
          finishedRef.current = true;
          setIsFinished(true);
          if (onFinish) onFinish();
        };

        const timer = setInterval(() => {
          index++;
          setDisplayedText(themedText.slice(0, index));
          if (index >= themedText.length) {
            clearInterval(timer);
            finishOnce();
          }
        }, 40);
        return () => clearInterval(timer);
      }, [themedText]);

      const handleSkip = () => {
        if (!finishedRef.current) {
          setDisplayedText(themedText);
          finishedRef.current = true;
          setIsFinished(true);
          if (onFinish) onFinish();
        }
      };

      return (
        <div onClick={handleSkip} className="w-full max-w-2xl mx-auto bg-black bg-opacity-80 border-y-2 border-gray-500 py-6 px-6 mb-8 text-left text-gray-300 leading-loose italic flex flex-col items-start animate-fade-in cursor-pointer">
          {iconName && <i className={`${iconName} mb-4 text-gray-500 text-2xl self-center`}></i>}
          <div className="w-full">
            <div className="grid">
              <div className="invisible col-start-1 row-start-1 pointer-events-none select-none" aria-hidden="true">
                {renderTextLines(themedText)}
                <span className="ml-1">▼</span>
              </div>
              <div className="col-start-1 row-start-1">
                {renderTextLines(displayedText)}
                {!isFinished && <span className="animate-pulse ml-1">▼</span>}
              </div>
            </div>
          </div>
        </div>
      );
    };

    const EmptyText = ({ children }) => (
      <p className="text-sm text-gray-600 text-center py-4">{children}</p>
    );

    const InnMeaningModal = ({ onClose, playerName = '' }) => {
      const displayName = (playerName || '').trim();

      return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 p-4 print-hidden" onClick={onClose}>
        <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border-4 border-yellow-500 bg-black p-4 text-white shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between border-b border-yellow-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded border-2 border-white bg-gradient-to-b from-amber-700 to-amber-950">
                <img src={APP_CONFIG.char1Img} alt={APP_CONFIG.char1NameFull} className="h-full w-full object-contain scale-110" style={{ imageRendering: 'pixelated' }} />
              </div>
              <div className="text-left">
                <p className="text-xs text-yellow-300">{APP_CONFIG.char1.role}</p>
                <h3 className="text-xl font-bold">{APP_CONFIG.char1NameShort}</h3>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rpg-button px-3 py-1 text-sm" aria-label="閉じる">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="space-y-4 text-left text-sm leading-relaxed md:text-base">
            <p>{applyThemeText(displayName ? `よいか、${displayName}よ。` : 'よいか、冒険者よ。')}</p>
            <p>{renderTextLines(applyThemeText('いきなり遠い未来を決めようとしても、人はなかなか動けぬものじゃ。\n“いつか大きなことを成し遂げたい”と思っても、今の自分が何をすればよいのか分からなくなることがある。'))}</p>
            <p>じゃが、冒険とは本来、そういうものではない。</p>
            <p>{applyThemeText('大魔王を倒すことだけが、冒険ではないのじゃ。')}</p>
            <img src="./img/ryu.jpg" alt="大きな冒険の象徴" className="mx-auto w-4/5 rounded object-cover shadow-lg" draggable="false" />
            <p>たしかに、遠くにそびえる強大な敵を目指す旅もある。<br />世界を救う物語も、立派な冒険じゃ。</p>
            <p>じゃが、それだけが冒険ではない。</p>
            <p>冒険の目的は、人それぞれでよい。<br />世界を救う者もおれば、まだ見ぬ町を訪ねたい者もおる。<br />誰かを助けたい者もおれば、自分の力を試したい者もおる。</p>
            <p>{renderTextLines(applyThemeText('大きな目標は、それぞれにあってよい。\nいや、時に大きな目標は、お主の旅を照らす星にもなる。'))}</p>
            <p>
              {applyThemeText('じゃが、その大きな目標へ向かう前には、身近な目標がある。')}<br />
              {applyThemeText('目の前の')}<span className="font-bold text-blue-300">小さなスライム</span>{applyThemeText('に向き合う。')}<br />
              {applyThemeText('おぬしは、すこし強くなる。')}
            </p>
            <img src="./img/lake.jpg" alt="旅の途中で出会う景色" className="mx-auto w-4/5 rounded object-cover shadow-lg" draggable="false" />
            <p>見知らぬ街へゆく、<br />手ごわい相手が現れる。</p>
            <p>少し強い武器を手に入れる。<br />例えば<span className="font-bold text-slate-50 drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]">はがねの剣</span>は、次の一歩を支える頼もしい力になる。</p>
            <p>大きな目標の前に、身近な目標があるからこそ、<br />レベル上げもできる。<br /><span className="font-bold text-yellow-200 drop-shadow-[0_0_10px_rgba(250,204,21,0.95)]">ゴールド</span>稼ぎもできる。<br />{applyThemeText('今の自分に必要な武器や魔法も、少しずつ見えてくるのじゃ。')}</p>
            <p>そして、<span className="font-bold text-emerald-200 drop-shadow-[0_0_10px_rgba(52,211,153,0.95)]">回復魔法</span>を覚える。<br /><span className="font-bold text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.95)]">仲間</span>に助けられる。<br />そうして経験値を得て、少しずつ行ける場所が増えていく。</p>
            <p>{applyThemeText('人生も、キャリアも、それと同じなのじゃ。')}</p>
            <img src="./img/sakusen.jpg" alt="作戦を考える冒険者たち" className="mx-auto w-4/5 rounded object-cover shadow-lg" draggable="false" />
            <p>{renderTextLines(applyThemeText('この宿屋では、お主がこれまで手にしてきた武器や魔法、支えてくれた仲間を見つめ直す。\nそして、歩んできた旅路をふり返り、これから向かう少し先のクエストを見つけていく。'))}</p>
            <p>{renderTextLines(applyThemeText('大きな夢を、無理に語らなくてもよい。\nいまの自分が一歩進むための“小さなクエスト”を見つければよいのじゃ。'))}</p>
            <p>
              だんだんできることが増えていく。<br />
              行ける場所が増えていく。<br />
              {displayName
                ? <>{applyThemeText(`そして気づけば、お主だけの…。${displayName}だけの冒険の物語が、静かに動き出しているのじゃ。`)}</>
                : <>{applyThemeText('そして気づけば、お主だけの冒険の物語が、静かに動き出しているのじゃ。')}</>}
            </p>
            <div aria-hidden="true" className="leading-relaxed"><br /><br /><br /><br /><br /></div>
            <div className="text-center">
              <button type="button" onClick={onClose} className="rpg-button px-10 py-3 text-base">
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
      );
    };

    const OtherTableModal = ({ state, onClose, onSelectGuest, onMore }) => {
      const selectedGuest = otherTableGuests.find(guest => guest.id === state.selectedGuestId);
      const lines = getOtherTableGuestLines(selectedGuest, state.context);
      const greeting = otherTableGreetings[state.greetingIndex % otherTableGreetings.length];
      const currentLine = selectedGuest
        ? (lines[state.lineIndex % Math.max(1, lines.length)] || '「まだ話すことを考えているところだよ。」')
        : greeting;
      const speakerLabel = selectedGuest ? `${selectedGuest.label} の話` : '客の声';
      const [displayedLine, setDisplayedLine] = useState('');
      const [lineFinished, setLineFinished] = useState(false);

      useEffect(() => {
        let index = 0;
        setDisplayedLine('');
        setLineFinished(false);
        const timer = window.setInterval(() => {
          index += 1;
          setDisplayedLine(currentLine.slice(0, index));
          if (index >= currentLine.length) {
            window.clearInterval(timer);
            setLineFinished(true);
          }
        }, 28);
        return () => window.clearInterval(timer);
      }, [currentLine]);

      const handleSkipLine = () => {
        if (lineFinished) return;
        setDisplayedLine(currentLine);
        setLineFinished(true);
      };

      if (!state.isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 print-hidden">
          <div
            className="other-table-panel max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border-4 border-white p-4 text-white shadow-2xl animate-fade-in"
            style={{ backgroundImage: `url(${APP_CONFIG.otherGuestsImg})` }}
          >
            <div className="mb-4 flex items-center justify-end gap-3 border-b border-gray-700 pb-3">
              <button type="button" onClick={onClose} className="rpg-button px-3 py-1 text-sm">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div
                className="other-table-scene space-y-4 rounded p-2"
              >
                <div
                  className={`other-guests-stage h-48 w-full overflow-hidden rounded sm:h-64 ${selectedGuest ? 'has-selection' : ''}`}
                  role="img"
                  aria-label="客たち"
                >
                  {selectedGuest && (
                    <>
                      <div
                        className="pointer-events-none z-10 other-guest-focus-shade"
                        style={{ '--spot-x': `${12.5 + selectedGuest.focusIndex * 25}%` }}
                      />
                      <div className="pointer-events-none z-10 other-guest-soft-vignette" />
                    </>
                  )}
                </div>

                <div onClick={handleSkipLine} className="other-table-speech flex cursor-pointer flex-col justify-between rounded border-2 border-yellow-600 p-4">
                  <div>
                    <p className="mb-2 text-base font-bold text-yellow-300">{speakerLabel}</p>
                    <p className="min-h-[7rem] whitespace-pre-wrap text-base leading-relaxed text-gray-100">
                      {displayedLine}
                      {!lineFinished && <span className="ml-1 animate-pulse text-yellow-300">▼</span>}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    {selectedGuest ? (
                      <button type="button" onClick={onMore} className="rpg-button flex-1 py-2">
                        もっと聞く
                      </button>
                    ) : null}
                    <button type="button" onClick={onClose} className="rpg-button flex-1 py-2 bg-white text-black font-bold">
                      自分の話に戻る
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {otherTableGuests.map(guest => (
                  <button
                    key={guest.id}
                    type="button"
                    onClick={() => onSelectGuest(guest.id)}
                    className={`rounded border px-3 py-2 text-sm transition-colors ${selectedGuest && selectedGuest.id === guest.id ? 'border-yellow-400 bg-yellow-900 text-yellow-100 font-bold' : 'border-gray-500 bg-gray-900 text-gray-300 hover:border-white hover:text-white'}`}
                  >
                    {guest.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };

    const LifelineChart = ({ data, editable = false, onPointChange, onLineAddRequest, canAddLineEvent = true }) => {
      const svgRef = useRef(null);
      const [draggingId, setDraggingId] = useState(null);
      const [lineAddPrompt, setLineAddPrompt] = useState(null);
      useEffect(() => {
        if (!editable) {
          setDraggingId(null);
          setLineAddPrompt(null);
        }
      }, [editable]);
      if (!data || data.length === 0) return <div className="text-center p-4">記憶がありません。</div>;
      const sortedData = [...data].sort((a, b) => a.age - b.age);
      const width = 1000; const height = 360; const paddingX = 70; const paddingY = 30;
      const chartWidth = width - paddingX * 2; const chartHeight = height - paddingY * 2;
      const futureIndex = sortedData.length;
      const totalPointCount = sortedData.length + 1;
      const lastUserMemory = sortedData[sortedData.length - 1];

      const getX = (index) => paddingX + (index * (chartWidth / Math.max(1, totalPointCount - 1)));
      const getY = (satisfaction) => {
        const normalized = (satisfaction + 50) / 100;
        return paddingY + chartHeight - (normalized * chartHeight);
      };
      const lastUserX = getX(sortedData.length - 1);
      const lastUserY = getY(lastUserMemory.satisfaction);
      const futureX = getX(futureIndex);
      const futureY = Math.max(10, lastUserY - 55);
      const labelWidth = 180;
      const labelHeight = 60;
      const labelGap = 30;
      const clampLabelY = (y) => Math.max(8, Math.min(height - labelHeight - 18, y));

      const generateSmoothPath = (items) => {
        if (items.length === 0) return '';
        if (items.length === 1) return `M ${getX(0)},${getY(items[0].satisfaction)}`;
        let path = `M ${getX(0)},${getY(items[0].satisfaction)}`;
        for (let i = 0; i < items.length - 1; i++) {
          const x0 = getX(i); const y0 = getY(items[i].satisfaction);
          const x1 = getX(i + 1); const y1 = getY(items[i + 1].satisfaction);
          const cx0 = x0 + (x1 - x0) * 0.4; const cy0 = y0;
          const cx1 = x1 - (x1 - x0) * 0.4; const cy1 = y1;
          path += ` C ${cx0},${cy0} ${cx1},${cy1} ${x1},${y1}`;
        }
        return path;
      };

      const pathData = generateSmoothPath(sortedData);
      const clampSatisfaction = (value) => Math.max(-50, Math.min(50, Math.round(value / 5) * 5));
      const getSvgPointFromPointer = (event) => {
        const svg = svgRef.current;
        if (!svg) return null;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const screenCtm = svg.getScreenCTM();
        if (!screenCtm) return null;
        return point.matrixTransform(screenCtm.inverse());
      };
      const getSatisfactionFromSvgY = (svgY) => {
        const boundedY = Math.max(paddingY, Math.min(paddingY + chartHeight, svgY));
        const normalized = (paddingY + chartHeight - boundedY) / chartHeight;
        return clampSatisfaction(normalized * 100 - 50);
      };
      const getSatisfactionFromPointer = (event) => {
        const svgPoint = getSvgPointFromPointer(event);
        if (!svgPoint) return 0;
        return getSatisfactionFromSvgY(svgPoint.y);
      };
      const getAgeFromSvgX = (svgX) => {
        if (sortedData.length === 1) return Number(sortedData[0].age);
        const firstX = getX(0);
        const lastX = getX(sortedData.length - 1);
        const boundedX = Math.max(firstX, Math.min(lastX, svgX));
        const stepWidth = chartWidth / Math.max(1, totalPointCount - 1);
        const rawIndex = (boundedX - paddingX) / stepWidth;
        const segmentIndex = Math.max(0, Math.min(sortedData.length - 2, Math.floor(rawIndex)));
        const ratio = Math.max(0, Math.min(1, rawIndex - segmentIndex));
        const startAge = Number(sortedData[segmentIndex].age);
        const endAge = Number(sortedData[segmentIndex + 1].age);
        return Math.round(startAge + ((endAge - startAge) * ratio));
      };
      const updatePointFromPointer = (event, item) => {
        if (!editable || !onPointChange) return;
        event.preventDefault();
        setLineAddPrompt(null);
        onPointChange(item.id, getSatisfactionFromPointer(event));
      };
      const startPointDrag = (event, item) => {
        if (!editable || !onPointChange) return;
        event.preventDefault();
        setDraggingId(item.id);
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updatePointFromPointer(event, item);
      };
      const continuePointDrag = (event, item) => {
        if (draggingId !== item.id) return;
        updatePointFromPointer(event, item);
      };
      const endPointDrag = (event) => {
        if (!editable) return;
        event.currentTarget.releasePointerCapture?.(event.pointerId);
        setDraggingId(null);
      };
      const handleLineAddPointerDown = (event) => {
        if (!editable || !onLineAddRequest || !canAddLineEvent || sortedData.length < 2) return;
        event.preventDefault();
        const svgPoint = getSvgPointFromPointer(event);
        if (!svgPoint) return;
        const promptWidth = 220;
        const promptHeight = 96;
        setLineAddPrompt({
          x: Math.max(8, Math.min(width - promptWidth - 8, svgPoint.x - (promptWidth / 2))),
          y: Math.max(8, Math.min(height - promptHeight - 8, svgPoint.y - promptHeight - 10)),
          age: getAgeFromSvgX(svgPoint.x),
          satisfaction: getSatisfactionFromSvgY(svgPoint.y),
          width: promptWidth,
          height: promptHeight
        });
      };

      return (
        <div className={`w-full bg-gray-900 border-2 border-dashed p-2 rounded mt-4 lifeline-print print-avoid-break ${editable ? 'lifeline-editing border-yellow-400' : 'border-gray-600'}`}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto text-white"
            preserveAspectRatio="xMidYMid meet"
            style={{ touchAction: editable ? 'none' : 'auto' }}
          >
            <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#555" strokeWidth="2" strokeDasharray="4 4" />
            <text x={paddingX - 10} y={height / 2 + 5} fill="#aaa" fontSize="12" textAnchor="end">±0</text>
            <text x={paddingX - 10} y={paddingY + 10} fill="#60A5FA" fontSize="12" textAnchor="end">+50</text>
            <text x={paddingX - 10} y={height - paddingY} fill="#F87171" fontSize="12" textAnchor="end">-50</text>
            <path d={pathData} fill="none" stroke="#FCD34D" strokeWidth="4" />
            {editable && onLineAddRequest && canAddLineEvent && sortedData.length > 1 && (
              <path
                d={pathData}
                fill="none"
                stroke="transparent"
                strokeWidth="28"
                strokeLinecap="round"
                pointerEvents="stroke"
                style={{ cursor: 'copy' }}
                onPointerDown={handleLineAddPointerDown}
              />
            )}
            <line
              x1={lastUserX}
              y1={lastUserY}
              x2={futureX}
              y2={futureY}
              stroke="#93C5FD"
              strokeWidth="4"
              strokeDasharray="10 8"
              strokeLinecap="round"
            />
            {sortedData.map((d, i) => {
              const cx = getX(i); const cy = getY(d.satisfaction);
              const labelY = clampLabelY(Number(d.satisfaction) >= 0 ? cy + labelGap : cy - labelHeight - labelGap);
              const isDragging = draggingId === d.id;
              return (
                <g key={d.id}>
                  <circle cx={cx} cy={cy} r={editable ? 8 : 6} fill="#000" stroke="#FCD34D" strokeWidth={editable ? 4 : 3} />
                  {editable && (
                    <>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={24}
                        fill="transparent"
                        stroke="transparent"
                        pointerEvents="all"
                        style={{ cursor: 'ns-resize' }}
                        onPointerDown={event => startPointDrag(event, d)}
                        onPointerMove={event => continuePointDrag(event, d)}
                        onPointerUp={endPointDrag}
                        onPointerCancel={endPointDrag}
                        onLostPointerCapture={() => setDraggingId(null)}
                      />
                      <text x={cx} y={Math.max(18, cy - 14)} fill="#FCD34D" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        {Number(d.satisfaction) > 0 ? '+' : ''}{d.satisfaction}
                      </text>
                      {isDragging && (
                        <circle cx={cx} cy={cy} r="17" fill="none" stroke="#FDE68A" strokeWidth="2" strokeDasharray="4 4" pointerEvents="none" />
                      )}
                    </>
                  )}
                  <text x={cx} y={height - 5} fill="#fff" fontSize="14" textAnchor="middle">{d.age}歳</text>
                  <foreignObject x={Math.max(0, Math.min(width - labelWidth, cx - labelWidth / 2))} y={labelY} width={labelWidth} height={labelHeight}>
                    <div xmlns="http://www.w3.org/1999/xhtml" className="h-full overflow-hidden text-xs text-center text-gray-100 leading-snug bg-black bg-opacity-60 rounded border border-gray-700 px-2 py-1">
                      {d.event}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
            <path d={pathData} fill="none" stroke="#FCD34D" strokeWidth="2.5" strokeOpacity="0.72" strokeLinecap="round" pointerEvents="none" />
            <line
              x1={lastUserX}
              y1={lastUserY}
              x2={futureX}
              y2={futureY}
              stroke="#93C5FD"
              strokeWidth="2.5"
              strokeOpacity="0.7"
              strokeDasharray="10 8"
              strokeLinecap="round"
              pointerEvents="none"
            />
            <g key="system-future">
              <circle cx={futureX} cy={futureY} r="7" fill="#0B1220" stroke="#93C5FD" strokeWidth="3" strokeDasharray="4 3" />
              <text x={futureX} y={height - 5} fill="#93C5FD" fontSize="14" textAnchor="middle">未来</text>
              <foreignObject x={futureX - 72} y={clampLabelY(futureY + 16)} width="144" height="44">
                <div xmlns="http://www.w3.org/1999/xhtml" className="h-full text-xs text-center text-blue-100 leading-tight bg-black bg-opacity-70 rounded px-1 py-1 border border-blue-300">
                  未定の未来
                </div>
              </foreignObject>
            </g>
            {editable && lineAddPrompt && (
              <foreignObject x={lineAddPrompt.x} y={lineAddPrompt.y} width={lineAddPrompt.width} height={lineAddPrompt.height}>
                <div xmlns="http://www.w3.org/1999/xhtml" className="lifeline-add-popover h-full rounded border-2 border-yellow-400 bg-black bg-opacity-90 p-2 text-center text-xs text-white shadow-xl">
                  <p className="font-bold text-yellow-300">ここに出来事を追加しますか？</p>
                  <p className="mt-1 text-gray-300">{lineAddPrompt.age}歳ごろ / {lineAddPrompt.satisfaction > 0 ? '+' : ''}{lineAddPrompt.satisfaction}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded border border-yellow-300 bg-yellow-300 px-2 py-1 font-bold text-black"
                      onClick={event => {
                        event.stopPropagation();
                        onLineAddRequest({
                          age: lineAddPrompt.age,
                          satisfaction: lineAddPrompt.satisfaction
                        });
                        setLineAddPrompt(null);
                      }}
                    >
                      YES
                    </button>
                    <button
                      type="button"
                      className="rounded border border-gray-500 bg-gray-900 px-2 py-1 font-bold text-gray-200"
                      onClick={event => {
                        event.stopPropagation();
                        setLineAddPrompt(null);
                      }}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </foreignObject>
            )}
          </svg>
        </div>
      );
    };

    const CanList = ({ cans, emptyText = 'まだ記録されていません。', compact = false, onRemove }) => {
      if (!cans || cans.length === 0) return <EmptyText>{emptyText}</EmptyText>;

      return (
        <ul className={`${compact ? 'space-y-2' : 'space-y-3'} mb-2`}>
          {cans.map(c => {
            const meta = canTypeMeta[c.type] || canTypeMeta.skill;
            return (
              <li key={c.id} className={`flex flex-col border-b border-gray-700 pb-2 relative ${onRemove ? 'pr-8' : ''}`}>
                <div className="flex items-center gap-2 text-lg">
                  <i className={`${meta.icon} ${meta.color}`}></i>
                  <span>{c.name}</span>
                </div>
                <div className="text-gray-400 text-sm pl-7">{c.desc || '説明なし'}</div>
                {onRemove && (
                  <button onClick={() => onRemove(c.id)} className="absolute right-0 top-2 text-gray-500 hover:text-red-400" aria-label={`${c.name}を削除`}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    const CanNameChips = ({ cans, emptyText = 'まだ選ばれていません。' }) => {
      if (!cans || cans.length === 0) {
        return <p className="text-sm text-gray-500">{emptyText}</p>;
      }

      return (
        <div className="flex flex-wrap gap-2">
          {cans.map(c => {
            const meta = canTypeMeta[c.type] || canTypeMeta.skill;
            return (
              <span key={c.id} className={`inline-flex items-center gap-1 rounded-full border border-gray-600 bg-black bg-opacity-70 px-3 py-1 text-sm font-bold ${meta.color}`}>
                <i className={meta.icon}></i>
                {c.name}
              </span>
            );
          })}
        </div>
      );
    };

    const WritableField = ({ value, textarea = false, className = '', children }) => (
      <div className={`writable-cell ${textarea ? 'is-textarea' : ''} ${value ? 'has-value' : ''} ${className}`}>
        {children}
      </div>
    );

    const WriteCue = ({ active }) => (
      <div className={`write-cue ${active ? 'is-blinking' : 'is-resting'}`} aria-hidden="true">▼</div>
    );
