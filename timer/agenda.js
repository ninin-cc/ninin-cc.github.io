(() => {
  'use strict';

  const fallbackItems = [
    { title: 'オープニング・ゴール確認', minutes: 5 },
    { title: 'テーマと進め方の説明', minutes: 10 },
    { title: '個人・グループワーク', minutes: 20 },
    { title: '共有・対話', minutes: 15 },
    { title: 'まとめ・次の一歩', minutes: 10 }
  ];
  const themeIds = ['fun', 'gentle', 'steady', 'healing'];

  function readConfig() {
    try {
      const raw = decodeURIComponent(window.location.hash.slice(1));
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed.items)
        ? parsed.items.map((item, index) => ({
          title: String(item.title || `項目 ${index + 1}`).slice(0, 60),
          minutes: Math.min(1440, Math.max(1, Math.round(Number(item.minutes) || 1)))
        }))
        : [];
      if (!items.length) throw new Error('empty agenda');
      const theme = themeIds.includes(parsed.theme) ? parsed.theme : 'steady';
      const backgroundImageUrl = String(parsed.backgroundImageUrl || '');
      return {
        title: String(parsed.title || 'ワーク進行表').slice(0, 60),
        items,
        theme,
        backgroundImageUrl: backgroundImageUrl.startsWith('blob:') ? backgroundImageUrl : '',
        returnTargetName: String(parsed.returnTargetName || '')
      };
    } catch (_error) {
      return { title: 'ワーク進行表', items: fallbackItems, theme: 'steady', backgroundImageUrl: '', returnTargetName: '' };
    }
  }

  const config = readConfig();
  document.body.dataset.agendaTheme = config.theme;
  const backgroundImage = document.getElementById('agenda-background-image');
  let localBackgroundUrl = '';
  if (config.backgroundImageUrl) {
    backgroundImage.src = config.backgroundImageUrl;
    backgroundImage.hidden = false;
    document.body.classList.add('has-background-image');
    backgroundImage.addEventListener('error', () => {
      backgroundImage.hidden = true;
      document.body.classList.remove('has-background-image');
    }, { once: true });
  }
  const items = config.items.map((item) => ({ ...item, durationMs: item.minutes * 60 * 1000 }));
  let totalMs = 0;
  const cumulativeEnds = [];

  function recalculateSchedule() {
    cumulativeEnds.length = 0;
    totalMs = items.reduce((sum, item, index) => {
      item.durationMs = item.minutes * 60 * 1000;
      const next = sum + item.durationMs;
      cumulativeEnds[index] = next;
      return next;
    }, 0);
  }

  recalculateSchedule();

  const title = document.getElementById('agenda-window-title');
  const runStatus = document.getElementById('run-status');
  const overallRemaining = document.getElementById('overall-remaining');
  const themeInputs = Array.from(document.querySelectorAll('input[name="live-theme"]'));
  const elapsedTime = document.getElementById('elapsed-time');
  const agendaList = document.getElementById('agenda-list');
  const toggleButton = document.getElementById('btn-toggle');
  const prevButton = document.getElementById('btn-prev');
  const nextButton = document.getElementById('btn-next');
  const restartButton = document.getElementById('btn-restart');
  const settingsView = document.getElementById('agenda-settings-view');
  const progressView = document.getElementById('agenda-progress-view');
  const settingsTab = document.getElementById('tab-agenda-settings');
  const progressTab = document.getElementById('tab-agenda-progress');
  const liveBackgroundFile = document.getElementById('agenda-live-background-file');
  const liveBackgroundClearButton = document.getElementById('btn-live-background-clear');
  const panelTransparency = document.getElementById('agenda-panel-transparency');
  const panelTransparencyValue = document.getElementById('agenda-panel-transparency-value');
  liveBackgroundClearButton.disabled = !config.backgroundImageUrl;

  let isRunning = false;
  let elapsedBeforeRun = 0;
  let runStartedAt = Date.now();
  let hasProgressStarted = ['progress', 'agenda'].includes(new URL(window.location.href).searchParams.get('view'));

  function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function formatMinutePoint(ms) {
    return `${Math.round(ms / 60000)}分`;
  }

  function getElapsed() {
    const live = isRunning ? Date.now() - runStartedAt : 0;
    return Math.min(totalMs, Math.max(0, elapsedBeforeRun + live));
  }

  function setElapsed(nextElapsed) {
    elapsedBeforeRun = Math.min(totalMs, Math.max(0, nextElapsed));
    runStartedAt = Date.now();
    if (elapsedBeforeRun >= totalMs) isRunning = false;
    render();
  }

  function findCurrentIndex(elapsed) {
    const found = cumulativeEnds.findIndex((end) => elapsed < end);
    return found === -1 ? items.length - 1 : found;
  }

  function segmentStartAt(index) {
    return index <= 0 ? 0 : cumulativeEnds[index - 1];
  }

  function buildList() {
    agendaList.replaceChildren();
    items.forEach((item, index) => {
      const row = document.createElement('li');
      row.className = 'agenda-item';
      row.dataset.index = String(index);

      const number = document.createElement('span');
      number.className = 'agenda-item-index';
      number.textContent = String(index + 1);

      const name = document.createElement('strong');
      name.textContent = item.title;

      const timing = document.createElement('span');
      timing.className = 'agenda-item-time';
      timing.textContent = `${formatMinutePoint(segmentStartAt(index))}–${formatMinutePoint(cumulativeEnds[index])} ・ ${item.minutes}分`;

      const visual = document.createElement('div');
      visual.className = 'agenda-item-visual';
      const visualMeta = document.createElement('div');
      visualMeta.className = 'agenda-item-visual-meta';
      const visualRemaining = document.createElement('strong');
      visualRemaining.className = 'agenda-item-remaining';
      const blocks = document.createElement('div');
      blocks.className = 'agenda-minute-blocks';
      blocks.setAttribute('aria-label', `${item.title}、全${item.minutes}分、1ブロック1分`);

      const blockLine = document.createElement('div');
      blockLine.className = 'agenda-block-line';
      const adjust = document.createElement('div');
      adjust.className = 'agenda-minute-adjust';

      const minusButton = document.createElement('button');
      minusButton.type = 'button';
      minusButton.className = 'agenda-minute-adjust-button';
      minusButton.dataset.adjust = 'minus';
      minusButton.textContent = '−';
      minusButton.setAttribute('aria-label', `${item.title}を1分減らす`);
      minusButton.addEventListener('click', () => adjustItemMinutes(index, -1));

      const plusButton = document.createElement('button');
      plusButton.type = 'button';
      plusButton.className = 'agenda-minute-adjust-button';
      plusButton.dataset.adjust = 'plus';
      plusButton.textContent = '＋';
      plusButton.setAttribute('aria-label', `${item.title}を1分増やす`);
      plusButton.addEventListener('click', () => adjustItemMinutes(index, 1));

      adjust.append(minusButton, plusButton);
      blockLine.append(adjust, blocks);
      visualMeta.append(visualRemaining);
      visual.append(visualMeta, blockLine);

      row.append(number, name, timing, visual);
      agendaList.appendChild(row);
    });
  }

  function adjustItemMinutes(index, delta) {
    const item = items[index];
    if (!item) return;

    const nextMinutes = Math.min(1440, Math.max(1, item.minutes + delta));
    if (nextMinutes === item.minutes) return;

    const previousTotalMs = totalMs;
    const elapsed = getElapsed();
    const wasRunning = isRunning && elapsed < previousTotalMs;

    item.minutes = nextMinutes;
    recalculateSchedule();
    elapsedBeforeRun = Math.min(elapsed, totalMs);
    runStartedAt = Date.now();
    isRunning = wasRunning && elapsedBeforeRun < totalMs;
    render();
  }

  function renderMinuteBlocks(row, totalBlocks, remainingBlocks, running) {
    const blocks = row.querySelector('.agenda-minute-blocks');
    const previousCount = Number(blocks.dataset.count || -1);
    if (previousCount !== totalBlocks) {
      const fragment = document.createDocumentFragment();
      for (let index = 0; index < totalBlocks; index += 1) {
        const block = document.createElement('span');
        block.className = 'agenda-minute-block';
        fragment.appendChild(block);
      }
      blocks.replaceChildren(fragment);
      blocks.dataset.count = String(totalBlocks);
    }
    blocks.setAttribute('aria-label', `全${totalBlocks}分、残り約${remainingBlocks}分、1ブロック1分`);
    Array.from(blocks.children).forEach((block, index, allBlocks) => {
      block.classList.toggle('is-used', index >= remainingBlocks);
      block.classList.toggle('is-next', running && index === remainingBlocks - 1);
    });
  }

  function render() {
    const elapsed = getElapsed();
    const completed = elapsed >= totalMs;
    const currentIndex = findCurrentIndex(elapsed);
    const item = items[currentIndex];
    const segmentStart = segmentStartAt(currentIndex);
    const segmentElapsed = Math.max(0, elapsed - segmentStart);
    const segmentLeft = Math.max(0, item.durationMs - segmentElapsed);

    overallRemaining.textContent = formatDuration(totalMs - elapsed);
    elapsedTime.textContent = `経過 ${formatDuration(elapsed)}`;

    if (completed) {
      runStatus.textContent = '完了';
      runStatus.className = 'run-status is-complete';
      toggleButton.textContent = '終了';
      toggleButton.disabled = true;
      document.title = `完了｜${config.title}`;
    } else {
      const waitingToStart = !isRunning && elapsed <= 0;
      runStatus.textContent = isRunning ? '進行中' : (waitingToStart ? '開始前' : '一時停止中');
      runStatus.className = `run-status${isRunning ? '' : ' is-paused'}`;
      toggleButton.textContent = isRunning ? '一時停止' : (waitingToStart ? 'スタート' : '再開');
      toggleButton.disabled = false;
      document.title = `${formatDuration(totalMs - elapsed)}｜${item.title}`;
    }

    Array.from(agendaList.children).forEach((row, index) => {
      const isCurrent = !completed && index === currentIndex;
      const isComplete = completed || index < currentIndex;
      const rowItem = items[index];
      let remainingBlocks = rowItem.minutes;
      let remainingLabel = '';

      if (isComplete) {
        remainingBlocks = 0;
      } else if (isCurrent) {
        remainingBlocks = Math.ceil(segmentLeft / 60000);
        remainingLabel = `残り ${formatDuration(segmentLeft)}`;
      }

      row.classList.toggle('is-current', isCurrent);
      row.classList.toggle('is-complete', isComplete);
      row.toggleAttribute('aria-current', isCurrent);
      row.querySelector('.agenda-item-time').textContent = `${formatMinutePoint(segmentStartAt(index))}–${formatMinutePoint(cumulativeEnds[index])} ・ ${rowItem.minutes}分`;
      row.querySelector('.agenda-item-remaining').textContent = remainingLabel;
      row.querySelector('[data-adjust="minus"]').disabled = rowItem.minutes <= 1;
      row.querySelector('[data-adjust="plus"]').disabled = rowItem.minutes >= 1440;
      renderMinuteBlocks(row, rowItem.minutes, remainingBlocks, isCurrent && isRunning);
    });
    if (!settingsView.hidden) document.title = `設定｜${config.title || 'ワーク進行表'}`;
  }

  function toggleRun() {
    if (getElapsed() >= totalMs) return;
    if (isRunning) {
      elapsedBeforeRun = getElapsed();
      isRunning = false;
    } else {
      runStartedAt = Date.now();
      isRunning = true;
    }
    render();
  }

  function goNext() {
    const elapsed = getElapsed();
    const currentIndex = findCurrentIndex(elapsed);
    setElapsed(cumulativeEnds[currentIndex]);
  }

  function goPrevious() {
    const elapsed = getElapsed();
    const currentIndex = findCurrentIndex(elapsed);
    const currentStart = segmentStartAt(currentIndex);
    const nextPosition = elapsed - currentStart > 5000
      ? currentStart
      : segmentStartAt(Math.max(0, currentIndex - 1));
    if (!isRunning && elapsedBeforeRun >= totalMs) isRunning = false;
    setElapsed(nextPosition);
  }

  function restart() {
    elapsedBeforeRun = 0;
    runStartedAt = Date.now();
    isRunning = false;
    toggleButton.disabled = false;
    render();
  }

  function setActiveView(view) {
    const showSettings = view === 'settings';
    if (showSettings && isRunning) {
      elapsedBeforeRun = getElapsed();
      isRunning = false;
      render();
    }
    settingsView.hidden = !showSettings;
    progressView.hidden = showSettings;
    settingsTab.classList.toggle('is-active', showSettings);
    progressTab.classList.toggle('is-active', !showSettings);
    settingsTab.setAttribute('aria-selected', String(showSettings));
    progressTab.setAttribute('aria-selected', String(!showSettings));
    const url = new URL(window.location.href);
    url.searchParams.set('view', showSettings ? 'settings' : 'progress');
    window.history.replaceState(null, '', url);
    if (showSettings) window.dispatchEvent(new CustomEvent('agenda:settings-opened'));
    else render();
  }

  function applySettings(nextConfig) {
    const nextItems = Array.isArray(nextConfig.items) && nextConfig.items.length
      ? nextConfig.items
      : fallbackItems;
    const normalizedItems = nextItems.map((item, index) => ({
      title: String(item.title || `項目 ${index + 1}`).slice(0, 60),
      minutes: Math.min(1440, Math.max(1, Math.round(Number(item.minutes) || 1))),
      durationMs: 0
    }));
    const scheduleChanged = normalizedItems.length !== items.length || normalizedItems.some((item, index) => (
      item.title !== items[index]?.title || item.minutes !== items[index]?.minutes
    ));
    config.title = String(nextConfig.title || 'ワーク進行表').slice(0, 60);
    config.theme = themeIds.includes(nextConfig.theme) ? nextConfig.theme : 'steady';
    document.body.dataset.agendaTheme = config.theme;
    title.value = config.title;
    themeInputs.forEach((input) => {
      input.checked = input.value === config.theme;
    });
    if (scheduleChanged || !hasProgressStarted) {
      items.splice(0, items.length, ...normalizedItems);
      recalculateSchedule();
      buildList();
      elapsedBeforeRun = 0;
      runStartedAt = Date.now();
      isRunning = false;
    }
    hasProgressStarted = true;
    setActiveView('progress');
  }

  function getCurrentConfig() {
    return {
      title: title.value.trim() || config.title || 'ワーク進行表',
      theme: document.body.dataset.agendaTheme || config.theme,
      items: items.map((item) => ({ title: item.title, minutes: item.minutes }))
    };
  }

  function applyLiveBackground(url) {
    backgroundImage.src = url;
    backgroundImage.hidden = !url;
    document.body.classList.toggle('has-background-image', Boolean(url));
    liveBackgroundClearButton.disabled = !url;
  }

  function clearLiveBackground() {
    if (localBackgroundUrl) URL.revokeObjectURL(localBackgroundUrl);
    localBackgroundUrl = '';
    liveBackgroundFile.value = '';
    backgroundImage.removeAttribute('src');
    applyLiveBackground('');
  }

  function applyPanelTransparency() {
    const transparency = Math.min(60, Math.max(0, Number(panelTransparency.value) || 0));
    document.body.style.setProperty('--agenda-panel-alpha', String(1 - transparency / 100));
    panelTransparencyValue.value = `${transparency}%`;
    panelTransparencyValue.textContent = `${transparency}%`;
  }

  window.addEventListener('message', (event) => {
    const isTrustedOrigin = window.location.protocol === 'file:'
      ? event.origin === 'null'
      : event.origin === window.location.origin;
    if (!isTrustedOrigin || event.data?.type !== 'agenda-background') return;
    const file = event.data.file;
    if (!(file instanceof Blob) || !file.type.startsWith('image/')) return;
    if (localBackgroundUrl) URL.revokeObjectURL(localBackgroundUrl);
    localBackgroundUrl = URL.createObjectURL(file);
    applyLiveBackground(localBackgroundUrl);
  });

  title.value = config.title;
  themeInputs.forEach((input) => {
    input.checked = input.value === config.theme;
  });
  buildList();
  render();
  themeInputs.forEach((input) => input.addEventListener('change', () => {
    if (!input.checked) return;
    document.body.dataset.agendaTheme = themeIds.includes(input.value) ? input.value : 'steady';
    config.theme = document.body.dataset.agendaTheme;
  }));
  title.addEventListener('input', () => {
    config.title = title.value.trim() || 'ワーク進行表';
  });
  title.addEventListener('blur', () => {
    if (title.value.trim()) return;
    title.value = 'ワーク進行表';
    config.title = title.value;
  });
  liveBackgroundFile.addEventListener('change', () => {
    const [file] = liveBackgroundFile.files;
    if (!file || !file.type.startsWith('image/')) return;
    if (localBackgroundUrl) URL.revokeObjectURL(localBackgroundUrl);
    localBackgroundUrl = URL.createObjectURL(file);
    applyLiveBackground(localBackgroundUrl);
  });
  liveBackgroundClearButton.addEventListener('click', clearLiveBackground);
  panelTransparency.addEventListener('input', applyPanelTransparency);
  settingsTab.addEventListener('click', () => setActiveView('settings'));
  progressTab.addEventListener('click', () => {
    const request = new CustomEvent('agenda:progress-requested', { cancelable: true });
    window.dispatchEvent(request);
    if (!request.defaultPrevented) setActiveView('progress');
  });
  window.addEventListener('beforeunload', () => {
    if (localBackgroundUrl) URL.revokeObjectURL(localBackgroundUrl);
  });
  toggleButton.addEventListener('click', toggleRun);
  prevButton.addEventListener('click', goPrevious);
  nextButton.addEventListener('click', goNext);
  restartButton.addEventListener('click', restart);
  applyPanelTransparency();
  window.agendaApp = {
    applySettings,
    clearBackground: clearLiveBackground,
    getConfig: getCurrentConfig,
    setActiveView,
    setBackgroundFile(file) {
      if (!file || !file.type.startsWith('image/')) return false;
      if (localBackgroundUrl) URL.revokeObjectURL(localBackgroundUrl);
      localBackgroundUrl = URL.createObjectURL(file);
      applyLiveBackground(localBackgroundUrl);
      return true;
    }
  };
  const initialView = new URL(window.location.href).searchParams.get('view');
  setActiveView(initialView === 'progress' || initialView === 'agenda' ? 'progress' : 'settings');
  window.setInterval(render, 250);
  window.addEventListener('focus', render);
})();
