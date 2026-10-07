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
  const bgClock = document.getElementById('bg-clock');
  const selHour = document.getElementById('sel-hour');
  const selMin = document.getElementById('sel-min');
  const selSec = document.getElementById('sel-sec');
  const playButton = document.getElementById('btn-toggle-play');
  const overlayStatus = document.getElementById('overlay-status');

  let remainingMs = 0;
  let lastSetSeconds = 0;
  let endAt = 0;
  let ticker = null;
  let isRunning = false;
  let hasEnded = false;
  let audioContext = null;
  let isPinned = true;
  let isClickThrough = false;
  let controlsHidden = false;
  let isResizing = false;

  body.classList.add(isElectron ? 'electron-mode' : 'browser-mode');

  function addOptions(select, max) {
    for (let value = 0; value <= max; value += 1) {
      const label = String(value).padStart(2, '0');
      select.add(new Option(label, String(value)));
    }
  }

  addOptions(selHour, 23);
  addOptions(selMin, 59);
  addOptions(selSec, 59);

  function secondsForDisplay() {
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

  function renderTimer() {
    const seconds = secondsForDisplay();
    digitalText.textContent = formatTime(seconds);
    timerStage.classList.toggle('is-warning', seconds > 60 && seconds <= 120);
    timerStage.classList.toggle('is-urgent', seconds > 0 && seconds <= 60);
    timerStage.classList.toggle('is-ended', hasEnded);
    playButton.textContent = isRunning ? 'Ⅱ 一時停止' : '▶ スタート';
    playButton.classList.toggle('pause', isRunning);
    playButton.classList.toggle('primary', !isRunning);
    document.title = `${formatTime(seconds)}｜ワークショップタイマー`;
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
  }

  function tick() {
    if (!isRunning) return;
    remainingMs = Math.max(0, endAt - Date.now());
    if (remainingMs <= 0) {
      finishTimer();
      return;
    }
    renderTimer();
  }

  function startTimer() {
    if (isRunning || remainingMs <= 0) return;
    ensureAudio();
    hasEnded = false;
    isRunning = true;
    endAt = Date.now() + remainingMs;
    stopTicker();
    ticker = window.setInterval(tick, 100);
    renderTimer();
  }

  function pauseTimer() {
    if (isRunning) remainingMs = Math.max(0, endAt - Date.now());
    isRunning = false;
    stopTicker();
    renderTimer();
  }

  function toggleTimer() {
    if (isRunning) pauseTimer();
    else startTimer();
  }

  function setTime(totalSeconds) {
    pauseTimer();
    const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    lastSetSeconds = safeSeconds;
    remainingMs = safeSeconds * 1000;
    hasEnded = false;
    renderTimer();
  }

  function addTime(seconds) {
    const increment = Math.max(0, Number(seconds) || 0) * 1000;
    if (isRunning) {
      endAt += increment;
      remainingMs = Math.max(0, endAt - Date.now());
    } else {
      remainingMs += increment;
    }
    hasEnded = false;
    renderTimer();
  }

  function resetTimer() {
    setTime(lastSetSeconds);
  }

  function clearTimer() {
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

  createClockMarks(document.getElementById('left-clock-marks'), false);
  createClockMarks(document.getElementById('bg-clock-marks'), true);

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

  playButton.addEventListener('click', toggleTimer);
  document.getElementById('btn-reset').addEventListener('click', resetTimer);
  document.getElementById('btn-clear').addEventListener('click', clearTimer);

  document.querySelectorAll('.btn-preset').forEach((button) => {
    button.addEventListener('click', () => setTime(Number(button.dataset.time)));
  });

  document.querySelectorAll('.btn-add').forEach((button) => {
    button.addEventListener('click', () => addTime(Number(button.dataset.add)));
  });

  document.getElementById('btn-set-manual').addEventListener('click', () => {
    const total = (Number(selHour.value) * 3600) + (Number(selMin.value) * 60) + Number(selSec.value);
    setTime(total);
  });

  document.getElementById('chk-theme').addEventListener('change', (event) => {
    body.dataset.theme = event.target.checked ? 'dark' : 'light';
  });

  document.getElementById('chk-leftclock').addEventListener('change', (event) => {
    leftClockWrap.hidden = !event.target.checked;
  });

  document.getElementById('chk-bgclock').addEventListener('change', (event) => {
    bgClock.hidden = !event.target.checked;
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
    if (!isResizing || controlsHidden) return;
    const titlebarHeight = isElectron ? 38 : 0;
    const availableHeight = window.innerHeight - titlebarHeight;
    const relativeY = event.clientY - titlebarHeight;
    const minimum = 120;
    const maximum = Math.max(minimum, availableHeight - 100);
    const height = Math.min(maximum, Math.max(minimum, relativeY));
    topPane.style.height = `${height}px`;
  });

  window.addEventListener('pointerup', () => {
    isResizing = false;
    body.style.userSelect = '';
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
