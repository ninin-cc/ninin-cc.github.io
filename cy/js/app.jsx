    const App = () => {
      useCasualSourceGuard();

      const [currentTheme, setCurrentTheme] = useLocalStorage('cq_theme', 'rpg');
      const activeThemeKey = THEMES[currentTheme] ? currentTheme : 'rpg';
      APP_CONFIG = THEMES[activeThemeKey];

      useEffect(() => {
        const loadingScreen = document.getElementById('cq-loading-screen');
        if (!loadingScreen) return undefined;

        const startedAt = window.__cqLoadStartedAt || Date.now();
        const remaining = Math.max(0, 3000 - (Date.now() - startedAt));
        const timer = window.setTimeout(() => {
          loadingScreen.classList.add('is-hidden');
          window.setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }, remaining);

        return () => window.clearTimeout(timer);
      }, []);

      const [scene, setScene] = useLocalStorage('cq_scene', 'intro');
      const [introStep, setIntroStep] = useLocalStorage('cq_intro_step', 0);
      const [isInputPhase, setIsInputPhase] = useLocalStorage('cq_input_phase', false);
      const [player, setPlayer] = useLocalStorage('cq_player', { name: '', age: String(APP_CONFIG.defaultAge) });

      const [canStep, setCanStep] = useLocalStorage('cq_can_step', 0);
      const [cans, setCans] = useLocalStorage('cq_cans', []);
      const [newCan, setNewCan] = useState({ type: 'skill', name: '', desc: '' });
      const [canConfirming, setCanConfirming] = useState(false);
      const [canAddOpen, setCanAddOpen] = useState(true);
      const [canReviewing, setCanReviewing] = useState(false);
      const canTypeGuideRef = useRef('');

      const [memories, setMemories] = useLocalStorage('cq_memories', []);
      const [newMemory, setNewMemory] = useState({ age: APP_CONFIG.memoryStartAge, event: '', satisfaction: 0 });
      const [memoryEditId, setMemoryEditId] = useState(null);
      const [memoryStep, setMemoryStep] = useLocalStorage('cq_memory_step', 0);
      const [chartInsight, setChartInsight] = useLocalStorage('cq_chart_insight', '');
      const [showRestPrompt, setShowRestPrompt] = useState(false);
      const [canInsight, setCanInsight] = useLocalStorage('cq_can_insight', '');
      const [allyInsight, setAllyInsight] = useLocalStorage('cq_ally_insight', '');

      const [willStep, setWillStep] = useLocalStorage('cq_will_step', 0);
      const [will, setWill] = useLocalStorage('cq_will', { job: '', oneYear: '', threeYears: '' });
      const [willTenYears, setWillTenYears] = useLocalStorage('cq_will_ten_years', []);
      const [newTenYearWish, setNewTenYearWish] = useState('');
      const [willOneYearInsight, setWillOneYearInsight] = useLocalStorage('cq_will_one_year_insight', '');
      const [willThreeYearsInsight, setWillThreeYearsInsight] = useLocalStorage('cq_will_three_years_insight', '');

      const [musts, setMusts] = useLocalStorage('cq_musts', []);
      const [newMust, setNewMust] = useState({ title: '', desc: '', connection: '' });
      const [mustInsight, setMustInsight] = useLocalStorage('cq_must_insight', '');
      const [mustStep, setMustStep] = useLocalStorage('cq_must_step', 0);
      const [mustWorkStep, setMustWorkStep] = useLocalStorage('cq_must_work_step', 0);
      const [activeMustId, setActiveMustId] = useLocalStorage('cq_active_must_id', null);
      const [mustQuestAdded, setMustQuestAdded] = useLocalStorage('cq_must_quest_added', false);
      const [mustRecollectionVisible, setMustRecollectionVisible] = useState(false);
      const [mustDraftStarted, setMustDraftStarted] = useState(false);
      const [mustConnectionStarted, setMustConnectionStarted] = useState(false);
      const [mustInsightStarted, setMustInsightStarted] = useState(() => Boolean(mustInsight));
      const [showImportBox, setShowImportBox] = useState(false);
      const [importText, setImportText] = useState('');
      const [importMessage, setImportMessage] = useState('');
      const [saveMessage, setSaveMessage] = useState('');
      const [summaryOpenSections, setSummaryOpenSections] = useState({
        memory: true,
        can: false,
        will: false,
        must: false,
        route: true
      });
      const [introPreviewOpen, setIntroPreviewOpen] = useState(false);
      const [innMeaningOpen, setInnMeaningOpen] = useState(false);
      const [canInnPreviewOpen, setCanInnPreviewOpen] = useState(false);
      const [otherTableState, setOtherTableState] = useState({
        isOpen: false,
        context: 'can',
        selectedGuestId: null,
        lineIndex: 0,
        greetingIndex: 0
      });

      const ageOptions = Array.from(
        { length: APP_CONFIG.ageSelectMax - APP_CONFIG.ageSelectMin + 1 },
        (_, index) => APP_CONFIG.ageSelectMin + index
      );
      const memoryAgeOptions = Array.from(
        { length: 80 - 15 + 1 },
        (_, index) => 15 + index
      );

      useEffect(() => {
        if (!THEMES[currentTheme]) {
          setCurrentTheme('rpg');
          return;
        }
        document.title = APP_CONFIG.documentTitle;
      }, [currentTheme]);

      useEffect(() => {
        if (!player.age) {
          setPlayer(current => ({ ...current, age: String(APP_CONFIG.defaultAge) }));
        }
      }, []);

      useEffect(() => {
        const allowedTypes = canStep === 0 ? ['skill', 'magic'] : ['ally'];
        if (!allowedTypes.includes(newCan.type)) {
          setNewCan({ type: allowedTypes[0], name: '', desc: '' });
        }
        setCanConfirming(false);
        setCanAddOpen(true);
        setCanReviewing(false);
      }, [canStep]);

      useEffect(() => {
        const isWeaponMagicInput = scene === 'can' && isInputPhase && canStep === 0;
        if (!isWeaponMagicInput) {
          canTypeGuideRef.current = '';
          return;
        }

        const guideKey = `${scene}-${canStep}-${isInputPhase}`;
        if (canTypeGuideRef.current === guideKey) return;
        canTypeGuideRef.current = guideKey;
        setCanConfirming(false);
        setNewCan(current => ({ ...current, type: 'skill', name: '', desc: '' }));

        const showMagicTimer = window.setTimeout(() => {
          setNewCan(current => {
            if (current.name || current.desc) return current;
            return { ...current, type: 'magic' };
          });
        }, 700);
        const returnSkillTimer = window.setTimeout(() => {
          setNewCan(current => {
            if (current.name || current.desc) return current;
            return { ...current, type: 'skill' };
          });
        }, 1600);

        return () => {
          window.clearTimeout(showMagicTimer);
          window.clearTimeout(returnSkillTimer);
        };
      }, [scene, isInputPhase, canStep]);

      useEffect(() => {
        const legacyDefault = musts.length === 1
          && musts[0].id === 1
          && musts[0].title === 'ギルド（会社・組織）からのクエスト'
          && musts[0].desc === '冒険者としての経験をつみ、古き良きものも活かすことも、必要に応じて最新の形へ進化させることも望まれている。';
        if (legacyDefault) {
          setMusts([]);
          setActiveMustId(null);
          setNewMust({ title: '', desc: '', connection: '' });
          setMustWorkStep(0);
          setMustQuestAdded(false);
        }
      }, []);

      const getSuggestedAges = () => {
        const currentAge = parseInt(player.age) || 30;
        const effectiveStartAge = Math.min(APP_CONFIG.memoryStartAge, currentAge);
        const diff = Math.max(0, currentAge - effectiveStartAge);
        return [
          effectiveStartAge,
          Math.floor(effectiveStartAge + diff * 0.25),
          Math.floor(effectiveStartAge + diff * 0.50),
          Math.floor(effectiveStartAge + diff * 0.75),
          currentAge
        ];
      };

      const getPageNo = () => {
        switch (scene) {
          case 'intro': return `1-${introStep + 1}${isInputPhase ? '-Input' : ''}`;
          case 'can': {
            if (canReviewing) return '2-2-Review';
            const base = `2-${canStep + 1}`;
            if (!isInputPhase) return base;
            return `${base}-${canConfirming ? 'Confirm' : 'Input'}`;
          }
          case 'memory': return `3-${memoryStep + 1}${isInputPhase ? '-Input' : ''}`;
          case 'chart': return showRestPrompt ? '4-2' : '4-1';
          case 'will': return `5-${willStep + 1}${isInputPhase ? '-Input' : ''}`;
          case 'must':
            if (mustStep === 0) return mustRecollectionVisible ? '6-1-2' : '6-1-1';
            return `6-2-${mustWorkStep + 1}`;
          case 'summary': return '7-1';
          default: return '0';
        }
      };

      const clearAdventureData = () => {
        const keysToRemove = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key && key.startsWith('cq_')) keysToRemove.push(key);
        }
        keysToRemove.forEach(key => window.localStorage.removeItem(key));
      };

      const scrollTop = () => window.scrollTo(0, 0);

      const nextScene = (next) => {
        scrollTop();
        setShowRestPrompt(false);
        setIsInputPhase(false);
        if (next === 'intro') setIntroStep(0);
        if (next === 'can') {
          setCanStep(0);
          setNewCan({ type: 'skill', name: '', desc: '' });
          setCanConfirming(false);
          setCanAddOpen(true);
          setCanReviewing(false);
        }
        if (next === 'memory') {
          setMemoryStep(0);
          const suggestedAges = getSuggestedAges();
          setNewMemory({ age: suggestedAges[0], event: '', satisfaction: 0 });
          setMemoryEditId(null);
        }
        if (next === 'will') setWillStep(0);
        if (next === 'must') {
          setMustStep(0);
          setMustWorkStep(0);
          setMustQuestAdded(musts.length > 0);
          setMustRecollectionVisible(false);
        }
        setScene(next);
      };

      const goToIntro = () => {
        scrollTop();
        setShowRestPrompt(false);
        setIsInputPhase(false);
        setIntroStep(0);
        setScene('intro');
      };

      const goToCanInput = (step) => {
        scrollTop();
        setShowRestPrompt(false);
        setCanStep(step);
        setNewCan({ type: step === 0 ? 'skill' : 'ally', name: '', desc: '' });
        setCanConfirming(false);
        setCanReviewing(false);
        setIsInputPhase(true);
        setScene('can');
      };

      const goToWillInput = (step) => {
        scrollTop();
        setShowRestPrompt(false);
        setWillStep(step);
        setIsInputPhase(true);
        setScene('will');
      };

      const goToMustEdit = () => {
        scrollTop();
        setShowRestPrompt(false);
        setIsInputPhase(false);
        setMustStep(1);
        setMustWorkStep(0);
        setMustQuestAdded(musts.length > 0);
        setMustRecollectionVisible(true);
        setScene('must');
      };

      const goToProgressScene = (target) => {
        if (target === 'intro') return goToIntro();
        if (target === 'can') return goToCanInput(0);
        if (target === 'will') return goToWillInput(0);
        if (target === 'must') return goToMustEdit();

        scrollTop();
        setShowRestPrompt(false);
        setIsInputPhase(false);
        if (target === 'memory') {
          const suggestedAges = getSuggestedAges();
          setMemoryStep(0);
          setNewMemory({ age: suggestedAges[0], event: '', satisfaction: 0 });
          setMemoryEditId(null);
        }
        setScene(target);
      };

      const canGoBackOneStep = () => !(scene === 'intro' && introStep === 0 && !isInputPhase);

      const goBackOneStep = () => {
        scrollTop();
        setShowRestPrompt(false);

        if (scene === 'intro') {
          if (isInputPhase) {
            setIsInputPhase(false);
            return;
          }
          if (introStep > 0) {
            setIntroStep(introStep - 1);
          }
          return;
        }

        if (scene === 'can') {
          if (canReviewing) {
            setCanReviewing(false);
            setCanStep(1);
            setIsInputPhase(true);
            setCanConfirming(false);
            setCanAddOpen(true);
            return;
          }
          if (canConfirming) {
            setCanConfirming(false);
            setCanAddOpen(true);
            return;
          }
          if (isInputPhase) {
            setIsInputPhase(false);
            return;
          }
          if (canStep > 0) {
            setCanStep(canStep - 1);
            setNewCan({ type: 'skill', name: '', desc: '' });
            return;
          }
          if (memories.length > 0 || memoryStep > 0) {
            setScene('chart');
            setIsInputPhase(false);
            return;
          }
          goToIntro();
          return;
        }

        if (scene === 'memory') {
          if (isInputPhase) {
            setIsInputPhase(false);
            setMemoryEditId(null);
            return;
          }
          if (memoryStep > 0) {
            const prevStep = memoryStep - 1;
            const suggestedAges = getSuggestedAges();
            setMemoryStep(prevStep);
            setNewMemory({ age: suggestedAges[prevStep] || APP_CONFIG.memoryStartAge, event: '', satisfaction: 0 });
            setMemoryEditId(null);
            return;
          }
          setScene('can');
          setCanStep(0);
          setIsInputPhase(false);
          return;
        }

        if (scene === 'chart') {
          if (showRestPrompt) {
            setShowRestPrompt(false);
            return;
          }
          setScene('memory');
          setIsInputPhase(false);
          return;
        }

        if (scene === 'will') {
          if (isInputPhase) {
            setIsInputPhase(false);
            return;
          }
          if (willStep > 0) {
            setWillStep(willStep - 1);
            return;
          }
          setScene('can');
          setCanStep(1);
          setCanReviewing(true);
          setCanConfirming(false);
          setIsInputPhase(false);
          return;
        }

        if (scene === 'must') {
          if (mustStep === 1) {
            if (mustWorkStep > 0) {
              setMustWorkStep(mustWorkStep - 1);
              return;
            }
            setMustStep(0);
            setMustRecollectionVisible(true);
            return;
          }
          if (mustRecollectionVisible) {
            setMustRecollectionVisible(false);
            return;
          }
          setScene('will');
          setWillStep(3);
          setIsInputPhase(false);
          return;
        }

        if (scene === 'summary') {
          setScene('must');
          setMustStep(1);
          setMustWorkStep(3);
          setIsInputPhase(false);
        }
      };

      const handleStartCan = () => {
        setCanStep(0);
        setNewCan({ type: 'skill', name: '', desc: '' });
        setCanConfirming(false);
        setCanAddOpen(true);
        setCanReviewing(false);
        nextScene('can');
      };

      const handleAddCan = () => {
        if (!newCan.name) return;
        setCans([...cans, { ...newCan, id: Date.now() }]);
        setNewCan({ type: newCan.type, name: '', desc: '' });
        setCanConfirming(false);
        setCanAddOpen(true);
        setCanReviewing(false);
      };
      const handleRemoveCan = (id) => {
        setCans(cans.filter(c => c.id !== id));
        setCanConfirming(false);
        setCanAddOpen(true);
        setCanReviewing(false);
      };

      const handleCompleteCanStep = () => {
        setCanConfirming(false);
        if (canStep === 0) {
          setCanStep(1);
          setNewCan({ type: 'ally', name: '', desc: '' });
          setIsInputPhase(false);
          scrollTop();
        } else {
          setCanConfirming(false);
          setCanReviewing(true);
          setIsInputPhase(false);
          scrollTop();
        }
      };

      const handleBackCanStep = () => {
        setCanStep(0);
        setNewCan({ type: 'skill', name: '', desc: '' });
        setCanConfirming(false);
        setCanAddOpen(true);
        setCanReviewing(false);
        setIsInputPhase(false);
        scrollTop();
      };

      const handleProceedFromCanReview = () => {
        setCanReviewing(false);
        nextScene('will');
      };

      const handleEditCanFromReview = (step) => {
        setCanReviewing(false);
        setCanStep(step);
        setNewCan({ type: step === 0 ? 'skill' : 'ally', name: '', desc: '' });
        setCanConfirming(false);
        setCanAddOpen(true);
        setIsInputPhase(true);
        scrollTop();
      };

      const handleAddMemory = () => {
        const memoryAge = Number(newMemory.age || APP_CONFIG.memoryStartAge);
        if (!newMemory.event || !memoryAge) return;
        const memoryPayload = {
          ...newMemory,
          age: memoryAge,
          satisfaction: Number(newMemory.satisfaction)
        };
        if (memoryEditId) {
          setMemories(memories.map(memory => (
            memory.id === memoryEditId
              ? { ...memory, ...memoryPayload, id: memory.id }
              : memory
          )));
        } else {
          setMemories([...memories, { ...memoryPayload, id: Date.now() }]);
        }
        const nextStep = memoryStep + 1;
        setMemoryStep(nextStep);
        setIsInputPhase(false);
        setMemoryEditId(null);

        if (nextStep < 5) {
          const suggestedAges = getSuggestedAges();
          setNewMemory({ age: suggestedAges[nextStep], event: '', satisfaction: 0 });
        } else {
          setNewMemory({ age: '', event: '', satisfaction: 0 });
        }
      };

      const handleSkipMemory = () => {
        const nextStep = memoryStep + 1;
        setMemoryStep(nextStep);
        setIsInputPhase(false);
        setMemoryEditId(null);

        if (nextStep < 5) {
          const suggestedAges = getSuggestedAges();
          setNewMemory({ age: suggestedAges[nextStep], event: '', satisfaction: 0 });
        } else {
          setNewMemory({ age: '', event: '', satisfaction: 0 });
        }
      };

      const handleRemoveMemory = (id) => {
        setMemories(memories.filter(m => m.id !== id));
        if (memoryEditId === id) setMemoryEditId(null);
      };

      const handleKeepMemory = () => {
        handleSkipMemory();
      };

      const handleRewriteMemory = (memory) => {
        setMemoryEditId(memory.id);
        setNewMemory({
          age: memory.age,
          event: memory.event,
          satisfaction: memory.satisfaction
        });
        setIsInputPhase(true);
        scrollTop();
      };

      const handleReviewMemoriesFromChart = () => {
        const suggestedAges = getSuggestedAges();
        scrollTop();
        setMemoryStep(0);
        setNewMemory({ age: suggestedAges[0], event: '', satisfaction: 0 });
        setMemoryEditId(null);
        setIsInputPhase(false);
        setScene('memory');
      };

      const toggleTenYearWish = (wish) => {
        setWillTenYears(current => (
          current.includes(wish)
            ? current.filter(item => item !== wish)
            : [...current, wish]
        ));
      };

      const handleAddTenYearWish = () => {
        const value = newTenYearWish.trim();
        if (!value) return;
        setWillTenYears(current => current.includes(value) ? current : [...current, value]);
        setNewTenYearWish('');
      };

      const handleRemoveTenYearWish = (wish) => {
        setWillTenYears(current => current.filter(item => item !== wish));
      };

      const getMustConnectionTemplate = (hint = '') => {
        const oneYearWill = will.oneYear || '〇〇';
        const threeYearsWill = will.threeYears || '△△';
        return `${hint ? `${hint}\n\n` : ''}それは私の１年後のWILLである「${oneYearWill}」を実現するのに役立つかもしれない。\nさらには・・・\n\nそれは私の３年後のWILLである「${threeYearsWill}」を実現するのに役立つかもしれない。\nさらには・・・`;
      };
      const normalizeMustConnection = (text = '') => (
        text.includes('それは私の１年後のWILL') ? text : getMustConnectionTemplate(text)
      );

      const handleAddMust = () => {
        if (!newMust.title) return;
        const existing = musts.find(m => m.title === newMust.title);
        const connection = existing ? (existing.connection || normalizeMustConnection(newMust.connection)) : normalizeMustConnection(newMust.connection);
        const id = existing ? existing.id : Date.now();
        const mustToAdd = {
          id,
          title: newMust.title,
          desc: newMust.desc,
          connection
        };
        setMusts(existing ? musts.map(m => m.id === existing.id ? mustToAdd : m) : [...musts, mustToAdd]);
        setActiveMustId(id);
        setNewMust({ title: '', desc: '', connection: '' });
        setMustQuestAdded(true);
        setMustDraftStarted(false);
      };
      const handleProceedToMustConnection = () => {
        if (musts.length === 0) return;
        if (musts.length > 1) {
          setMustWorkStep(1);
          scrollTop();
          return;
        }
        const target = musts[0];
        setActiveMustId(target.id);
        setNewMust({
          title: target.title,
          desc: target.desc,
          connection: target.connection || normalizeMustConnection('')
        });
        setMustConnectionStarted(false);
        setMustWorkStep(2);
        scrollTop();
      };
      const handleStartMustConnection = (must) => {
        setActiveMustId(must.id);
        setNewMust({
          title: must.title,
          desc: must.desc,
          connection: must.connection || normalizeMustConnection('')
        });
        setMustConnectionStarted(false);
        setMustWorkStep(2);
        scrollTop();
      };
      const handleSaveMustConnection = () => {
        if (!activeMustId) return;
        setMusts(musts.map(m => m.id === activeMustId ? { ...m, connection: newMust.connection } : m));
        setMustWorkStep(3);
        scrollTop();
      };
      const handleEditMustConnection = (connection) => {
        setMustConnectionStarted(true);
        setNewMust({ ...newMust, connection });
        if (activeMustId) {
          setMusts(musts.map(m => m.id === activeMustId ? { ...m, connection } : m));
        }
      };
      const handleEditActiveMust = (updates) => {
        const updatedMust = { ...newMust, ...updates };
        setNewMust(updatedMust);
        if (activeMustId) {
          setMusts(musts.map(m => m.id === activeMustId ? { ...m, ...updates } : m));
        }
      };
      const handleRemoveMust = (id) => {
        const remainingMusts = musts.filter(m => m.id !== id);
        setMusts(remainingMusts);
        setMustQuestAdded(remainingMusts.length > 0);
        if (activeMustId === id) {
          setActiveMustId(null);
          setNewMust({ title: '', desc: '', connection: '' });
          setMustWorkStep(0);
        } else if (remainingMusts.length === 0) {
          setActiveMustId(null);
          setNewMust({ title: '', desc: '', connection: '' });
        }
      };

      const getStoryStorageData = () => {
        const data = {};
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (!key || !key.startsWith('cq_')) continue;
          const rawValue = window.localStorage.getItem(key);
          try {
            data[key] = JSON.parse(rawValue);
          } catch (error) {
            data[key] = rawValue;
          }
        }
        return data;
      };

      const createStoryExportPayload = () => ({
          app: APP_CONFIG.appName,
          type: 'career-inn-story',
          version: 1,
          exportedAt: new Date().toISOString(),
          data: getStoryStorageData()
      });

      const createStoryExportText = () => encodeBase64Unicode(JSON.stringify(createStoryExportPayload()));

      const extractStoryImportText = (source) => {
        const marker = '【あなたの物語データ】';
        let text = source.trim();
        if (text.includes(marker)) {
          text = text.split(marker).pop().trim();
        }
        const prefixedMatch = text.match(/CQ-STORY:([A-Za-z0-9+/=]+)/);
        if (prefixedMatch) return prefixedMatch[1];
        const base64Match = text.match(/[A-Za-z0-9+/=]{80,}/);
        return (base64Match ? base64Match[0] : text).trim();
      };

      const resolveStoryImportText = async (source) => {
        const text = source.trim();
        try {
          const url = new URL(text, window.location.href);
          const compressed = url.searchParams.get('data');
          if (compressed) {
            return restoreStoryBase64FromCompressedParam(compressed);
          }
        } catch (error) {}
        return extractStoryImportText(text).replace(/^CQ-STORY:/, '');
      };

      const restoreStoryPayload = (payload) => {
        const data = payload.data || payload;
        if (!data || typeof data !== 'object') throw new Error('invalid payload');

        clearAdventureData();
        Object.entries(data).forEach(([key, value]) => {
          if (!key.startsWith('cq_')) return;
          const serialized = JSON.stringify(value);
          if (serialized !== undefined) {
            window.localStorage.setItem(key, serialized);
          }
        });
        if (!Object.prototype.hasOwnProperty.call(data, 'cq_scene')) {
          window.localStorage.setItem('cq_scene', JSON.stringify('intro'));
        }
        return data;
      };

      const handleExportStoryData = async () => {
        const encoded = createStoryExportText();
        try {
          const saveUrl = await createCompressedStoryUrl(encoded);
          await copyTextToClipboard(saveUrl);
          setSaveMessage('セーブ用URLをコピーしました。別のブラウザで開くと、この「あなたの物語」を呼び覚ませます。');
          alert('セーブ用URLをコピーしました。PCやスマホなど別のブラウザで開くと、この「あなたの物語」を呼び覚ませます。');
        } catch (error) {
          const message = error && /Compression Streams/.test(error.message || '')
            ? 'このブラウザは圧縮セーブURLの作成に対応していません。Chrome / Edge / Safari などの新しいブラウザでお試しください。'
            : 'コピーに失敗しました。以下のURLを選択して保存してください。';
          try {
            const saveUrl = await createCompressedStoryUrl(encoded);
            window.prompt(message, saveUrl);
          } catch (fallbackError) {
            alert(message);
          }
        }
      };

      const handleImportStoryData = async () => {
        const source = importText.trim();
        if (!source) {
          setImportMessage('読み込む文字列を貼り付けてください。');
          return;
        }
        try {
          const encoded = await resolveStoryImportText(source);
          const decoded = decodeBase64Unicode(encoded);
          const payload = JSON.parse(decoded);
          restoreStoryPayload(payload);
          setImportMessage('読み込みました。あなたの物語を呼び覚まします。');
          window.setTimeout(() => window.location.reload(), 500);
        } catch (error) {
          setImportMessage('読み込みに失敗しました。セーブ用URL、または書き出した文字列をそのまま貼り付けてください。');
        }
      };

      useEffect(() => {
        const compressed = new URLSearchParams(window.location.search).get('data');
        if (!compressed) return undefined;

        let cancelled = false;
        (async () => {
          try {
            const encoded = await restoreStoryBase64FromCompressedParam(compressed);
            console.log('Restored career-inn story data:', encoded);
            const payload = JSON.parse(decodeBase64Unicode(encoded));
            restoreStoryPayload(payload);
            if (cancelled) return;

            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('data');
            window.history.replaceState(null, document.title, cleanUrl.toString());
            window.location.reload();
          } catch (error) {
            console.error('Failed to restore career-inn story data from URL:', error);
            setImportMessage('URLからの読み込みに失敗しました。セーブ用URLを確認してください。');
          }
        })();

        return () => {
          cancelled = true;
        };
      }, []);

      const openOtherTableTalk = (context) => {
        setOtherTableState({
          isOpen: true,
          context,
          selectedGuestId: null,
          lineIndex: 0,
          greetingIndex: Math.floor(Math.random() * otherTableGreetings.length)
        });
      };

      const closeOtherTableTalk = () => {
        setOtherTableState(current => ({ ...current, isOpen: false }));
      };

      const handleSelectOtherGuest = (guestId) => {
        setOtherTableState(current => ({
          ...current,
          selectedGuestId: guestId,
          lineIndex: current.selectedGuestId === guestId ? current.lineIndex + 1 : 0
        }));
      };

      const handleMoreOtherGuest = () => {
        setOtherTableState(current => (
          current.selectedGuestId
            ? { ...current, lineIndex: current.lineIndex + 1 }
            : { ...current, greetingIndex: current.greetingIndex + 1 }
        ));
      };

      const handleReset = () => {
        if (window.confirm('これまでの記録（あなたの物語）をすべて消去して、初めからやり直しますか？')) {
          clearAdventureData();
          window.location.reload();
        }
      };

      const handleSuspend = () => {
        if (window.confirm('ここまでのあなたの物語はこのブラウザに保存されています。ここで中断しますか？')) {
          alert('保存しました。あとで同じブラウザでこのページを開くと、この場面から再開できます。');
        }
      };

      const renderIntroPreviewCard = (className = '') => (
        <button
          type="button"
          onClick={() => setIntroPreviewOpen(true)}
          className={`group relative block w-full overflow-hidden rounded-lg border-2 border-yellow-500 bg-black bg-opacity-70 p-2 text-left shadow-xl transition-all hover:border-yellow-300 hover:bg-opacity-80 ${className}`}
        >
          <img
            src={APP_CONFIG.introResultPreviewImg}
            alt="このアプリで作成されるあなたの物語まとめの例"
            className="max-h-72 w-full rounded border border-gray-700 object-cover object-top"
            draggable="false"
          />
          <div className="pointer-events-none absolute inset-4 flex items-center justify-center rounded bg-black bg-opacity-35 px-3 py-2 text-center text-lg font-bold leading-relaxed text-white md:text-2xl" style={{ textShadow: '0 0 10px rgba(0,0,0,0.95), 2px 2px 0 #000' }}>
            アプリで<br />
            チャートや振り返りを<br />
            {applyThemeText('まとめられるのじゃ')}
          </div>
          <span className="mt-2 flex min-h-[1.5rem] items-center justify-center gap-2 pb-1 text-xs font-bold leading-none text-yellow-200 group-hover:text-white">
            <i className="fa-solid fa-magnifying-glass-plus"></i> クリックで拡大
          </span>
        </button>
      );

      const renderIntro = () => {
        const dialogsIntro = [
          { speaker: APP_CONFIG.char1NameFull, type: APP_CONFIG.char1Type, text: `「ほっほっほ、見ない顔じゃな。わしは魔法使いの${APP_CONFIG.char1NameShort}。こちらは${APP_CONFIG.char2NameFull}じゃ。」` },
          { speaker: APP_CONFIG.char2NameFull, type: APP_CONFIG.char2Type, imageSide: "left", text: "「はじめまして！私、冒険者さんのお話を聞くのが大好きなんです！\nあなたのお名前と年齢、教えてもらえませんか？」" }
        ];

        return (
          <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in mt-10">
            {!isInputPhase ? (
              <>
                {introStep === 0 && (
                  <div className="w-full max-w-2xl text-center animate-fade-in">
                    <DialogGroup dialogs={[
                      {
                        speaker: APP_CONFIG.char1NameFull,
                        type: APP_CONFIG.char1Type,
                        text: APP_CONFIG.scenarioText.intro.firstGuide
                      }
                    ]} afterDialog={{
                      0: (
                        <div className="mb-4 space-y-4">
                          {renderIntroPreviewCard()}
                          <button
                            type="button"
                            onClick={() => setInnMeaningOpen(true)}
                            className="orange-aura-pulse group relative inline-flex min-h-[10rem] w-full max-w-md items-end justify-center overflow-hidden rounded border-2 border-orange-400 px-6 pb-5 pt-4 text-base font-bold tracking-wide text-white shadow-xl transition-all hover:scale-[1.01] hover:border-yellow-200"
                            style={{
                              backgroundImage: "linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.32)), url('./img/sakusen.jpg')",
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 52%'
                            }}
                          >
                            <span className="absolute inset-0 bg-black bg-opacity-5 transition-opacity group-hover:bg-opacity-0"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2 rounded bg-black bg-opacity-45 px-4 py-2" style={{ textShadow: '0 0 8px rgba(0,0,0,0.95), 2px 2px 0 #000' }}>
                              <i className="fa-solid fa-hat-wizard text-yellow-200"></i>
                              {APP_CONFIG.char1NameShort}に、この宿屋の意味を聞く
                            </span>
                          </button>
                        </div>
                      )
                    }} />
                    <button onClick={() => setIntroStep(1)} className="rpg-button text-xl px-8 py-4 mt-4 animate-bounce">
                      ハルカの案内に進む
                    </button>
                    <div className="mt-4 flex justify-center">
                      <a
                        href={APP_CONFIG.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rpg-button inline-flex items-center justify-center gap-2 px-6 py-3 text-base"
                      >
                        <i className="fa-regular fa-comments"></i>
                        {APP_CONFIG.bookingButtonText}
                      </a>
                    </div>
                    {renderAppNote('mt-5')}
                  </div>
                )}

                {introStep === 1 && (
                  <div className="w-full max-w-2xl text-center animate-fade-in">
                    <DialogGroup dialogs={[
                      {
                        speaker: APP_CONFIG.char2NameShort,
                        type: APP_CONFIG.char2Type,
                        imageSide: "left",
                        text: APP_CONFIG.scenarioText.intro.secondGuide
                      }
                    ]} />
                    <p className="mt-4 rounded border border-yellow-600 bg-black bg-opacity-65 px-4 py-3 text-left font-sans text-xs leading-relaxed text-yellow-100">
                      ※注意　LINEやX等のアプリ内ブラウザで開くとうまく動作できない事があります。chromeやEdge、safariなどの純正ブラウザで開くことをお勧めします。
                    </p>
                    <button onClick={() => setIntroStep(2)} className="rpg-button text-xl px-8 py-4 mt-8 animate-bounce">
                      宿屋に向かう
                    </button>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowImportBox(!showImportBox);
                          setImportMessage('');
                        }}
                        className="text-sm text-yellow-200 underline underline-offset-4 hover:text-white"
                      >
                        「あなたの物語」の記憶を呼び覚ます（データを読み込む）
                      </button>
                    </div>
                    {showImportBox && (
                      <div className="mt-4 rounded border border-yellow-600 bg-black bg-opacity-75 p-4 text-left animate-fade-in">
                        <label className="mb-2 block text-sm font-bold text-yellow-300">保存しておいたデータ文字列</label>
                        <WritableField value={importText} textarea>
                          <textarea
                            className="rpg-input h-28 resize-none text-xs leading-relaxed"
                            value={importText}
                            onChange={e => setImportText(e.target.value)}
                            placeholder="セーブ用URL、または保存した文字列を貼り付けてください。"
                          />
                        </WritableField>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs text-gray-300">{importMessage || '読み込むと、このブラウザの現在の記録に上書きされます。'}</p>
                          <button type="button" onClick={handleImportStoryData} className="rpg-button whitespace-nowrap px-5 py-2 text-sm">
                            読み込む
                          </button>
                        </div>
                      </div>
                    )}
                    {renderAppNote('mt-5')}
                  </div>
                )}

                {introStep === 2 && (
                  <div className="w-full text-center animate-fade-in">
                    <NarrationBox iconName="fa-solid fa-mug-hot" text={"あなたは、長い冒険の途中に、とある町の宿屋に到着した。\n古びた看板には『ＲＩＥＳＭ亭』と書かれている。\n\n「リースム…？いや、この地方だとリズムだな。…リズム亭か。なかなかよさそうだ。」\n\n荷物を部屋におき、1階の酒場でエールを飲んでくつろいでいると、\n一人の老人と、弟子らしき若い女性が興味深そうに声をかけてきた。"} />
                    <button onClick={() => setIntroStep(3)} className="rpg-button text-xl px-8 py-4 mt-4 animate-bounce">
                      次へ
                    </button>
                  </div>
                )}

                {introStep === 3 && (
                  <div className="w-full max-w-2xl text-center animate-fade-in">
                    <DialogGroup dialogs={dialogsIntro}>
                      <button onClick={() => setIsInputPhase(true)} className="rpg-button text-xl px-8 py-4 mt-4 animate-bounce">
                        答える
                      </button>
                    </DialogGroup>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full max-w-md animate-fade-in">
                <WindowBox title="プレイヤー情報" iconName="fa-regular fa-message">
                  <div className="space-y-5 p-2">
                    <div>
                      <label className="text-gray-300 text-sm block mb-1">ねんれい（年齢はそのままレベルになる）</label>
                      <div className="flex items-start gap-3">
                        <select
                          className="rpg-select h-32 w-28 text-center text-xl font-bold text-yellow-300"
                          size={5}
                          value={String(player.age || APP_CONFIG.defaultAge)}
                          onChange={e => setPlayer({...player, age: e.target.value})}
                          aria-label="年齢を選択"
                        >
                          {ageOptions.map(age => (
                            <option key={age} value={age}>{age}歳</option>
                          ))}
                        </select>
                        <div className="flex-1 pt-2 text-left">
                          <span className="text-yellow-400 font-bold text-xl">→ Lv.{player.age || APP_CONFIG.defaultAge}</span>
                          <p className="mt-2 text-xs text-gray-400 leading-relaxed">上下にスクロールして選べます。</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <WriteCue active={!player.name} />
                      <label className="text-gray-300 text-sm block mb-1">なまえ</label>
                      <WritableField value={player.name}>
                        <input type="text" className="rpg-input text-xl" value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} placeholder="例：ああああ" />
                      </WritableField>
                    </div>
                  </div>
                </WindowBox>
                <div className="text-center mt-6">
                  <button onClick={handleStartCan} disabled={!player.name || !player.age} className={`rpg-button text-xl px-8 py-4 ${(!player.name || !player.age) ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}>
                    二人との会話を続ける
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      };

      const renderOtherTablePrompt = (context, options = {}) => {
        const speakerType = options.speakerType || APP_CONFIG.char1Type;
        const defaultText = speakerType === APP_CONFIG.char2Type
          ? '「もしすんなり浮かばない時は、他の人のお話を聞いてみてもいいかもしれません。\nあちらのテーブルの方たちも、これからのことを考えているみたいですよ✨」'
          : '「どうじゃ？すんなり浮かばない時は他の者の話をきくのもよいぞ。あちらのテーブルの者たちも同じような境遇のようじゃ。」';

        return (
        <div className="mt-6 print-hidden">
          {options.showIntro !== false && (
            <DialogBox
              speaker={charName(speakerType)}
              type={speakerType}
              imageSide={speakerType === APP_CONFIG.char2Type ? 'right' : 'left'}
              text={options.text || defaultText}
            />
          )}
          <div className="text-center">
            <button
              type="button"
              onClick={() => openOtherTableTalk(context)}
              className="rpg-button other-table-peek inline-flex w-72 max-w-full flex-col overflow-hidden border-yellow-400 text-base shadow-xl"
              style={{ padding: 0, '--other-table-image': `url(${APP_CONFIG.otherGuestsImg})` }}
            >
              <span className="flex min-h-[8.75rem] w-full items-end justify-center px-4 py-4 text-center">
                <span className="other-table-peek-label inline-flex items-center justify-center px-4 py-2 leading-relaxed">
                  <i className="fa-solid fa-users mr-2"></i>他のテーブルの話を聞く（任意）
                </span>
              </span>
            </button>
          </div>
        </div>
        );
      };

      const renderCan = () => {
        const pName = player.name || '冒険者';
        const isWeaponMagicStep = canStep === 0;
        const isJourneyPromptBeforeCan = isWeaponMagicStep && memories.length === 0 && memoryStep === 0 && !canReviewing;
        const allowedTypes = isWeaponMagicStep ? ['skill', 'magic'] : ['ally'];
        const activeType = allowedTypes.includes(newCan.type) ? newCan.type : allowedTypes[0];
        const visibleCans = cans.filter(c => allowedTypes.includes(c.type));
        const skillCans = cans.filter(c => c.type === 'skill');
        const magicCans = cans.filter(c => c.type === 'magic');
        const allyCans = cans.filter(c => c.type === 'ally');
        const title = isWeaponMagicStep ? 'シーン2-1：武器・魔法の確認' : 'シーン2-2：仲間・関係性の確認';
        const enteredName = (player.name || '').trim();
        const sameNameNames = ['りふれむ', 'リフレム', 'はるか', 'ハルカ'];
        const heroLikeNames = ['ろと', 'ロト', 'ひんめる', 'ヒンメル', 'あるす', 'アルス', 'パーン', 'せいや', 'セイヤ', 'けんしろう', 'ケンシロウ', 'らおう', 'ラオウ', 'ルフィ', 'るふぃ', 'ごくう', 'ゴクウ', '悟空'];
        const lookalikeNames = ['とき', 'トキ', 'ディードリット', 'ふりーれん', 'フリーレン', 'はいたー', 'ハイター', 'あいぜん', 'アイゼン', 'フェルン', 'ふぇるん', 'しゅたるく', 'シュタルク', 'クラウド', 'くらうど', 'えありす', 'エアリス', 'てぃふぁ', 'ティファ', 'ゆふぃ', 'ユフィ'];
        const nameReaction = sameNameNames.includes(enteredName)
          ? '同じ名とは奇遇じゃな。'
          : heroLikeNames.includes(enteredName)
            ? 'ふむ…古の勇者のような名前じゃのう…。'
            : lookalikeNames.includes(enteredName)
              ? '…いや…まさかな。他人の空似じゃろう…。'
              : 'よい面構えじゃ。';
        const dialog = isWeaponMagicStep
          ? [{
              speaker: APP_CONFIG.char1NameShort,
              type: APP_CONFIG.char1Type,
              text: isJourneyPromptBeforeCan
                ? `「Lv.${player.age}の ${pName} と申すか。${nameReaction}\nまずは、お主がこれまでどんな冒険をしてきたか、教えてくれるぬか？」`
                : `「Lv.${player.age}の ${pName} と申すか。${nameReaction}\nまずは、お主がこれまで磨いてきた武器と魔法を見せてくれんか。」`
            }]
          : [{ speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「${pName}さんの力、すごく見えてきました！\n次は、どんな人たちに支えられてきたか、どんな関係性を育ててきたかを聞かせてください。\n仲間とのつながりも、大切なステータスです！」` }];

        if (canReviewing) {
          return (
            <div className="space-y-6 max-w-5xl mx-auto w-full animate-fade-in">
              <DialogBox
                speaker={APP_CONFIG.char1NameShort}
                type={APP_CONFIG.char1Type}
                text={"「ふむ。武器、魔法、仲間との関係性が出そろったようじゃな。\n未来へ向かう前に、ここまでのステータスを一度眺めてみるのじゃ。」"}
              />

              <WindowBox title="ここまでのステータス確認" iconName="fa-solid fa-shield-heart">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded border border-blue-500 bg-gray-900 bg-opacity-80 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-300">
                      <i className={canTypeMeta.skill.icon}></i> 武器（専門スキル）
                    </h3>
                    <CanList cans={skillCans} emptyText="まだ武器は記録されていません。" compact />
                  </div>
                  <div className="rounded border border-purple-500 bg-gray-900 bg-opacity-80 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-purple-300">
                      <i className={canTypeMeta.magic.icon}></i> 魔法（汎用力）
                    </h3>
                    <CanList cans={magicCans} emptyText="まだ魔法は記録されていません。" compact />
                  </div>
                  <div className="rounded border border-green-500 bg-gray-900 bg-opacity-80 p-4">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-green-300">
                      <i className={canTypeMeta.ally.icon}></i> 仲間・関係性
                    </h3>
                    <CanList cans={allyCans} emptyText="まだ仲間との関係性は記録されていません。" compact />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded border border-gray-700 bg-black bg-opacity-60 p-4">
                    <p className="mb-2 text-sm font-bold text-yellow-300">武器・魔法についての気づき</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{canInsight || 'まだメモはありません。'}</p>
                  </div>
                  <div className="rounded border border-gray-700 bg-black bg-opacity-60 p-4">
                    <p className="mb-2 text-sm font-bold text-yellow-300">仲間・関係性についての気づき</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{allyInsight || 'まだメモはありません。'}</p>
                  </div>
                </div>
              </WindowBox>

              <div className="flex flex-col md:flex-row justify-center gap-3 mt-6">
                <button onClick={() => handleEditCanFromReview(0)} className="rpg-button text-base px-6 py-3">
                  武器・魔法を見直す
                </button>
                <button onClick={() => handleEditCanFromReview(1)} className="rpg-button text-base px-6 py-3">
                  仲間・関係性を見直す
                </button>
                <button onClick={handleProceedFromCanReview} className="rpg-button text-base px-8 py-3 bg-white text-black font-bold flex items-center justify-center gap-2">
                  OK、未来を語りに進む <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            {!isInputPhase ? (
              <div className="animate-fade-in text-center">
                <DialogGroup dialogs={dialog}>
                  <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                    {isWeaponMagicStep ? (
                      <button onClick={() => isJourneyPromptBeforeCan ? nextScene('intro') : nextScene('chart')} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> {isJourneyPromptBeforeCan ? '宿屋の入口へ戻る' : '旅路の記録に戻る'}
                      </button>
                    ) : (
                      <button onClick={handleBackCanStep} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> 武器・魔法に戻る
                      </button>
                    )}
                    <div className="order-1 md:order-2 flex flex-col items-center gap-5">
                      {isWeaponMagicStep && (
                        <button
                          type="button"
                          onClick={() => setInnMeaningOpen(true)}
                          className="rpg-button orange-aura-pulse inline-flex w-60 items-center justify-center gap-2 border-orange-400 bg-black bg-opacity-85 px-5 py-2 text-sm text-orange-100 hover:bg-orange-100 hover:text-black"
                        >
                          <i className="fa-solid fa-hat-wizard"></i>
                          この宿屋の意味を聞く
                        </button>
                      )}
                      {isWeaponMagicStep && (
                        <div className="w-full max-w-xl text-center">
                          <button
                            type="button"
                            onClick={() => setCanInnPreviewOpen(!canInnPreviewOpen)}
                            className="rpg-button inline-flex w-60 items-center justify-center gap-2 border-yellow-400 bg-black bg-opacity-85 px-5 py-2 text-sm text-yellow-100 hover:bg-yellow-100 hover:text-black"
                            aria-expanded={canInnPreviewOpen}
                          >
                            <i className="fa-solid fa-house-chimney-window"></i>
                            <i className={`fa-solid ${canInnPreviewOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            この宿屋でできる事
                          </button>
                          {canInnPreviewOpen && (
                            <div className="mt-4 animate-fade-in">
                              {renderIntroPreviewCard()}
                            </div>
                          )}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (isJourneyPromptBeforeCan) {
                            nextScene('memory');
                            return;
                          }
                          setNewCan({ type: isWeaponMagicStep ? 'skill' : activeType, name: '', desc: '' });
                          setCanConfirming(false);
                          setCanAddOpen(true);
                          setIsInputPhase(true);
                        }}
                        className={`rpg-button text-xl px-8 py-4 animate-bounce flex items-center gap-2 ${isWeaponMagicStep ? 'mt-4' : ''}`}
                      >
                        <i className="fa-regular fa-message"></i> {isJourneyPromptBeforeCan ? 'これまでの冒険を語る' : isWeaponMagicStep ? '武器と魔法を語る' : '仲間との関係性を語る'}
                      </button>
                    </div>
                    <div className="w-40 hidden md:block order-3"></div>
                  </div>
                </DialogGroup>
              </div>
            ) : (
              <div className="animate-fade-in w-full">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => setIsInputPhase(false)} className="text-gray-400 hover:text-white flex items-center gap-2"><i className="fa-solid fa-arrow-right rotate-180"></i> 会話に戻る</button>
                  <p className="text-yellow-300 font-bold">{isWeaponMagicStep ? '武器・魔法の棚卸し' : '仲間・関係性の棚卸し'}</p>
                </div>

                {isWeaponMagicStep && (
                  <DialogBox
                    speaker={APP_CONFIG.char1NameShort}
                    type={APP_CONFIG.char1Type}
                    text={"「下の候補から選んでもよいし、自分で思いつく力を追加してもよいぞ。\n専門スキルも、どんな場でも使える汎用力も、立派な冒険の力じゃ。」"}
                  />
                )}

                <WindowBox title={title} iconName={isWeaponMagicStep ? "fa-solid fa-shield-halved" : "fa-solid fa-people-group"}>
                  <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <CanList cans={visibleCans} emptyText={isWeaponMagicStep ? '武器と魔法はまだ記録されていません。' : '仲間との関係性はまだ記録されていません。'} onRemove={handleRemoveCan} />
                  </div>

                  <details
                    className="border-t border-gray-600 pt-4"
                    open={canAddOpen}
                    onToggle={e => setCanAddOpen(e.currentTarget.open)}
                  >
                    <summary className="cursor-pointer list-none text-sm font-bold text-yellow-300 hover:text-yellow-100">
                      <span className="mr-2">▼</span>{isWeaponMagicStep ? '武器や魔法を記録する。' : '仲間との関係性を記録する。'}
                    </summary>
                    <div className="mt-4 space-y-3">
                      {isWeaponMagicStep && (
                        <p className="text-xs text-gray-400 leading-relaxed">
                          ページを開くと、武器→魔法→武器の順に候補が切り替わります。タブを押して自分でも切り替えられます。
                        </p>
                      )}
                      <div className="flex gap-2">
                        {allowedTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => setNewCan({ ...newCan, type, name: '', desc: '' })}
                            className={`flex-1 py-2 rounded text-sm font-bold transition-colors border-2 ${activeType === type ? canTypeMeta[type].active : 'bg-gray-800 border-transparent text-gray-400'}`}
                          >
                            {canTypeMeta[type].label}
                          </button>
                        ))}
                      </div>
                      <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {presetCans[activeType].map((preset, idx) => {
                            const isAdded = cans.some(c => c.name === preset.name);
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  setCanConfirming(false);
                                  setCanAddOpen(true);
                                  if (isAdded) {
                                    setCans(cans.filter(c => !(c.type === activeType && c.name === preset.name)));
                                  } else {
                                    setCans([...cans, { id: Date.now() + Math.random(), type: activeType, name: preset.name, desc: preset.desc }]);
                                  }
                                }}
                                className={`text-sm border px-3 py-1.5 rounded transition-all ${isAdded ? 'border-yellow-400 bg-yellow-900 bg-opacity-80 text-yellow-100 font-bold hover:bg-red-900 hover:border-red-400' : 'border-gray-500 text-gray-300 hover:bg-gray-800'}`}
                              >
                                {preset.name} {isAdded && <i className="fa-solid fa-check ml-1"></i>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 items-center mt-2">
                        {isWeaponMagicStep ? (
                          <div className={`skill-name-field ${newCan.name ? 'has-value' : ''}`}>
                            <input
                              type="text"
                              placeholder="スキル名（自由に編集・手動追加も可能）"
                              className="rpg-input skill-name-editable w-full"
                              value={newCan.name}
                              onChange={e => setNewCan({...newCan, type: activeType, name: e.target.value})}
                            />
                          </div>
                        ) : (
                          <WritableField value={newCan.name} className="flex-1">
                            <input
                              type="text"
                              placeholder="名前 (自由に編集・手動追加も可能)"
                              className="rpg-input w-full"
                              value={newCan.name}
                              onChange={e => setNewCan({...newCan, type: activeType, name: e.target.value})}
                            />
                          </WritableField>
                        )}
                        <WritableField value={newCan.desc} className="flex-1">
                          <input type="text" placeholder="説明" className="rpg-input w-full" value={newCan.desc} onChange={e => setNewCan({...newCan, type: activeType, desc: e.target.value})} />
                        </WritableField>
                        <button onClick={handleAddCan} disabled={!newCan.name} className={`rpg-button whitespace-nowrap md:w-auto w-full ${!newCan.name ? 'opacity-50' : ''}`}>追加</button>
                      </div>
                    </div>
                  </details>

                  {isWeaponMagicStep && canConfirming && (
                    <div className="mt-6 rounded border border-gray-600 bg-gray-900 bg-opacity-95 p-4 shadow-xl">
                      <p className="mb-3 text-sm font-bold text-yellow-300">
                        <span className="mr-2">▼</span>武器・魔法についての気づき
                      </p>
                      <WritableField value={canInsight} textarea>
                        <textarea
                          className="rpg-input resize-none w-full border-2 border-dashed border-gray-300 bg-black bg-opacity-95 p-3 text-sm leading-relaxed text-gray-200"
                          rows={5}
                          value={canInsight}
                          onChange={e => setCanInsight(e.target.value)}
                          placeholder={'例：私は〇〇の場面で、〇〇という力を使ってきた。\n例：自分では当たり前だと思っていたが、〇〇は私の武器かもしれない。'}
                        />
                      </WritableField>
                    </div>
                  )}
                </WindowBox>
                {!canConfirming && renderOtherTablePrompt(isWeaponMagicStep ? 'canPower' : 'canRelation')}
                {canConfirming ? (
                  <div className="mt-8 animate-fade-in">
                    <DialogBox
                      speaker={isWeaponMagicStep ? APP_CONFIG.char1NameShort : APP_CONFIG.char2NameShort}
                      type={isWeaponMagicStep ? APP_CONFIG.char1Type : APP_CONFIG.char2Type}
                      imageSide={isWeaponMagicStep ? "left" : "right"}
                      text={isWeaponMagicStep
                        ? "「ふむ、これでいいかの？\n武器と魔法、両方確認できたかの？」"
                        : "「このような方々と過ごしてきたんですね✨\n思い起こしてみて、何か気づくことはありますか？」"}
                    />
                    {!isWeaponMagicStep && (
                      <div className="mt-5 rounded border border-gray-600 bg-gray-900 bg-opacity-95 p-4 shadow-xl">
                        <p className="mb-3 text-sm font-bold text-yellow-300">
                          <span className="mr-2">▼</span>仲間・関係性についての気づき
                        </p>
                        <WritableField value={allyInsight} textarea>
                          <textarea
                            className="rpg-input resize-none w-full border-2 border-dashed border-gray-300 bg-black bg-opacity-95 p-3 text-sm leading-relaxed text-gray-200"
                            rows={5}
                            value={allyInsight}
                            onChange={e => setAllyInsight(e.target.value)}
                            placeholder={"例：私は〇〇さん／〇〇な人たちに支えられてきた。\n例：困ったとき、〇〇という関係性が力になっていた。"}
                          />
                        </WritableField>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
                      <button onClick={() => { setCanConfirming(false); setCanAddOpen(true); }} className="rpg-button text-base px-6 py-3">
                        もう少し書き足す
                      </button>
                      <button onClick={handleCompleteCanStep} className="rpg-button text-base px-8 py-3 bg-white text-black font-bold flex items-center justify-center gap-2">
                        OK、次へ進む <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {isWeaponMagicStep && (
                      <div className="mt-8 rounded border border-gray-600 bg-gray-900 bg-opacity-95 p-4 shadow-xl">
                        <div className="mb-4 rounded border border-gray-700 bg-black bg-opacity-45 p-3">
                          <p className="mb-2 text-xs font-bold text-gray-400">選んだ武器・魔法</p>
                          <CanNameChips cans={visibleCans} emptyText="武器・魔法はまだ選ばれていません。" />
                        </div>
                        <p className="mb-3 text-sm font-bold text-yellow-300">
                          <span className="mr-2">▼</span>武器・魔法についての気づき
                        </p>
                        <WritableField value={canInsight} textarea>
                          <textarea
                            className="rpg-input resize-none w-full border-2 border-dashed border-gray-300 bg-black bg-opacity-95 p-3 text-sm leading-relaxed text-gray-200"
                            rows={5}
                            value={canInsight}
                            onChange={e => setCanInsight(e.target.value)}
                            placeholder={'例：私は〇〇の場面で、〇〇という力を使ってきた。\n例：自分では当たり前だと思っていたが、〇〇は私の武器かもしれない。'}
                          />
                        </WritableField>
                      </div>
                    )}
                    <div className="text-center mt-8">
                      <button onClick={() => { setCanConfirming(true); setCanAddOpen(false); }} className="rpg-button text-base px-8 py-3 flex items-center justify-center gap-2 mx-auto bg-white text-black font-bold">
                        {isWeaponMagicStep ? `${APP_CONFIG.char1NameShort}に確認してもらう` : `${APP_CONFIG.char2NameShort}に確認してもらう`} <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      };

      const renderMemory = () => {
        const currentAge = parseInt(player.age) || 30;
        const suggestedAges = getSuggestedAges();
        const pName = player.name || '〇〇';
        const sortedMemories = [...memories].sort((a, b) => a.age - b.age);
        const existingStepMemory = memoryStep < 5 ? sortedMemories[memoryStep] : null;
        const memoryAges = suggestedAges.map((age, index) => sortedMemories[index]?.age || age);

        const dialogSteps = [
          [{ speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「まずは${pName}さんが社会に出たばかりの頃…\n（${memoryAges[0]}歳ごろ）の時はどうでしたか？いろんな期待や不安があったと思います！」` }],
          [{ speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: `「ふむ。仕事にも少し慣れてきた、${memoryAges[1]}歳ごろの思い出はどうじゃ？\n何か心に残っている出来事はあるかな？」` }],
          [{ speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「そんなことが有ったんですね…！次は、${memoryAges[2]}歳ごろの思い出を聞かせてください！\n何か大きな成功や、逆に失敗したことなどはありましたか？」` }],
          [{ speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: `「うむうむ。次は${memoryAges[3]}歳ごろじゃな。\n責任ある立場になったりしたのではないかな？」` }],
          [{ speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「最後は、最近（${memoryAges[4] || currentAge}歳ごろ）のことについて教えてください！\n今の${pName}さんを形作っている出来事を知りたいです！」` }]
        ];

        const isCompleted = memoryStep >= 5;

        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            {!isInputPhase ? (
              <div className="animate-fade-in text-center">
                {!isCompleted ? (
                  <DialogGroup dialogs={dialogSteps[memoryStep]}>
                    {existingStepMemory ? (
                      <div className="mt-6 w-full animate-fade-in">
                        <WindowBox title={`旅路の記録：${existingStepMemory.age}歳ごろ`} iconName="fa-solid fa-book-open">
                          <div className="rounded border border-yellow-600 bg-gray-900 bg-opacity-80 p-4 text-left">
                            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              <p className="text-lg font-bold text-yellow-300">{existingStepMemory.age}歳ごろ</p>
                              <span className={`text-sm font-bold ${existingStepMemory.satisfaction > 0 ? 'text-blue-400' : existingStepMemory.satisfaction < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                                満足度 {existingStepMemory.satisfaction > 0 ? '+' : ''}{existingStepMemory.satisfaction}
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-100">{existingStepMemory.event}</p>
                          </div>
                        </WindowBox>
                        <div className="flex flex-col md:flex-row justify-center gap-3 mt-6">
                          <button onClick={handleKeepMemory} className="rpg-button text-base px-8 py-3 bg-white text-black font-bold">
                            このままでいい <i className="fa-solid fa-arrow-right ml-1"></i>
                          </button>
                          <button onClick={() => handleRewriteMemory(existingStepMemory)} className="rpg-button text-base px-8 py-3">
                            書き直す
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                          <button onClick={() => nextScene('can')} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                            <i className="fa-solid fa-arrow-right rotate-180"></i> リフレムの問いに戻る
                          </button>
                          <button onClick={() => { setMemoryEditId(null); setIsInputPhase(true); }} className="rpg-button text-xl px-8 py-4 animate-bounce flex items-center gap-2 order-1 md:order-2">
                            <i className="fa-regular fa-message"></i> 記憶を語る（{memoryStep + 1}/5）
                          </button>
                          <div className="w-48 hidden md:block order-3"></div>
                        </div>
                        <button onClick={handleSkipMemory} className="text-gray-500 text-sm mt-6 hover:text-gray-300 block mx-auto transition-colors">
                          この年代の記憶はスキップする
                        </button>
                      </>
                    )}
                  </DialogGroup>
                ) : (
                  <DialogGroup dialogs={[
                    { speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: "「よく話してくれたな。お主の歩んできた道がはっきりと見えてきたぞい。\nさあ、これらをあなたの物語（旅路の記録）にまとめてみよう。」" }
                  ]}>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                      <button onClick={() => nextScene('can')} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> リフレムの問いに戻る
                      </button>
                      <button onClick={() => nextScene('chart')} className="rpg-button text-xl px-8 py-4 animate-pulse flex items-center gap-2 bg-white text-black font-bold order-1 md:order-2">
                        旅路の記録を見る <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      <div className="w-48 hidden md:block order-3"></div>
                    </div>
                    <button onClick={() => setIsInputPhase(true)} className="text-gray-500 text-sm mt-6 hover:text-gray-300 block mx-auto transition-colors">
                      追加で記憶を語る
                    </button>
                  </DialogGroup>
                )}
              </div>
            ) : (
              <div className="animate-fade-in w-full">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => { setMemoryEditId(null); setIsInputPhase(false); }} className="text-gray-400 hover:text-white flex items-center gap-2"><i className="fa-solid fa-arrow-right rotate-180"></i> 会話に戻る</button>
                </div>
                <WindowBox title={`記憶を語る：${newMemory.age || '追加'}歳ごろ`} iconName="fa-solid fa-book-open">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div className="bg-gray-900 p-4 rounded border-2 border-gray-600 space-y-4">
                      <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700 mb-4">
                        <p className="text-xs text-gray-400 mb-2">迷ったら、よくある記憶の欠片から選ぶ：</p>
                        <div className="flex flex-wrap gap-2">
                          {presetMemories.map((pm, idx) => (
                            <button key={idx} onClick={() => setNewMemory({ ...newMemory, event: pm.event, satisfaction: pm.satisfaction })} className="text-xs border border-gray-500 text-gray-300 px-2 py-1 rounded hover:bg-gray-700">
                              {pm.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          年齢・時期（<span className="attention-blink inline-block text-yellow-300">変更可能</span>）
                        </label>
                        <div className="flex items-start gap-3">
                          <select
                            className="rpg-select h-32 w-28 text-center text-xl font-bold text-yellow-300"
                            size={5}
                            value={String(newMemory.age || APP_CONFIG.memoryStartAge)}
                            onChange={e => setNewMemory({...newMemory, age: e.target.value})}
                            aria-label="記憶の年齢を選択"
                          >
                            {memoryAgeOptions.map(age => (
                              <option key={age} value={age}>{age}歳</option>
                            ))}
                          </select>
                          <div className="flex-1 pt-2 text-left">
                            <span className="text-yellow-400 font-bold text-xl">{newMemory.age || APP_CONFIG.memoryStartAge}歳ごろ</span>
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed">上下にスクロールして、時期を調整できます。</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">出来事</label>
                        <WritableField value={newMemory.event}>
                          <input type="text" className="rpg-input w-full" placeholder="例：初めてのプロジェクトを任された" value={newMemory.event} onChange={e => setNewMemory({...newMemory, event: e.target.value})} />
                        </WritableField>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1 flex justify-between">
                          <span>満足度（感情）</span>
                          <span className={newMemory.satisfaction > 0 ? 'text-blue-400' : newMemory.satisfaction < 0 ? 'text-red-400' : 'text-gray-400'}>
                            {newMemory.satisfaction > 0 ? '+' : ''}{newMemory.satisfaction}
                          </span>
                        </label>
                        <input type="range" min="-50" max="50" step="5" className="satisfaction-wiggle w-full accent-yellow-400" value={newMemory.satisfaction} onChange={e => setNewMemory({...newMemory, satisfaction: e.target.value})} />
                      </div>
                      <button onClick={handleAddMemory} className="rpg-button w-full mt-4 py-3 bg-blue-900 border-blue-400 hover:bg-blue-700 text-white font-bold">
                        {memoryEditId ? '記憶を更新する' : '記憶を記録する'}
                      </button>
                    </div>

                    <div className="bg-black border-2 border-gray-700 p-4 rounded max-h-[450px] overflow-y-auto">
                      <p className="text-gray-400 mb-3 border-b border-gray-700 pb-2">語られた記憶</p>
                      {memories.length === 0 ? (
                        <EmptyText>まだ記憶は語られていない…</EmptyText>
                      ) : (
                        <ul className="space-y-3">
                          {[...memories].sort((a,b) => a.age - b.age).map(m => (
                            <li key={m.id} className="flex gap-3 text-sm items-center group bg-gray-900 bg-opacity-50 p-2 rounded border border-gray-800">
                              <span className="text-yellow-400 font-bold shrink-0 w-12">{m.age}歳</span>
                              <span className="flex-1 text-gray-200">{m.event}</span>
                              <span className={`shrink-0 font-bold w-10 text-right ${m.satisfaction > 0 ? 'text-blue-400' : m.satisfaction < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                {m.satisfaction > 0 ? '+' : ''}{m.satisfaction}
                              </span>
                              <button onClick={() => handleRemoveMemory(m.id)} className="text-gray-600 hover:text-red-400"><i className="fa-solid fa-trash"></i></button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </WindowBox>
              </div>
            )}
          </div>
        );
      };

      const renderChart = () => (
        <div className="space-y-6 max-w-5xl mx-auto w-full">
          <DialogBox speaker={APP_CONFIG.char1NameShort} type={APP_CONFIG.char1Type} text={`「ほほう…これが ${player.name} の歩んできた軌跡（旅路の記録）か。」`} />

          <WindowBox title="シーン4：旅路の記録" iconName="fa-solid fa-chart-line">
            <LifelineChart data={memories} />
          </WindowBox>

          <DialogGroup dialogs={[
            { speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: "「すごい…！心の動きが、こんな風に山と谷になってるんですね！」" },
            { speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: "「うむ。この山と谷を見て、お主はどういう時に心が躍るのか…自分で気づくことはあるかな？…これはゆっくり考えてみるのがいいのじゃ。」" }
          ]}>
            <div className="mt-6 bg-gray-900 p-4 border border-gray-600 rounded">
              <p className="text-sm text-yellow-300 font-bold mb-2">▼ 気づき・価値観のメモ</p>
              <WritableField value={chartInsight} textarea>
                <textarea
                  className="rpg-input resize-none w-full text-gray-200 bg-black p-2 border-dashed leading-relaxed"
                  rows={5}
                  value={chartInsight}
                  onChange={e => setChartInsight(e.target.value)}
                  placeholder={"例：満足度が上がる時には、〇〇という共通点がある。\n例：つらかった出来事にも、今の自分につながる〇〇があった。"}
                ></textarea>
              </WritableField>
            </div>

            {showRestPrompt ? (
              <div className="mt-8 animate-fade-in">
                <DialogBox
                  speaker={APP_CONFIG.char2NameShort}
                  type={APP_CONFIG.char2Type}
                  imageSide="right"
                  text={"「たくさん話して、つかれたんじゃない？\nいったん休憩する？」"}
                />
                <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
                  <button onClick={handleSuspend} className="rpg-button text-base px-8 py-3">
                    やすむ
                  </button>
                  <button onClick={() => nextScene('can')} className="rpg-button text-base px-8 py-3 bg-white text-black font-bold flex items-center justify-center gap-2">
                    つづける <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                <button onClick={handleReviewMemoriesFromChart} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                  <i className="fa-solid fa-arrow-right rotate-180"></i> 記憶を語り直す
                </button>
                <button onClick={() => setShowRestPrompt(true)} className="rpg-button text-xl px-8 py-4 flex items-center justify-center gap-2 bg-white text-black font-bold order-1 md:order-2">
                  ステータスを語り合う <i className="fa-solid fa-arrow-right"></i>
                </button>
                <div className="w-40 hidden md:block order-3"></div>
              </div>
            )}
          </DialogGroup>
        </div>
      );

      const renderWill = () => {
        const pName = player.name || '〇〇';
        const canProceedFromTenYears = willStep !== 2 || willTenYears.length > 0 || newTenYearWish.trim().length > 0;

        const handleNextWillStep = () => {
          if (willStep === 0) {
            setWillStep(1);
            setIsInputPhase(false);
          } else if (willStep === 1) {
            setWillStep(2);
            setIsInputPhase(false);
          } else if (willStep === 2) {
            handleAddTenYearWish();
            if (willTenYears.length === 0 && !newTenYearWish.trim()) return;
            setWillStep(3);
            setIsInputPhase(false);
            scrollTop();
          } else {
            nextScene('must');
          }
        };

        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            {!isInputPhase ? (
              <div className="animate-fade-in text-center">
                {willStep === 0 ? (
                  <DialogGroup dialogs={[
                    { speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「${pName}さんのこれからのこと、もっと教えてください！\n直近の目標として、1年後はどんな風になっていたいですか？」` }
                  ]}>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                      <button onClick={() => nextScene('chart')} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> あなたの物語に戻る
                      </button>
                      <button onClick={() => setIsInputPhase(true)} className="rpg-button text-xl px-8 py-4 animate-bounce flex items-center gap-2 order-1 md:order-2">
                        <i className="fa-regular fa-message"></i> 1年後の未来を語る
                      </button>
                      <div className="w-40 hidden md:block order-3"></div>
                    </div>
                  </DialogGroup>
                ) : willStep === 1 ? (
                  <DialogGroup dialogs={[
                    { speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: "「そして3年後じゃ。どんなロール（役割・立場・役職・職業）を名乗り、どんな未来を描いておるのかな？\n魔王討伐（劇的な成果）だけが正解ではない。枠を外して自由に描くがよいぞ。」" }
                  ]}>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                      <button onClick={() => { setWillStep(0); setIsInputPhase(false); }} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> 1年後の話に戻る
                      </button>
                      <button onClick={() => setIsInputPhase(true)} className="rpg-button text-xl px-8 py-4 animate-bounce flex items-center gap-2 order-1 md:order-2">
                        <i className="fa-regular fa-message"></i> 3年後の未来を語る
                      </button>
                      <div className="w-40 hidden md:block order-3"></div>
                    </div>
                  </DialogGroup>
                ) : willStep === 2 ? (
                  <DialogGroup dialogs={[
                    { speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「最後に、${pName}さんが10年後までにどんなふうに楽しんでいたいか、少し自由に描いてみませんか？\n仕事だけじゃなく、暮らしや人との関係、旅や安心も大切な未来です！」` }
                  ]}>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                      <button onClick={() => { setWillStep(1); setIsInputPhase(false); }} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> 3年後の話に戻る
                      </button>
                      <button onClick={() => setIsInputPhase(true)} className="rpg-button text-xl px-8 py-4 animate-bounce flex items-center gap-2 order-1 md:order-2">
                        <i className="fa-regular fa-message"></i> 10年後までの楽しみを選ぶ
                      </button>
                      <div className="w-40 hidden md:block order-3"></div>
                    </div>
                  </DialogGroup>
                ) : (
                  <DialogGroup dialogs={[
                    { speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: "「ほう。そのような『想い』があるのじゃな。\n仕事の目標とは少し違って見えても、それもお主の未来を照らす大切な願いじゃ。」" },
                    { speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, text: `「とっても素敵！\n${pName}さんなら、もしかしたらもっと早くにできるかもしれないですね！」` }
                  ]}>
                    <WindowBox title="ここまでのWill確認" iconName="fa-solid fa-map-location-dot" className="text-left">
                      <div className="space-y-4">
                        <div className="rounded border-2 border-yellow-500 bg-gray-900 bg-opacity-90 p-4">
                          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-bold text-yellow-300">
                              <i className="fa-solid fa-star mr-2"></i>10年後までに楽しみたいこと
                            </h3>
                            <button
                              type="button"
                              onClick={() => { setWillStep(2); setIsInputPhase(true); scrollTop(); }}
                              className="text-xs text-gray-400 hover:text-white"
                            >
                              書き直す
                            </button>
                          </div>
                          {willTenYears.length === 0 ? (
                            <p className="text-sm text-gray-400">まだ記録されていません。</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {willTenYears.map(wish => (
                                <span key={wish} className="rounded-full border border-yellow-500 bg-yellow-900 bg-opacity-60 px-3 py-1 text-sm text-yellow-100">
                                  {wish}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="rounded border border-blue-500 bg-gray-900 bg-opacity-80 p-4">
                          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-bold text-blue-300">
                              <i className="fa-solid fa-bullseye mr-2"></i>3年後のWill
                            </h3>
                            <button
                              type="button"
                              onClick={() => { setWillStep(1); setIsInputPhase(true); scrollTop(); }}
                              className="text-xs text-gray-400 hover:text-white"
                            >
                              書き直す
                            </button>
                          </div>
                          <p className="mb-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-100">{will.threeYears || 'まだ記録されていません。'}</p>
                          <div className="mt-3 rounded border border-gray-700 bg-black bg-opacity-50 p-3">
                            <p className="text-xs font-bold text-gray-400">目指すロール</p>
                            <p className="text-base font-bold text-blue-200">{will.job || '未記録'}</p>
                          </div>
                        </div>

                        <div className="rounded border border-green-500 bg-gray-900 bg-opacity-80 p-4">
                          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3 className="text-lg font-bold text-green-300">
                              <i className="fa-solid fa-location-dot mr-2"></i>1年後のWill
                            </h3>
                            <button
                              type="button"
                              onClick={() => { setWillStep(0); setIsInputPhase(true); scrollTop(); }}
                              className="text-xs text-gray-400 hover:text-white"
                            >
                              書き直す
                            </button>
                          </div>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-100">{will.oneYear || 'まだ記録されていません。'}</p>
                        </div>
                      </div>
                    </WindowBox>
                    <NarrationBox
                      iconName="fa-solid fa-moon"
                      text={"夜も更けてきた。\nふたりに礼を伝え、酒場をあとにする。\n胸の中には、1年後、3年後、そして10年後まで続く小さな灯りが残っていた。"}
                    />
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
                      <button onClick={() => { setWillStep(2); setIsInputPhase(true); scrollTop(); }} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> 10年後の想いを書き直す
                      </button>
                      <button onClick={handleNextWillStep} className="rpg-button text-xl px-8 py-4 flex items-center gap-2 bg-white text-black font-bold order-1 md:order-2">
                        自室へ戻って考える <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      <div className="w-48 hidden md:block order-3"></div>
                    </div>
                  </DialogGroup>
                )}
              </div>
            ) : (
              <div className="animate-fade-in w-full">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => setIsInputPhase(false)} className="text-gray-400 hover:text-white flex items-center gap-2"><i className="fa-solid fa-arrow-right rotate-180"></i> 会話に戻る</button>
                </div>
                <WindowBox title={`シーン5：Will（次なる冒険の目的）${willStep === 0 ? ' - 1年後' : willStep === 1 ? ' - 3年後' : ' - 10年後まで'}`} iconName="fa-solid fa-map">
                  <div className="space-y-8 p-2 w-full">
                    {willStep === 0 ? (
                      <div>
                        <label className="text-gray-400 text-sm flex items-center gap-1 mb-2"><i className="fa-solid fa-location-dot"></i> {APP_CONFIG.char2NameShort}の質問：1年先の未来（短期目標）</label>
                        <WritableField value={will.oneYear} textarea>
                          <textarea className="rpg-input resize-none w-full text-lg" rows={3} value={will.oneYear} onChange={e => setWill({...will, oneYear: e.target.value})} placeholder="例：〇〇の資格を取得して、担当業務で〇〇を任されるようになっていたい" />
                        </WritableField>
                        <label className="text-gray-400 text-sm flex items-center gap-1 mt-6 mb-2"><i className="fa-solid fa-feather-pointed"></i> 1年後についての気づき</label>
                        <WritableField value={willOneYearInsight} textarea>
                          <textarea
                            className="rpg-input resize-none w-full text-sm leading-relaxed"
                            rows={5}
                            value={willOneYearInsight}
                            onChange={e => setWillOneYearInsight(e.target.value)}
                            placeholder={"例：1年後には、〇〇の資格取得や〇〇の経験を通じて、〇〇ができる自分になっていたい。\n例：そのために、今の仕事の中で〇〇を試してみたい。"}
                          />
                        </WritableField>
                      </div>
                    ) : willStep === 1 ? (
                      <>
                        <div>
                          <label className="text-gray-400 text-sm flex items-center gap-1 mb-2"><i className="fa-solid fa-location-dot"></i> {APP_CONFIG.char1NameShort}の質問：3年先の未来（長期目標）</label>
                          <WritableField value={will.threeYears} textarea>
                            <textarea className="rpg-input resize-none w-full text-lg" rows={3} value={will.threeYears} onChange={e => setWill({...will, threeYears: e.target.value})} placeholder="例：自社サービスを立ち上げ、多くの村人（ユーザー）を笑顔にする" />
                          </WritableField>
                          <label className="text-gray-400 text-sm flex items-center gap-1 mt-6 mb-2"><i className="fa-solid fa-feather-pointed"></i> 3年後についての気づき</label>
                          <WritableField value={willThreeYearsInsight} textarea>
                            <textarea
                              className="rpg-input resize-none w-full text-sm leading-relaxed"
                              rows={5}
                              value={willThreeYearsInsight}
                              onChange={e => setWillThreeYearsInsight(e.target.value)}
                              placeholder={"例：3年後には、〇〇という役割を自然に担えるようになりたい。\n例：その未来に近づくために、〇〇という経験を積んでおきたい。"}
                            />
                          </WritableField>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm flex items-center gap-1 mb-2"><i className="fa-solid fa-bullseye"></i> 3年後になりたいロール（役割・立場・役職・職業）</label>
                          <WritableField value={will.job}>
                            <input type="text" className="rpg-input text-2xl font-bold text-blue-300 w-full" value={will.job} onChange={e => setWill({...will, job: e.target.value})} placeholder="例：業務改善リーダー / 個人事業主 / 地域に貢献する人" />
                          </WritableField>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-5">
                        <div>
                          <label className="text-gray-400 text-sm flex items-center gap-1 mb-2"><i className="fa-solid fa-star"></i> 10年後までに、どんなふうに楽しんでいたい？</label>
                          <p className="text-xs text-gray-400 leading-relaxed mb-3">
                            思いつくものをいくつでも選んでよい。ここでは、働き方だけでなく、暮らし・旅・家族・安心・人との関係も未来の一部として扱います。
                          </p>
                          <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700">
                            <div className="flex flex-wrap gap-2">
                              {presetTenYearWishes.map(wish => {
                                const isSelected = willTenYears.includes(wish);
                                return (
                                  <button
                                    key={wish}
                                    type="button"
                                    onClick={() => toggleTenYearWish(wish)}
                                    className={`text-sm border px-3 py-1.5 rounded transition-all ${isSelected ? 'border-yellow-400 bg-yellow-900 bg-opacity-80 text-yellow-100 font-bold' : 'border-gray-500 text-gray-300 hover:bg-gray-800'}`}
                                  >
                                    {wish} {isSelected && <i className="fa-solid fa-check ml-1"></i>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm flex items-center gap-1 mb-2"><i className="fa-solid fa-pen"></i> 自分でも書き足す</label>
                          <div className="flex flex-col md:flex-row gap-2">
                            <WritableField value={newTenYearWish} className="flex-1">
                              <input
                                type="text"
                                className="rpg-input w-full"
                                value={newTenYearWish}
                                onChange={e => setNewTenYearWish(e.target.value)}
                                placeholder="例：海の近くでゆっくり暮らしたい"
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTenYearWish();
                                  }
                                }}
                              />
                            </WritableField>
                            <button type="button" onClick={handleAddTenYearWish} disabled={!newTenYearWish.trim()} className={`rpg-button ${!newTenYearWish.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              追加
                            </button>
                          </div>
                        </div>
                        <div className="rounded border border-yellow-600 bg-gray-900 bg-opacity-80 p-3">
                          <p className="text-sm text-yellow-300 font-bold mb-2">選んだ10年後までの楽しみ</p>
                          {willTenYears.length === 0 ? (
                            <EmptyText>まだ選ばれていません。</EmptyText>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {willTenYears.map(wish => (
                                <button
                                  key={wish}
                                  type="button"
                                  onClick={() => handleRemoveTenYearWish(wish)}
                                  className="rounded-full border border-yellow-500 bg-yellow-900 bg-opacity-60 px-3 py-1 text-sm text-yellow-100 hover:border-red-400 hover:bg-red-900"
                                  title="クリックで外す"
                                >
                                  {wish} <i className="fa-solid fa-xmark ml-1"></i>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </WindowBox>
                {willStep === 0 && renderOtherTablePrompt('willOne', { speakerType: APP_CONFIG.char2Type })}
                {willStep === 1 && renderOtherTablePrompt('willThree', { showIntro: false })}
                {willStep === 2 && renderOtherTablePrompt('willTen', { showIntro: false })}
                <div className="text-center mt-8">
                  <button
                    onClick={handleNextWillStep}
                    disabled={!canProceedFromTenYears}
                    className={`rpg-button text-base px-8 py-4 flex items-center justify-center gap-2 mx-auto bg-white text-black font-bold ${!canProceedFromTenYears ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {willStep === 2 ? '二人に話してみる' : '次へ進む'} <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  {willStep === 2 && !canProceedFromTenYears && (
                    <p className="text-xs text-yellow-300 mt-3">ひとつ選ぶか、自分の言葉で書き足すと先へ進めます。</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      };

      const renderMust = () => (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in w-full">
          {mustStep === 0 ? (
            <>
              <NarrationBox
                iconName="fa-solid fa-bed"
                text={`${APP_CONFIG.char1NameShort}と${APP_CONFIG.char2NameShort}との夜明かしの語らいを終え、自室のベッドに腰掛ける。\n己の過去を知り、未来（Will）を描いた今。\nギルド（会社・組織）からの現実のクエスト（Must）とどう接続していくか、一人静かに考える…\n\nそういえば、あの爺さんはこんなことを言っていたな。`}
                onFinish={() => setMustRecollectionVisible(true)}
              />

              {mustRecollectionVisible && (
                <>
                  <MemoryDialogBox
                    speaker={recollectionName(APP_CONFIG.char1Type)}
                    text={"「ギルド（会社・組織）からのクエストは、冒険者としての経験をつみ、ロールを育てることや、さらなる冒険を見つめることにもつながっておる。\nクエストの中で、自分のスキルや魔法を磨いていくことが望まれているぞよ！」"}
                  />
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        setMustStep(1);
                        setMustWorkStep(0);
                        setMustQuestAdded(musts.length > 0);
                        scrollTop();
                      }}
                      className="rpg-button text-base px-8 py-4 flex items-center justify-center gap-2 mx-auto bg-white text-black font-bold"
                    >
                      クエストとの接続を考える <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <WindowBox title="シーン6：ギルド（会社・組織）からのクエストと「接続」" iconName="fa-solid fa-book-open">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 text-xs md:text-sm">
                  {['1. クエスト登録', '2. クエスト選択', '3. Willと接続', '4. 気づき'].map((label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (idx === 0) {
                          setMustWorkStep(0);
                          return;
                        }
                        if (musts.length === 0) return;
                        if (idx === 1) {
                          if (musts.length > 1) {
                            setMustWorkStep(1);
                          } else {
                            handleStartMustConnection(musts[0]);
                          }
                          return;
                        }
                        if (!activeMustId) {
                          if (musts.length > 1) {
                            setMustWorkStep(1);
                            return;
                          }
                          const target = musts[0];
                          setActiveMustId(target.id);
                          setNewMust({
                            title: target.title,
                            desc: target.desc,
                            connection: target.connection || normalizeMustConnection('')
                          });
                          setMustConnectionStarted(false);
                        }
                        setMustWorkStep(idx);
                      }}
                      className={`border px-2 py-2 rounded transition-colors ${mustWorkStep === idx ? 'bg-yellow-400 text-black border-yellow-200 font-bold' : 'bg-black bg-opacity-50 text-gray-400 border-gray-600 hover:text-white'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {mustWorkStep === 0 && (
                  <div className="border-t border-gray-600 pt-6 space-y-4">
                    <p className="text-sm text-yellow-300 font-bold">▼ まず、（会社・組織）からのクエストを書き出す</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      思い浮かぶクエストはいくつか書き出してもよい。そのあと、Willと接続するクエストを一つ選んでみよう。
                    </p>
                    <WriteCue active={!mustDraftStarted} />
                    <WritableField value={newMust.title}>
                      <input
                        type="text"
                        placeholder="クエスト名（業務・役割・期待されていること）"
                        className="rpg-input parchment-input text-base"
                        value={newMust.title}
                        onChange={e => {
                          setMustDraftStarted(true);
                          setNewMust({...newMust, title: e.target.value});
                        }}
                      />
                    </WritableField>
                    <WritableField value={newMust.desc} textarea>
                      <textarea
                        placeholder="クエストの概要・目的"
                        className="rpg-input parchment-input resize-none text-sm leading-relaxed"
                        rows={3}
                        value={newMust.desc}
                        onChange={e => {
                          setMustDraftStarted(true);
                          setNewMust({...newMust, desc: e.target.value});
                        }}
                      />
                    </WritableField>
                    <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700">
                      <p className="text-xs text-gray-400 mb-2">よくあるクエストの欠片から選ぶ：</p>
                      <div className="flex flex-wrap gap-2">
                        {presetMissions.map((mission, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setMustDraftStarted(false);
                              setNewMust({ title: mission.title, desc: mission.desc, connection: mission.connection });
                            }}
                            className="text-xs border border-gray-500 text-gray-300 px-2 py-1 rounded hover:bg-gray-700"
                          >
                            {mission.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    <MemoryDialogBox
                      speaker={recollectionName(APP_CONFIG.char1Type)}
                      text={"「クエストの欠片から選ぶだけでも、良いのじゃが、そこに自分なりの言葉を足すとより理解が深まるのじゃよ。\nいくつか書き出してもよい。そのあと、今のWillにつなげたいクエストを一つ選ぶのじゃ。」"}
                    />
                    <div className="flex justify-end">
                      <button onClick={handleAddMust} disabled={!newMust.title} className={`rpg-button text-sm px-6 py-2 ${!newMust.title ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        書き込みが完了したのでクエストを追加する
                      </button>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-sm text-gray-400 mb-3">登録したクエスト</p>
                      {musts.length === 0 ? (
                        <EmptyText>まだクエストは登録されていません。</EmptyText>
                      ) : (
                        <div className="space-y-3">
                          {musts.map(m => (
                            <div key={m.id} className="border border-gray-600 p-3 rounded bg-gray-900 bg-opacity-50 relative pr-8">
                              <button onClick={() => handleRemoveMust(m.id)} className="absolute right-2 top-2 text-gray-500 hover:text-red-400"><i className="fa-solid fa-trash"></i></button>
                              <h3 className="text-base text-red-300 font-bold mb-1">{m.title}</h3>
                              <p className="text-sm text-gray-400 mb-2">{m.desc || '概要なし'}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-yellow-500 pt-5 flex justify-end">
                      <button
                        onClick={handleProceedToMustConnection}
                        disabled={musts.length === 0}
                        className={`rpg-button text-sm px-8 py-3 bg-white text-black font-bold ${musts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        接続に進む <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}

                {mustWorkStep === 1 && (
                  <div className="border-t border-gray-600 pt-6 space-y-4">
                    <p className="text-sm text-yellow-300 font-bold">▼ どのクエストをWillと接続する？</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      登録済みのクエストが複数あるようじゃ。今回は、その中から一つを選んでWillと接続してみよう。
                    </p>
                    <div className="space-y-3">
                      {musts.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleStartMustConnection(m)}
                          className="w-full text-left border-2 border-gray-600 p-4 rounded bg-gray-900 bg-opacity-50 hover:border-yellow-400 hover:bg-yellow-900 hover:bg-opacity-20 transition-colors"
                        >
                          <span className="block text-base text-red-300 font-bold mb-1">{m.title}</span>
                          <span className="block text-sm text-gray-400">{m.desc || '概要なし'}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setMustWorkStep(0)} className="text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
                      <i className="fa-solid fa-arrow-right rotate-180"></i> クエスト登録に戻る
                    </button>
                  </div>
                )}

                {mustWorkStep === 2 && (
                  <div className="border-t border-gray-600 pt-6 space-y-4">
                    <p className="text-sm text-yellow-300 font-bold">▼ クエストを、自分のWillと接続してみる</p>
                    <div className="parchment-card p-4 md:p-5">
                      <p className="text-sm font-bold mb-2 tracking-widest text-[#6b3f15]">接続するクエスト</p>
                      <p className="text-2xl md:text-3xl font-bold text-[#071f3f] leading-tight">{newMust.title || 'クエスト未選択'}</p>
                      <p className="text-base md:text-lg text-[#071f3f] mt-3 leading-relaxed whitespace-pre-wrap">{newMust.desc || '概要なし'}</p>
                    </div>
                    <MemoryHarukaBox
                      speaker={recollectionName(APP_CONFIG.char2Type)}
                      text={"「このクエストは、1年後・3年後のWillへ近づくための冒険、自分の物語のサブクエストとして捉えることもできるんですよ。\n文章は自由に書き換えてくださいね。」"}
                    />
                    <WriteCue active={!mustConnectionStarted} />
                    <WritableField value={newMust.connection} textarea>
                      <textarea
                        placeholder="このクエストは、どんなCanを育て、どんなWillに近づく機会になるか？"
                        className="rpg-input parchment-input resize-none text-sm leading-relaxed"
                        rows={8}
                        value={newMust.connection}
                        onChange={e => {
                          handleEditMustConnection(e.target.value);
                        }}
                      />
                    </WritableField>
                    <div className="rounded border border-yellow-700 bg-black bg-opacity-50 p-4 print-friendly">
                      <p className="text-sm text-yellow-300 font-bold mb-3">▼ 参考：ここまでに描いたWill</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="parchment-card p-3">
                          <p className="text-xs font-bold tracking-widest text-[#6b3f15] mb-1">1年後のWill</p>
                          <p className="text-sm text-[#071f3f] whitespace-pre-wrap">{will.oneYear || 'まだ記録されていません。'}</p>
                        </div>
                        <div className="parchment-card p-3">
                          <p className="text-xs font-bold tracking-widest text-[#6b3f15] mb-1">3年後のWill</p>
                          <p className="text-sm text-[#071f3f] whitespace-pre-wrap">{will.threeYears || 'まだ記録されていません。'}</p>
                          {will.job && <p className="text-xs text-[#6b3f15] mt-2">目指すロール：{will.job}</p>}
                        </div>
                        <div className="parchment-card p-3 md:col-span-2">
                          <p className="text-xs font-bold tracking-widest text-[#6b3f15] mb-2">10年後までに楽しみたいこと</p>
                          {willTenYears.length === 0 ? (
                            <p className="text-sm text-[#071f3f]">まだ記録されていません。</p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {willTenYears.map(wish => (
                                <span key={wish} className="rounded-full border border-[#a87533] bg-[#f5e1bd] px-3 py-1 text-xs text-[#071f3f]">
                                  {wish}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <button onClick={() => setMustWorkStep(musts.length > 1 ? 1 : 0)} className="text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> {musts.length > 1 ? 'クエスト選択に戻る' : 'クエスト登録に戻る'}
                      </button>
                      <button onClick={handleSaveMustConnection} disabled={!activeMustId} className={`rpg-button text-sm px-6 py-2 bg-white text-black font-bold ${!activeMustId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        接続を保存して、気づきへ進む
                      </button>
                    </div>
                  </div>
                )}

                {mustWorkStep === 3 && (
                  <div className="border-t border-gray-600 pt-6 space-y-4">
                    <p className="text-sm text-yellow-300 font-bold">▼ 接続してみた気づき</p>
                    <div className="parchment-card p-4 md:p-5">
                      <p className="text-sm font-bold mb-2 tracking-widest text-[#6b3f15]">接続したクエスト</p>
                      <WritableField value={newMust.title}>
                        <input
                          type="text"
                          className="rpg-input parchment-input text-2xl md:text-3xl font-bold leading-tight"
                          value={newMust.title}
                          onChange={e => handleEditActiveMust({ title: e.target.value })}
                          placeholder="クエスト名"
                        />
                      </WritableField>
                      <WritableField value={newMust.desc} textarea className="mt-3">
                        <textarea
                          className="rpg-input parchment-input resize-none w-full text-sm md:text-base leading-relaxed"
                          rows={4}
                          value={newMust.desc}
                          onChange={e => handleEditActiveMust({ desc: e.target.value })}
                          placeholder="クエストの概要・目的"
                        />
                      </WritableField>
                      <div className="mt-4 pt-3 border-t border-[#a87533] border-opacity-60">
                        <p className="text-sm font-bold mb-2 tracking-widest text-[#6b3f15]">Willとの接続メモ</p>
                        <WritableField value={newMust.connection} textarea>
                          <textarea
                            className="rpg-input parchment-input resize-none w-full text-sm md:text-base leading-relaxed"
                            rows={6}
                            value={newMust.connection}
                            onChange={e => handleEditMustConnection(e.target.value)}
                            placeholder="ここでもWillとの接続メモを見直せます。"
                          />
                        </WritableField>
                      </div>
                    </div>
                    <WriteCue active={!mustInsightStarted && !mustInsight} />
                    <WritableField value={mustInsight} textarea>
                      <textarea
                        className="rpg-input parchment-input resize-none w-full text-sm leading-relaxed"
                        rows={5}
                        value={mustInsight}
                        onChange={e => {
                          setMustInsightStarted(true);
                          setMustInsight(e.target.value);
                        }}
                        placeholder={"例：このクエストは、私の〇〇という力を磨く機会になる。\n例：ギルドから求められている〇〇を、自分のWillである〇〇につなげられる。"}
                      />
                    </WritableField>
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <button onClick={() => setMustWorkStep(2)} className="text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2 transition-colors">
                        <i className="fa-solid fa-arrow-right rotate-180"></i> 接続に戻る
                      </button>
                      <button onClick={() => nextScene('summary')} className="rpg-button text-sm px-6 py-2 bg-white text-black font-bold">
                        あなたの物語をまとめる
                      </button>
                    </div>
                  </div>
                )}
              </WindowBox>

              <div className="flex flex-col md:flex-row justify-between items-center mt-12 mb-8 gap-4 w-full">
                <button onClick={() => nextScene('will')} className="text-gray-400 hover:text-white px-4 py-2 order-2 md:order-1 flex items-center gap-2 transition-colors">
                  <i className="fa-solid fa-arrow-right rotate-180"></i> 酒場に戻る
                </button>
                {mustWorkStep === 3 ? (
                  <button
                    onClick={() => nextScene('summary')}
                    className="bg-white text-black font-bold border-4 border-white rounded px-12 py-4 hover:bg-gray-200 transition-colors text-xl animate-pulse order-1 md:order-2"
                  >
                    夜が明け、あなたの物語をまとめる！
                  </button>
                ) : (
                  <div className="w-64 hidden md:block order-1 md:order-2"></div>
                )}
                <div className="w-32 hidden md:block order-3"></div>
              </div>
            </>
          )}
        </div>
      );

      const getSelectedMust = () => (
        musts.find(m => m.id === activeMustId)
        || musts.find(m => m.connection)
        || musts[0]
        || null
      );

      const safeFilePart = (value) => String(value || 'adventurer').replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 40);

      const handleDownloadSummaryImage = (kind) => {
        const selectedMust = getSelectedMust();
        const imageData = {
          player,
          memories,
          chartInsight,
          cans,
          canInsight,
          allyInsight,
          will,
          willTenYears,
          willOneYearInsight,
          willThreeYearsInsight,
          selectedMust,
          mustInsight
        };
        const builders = {
          memory: createMemoryExportImage,
          status: createStatusExportImage,
          willMust: createWillMustExportImage,
          storyLong: createStorySummaryLongExportImage
        };
        const labels = {
          memory: 'memory',
          status: 'status',
          willMust: 'will-must',
          storyLong: 'story-summary-long'
        };
        const builder = builders[kind];
        if (!builder) return;
        const canvas = builder(imageData);
        downloadCanvasPng(canvas, `career-inn-${safeFilePart(player.name)}-${labels[kind]}.png`);
      };

      const handleDownloadAllSummaryImages = () => {
        ['memory', 'status', 'willMust'].forEach((kind, index) => {
          window.setTimeout(() => handleDownloadSummaryImage(kind), index * 250);
        });
      };

      const SummarySection = ({ title, iconName, children, sectionKey, defaultOpen = false }) => {
        const isOpen = summaryOpenSections[sectionKey] ?? defaultOpen;
        const toggleSection = () => {
          setSummaryOpenSections(current => ({
            ...current,
            [sectionKey]: !(current[sectionKey] ?? defaultOpen)
          }));
        };

        return (
          <section className="border-2 border-gray-600 rounded p-4 bg-gray-900 bg-opacity-70 print-friendly print-avoid-break">
            <button
              type="button"
              onClick={toggleSection}
              className="summary-accordion-toggle w-full text-left text-xl text-yellow-300 font-bold flex items-center justify-between gap-3"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-2">
                <i className={iconName}></i>{title}
              </span>
              <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-base`}></i>
            </button>
            <div className={`summary-accordion-body ${isOpen ? 'is-open mt-3' : 'is-closed'}`}>
              {children}
              <div className="summary-accordion-close print-hidden mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={toggleSection}
                  className="rpg-button px-8 py-2 text-sm"
                >
                  閉じる
                </button>
              </div>
            </div>
          </section>
        );
      };

      const MemoBox = ({ title, text }) => (
        <div className="mt-4 bg-black bg-opacity-40 border border-gray-700 rounded p-3 print-friendly print-avoid-break">
          <p className="text-yellow-300 font-bold mb-2">{title}</p>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{text || 'まだメモはありません。'}</p>
        </div>
      );

      const renderSummary = () => {
        const sortedMemories = [...memories].sort((a, b) => a.age - b.age);
        const selectedMust = getSelectedMust();

        return (
          <div className="space-y-6 max-w-5xl mx-auto animate-fade-in w-full">
            <div className="print-hidden">
              <NarrationBox iconName="fa-solid fa-book-open" text={"良いあなたの物語ができた。\nもう一度、ここまでの旅を振り返ってみよう。\n（これは下部でPDF保存ができるらしい…）"} />
            </div>

            <WindowBox title="あなたの物語まとめ" iconName="fa-solid fa-book" className="print-friendly">
              <div className="space-y-5">
                <div className="space-y-5 print-avoid-break">
                  <div className="bg-gray-900 bg-opacity-80 border-2 border-yellow-500 rounded p-4 text-center print-friendly print-avoid-break">
                    <p className="text-sm text-gray-400">冒険者</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">{player.name || '名もなき勇者'} <span className="text-yellow-300">Lv.{player.age || '?'}</span></h2>
                    {will.job && <p className="text-blue-300 text-xl mt-2">3年後のロール：{will.job}</p>}
                  </div>

                  <div className="bg-gray-900 bg-opacity-80 border-2 border-blue-400 rounded p-4 print-friendly print-avoid-break">
                    <p className="text-sm text-blue-300 font-bold mb-2 flex items-center justify-center gap-2">
                      <i className="fa-solid fa-star"></i> 10年後までに楽しみたいこと
                    </p>
                    {willTenYears.length === 0 ? (
                      <p className="text-center text-gray-300">未記録</p>
                    ) : (
                      <div className="flex flex-wrap justify-center gap-2">
                        {willTenYears.map(wish => (
                          <span key={wish} className="rounded-full border border-blue-300 bg-black bg-opacity-40 px-3 py-1 text-sm text-gray-100 print-friendly">
                            {wish}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="print-hidden bg-black bg-opacity-70 border border-gray-600 rounded p-4">
                    <p className="text-sm text-yellow-300 font-bold mb-3">▼ まとめから書き直す</p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                      <button type="button" onClick={() => goToCanInput(0)} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-khanda"></i> 武器・魔法
                      </button>
                      <button type="button" onClick={() => goToCanInput(1)} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-users"></i> 仲間
                      </button>
                      <button type="button" onClick={() => goToWillInput(0)} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-location-dot"></i> 1年後
                      </button>
                      <button type="button" onClick={() => goToWillInput(1)} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-bullseye"></i> 3年後
                      </button>
                      <button type="button" onClick={() => goToWillInput(2)} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-star"></i> 10年後
                      </button>
                    </div>
                  </div>

                  <SummarySection title="歩んできた道：Memory" iconName="fa-solid fa-chart-line" sectionKey="memory">
                    <LifelineChart data={memories} />
                    <MemoBox title="ライフラインを見て気づいたこと" text={chartInsight} />
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sortedMemories.length === 0 ? (
                        <EmptyText>記憶はまだ記録されていません。</EmptyText>
                      ) : sortedMemories.map(m => (
                        <div key={m.id} className="bg-black bg-opacity-40 border border-gray-700 rounded p-3 print-friendly print-avoid-break">
                          <div className="flex justify-between gap-3">
                            <span className="text-yellow-300 font-bold">{m.age}歳</span>
                            <span className={m.satisfaction > 0 ? 'text-blue-400' : m.satisfaction < 0 ? 'text-red-400' : 'text-gray-400'}>
                              {m.satisfaction > 0 ? '+' : ''}{m.satisfaction}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{m.event}</p>
                        </div>
                      ))}
                    </div>
                  </SummarySection>
                </div>

                <div className="space-y-5 print-page-break">
                  <SummarySection title="ステータス：Can" iconName="fa-solid fa-shield-halved" sectionKey="can">
                    <div className="print-hidden mb-4 flex flex-col md:flex-row gap-2">
                      <button type="button" onClick={() => goToCanInput(0)} className="rpg-button flex-1 py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> 武器・魔法を書き直す
                      </button>
                      <button type="button" onClick={() => goToCanInput(1)} className="rpg-button flex-1 py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> 仲間を書き直す
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['skill', 'magic', 'ally'].map(type => {
                        const group = cans.filter(c => c.type === type);
                        const meta = canTypeMeta[type];
                        return (
                          <div key={type} className="bg-black bg-opacity-40 border border-gray-700 rounded p-3 print-friendly print-avoid-break">
                            <h4 className={`font-bold mb-2 ${meta.color}`}><i className={`${meta.icon} mr-1`}></i>{meta.label}</h4>
                            <CanList cans={group} emptyText="未記録" compact />
                          </div>
                        );
                      })}
                    </div>
                    <MemoBox title="武器・魔法から見えた気づき" text={canInsight} />
                    <MemoBox title="仲間・関係性から見えた気づき" text={allyInsight} />
                  </SummarySection>

                  <SummarySection title="次なる冒険：Will" iconName="fa-solid fa-map" sectionKey="will">
                    <div className="print-hidden mb-4 flex flex-col md:flex-row gap-2">
                      <button type="button" onClick={() => goToWillInput(0)} className="rpg-button flex-1 py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> 1年後を書き直す
                      </button>
                      <button type="button" onClick={() => goToWillInput(1)} className="rpg-button flex-1 py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> 3年後を書き直す
                      </button>
                      <button type="button" onClick={() => goToWillInput(2)} className="rpg-button flex-1 py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> 10年後を書き直す
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-black bg-opacity-40 border border-gray-700 rounded p-3 print-friendly">
                        <p className="text-sm text-gray-400 mb-1">1年後</p>
                        <p className="text-gray-200 whitespace-pre-wrap">{will.oneYear || '未記録'}</p>
                      </div>
                      <div className="bg-black bg-opacity-40 border border-gray-700 rounded p-3 print-friendly">
                        <p className="text-sm text-gray-400 mb-1">3年後</p>
                        <p className="text-gray-200 whitespace-pre-wrap">{will.threeYears || '未記録'}</p>
                      </div>
                    </div>
                    <MemoBox title="1年後の気づき" text={willOneYearInsight} />
                    <MemoBox title="3年後の気づき" text={willThreeYearsInsight} />
                  </SummarySection>

                  <SummarySection title="現実のクエスト：Must" iconName="fa-solid fa-scroll" sectionKey="must">
                    <div className="print-hidden mb-4">
                      <button type="button" onClick={goToMustEdit} className="rpg-button w-full py-2 text-sm flex items-center justify-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> クエストを書き直す
                      </button>
                    </div>
                    <div className="space-y-3">
                      {!selectedMust ? (
                        <EmptyText>クエストはまだ記録されていません。</EmptyText>
                      ) : (
                        <div className="parchment-card p-4 print-friendly print-avoid-break">
                          <p className="text-xs font-bold mb-2 tracking-widest text-[#6b3f15]">選択して接続したクエスト</p>
                          <h4 className="text-2xl font-bold text-[#071f3f]">{selectedMust.title}</h4>
                          <p className="text-sm text-[#071f3f] mt-2 whitespace-pre-wrap">{selectedMust.desc || '概要なし'}</p>
                          <div className="border-t border-[#a87533] border-opacity-60 mt-4 pt-3">
                            <p className="text-xs text-[#6b3f15] font-bold mb-1">Willとの接続メモ</p>
                            <p className="text-sm text-[#071f3f] whitespace-pre-wrap">{selectedMust.connection || '未記録'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <MemoBox title="接続してみた気づき" text={mustInsight} />
                  </SummarySection>
                </div>

                <div className="print-page-break">
                  <div className="print-hidden mb-6">
                    <DialogGroup dialogs={[
                      { speaker: APP_CONFIG.char2NameShort, type: APP_CONFIG.char2Type, imageSide: "left", text: "「おはようございます！\nあなたの物語、とても良いものができましたね。」" },
                      { speaker: APP_CONFIG.char1NameShort, type: APP_CONFIG.char1Type, text: "「うむ。よい書ができたのう。\nお主のこれからの良き旅を、心から祈っておるぞ。」" }
                    ]} />
                  </div>
                  <SummarySection title="ここから先の旅" iconName="fa-solid fa-route" sectionKey="route" defaultOpen>
                    <div className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
{`ここまでのあなたの物語が綴られました。

このまま、ひとりで読み返してもよいでしょう。
あるいは、誰かに話すことで、まだ言葉になっていない想いや、
次の一歩が見えてくるかもしれません。

このあなたの物語をもとに、キャリアコンサルティングを受けることもできます。`}
                    </div>
                    <div className="route-choice-wrap mt-5 flex flex-col md:flex-row gap-3">
                      <div className="relative flex-1 route-choice-item">
                        <div
                          id="think-alone-tooltip"
                          className="route-choice-bubble is-haruka print-hidden"
                        >
                          <div className="bubble-name">{APP_CONFIG.char2NameShort}</div>
                          <span className="text-white">{APP_CONFIG.soloTooltipText}</span>
                        </div>
                        <button
                          onClick={() => window.print()}
                          aria-describedby="think-alone-tooltip"
                          className="rpg-button w-full py-3 text-base"
                        >
                          今は、ひとりで考えてみる（PDF保存）
                        </button>
                      </div>
                      <div className="relative flex-1 route-choice-item">
                        <div
                          id="talk-counselor-tooltip"
                          className="route-choice-bubble is-reflem print-hidden"
                        >
                          <div className="bubble-name">{APP_CONFIG.char1NameShort}</div>
                          <span className="text-white">{APP_CONFIG.bookingTooltipText}</span>
                        </div>
                        <a
                          href={APP_CONFIG.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-describedby="talk-counselor-tooltip"
                          className="rpg-button block w-full py-3 text-base"
                        >
                          {APP_CONFIG.bookingButtonText}
                        </a>
                      </div>
                    </div>
                  </SummarySection>
                </div>
              </div>
            </WindowBox>

            <div className="print-hidden bg-black bg-opacity-70 border border-blue-500 rounded p-4 mt-8">
              <p className="text-sm text-blue-200 font-bold mb-2">▼ セーブする</p>
              <p className="text-xs text-gray-300 mb-3">
                現在の記録を圧縮し、別のブラウザで開けるセーブ用URLとしてコピーします。スマホからPCへ、PCからスマホへ移動したい時にも使えます。
              </p>
              <button type="button" onClick={handleExportStoryData} className="rpg-button w-full py-3 text-sm bg-white text-black font-bold">
                <i className="fa-solid fa-floppy-disk mr-2"></i>セーブ用URLをコピーする
              </button>
              {saveMessage && (
                <p className="mt-3 rounded border border-blue-400 bg-blue-950 bg-opacity-60 px-3 py-2 text-xs text-blue-100">
                  {saveMessage}
                </p>
              )}
            </div>

            <div className="print-hidden bg-black bg-opacity-70 border border-yellow-600 rounded p-4 mt-8">
              <p className="text-sm text-yellow-300 font-bold mb-2">▼ 画像として保存</p>
              <p className="text-xs text-gray-400 mb-3">細長い1枚画像、またはA4縦サイズの分割PNGとして保存できます。</p>
              <button type="button" onClick={() => handleDownloadSummaryImage('storyLong')} className="rpg-button mb-3 w-full py-3 text-sm flex items-center justify-center gap-2 bg-white text-black font-bold">
                <i className="fa-solid fa-camera"></i> あなたの物語まとめ〜Mustまでを1枚画像で保存する
              </button>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <button type="button" onClick={() => handleDownloadSummaryImage('memory')} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                  <i className="fa-solid fa-image"></i> 歩んできた道
                </button>
                <button type="button" onClick={() => handleDownloadSummaryImage('status')} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                  <i className="fa-solid fa-image"></i> ステータス
                </button>
                <button type="button" onClick={() => handleDownloadSummaryImage('willMust')} className="rpg-button py-2 text-sm flex items-center justify-center gap-2">
                  <i className="fa-solid fa-image"></i> Willとクエスト
                </button>
                <button type="button" onClick={handleDownloadAllSummaryImages} className="rpg-button py-2 text-sm flex items-center justify-center gap-2 bg-white text-black font-bold">
                  <i className="fa-solid fa-images"></i> 全部画像で保存する
                </button>
              </div>
            </div>

            <div className="print-hidden flex flex-col md:flex-row justify-between items-center mt-8 gap-4 w-full">
              <button
                onClick={goToMustEdit}
                className="text-gray-400 hover:text-white px-4 py-2 order-3 md:order-1 flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-arrow-right rotate-180"></i> クエスト編集に戻る
              </button>
              <button onClick={() => window.print()} className="rpg-button text-base px-8 py-3 flex items-center justify-center gap-2 order-1 md:order-2">
                <i className="fa-solid fa-print"></i> 印刷・PDF保存
              </button>
              <button onClick={handleReset} className="text-gray-400 hover:text-red-400 px-4 py-2 order-2 md:order-3 flex items-center gap-2 transition-colors">
                <i className="fa-solid fa-rotate-left"></i> 新しい冒険を始める
              </button>
            </div>
          </div>
        );
      };

      const renderHeader = () => (
        <div className="mb-8 text-center animate-fade-in relative z-20 print-hidden">
          <div className="mb-3 flex justify-center">
            <button
              type="button"
              onClick={() => setCurrentTheme(activeThemeKey === 'rpg' ? 'cafe' : 'rpg')}
              className="inline-flex items-center justify-center gap-2 rounded border border-transparent bg-transparent px-4 py-2 text-xs text-transparent md:text-sm"
              aria-label="テーマを切り替える"
              title="テーマを切り替える"
            >
              テーマを切り替える
            </button>
          </div>
          <h1 className="app-title-text theme-shadow-text text-4xl md:text-6xl font-bold text-white mb-2" style={{ textShadow: '3px 3px 0 #000' }}>{APP_CONFIG.appName}</h1>
          <p className="app-subtitle-text theme-shadow-text text-gray-300 text-[10px] md:text-xs font-bold mb-1 opacity-80" style={{ textShadow: '1px 1px 0 #000' }}>
            {APP_CONFIG.appSubtitle}
          </p>
          <p className="app-tagline-text theme-shadow-text text-yellow-300 text-sm md:text-lg font-bold tracking-widest" style={{ textShadow: '2px 2px 0 #000' }}>
            {APP_CONFIG.appTagline}
          </p>
        </div>
      );

      const renderGlobalBackButton = () => {
        if (!canGoBackOneStep()) return null;
        return (
          <div className="print-hidden mb-5 flex justify-start">
            <button
              type="button"
              onClick={goBackOneStep}
              className="rounded border border-yellow-500 bg-black bg-opacity-70 px-4 py-2 text-sm font-bold text-yellow-300 transition-colors hover:bg-yellow-400 hover:text-black"
            >
              <i className="fa-solid fa-arrow-right rotate-180 mr-2"></i>一つ前にもどる
            </button>
          </div>
        );
      };

      const renderProgressBar = () => {
        const SCENES = ['intro', 'memory', 'chart', 'can', 'will', 'must', 'summary'];
        const SCENE_NAMES = ['宿屋', '記憶', 'あなたの物語', 'ステータス', '未来', 'クエスト', 'まとめ'];
        const progressScene = scene === 'can' && canStep === 0 && memories.length === 0 && memoryStep === 0 ? 'memory' : scene;
        const currentIndex = SCENES.indexOf(progressScene);

        return (
          <div className="w-full mb-8 relative z-20 bg-black bg-opacity-60 p-3 rounded-lg border border-gray-700 shadow-md print-hidden">
            <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mb-2 px-1">
              {SCENE_NAMES.map((name, i) => (
                <button
                  key={name}
                  onClick={() => goToProgressScene(SCENES[i])}
                  className={`flex-1 cursor-pointer text-center transition-colors hover:text-white focus:outline-none focus:text-white ${i <= currentIndex ? 'text-yellow-400 font-bold' : ''}`}
                  title={`${name}へ移動`}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 border border-gray-600 flex overflow-hidden">
               {SCENES.map((s, i) => (
                 <div key={s} className={`h-2 flex-1 ${i <= currentIndex ? 'bg-yellow-400' : 'bg-transparent'} ${i > 0 ? 'border-l border-gray-700' : ''}`}></div>
               ))}
            </div>
          </div>
        );
      };

      const backgroundImages = {
        tavern: `url('${APP_CONFIG.backgroundImages.tavern}')`,
        room: `url('${APP_CONFIG.backgroundImages.room}')`,
        journey: `url('${APP_CONFIG.backgroundImages.journey}')`
      };
      const isOpeningScene = scene === 'intro' && introStep <= 1 && !isInputPhase;
      const backgroundImage = scene === 'must'
        ? backgroundImages.room
        : isOpeningScene || scene === 'summary'
          ? backgroundImages.journey
          : backgroundImages.tavern;
      const themedBackgroundImage = backgroundImage;
      const backgroundPosition = scene === 'must'
        ? 'center'
        : isOpeningScene || scene === 'summary'
          ? 'center bottom'
          : 'center';
      const isSummaryScene = scene === 'summary';
      const backgroundOverlayOpacity = activeThemeKey === 'cafe'
        ? (isSummaryScene ? 0.14 : 0.28)
        : isSummaryScene
          ? 0.18
          : isOpeningScene
            ? 0.42
            : 0.5;
      const backgroundAtmosphereStyle = isOpeningScene
        ? {
            background: 'radial-gradient(circle at 82% 32%, rgba(255, 190, 92, 0.34), transparent 34%), linear-gradient(120deg, rgba(255, 122, 48, 0.18), rgba(255, 210, 120, 0.10) 48%, rgba(40, 80, 140, 0.08))',
            mixBlendMode: 'soft-light',
            opacity: 0.85
          }
        : isSummaryScene
          ? {
              background: 'radial-gradient(circle at 78% 20%, rgba(255, 246, 205, 0.42), transparent 32%), linear-gradient(180deg, rgba(255, 244, 210, 0.22), rgba(185, 220, 255, 0.12))',
              mixBlendMode: 'screen',
              opacity: 0.42
            }
          : null;

      const locationName = scene === 'must'
        ? '宿屋の自室'
        : scene === 'summary'
          ? 'あなたの物語まとめ'
          : '宿屋1階の酒場';

      const renderAppNote = (className = 'mt-10') => (
        <div className={`${className} w-full rounded border border-gray-600 bg-black bg-opacity-55 px-4 py-3 text-center font-sans text-[11px] leading-relaxed text-gray-300 print-friendly`}>
          <p>
            本アプリは、交流分析・RIASEC・役割理論などの知見をもとに、現代の働き方や人間関係に合わせて設計された RIESM™ / RoleTRADE™ の考え方に基づいて作られています。
          </p>
          <p className="mt-1">© ninin consulting & counseling LLC. All rights reserved.</p>
        </div>
      );

      return (
        <div
          className={`theme-${activeThemeKey} min-h-screen p-4 md:p-8 rpg-font overflow-x-hidden relative transition-all duration-1000 print-shell`}
          style={{ backgroundImage: themedBackgroundImage, backgroundColor: APP_CONFIG.colors.pageBg, backgroundSize: 'cover', backgroundPosition: backgroundPosition, backgroundAttachment: 'fixed', color: APP_CONFIG.colors.baseText }}
        >
          <div className="absolute inset-0 z-0 transition-opacity duration-1000 print-hidden" style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOverlayOpacity})` }}></div>
          {backgroundAtmosphereStyle && (
            <div className="absolute inset-0 z-0 transition-opacity duration-1000 print-hidden" style={backgroundAtmosphereStyle}></div>
          )}
          {(isOpeningScene || scene === 'summary') && (
            <div className="magic-particles print-hidden" aria-hidden="true">
              {Array.from({ length: 28 }, (_, index) => (
                <span key={index} className="magic-particle"></span>
              ))}
              {Array.from({ length: 6 }, (_, index) => (
                <span key={`rainbow-${index}`} className="magic-particle rainbow"></span>
              ))}
            </div>
          )}

          <div className="pb-8 relative z-10 text-gray-100 max-w-5xl mx-auto flex flex-col min-h-[90vh] print-container">
            <div className="flex-1">
              {renderHeader()}
              {renderProgressBar()}
              {renderGlobalBackButton()}

              {scene !== 'intro' && (
                <div className="print-hidden flex flex-col md:flex-row justify-between items-center mb-6 bg-black bg-opacity-75 p-3 md:p-4 rounded-lg border-2 border-yellow-500 animate-fade-in shadow-md gap-4">
                  <div className="text-lg md:text-xl font-bold">
                    {player.name || '名もなき勇者'} <span className="text-yellow-400 ml-2">Lv.{player.age || '?'}</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                    <div className="text-sm text-yellow-300 font-bold hidden md:block" style={{ textShadow: '1px 1px 0 #000' }}>
                      現在地：{locationName}
                    </div>
                    <button onClick={handleExportStoryData} className="text-xs md:text-sm border border-blue-400 text-blue-200 hover:bg-blue-300 hover:text-black hover:border-blue-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1 font-bold">
                      <i className="fa-solid fa-floppy-disk"></i> セーブする
                    </button>
                    <button onClick={handleSuspend} className="text-xs md:text-sm border border-yellow-500 text-yellow-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-200 px-3 py-1.5 rounded transition-colors flex items-center gap-1 font-bold">
                      <i className="fa-solid fa-pause"></i> 中断する
                    </button>
                    <button onClick={handleReset} className="text-xs md:text-sm border border-yellow-500 text-yellow-300 hover:bg-red-900 hover:text-red-100 hover:border-red-400 px-3 py-1.5 rounded transition-colors flex items-center gap-1 font-bold">
                      <i className="fa-solid fa-rotate-left"></i> 最初から書き直す
                    </button>
                  </div>
                </div>
              )}

              {scene === 'intro' && renderIntro()}
              {scene === 'can' && renderCan()}
              {scene === 'memory' && renderMemory()}
              {scene === 'chart' && renderChart()}
              {scene === 'will' && renderWill()}
              {scene === 'must' && renderMust()}
              {scene === 'summary' && renderSummary()}
              <OtherTableModal
                state={otherTableState}
                onClose={closeOtherTableTalk}
                onSelectGuest={handleSelectOtherGuest}
                onMore={handleMoreOtherGuest}
              />
              {innMeaningOpen && (
                <InnMeaningModal onClose={() => setInnMeaningOpen(false)} playerName={player.name} />
              )}
              {introPreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 p-4 print-hidden" onClick={() => setIntroPreviewOpen(false)}>
                  <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border-4 border-white bg-black p-3 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setIntroPreviewOpen(false)}
                      className="absolute right-3 top-3 z-10 rounded border-2 border-white bg-black bg-opacity-80 px-3 py-1 text-lg font-bold text-white hover:bg-white hover:text-black"
                      aria-label="拡大画像を閉じる"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <img
                      src={APP_CONFIG.introResultPreviewImg}
                      alt="このアプリで作成されるあなたの物語まとめの例"
                      className="h-auto w-full rounded border border-gray-700"
                      draggable="false"
                    />
                  </div>
                </div>
              )}
            </div>

            {scene === 'summary' && renderAppNote()}

            <footer className="app-footer text-center text-gray-300 text-xs mt-12 border-t border-gray-700 pt-4 font-sans tracking-wide">
              © 2026 <a href={APP_CONFIG.companyUrl} target="_blank" rel="noopener noreferrer">ninin consulting＆counseling</a>
            </footer>
            <div className="print-hidden text-center text-gray-600 text-xs mt-2 font-sans tracking-widest">
              PageNO: {getPageNo()}
            </div>
          </div>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  
