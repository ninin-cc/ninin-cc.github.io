(() => {
  'use strict';

  const searchDocumentTitle = 'タイマー｜ワークショップ・研修・学習効率化に最適';

  const bridge = window.overlayBridge ?? null;
  const isElectron = Boolean(bridge);
  const pageParams = new URLSearchParams(window.location.search);
  const isStandalonePomodoro = pageParams.get('view') === 'pomodoro';
  const isCompactBrowserWindow = !isElectron && pageParams.get('compact') === '1';
  const mainWindowName = isStandalonePomodoro
    ? ''
    : (window.name || `ninin-timer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  if (mainWindowName) window.name = mainWindowName;
  const body = document.body;
  const root = document.documentElement;
  const appShell = document.getElementById('app');
  const tr = (value) => window.TimerI18n?.translate(value) ?? value;
  const uiZoomOutButton = document.getElementById('btn-ui-zoom-out');
  const uiZoomInButton = document.getElementById('btn-ui-zoom-in');
  const uiScaleValue = document.getElementById('ui-scale-value');
  const compactWindowButton = document.getElementById('btn-compact-window');
  const digitalText = document.getElementById('digital-text');
  const timerStage = document.getElementById('timer-stage');
  const topPane = document.getElementById('top-pane');
  const resizer = document.getElementById('resizer');
  const leftClockWrap = document.getElementById('left-clock-wrap');
  const analogTimerPreview = document.getElementById('analog-timer-preview');
  const clockResizer = document.getElementById('clock-resizer');
  const bgClock = document.getElementById('bg-clock');
  const stagePlusButton = document.getElementById('btn-stage-plus');
  const stageMinusButton = document.getElementById('btn-stage-minus');
  const stagePlayButton = document.getElementById('btn-stage-play');
  const stageClearButton = document.getElementById('btn-stage-clear');
  const stageResetButton = document.getElementById('btn-stage-reset');
  const stageStopwatchButton = document.getElementById('btn-stage-stopwatch');
  const modeSwitchButton = document.getElementById('btn-mode-switch');
  const windowShrinkButton = document.getElementById('btn-window-shrink');
  const windowExpandButton = document.getElementById('btn-window-expand');
  const quickPomodoroStatus = document.getElementById('quick-pomodoro-status');
  const timerVolumeSlider = document.getElementById('timer-volume');
  const timerVolumeIcon = document.getElementById('timer-volume-icon');
  const timerVolumeValue = document.getElementById('timer-volume-value');
  const soundSettingsButton = document.getElementById('btn-sound-settings');
  const soundSettingsPopover = document.getElementById('sound-settings-popover');
  const soundSettingsCloseButton = document.getElementById('btn-sound-settings-close');
  const alarmSoundSelect = document.getElementById('alarm-sound-select');
  const alarmPlayModeSelect = document.getElementById('alarm-play-mode');
  const timerRepeatCountSelect = document.getElementById('timer-repeat-count');
  const timerRepeatIntervalSelect = document.getElementById('timer-repeat-interval');
  const timerPreAlertSelect = document.getElementById('timer-prealert');
  const alarmPreviewButton = document.getElementById('btn-alarm-preview');
  const timerRepeatStatus = document.getElementById('timer-repeat-status');
  const leftClockCheckbox = document.getElementById('chk-leftclock');
  const rightClockCheckbox = document.getElementById('chk-rightclock');
  const selHour = document.getElementById('sel-hour');
  const selMin = document.getElementById('sel-min');
  const selSec = document.getElementById('sel-sec');
  const playButton = document.getElementById('btn-toggle-play');
  const stopwatchButton = document.getElementById('btn-stopwatch');
  const subtractMinuteButton = document.getElementById('btn-subtract-minute');
  const undoAddButton = document.getElementById('btn-undo-add');
  const adjustmentLabel = document.getElementById('adjustment-label');
  const adjustmentControls = document.getElementById('adjustment-controls');
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
  const agendaButton = document.getElementById('btn-agenda');
  const agendaOverlay = document.getElementById('agenda-overlay');
  const agendaCloseButton = document.getElementById('btn-agenda-close');
  const agendaCancelButton = document.getElementById('btn-agenda-cancel');
  const agendaOpenButton = document.getElementById('btn-agenda-open');
  const agendaAddButton = document.getElementById('btn-agenda-add');
  const agendaRowsContainer = document.getElementById('agenda-rows');
  const agendaTotal = document.getElementById('agenda-total');
  const agendaNote = document.getElementById('agenda-note');
  const agendaNameInput = document.getElementById('agenda-name');
  const agendaSavedSelect = document.getElementById('agenda-saved');
  const agendaLoadButton = document.getElementById('btn-agenda-load');
  const agendaSaveButton = document.getElementById('btn-agenda-save');
  const agendaDeleteButton = document.getElementById('btn-agenda-delete');
  const agendaExportButton = document.getElementById('btn-agenda-export');
  const agendaImportFile = document.getElementById('agenda-import-file');
  const agendaThemeInputs = Array.from(document.querySelectorAll('input[name="agenda-theme"]'));
  const agendaBackgroundFile = document.getElementById('agenda-background-file');
  const agendaBackgroundPreview = document.getElementById('agenda-background-preview');
  const agendaBackgroundName = document.getElementById('agenda-background-name');
  const agendaBackgroundClearButton = document.getElementById('btn-agenda-background-clear');
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
  const pomodoroMinuteBlocks = document.getElementById('pomodoro-minute-blocks');
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
  let hasStartedCurrentCountdown = false;
  let endAt = 0;
  let countdownStartedAt = null;
  let ticker = null;
  let isRunning = false;
  let hasEnded = false;
  let audioContext = null;
  let alarmVolume = 1;
  let alarmVolumeBeforeMute = 100;
  let alarmSoundPreset = 'gentle';
  let alarmPlayMode = 'triple';
  let timerRepeatCount = 'off';
  let timerRepeatIntervalSeconds = 0;
  let timerPreAlertMode = 'off';
  let alarmLoopTimer = null;
  let alarmAutoStopTimer = null;
  let repeatRestartTimer = null;
  let repeatStatusTicker = null;
  let repeatRestartAt = 0;
  let timerRepeatCompleted = 0;
  let repeatDurationSeconds = 0;
  let repeatCycleActive = false;
  let suppressAlarm = false;
  let isPinned = true;
  let isClickThrough = false;
  let controlsHidden = false;
  let controlCollapseScope = 'none';
  let expandedWindowOuterHeight = 0;
  let expandedTopPaneHeightStyle = '';
  let expandedTopPaneFlexBasisStyle = '';
  let collapseResizeFrame = 0;
  let isResizing = false;
  let isClockResizing = false;
  let isBreakMode = false;
  let isDigitalClockVisible = true;
  let breakTarget = null;
  let breakStartedAt = null;
  let breakTicker = null;
  let breakPresetTarget = null;
  let clockPreviewMode = null;
  let analogTimerPreviewTimeout = null;
  const activeAlarmOscillators = new Set();
  const preAlertsFired = new Set();
  const preAlertEligible = new Set();
  let pendingAddSeconds = 0;
  let tutorialIndex = 0;
  let tutorialTarget = null;
  let tutorialStepComplete = false;
  let tutorialPhase = null;
  let tutorialSavedState = null;
  let isPomodoroMode = false;
  let isQuickPomodoroMode = false;
  let pomodoroPhase = 'focus';
  let pomodoroCompleted = 0;
  let pomodoroAwaitingStart = false;
  let pomodoroTask = '';
  let pomodoroLongBreakMinutes = 20;
  let pomodoroStatusMessage = '';
  let pomodoroBlockCount = 0;
  let activeAgendaId = '';
  let agendaWindow = null;
  let pomodoroWindow = null;
  let compactWindowRef = null;
  let agendaBackgroundUrl = '';
  let agendaBackgroundFileValue = null;
  const agendaBackgroundUrls = new Set();
  const launchedAgendaBackgroundUrls = new Set();
  const agendaThemeIds = ['fun', 'gentle', 'steady', 'healing'];
  const defaultAgendaItems = [
    { title: 'オープニング・ゴール確認', minutes: 5 },
    { title: 'テーマと進め方の説明', minutes: 10 },
    { title: '個人・グループワーク', minutes: 20 },
    { title: '共有・対話', minutes: 15 },
    { title: 'まとめ・次の一歩', minutes: 10 }
  ];
  const addHistory = [];
  const storageKeys = {
    topPaneHeight: 'workshopTimer.topPaneHeight',
    leftClockWidth: 'workshopTimer.leftClockWidth',
    leftClockRatio: 'workshopTimer.leftClockRatio',
    alarmVolume: 'workshopTimer.alarmVolume',
    alarmVolumeBeforeMute: 'workshopTimer.alarmVolumeBeforeMute',
    alarmSoundPreset: 'workshopTimer.alarmSoundPreset',
    alarmPlayMode: 'workshopTimer.alarmPlayMode',
    timerRepeatCount: 'workshopTimer.timerRepeatCount',
    timerRepeatInterval: 'workshopTimer.timerRepeatInterval',
    timerPreAlert: 'workshopTimer.timerPreAlert',
    controlCollapseScope: 'workshopTimer.controlCollapseScope',
    uiScale: 'workshopTimer.uiScale',
    agendas: 'workshopTimer.agendas.v1'
  };
  const alarmSoundPatterns = Object.freeze({
    gentle: [
      { frequency: 659.25, at: 0, duration: 0.34, type: 'sine', gain: 0.78 },
      { frequency: 783.99, at: 0.36, duration: 0.34, type: 'sine', gain: 0.72 },
      { frequency: 1046.5, at: 0.72, duration: 0.95, type: 'sine', gain: 0.68 }
    ],
    metallophone: [
      { frequency: 523.25, at: 0, duration: 0.7, type: 'triangle', gain: 0.76 },
      { frequency: 659.25, at: 0.24, duration: 0.72, type: 'triangle', gain: 0.72 },
      { frequency: 783.99, at: 0.48, duration: 1.0, type: 'triangle', gain: 0.7 }
    ],
    xylophone: [
      { frequency: 783.99, at: 0, duration: 0.18, type: 'triangle', gain: 0.82 },
      { frequency: 987.77, at: 0.22, duration: 0.18, type: 'triangle', gain: 0.78 },
      { frequency: 1174.66, at: 0.44, duration: 0.32, type: 'triangle', gain: 0.72 }
    ],
    orchestra: [
      { frequency: 261.63, at: 0, duration: 1.25, type: 'sine', gain: 0.44 },
      { frequency: 329.63, at: 0, duration: 1.25, type: 'sine', gain: 0.38 },
      { frequency: 392.0, at: 0, duration: 1.25, type: 'sine', gain: 0.36 },
      { frequency: 523.25, at: 0.54, duration: 1.05, type: 'triangle', gain: 0.36 }
    ],
    'set-chime': [
      { frequency: 523.25, at: 0, duration: 0.3, type: 'sine', gain: 0.72 },
      { frequency: 659.25, at: 0.28, duration: 0.3, type: 'sine', gain: 0.72 },
      { frequency: 783.99, at: 0.56, duration: 0.72, type: 'sine', gain: 0.68 }
    ],
    'clear-chime': [
      { frequency: 1046.5, at: 0, duration: 0.28, type: 'sine', gain: 0.68 },
      { frequency: 783.99, at: 0.27, duration: 0.28, type: 'sine', gain: 0.7 },
      { frequency: 659.25, at: 0.54, duration: 0.7, type: 'sine', gain: 0.72 }
    ],
    'bell-high': [
      { frequency: 1318.51, at: 0, duration: 1.15, type: 'sine', gain: 0.66 },
      { frequency: 2637.02, at: 0, duration: 0.62, type: 'sine', gain: 0.18 }
    ],
    'bell-low': [
      { frequency: 392.0, at: 0, duration: 1.45, type: 'sine', gain: 0.72 },
      { frequency: 784.0, at: 0, duration: 0.82, type: 'sine', gain: 0.2 }
    ],
    'alarm-clock': [
      { frequency: 880, at: 0, duration: 0.18, type: 'square', gain: 0.44 },
      { frequency: 880, at: 0.26, duration: 0.18, type: 'square', gain: 0.44 },
      { frequency: 880, at: 0.52, duration: 0.18, type: 'square', gain: 0.44 },
      { frequency: 880, at: 0.78, duration: 0.18, type: 'square', gain: 0.44 }
    ],
    alert: [
      { frequency: 740, at: 0, duration: 0.28, type: 'sawtooth', gain: 0.34 },
      { frequency: 988, at: 0.32, duration: 0.28, type: 'sawtooth', gain: 0.32 },
      { frequency: 740, at: 0.64, duration: 0.28, type: 'sawtooth', gain: 0.34 },
      { frequency: 988, at: 0.96, duration: 0.42, type: 'sawtooth', gain: 0.32 }
    ]
  });
  const validAlarmSounds = new Set([...Object.keys(alarmSoundPatterns), 'vibration']);
  const validAlarmPlayModes = new Set(['once', 'triple', 'continuous']);
  const validTimerRepeatCounts = new Set(['off', '2', '3', '5', 'infinite']);
  const validTimerIntervals = new Set(['0', '10', '30', '60', '180', '300', '600']);
  const validPreAlertModes = new Set(['off', '60', '10', 'both']);
  const validControlCollapseScopes = new Set(['none', 'view', 'timer', 'clock']);
  const uiScaleMin = 0.5;
  const uiScaleMax = 1.3;
  const uiScaleStep = 0.1;
  let uiScale = 1;
  let leftClockRatio = 0.5;

  body.classList.add(isElectron ? 'electron-mode' : 'browser-mode');

  const tutorialSteps = [
    {
      title: 'まず、画面の役割を知る',
      description: '左は現在時刻、右はタイマー表示、下は操作エリアです。実際にボタンを押しながら、基本操作を順番に練習します。',
      instruction: '練習中の内容は、終了すると元の状態へ戻ります。'
    },
    {
      title: 'ADDで1分を設定する',
      description: 'ADDは表示中の時間へ加算します。まずは空の状態から「＋1」を押して、1分を設定してみましょう。',
      instruction: '「＋1」を押してください',
      selector: '.add-group',
      action: 'add-initial',
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
      description: '停止中のADDは、表示中の時間へそのまま加算します。＋5で増やしたあと、↶で元に戻してみましょう。',
      instruction: 'まず「＋5」を押してください',
      selector: '.add-group',
      action: 'add-stopped',
      setup: 'ready-countdown',
      phase: 'add'
    },
    {
      title: '実行中のADDで延長する',
      description: '実行中にADDを押すと確認画面が開きます。開始、＋2、YESの順に操作して、残り時間と終了位置が延びる様子を見てみましょう。',
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
        ? '左時計、背景時計、文字盤、テーマ、背景濃さを変更できます。パネル非表示やクリック透過で、PowerPointの上へ自然に重ねられます。'
        : '左時計、背景時計、文字盤、テーマ、背景濃さを変更できます。全画面ボタンで発表画面いっぱいに表示できます。',
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

  function readStoredChoice(key, allowedValues, fallback) {
    try {
      const value = window.localStorage.getItem(key);
      return allowedValues.has(value) ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function storeChoice(key, value) {
    try {
      window.localStorage.setItem(key, String(value));
    } catch {
      // 設定は保存できなくても、現在の画面ではそのまま利用できる。
    }
  }

  function applyAlarmVolume(percent, persist = false) {
    const safePercent = Math.min(100, Math.max(0, Math.round(Number(percent) || 0)));
    alarmVolume = safePercent / 100;
    if (safePercent > 0) alarmVolumeBeforeMute = safePercent;
    timerVolumeSlider.value = String(safePercent);
    timerVolumeValue.textContent = `${safePercent}%`;
    timerVolumeIcon.textContent = safePercent === 0 ? '🔇' : safePercent < 50 ? '🔉' : '🔊';
    const isMuted = safePercent === 0;
    timerVolumeIcon.setAttribute('aria-pressed', String(isMuted));
    timerVolumeIcon.setAttribute('aria-label', isMuted ? '元の音量に戻す' : 'ミュートにする');
    timerVolumeIcon.title = isMuted ? '元の音量に戻す' : 'ミュートにする';
    if (isMuted) stopAlarm();
    if (persist) {
      storeNumber(storageKeys.alarmVolume, safePercent);
      if (!isMuted) storeNumber(storageKeys.alarmVolumeBeforeMute, alarmVolumeBeforeMute);
    }
  }

  function syncNotificationSettingsUi() {
    alarmSoundSelect.value = alarmSoundPreset;
    alarmPlayModeSelect.value = alarmPlayMode;
    timerRepeatCountSelect.value = timerRepeatCount;
    timerRepeatIntervalSelect.value = String(timerRepeatIntervalSeconds);
    timerRepeatIntervalSelect.disabled = timerRepeatCount === 'off';
    timerPreAlertSelect.value = timerPreAlertMode;
  }

  function positionSoundSettingsPopover() {
    if (soundSettingsPopover.hidden) return;
    const triggerRect = soundSettingsButton.getBoundingClientRect();
    const panelRect = soundSettingsPopover.getBoundingClientRect();
    const margin = 8;
    const left = Math.min(
      Math.max(margin, triggerRect.right - panelRect.width),
      Math.max(margin, window.innerWidth - panelRect.width - margin)
    );
    const preferredTop = triggerRect.top - panelRect.height - 8;
    const top = preferredTop >= margin
      ? preferredTop
      : Math.min(window.innerHeight - panelRect.height - margin, triggerRect.bottom + 8);
    soundSettingsPopover.style.left = `${Math.round(left)}px`;
    soundSettingsPopover.style.top = `${Math.max(margin, Math.round(top))}px`;
  }

  function openSoundSettings() {
    soundSettingsPopover.hidden = false;
    soundSettingsButton.setAttribute('aria-expanded', 'true');
    window.requestAnimationFrame(positionSoundSettingsPopover);
  }

  function closeSoundSettings({ restoreFocus = false } = {}) {
    if (soundSettingsPopover.hidden) return;
    soundSettingsPopover.hidden = true;
    soundSettingsButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) soundSettingsButton.focus();
  }

  function applyControlCollapseScope(scope, persist = false) {
    const previousScope = controlCollapseScope;
    const nextScope = validControlCollapseScopes.has(scope) ? scope : 'none';
    if (previousScope === 'none' && nextScope !== 'none') {
      expandedWindowOuterHeight = window.outerHeight;
      expandedTopPaneHeightStyle = topPane.style.height;
      expandedTopPaneFlexBasisStyle = topPane.style.flexBasis;
      const displayedTopPaneHeight = topPane.getBoundingClientRect().height / uiScale;
      applyTopPaneHeight(displayedTopPaneHeight, false);
    }
    controlCollapseScope = nextScope;
    const timerCollapsed = controlCollapseScope === 'timer';
    const viewCollapsed = controlCollapseScope === 'view';
    const clockOnly = controlCollapseScope === 'clock';
    body.classList.toggle('collapse-from-timer', timerCollapsed);
    body.classList.toggle('collapse-from-view', viewCollapsed);
    body.classList.toggle('collapse-to-clock', clockOnly);
    body.classList.toggle('control-sections-collapsed', timerCollapsed || viewCollapsed || clockOnly);
    windowShrinkButton.disabled = clockOnly;
    windowExpandButton.disabled = controlCollapseScope === 'none';
    windowShrinkButton.setAttribute('aria-label', tr('表示を縮小'));
    windowShrinkButton.title = tr('表示を縮小');
    windowExpandButton.setAttribute('aria-label', tr('表示を拡大'));
    windowExpandButton.title = tr('表示を拡大');
    if (persist) {
      try { window.localStorage.removeItem(storageKeys.controlCollapseScope); } catch {}
    }
    if (collapseResizeFrame) window.cancelAnimationFrame(collapseResizeFrame);
    collapseResizeFrame = window.requestAnimationFrame(() => {
      collapseResizeFrame = 0;
      if (controlCollapseScope === 'none') {
        topPane.style.height = expandedTopPaneHeightStyle;
        topPane.style.flexBasis = expandedTopPaneFlexBasisStyle;
        syncMinimumWindowSize();
        if (expandedWindowOuterHeight > 0) resizeWindowToHeight(expandedWindowOuterHeight);
        expandedWindowOuterHeight = 0;
        expandedTopPaneHeightStyle = '';
        expandedTopPaneFlexBasisStyle = '';
        window.requestAnimationFrame(keepDividerVisible);
        return;
      }
      syncMinimumWindowSize();
      resizeWindowToHeight(measureCollapsedWindowHeight());
    });
  }

  function shrinkControlSections() {
    if (controlCollapseScope === 'none') applyControlCollapseScope('view', true);
    else if (controlCollapseScope === 'view') applyControlCollapseScope('timer', true);
    else if (controlCollapseScope === 'timer') applyControlCollapseScope('clock', true);
  }

  function expandControlSections() {
    if (controlCollapseScope === 'clock') applyControlCollapseScope('timer', true);
    else if (controlCollapseScope === 'timer') applyControlCollapseScope('view', true);
    else if (controlCollapseScope === 'view') applyControlCollapseScope('none', true);
  }

  function measureCollapsedWindowHeight() {
    const browserChromeHeight = Math.max(0, window.outerHeight - window.innerHeight);
    const titlebarHeight = document.getElementById('titlebar')?.getBoundingClientRect().height || 0;
    const topPaneHeight = topPane.getBoundingClientRect().height;
    const dividerHeight = resizer.getBoundingClientRect().height;
    const controlsHeight = document.getElementById('controls').getBoundingClientRect().height;
    return Math.ceil(browserChromeHeight + titlebarHeight + topPaneHeight + dividerHeight + controlsHeight + 2);
  }

  function resizeWindowToHeight(targetHeight) {
    const safeHeight = Math.max(180, Math.round(Number(targetHeight) || window.outerHeight));
    if (bridge?.resizeToHeight) {
      void bridge.resizeToHeight(safeHeight);
      return;
    }
    try {
      window.resizeTo(window.outerWidth, safeHeight);
    } catch {}
  }

  function applyUiScale(nextScale, persist = false) {
    uiScale = Math.min(uiScaleMax, Math.max(uiScaleMin, Math.round(nextScale * 10) / 10));
    root.style.setProperty('--ui-scale', String(uiScale));
    appShell.classList.toggle('is-compact-scale', uiScale < 1);
    const percent = Math.round(uiScale * 100);
    uiZoomOutButton.disabled = uiScale <= uiScaleMin;
    uiZoomInButton.disabled = uiScale >= uiScaleMax;
    uiScaleValue.textContent = `${percent}%`;
    uiZoomOutButton.title = `全体を縮小（現在 ${percent}%）`;
    uiZoomInButton.title = `全体を拡大（現在 ${percent}%）`;
    if (persist) {
      try { window.localStorage.setItem(storageKeys.uiScale, String(uiScale)); } catch {}
    }
    window.requestAnimationFrame(() => {
      syncMinimumWindowSize();
      if (!leftClockWrap.hidden) {
        applyLeftClockRatio(leftClockRatio, false);
      }
      positionSoundSettingsPopover();
    });
  }

  function resizeMainWindow(previousScale, nextScale) {
    if (!previousScale || previousScale === nextScale) return;
    const ratio = nextScale / previousScale;
    const minimumWidth = Math.max(280, Math.round(520 * nextScale));
    const minimumHeight = Math.max(180, Math.round(360 * nextScale));
    if (bridge?.resizeByScale) {
      void bridge.resizeByScale(ratio, minimumWidth, minimumHeight);
      return;
    }
    try {
      window.resizeTo(
        Math.max(minimumWidth, Math.round(window.outerWidth * ratio)),
        Math.max(minimumHeight, Math.round(window.outerHeight * ratio))
      );
    } catch {}
  }

  function compactWindowSize(scale = uiScale) {
    const availableWidth = Math.max(280, window.screen?.availWidth || 1280);
    const availableHeight = Math.max(360, window.screen?.availHeight || 800);
    return {
      width: Math.min(availableWidth, Math.max(280, Math.round(520 * scale))),
      height: Math.min(availableHeight, Math.max(360, Math.round(900 * scale)))
    };
  }

  function captureWindowTransferState() {
    const now = Date.now();
    return {
      version: 1,
      createdAt: now,
      timerMode,
      isRunning,
      remainingMs: timerMode === 'countdown' && isRunning ? Math.max(0, endAt - now) : remainingMs,
      endAt: timerMode === 'countdown' && isRunning ? endAt : 0,
      countdownStartedAt: countdownStartedAt?.getTime() || 0,
      stopwatchElapsedMs: timerMode === 'stopwatch' && isRunning
        ? Math.max(0, now - stopwatchStartedAt)
        : stopwatchElapsedMs,
      stopwatchStartedAt: timerMode === 'stopwatch' && isRunning ? stopwatchStartedAt : 0,
      lastSetSeconds,
      hasStartedCurrentCountdown,
      hasEnded,
      clockPreviewMode,
      timerRepeatCompleted,
      repeatDurationSeconds,
      repeatCycleActive,
      preAlertsFired: [...preAlertsFired],
      preAlertEligible: [...preAlertEligible],
      addHistory: [...addHistory],
      manualValues: [selHour.value, selMin.value, selSec.value],
      breakValues: [selBreakHour.value, selBreakMin.value],
      isBreakMode,
      breakTargetAt: breakTarget?.getTime() || 0,
      breakStartedAt: breakStartedAt?.getTime() || 0
    };
  }

  function restoreWindowTransferState() {
    if (!isCompactBrowserWindow) return false;
    const token = pageParams.get('transfer');
    if (!token) return false;
    const transferKey = `workshopTimer.windowTransfer.${token}`;
    let saved = null;
    try {
      saved = JSON.parse(window.localStorage.getItem(transferKey) || 'null');
      window.localStorage.removeItem(transferKey);
    } catch {}
    try {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('transfer');
      window.history.replaceState(null, '', cleanUrl.href);
    } catch {}
    if (!saved || saved.version !== 1) return false;

    stopTicker();
    stopBreakTicker();
    hideExtensionConfirmation();
    const now = Date.now();
    timerMode = saved.timerMode === 'stopwatch' ? 'stopwatch' : 'countdown';
    lastSetSeconds = Math.max(0, Number(saved.lastSetSeconds) || 0);
    hasStartedCurrentCountdown = typeof saved.hasStartedCurrentCountdown === 'boolean'
      ? saved.hasStartedCurrentCountdown
      : Boolean(saved.isRunning && saved.timerMode !== 'stopwatch');
    hasEnded = Boolean(saved.hasEnded);
    clockPreviewMode = saved.clockPreviewMode || null;
    timerRepeatCompleted = Math.max(0, Number(saved.timerRepeatCompleted) || 0);
    repeatDurationSeconds = Math.max(0, Number(saved.repeatDurationSeconds) || 0);
    repeatCycleActive = Boolean(saved.repeatCycleActive);
    preAlertsFired.clear();
    if (Array.isArray(saved.preAlertsFired)) saved.preAlertsFired.forEach((value) => preAlertsFired.add(Number(value)));
    preAlertEligible.clear();
    if (Array.isArray(saved.preAlertEligible)) saved.preAlertEligible.forEach((value) => preAlertEligible.add(Number(value)));
    addHistory.length = 0;
    if (Array.isArray(saved.addHistory)) addHistory.push(...saved.addHistory.map(Number).filter(Number.isFinite));
    if (Array.isArray(saved.manualValues) && saved.manualValues.length === 3) {
      [selHour.value, selMin.value, selSec.value] = saved.manualValues;
    }
    if (Array.isArray(saved.breakValues) && saved.breakValues.length === 2) {
      [selBreakHour.value, selBreakMin.value] = saved.breakValues;
    }

    isBreakMode = false;
    breakTarget = null;
    breakStartedAt = null;
    if (saved.isBreakMode && Number(saved.breakTargetAt) > now) {
      isRunning = false;
      isBreakMode = true;
      breakTarget = new Date(Number(saved.breakTargetAt));
      breakStartedAt = Number(saved.breakStartedAt) > 0 ? new Date(Number(saved.breakStartedAt)) : new Date(now);
      breakTicker = window.setInterval(updateBreakDisplay, 1000);
      renderBreakDisplay();
      return true;
    }

    if (timerMode === 'stopwatch') {
      stopwatchElapsedMs = Math.max(0, Number(saved.stopwatchElapsedMs) || 0);
      isRunning = Boolean(saved.isRunning);
      if (isRunning) {
        stopwatchStartedAt = Number(saved.stopwatchStartedAt) > 0
          ? Number(saved.stopwatchStartedAt)
          : now - stopwatchElapsedMs;
        stopwatchElapsedMs = Math.max(0, now - stopwatchStartedAt);
        ticker = window.setInterval(tick, 10);
      }
    } else {
      endAt = Math.max(0, Number(saved.endAt) || 0);
      remainingMs = saved.isRunning && endAt > 0
        ? Math.max(0, endAt - now)
        : Math.max(0, Number(saved.remainingMs) || 0);
      countdownStartedAt = Number(saved.countdownStartedAt) > 0
        ? new Date(Number(saved.countdownStartedAt))
        : null;
      isRunning = Boolean(saved.isRunning) && remainingMs > 0;
      if (isRunning) ticker = window.setInterval(tick, 100);
      else if (saved.isRunning && remainingMs <= 0) hasEnded = true;
    }
    renderTimer();
    return true;
  }

  function openCompactBrowserWindow() {
    const compactUrl = new URL(window.location.href);
    compactUrl.searchParams.set('compact', '1');
    const transferToken = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const transferKey = `workshopTimer.windowTransfer.${transferToken}`;
    try {
      window.localStorage.setItem(transferKey, JSON.stringify(captureWindowTransferState()));
      compactUrl.searchParams.set('transfer', transferToken);
    } catch {}
    const { width, height } = compactWindowSize();
    compactWindowRef = window.open(
      compactUrl.href,
      'ninin-timer-compact',
      `popup=yes,resizable=yes,scrollbars=no,width=${width},height=${height}`
    );
    if (compactWindowRef) {
      suppressAlarm = true;
      compactWindowRef.focus();
    } else {
      try { window.localStorage.removeItem(transferKey); } catch {}
    }
    window.setTimeout(() => {
      try { window.localStorage.removeItem(transferKey); } catch {}
    }, 30000);
  }

  if (compactWindowButton) {
    if (isCompactBrowserWindow) {
      compactWindowButton.textContent = '↙';
      compactWindowButton.setAttribute('aria-label', '通常画面へ戻る');
      compactWindowButton.title = '通常画面へ戻る';
    }
    compactWindowButton.addEventListener('click', () => {
      if (!isCompactBrowserWindow) {
        openCompactBrowserWindow();
        return;
      }
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'ninin-timer-compact-closed' }, '*');
        window.opener.focus();
        window.close();
        return;
      }
      const regularUrl = new URL(window.location.href);
      regularUrl.searchParams.delete('compact');
      window.location.href = regularUrl.href;
    });
  }

  applyUiScale(readStoredNumber(storageKeys.uiScale) ?? 1);
  alarmVolumeBeforeMute = readStoredNumber(storageKeys.alarmVolumeBeforeMute) ?? 100;
  applyAlarmVolume(readStoredNumber(storageKeys.alarmVolume) ?? 100);
  alarmSoundPreset = readStoredChoice(storageKeys.alarmSoundPreset, validAlarmSounds, 'gentle');
  alarmPlayMode = readStoredChoice(storageKeys.alarmPlayMode, validAlarmPlayModes, 'triple');
  timerRepeatCount = readStoredChoice(storageKeys.timerRepeatCount, validTimerRepeatCounts, 'off');
  timerRepeatIntervalSeconds = Number(readStoredChoice(storageKeys.timerRepeatInterval, validTimerIntervals, '0'));
  timerPreAlertMode = readStoredChoice(storageKeys.timerPreAlert, validPreAlertModes, 'off');
  syncNotificationSettingsUi();
  applyControlCollapseScope('none');

  uiZoomOutButton.addEventListener('click', () => {
    const previousScale = uiScale;
    const nextScale = uiScale - uiScaleStep;
    applyUiScale(nextScale, true);
    resizeMainWindow(previousScale, uiScale);
    keepDividerVisible();
  });

  uiZoomInButton.addEventListener('click', () => {
    const previousScale = uiScale;
    applyUiScale(uiScale + uiScaleStep, true);
    resizeMainWindow(previousScale, uiScale);
    keepDividerVisible();
  });

  function syncMinimumWindowSize() {
    if (!bridge?.setMinimumSize) return;
    if (controlsHidden) {
      void bridge.setMinimumSize(280, 180);
      return;
    }
    const titlebarHeight = isElectron ? 38 : 0;
    const topHeight = Number.parseFloat(topPane.style.height) || topPane.offsetHeight;
    const dividerHeight = controlCollapseScope === 'clock' ? 0 : Math.max(11, resizer.offsetHeight);
    const minimumWidth = Math.max(280, Math.round(520 * uiScale));
    const minimumHeight = Math.max(180, Math.round((titlebarHeight + topHeight + dividerHeight + 1) * uiScale));
    void bridge.setMinimumSize(minimumWidth, minimumHeight);
  }

  function applyTopPaneHeight(height, persist = false) {
    const safeHeight = Math.max(120, Math.round(height));
    topPane.style.height = `${safeHeight}px`;
    topPane.style.flexBasis = `${safeHeight}px`;
    if (persist) storeNumber(storageKeys.topPaneHeight, safeHeight);
    syncMinimumWindowSize();
  }

  function keepDividerVisible() {
    if (controlsHidden || controlCollapseScope === 'clock') return;
    if (isElectron) return;
    const titlebarHeight = isElectron ? 38 : 0;
    const dividerHeight = Math.max(11, resizer.getBoundingClientRect().height);
    const maximum = Math.max(120, appShell.clientHeight - titlebarHeight - dividerHeight - 1);
    const current = Number.parseFloat(topPane.style.height) || (topPane.getBoundingClientRect().height / uiScale);
    if (current > maximum) applyTopPaneHeight(maximum, false);
  }

  function applyLeftClockRatio(ratio, persist = false) {
    const dividerWidth = Math.max(12, clockResizer.offsetWidth);
    const minimumRightArea = 72;
    const availableWidth = Math.max(1, topPane.clientWidth - dividerWidth);
    const minimumRatio = Math.min(0.5, 100 / availableWidth);
    const maximumRatio = Math.max(minimumRatio, 1 - (minimumRightArea / availableWidth));
    const requestedRatio = Math.min(0.99, Math.max(0.01, Number(ratio) || 0.5));
    const renderedRatio = Math.min(maximumRatio, Math.max(minimumRatio, requestedRatio));
    const safeWidth = Math.round(availableWidth * renderedRatio);
    leftClockRatio = requestedRatio;
    leftClockWrap.style.width = `${safeWidth}px`;
    leftClockWrap.style.flexBasis = `${safeWidth}px`;
    if (persist) {
      try { window.localStorage.setItem(storageKeys.leftClockRatio, String(requestedRatio)); } catch {}
    }
  }

  window.requestAnimationFrame(() => {
    applyTopPaneHeight(readStoredNumber(storageKeys.topPaneHeight) ?? (topPane.getBoundingClientRect().height / uiScale));
    const dividerWidth = Math.max(12, clockResizer.offsetWidth);
    const availableWidth = Math.max(1, topPane.clientWidth - dividerWidth);
    const storedRatio = readStoredNumber(storageKeys.leftClockRatio);
    const legacyWidth = readStoredNumber(storageKeys.leftClockWidth);
    const initialRatio = storedRatio ?? (legacyWidth ? legacyWidth / availableWidth : 0.5);
    applyLeftClockRatio(initialRatio, storedRatio === null && legacyWidth !== null);
    keepDividerVisible();
  });

  window.addEventListener('resize', () => {
    keepDividerVisible();
    if (!leftClockWrap.hidden) {
      applyLeftClockRatio(leftClockRatio, false);
    }
  });

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

  function hideAnalogTimerPreview() {
    if (analogTimerPreviewTimeout !== null) {
      window.clearTimeout(analogTimerPreviewTimeout);
      analogTimerPreviewTimeout = null;
    }
    analogTimerPreview.classList.remove('is-visible');
    analogTimerPreview.setAttribute('aria-hidden', 'true');
  }

  function showAnalogTimerPreview(duration = 2800) {
    const canShow = !rightClockCheckbox.checked
      && leftClockCheckbox.checked
      && !isBreakMode
      && timerMode === 'countdown';
    if (!canShow) {
      hideAnalogTimerPreview();
      return;
    }
    analogTimerPreview.textContent = formatTime(secondsForDisplay());
    analogTimerPreview.classList.add('is-visible');
    analogTimerPreview.setAttribute('aria-hidden', 'false');
    if (analogTimerPreviewTimeout !== null) window.clearTimeout(analogTimerPreviewTimeout);
    analogTimerPreviewTimeout = window.setTimeout(hideAnalogTimerPreview, duration);
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
      hasStartedCurrentCountdown,
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
    hasStartedCurrentCountdown = false;
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
    hasStartedCurrentCountdown = Boolean(saved.hasStartedCurrentCountdown);
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
    tutorialInstruction.textContent = tr(message);
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
    tutorialTitle.textContent = tr(step.title);
    tutorialDescription.textContent = tr(step.description);
    setTutorialInstruction(step.instruction ?? '「次へ」で進みます');
    tutorialBackButton.disabled = tutorialIndex === 0;
    tutorialNextButton.disabled = !tutorialStepComplete;
    tutorialNextButton.textContent = tr(tutorialIndex === tutorialSteps.length - 1 ? '完了' : '次へ');
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

    if (step.action === 'add-initial' && button.closest('.add-group') && (!button.matches('.btn-add') || button.dataset.add !== '60')) {
      rejectTutorialAction(event, '練習では「＋1」を押してください');
      return;
    }

    if (step.action === 'add-stopped' && button.closest('.add-group')) {
      if (tutorialPhase === 'add' && (!button.matches('.btn-add') || button.dataset.add !== '300')) {
        rejectTutorialAction(event, '練習では「＋5」を押してください');
      } else if (tutorialPhase === 'undo' && button !== undoAddButton) {
        rejectTutorialAction(event, '「↶」を押してください');
      }
      return;
    }

    if (step.action === 'add-running' && tutorialPhase === 'add' && button.closest('.add-group')) {
      if (!button.matches('.btn-add') || button.dataset.add !== '120') {
        rejectTutorialAction(event, '練習では「＋2」を押してください');
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

    if (step.action === 'add-initial' && button.matches('.btn-add[data-add="60"]')) {
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
      if (tutorialPhase === 'add' && button.matches('.btn-add[data-add="300"]')) {
        tutorialPhase = 'undo';
        setTutorialInstruction('01:00から06:00になりました。次に「↶」を押してください', true);
        setTutorialTarget('.add-group');
      } else if (tutorialPhase === 'undo' && button === undoAddButton) {
        completeTutorialStep('元の01:00へ戻りました。↶は直前の追加だけを取り消します。', '#timer-stage');
      }
      return;
    }

    if (step.action === 'add-running') {
      if (tutorialPhase === 'start' && button === playButton && timerMode === 'countdown' && isRunning) {
        tutorialPhase = 'add';
        setTutorialInstruction('タイマーが動きました。次に「＋2」を押してください', true);
        setTutorialTarget('.add-group');
      } else if (tutorialPhase === 'add' && button.matches('.btn-add[data-add="120"]') && !extensionConfirm.hidden) {
        tutorialPhase = 'confirm';
        setTutorialInstruction('確認画面が出ました。「YES」を押してください');
        setTutorialTarget('#timer-stage');
      } else if (tutorialPhase === 'confirm' && button === extensionYesButton && extensionConfirm.hidden) {
        tutorialPhase = 'done';
        completeTutorialStep('延長できました。残り時間と、時計の「終了」位置が2分ぶん延びています。', '#left-clock-wrap');
      }
    }
  }

  function collectAgendaItems() {
    return Array.from(agendaRowsContainer.querySelectorAll('.agenda-row')).map((row, index) => {
      const title = row.querySelector('[data-agenda-title]').value.trim() || `項目 ${index + 1}`;
      const rawMinutes = Number(row.querySelector('[data-agenda-minutes]').value);
      const minutes = Math.min(1440, Math.max(1, Math.round(rawMinutes || 1)));
      return { title, minutes };
    });
  }

  function updateAgendaTotal() {
    const total = collectAgendaItems().reduce((sum, item) => sum + item.minutes, 0);
    const hours = Math.floor(total / 60);
    const restMinutes = total % 60;
    const readable = hours > 0
      ? `（${hours}時間${restMinutes ? `${restMinutes}分` : ''}）`
      : '';
    agendaTotal.textContent = `合計 ${total}分 ${readable}`.trim();
    agendaTotal.classList.remove('is-off-hour');
    agendaOpenButton.disabled = total <= 0;
  }

  function addAgendaRow(item = { title: '', minutes: 5 }) {
    const row = document.createElement('div');
    row.className = 'agenda-row';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.maxLength = 60;
    titleInput.value = item.title;
    titleInput.placeholder = '進行内容';
    titleInput.setAttribute('data-agenda-title', '');
    titleInput.setAttribute('aria-label', '進行内容');

    const minutesInput = document.createElement('input');
    minutesInput.type = 'number';
    minutesInput.min = '1';
    minutesInput.max = '1440';
    minutesInput.step = '1';
    minutesInput.value = String(item.minutes);
    minutesInput.setAttribute('data-agenda-minutes', '');
    minutesInput.setAttribute('aria-label', `${item.title || '進行項目'}の分数`);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'agenda-remove';
    removeButton.textContent = '×';
    removeButton.setAttribute('aria-label', 'この項目を削除');
    removeButton.addEventListener('click', () => {
      if (agendaRowsContainer.children.length <= 1) return;
      row.remove();
      updateAgendaTotal();
    });

    titleInput.addEventListener('input', updateAgendaTotal);
    minutesInput.addEventListener('input', updateAgendaTotal);
    row.append(titleInput, minutesInput, removeButton);
    agendaRowsContainer.appendChild(row);
    updateAgendaTotal();
  }

  function replaceAgendaRows(items) {
    agendaRowsContainer.replaceChildren();
    (items.length ? items : [{ title: '', minutes: 5 }]).forEach(addAgendaRow);
    updateAgendaTotal();
  }

  function resetAgendaRows() {
    replaceAgendaRows(defaultAgendaItems);
  }

  function setAgendaNote(message, state = '') {
    agendaNote.textContent = message;
    agendaNote.classList.toggle('is-success', state === 'success');
    agendaNote.classList.toggle('is-error', state === 'error');
  }

  function selectedAgendaTheme() {
    const value = agendaThemeInputs.find((input) => input.checked)?.value;
    return agendaThemeIds.includes(value) ? value : 'steady';
  }

  function setAgendaTheme(theme) {
    const safeTheme = agendaThemeIds.includes(theme) ? theme : 'steady';
    agendaThemeInputs.forEach((input) => {
      input.checked = input.value === safeTheme;
    });
  }

  function clearAgendaBackground() {
    if (agendaBackgroundUrl && !launchedAgendaBackgroundUrls.has(agendaBackgroundUrl)) {
      URL.revokeObjectURL(agendaBackgroundUrl);
      agendaBackgroundUrls.delete(agendaBackgroundUrl);
    }
    agendaBackgroundUrl = '';
    agendaBackgroundFileValue = null;
    agendaBackgroundPreview.removeAttribute('src');
    agendaBackgroundPreview.hidden = true;
    agendaBackgroundName.textContent = '未設定';
    agendaBackgroundClearButton.disabled = true;
    agendaBackgroundFile.value = '';
  }

  function setAgendaBackgroundFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setAgendaNote('画像ファイルを選択してください。', 'error');
      agendaBackgroundFile.value = '';
      return;
    }
    if (agendaBackgroundUrl && !launchedAgendaBackgroundUrls.has(agendaBackgroundUrl)) {
      URL.revokeObjectURL(agendaBackgroundUrl);
      agendaBackgroundUrls.delete(agendaBackgroundUrl);
    }
    agendaBackgroundUrl = URL.createObjectURL(file);
    agendaBackgroundFileValue = file;
    agendaBackgroundUrls.add(agendaBackgroundUrl);
    agendaBackgroundPreview.src = agendaBackgroundUrl;
    agendaBackgroundPreview.hidden = false;
    agendaBackgroundName.textContent = file.name;
    agendaBackgroundClearButton.disabled = false;
    setAgendaNote('背景画像を設定しました。開く別窓に反映されます。', 'success');
  }

  function readSavedAgendas() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKeys.agendas) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((agenda) => (
        agenda && typeof agenda.id === 'string' && typeof agenda.name === 'string' && Array.isArray(agenda.items)
      ));
    } catch (_error) {
      return [];
    }
  }

  function writeSavedAgendas(agendas) {
    try {
      localStorage.setItem(storageKeys.agendas, JSON.stringify(agendas));
      return true;
    } catch (_error) {
      setAgendaNote('この環境では進行表を保存できませんでした。CSV書き出しをご利用ください。', 'error');
      return false;
    }
  }

  function refreshSavedAgendas(selectedId = activeAgendaId) {
    const agendas = readSavedAgendas().sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
    agendaSavedSelect.replaceChildren();
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = agendas.length ? '保存した進行表を選択' : '保存した進行表はありません';
    agendaSavedSelect.appendChild(placeholder);
    agendas.forEach((agenda) => {
      const total = agenda.items.reduce((sum, item) => sum + (Number(item.minutes) || 0), 0);
      const option = document.createElement('option');
      option.value = agenda.id;
      option.textContent = `${agenda.name}（${total}分）`;
      agendaSavedSelect.appendChild(option);
    });
    agendaSavedSelect.value = agendas.some((agenda) => agenda.id === selectedId) ? selectedId : '';
    const hasSelection = Boolean(agendaSavedSelect.value);
    agendaLoadButton.disabled = !hasSelection;
    agendaDeleteButton.disabled = !hasSelection;
  }

  function saveAgenda() {
    const name = agendaNameInput.value.trim() || 'ワーク進行表';
    const items = collectAgendaItems();
    const agendas = readSavedAgendas();
    const now = Date.now();
    let agenda = activeAgendaId ? agendas.find((entry) => entry.id === activeAgendaId) : null;
    if (agenda) {
      agenda.name = name;
      agenda.items = items;
      agenda.theme = selectedAgendaTheme();
      agenda.updatedAt = now;
    } else {
      activeAgendaId = window.crypto?.randomUUID?.() || `agenda-${now}-${Math.random().toString(16).slice(2)}`;
      agenda = { id: activeAgendaId, name, items, theme: selectedAgendaTheme(), updatedAt: now };
      agendas.push(agenda);
    }
    if (!writeSavedAgendas(agendas)) return;
    refreshSavedAgendas(activeAgendaId);
    setAgendaNote(`「${name}」をこのブラウザに記録しました。`, 'success');
  }

  function loadSelectedAgenda() {
    const selectedId = agendaSavedSelect.value;
    const agenda = readSavedAgendas().find((entry) => entry.id === selectedId);
    if (!agenda) return;
    activeAgendaId = agenda.id;
    agendaNameInput.value = agenda.name;
    setAgendaTheme(agenda.theme);
    replaceAgendaRows(agenda.items);
    setAgendaNote(`「${agenda.name}」を呼び出しました。`, 'success');
  }

  function deleteSelectedAgenda() {
    const selectedId = agendaSavedSelect.value;
    const agendas = readSavedAgendas();
    const agenda = agendas.find((entry) => entry.id === selectedId);
    if (!agenda) return;
    if (!window.confirm(tr(`保存した「${agenda.name}」を削除しますか？`))) return;
    if (!writeSavedAgendas(agendas.filter((entry) => entry.id !== selectedId))) return;
    if (activeAgendaId === selectedId) activeAgendaId = '';
    refreshSavedAgendas();
    setAgendaNote(`「${agenda.name}」を削除しました。`);
  }

  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportAgendaCsv() {
    const name = agendaNameInput.value.trim() || 'ワーク進行表';
    const theme = selectedAgendaTheme();
    const lines = [
      ['進行表名', 'テーマ', '項目', '時間（分）'],
      ...collectAgendaItems().map((item) => [name, theme, item.title, item.minutes])
    ];
    const csv = `\uFEFF${lines.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${name.replace(/[\\/:*?"<>|]/g, '_') || 'ワーク進行表'}.csv`;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setAgendaNote('CSVを書き出しました。同じCSVを「CSV読み込み」から復元できます。', 'success');
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;
    const source = String(text || '').replace(/^\uFEFF/, '');
    for (let index = 0; index < source.length; index += 1) {
      const character = source[index];
      if (character === '"') {
        if (quoted && source[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          quoted = !quoted;
        }
      } else if (character === ',' && !quoted) {
        row.push(field);
        field = '';
      } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && source[index + 1] === '\n') index += 1;
        row.push(field);
        if (row.some((cell) => cell !== '')) rows.push(row);
        row = [];
        field = '';
      } else {
        field += character;
      }
    }
    row.push(field);
    if (row.some((cell) => cell !== '')) rows.push(row);
    return rows;
  }

  async function importAgendaCsv(file) {
    try {
      const rows = parseCsv(await file.text());
      const header = (rows[0] || []).map((cell) => cell.trim());
      const nameIndex = header.indexOf('進行表名');
      const themeIndex = header.indexOf('テーマ');
      const itemIndex = header.indexOf('項目');
      const minutesIndex = header.indexOf('時間（分）');
      if (nameIndex < 0 || itemIndex < 0 || minutesIndex < 0) {
        throw new Error('header');
      }
      const items = rows.slice(1).map((row, index) => ({
        title: String(row[itemIndex] || '').trim() || `項目 ${index + 1}`,
        minutes: Math.min(1440, Math.max(1, Math.round(Number(row[minutesIndex]) || 1)))
      }));
      if (!items.length) throw new Error('empty');
      activeAgendaId = '';
      agendaNameInput.value = String(rows[1]?.[nameIndex] || 'ワーク進行表').trim() || 'ワーク進行表';
      setAgendaTheme(themeIndex >= 0 ? String(rows[1]?.[themeIndex] || '') : 'steady');
      replaceAgendaRows(items);
      refreshSavedAgendas();
      setAgendaNote('CSVを読み込みました。必要に応じて「記録する」でブラウザにも保存できます。', 'success');
    } catch (_error) {
      setAgendaNote('CSVを読み込めませんでした。この画面から書き出したCSVと同じ形式か確認してください。', 'error');
    } finally {
      agendaImportFile.value = '';
    }
  }

  function openAgenda() {
    if (!tutorialOverlay.hidden) closeTutorial();
    if (!pomodoroOverlay.hidden) closePomodoro();
    const agendaUrl = new URL('agenda.html', window.location.href);
    agendaUrl.searchParams.set('view', 'settings');
    agendaWindow = window.open(agendaUrl.toString(), '_blank');
  }

  function closeAgenda() {
    agendaOverlay.hidden = true;
    body.classList.remove('agenda-popup-open');
    agendaButton.focus();
  }

  function openAgendaFromLocation() {
    if (window.location.hash !== '#agenda-settings') return;
    openAgenda();
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  window.addEventListener('message', (event) => {
    if (!agendaWindow || event.source !== agendaWindow) return;
    if (event.data?.type === 'agenda-ready') {
      if (agendaBackgroundFileValue) {
        const targetOrigin = window.location.protocol === 'file:' ? '*' : window.location.origin;
        agendaWindow.postMessage({ type: 'agenda-background', file: agendaBackgroundFileValue }, targetOrigin);
      }
      return;
    }
    if (event.data?.type !== 'open-agenda-settings') return;
    if (agendaThemeIds.includes(event.data.theme)) setAgendaTheme(event.data.theme);
    if (typeof event.data.title === 'string' && event.data.title.trim()) {
      agendaNameInput.value = event.data.title.trim().slice(0, 60);
    }
    window.focus();
    openAgenda();
  });

  function launchAgendaWindow() {
    const items = collectAgendaItems();
    if (!items.length) return;
    const config = {
      title: agendaNameInput.value.trim() || 'ワーク進行表',
      items,
      theme: selectedAgendaTheme(),
      backgroundImageUrl: agendaBackgroundUrl,
      returnTargetName: mainWindowName,
      createdAt: Date.now()
    };
    const agendaUrl = new URL('agenda.html', window.location.href);
    agendaUrl.searchParams.set('view', 'agenda');
    agendaUrl.searchParams.set('run', String(config.createdAt));
    agendaUrl.hash = encodeURIComponent(JSON.stringify(config));
    agendaWindow = window.open(
      agendaUrl.toString(),
      '_blank'
    );
    if (!agendaWindow) {
      setAgendaNote('別タブ／別ウィンドウを開けませんでした。ブラウザの新しい画面を開く許可を確認してください。', 'error');
      return;
    }
    if (agendaBackgroundUrl) launchedAgendaBackgroundUrls.add(agendaBackgroundUrl);
    setAgendaNote('進行表を別ウィンドウで開始しました。', 'success');
    closeAgenda();
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

  function renderPomodoroMinuteBlocks() {
    if (!isPomodoroMode) {
      pomodoroMinuteBlocks.replaceChildren();
      pomodoroBlockCount = 0;
      return;
    }
    const totalMinutes = pomodoroDurationSeconds() / 60;
    const remainingMinutes = pomodoroAwaitingStart
      ? totalMinutes
      : Math.min(totalMinutes, Math.max(0, Math.ceil(remainingMs / 60000)));
    if (pomodoroBlockCount !== totalMinutes) {
      pomodoroMinuteBlocks.replaceChildren();
      for (let index = 0; index < totalMinutes; index += 1) {
        const block = document.createElement('span');
        block.className = 'pomodoro-minute-block';
        pomodoroMinuteBlocks.appendChild(block);
      }
      pomodoroBlockCount = totalMinutes;
    }
    pomodoroMinuteBlocks.setAttribute('aria-label', `残り約${remainingMinutes}分（全${totalMinutes}ブロック）`);
    Array.from(pomodoroMinuteBlocks.children).forEach((block, index) => {
      block.classList.toggle('is-empty', index >= remainingMinutes);
      block.classList.toggle(
        'is-next',
        isRunning && timerMode === 'countdown' && remainingMinutes > 0 && index === remainingMinutes - 1
      );
    });
  }

  function updateQuickPomodoroStatus() {
    const isQuick = isPomodoroMode && isQuickPomodoroMode;
    quickPomodoroStatus.hidden = !isQuick;
    modeSwitchButton.classList.toggle('is-active', isQuick);
    modeSwitchButton.setAttribute('aria-pressed', String(isQuick));
    if (!isQuick) {
      quickPomodoroStatus.textContent = '';
      quickPomodoroStatus.classList.remove('is-break');
      return;
    }

    const isBreak = pomodoroPhase !== 'focus';
    quickPomodoroStatus.classList.toggle('is-break', isBreak);
    if (isBreak) {
      quickPomodoroStatus.textContent = isRunning ? '☕ 5分休憩中' : '☕ 5分休憩・一時停止中';
    } else {
      const session = pomodoroCompleted + 1;
      quickPomodoroStatus.textContent = isRunning
        ? `🍅 25分ワーク中・${session}回目`
        : `🍅 25分ワーク・${session}回目・一時停止中`;
    }
  }

  function updatePomodoroUi() {
    updateQuickPomodoroStatus();
    if (isQuickPomodoroMode) {
      pomodoroSetup.hidden = false;
      pomodoroSession.hidden = true;
      pomodoroSessionActions.hidden = true;
      pomodoroEndButton.hidden = true;
      pomodoroButton.textContent = '🍅 ポモドーロテクニックモード';
      pomodoroCycleLabel.textContent = '集中と休憩のサイクル';
      pomodoroStartButton.textContent = '🍅 25分集中を始める';
      pomodoroMinuteBlocks.replaceChildren();
      pomodoroBlockCount = 0;
      return;
    }
    pomodoroSetup.hidden = isPomodoroMode;
    pomodoroSession.hidden = !isPomodoroMode;
    pomodoroSessionActions.hidden = !isPomodoroMode;
    pomodoroEndButton.hidden = !isPomodoroMode;

    if (!isPomodoroMode) {
      pomodoroButton.textContent = '🍅 ポモドーロテクニックモード';
      pomodoroCycleLabel.textContent = '集中と休憩のサイクル';
      pomodoroStartButton.textContent = '🍅 25分集中を始める';
      renderPomodoroMinuteBlocks();
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
    renderPomodoroMinuteBlocks();
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
    if (isStandalonePomodoro) {
      window.close();
      return;
    }
    pomodoroOverlay.hidden = true;
    body.classList.remove('pomodoro-popup-open');
  }

  function launchPomodoroWindow() {
    const pomodoroUrl = new URL('index.html', window.location.href);
    pomodoroUrl.searchParams.set('view', 'pomodoro');
    pomodoroUrl.hash = '';
    pomodoroWindow = window.open(pomodoroUrl.toString(), 'ninin-pomodoro');
    if (!pomodoroWindow) {
      window.alert(tr('別タブ／別ウィンドウを開けませんでした。ブラウザの新しい画面を開く許可を確認してください。'));
      return;
    }
    pomodoroWindow.focus();
  }

  function startQuickPomodoroMode() {
    stopAlarm();
    cancelTimerRepeat(true);
    if (!tutorialOverlay.hidden) closeTutorial();
    if (isBreakMode) stopBreakDisplay();
    if (isPomodoroMode) deactivatePomodoroMode();
    pomodoroTask = '';
    pomodoroPhase = 'focus';
    pomodoroCompleted = 0;
    pomodoroAwaitingStart = false;
    pomodoroStatusMessage = '25分のワークと5分の休憩を自動で繰り返します。';
    isPomodoroMode = true;
    isQuickPomodoroMode = true;
    setTime(25 * 60);
    startTimer();
    updatePomodoroUi();
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
    isQuickPomodoroMode = false;
    setTime(pomodoroDurationSeconds());
    startTimer();
    updatePomodoroUi();
  }

  function startNextPomodoroPhase() {
    pomodoroAwaitingStart = false;
    pomodoroStatusMessage = pomodoroPhase === 'focus'
      ? 'この25分は、選んだタスクだけに集中しましょう。'
    : '作業から手を離して、しっかり脳を休ませましょう。';
    setTime(pomodoroDurationSeconds());
    startTimer();
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
    updatePomodoroUi();
  }

  function deactivatePomodoroMode() {
    isPomodoroMode = false;
    isQuickPomodoroMode = false;
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

    if (isQuickPomodoroMode) {
      if (pomodoroPhase === 'focus') {
        pomodoroCompleted += 1;
        pomodoroPhase = 'short-break';
        pomodoroStatusMessage = `${pomodoroCompleted}回目のワークが完了しました。5分休憩します。`;
      } else {
        pomodoroPhase = 'focus';
        pomodoroStatusMessage = `${pomodoroCompleted + 1}回目の25分ワークを開始します。`;
      }
      pomodoroAwaitingStart = false;
      setTime(pomodoroDurationSeconds());
      startTimer({ preserveAlarm: true, preserveRepeat: true });
      updatePomodoroUi();
      return;
    }

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

    // 集中・休憩の区切りでは、次のフェーズへ自動的に移行する。
    // 特に集中終了後は、操作を挟まずそのまま休憩を始める。
    pomodoroAwaitingStart = false;
    setTime(pomodoroDurationSeconds());
    startTimer({ preserveAlarm: true, preserveRepeat: true });
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
    if (!isCountdown) hideAnalogTimerPreview();
    digitalText.hidden = !isDigitalClockVisible;
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
    body.classList.toggle('timer-ended', isCountdown && hasEnded);
    playButton.textContent = countdownRunning ? 'Ⅱ タイマー停止' : '▶ タイマー開始';
    playButton.classList.toggle('pause', countdownRunning);
    playButton.classList.toggle('primary', isCountdown && !countdownRunning);
    adjustmentLabel.textContent = countdownRunning ? '延長' : '設定';
    adjustmentControls.setAttribute('aria-label', countdownRunning ? '実行中のタイマーを延長' : 'タイマー時間の設定');
    stopwatchButton.textContent = stopwatchRunning ? 'ストップウォッチ\n停止' : 'ストップウォッチ\n開始';
    stopwatchButton.classList.toggle('pause', stopwatchRunning);
    stopwatchButton.classList.toggle('stopwatch', !stopwatchRunning);
    undoAddButton.disabled = !isCountdown || addHistory.length === 0;
    subtractMinuteButton.disabled = !isCountdown || seconds <= 0;
    stagePlayButton.textContent = countdownRunning ? 'Ⅱ' : '▶';
    stagePlayButton.classList.toggle('is-active', countdownRunning);
    stagePlayButton.setAttribute('aria-label', countdownRunning ? 'タイマーを停止' : 'タイマーを開始');
    stagePlayButton.title = countdownRunning ? 'タイマー停止' : 'タイマー開始';
    stageStopwatchButton.classList.toggle('is-active', stopwatchRunning);
    stageStopwatchButton.setAttribute('aria-label', stopwatchRunning ? 'ストップウォッチを停止' : 'ストップウォッチを開始');
    stageStopwatchButton.title = stopwatchRunning ? 'ストップウォッチ停止' : 'ストップウォッチ開始';
    stageMinusButton.disabled = !isCountdown || seconds <= 0;
    if (isStandalonePomodoro) {
      document.title = `${displayTime}｜${isPomodoroMode ? pomodoroPhaseLabel() : 'ポモドーロテクニック'}`;
    } else if (seconds > 0 || isRunning || hasEnded) {
      document.title = `${displayTime}｜${isCountdown ? 'タイマー' : 'ストップウォッチ'}｜ワークショップタイマー`;
    } else {
      document.title = tr(searchDocumentTitle);
    }
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
    hideAnalogTimerPreview();
    body.classList.remove('is-stopwatch-mode');
    body.classList.remove('timer-ended');
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
    stopAlarm();
    cancelTimerRepeat(true);
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
    digitalText.hidden = !isDigitalClockVisible;
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

  function stopAlarm() {
    if (alarmLoopTimer !== null) {
      window.clearTimeout(alarmLoopTimer);
      alarmLoopTimer = null;
    }
    if (alarmAutoStopTimer !== null) {
      window.clearTimeout(alarmAutoStopTimer);
      alarmAutoStopTimer = null;
    }
    activeAlarmOscillators.forEach((oscillator) => {
      try { oscillator.stop(); } catch {}
    });
    activeAlarmOscillators.clear();
    try { navigator.vibrate?.(0); } catch {}
  }

  function playTone(ctx, frequency, start, duration, type = 'sine', gainScale = 1) {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, 0.45 * alarmVolume * gainScale), start + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    activeAlarmOscillators.add(oscillator);
    oscillator.addEventListener('ended', () => activeAlarmOscillators.delete(oscillator), { once: true });
    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  function playAlarmPattern(preset = alarmSoundPreset, startTime = null, gainScale = 1) {
    if (preset === 'vibration') {
      try { navigator.vibrate?.([180, 90, 180]); } catch {}
      return 0.55;
    }
    const ctx = ensureAudio();
    if (!ctx) return 0;
    const pattern = alarmSoundPatterns[preset] || alarmSoundPatterns.gentle;
    const base = startTime ?? (ctx.currentTime + 0.02);
    let duration = 0;
    pattern.forEach((tone) => {
      playTone(
        ctx,
        tone.frequency,
        base + tone.at,
        tone.duration,
        tone.type,
        tone.gain * gainScale
      );
      duration = Math.max(duration, tone.at + tone.duration);
    });
    return duration;
  }

  function playAlarm({ autoStopAfterMs = 0 } = {}) {
    stopAlarm();
    if (suppressAlarm || alarmVolume <= 0) return;

    if (alarmSoundPreset === 'vibration') {
      const vibrationPattern = alarmPlayMode === 'once'
        ? [260]
        : [260, 180, 260, 180, 420];
      try { navigator.vibrate?.(vibrationPattern); } catch {}
      if (alarmPlayMode === 'continuous') {
        const vibrateAgain = () => {
          try { navigator.vibrate?.(vibrationPattern); } catch {}
          alarmLoopTimer = window.setTimeout(vibrateAgain, 1700);
        };
        alarmLoopTimer = window.setTimeout(vibrateAgain, 1700);
      }
    } else {
      const ctx = ensureAudio();
      if (!ctx) return;
      const firstStart = ctx.currentTime + 0.02;
      const patternDuration = playAlarmPattern(alarmSoundPreset, firstStart);
      const cycleSeconds = Math.max(0.8, patternDuration + 0.55);
      if (alarmPlayMode === 'triple') {
        playAlarmPattern(alarmSoundPreset, firstStart + cycleSeconds);
        playAlarmPattern(alarmSoundPreset, firstStart + (cycleSeconds * 2));
      } else if (alarmPlayMode === 'continuous') {
        const playAgain = () => {
          const activeContext = ensureAudio();
          if (!activeContext || alarmVolume <= 0) return;
          playAlarmPattern(alarmSoundPreset, activeContext.currentTime + 0.02);
          alarmLoopTimer = window.setTimeout(playAgain, cycleSeconds * 1000);
        };
        alarmLoopTimer = window.setTimeout(playAgain, cycleSeconds * 1000);
      }
    }

    if (autoStopAfterMs > 0) {
      alarmAutoStopTimer = window.setTimeout(stopAlarm, autoStopAfterMs);
    }
  }

  function previewAlarm() {
    stopAlarm();
    if (alarmVolume <= 0) return;
    playAlarmPattern(alarmSoundPreset);
  }

  function configuredPreAlertThresholds() {
    if (timerPreAlertMode === 'both') return [60, 10];
    if (timerPreAlertMode === '60') return [60];
    if (timerPreAlertMode === '10') return [10];
    return [];
  }

  function refreshPreAlertEligibility() {
    const seconds = secondsForDisplay();
    preAlertEligible.clear();
    [60, 10].forEach((threshold) => {
      if (seconds > threshold) {
        preAlertEligible.add(threshold);
        preAlertsFired.delete(threshold);
      }
    });
  }

  function maybePlayPreAlert(seconds) {
    if (suppressAlarm || alarmVolume <= 0 || !isRunning || timerMode !== 'countdown') return;
    configuredPreAlertThresholds().forEach((threshold) => {
      if (!preAlertEligible.has(threshold) || seconds > threshold || preAlertsFired.has(threshold)) return;
      preAlertsFired.add(threshold);
      if (alarmSoundPreset === 'vibration') {
        try { navigator.vibrate?.([90, 80, 90]); } catch {}
        return;
      }
      const ctx = ensureAudio();
      if (!ctx) return;
      const start = ctx.currentTime + 0.02;
      playTone(ctx, threshold === 60 ? 659.25 : 880, start, 0.18, 'sine', 0.34);
      playTone(ctx, threshold === 60 ? 783.99 : 1046.5, start + 0.22, 0.28, 'sine', 0.32);
    });
  }

  function repeatLimit() {
    if (timerRepeatCount === 'infinite') return Number.POSITIVE_INFINITY;
    const parsed = Number(timerRepeatCount);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function hideTimerRepeatStatus() {
    timerRepeatStatus.hidden = true;
    timerRepeatStatus.textContent = '';
  }

  function updateTimerRepeatStatus() {
    if (repeatRestartTimer === null || repeatRestartAt <= 0) {
      hideTimerRepeatStatus();
      return;
    }
    const remainingSeconds = Math.max(0, Math.ceil((repeatRestartAt - Date.now()) / 1000));
    const total = repeatLimit();
    const progress = Number.isFinite(total)
      ? `${timerRepeatCompleted}/${total} 完了`
      : `${timerRepeatCompleted}回 完了`;
    timerRepeatStatus.textContent = `次の開始まで ${formatTime(remainingSeconds)} ・ ${progress}`;
    timerRepeatStatus.hidden = false;
  }

  function cancelTimerRepeat(resetProgress = true) {
    if (repeatRestartTimer !== null) window.clearTimeout(repeatRestartTimer);
    if (repeatStatusTicker !== null) window.clearInterval(repeatStatusTicker);
    repeatRestartTimer = null;
    repeatStatusTicker = null;
    repeatRestartAt = 0;
    hideTimerRepeatStatus();
    if (resetProgress) {
      timerRepeatCompleted = 0;
      repeatDurationSeconds = 0;
      repeatCycleActive = false;
    }
  }

  function scheduleTimerRepeat() {
    const limit = repeatLimit();
    if (limit <= 0 || repeatDurationSeconds <= 0) return false;
    timerRepeatCompleted += 1;
    if (Number.isFinite(limit) && timerRepeatCompleted >= limit) return false;

    repeatCycleActive = true;
    const intervalMs = Math.max(0, timerRepeatIntervalSeconds) * 1000;
    repeatRestartAt = Date.now() + intervalMs;
    const restart = () => {
      if (repeatStatusTicker !== null) window.clearInterval(repeatStatusTicker);
      repeatRestartTimer = null;
      repeatStatusTicker = null;
      repeatRestartAt = 0;
      hideTimerRepeatStatus();
      const keepFiniteAlarm = alarmPlayMode !== 'continuous';
      if (!keepFiniteAlarm) stopAlarm();
      setTime(repeatDurationSeconds, { preserveRepeat: true });
      startTimer({ preserveAlarm: keepFiniteAlarm, preserveRepeat: true });
    };
    repeatRestartTimer = window.setTimeout(restart, intervalMs);
    repeatStatusTicker = window.setInterval(updateTimerRepeatStatus, 250);
    updateTimerRepeatStatus();
    return true;
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
    playAlarm({ autoStopAfterMs: isPomodoroMode && alarmPlayMode === 'continuous' ? 6000 : 0 });
    if (isPomodoroMode) {
      completePomodoroPhase();
      return;
    }
    if (!scheduleTimerRepeat()) repeatCycleActive = false;
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
    maybePlayPreAlert(Math.ceil(remainingMs / 1000));
    renderTimer();
  }

  function startTimer({ preserveAlarm = false, preserveRepeat = false } = {}) {
    if (!preserveAlarm) stopAlarm();
    if (repeatRestartTimer !== null && !preserveRepeat) {
      const interruptedRepeatDuration = repeatDurationSeconds || lastSetSeconds;
      cancelTimerRepeat(true);
      if (remainingMs <= 0 && interruptedRepeatDuration > 0) {
        remainingMs = interruptedRepeatDuration * 1000;
        syncManualSelectors(interruptedRepeatDuration);
      }
    }
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
    if (!hasStartedCurrentCountdown) {
      lastSetSeconds = startingSeconds;
      hasStartedCurrentCountdown = true;
    }
    if (!isPomodoroMode && !repeatCycleActive) {
      timerRepeatCompleted = 0;
      repeatDurationSeconds = startingSeconds;
      repeatCycleActive = true;
    }
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
    stopAlarm();
    cancelTimerRepeat(true);
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

  function setTime(totalSeconds, { preserveRepeat = false } = {}) {
    if (!preserveRepeat) cancelTimerRepeat(true);
    if (isBreakMode) stopBreakDisplay();
    pauseTimer();
    timerMode = 'countdown';
    const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    clockPreviewMode = 'countdown';
    lastSetSeconds = safeSeconds;
    hasStartedCurrentCountdown = false;
    remainingMs = safeSeconds * 1000;
    hasEnded = false;
    clearAddHistory();
    syncManualSelectors(safeSeconds);
    preAlertsFired.clear();
    refreshPreAlertEligibility();
    renderTimer();
  }

  function previewManualTime() {
    stopAlarm();
    cancelTimerRepeat(true);
    if (isPomodoroMode) deactivatePomodoroMode();
    if (isBreakMode) stopBreakDisplay();
    pauseTimer();
    timerMode = 'countdown';
    clockPreviewMode = 'countdown';
    remainingMs = readManualSeconds() * 1000;
    hasStartedCurrentCountdown = false;
    hasEnded = false;
    clearAddHistory();
    preAlertsFired.clear();
    refreshPreAlertEligibility();
    renderTimer();
    showAnalogTimerPreview();
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
    stopAlarm();
    if (!isRunning) cancelTimerRepeat(true);
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'countdown') {
      pauseTimer();
      timerMode = 'countdown';
    }
    const increment = Math.max(0, Number(seconds) || 0) * 1000;
    if (increment <= 0) return;
    if (!isRunning && (hasEnded || remainingMs <= 0)) hasStartedCurrentCountdown = false;
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
    refreshPreAlertEligibility();
    renderTimer();
    showAnalogTimerPreview();
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

  function subtractTime(seconds) {
    stopAlarm();
    if (!isRunning) cancelTimerRepeat(true);
    if (isBreakMode) stopBreakDisplay();
    if (timerMode !== 'countdown') {
      pauseTimer();
      timerMode = 'countdown';
    }
    const requested = Math.max(0, Number(seconds) || 0) * 1000;
    const current = isRunning ? Math.max(0, endAt - Date.now()) : remainingMs;
    const decrement = Math.min(requested, current);
    if (decrement <= 0) return;
    if (!isRunning && hasEnded) hasStartedCurrentCountdown = false;
    clockPreviewMode = 'countdown';
    addHistory.push(-decrement);
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
    showAnalogTimerPreview();
  }

  function undoLastAdd() {
    stopAlarm();
    if (!isRunning) cancelTimerRepeat(true);
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
    showAnalogTimerPreview();
  }

  function resetTimer() {
    stopAlarm();
    if (timerMode === 'stopwatch') {
      pauseTimer();
      stopwatchElapsedMs = 0;
      renderTimer();
      hideAnalogTimerPreview();
      return;
    }
    setTime(lastSetSeconds);
    showAnalogTimerPreview();
  }

  function clearTimer() {
    stopAlarm();
    if (timerMode === 'stopwatch') {
      pauseTimer();
      stopwatchElapsedMs = 0;
      renderTimer();
      hideAnalogTimerPreview();
      return;
    }
    setTime(0);
    showAnalogTimerPreview();
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
    if (controlsHidden) closeSoundSettings();
    body.classList.toggle('controls-hidden', controlsHidden);
    if (!controlsHidden) {
      const current = Number.parseFloat(topPane.style.height) || (topPane.getBoundingClientRect().height / uiScale);
      applyTopPaneHeight(current, false);
      keepDividerVisible();
    }
    syncMinimumWindowSize();
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
  stagePlusButton.addEventListener('click', () => addTime(60));
  stageMinusButton.addEventListener('click', () => subtractTime(60));
  stagePlayButton.addEventListener('click', toggleTimer);
  stageResetButton.addEventListener('click', resetTimer);
  stageClearButton.addEventListener('click', () => {
    if (isPomodoroMode) stopPomodoroMode();
    else clearTimer();
  });
  stageStopwatchButton.addEventListener('click', toggleStopwatch);
  windowShrinkButton.addEventListener('click', shrinkControlSections);
  windowExpandButton.addEventListener('click', expandControlSections);
  modeSwitchButton.addEventListener('click', startQuickPomodoroMode);
  timerVolumeSlider.addEventListener('input', (event) => applyAlarmVolume(event.target.value, true));
  timerVolumeIcon.addEventListener('click', () => {
    if (alarmVolume > 0) {
      storeNumber(storageKeys.alarmVolumeBeforeMute, alarmVolumeBeforeMute);
      applyAlarmVolume(0, true);
    } else {
      applyAlarmVolume(alarmVolumeBeforeMute || 100, true);
    }
  });
  soundSettingsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (soundSettingsPopover.hidden) openSoundSettings();
    else closeSoundSettings({ restoreFocus: true });
  });
  soundSettingsCloseButton.addEventListener('click', () => closeSoundSettings({ restoreFocus: true }));
  soundSettingsPopover.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('click', () => closeSoundSettings());
  window.addEventListener('resize', positionSoundSettingsPopover);
  alarmPreviewButton.addEventListener('click', previewAlarm);
  alarmSoundSelect.addEventListener('change', () => {
    stopAlarm();
    alarmSoundPreset = validAlarmSounds.has(alarmSoundSelect.value) ? alarmSoundSelect.value : 'gentle';
    storeChoice(storageKeys.alarmSoundPreset, alarmSoundPreset);
  });
  alarmPlayModeSelect.addEventListener('change', () => {
    stopAlarm();
    alarmPlayMode = validAlarmPlayModes.has(alarmPlayModeSelect.value) ? alarmPlayModeSelect.value : 'triple';
    storeChoice(storageKeys.alarmPlayMode, alarmPlayMode);
  });
  timerRepeatCountSelect.addEventListener('change', () => {
    if (repeatRestartTimer !== null) cancelTimerRepeat(true);
    timerRepeatCount = validTimerRepeatCounts.has(timerRepeatCountSelect.value) ? timerRepeatCountSelect.value : 'off';
    timerRepeatIntervalSelect.disabled = timerRepeatCount === 'off';
    if (timerRepeatCount === 'off') cancelTimerRepeat(true);
    storeChoice(storageKeys.timerRepeatCount, timerRepeatCount);
  });
  timerRepeatIntervalSelect.addEventListener('change', () => {
    if (repeatRestartTimer !== null) cancelTimerRepeat(true);
    const selected = validTimerIntervals.has(timerRepeatIntervalSelect.value) ? timerRepeatIntervalSelect.value : '0';
    timerRepeatIntervalSeconds = Number(selected);
    storeChoice(storageKeys.timerRepeatInterval, selected);
  });
  timerPreAlertSelect.addEventListener('change', () => {
    timerPreAlertMode = validPreAlertModes.has(timerPreAlertSelect.value) ? timerPreAlertSelect.value : 'off';
    refreshPreAlertEligibility();
    storeChoice(storageKeys.timerPreAlert, timerPreAlertMode);
  });
  document.getElementById('btn-reset').addEventListener('click', resetTimer);
  document.getElementById('btn-clear').addEventListener('click', () => {
    if (isPomodoroMode) stopPomodoroMode();
    else clearTimer();
  });

  document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', () => addTime(Number(button.dataset.add)));
  });

  subtractMinuteButton.addEventListener('click', () => subtractTime(60));
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

  resetAgendaRows();
  refreshSavedAgendas();
  agendaButton.addEventListener('click', openAgenda);
  agendaCloseButton.addEventListener('click', closeAgenda);
  agendaCancelButton.addEventListener('click', closeAgenda);
  agendaAddButton.addEventListener('click', () => {
    addAgendaRow();
    agendaRowsContainer.lastElementChild?.querySelector('input')?.focus();
  });
  agendaSavedSelect.addEventListener('change', () => {
    const hasSelection = Boolean(agendaSavedSelect.value);
    agendaLoadButton.disabled = !hasSelection;
    agendaDeleteButton.disabled = !hasSelection;
  });
  agendaLoadButton.addEventListener('click', loadSelectedAgenda);
  agendaSaveButton.addEventListener('click', saveAgenda);
  agendaDeleteButton.addEventListener('click', deleteSelectedAgenda);
  agendaExportButton.addEventListener('click', exportAgendaCsv);
  agendaImportFile.addEventListener('change', () => {
    const [file] = agendaImportFile.files;
    if (file) void importAgendaCsv(file);
  });
  agendaBackgroundFile.addEventListener('change', () => {
    const [file] = agendaBackgroundFile.files;
    if (file) setAgendaBackgroundFile(file);
  });
  agendaBackgroundClearButton.addEventListener('click', clearAgendaBackground);
  agendaOpenButton.addEventListener('click', launchAgendaWindow);
  agendaOverlay.addEventListener('click', (event) => {
    if (event.target === agendaOverlay) closeAgenda();
  });

  pomodoroButton.addEventListener('click', launchPomodoroWindow);
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
    if (!soundSettingsPopover.hidden) {
      event.preventDefault();
      closeSoundSettings({ restoreFocus: true });
      return;
    }
    if (!agendaOverlay.hidden) {
      event.preventDefault();
      closeAgenda();
      return;
    }
    if (!pomodoroOverlay.hidden) {
      event.preventDefault();
      closePomodoro();
      return;
    }
    if (tutorialOverlay.hidden) return;
    event.preventDefault();
    closeTutorial();
  });

  window.addEventListener('beforeunload', () => {
    agendaBackgroundUrls.forEach((url) => URL.revokeObjectURL(url));
  });

  window.addEventListener('hashchange', openAgendaFromLocation);

  [selHour, selMin, selSec].forEach((select) => {
    select.addEventListener('input', previewManualTime);
  });

  document.getElementById('btn-set-manual').addEventListener('click', () => {
    const manualSeconds = readManualSeconds();
    if (isPomodoroMode) stopPomodoroMode();
    setTime(manualSeconds);
    showAnalogTimerPreview();
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

  function syncClockVisibility() {
    const showLeftClock = leftClockCheckbox.checked;
    const showRightClock = rightClockCheckbox.checked;

    isDigitalClockVisible = showRightClock;
    leftClockWrap.hidden = !showLeftClock;
    timerStage.hidden = !showRightClock;
    clockResizer.hidden = !(showLeftClock && showRightClock);
    body.classList.toggle('right-clock-hidden', !showRightClock);
    if (!isBreakMode) digitalText.hidden = !showRightClock;
    if (showRightClock || !showLeftClock) hideAnalogTimerPreview();
  }

  leftClockCheckbox.addEventListener('change', syncClockVisibility);
  rightClockCheckbox.addEventListener('change', syncClockVisibility);

  document.getElementById('chk-bgclock').addEventListener('change', (event) => {
    bgClock.hidden = !event.target.checked;
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
      const relativeY = (event.clientY - topPane.getBoundingClientRect().top) / uiScale;
      const maximum = Math.max(120, appShell.clientHeight - titlebarHeight - 86);
      applyTopPaneHeight(Math.min(maximum, relativeY), true);
    }

    if (isClockResizing && !leftClockWrap.hidden) {
      const paneLeft = topPane.getBoundingClientRect().left;
      const dividerWidth = Math.max(12, clockResizer.offsetWidth);
      const availableWidth = Math.max(1, topPane.clientWidth - dividerWidth);
      const logicalX = (event.clientX - paneLeft) / uiScale;
      applyLeftClockRatio(logicalX / availableWidth, true);
    }
  });

  window.addEventListener('pointerup', () => {
    isResizing = false;
    isClockResizing = false;
    clockResizer.classList.remove('is-active');
    body.style.userSelect = '';
  });

  window.addEventListener('message', (event) => {
    if (event.source !== compactWindowRef) return;
    if (event.data?.type === 'ninin-timer-compact-ready') {
      suppressAlarm = true;
    } else if (event.data?.type === 'ninin-timer-compact-closed') {
      suppressAlarm = false;
      if (compactWindowRef?.closed) compactWindowRef = null;
    }
  });

  if (isCompactBrowserWindow) {
    window.addEventListener('pagehide', () => {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'ninin-timer-compact-closed' }, '*');
      }
    });
  }

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

  syncClockVisibility();
  openAgendaFromLocation();
  if (isStandalonePomodoro) {
    body.classList.add('standalone-pomodoro');
    document.title = 'ポモドーロテクニック｜Workshop Timer';
    openPomodoro();
  }
  if (!restoreWindowTransferState()) renderTimer();
  if (isCompactBrowserWindow && window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: 'ninin-timer-compact-ready' }, '*');
  }
  window.TimerI18n?.apply(document.documentElement);
})();
