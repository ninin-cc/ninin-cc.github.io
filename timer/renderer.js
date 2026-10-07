(() => {
  'use strict';

  const bridge = window.overlayBridge ?? null;
  const isElectron = Boolean(bridge);
  const body = document.body;
  const root = document.documentElement;
  const digitalText = document.getElementById('digital-text');
  const timerStage = document.getElementById('timer-stage');
  const topPane = document.getElementById('top-pane');
  const resizer = document.getElementById('resizer');
  const leftClockWrap = document.getElementById('left-clock-wrap');
  const clockResizer = document.getElementById('clock-resizer');
  const bgClock = document.getElementById('bg-clock');
  const selHour = document.getElementById('sel-hour');
  const selMin = document.getElementById('sel-min');
  const selSec = document.getElementById('sel-sec');
  const playButton = document.getElementById('btn-toggle-play');
  const stopwatchButton = document.getElementById('btn-stopwatch');
  const undoAddButton = document.getElementById('btn-undo-add');
  const extensionConfirm = document.getElementById('extension-confirm');
  const extensionQuestion = document.getElementById('extension-question');
  const extensionYesButton = document.getElementById('btn-extension-yes');
  const extensionNoButton = document.getElementById('btn-extension-no');
  const tutorialButton = document.getElementById('btn-tutorial');
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const tutorialProgress = document.getElementById('tutorial-progress');
  const tutorialTitle = document.getElementById('tutorial-title');
  const tutorialDescription = document.getElementById('tutorial-description');
  const tutorialInstruction = document.getElementById('tutorial-instruction');
  const tutorialBackButton = document.getElementById('btn-tutorial-back');
  const tutorialNextButton = document.getElementById('btn-tutorial-next');
  const tutorialCloseButton = document.getElementById('btn-tutorial-close');
  const pomodoroButton = document.getElementById('btn-pomodoro');
  const pomodoroOverlay = document.getElementById('pomodoro-overlay');
  const pomodoroCloseButton = document.getElementById('btn-pomodoro-close');
  const pomodoroSetup = document.getElementById('pomodoro-setup');
  const pomodoroSession = document.getElementById('pomodoro-session');
  const pomodoroTaskInput = document.getElementById('pomodoro-task');
  const pomodoroLongBreakSelect = document.getElementById('pomodoro-long-break');
  const pomodoroStartButton = document.getElementById('btn-pomodoro-start');
  const pomodoroSessionActions = document.getElementById('pomodoro-session-actions');
  const pomodoroCycleLabel = document.getElementById('pomodoro-cycle-label');
  const pomodoroPhaseText = document.getElementById('pomodoro-phase');
  const pomodoroTaskDisplay = document.getElementById('pomodoro-task-display');
  const pomodoroCycles = document.getElementById('pomodoro-cycles');
  const pomodoroMessage = document.getElementById('pomodoro-message');
  const pomodoroEndButton = document.getElementById('btn-pomodoro-end');
  const pomodoroPrimaryButton = document.getElementById('btn-pomodoro-primary');
  const overlayStatus = document.getElementById('overlay-status');
  const breakDisplay = document.getElementById('break-display');
  const breakTitle = document.getElementById('break-title');
  const breakResumeText = document.getElementById('break-resume-text');
  const breakClockVisual = document.getElementById('left-break-visual');
  const breakClockFull = document.getElementById('left-break-full');
  const breakClockSector = document.getElementById('left-break-sector');
  const breakClockEnd = document.getElementById('left-break-end');
  const breakClockEndLabel = document.getElementById('left-break-end-label');
  const breakClockBadge = document.getElementById('left-break-badge');
  const breakClockDuration = document.getElementById('left-break-duration');
  const selBreakHour = document.getElementById('sel-break-hour');
  const selBreakMin = document.getElementById('sel-break-min');
  const startBreakButton = document.getElementById('btn-start-break');

  let remainingMs = 0;
  let stopwatchElapsedMs = 0;
  let stopwatchStartedAt = 0;
  let timerMode = 'countdown';
  let lastSetSeconds = 0;
  let endAt = 0;
  let countdownStartedAt = null;
  let ticker = null;
  let isRunning = false;
  let hasEnded = false;
  let audioContext = null;
  let isPinned = true;
  let isClickThrough = false;
  let controlsHidden = false;
  let isResizing = false;
  let isClockResizing = false;
  let isBreakMode = false;
  let breakTarget = null;
  let breakStartedAt = null;
  let breakTicker = null;
  let breakPresetTarget = null;
  let clockPreviewMode = null;
  let pendingAddSeconds = 0;
  let tutorialIndex = 0;
  let tutorialTarget = null;
  let tutorialStepComplete = false;
  let tutorialPhase = null;
  let tutorialSavedState = null;
  let isPomodoroMode = false;
  let pomodoroPhase = 'focus';
  let pomodoroCompleted = 0;
  let pomodoroAwaitingStart = false;
  let pomodoroTask = '';
  let pomodoroLongBreakMinutes = 20;
  let pomodoroStatusMessage = '';
  const addHistory = [];
  const storageKeys = {
    topPaneHeight: 'workshopTimer.topPaneHeight',
    leftClockWidth: 'workshopTimer.leftClockWidth'
  };

  body.classList.add(isElectron ? 'electron-mode' : 'browser-mode');

  const tutorialSteps = [
    {
      title: 'まず、画面の役割を知る',
      description: '左は現在時刻、右はタイマー表示、下は操作エリアです。実際にボタンを押しながら、基本操作を順番に練習します。',
      instruction: '練習中の内容は、終了すると元の状態へ戻ります。'
    },
    {
      title: 'プリセットで1分を選ぶ',
      description: 'よく使う時間はPRESETからワンクリックで設定できます。まずは実際に1分を選んでみましょう。',
      instruction: '「1分」を押してください',
      selector: '.preset-group',
      action: 'preset-60',
      setup: 'empty-countdown'
    },
    {
      title: 'タイマーを開始する',
      description: '設定した1分をカウントダウンします。開始すると、アナログ時計に時間の範囲と終了位置も表示されます。',
      instruction: '「タイマー開始」を押してください',
      selector: '#btn-toggle-play',
      action: 'timer-start',
      setup: 'ready-countdown'
    },
    {
      title: '実行中の表示を見る',
      description: '数字は残り時間です。左時計の色付き範囲が実行時間、オレンジの太線と横の「終了」が終了位置です。',
      instruction: '表示を確認したら「次へ」を押します',
      selector: '#left-clock-wrap',
      setup: 'running-countdown'
    },
    {
      title: 'タイマーを一時停止する',
      description: '実行中は同じボタンが「タイマー停止」に変わります。リセットは確定した時間へ戻し、クリアは0にします。',
      instruction: '「タイマー停止」を押してください',
      selector: '#btn-toggle-play',
      action: 'timer-stop',
      setup: 'running-countdown'
    },
    {
      title: '停止中のADDを試す',
      description: '停止中のADDは、表示中の時間へそのまま加算します。＋3で増やしたあと、左端の↶で元に戻してみましょう。',
      instruction: 'まず「＋3」を押してください',
      selector: '.add-group',
      action: 'add-stopped',
      setup: 'ready-countdown',
      phase: 'add'
    },
    {
      title: '実行中のADDで延長する',
      description: '実行中にADDを押すと確認画面が開きます。開始、＋3、YESの順に操作して、残り時間と終了位置が延びる様子を見てみましょう。',
      instruction: 'まず「タイマー開始」を押してください',
      selector: '#btn-toggle-play',
      action: 'add-running',
      setup: 'ready-countdown',
      phase: 'start'
    },
    {
      title: '時間を細かく設定する',
      description: 'TIMER欄では時・分・秒を選べます。選択内容は大きな数字と左時計の「終了」位置へすぐ反映され、「セット」で基準時間として確定します。',
      instruction: '場所を確認したら「次へ」を押します',
      selector: '.duration-group',
      setup: 'empty-countdown'
    },
    {
      title: '休憩終了時刻を表示する',
      description: 'BREAKは時刻選択のほか、10分・60分で現在からの時間を設定し、＋1・−1で微調整できます。左時計の「再開」位置へすぐ反映されます。',
      instruction: '場所を確認したら「次へ」を押します',
      selector: '.break-group'
    },
    {
      title: 'ストップウォッチを使う',
      description: 'ストップウォッチは0から1/100秒単位で計測します。計測中は見間違いを防ぐため、アナログ時計の秒針が一時的に消えます。',
      instruction: '場所を確認したら「次へ」を押します',
      selector: '#btn-stopwatch'
    },
    {
      title: '表示を見やすく整える',
      description: isElectron
        ? '左時計、背景時計、デジタル時計、数字文字盤、テーマ、背景濃さを変更できます。パネル非表示やクリック透過で、PowerPointの上へ自然に重ねられます。'
        : '左時計、背景時計、デジタル時計、数字文字盤、テーマ、背景濃さを変更できます。全画面ボタンで発表画面いっぱいに表示できます。',
      instruction: '設定を確認したら「次へ」を押します',
      selector: '.compact-utility-row'
    },
    {
      title: '表示サイズを調整して完了',
      description: '横バーで表示部の高さ、時計の間にある縦バーでアナログ時計の幅を調整できます。「完了」で練習前の状態へ戻ります。',
      instruction: 'これで基本操作は完了です',
      selector: '#resizer'
    }
  ];

  function readStoredNumber(key) {
    try {
      const value = Number.parseFloat(window.localStorage.getItem(key));
      return Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  }

  function storeNumber(key, value) {
    try {
      window.localStorage.setItem(key, String(Math.round(value)));
    } catch {
      // localStorageが利用できない環境でもリサイズ自体は継続する。
    }
  }

  function applyTopPaneHeight(height, persist = false) {
    const safeHeight = Math.max(120, Math.round(height));
    topPane.style.height = `${safeHeight}px`;
    topPane.style.flexBasis = `${safeHeight}px`;
    if (persist) storeNumber(storageKeys.topPaneHeight, safeHeight);
    if (bridge?.setMinimumHeight && !controlsHidden) {
      const dividerHeight = Math.max(11, resizer.getBoundingClientRect().height);
      void bridge.setMinimumHeight(38 + safeHeight + dividerHeight + 1);
    }
  }

  function keepDividerVisible() {
    if (controlsHidden) return;
    if (isElectron) return;
    const titlebarHeight = isElectron ? 38 : 0;
    const dividerHeight = Math.max(11, resizer.getBoundingClientRect().height);
    const maximum = Math.max(120, window.innerHeight - titlebarHeight - dividerHeight - 1);
    const current = Number.parseFloat(topPane.style.height) || topPane.getBoundingClientRect().height;
    if (current > maximum) applyTopPaneHeight(maximum, false);
  }

  function applyLeftClockWidth(width, persist = false) {
    const maximum = Math.max(100, Math.min(window.innerWidth * 0.5, topPane.clientWidth - 180));
    const safeWidth = Math.min(maximum, Math.max(100, Math.round(width)));
    leftClockWrap.style.width = `${safeWidth}px`;
    leftClockWrap.style.flexBasis = `${safeWidth}px`;
    if (persist) storeNumber(storageKeys.leftClockWidth, safeWidth);
  }

  window.requestAnimationFrame(() => {
    applyTopPaneHeight(readStoredNumber(storageKeys.topPaneHeight) ?? topPane.getBoundingClientRect().height);
    applyLeftClockWidth(readStoredNumber(storageKeys.leftClockWidth) ?? leftClockWrap.getBoundingClientRect().width);
    keepDividerVisible();
  });

  window.addEventListener('resize', keepDividerVisible);

  function addOptions(select, max) {
    for (let value = 0; value <= max; value += 1) {
      const label = String(value).padStart(2, '0');
      select.add(new Option(label, String(value)));
    }
  }

  addOptions(selHour, 23);
  addOptions(selMin, 59);
  addOptions(selSec, 59);
  addOptions(selBreakHour, 23);
  addOptions(selBreakMin, 59);

  function setDefaultBreakTime() {
    const defaultTime = new Date(Date.now() + (10 * 60 * 1000));
    selBreakHour.value = String(defaultTime.getHours());
    selBreakMin.value = String(defaultTime.getMinutes());
  }

  setDefaultBreakTime();

  function secondsForDisplay() {
    if (timerMode === 'stopwatch') return Math.max(0, Math.floor(stopwatchElapsedMs / 1000));
    return Math.max(0, Math.ceil(remainingMs / 1000));
  }

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function formatStopwatchTime(totalMilliseconds) {
    const totalCentiseconds = Math.max(0, Math.floor(totalMilliseconds / 10));
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    const tail = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    return hours > 0 ? `${String(hours).padStart(2, '0')}:${tail}` : tail;
  }

  function hideExtensionConfirmation() {
    extensionConfirm.hidden = true;
    pendingAddSeconds = 0;
  }

  function clearTutorialTarget() {
    if (tutorialTarget) tutorialTarget.classList.remove('tutorial-target');
    tutorialTarget = null;
  }

  function captureTutorialState() {
    const now = Date.now();
    const frozenRemainingMs = isRunning && timerMode === 'countdown'
      ? Math.max(0, endAt - now)
      : remainingMs;
    const frozenStopwatchMs = isRunning && timerMode === 'stopwatch'
      ? Math.max(0, now - stopwatchStartedAt)
      : stopwatchElapsedMs;
    return {
      timerMode,
      remainingMs: frozenRemainingMs,
      stopwatchElapsedMs: frozenStopwatchMs,
      lastSetSeconds,
      isRunning,
      hasEnded,
      countdownElapsedMs: countdownStartedAt ? Math.max(0, now - countdownStartedAt.getTime()) : 0,
      addHistory: [...addHistory],
      manualValues: [selHour.value, selMin.value, selSec.value],
      breakValues: [selBreakHour.value, selBreakMin.value],
      breakPresetRemainingMs: breakPresetTarget ? Math.max(1000, breakPresetTarget.getTime() - now) : 0,
      clockPreviewMode,
      isBreakMode,
      breakRemainingMs: breakTarget ? Math.max(1000, breakTarget.getTime() - now) : 0,
      breakElapsedMs: breakStartedAt ? Math.max(0, now - breakStartedAt.getTime()) : 0
    };
  }

  function prepareTutorialDemo() {
    stopTicker();
    stopBreakTicker();
    hideExtensionConfirmation();
    isRunning = false;
    isBreakMode = false;
    breakTarget = null;
    breakStartedAt = null;
    breakPresetTarget = null;
    clockPreviewMode = null;
    timerMode = 'countdown';
    remainingMs = 0;
    stopwatchElapsedMs = 0;
    lastSetSeconds = 0;
    endAt = 0;
    countdownStartedAt = null;
    hasEnded = false;
    clearAddHistory();
    syncManualSelectors(0);
    startBreakButton.textContent = '休憩開始';
    startBreakButton.classList.remove('break-stop');
    renderTimer();
  }

  function restoreTutorialState() {
    const saved = tutorialSavedState;
    tutorialSavedState = null;
    if (!saved) return;

    stopTicker();
    stopBreakTicker();
    hideExtensionConfirmation();
    timerMode = saved.timerMode;
    remainingMs = saved.remainingMs;
    stopwatchElapsedMs = saved.stopwatchElapsedMs;
    lastSetSeconds = saved.lastSetSeconds;
    hasEnded = saved.hasEnded;
    isRunning = false;
    isBreakMode = false;
    breakTarget = null;
    breakStartedAt = null;
    breakPresetTarget = saved.breakPresetRemainingMs > 0
      ? new Date(Date.now() + saved.breakPresetRemainingMs)
      : null;
    clockPreviewMode = saved.clockPreviewMode;
    addHistory.length = 0;
    addHistory.push(...saved.addHistory);
    [selHour.value, selMin.value, selSec.value] = saved.manualValues;
    [selBreakHour.value, selBreakMin.value] = saved.breakValues;

    if (saved.isBreakMode) {
      const now = Date.now();
      isBreakMode = true;
      breakStartedAt = new Date(now - saved.breakElapsedMs);
      breakTarget = new Date(now + saved.breakRemainingMs);
      breakTicker = window.setInterval(updateBreakDisplay, 1000);
      renderBreakDisplay();
      return;
    }

    if (saved.isRunning) {
      isRunning = true;
      if (saved.timerMode === 'stopwatch') {
        stopwatchStartedAt = Date.now() - saved.stopwatchElapsedMs;
        ticker = window.setInterval(tick, 10);
      } else {
        countdownStartedAt = new Date(Date.now() - saved.countdownElapsedMs);
        endAt = Date.now() + saved.remainingMs;
        ticker = window.setInterval(tick, 100);
      }
    } else {
      countdownStartedAt = saved.countdownElapsedMs > 0
        ? new Date(Date.now() - saved.countdownElapsedMs)
        : null;
    }
    renderTimer();
  }

  function positionTutorialCard(target) {
    tutorialOverlay.classList.remove('is-centered', 'card-top', 'card-bottom');
    if (!target) {
      tutorialOverlay.classList.add('is-centered');
      return;
    }
    const rect = target.getBoundingClientRect();
    tutorialOverlay.classList.add(rect.top + (rect.height / 2) > window.innerHeight / 2 ? 'card-top' : 'card-bottom');
  }

  function setTutorialTarget(selector) {
    clearTutorialTarget();
    const target = selector ? document.querySelector(selector) : null;
    const targetVisible = target && target.getClientRects().length > 0;
    if (targetVisible) {
      tutorialTarget = target;
      tutorialTarget.classList.add('tutorial-target');
      tutorialTarget.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
    window.requestAnimationFrame(() => positionTutorialCard(targetVisible ? target : null));
  }

  function applyTutorialSetup(setup) {
    if (setup === 'empty-countdown') {
      setTime(0);
      return;
    }
    if (setup === 'ready-countdown') {
      setTime(60);
      return;
    }
    if (setup === 'running-countdown' && !(timerMode === 'countdown' && isRunning)) {
      setTime(60);
      startTimer();
    }
  }

  function setTutorialInstruction(message, success = false) {
    tutorialInstruction.textContent = message;
    tutorialInstruction.classList.toggle('is-success', success);
  }

  function completeTutorialStep(message, selector = null) {
    tutorialStepComplete = true;
    tutorialNextButton.disabled = false;
    setTutorialInstruction(message, true);
    if (selector) setTutorialTarget(selector);
    tutorialNextButton.focus();
  }

  function renderTutorialStep() {
    clearTutorialTarget();
    const step = tutorialSteps[tutorialIndex];
    tutorialStepComplete = !step.action;
    tutorialPhase = step.phase ?? null;
    applyTutorialSetup(step.setup);
    tutorialProgress.textContent = `${tutorialIndex + 1} / ${tutorialSteps.length}`;
    tutorialTitle.textContent = step.title;
    tutorialDescription.textContent = step.description;
    setTutorialInstruction(step.instruction ?? '「次へ」で進みます');
    tutorialBackButton.disabled = tutorialIndex === 0;
    tutorialNextButton.disabled = !tutorialStepComplete;
    tutorialNextButton.textContent = tutorialIndex === tutorialSteps.length - 1 ? '完了' : '次へ';
    setTutorialTarget(step.selector);
  }

  function openTutorial() {
    if (!tutorialOverlay.hidden) return;
    tutorialSavedState = captureTutorialState();
    prepareTutorialDemo();
    tutorialIndex = 0;
    tutorialOverlay.hidden = false;
    body.classList.add('tutorial-active');
    renderTutorialStep();
    tutorialNextButton.focus();
  }

  function closeTutorial() {
    clearTutorialTarget();
    tutorialOverlay.hidden = true;
    body.classList.remove('tutorial-active');
    restoreTutorialState();
    tutorialButton.focus();
  }

  function rejectTutorialAction(event, message) {
    event.preventDefault();
    event.stopImmediatePropagation();
    setTutorialInstruction(message);
  }

  function guardTutorialAction(event) {
    if (tutorialOverlay.hidden) return;
    const step = tutorialSteps[tutorialIndex];
    const button = event.target.closest('button');
    if (!button || !step.action) return;

    if (step.action === 'preset-60' && button.matches('.btn-preset') && button.dataset.time !== '60') {
      rejectTutorialAction(event, '練習では「1分」を押してください');
      return;
    }

    if (step.action === 'add-stopped' && button.closest('.add-group')) {
      if (tutorialPhase === 'add' && (!button.matches('.btn-add') || button.dataset.add !== '180')) {
        rejectTutorialAction(event, '練習では「＋3」を押してください');
      } else if (tutorialPhase === 'undo' && button !== undoAddButton) {
        rejectTutorialAction(event, '左端の「↶」を押してください');
      }
      return;
    }

    if (step.action === 'add-running' && tutorialPhase === 'add' && button.closest('.add-group')) {
      if (!button.matches('.btn-add') || button.dataset.add !== '180') {
        rejectTutorialAction(event, '練習では「＋3」を押してください');
      }
      return;
    }

    if (step.action === 'add-running' && tutorialPhase === 'confirm' && button === extensionNoButton) {
      rejectTutorialAction(event, '延長の変化を見るため「YES」を押してください');
    }
  }

  function handleTutorialAction(event) {
    if (tutorialOverlay.hidden) return;
    const step = tutorialSteps[tutorialIndex];
    const button = event.target.closest('button');
    if (!button || tutorialStepComplete) return;

    if (step.action === 'preset-60' && button.matches('.btn-preset[data-time="60"]')) {
      completeTutorialStep('できました。大きな表示とTIMER欄が01:00に変わりました。', '#timer-stage');
      return;
    }

    if (step.action === 'timer-start' && button === playButton && timerMode === 'countdown' && isRunning) {
      completeTutorialStep('開始しました。数字、時計の色付き範囲、オレンジ線横の「終了」を確認してください。', '#left-clock-wrap');
      return;
    }

    if (step.action === 'timer-stop' && button === playButton && timerMode === 'countdown' && !isRunning) {
      completeTutorialStep('停止しました。もう一度押せば続きから再開できます。', '#btn-toggle-play');
      return;
    }

    if (step.action === 'add-stopped') {
      if (tutorialPhase === 'add' && button.matches('.btn-add[data-add="180"]')) {
        tutorialPhase = 'undo';
        setTutorialInstruction('01:00から04:00になりました。次に左端の「↶」を押してください', true);
        setTutorialTarget('.add-group');
      } else if (tutorialPhase === 'undo' && button === undoAddButton) {
        completeTutorialStep('元の01:00へ戻りました。↶は直前の追加だけを取り消します。', '#timer-stage');
      }
      return;
    }

    if (step.action === 'add-running') {
      if (tutorialPhase === 'start' && button === playButton && timerMode === 'countdown' && isRunning) {
        tutorialPhase = 'add';
        setTutorialInstruction('タイマーが動きました。次に「＋3」を押してください', true);
        setTutorialTarget('.add-group');
      } else if (tutorialPhase === 'add' && button.matches('.btn-add[data-add="180"]') && !extensionConfirm.hidden) {
        tutorialPhase = 'confirm';
        setTutorialInstruction('確認画面が出ました。「YES」を押してください');
        setTutorialTarget('#timer-stage');
      } else if (tutorialPhase === 'confirm' && button === extensionYesButton && extensionConfirm.hidden) {
        tutorialPhase = 'done';
        completeTutorialStep('延長できました。残り時間と、時計の「終了」位置が3分ぶん延びています。', '#left-clock-wrap');
      }
    }
  }

  function pomodoroDurationSeconds() {
    if (pomodoroPhase === 'focus') return 25 * 60;
    if (pomodoroPhase === 'short-break') return 5 * 60;
    return pomodoroLongBreakMinutes * 60;
  }

  function pomodoroPhaseLabel() {
    if (pomodoroPhase === 'focus') return `集中 ${Math.min(pomodoroCompleted + 1, 4)} / 4`;
    if (pomodoroPhase === 'short-break') return '5分の短い休憩';
    return `${pomodoroLongBreakMinutes}分の長い休憩`;
  }

  function pomodoroStartLabel() {
    if (pomodoroPhase === 'focus') return '25分集中を始める';
    if (pomodoroPhase === 'short-break') return '5分休憩を始める';
    return `${pomodoroLongBreakMinutes}分休憩を始める`;
  }

  function updatePomodoroUi() {
    pomodoroSetup.hidden = isPomodoroMode;
    pomodoroSession.hidden = !isPomodoroMode;
    pomodoroSessionActions.hidden = !isPomodoroMode;
    pomodoroEndButton.hidden = !isPomodoroMode;

    if (!isPomodoroMode) {
      pomodoroButton.textContent = '🍅 ポモドーロテクニックモード';
      pomodoroCycleLabel.textContent = '集中と休憩のサイクル';
      pomodoroStartButton.textContent = '🍅 25分集中を始める';
      return;
    }

    const isBreak = pomodoroPhase !== 'focus';
    pomodoroButton.textContent = isBreak
      ? '🍅 ポモドーロ・休憩'
      : `🍅 ポモドーロ・集中 ${Math.min(pomodoroCompleted + 1, 4)}/4`;
    pomodoroCycleLabel.textContent = `${pomodoroCompleted} / 4 完了`;
    pomodoroPhaseText.textContent = pomodoroPhaseLabel();
    pomodoroTaskDisplay.hidden = !pomodoroTask;
    pomodoroTaskDisplay.textContent = pomodoroTask;
    pomodoroMessage.textContent = pomodoroStatusMessage;

    pomodoroCycles.replaceChildren();
    for (let index = 0; index < 4; index += 1) {
      const dot = document.createElement('span');
      dot.className = 'pomodoro-cycle-dot';
      dot.classList.toggle('is-complete', index < pomodoroCompleted);
      dot.classList.toggle('is-current', pomodoroPhase === 'focus' && index === pomodoroCompleted);
      dot.setAttribute('aria-label', `${index + 1}回目${index < pomodoroCompleted ? ' 完了' : ''}`);
      pomodoroCycles.appendChild(dot);
    }

    if (pomodoroAwaitingStart) pomodoroPrimaryButton.textContent = pomodoroStartLabel();
    else if (isRunning && timerMode === 'countdown') pomodoroPrimaryButton.textContent = '一時停止';
    else pomodoroPrimaryButton.textContent = '再開';
  }

  function openPomodoro() {
    if (!tutorialOverlay.hidden) closeTutorial();
    updatePomodoroUi();
    pomodoroOverlay.hidden = false;
    body.classList.add('pomodoro-popup-open');
    window.requestAnimationFrame(() => {
      if (isPomodoroMode) pomodoroPrimaryButton.focus();
      else pomodoroTaskInput.focus();
    });
  }

  function closePomodoro() {
    pomodoroOverlay.hidden = true;
    body.classList.remove('pomodoro-popup-open');
  }

  function startPomodoroMode() {
    const task = pomodoroTaskInput.value.trim();
    pomodoroTask = task;
    pomodoroLongBreakMinutes = Number(pomodoroLongBreakSelect.value) || 20;
    pomodoroPhase = 'focus';
    pomodoroCompleted = 0;
    pomodoroAwaitingStart = false;
    pomodoroStatusMessage = task
      ? 'この25分は、選んだタスクだけに集中しましょう。'
      : 'この25分は、いま取り組む作業だけに集中しましょう。';
    isPomodoroMode = true;
    setTime(pomodoroDurationSeconds());
    startTimer();
    closePomodoro();
    updatePomodoroUi();
  }

  function startNextPomodoroPhase() {
    pomodoroAwaitingStart = false;
    pomodoroStatusMessage = pomodoroPhase === 'focus'
      ? 'この25分は、選んだタスクだけに集中しましょう。'
      : '作業から手を離して、しっかり脳を休ませましょう。';
    setTime(pomodoroDurationSeconds());
    startTimer();
    closePomodoro();
    updatePomodoroUi();
  }

  function togglePomodoroPrimary() {
    if (!isPomodoroMode) {
      startPomodoroMode();
      return;
    }
    if (pomodoroAwaitingStart) {
      startNextPomodoroPhase();
      return;
    }
    if (isRunning && timerMode === 'countdown') {
      pauseTimer();
      pomodoroStatusMessage = '一時停止中です。準備ができたら再開してください。';
      updatePomodoroUi();
      return;
    }
    startTimer();
    pomodoroStatusMessage = pomodoroPhase === 'focus'
      ? '集中を再開しました。'
      : '休憩を再開しました。';
    closePomodoro();
    updatePomodoroUi();
  }

  function deactivatePomodoroMode() {
    isPomodoroMode = false;
    pomodoroAwaitingStart = false;
    pomodoroCompleted = 0;
    pomodoroPhase = 'focus';
    pomodoroStatusMessage = '';
    closePomodoro();
    updatePomodoroUi();
  }

  function stopPomodoroMode() {
    deactivatePomodoroMode();
    setTime(0);
  }

  function completePomodoroPhase() {
    if (!isPomodoroMode) return;

    if (pomodoroPhase === 'focus') {
      pomodoroCompleted += 1;
      if (pomodoroCompleted >= 4) {
        pomodoroPhase = 'long-break';
        pomodoroStatusMessage = `4回の集中を達成しました。${pomodoroLongBreakMinutes}分の長い休憩を取りましょう。`;
      } else {
        pomodoroPhase = 'short-break';
        pomodoroStatusMessage = `${pomodoroCompleted}回目の集中が完了しました。キリが悪くても手を止め、5分休みましょう。`;
      }
    } else {
      const completedLongBreak = pomodoroPhase === 'long-break';
      if (completedLongBreak) pomodoroCompleted = 0;
      pomodoroPhase = 'focus';
      pomodoroStatusMessage = completedLongBreak
        ? '1セット完了です。新しい4回のサイクルを始めましょう。'
        : `休憩完了です。${pomodoroCompleted + 1}回目の集中へ進みましょう。`;
    }

    pomodoroAwaitingStart = true;
    setTime(pomodoroDurationSeconds());
    openPomodoro();
    updatePomodoroUi();
  }

  function renderTimer() {
    if (isBreakMode) {
      renderBreakDisplay();
      return;
    }
    const seconds = secondsForDisplay();
    const isCountdown = timerMode === 'countdown';
    const displayTime = isCountdown ? formatTime(seconds) : formatStopwatchTime(stopwatchElapsedMs);
    digitalText.hidden = false;
    breakDisplay.hidden = true;
    digitalText.textContent = displayTime;
    const countdownRunning = isCountdown && isRunning;
    const stopwatchRunning = !isCountdown && isRunning;
    const countdownEndLabel = isPomodoroMode && pomodoroPhase !== 'focus' ? '再開' : '終了';
    if (countdownRunning) {
      renderClockInterval(countdownStartedAt, new Date(endAt), countdownEndLabel);
    } else if (isCountdown && clockPreviewMode === 'break') {
      const previewStartedAt = new Date();
      renderClockInterval(previewStartedAt, makeBreakTarget(), '再開');
    } else if (isCountdown && clockPreviewMode === 'countdown' && remainingMs > 0) {
      const previewStartedAt = new Date();
      renderClockInterval(previewStartedAt, new Date(previewStartedAt.getTime() + remainingMs), countdownEndLabel);
    } else {
      renderClockInterval(null, null);
      hideExtensionConfirmation();
    }
    body.classList.toggle('is-stopwatch-mode', !isCountdown);
    timerStage.classList.toggle('is-stopwatch', !isCountdown);
    timerStage.classList.toggle('is-stopwatch-hours', !isCountdown && stopwatchElapsedMs >= 3600000);
    timerStage.classList.toggle('is-warning', isCountdown && seconds > 60 && seconds <= 120);
    timerStage.classList.toggle('is-urgent', isCountdown && seconds > 0 && seconds <= 60);
    timerStage.classList.toggle('is-ended', isCountdown && hasEnded);
    playButton.textContent = countdownRunning ? 'Ⅱ タイマー停止' : '▶ タイマー開始';
    playButton.classList.toggle('pause', countdownRunning);
    playButton.classList.toggle('primary', isCountdown && !countdownRunning);
    stopwatchButton.textContent = stopwatchRunning ? 'Ⅱ ストップウォッチ停止' : '⏱ ストップウォッチ開始';
    stopwatchButton.classList.toggle('pause', stopwatchRunning);
    stopwatchButton.classList.toggle('stopwatch', !stopwatchRunning);
    undoAddButton.disabled = !isCountdown || addHistory.length === 0;
    document.title = `${displayTime}｜${isCountdown ? 'タイマー' : 'ストップウォッチ'}｜ワークショップタイマー`;
    updateClocks();
    updatePomodoroUi();
  }

  function formatResumeTime(target) {
    const now = new Date();
    const nextDay = target.getFullYear() !== now.getFullYear()
      || target.getMonth() !== now.getMonth()
      || target.getDate() !== now.getDate();
    const time = `${String(target.getHours()).padStart(2, '0')}:${String(target.getMinutes()).padStart(2, '0')}`;
    return `${nextDay ? '翌日 ' : ''}${time} 再開`;
  }

  function clockPoint(degrees, radius) {
    const radians = (degrees - 90) * (Math.PI / 180);
    return {
      x: 50 + (Math.cos(radians) * radius),
      y: 50 + (Math.sin(radians) * radius)
    };
  }

  function formatBreakDuration(durationMs) {
    const totalMinutes = Math.max(1, Math.ceil(durationMs / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}時間＋${minutes}分` : `${hours}時間`;
  }

  function renderClockInterval(startedAt, target, endLabel = '') {
    if (!startedAt || !target) {
      breakClockVisual.classList.remove('is-visible');
      return;
    }

    const durationMs = Math.max(0, target.getTime() - startedAt.getTime());
    const durationMinutes = Math.max(0.01, durationMs / 60000);
    const fullHours = Math.floor(Math.round(durationMinutes) / 60);
    const shownMinutes = fullHours > 0
      ? Math.max(0, durationMinutes - (fullHours * 60))
      : durationMinutes;
    const startDegrees = ((startedAt.getMinutes() + (startedAt.getSeconds() / 60)) * 6) % 360;
    const endDegrees = ((target.getMinutes() + (target.getSeconds() / 60)) * 6) % 360;

    breakClockFull.classList.toggle('is-visible', fullHours > 0);
    breakClockBadge.classList.toggle('is-visible', fullHours > 0);
    breakClockDuration.textContent = fullHours > 0 ? formatBreakDuration(durationMs) : '';

    if (shownMinutes > 0.01) {
      const start = clockPoint(startDegrees, 43);
      const end = clockPoint(startDegrees + (shownMinutes * 6), 43);
      const largeArc = shownMinutes > 30 ? 1 : 0;
      breakClockSector.setAttribute(
        'd',
        `M 50 50 L ${start.x.toFixed(3)} ${start.y.toFixed(3)} A 43 43 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)} Z`
      );
      breakClockSector.classList.add('is-visible');
    } else {
      breakClockSector.classList.remove('is-visible');
    }

    const endInner = clockPoint(endDegrees, 32);
    const endOuter = clockPoint(endDegrees, 47);
    breakClockEnd.setAttribute('x1', endInner.x.toFixed(3));
    breakClockEnd.setAttribute('y1', endInner.y.toFixed(3));
    breakClockEnd.setAttribute('x2', endOuter.x.toFixed(3));
    breakClockEnd.setAttribute('y2', endOuter.y.toFixed(3));
    const labelBase = clockPoint(endDegrees, 37);
    const labelRadians = (endDegrees - 90) * (Math.PI / 180);
    const labelX = labelBase.x - (Math.sin(labelRadians) * 6);
    const labelY = labelBase.y + (Math.cos(labelRadians) * 6);
    breakClockEndLabel.setAttribute('x', labelX.toFixed(3));
    breakClockEndLabel.setAttribute('y', labelY.toFixed(3));
    breakClockEndLabel.textContent = endLabel;
    breakClockVisual.classList.add('is-visible');
  }

  function renderBreakDisplay() {
    if (!isBreakMode || !breakTarget) return;
    body.classList.remove('is-stopwatch-mode');
    hideExtensionConfirmation();
    digitalText.hidden = true;
    breakDisplay.hidden = false;
    timerStage.classList.remove('is-warning', 'is-urgent', 'is-ended');
    breakTitle.textContent = '休憩中';
    breakResumeText.textContent = formatResumeTime(breakTarget).replace(' 再開', '\n再開');
    startBreakButton.textContent = '休憩解除';
    startBreakButton.classList.add('break-stop');
    renderClockInterval(breakStartedAt, breakTarget, '再開');
    document.title = `${formatResumeTime(breakTarget)}｜ワークショップタイマー`;
  }

  function makeBreakTarget() {
    if (
      breakPresetTarget
      && breakPresetTarget.getTime() > Date.now()
      && breakPresetTarget.getHours() === Number(selBreakHour.value)
      && breakPresetTarget.getMinutes() === Number(selBreakMin.value)
    ) {
      return new Date(breakPresetTarget.getTime());
    }
    breakPresetTarget = null;
    const target = new Date();
    target.setHours(Number(selBreakHour.value), Number(selBreakMin.value), 0, 0);
    if (target.getTime() <= Date.now()) target.setDate(target.getDate() + 1);
    return target;
  }

  function syncBreakSelectors(target) {
    selBreakHour.value = String(target.getHours());
    selBreakMin.value = String(target.getMinutes());
  }

  function previewSelectedBreakTime() {
    clockPreviewMode = 'break';
    const previewStartedAt = new Date();
    renderClockInterval(previewStartedAt, makeBreakTarget(), '再開');
  }

  function setBreakMinutesFromNow(minutes) {
    const target = new Date(Date.now() + (Math.max(1, minutes) * 60000));
    breakPresetTarget = new Date(target.getTime());
    syncBreakSelectors(target);
    if (isBreakMode) startBreakDisplay();
    else previewSelectedBreakTime();
  }

  function adjustBreakMinutes(minutes) {
    const target = isBreakMode && breakTarget
      ? new Date(breakTarget.getTime())
      : makeBreakTarget();
    target.setMinutes(target.getMinutes() + minutes);
    if (target.getTime() <= Date.now()) {
      target.setTime(Date.now() + 60000);
    }
    breakPresetTarget = new Date(target.getTime());
    syncBreakSelectors(target);
    clockPreviewMode = 'break';
    if (isBreakMode) {
      breakTarget = target;
      renderBreakDisplay();
    } else {
      previewSelectedBreakTime();
    }
  }

  function stopBreakTicker() {
    if (breakTicker !== null) window.clearInterval(breakTicker);
    breakTicker = null;
  }

  function updateBreakDisplay() {
    if (!isBreakMode || !breakTarget) return;
    if (Date.now() >= breakTarget.getTime()) {
      stopBreakTicker();
      stopBreakDisplay();
      playAlarm();
    }
  }

  function startBreakDisplay() {
    if (!isBreakMode) pauseTimer();
    ensureAudio();
    stopBreakTicker();
    clockPreviewMode = 'break';
    breakTarget = makeBreakTarget();
    breakPresetTarget = new Date(breakTarget.getTime());
    breakStartedAt = new Date();
    isBreakMode = true;
    breakTicker = window.setInterval(updateBreakDisplay, 1000);
    renderBreakDisplay();
  }

  function stopBreakDisplay() {
    stopBreakTicker();
    isBreakMode = false;
    breakTarget = null;
    breakStartedAt = null;
    clockPreviewMode = timerMode === 'countdown' && remainingMs > 0 ? 'countdown' : null;
    renderClockInterval(null, null);
    breakDisplay.hidden = true;
    digitalText.hidden = false;
    startBreakButton.textContent = '休憩開始';
    startBreakButton.classList.remove('break-stop');
    renderTimer();
  }

  function toggleBreakDisplay() {
    if (isBreakMode) stopBreakDisplay();
    else startBreakDisplay();
  }

  function ensureAudio() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioContext = new AudioContextClass();
    }
    if (audioContext?.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  }

  function playTone(ctx, frequency, start, duration) {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.45, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  function playAlarm() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const base = ctx.currentTime + 0.02;
    for (let repeat = 0; repeat < 3; repeat += 1) {
      const offset = base + (repeat * 2);
      playTone(ctx, 659.25, offset, 0.38);
      playTone(ctx, 659.25, offset + 0.4, 0.38);
      playTone(ctx, 1046.5, offset + 0.8, 1.15);
    }
  }

  function stopTicker() {
    if (ticker !== null) window.clearInterval(ticker);
    ticker = null;
  }

  function finishTimer() {
    stopTicker();
    remainingMs = 0;
    isRunning = false;
    hasEnded = true;
    renderTimer();
    playAlarm();
    completePomodoroPhase();
  }

  function tick() {
    if (!isRunning) return;
    if (timerMode === 'stopwatch') {
      stopwatchElapsedMs = Math.max(0, Date.now() - stopwatchStartedAt);
      renderTimer();
      return;
    }
    remainingMs = Math.max(0, endAt - Date.now());
    if (remainingMs <= 0) {
      finishTimer();
      return;
    }
    renderTimer();
  }

  function startTimer() {
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'countdown') {
      pauseTimer();
      timerMode = 'countdown';
    }
    if (isRunning || remainingMs <= 0) {
      renderTimer();
      return;
    }
    if (isPomodoroMode && pomodoroAwaitingStart) {
      pomodoroAwaitingStart = false;
      pomodoroStatusMessage = pomodoroPhase === 'focus'
        ? 'この25分は、選んだタスクだけに集中しましょう。'
        : '作業から手を離して、しっかり脳を休ませましょう。';
    }
    ensureAudio();
    clockPreviewMode = 'countdown';
    hasEnded = false;
    isRunning = true;
    const startingSeconds = secondsForDisplay();
    const now = Date.now();
    const nextClockSecond = (Math.floor(now / 1000) + 1) * 1000;
    countdownStartedAt = new Date(now);
    remainingMs = startingSeconds * 1000;
    endAt = nextClockSecond + (Math.max(0, startingSeconds - 1) * 1000);
    stopTicker();
    ticker = window.setInterval(tick, 100);
    renderTimer();
  }

  function pauseTimer() {
    if (isRunning) {
      if (timerMode === 'stopwatch') stopwatchElapsedMs = Math.max(0, Date.now() - stopwatchStartedAt);
      else remainingMs = Math.max(0, endAt - Date.now());
    }
    isRunning = false;
    stopTicker();
    renderTimer();
  }

  function toggleTimer() {
    if (isRunning && timerMode === 'countdown') pauseTimer();
    else startTimer();
  }

  function startStopwatch() {
    if (isPomodoroMode) stopPomodoroMode();
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'stopwatch') {
      pauseTimer();
      timerMode = 'stopwatch';
      stopwatchElapsedMs = 0;
      hasEnded = false;
      clearAddHistory();
    }
    clockPreviewMode = null;
    if (isRunning) return;
    isRunning = true;
    stopwatchStartedAt = Date.now() - stopwatchElapsedMs;
    stopTicker();
    ticker = window.setInterval(tick, 10);
    renderTimer();
  }

  function toggleStopwatch() {
    if (isRunning && timerMode === 'stopwatch') pauseTimer();
    else startStopwatch();
  }

  function syncManualSelectors(totalSeconds) {
    const maximum = (23 * 3600) + (59 * 60) + 59;
    const safeSeconds = Math.min(maximum, Math.max(0, Math.floor(Number(totalSeconds) || 0)));
    selHour.value = String(Math.floor(safeSeconds / 3600));
    selMin.value = String(Math.floor((safeSeconds % 3600) / 60));
    selSec.value = String(safeSeconds % 60);
  }

  function readManualSeconds() {
    return (Number(selHour.value) * 3600) + (Number(selMin.value) * 60) + Number(selSec.value);
  }

  function clearAddHistory() {
    addHistory.length = 0;
  }

  function setTime(totalSeconds) {
    if (isBreakMode) stopBreakDisplay();
    pauseTimer();
    timerMode = 'countdown';
    const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    clockPreviewMode = 'countdown';
    lastSetSeconds = safeSeconds;
    remainingMs = safeSeconds * 1000;
    hasEnded = false;
    clearAddHistory();
    syncManualSelectors(safeSeconds);
    renderTimer();
  }

  function previewManualTime() {
    if (isPomodoroMode) deactivatePomodoroMode();
    if (isBreakMode) stopBreakDisplay();
    pauseTimer();
    timerMode = 'countdown';
    clockPreviewMode = 'countdown';
    remainingMs = readManualSeconds() * 1000;
    hasEnded = false;
    clearAddHistory();
    renderTimer();
  }

  function formatAddDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours}時間`);
    if (minutes > 0) parts.push(`${minutes}分`);
    if (seconds > 0) parts.push(`${seconds}秒`);
    return parts.join('') || '0秒';
  }

  function showExtensionConfirmation(seconds) {
    pendingAddSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
    extensionQuestion.textContent = `＋${formatAddDuration(pendingAddSeconds)} 延長しますか？`;
    extensionConfirm.hidden = false;
    extensionYesButton.focus();
  }

  function applyAddTime(seconds) {
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'countdown') {
      pauseTimer();
      timerMode = 'countdown';
    }
    const increment = Math.max(0, Number(seconds) || 0) * 1000;
    if (increment <= 0) return;
    clockPreviewMode = 'countdown';
    addHistory.push(increment);
    if (isRunning) {
      endAt += increment;
      remainingMs = Math.max(0, endAt - Date.now());
    } else {
      remainingMs += increment;
    }
    hasEnded = false;
    syncManualSelectors(secondsForDisplay());
    renderTimer();
  }

  function addTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
    if (safeSeconds <= 0) return;
    if (timerMode === 'countdown' && isRunning) {
      showExtensionConfirmation(safeSeconds);
      return;
    }
    applyAddTime(safeSeconds);
  }

  function undoLastAdd() {
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'countdown') return;
    clockPreviewMode = 'countdown';
    const decrement = addHistory.pop();
    if (decrement === undefined) return;
    if (isRunning) {
      endAt -= decrement;
      remainingMs = Math.max(0, endAt - Date.now());
      if (remainingMs <= 0) {
        remainingMs = 0;
        isRunning = false;
        stopTicker();
      }
    } else {
      remainingMs = Math.max(0, remainingMs - decrement);
    }
    hasEnded = false;
    syncManualSelectors(secondsForDisplay());
    renderTimer();
  }

  function resetTimer() {
    if (timerMode === 'stopwatch') {
      pauseTimer();
      stopwatchElapsedMs = 0;
      renderTimer();
      return;
    }
    setTime(lastSetSeconds);
  }

  function clearTimer() {
    if (timerMode === 'stopwatch') {
      pauseTimer();
      stopwatchElapsedMs = 0;
      renderTimer();
      return;
    }
    setTime(0);
  }

  function createClockMarks(group, background) {
    for (let index = 0; index < 60; index += 1) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const isHour = index % 5 === 0;
      line.setAttribute('x1', '50');
      line.setAttribute('y1', '2');
      line.setAttribute('x2', '50');
      line.setAttribute('y2', isHour ? '7' : '5');
      line.setAttribute('stroke-width', isHour ? (background ? '1' : '1.7') : (background ? '0.35' : '0.65'));
      line.setAttribute('transform', `rotate(${index * 6} 50 50)`);
      group.appendChild(line);
    }
  }

  function createClockNumbers(group) {
    for (let hour = 1; hour <= 12; hour += 1) {
      const point = clockPoint(hour * 30, 35.5);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', point.x.toFixed(3));
      text.setAttribute('y', point.y.toFixed(3));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = String(hour);
      group.appendChild(text);
    }
  }

  createClockMarks(document.getElementById('left-clock-marks'), false);
  createClockMarks(document.getElementById('bg-clock-marks'), true);
  createClockNumbers(document.getElementById('left-clock-numbers'));
  createClockNumbers(document.getElementById('bg-clock-numbers'));

  const clockHands = [
    {
      hour: document.getElementById('left-hand-hour'),
      minute: document.getElementById('left-hand-minute'),
      second: document.getElementById('left-hand-second')
    },
    {
      hour: document.getElementById('bg-hand-hour'),
      minute: document.getElementById('bg-hand-minute'),
      second: document.getElementById('bg-hand-second')
    }
  ];

  function updateClocks() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourDegrees = (hours * 30) + (minutes * 0.5);
    const minuteDegrees = (minutes * 6) + (seconds * 0.1);
    const secondDegrees = seconds * 6;
    clockHands.forEach((hands) => {
      hands.hour.setAttribute('transform', `rotate(${hourDegrees} 50 50)`);
      hands.minute.setAttribute('transform', `rotate(${minuteDegrees} 50 50)`);
      hands.second.setAttribute('transform', `rotate(${secondDegrees} 50 50)`);
    });
  }

  window.setInterval(updateClocks, 1000);
  updateClocks();

  function setControlsHidden(hidden) {
    controlsHidden = Boolean(hidden);
    body.classList.toggle('controls-hidden', controlsHidden);
    if (!controlsHidden) {
      const current = Number.parseFloat(topPane.style.height) || topPane.getBoundingClientRect().height;
      applyTopPaneHeight(current, false);
      keepDividerVisible();
    }
  }

  async function setClickThrough(enabled) {
    if (!bridge) return;
    isClickThrough = Boolean(enabled);
    const state = await bridge.setClickThrough(isClickThrough);
    applyOverlayState(state);
    if (isClickThrough) setControlsHidden(true);
  }

  function applyOverlayState(state = {}) {
    if (typeof state.alwaysOnTop === 'boolean') isPinned = state.alwaysOnTop;
    if (typeof state.clickThrough === 'boolean') isClickThrough = state.clickThrough;
    body.classList.toggle('click-through', isClickThrough);
    document.getElementById('click-through-hint').hidden = !isClickThrough;
    document.getElementById('btn-pin').classList.toggle('is-active', isPinned);
    document.getElementById('btn-pin').textContent = isPinned ? '固定中' : '固定';
    document.getElementById('btn-click-through').textContent = isClickThrough ? '操作モードへ戻る' : 'クリック透過を開始';
    overlayStatus.textContent = isClickThrough
      ? 'クリック透過中'
      : `${isPinned ? '最前面' : '通常表示'}・操作可能`;
  }

  async function toggleFullscreen() {
    if (bridge) {
      await bridge.toggleFullscreen();
      return;
    }
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }

  function runCommand(command) {
    switch (command) {
      case 'toggle-timer': toggleTimer(); break;
      case 'reset': resetTimer(); break;
      case 'toggle-controls': setControlsHidden(!controlsHidden); break;
      case 'toggle-click-through': setClickThrough(!isClickThrough); break;
      case 'toggle-fullscreen': toggleFullscreen(); break;
      default: break;
    }
  }

  document.addEventListener('click', guardTutorialAction, true);

  playButton.addEventListener('click', toggleTimer);
  stopwatchButton.addEventListener('click', toggleStopwatch);
  document.getElementById('btn-reset').addEventListener('click', resetTimer);
  document.getElementById('btn-clear').addEventListener('click', () => {
    if (isPomodoroMode) stopPomodoroMode();
    else clearTimer();
  });

  document.querySelectorAll('.btn-preset').forEach((button) => {
    button.addEventListener('click', () => {
      if (isPomodoroMode) stopPomodoroMode();
      setTime(Number(button.dataset.time));
    });
  });

  document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', () => addTime(Number(button.dataset.add)));
  });

  undoAddButton.addEventListener('click', undoLastAdd);

  extensionYesButton.addEventListener('click', () => {
    const seconds = pendingAddSeconds;
    hideExtensionConfirmation();
    if (seconds > 0) applyAddTime(seconds);
  });

  extensionNoButton.addEventListener('click', hideExtensionConfirmation);

  tutorialButton.addEventListener('click', openTutorial);
  tutorialCloseButton.addEventListener('click', closeTutorial);
  tutorialBackButton.addEventListener('click', () => {
    if (tutorialIndex <= 0) return;
    tutorialIndex -= 1;
    renderTutorialStep();
  });
  tutorialNextButton.addEventListener('click', () => {
    if (!tutorialStepComplete) return;
    if (tutorialIndex >= tutorialSteps.length - 1) {
      closeTutorial();
      return;
    }
    tutorialIndex += 1;
    renderTutorialStep();
  });

  document.addEventListener('click', handleTutorialAction);

  pomodoroButton.addEventListener('click', openPomodoro);
  pomodoroCloseButton.addEventListener('click', closePomodoro);
  pomodoroStartButton.addEventListener('click', startPomodoroMode);
  pomodoroPrimaryButton.addEventListener('click', togglePomodoroPrimary);
  pomodoroEndButton.addEventListener('click', stopPomodoroMode);
  pomodoroOverlay.addEventListener('click', (event) => {
    if (event.target === pomodoroOverlay) closePomodoro();
  });
  pomodoroTaskInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    startPomodoroMode();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!pomodoroOverlay.hidden) {
      event.preventDefault();
      closePomodoro();
      return;
    }
    if (tutorialOverlay.hidden) return;
    event.preventDefault();
    closeTutorial();
  });

  [selHour, selMin, selSec].forEach((select) => {
    select.addEventListener('input', previewManualTime);
  });

  document.getElementById('btn-set-manual').addEventListener('click', () => {
    const manualSeconds = readManualSeconds();
    if (isPomodoroMode) stopPomodoroMode();
    setTime(manualSeconds);
  });

  startBreakButton.addEventListener('click', () => {
    if (isPomodoroMode) stopPomodoroMode();
    toggleBreakDisplay();
  });

  [selBreakHour, selBreakMin].forEach((select) => {
    select.addEventListener('input', () => {
      breakPresetTarget = null;
      if (isBreakMode) startBreakDisplay();
      else previewSelectedBreakTime();
    });
  });

  document.getElementById('btn-break-10').addEventListener('click', () => setBreakMinutesFromNow(10));
  document.getElementById('btn-break-60').addEventListener('click', () => setBreakMinutesFromNow(60));
  document.getElementById('btn-break-plus').addEventListener('click', () => adjustBreakMinutes(1));
  document.getElementById('btn-break-minus').addEventListener('click', () => adjustBreakMinutes(-1));

  document.getElementById('chk-theme').addEventListener('change', (event) => {
    body.dataset.theme = event.target.checked ? 'dark' : 'light';
  });

  document.getElementById('chk-leftclock').addEventListener('change', (event) => {
    leftClockWrap.hidden = !event.target.checked;
    clockResizer.hidden = !event.target.checked;
  });

  document.getElementById('chk-bgclock').addEventListener('change', (event) => {
    bgClock.hidden = !event.target.checked;
  });

  document.getElementById('chk-digital').addEventListener('change', (event) => {
    body.classList.toggle('digital-hidden', !event.target.checked);
  });

  document.getElementById('chk-clocknumbers').addEventListener('change', (event) => {
    body.classList.toggle('show-clock-numbers', event.target.checked);
  });

  document.getElementById('slider-opacity').addEventListener('input', (event) => {
    root.style.setProperty('--clock-opacity', event.target.value);
  });

  document.getElementById('btn-browser-fullscreen').addEventListener('click', toggleFullscreen);

  resizer.addEventListener('pointerdown', (event) => {
    isResizing = true;
    resizer.setPointerCapture(event.pointerId);
    body.style.userSelect = 'none';
  });

  window.addEventListener('pointermove', (event) => {
    if (isResizing && !controlsHidden) {
      const titlebarHeight = isElectron ? 38 : 0;
      const relativeY = event.clientY - titlebarHeight;
      const maximum = Math.max(120, window.innerHeight - titlebarHeight - 86);
      applyTopPaneHeight(Math.min(maximum, relativeY), true);
    }

    if (isClockResizing && !leftClockWrap.hidden) {
      const paneLeft = topPane.getBoundingClientRect().left;
      applyLeftClockWidth(event.clientX - paneLeft, true);
    }
  });

  window.addEventListener('pointerup', () => {
    isResizing = false;
    isClockResizing = false;
    clockResizer.classList.remove('is-active');
    body.style.userSelect = '';
  });

  clockResizer.addEventListener('pointerdown', (event) => {
    isClockResizing = true;
    clockResizer.classList.add('is-active');
    clockResizer.setPointerCapture(event.pointerId);
    body.style.userSelect = 'none';
  });

  if (bridge) {
    document.getElementById('btn-pin').addEventListener('click', async () => {
      applyOverlayState(await bridge.setAlwaysOnTop(!isPinned));
    });
    document.getElementById('btn-window-fullscreen').addEventListener('click', toggleFullscreen);
    document.getElementById('btn-minimize').addEventListener('click', () => bridge.minimize());
    document.getElementById('btn-close').addEventListener('click', () => bridge.close());
    document.getElementById('btn-hide-controls').addEventListener('click', () => setControlsHidden(true));
    document.getElementById('btn-click-through').addEventListener('click', () => setClickThrough(!isClickThrough));
    bridge.onCommand(runCommand);
    bridge.onState(applyOverlayState);
    bridge.getState().then(applyOverlayState);
  }

  renderTimer();
})();
