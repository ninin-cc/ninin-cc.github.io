const {
  useState,
  useEffect,
  useCallback,
  useMemo
} = React;

// ==========================================
// アイコンコンポーネント (SVG)
// ==========================================
const WonderIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"
}));
const KeeperIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}));
const NurturerIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
}));
const AdapterIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M19.07 4.93a10 10 0 0 0-14.14 0"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.24 7.76a6 6 0 0 0-8.48 0"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2M12 20v2M2 12h2M20 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 12 5-5",
  strokeOpacity: "0.8"
}));
const ModeIcon = ({
  type,
  className
}) => {
  switch (type) {
    case 'W':
      return /*#__PURE__*/React.createElement(WonderIcon, {
        className: className
      });
    case 'K':
      return /*#__PURE__*/React.createElement(KeeperIcon, {
        className: className
      });
    case 'N':
      return /*#__PURE__*/React.createElement(NurturerIcon, {
        className: className
      });
    case 'A':
      return /*#__PURE__*/React.createElement(AdapterIcon, {
        className: className
      });
    default:
      return null;
  }
};
const MINI_MODE_CARD_META = Object.freeze({
  W: Object.freeze({
    label: 'ワンダー',
    color: '#F6A800',
    frame: '#FFC000'
  }),
  K: Object.freeze({
    label: 'キーパー',
    color: '#183B5B',
    frame: '#183B5B'
  }),
  N: Object.freeze({
    label: 'ナーチャー',
    color: '#D98BCF',
    frame: '#F2CFEE'
  }),
  A: Object.freeze({
    label: 'アダプター',
    color: '#69C7E8',
    frame: '#CAEEFB'
  })
});
// report/img/qr_rm_charcoal_real.svg の33×33モジュールを、そのまま
// data URL化する。ローカルSVG参照によるcanvas汚染を避け、画像保存にも含める。
const RIESM_MINI_QR_MATRIX = '000000000000000000000000000000000/000000000000000000000000000000000/000000000000000000000000000000000/000000000000000000000000000000000/000011111110110111111011111110000/000010000010111000000010000010000/000010111010110110100010111010000/000010111010111001101010111010000/000010111010010100110010111010000/000010000010111011101010000010000/000011111110101010101011111110000/000000000000001000101000000000000/000011001110001000000001011110000/000010010000100101011000110100000/000011111011111110110110111000000/000011101001010010001001101100000/000000001010100110000111011110000/000011111001111110111000100100000/000000000011000110010011111000000/000000101001010010010111101100000/000011111111010110011111111000000/000000000000111101001000100000000/000011111110010110101010100000000/000010000010101100111000111110000/000010111010110110001111111100000/000010111010000101101111001110000/000010111010010101000110010100000/000010000010110010010111111100000/000011111110111110110110001110000/000000000000000000000000000000000/000000000000000000000000000000000/000000000000000000000000000000000/000000000000000000000000000000000';
const RIESM_MINI_QR_DATA_URL = (() => {
  const modules = RIESM_MINI_QR_MATRIX.split('/').flatMap((row, y) => Array.from(row, (cell, x) => cell === '1' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : '')).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" shape-rendering="crispEdges"><rect width="33" height="33" fill="#fff"/><g fill="#36454F">${modules}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
})();
function buildMiniModeCardRows(scores = {}, orderMode = 'score') {
  const sourceOrder = ['W', 'K', 'N', 'A'];
  const rows = sourceOrder.map((type, sourceIndex) => ({
    type,
    sourceIndex,
    raw: Math.max(0, Number(scores[type]) || 0),
    ...MINI_MODE_CARD_META[type]
  }));
  const total = rows.reduce((sum, row) => sum + row.raw, 0);
  const normalizedRows = rows.map(row => ({
    ...row,
    scaleMaximum: 40,
    percentage: total > 0 ? Math.min(40, Math.round(row.raw / total * 100)) : 0
  }));
  return orderMode === 'fixed' ? normalizedRows : normalizedRows.sort((a, b) => b.raw - a.raw || a.sourceIndex - b.sourceIndex);
}
function MiniModeBalanceCard({
  scores,
  frontType,
  displayName = '今のモードバランス',
  orderMode = 'score'
}) {
  const rows = buildMiniModeCardRows(scores, orderMode);
  const displayed = rows.map(row => row.percentage);
  const average = displayed.length ? displayed.reduce((sum, value) => sum + value, 0) / displayed.length : 0;
  const averagePosition = `${Math.max(0, Math.min(100, average / 40 * 100))}%`;
  const frame = MINI_MODE_CARD_META[frontType]?.frame || '#827B00';
  return /*#__PURE__*/React.createElement("div", {
    id: "riesm-mini-mode-card",
    className: "riesm-mini-mode-card",
    style: {
      '--mode-frame': frame,
      '--average-position': averagePosition
    },
    "aria-label": `${displayName}のモードバランス`
  }, /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__brand"
  }, "RIESM\u2122 PERSONAL MODE CARD"), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__qr"
  }, /*#__PURE__*/React.createElement("img", {
    src: RIESM_MINI_QR_DATA_URL,
    alt: "RIESM QR"
  })), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__name"
  }, displayName), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__heading"
  }, /*#__PURE__*/React.createElement("strong", null, "4\u3064\u306E\u30E2\u30FC\u30C9")), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__graph"
  }, /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__front"
  }, "\u30D5\u30ED\u30F3\u30C8\u5074"), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__average-arrow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__guide",
    "aria-hidden": "true"
  }), rows.map(row => /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__row",
    key: row.type
  }, /*#__PURE__*/React.createElement("span", {
    className: "riesm-mini-mode-card__label"
  }, row.label), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__bar",
    style: {
      width: `${row.percentage / row.scaleMaximum * 100}%`,
      background: row.type === 'K' ? 'linear-gradient(90deg, #183B5B, #3D67A4)' : row.color
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__back"
  }, "\u30D0\u30C3\u30AF\u30B9\u5074"), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__creed"
  }, /*#__PURE__*/React.createElement("div", null, "\u3059\u3079\u3066\u306E\u500B\u6027\u306F\u3001\u751F\u304D\u308B\u305F\u3081\u306B\u5FC5\u8981\u3060\u304B\u3089\u3053\u305D\u5099\u308F\u308A\u3001\u305D\u308C\u305E\u308C\u306B\u512A\u52A3\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("div", null, "\u305D\u3057\u3066\u56FA\u5B9A\u3067\u306F\u7121\u304F\u3001\u5834\u9762\u3001\u72B6\u6CC1\u306B\u5FDC\u3058\u3066\u5909\u5316\u3057\u3066\u3044\u304F\u3082\u306E\u3067\u3059\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "riesm-mini-mode-card__copyright"
  }, "\xA92025 ninin consulting\uFF06counseling")));
}
window.RiesmMiniModeBalanceCard = MiniModeBalanceCard;
window.buildRiesmMiniModeCardRows = buildMiniModeCardRows;
const MINI_HISTORY_STORAGE_KEY = 'riesmMiniResultHistoryV1';
const MINI_HISTORY_LIMIT = 100;
const MINI_HISTORY_URL_PARAM = 'rmh';
const MINI_HISTORY_URL_VERSION = '2';
const MINI_HISTORY_LEGACY_URL_VERSION = '1';
const MINI_HISTORY_SCORE_SCALE = 10;
const MINI_HISTORY_CRYPTO_CONTEXT = 'RIESM-mini-history-url-v2';
let miniHistoryCryptoKeyPromise = null;
function readMiniResultHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MINI_HISTORY_STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(entry => entry && Number.isFinite(Number(entry.createdAt)) && entry.scores && ['W', 'K', 'N', 'A'].every(type => Number.isFinite(Number(entry.scores[type])))).slice(0, MINI_HISTORY_LIMIT);
  } catch (error) {
    console.warn('RIESM miniの履歴を読み込めませんでした。', error);
    return [];
  }
}
function storeMiniResultHistory(entry) {
  const next = [entry, ...readMiniResultHistory()].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, MINI_HISTORY_LIMIT);
  try {
    localStorage.setItem(MINI_HISTORY_STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn('RIESM miniの履歴を保存できませんでした。', error);
  }
  return next;
}
function getMiniHistoryEntryKey(entry) {
  const second = Math.floor(Number(entry.createdAt) / 1000);
  const scoreKey = ['W', 'K', 'N', 'A'].map(type => Math.round((Math.max(0, Number(entry.scores?.[type])) || 0) * MINI_HISTORY_SCORE_SCALE)).join('-');
  return `${second}:${scoreKey}`;
}
function mergeMiniResultHistory(importedEntries, localEntries = readMiniResultHistory()) {
  const merged = [];
  const seen = new Set();
  [...importedEntries, ...localEntries].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).forEach(entry => {
    const key = getMiniHistoryEntryKey(entry);
    if (seen.has(key) || merged.length >= MINI_HISTORY_LIMIT) return;
    seen.add(key);
    merged.push(entry);
  });
  return merged;
}
function serializeMiniResultHistory(entries) {
  const history = entries.filter(entry => entry && Number.isFinite(Number(entry.createdAt)) && entry.scores && ['W', 'K', 'N', 'A'].every(type => Number.isFinite(Number(entry.scores[type])))).sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, MINI_HISTORY_LIMIT);
  if (!history.length) return '';
  let previousSecond = null;
  const rows = history.map((entry, index) => {
    const currentSecond = Math.floor(Number(entry.createdAt) / 1000);
    const timeValue = index === 0 ? currentSecond : Math.max(0, previousSecond - currentSecond);
    previousSecond = currentSecond;
    const values = [timeValue, ...['W', 'K', 'N', 'A'].map(type => Math.round(Math.max(0, Number(entry.scores[type]) || 0) * MINI_HISTORY_SCORE_SCALE))];
    return values.map(value => value.toString(36)).join('.');
  });
  return rows.join('~');
}
function compressMiniHistoryText(text) {
  if (!text) return new Uint8Array();
  const dictionary = new Map();
  const codes = [];
  let nextCode = 256;
  let current = '';
  for (const character of text) {
    const combined = current + character;
    if (combined.length === 1 && combined.charCodeAt(0) < 256 || dictionary.has(combined)) {
      current = combined;
      continue;
    }
    codes.push(current.length === 1 ? current.charCodeAt(0) : dictionary.get(current));
    if (nextCode <= 0xffff) dictionary.set(combined, nextCode++);
    current = character;
  }
  if (current) {
    codes.push(current.length === 1 ? current.charCodeAt(0) : dictionary.get(current));
  }
  const bytes = new Uint8Array(codes.length * 2);
  codes.forEach((code, index) => {
    bytes[index * 2] = code >> 8 & 0xff;
    bytes[index * 2 + 1] = code & 0xff;
  });
  return bytes;
}
function decompressMiniHistoryText(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length % 2 !== 0) {
    throw new Error('履歴URLの圧縮データが壊れています。');
  }
  if (!bytes.length) return '';
  const codes = [];
  for (let index = 0; index < bytes.length; index += 2) {
    codes.push(bytes[index] << 8 | bytes[index + 1]);
  }
  const dictionary = new Map();
  let nextCode = 256;
  let current = String.fromCharCode(codes[0]);
  let result = current;
  for (let index = 1; index < codes.length; index += 1) {
    const code = codes[index];
    let entry;
    if (code < 256) {
      entry = String.fromCharCode(code);
    } else if (dictionary.has(code)) {
      entry = dictionary.get(code);
    } else if (code === nextCode) {
      entry = current + current[0];
    } else {
      throw new Error('履歴URLの圧縮データを展開できませんでした。');
    }
    result += entry;
    if (nextCode <= 0xffff) dictionary.set(nextCode++, current + entry[0]);
    current = entry;
  }
  return result;
}
function miniHistoryBytesToBase64Url(bytes) {
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
function miniHistoryBase64UrlToBytes(value) {
  const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}
async function getMiniHistoryCryptoKey() {
  if (!window.crypto?.subtle) {
    throw new Error('このブラウザは履歴URLの暗号化に対応していません。');
  }
  if (!miniHistoryCryptoKeyPromise) {
    miniHistoryCryptoKeyPromise = window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(MINI_HISTORY_CRYPTO_CONTEXT)).then(keyBytes => window.crypto.subtle.importKey('raw', keyBytes, {
      name: 'AES-GCM'
    }, false, ['encrypt', 'decrypt']));
  }
  return miniHistoryCryptoKeyPromise;
}
async function encodeMiniResultHistory(entries) {
  const serialized = serializeMiniResultHistory(entries);
  if (!serialized) return '';
  const compressed = compressMiniHistoryText(serialized);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await getMiniHistoryCryptoKey();
  const encrypted = new Uint8Array(await window.crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv
  }, key, compressed));
  return [MINI_HISTORY_URL_VERSION, miniHistoryBytesToBase64Url(iv), miniHistoryBytesToBase64Url(encrypted)].join('~');
}
function deserializeMiniResultHistory(serialized) {
  if (typeof serialized !== 'string' || !serialized.trim()) return [];
  const parts = serialized.trim().split('~');
  let previousSecond = null;
  return parts.slice(0, MINI_HISTORY_LIMIT).map((row, index) => {
    const values = row.split('.').map(value => parseInt(value, 36));
    if (values.length !== 5 || values.some(value => !Number.isFinite(value) || value < 0)) {
      throw new Error('履歴URLのデータを読み取れませんでした。');
    }
    const currentSecond = index === 0 ? values[0] : previousSecond - values[0];
    if (!Number.isFinite(currentSecond) || currentSecond <= 0) {
      throw new Error('履歴URLの日時を読み取れませんでした。');
    }
    previousSecond = currentSecond;
    const scores = Object.fromEntries(['W', 'K', 'N', 'A'].map((type, scoreIndex) => [type, values[scoreIndex + 1] / MINI_HISTORY_SCORE_SCALE]));
    return {
      id: `url-${currentSecond}-${values.slice(1).join('-')}`,
      createdAt: currentSecond * 1000,
      scores
    };
  });
}
async function decodeMiniResultHistory(payload) {
  if (typeof payload !== 'string' || !payload.trim()) return [];
  const parts = payload.trim().split('~');
  const version = parts.shift();
  if (version === MINI_HISTORY_LEGACY_URL_VERSION) {
    return deserializeMiniResultHistory(parts.join('~'));
  }
  if (version !== MINI_HISTORY_URL_VERSION || parts.length !== 2) {
    throw new Error('対応していない履歴URLです。');
  }
  const iv = miniHistoryBase64UrlToBytes(parts[0]);
  const encrypted = miniHistoryBase64UrlToBytes(parts[1]);
  if (iv.length !== 12 || encrypted.length < 17 || encrypted.length > 50000) {
    throw new Error('履歴URLの暗号化データが壊れています。');
  }
  const key = await getMiniHistoryCryptoKey();
  const decrypted = new Uint8Array(await window.crypto.subtle.decrypt({
    name: 'AES-GCM',
    iv
  }, key, encrypted));
  return deserializeMiniResultHistory(decompressMiniHistoryText(decrypted));
}
function initializeMiniResultHistory() {
  return readMiniResultHistory();
}
async function importMiniResultHistoryFromUrl() {
  const localEntries = readMiniResultHistory();
  try {
    const url = new URL(window.location.href);
    const payload = url.searchParams.get(MINI_HISTORY_URL_PARAM);
    if (!payload) return localEntries;
    const importedEntries = await decodeMiniResultHistory(payload);
    const merged = mergeMiniResultHistory(importedEntries, localEntries);
    localStorage.setItem(MINI_HISTORY_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (error) {
    console.warn('URLに保存されたRIESM miniの履歴を復元できませんでした。', error);
    return localEntries;
  }
}
function formatMiniHistoryDate(timestamp) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const weekday = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    weekday: 'short'
  }).format(new Date(timestamp));
  return `${values.year}/${values.month}/${values.day} ${weekday}曜日 ${values.hour}:${values.minute}`;
}
function getMiniHistoryModeOrder(scores = {}) {
  return ['W', 'K', 'N', 'A'].map((type, index) => ({
    type,
    index,
    value: Math.max(0, Number(scores[type]) || 0)
  })).sort((a, b) => a.value - b.value || b.index - a.index).map(item => item.type);
}
function formatMiniHistoryGraphDate(timestamp) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}/${values.month}/${values.day}`;
}
function getMiniHistoryPercentages(scores = {}) {
  const values = Object.fromEntries(['W', 'K', 'N', 'A'].map(type => [type, Math.max(0, Number(scores[type]) || 0)]));
  const total = Object.values(values).reduce((sum, value) => sum + value, 0);
  if (total <= 0) return {
    W: 0,
    K: 0,
    N: 0,
    A: 0
  };
  return Object.fromEntries(Object.entries(values).map(([type, value]) => [type, value / total * 100]));
}
function MiniHistoryTrendGraph({
  entries
}) {
  const history = entries.slice(0, MINI_HISTORY_LIMIT);
  const top = 58;
  const rowHeight = 35;
  const bottom = 30;
  const height = Math.max(220, top + Math.max(1, history.length - 1) * rowHeight + bottom);
  const gridValues = [-10, 0, 10, 20, 30, 40];
  const modeTypes = ['W', 'K', 'N', 'A'];
  const renderTrendSvg = ({
    width,
    labelWidth,
    plotLeft,
    plotRight,
    dateFontSize,
    headingFontSize,
    className
  }) => {
    const xForPercent = value => {
      const clamped = Math.max(-10, Math.min(40, Number(value) || 0));
      return plotLeft + (clamped + 10) / 50 * (plotRight - plotLeft);
    };
    return /*#__PURE__*/React.createElement("svg", {
      className: `riesm-history-trend__svg ${className}`,
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "xMidYMin meet",
      role: "img",
      "aria-label": "\u76F4\u8FD1\u3092\u4E0A\u3001\u904E\u53BB\u3092\u4E0B\u306B\u4E26\u3079\u305F4\u30E2\u30FC\u30C9\u306E\u5272\u5408\u306E\u5909\u5316\u30B0\u30E9\u30D5"
    }, /*#__PURE__*/React.createElement("text", {
      x: plotLeft,
      y: "21",
      fill: "#64748b",
      fontSize: headingFontSize,
      fontWeight: "700"
    }, "\u30D0\u30C3\u30AF\u30B9\u5074"), /*#__PURE__*/React.createElement("text", {
      x: plotRight,
      y: "21",
      fill: "#64748b",
      fontSize: headingFontSize,
      fontWeight: "700",
      textAnchor: "end"
    }, "\u30D5\u30ED\u30F3\u30C8\u5074"), /*#__PURE__*/React.createElement("line", {
      x1: labelWidth,
      y1: "32",
      x2: labelWidth,
      y2: height - 12,
      stroke: "#cbd5e1",
      strokeWidth: "1"
    }), gridValues.map(value => /*#__PURE__*/React.createElement("line", {
      key: value,
      x1: xForPercent(value),
      y1: "32",
      x2: xForPercent(value),
      y2: height - 12,
      stroke: value === 0 ? '#cbd5e1' : '#e2e8f0',
      strokeWidth: value === 0 ? '1.4' : '1'
    })), history.map((entry, index) => {
      const y = top + index * rowHeight;
      return /*#__PURE__*/React.createElement("g", {
        key: entry.id
      }, /*#__PURE__*/React.createElement("text", {
        x: "4",
        y: y + 4,
        fill: "#334155",
        fontSize: dateFontSize,
        fontWeight: "700"
      }, formatMiniHistoryGraphDate(entry.createdAt)), /*#__PURE__*/React.createElement("line", {
        x1: labelWidth,
        y1: y + 12,
        x2: plotRight,
        y2: y + 12,
        stroke: "#f1f5f9",
        strokeWidth: "1"
      }));
    }), modeTypes.map(type => {
      const points = history.map((entry, index) => {
        const percentages = getMiniHistoryPercentages(entry.scores);
        return `${xForPercent(percentages[type])},${top + index * rowHeight}`;
      }).join(' ');
      if (!points) return null;
      return /*#__PURE__*/React.createElement("polyline", {
        key: type,
        points: points,
        fill: "none",
        stroke: MINI_MODE_CARD_META[type].color,
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      });
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "riesm-history-trend rounded-2xl border border-slate-200 bg-white p-3 sm:p-4"
  }, renderTrendSvg({
    width: 360,
    labelWidth: 74,
    plotLeft: 88,
    plotRight: 348,
    dateFontSize: 9.5,
    headingFontSize: 10.5,
    className: 'riesm-history-trend__svg--mobile'
  }), renderTrendSvg({
    width: 680,
    labelWidth: 126,
    plotLeft: 148,
    plotRight: 654,
    dateFontSize: 12,
    headingFontSize: 12,
    className: 'riesm-history-trend__svg--desktop'
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid grid-cols-2 gap-x-4 gap-y-2 px-4 text-[11px] font-bold text-slate-600 sm:flex sm:flex-wrap sm:justify-center sm:px-0"
  }, modeTypes.map(type => /*#__PURE__*/React.createElement("span", {
    key: type,
    className: "inline-flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-2.5 w-2.5 rounded-full",
    style: {
      backgroundColor: MINI_MODE_CARD_META[type].color
    }
  }), MINI_MODE_CARD_META[type].label))));
}
const ExternalLinkIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "15 3 21 3 21 9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "14",
  x2: "21",
  y2: "3"
}));
const RefreshCwIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "23 4 23 10 17 10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "1 20 1 14 7 14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
}));
const InfoIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "text-indigo-500"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12.01",
  y2: "8"
}));
const ShareIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "18",
  cy: "5",
  r: "3"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "6",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "18",
  cy: "19",
  r: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8.59",
  y1: "13.51",
  x2: "15.42",
  y2: "17.49"
}), /*#__PURE__*/React.createElement("line", {
  x1: "15.41",
  y1: "6.51",
  x2: "8.59",
  y2: "10.49"
}));
const ArrowLeftIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("line", {
  x1: "19",
  y1: "12",
  x2: "5",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 19 5 12 12 5"
}));

// ==========================================
// データ定義 (全45問維持)
// ==========================================
function normalizeWorkshopLicenseCode(value) {
  return String(value || '').trim().replace(/^[?#]/, '').split('&')[0].split('=')[0].replace(/_/g, '-').toUpperCase();
}
function getWorkshopLicenseAlias(value) {
  const code = normalizeWorkshopLicenseCode(value);
  const match = code.match(/(?:[A-Z]+)-?(\d{3,4})|\b(\d{3,4})\b/i);
  return match ? match[1] || match[2] : '';
}
function getWorkshopLicenseAliasKey(value) {
  const alias = getWorkshopLicenseAlias(value);
  return alias ? String(Number(alias)) : '';
}
function getWorkshopLicenseRequestCode() {
  const params = new URLSearchParams(window.location.search);
  const rawCode = params.get('id') || params.get('code') || params.get('amb') || Array.from(params.keys())[0] || window.location.hash;
  return getWorkshopLicenseAlias(rawCode);
}
function getWorkshopLicenseSource(member) {
  return [member && member.certification, member && member.certificationType, member && member.certificationNumber, member && member.riesmNumber, member && member.riesmRole, member && member.id].filter(Boolean).join(' ');
}
function getWorkshopLicenseCode(member) {
  const source = getWorkshopLicenseSource(member);
  const match = source.match(/\b([A-Z]+)-?(\d{3,4})\b/i);
  if (!match) return '';
  const prefix = match[1].toUpperCase() === 'R' ? 'AMB' : match[1].toUpperCase();
  return prefix + '-' + match[2];
}
function getWorkshopLicenseMember() {
  const requestedCode = getWorkshopLicenseRequestCode();
  if (!requestedCode) return null;
  const members = window.NININ_LINK_DATA || (typeof linkData !== 'undefined' ? linkData : []);
  return members.find(member => getWorkshopLicenseAliasKey(getWorkshopLicenseCode(member)) === getWorkshopLicenseAliasKey(requestedCode)) || null;
}
function getWorkshopLicenseAvatar(member) {
  if (member && member.avatar && member.avatar.src) {
    const src = String(member.avatar.src).replace(/^\.\//, '../');
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: member.name + 'のプロフィール画像',
      className: "w-9 h-9 rounded-full object-cover border border-indigo-900/10 bg-white"
    });
  }
  const text = member && member.avatar && member.avatar.text ? member.avatar.text : String(member && member.name || '?').slice(0, 1);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full border border-indigo-900/10 bg-white flex items-center justify-center text-indigo-800 font-black text-sm"
  }, text);
}
function LicenseScopeChip({
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black ' + tone
  }, children);
}
function getWorkshopLicenseScope(code) {
  const prefix = String(code || '').split('-')[0].toUpperCase();
  if (prefix === 'AMB') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-emerald-900/15 bg-emerald-50 text-emerald-800"
    }, "\u2713\u7121\u511F\u306E\u307F"), /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-slate-200 bg-white/80 text-slate-500"
    }, "\xD7\u6709\u511F"));
  }
  if (prefix === 'RWN') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-orange-900/15 bg-orange-50 text-orange-800"
    }, "\u2713\u6709\u511FWS"), /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-slate-200 bg-white/80 text-slate-500"
    }, "\xD7\u30B3\u30C3\u30AF\u30D4\u30C3\u30C8"));
  }
  if (prefix === 'RCN' || prefix === 'RCC') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-sky-900/15 bg-sky-50 text-sky-800"
    }, "\u2713\u6709\u511FWS"), /*#__PURE__*/React.createElement(LicenseScopeChip, {
      tone: "border-sky-900/15 bg-sky-50 text-sky-800"
    }, "\u2713\u6709\u511F\u30BB\u30C3\u30B7\u30E7\u30F3"));
  }
  return /*#__PURE__*/React.createElement(LicenseScopeChip, {
    tone: "border-emerald-900/15 bg-emerald-50 text-emerald-800"
  }, "\u5B9F\u65BD\u7BC4\u56F2\u78BA\u8A8D");
}
function WorkshopLicenseCard() {
  const member = getWorkshopLicenseMember();
  if (!member) return null;
  const code = getWorkshopLicenseCode(member);
  const href = '../touroku.html?' + encodeURIComponent(getWorkshopLicenseAlias(code));
  const label = String(member.certification || '🌈RIESM™認定カード').replace(/\s*\/\s*/g, ' / ');
  const shortLabel = label.replace(/\s*\/\s*[A-Z]+-\d{3,4}/i, '');
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "mt-3 block rounded-2xl border border-indigo-100 bg-white/90 px-3 py-2.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, getWorkshopLicenseAvatar(member), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] sm:text-[10px] font-black tracking-[0.16em] text-indigo-900/55"
  }, "RIESM\u2122 mini LICENSE"), /*#__PURE__*/React.createElement("p", {
    className: "mt-0.5 truncate text-xs sm:text-sm font-black text-slate-800"
  }, member.name), /*#__PURE__*/React.createElement("p", {
    className: "mt-0.5 flex min-w-0 items-center gap-1.5 overflow-hidden text-[10px] sm:text-[11px] font-bold leading-snug text-indigo-900"
  }, /*#__PURE__*/React.createElement("span", {
    className: "min-w-0 truncate"
  }, shortLabel), getWorkshopLicenseScope(code))), /*#__PURE__*/React.createElement("span", {
    className: "shrink-0 rounded-full border border-indigo-900/10 bg-indigo-50 px-2 py-1 text-[9px] font-black text-indigo-900"
  }, code)));
}
function WorkshopGuideModal({
  onClose
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const modeItems = [{
    label: 'ワンダー',
    text: '自由・発見・挑戦を担当するモード'
  }, {
    label: 'キーパー',
    text: '正しさ・信念・秩序を守るモード'
  }, {
    label: 'ナーチャー',
    text: '自他を受容し、育もうとするモード'
  }, {
    label: 'アダプター',
    text: '周囲を観察し、安心や安全を確かめるモード'
  }];
  const guideImages = [{
    src: '../riesm/img/riesm-preface-visual.png',
    title: 'RIESM™とは',
    alt: 'RIESMとは何かと、RIESMを構成する5つの視点の説明'
  }, {
    src: '../riesm/img/riesm-mode-energy-guide.png',
    title: 'モード｜心の元気の使い方',
    alt: '4つのモードの増減と心の元気の使い方の説明'
  }, {
    src: '../riesm/img/riesm-front-guide.png',
    title: '外界と接する順番',
    alt: 'フロント、スタンド、バックスの位置関係と外界との接点の説明'
  }, {
    src: '../riesm/img/riesm-front-definition-guide.png',
    title: 'フロントとは',
    alt: 'フロントは世界と接するとき前面に出やすく環境によって変化するモードであることの説明'
  }, {
    src: '../riesm/img/riesm-stand-guide.png',
    title: 'スタンドとは',
    alt: 'スタンドがフロントを支え必要に応じて入れ替わることの説明'
  }, {
    src: '../riesm/img/riesm-backs-guide.png',
    title: 'バックスとは',
    alt: 'バックスは内側にあり環境や役割によって前面へ現れるモードであることの説明'
  }];
  const prohibitedItems = ['他者を「あなたはワンダータイプ」などと決めつける', 'モードの数値や順位を人と比較する', '結果を能力評価・採用・配置・人事評価に使用する', '本人の同意なく結果を共有する', '医療的・診断的な意味づけをする', 'モードに優劣をつけ、「良い・悪い」「強い・弱い」と評価する'];
  const sectionClass = 'rounded-2xl border border-amber-100 bg-[#fffdf8] p-4 sm:p-5 shadow-sm';
  const sectionTitleClass = 'mb-3 flex items-center gap-3 text-base sm:text-lg font-black text-slate-900';
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 px-3 py-4 sm:px-6 sm:py-8 backdrop-blur-sm",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u3053\u306E\u30A2\u30D7\u30EA\u3092\u300C\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u300D\u3067\u4F7F\u3046\u3068\u304D\u306E\u30C8\u30EA\u30BB\u30C4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-100 bg-[#fff8e8] shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky top-0 z-10 border-b border-amber-100 bg-[#fffaf0] px-5 py-4 text-left sm:px-7 sm:py-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] sm:text-xs font-black tracking-[0.24em] text-indigo-500"
  }, "WORKSHOP GUIDE"), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 flex items-start justify-between gap-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl font-black leading-snug text-slate-900"
  }, "\u3053\u306E\u30A2\u30D7\u30EA\u3092\u300C\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u300D\u3067\u4F7F\u3046\u3068\u304D\u306E\u30C8\u30EA\u30BB\u30C4"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-black text-slate-500 shadow-sm transition hover:bg-slate-50",
    "aria-label": "\u30C8\u30EA\u30BB\u30C4\u3092\u9589\u3058\u308B"
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    className: "max-h-[calc(92vh-138px)] overflow-y-auto bg-[#fff8e8] px-4 py-5 text-left text-[13px] leading-7 text-slate-700 sm:px-7 sm:py-6 sm:text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-amber-100 bg-[#fffdf8] p-4 sm:p-5 shadow-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-slate-900"
  }, "\u3053\u306E\u30DA\u30FC\u30B8\u306F\u3001RIESM\u2122 mini\u30A2\u30D7\u30EA\u3092\u3001\u30E2\u30FC\u30C9\u7406\u89E3\u3068\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u306E\u30EF\u30FC\u30AF\u3068\u3057\u3066\u5B89\u5168\u306B\u6D3B\u7528\u3059\u308B\u305F\u3081\u306E\u8AAC\u660E\u66F8\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("p", null, "\u672C\u30A2\u30D7\u30EA\u3092\u4F7F\u7528\u3057\u305F\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u306F\u3001\u793E\u5185\u3084\u4EF2\u9593\u5185\u3001\u3042\u308B\u3044\u306F\u3054\u81EA\u8EAB\u306E\u6D3B\u52D5\u3067\u7121\u511F\u958B\u50AC\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002\u305D\u306E\u969B\u306B\u306F\u3001\u4E0B\u8A18\u30D5\u30A9\u30FC\u30E0\u3088\u308ARIESM\u2122\u30A2\u30F3\u30D0\u30B5\u30C0\u30FC\u767B\u9332\uFF08\u7121\u6599\uFF09\u3092\u304A\u9858\u3044\u3057\u307E\u3059\u3002\u767B\u9332\u756A\u53F7\u3068\u30AC\u30A4\u30C9\u30D6\u30C3\u30AF\u3001\u30B9\u30E9\u30A4\u30C9\u7B49\u3092\u4E00\u9031\u9593\u4EE5\u5185\u306B\u8FD4\u4FE1\u3044\u305F\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "font-black text-emerald-900"
  }, "\u767B\u9332\u27A4", /*#__PURE__*/React.createElement("a", {
    href: "https://forms.gle/SChNQQ4auS6qKwji7",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "break-all underline decoration-emerald-700 underline-offset-4"
  }, "https://forms.gle/SChNQQ4auS6qKwji7")), /*#__PURE__*/React.createElement("p", null, "\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u3092\u6709\u511F\u3067\u958B\u50AC\u3057\u3001\u53C2\u52A0\u8CBB\u3084\u5831\u916C\u306A\u3069\u306E\u53CE\u76CA\u3092\u5F97\u308B\u305F\u3081\u306B\u306F\u3001RIESM\u2122\u8A8D\u5B9A\u30EF\u30FC\u30AF\u30CA\u30D3\u30B2\u30FC\u30BF\u30FC\u306B\u306A\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002\u8A73\u7D30\u306F\u4E0B\u8A18URL\u3067\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "font-black text-emerald-900"
  }, "\u8A73\u7D30\u27A4", /*#__PURE__*/React.createElement("a", {
    href: "https://note.com/ninin2025/n/n2eaed311ebca",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "break-all underline decoration-emerald-700 underline-offset-4"
  }, "https://note.com/ninin2025/n/n2eaed311ebca"))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-amber-100 bg-[#fffdf8] p-4 sm:p-5 shadow-sm space-y-3"
  }, /*#__PURE__*/React.createElement("p", null, "RIESM\u2122 mini\u306F\u3001\u300C\u4ECA\u306E\u81EA\u5206\u300D\u306B\u8FD1\u3044\u8A00\u8449\u3092\u9078\u3076\u3053\u3068\u3067\u3001\u73FE\u5728\u306E\u30E2\u30FC\u30C9\u30D0\u30E9\u30F3\u30B9\u3092\u89B3\u308B\u305F\u3081\u306E\u30A2\u30D7\u30EA\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", null, "\u7814\u4FEE\u30FB\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u30FB\u5BFE\u8A71\u306E\u5834\u3067\u4F7F\u7528\u3059\u308B\u5834\u5408\u306B\u306F\u3001\u30E2\u30FC\u30C9\u306E\u610F\u5473\u3084\u7D50\u679C\u306E\u6271\u3044\u65B9\u3092\u7406\u89E3\u3057\u305F\u3046\u3048\u3067\u3001\u53C2\u52A0\u8005\u304C\u5B89\u5FC3\u3057\u3066\u8A71\u305B\u308B\u5834\u3092\u3064\u304F\u308B\u3053\u3068\u304C\u5927\u5207\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "font-black text-indigo-900"
  }, "RIESM\u2122\u306F\u3001\u4EBA\u3092\u5206\u985E\u3057\u305F\u308A\u3001\u6027\u683C\u3092\u6C7A\u3081\u3064\u3051\u305F\u308A\u3059\u308B\u305F\u3081\u306E\u8A3A\u65AD\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", null, "\u81EA\u5206\u3084\u76F8\u624B\u306E\u300C\u4ECA\u306E\u72B6\u614B\u300D\u3092\u89B3\u5BDF\u3057\u3001\u3088\u308A\u5FC3\u5730\u3088\u3044\u95A2\u308F\u308A\u65B9\u3092\u8003\u3048\u308B\u305F\u3081\u306E\u81EA\u5DF1\u7406\u89E3\u30FB\u4ED6\u8005\u7406\u89E3\u306E\u30A2\u30D7\u30ED\u30FC\u30C1\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "1."), "\u3053\u306E\u30EF\u30FC\u30AF\u306E\u76EE\u7684"), /*#__PURE__*/React.createElement("p", {
    className: "mb-3"
  }, "RIESM\u2122 mini\u3067\u306F\u3001\u5FC3\u306E\u5143\u6C17\u306E\u4F7F\u3044\u65B9\u3092\u3001\u6B21\u306E4\u3064\u306E\u300C\u30E2\u30FC\u30C9\u300D\u3068\u3057\u3066\u89B3\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2"
  }, modeItems.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.label,
    className: "rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-black text-slate-900"
  }, item.label, "\uFF1A"), item.text))), /*#__PURE__*/React.createElement("p", {
    className: "mt-4"
  }, "\u7D50\u679C\u3092\u5F53\u3066\u308B\u3053\u3068\u304C\u76EE\u7684\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2"
  }, "\u81EA\u5206\u306F\u4ECA\u3001\u3069\u306E\u30E2\u30FC\u30C9\u3092\u81EA\u7136\u306B\u4F7F\u3063\u3066\u3044\u308B\u306E\u304B\u3002\u76F8\u624B\u306F\u4ECA\u3001\u3069\u306E\u3088\u3046\u306A\u8A00\u8449\u3092\u5FC5\u8981\u3068\u3057\u3066\u3044\u308B\u306E\u304B\u3092\u8003\u3048\u3001\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u306E\u9078\u629E\u80A2\u3092\u5897\u3084\u3059\u3053\u3068\u304C\u76EE\u7684\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "2."), "\u300C\u30D5\u30ED\u30F3\u30C8\u300D\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", null, "4\u3064\u306E\u30E2\u30FC\u30C9\u306E\u3046\u3061\u3001\u4ECA\u3082\u3063\u3068\u3082\u524D\u306B\u51FA\u3066\u3044\u308B\u30E2\u30FC\u30C9\u3092\u3001RIESM\u2122\u3067\u306F\u300C\u30D5\u30ED\u30F3\u30C8\u300D\u3068\u547C\u3073\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u30D5\u30ED\u30F3\u30C8\u306F\u3001\u5F37\u3044\u6027\u683C\u3084\u512A\u308C\u305F\u80FD\u529B\u3092\u8868\u3059\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u81EA\u5206\u3068\u5916\u306E\u4E16\u754C\u304C\u6700\u521D\u306B\u63A5\u3059\u308B\u300C\u4ECA\u306E\u7A93\u53E3\u300D\u3067\u3059\u3002\u8868\u60C5\u30FB\u8A00\u8449\u30FB\u614B\u5EA6\u306B\u73FE\u308C\u3084\u3059\u304F\u3001\u74B0\u5883\u30FB\u76F8\u624B\u30FB\u5F79\u5272\u30FB\u4F53\u8ABF\u30FB\u6C17\u5206\u306B\u3088\u3063\u3066\u5909\u5316\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u540C\u3058\u4EBA\u3067\u3082\u3001\u4ED5\u4E8B\u4E2D\u3068\u5BB6\u5EAD\u3001\u5B89\u5FC3\u3057\u3066\u3044\u308B\u6642\u3068\u7DCA\u5F35\u3057\u3066\u3044\u308B\u6642\u3067\u306F\u3001\u30D5\u30ED\u30F3\u30C8\u304C\u5909\u308F\u308B\u3053\u3068\u304C\u3042\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "3."), "\u30A2\u30D7\u30EA\u7D50\u679C\u306E\u8003\u3048\u65B9"), /*#__PURE__*/React.createElement("p", null, "\u30A2\u30D7\u30EA\u306E\u7D50\u679C\u306F\u3001\u56DE\u7B54\u3057\u305F\u6642\u70B9\u3067\u306E\u81EA\u5DF1\u7533\u544A\u3092\u3082\u3068\u306B\u3057\u305F\u300C\u4ECA\u306E\u30E2\u30FC\u30C9\u30D0\u30E9\u30F3\u30B9\u300D\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u56FA\u5B9A\u3055\u308C\u305F\u6027\u683C\u3084\u3001\u672C\u5F53\u306E\u81EA\u5206\u3092\u78BA\u5B9A\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u300C\u5F53\u305F\u3063\u3066\u3044\u308B\u300D\u300C\u5F53\u305F\u3063\u3066\u3044\u306A\u3044\u300D\u3060\u3051\u3067\u5224\u65AD\u305B\u305A\u3001"), /*#__PURE__*/React.createElement("div", {
    className: "my-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3 font-bold text-indigo-950"
  }, /*#__PURE__*/React.createElement("p", null, "\u300C\u306A\u305C\u4ECA\u65E5\u306F\u3053\u306E\u30E2\u30FC\u30C9\u304C\u524D\u306B\u51FA\u305F\u306E\u3060\u308D\u3046\u300D"), /*#__PURE__*/React.createElement("p", null, "\u300C\u666E\u6BB5\u3068\u9055\u3046\u3068\u3057\u305F\u3089\u3001\u4F55\u304C\u5F71\u97FF\u3057\u3066\u3044\u308B\u306E\u3060\u308D\u3046\u300D")), /*#__PURE__*/React.createElement("p", null, "\u3068\u3001\u81EA\u5206\u3092\u89B3\u5BDF\u3059\u308B\u305F\u3081\u306E\u6750\u6599\u3068\u3057\u3066\u6271\u3044\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "4."), "\u7D50\u679C\u306E\u5171\u6709\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", null, "\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u3067\u306F\u3001\u7D50\u679C\u753B\u9762\u3092\u898B\u305B\u5408\u3046\u3053\u3068\u3067\u3001\u304A\u4E92\u3044\u306E\u9055\u3044\u3084\u5171\u901A\u70B9\u306B\u3064\u3044\u3066\u5BFE\u8A71\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u305F\u3060\u3057\u3001\u5171\u6709\u306F\u672C\u4EBA\u306E\u610F\u601D\u3092\u5C0A\u91CD\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u767A\u8868\u3057\u305F\u304F\u306A\u3044\u4EBA\u306B\u7121\u7406\u306B\u8A71\u3057\u3066\u3082\u3089\u3063\u305F\u308A\u3001\u672C\u4EBA\u306E\u540C\u610F\u306A\u304F\u7D50\u679C\u3092\u64AE\u5F71\u30FB\u8EE2\u8F09\u30FB\u5171\u6709\u3057\u305F\u308A\u3057\u3066\u306F\u3044\u3051\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u307E\u305F\u3001\u6570\u5024\u306F\u305D\u306E\u4EBA\u306E\u4E2D\u3067\u306E\u30D0\u30E9\u30F3\u30B9\u3092\u8868\u3059\u3082\u306E\u3067\u3059\u3002\u4ED6\u306E\u4EBA\u3068\u70B9\u6570\u306E\u5927\u5C0F\u3092\u6BD4\u3079\u3066\u3082\u610F\u5473\u306F\u3042\u308A\u307E\u305B\u3093\u3002")), /*#__PURE__*/React.createElement("section", {
    className: "rounded-2xl border border-red-100 bg-red-50/70 p-4 sm:p-5 shadow-sm"
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-red-600"
  }, "5."), "\u3084\u3063\u3066\u306F\u3044\u3051\u306A\u3044\u4F7F\u3044\u65B9"), /*#__PURE__*/React.createElement("p", {
    className: "mb-3 font-black text-red-800"
  }, "\u3053\u3053\u306F\u5927\u4E8B\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2"
  }, prohibitedItems.map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    className: "flex gap-2 rounded-xl border border-red-100 bg-white/78 px-3 py-2 text-red-950"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-black text-red-600"
  }, "\xD7"), /*#__PURE__*/React.createElement("span", null, item))))), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "6."), "\u30CA\u30D3\u30B2\u30FC\u30BF\u30FC\u5411\u3051\u306E\u6CE8\u610F"), /*#__PURE__*/React.createElement("p", null, "\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u306E\u4E3B\u4EBA\u516C\u306F\u53C2\u52A0\u8005\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u30CA\u30D3\u30B2\u30FC\u30BF\u30FC\u306F\u3001\u53C2\u52A0\u8005\u3092\u5206\u6790\u3057\u305F\u308A\u3001\u6B63\u89E3\u3092\u6559\u3048\u305F\u308A\u3059\u308B\u4EBA\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002RIESM\u2122\u3068\u3044\u3046\u5730\u56F3\u3068\u3001\u305D\u306E\u898B\u65B9\u3092\u4F1D\u3048\u308B\u5F79\u5272\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u300C\u3042\u306A\u305F\u306F\u30A2\u30C0\u30D7\u30BF\u30FC\u3067\u3059\u306D\u300D\u3068\u65AD\u5B9A\u3059\u308B\u306E\u3067\u306F\u306A\u304F\u3001"), /*#__PURE__*/React.createElement("div", {
    className: "my-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3 font-bold text-indigo-950"
  }, /*#__PURE__*/React.createElement("p", null, "\u300C\u4ECA\u306F\u3001\u3069\u306E\u30E2\u30FC\u30C9\u304C\u524D\u306B\u51FA\u3066\u3044\u308B\u3088\u3046\u306B\u611F\u3058\u307E\u3059\u304B\uFF1F\u300D"), /*#__PURE__*/React.createElement("p", null, "\u300C\u3053\u306E\u7D50\u679C\u3092\u898B\u3066\u3001\u3069\u3093\u306A\u3053\u3068\u3092\u601D\u3044\u307E\u3057\u305F\u304B\uFF1F\u300D"), /*#__PURE__*/React.createElement("p", null, "\u300C\u6700\u8FD1\u3001\u3053\u306E\u30E2\u30FC\u30C9\u3092\u4F7F\u3063\u305F\u5834\u9762\u306F\u3042\u308A\u307E\u3057\u305F\u304B\uFF1F\u300D")), /*#__PURE__*/React.createElement("p", null, "\u306E\u3088\u3046\u306B\u3001\u672C\u4EBA\u306E\u6C17\u3065\u304D\u3092\u4E2D\u5FC3\u306B\u9032\u3081\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u76F8\u624B\u306E\u8A00\u8449\u30FB\u8868\u60C5\u30FB\u614B\u5EA6\u304B\u3089\u30D5\u30ED\u30F3\u30C8\u3092\u611F\u3058\u308B\u5834\u5408\u3082\u3001\u305D\u308C\u306F\u3042\u304F\u307E\u3067\u4EEE\u8AAC\u3067\u3059\u3002\u672C\u4EBA\u306E\u5185\u9762\u3092\u6C7A\u3081\u3064\u3051\u306A\u3044\u3088\u3046\u306B\u3057\u307E\u3057\u3087\u3046\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "7."), "\u601D\u3044\u3084\u308A\u3068\u30E2\u30FC\u30C9"), /*#__PURE__*/React.createElement("p", null, "RIESM\u2122\u3067\u306F\u3001\u601D\u3044\u3084\u308A\u3092\u5358\u306B\u300C\u3084\u3055\u3057\u304F\u3059\u308B\u3053\u3068\u300D\u3068\u306F\u8003\u3048\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u601D\u3044\u3084\u308A\u3068\u306F\u3001\u76F8\u624B\u306E\u30D5\u30ED\u30F3\u30C8\u3092\u6C17\u9063\u3044\u3001\u305D\u306E\u4EBA\u304C\u53D7\u3051\u53D6\u308A\u3084\u3059\u3044\u5165\u53E3\u304B\u3089\u8A00\u8449\u3092\u5C4A\u3051\u308B\u3053\u3068\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 grid gap-2 rounded-xl border border-slate-100 bg-slate-50/80 p-3 font-bold text-slate-800"
  }, /*#__PURE__*/React.createElement("p", null, "\u6311\u6226\u3057\u305F\u3044\u4EBA\u306B\u306F\u3001\u53EF\u80FD\u6027\u3084\u81EA\u7531\u3092\u3002"), /*#__PURE__*/React.createElement("p", null, "\u7D0D\u5F97\u3057\u305F\u3044\u4EBA\u306B\u306F\u3001\u76EE\u7684\u3084\u6839\u62E0\u3092\u3002"), /*#__PURE__*/React.createElement("p", null, "\u53D7\u5BB9\u3092\u6C42\u3081\u3066\u3044\u308B\u4EBA\u306B\u306F\u3001\u5171\u611F\u3084\u3064\u306A\u304C\u308A\u3092\u3002"), /*#__PURE__*/React.createElement("p", null, "\u4E0D\u5B89\u3092\u611F\u3058\u3066\u3044\u308B\u4EBA\u306B\u306F\u3001\u5B89\u5168\u3084\u898B\u901A\u3057\u3092\u3002")), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u540C\u3058\u5185\u5BB9\u3092\u4F1D\u3048\u308B\u5834\u5408\u3067\u3082\u3001\u5165\u53E3\u3092\u5909\u3048\u308B\u3053\u3068\u3067\u3001\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u306F\u3088\u308A\u5C4A\u304D\u3084\u3059\u304F\u306A\u308A\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "8."), "\u7406\u8AD6\u7684\u306A\u80CC\u666F\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", null, "RIESM\u2122\u306F\u3001\u4EA4\u6D41\u5206\u6790\u3068RIASEC\u3068\u3044\u3046\u3001\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u7406\u89E3\u30FB\u81EA\u5DF1\u7406\u89E3\u30FB\u30AD\u30E3\u30EA\u30A2\u7406\u89E3\u306E\u8003\u3048\u65B9\u3092\u80CC\u666F\u306B\u3057\u3066\u3044\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "RIESM\u2122 mini\u3067\u306F\u3001\u305D\u306E\u3046\u3061\u4E3B\u306B\u3001\u4EBA\u304C\u5834\u9762\u3084\u72B6\u614B\u306B\u3088\u3063\u3066\u7570\u306A\u308B\u53CD\u5FDC\u3092\u898B\u305B\u308B\u3068\u3044\u3046\u8003\u3048\u65B9\u3092\u3082\u3068\u306B\u3001\u5FC3\u306E\u5143\u6C17\u306E\u4F7F\u3044\u65B9\u30924\u3064\u306E\u30E2\u30FC\u30C9\u3068\u3057\u3066\u6271\u3044\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u30E2\u30FC\u30C9\u306F\u4EBA\u3092\u56FA\u5B9A\u3059\u308B\u305F\u3081\u306E\u540D\u524D\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3"
  }, "\u4ECA\u306E\u81EA\u5206\u3068\u76F8\u624B\u3092\u5C11\u3057\u4E01\u5BE7\u306B\u89B3\u5BDF\u3057\u3001\u5B89\u5FC3\u30FB\u53D7\u5BB9\u30FB\u7D0D\u5F97\u306E\u3042\u308B\u95A2\u4FC2\u304B\u3089\u3001\u81EA\u7136\u306A\u6311\u6226\u3084\u5BFE\u8A71\u3092\u751F\u307F\u51FA\u3059\u305F\u3081\u306E\u67A0\u7D44\u307F\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("section", {
    className: sectionClass
  }, /*#__PURE__*/React.createElement("h3", {
    className: sectionTitleClass
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-indigo-500"
  }, "9."), "\u753B\u50CF\u3067\u78BA\u8A8D\u3059\u308BRIESM\u2122"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "\u753B\u50CF\u3092\u30BF\u30C3\u30D7\u3059\u308B\u3068\u3001\u5927\u304D\u304F\u8868\u793A\u3067\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-4 sm:grid-cols-2"
  }, guideImages.map(image => /*#__PURE__*/React.createElement("button", {
    key: image.src,
    type: "button",
    onClick: () => setPreviewImage(image),
    className: "overflow-hidden rounded-2xl border border-amber-100 bg-white p-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  }, /*#__PURE__*/React.createElement("img", {
    className: "riesm-guide-image",
    src: image.src,
    alt: image.alt,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "block px-2 pb-1 pt-2 text-sm font-black text-slate-800"
  }, image.title)))))), /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-0 -mx-4 mt-5 border-t border-amber-100 bg-[#fffaf0] px-4 py-4 text-center sm:-mx-7 sm:px-7"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-900/15 transition hover:bg-indigo-700 sm:w-auto sm:min-w-48"
  }, "\u30C8\u30EA\u30BB\u30C4\u3092\u9589\u3058\u308B")))), previewImage && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[95] flex items-center justify-center bg-slate-950/85 p-3 sm:p-8",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": `${previewImage.title}の拡大画像`,
    onClick: () => setPreviewImage(null)
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-black text-slate-700 shadow-lg",
    onClick: () => setPreviewImage(null),
    "aria-label": "\u62E1\u5927\u753B\u50CF\u3092\u9589\u3058\u308B"
  }, "\xD7"), /*#__PURE__*/React.createElement("img", {
    src: previewImage.src,
    alt: previewImage.alt,
    className: "max-h-[92vh] max-w-[96vw] rounded-xl bg-white object-contain shadow-2xl",
    onClick: event => event.stopPropagation()
  })));
}
function ResultHistoryModal({
  entries,
  onClose
}) {
  const [selectedId, setSelectedId] = useState(entries[0]?.id || null);
  const [activeTab, setActiveTab] = useState('list');
  const selected = entries.find(entry => entry.id === selectedId) || entries[0] || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\u524D\u56DE\u307E\u3067\u306E\u7D50\u679C"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-[#fffdf8] shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-emerald-100 px-5 py-4 sm:px-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-black tracking-[0.2em] text-emerald-600"
  }, "LOCAL HISTORY"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-1 text-xl font-black text-slate-900 sm:text-2xl"
  }, "\u524D\u56DE\u307E\u3067\u306E\u7D50\u679C")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl font-black text-slate-500 shadow-sm",
    "aria-label": "\u5C65\u6B74\u3092\u9589\u3058\u308B"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-y-auto px-4 py-5 sm:px-7"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-left text-xs font-bold leading-relaxed text-amber-950 sm:text-sm"
  }, "\u203B\u5C65\u6B74\u306F\u901A\u5E38\u3001\u3053\u306E\u7AEF\u672B\u306E\u30D6\u30E9\u30A6\u30B6\u5185\u3060\u3051\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002TOP\u306E\u300CURL\u3067\u4FDD\u5B58\u30FB\u30D6\u30E9\u30A6\u30B6\u79FB\u52D5\u300D\u3067\u3001\u5225\u306E\u30D6\u30E9\u30A6\u30B6\u3078\u904E\u53BB100\u4EF6\u307E\u3067\u79FB\u305B\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 grid grid-cols-2 rounded-xl bg-slate-100 p-1",
    role: "tablist",
    "aria-label": "\u5C65\u6B74\u306E\u8868\u793A\u65B9\u6CD5"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "tab",
    "aria-selected": activeTab === 'list',
    onClick: () => setActiveTab('list'),
    className: `rounded-lg px-3 py-2 text-sm font-black transition ${activeTab === 'list' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`
  }, "\u4E00\u89A7\u8868\u793A"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "tab",
    "aria-selected": activeTab === 'graph',
    onClick: () => setActiveTab('graph'),
    className: `rounded-lg px-3 py-2 text-sm font-black transition ${activeTab === 'graph' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`
  }, "\u5909\u5316\u30B0\u30E9\u30D5")), entries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm font-bold text-slate-500"
  }, "\u307E\u3060\u4FDD\u5B58\u3055\u308C\u305F\u7D50\u679C\u306F\u3042\u308A\u307E\u305B\u3093\u3002") : activeTab === 'graph' ? /*#__PURE__*/React.createElement(MiniHistoryTrendGraph, {
    entries: entries
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2"
  }, entries.map(entry => {
    const modeOrder = getMiniHistoryModeOrder(entry.scores);
    return /*#__PURE__*/React.createElement("button", {
      key: entry.id,
      type: "button",
      onClick: () => setSelectedId(entry.id),
      className: `flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${selected?.id === entry.id ? 'border-emerald-400 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40'}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "riesm-history-blocks",
      "aria-label": "\u5DE6\u304B\u3089\u30D0\u30C3\u30AF\u30B9\u5074\u3001\u53F3\u304C\u30D5\u30ED\u30F3\u30C8\u5074\u306E4\u30E2\u30FC\u30C9"
    }, modeOrder.map(type => /*#__PURE__*/React.createElement("span", {
      key: type,
      className: "riesm-history-block",
      style: {
        backgroundColor: MINI_MODE_CARD_META[type].color
      }
    }))), /*#__PURE__*/React.createElement("span", {
      className: "min-w-0 flex-1 text-xs font-black text-slate-700 sm:text-sm"
    }, "\uFF5C", formatMiniHistoryDate(entry.createdAt)));
  })), selected && /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement(MiniModeBalanceCard, {
    scores: selected.scores,
    frontType: selected.resultType?.front || getMiniHistoryModeOrder(selected.scores).slice(-1)[0],
    displayName: "\u3053\u306E\u6642\u306E\u30E2\u30FC\u30C9\u30D0\u30E9\u30F3\u30B9"
  }))))));
}
const questionsPool = [{
  id: 1,
  group: 'A',
  text: "旅行の準備をする時、あなたは…",
  options: [{
    text: "気分で決めたい",
    type: "W"
  }, {
    text: "事前にリストアップする",
    type: "K"
  }]
}, {
  id: 2,
  group: 'A',
  text: "新しいプロジェクトが立ち上がりました。最初の関心は？",
  options: [{
    text: "新しい可能性や面白さ",
    type: "W"
  }, {
    text: "目的やスケジュールなどの手順",
    type: "K"
  }]
}, {
  id: 3,
  group: 'A',
  text: "部屋の片付けについて",
  options: [{
    text: "思い立った時に一気に",
    type: "W"
  }, {
    text: "普段から定位置を決める",
    type: "K"
  }]
}, {
  id: 4,
  group: 'A',
  text: "仕事で新しいツールを導入する時",
  options: [{
    text: "とりあえず触ってみる",
    type: "W"
  }, {
    text: "まずはマニュアルを読む",
    type: "K"
  }]
}, {
  id: 5,
  group: 'A',
  text: "休日、ふらっと立ち寄った書店で惹かれるのは？",
  options: [{
    text: "未知の新しいジャンルの本",
    type: "W"
  }, {
    text: "実生活に役立つ実用書",
    type: "K"
  }]
}, {
  id: 6,
  group: 'A',
  text: "目標を立てるとき",
  options: [{
    text: "ワクワクする大きなビジョン",
    type: "W"
  }, {
    text: "達成可能な数値と計画",
    type: "K"
  }]
}, {
  id: 7,
  group: 'A',
  text: "未知のトラブルが発生！最初のアクションは？",
  options: [{
    text: "直感を信じてとりあえず動く",
    type: "W"
  }, {
    text: "類似事例を探し、冷静に分析する",
    type: "K"
  }]
}, {
  id: 8,
  group: 'A',
  text: "趣味のアイテムを買うとき",
  options: [{
    text: "直感的な「好き！」で選ぶ",
    type: "W"
  }, {
    text: "スペックやコスパを比較検討する",
    type: "K"
  }]
}, {
  id: 9,
  group: 'A',
  text: "会議でのアイデア出し",
  options: [{
    text: "斬新で面白いアイデアを出す",
    type: "W"
  }, {
    text: "論理的で実現可能なアイデアを出す",
    type: "K"
  }]
}, {
  id: 10,
  group: 'B',
  text: "未経験の業務を任された時",
  options: [{
    text: "とりあえずやってみる",
    type: "W"
  }, {
    text: "リスクや前例を調べる",
    type: "A"
  }]
}, {
  id: 11,
  group: 'B',
  text: "複数人での食事、お店選びは？",
  options: [{
    text: "興味のある新しいお店",
    type: "W"
  }, {
    text: "みんなが安心できる無難なお店",
    type: "A"
  }]
}, {
  id: 12,
  group: 'B',
  text: "休日の予定が急に空きました",
  options: [{
    text: "面白そうなことを見つけて出かける",
    type: "W"
  }, {
    text: "家でいつものようにゆっくり過ごす",
    type: "A"
  }]
}, {
  id: 13,
  group: 'B',
  text: "会議で誰も発言しない沈黙の時間が流れたら…",
  options: [{
    text: "とりあえず声に出してみる",
    type: "W"
  }, {
    text: "誰かが話し出すのを待ち、静観する",
    type: "A"
  }]
}, {
  id: 14,
  group: 'B',
  text: "はじめて行く街を散策するとき",
  options: [{
    text: "気になるお店にふらっと寄り道する",
    type: "W"
  }, {
    text: "スマホでルートを常に確認する",
    type: "A"
  }]
}, {
  id: 15,
  group: 'B',
  text: "やったことのない新しい業務を打診されたら",
  options: [{
    text: "「面白そう！」と前向きに捉える",
    type: "W"
  }, {
    text: "リスクを考え、慎重になる",
    type: "A"
  }]
}, {
  id: 16,
  group: 'B',
  text: "いつもと違う帰り道を通ってみようか迷った時",
  options: [{
    text: "ワクワクして寄り道する",
    type: "W"
  }, {
    text: "道に迷うかもと不安になる",
    type: "A"
  }]
}, {
  id: 17,
  group: 'B',
  text: "グループ旅行の計画中、意見を求められたら",
  options: [{
    text: "「行きたい！」と思うスポットを提案する",
    type: "W"
  }, {
    text: "無理のない無難なスケジュールに賛同する",
    type: "A"
  }]
}, {
  id: 18,
  group: 'B',
  text: "予期せぬスケジュールの変更があった時",
  options: [{
    text: "新鮮で楽しいと感じる",
    type: "W"
  }, {
    text: "段取りが狂って強いストレスを感じる",
    type: "A"
  }]
}, {
  id: 19,
  group: 'C',
  text: "落ち込んでいる同僚がいたら…",
  options: [{
    text: "気持ちに寄り添って話を聞く",
    type: "N"
  }, {
    text: "原因を分析し、解決策を考える",
    type: "K"
  }]
}, {
  id: 20,
  group: 'C',
  text: "チームで仕事をする時、重視するのは？",
  options: [{
    text: "気持ちよく働ける「雰囲気」",
    type: "N"
  }, {
    text: "役割分担とルールの「正確さ」",
    type: "K"
  }]
}, {
  id: 21,
  group: 'C',
  text: "人から相談を受けた時",
  options: [{
    text: "感情に共感し、受け止める",
    type: "N"
  }, {
    text: "論理に基づき、正しい意見を伝える",
    type: "K"
  }]
}, {
  id: 22,
  group: 'C',
  text: "後輩が仕事でミスをしてしまった時",
  options: [{
    text: "気持ちに寄り添い、フォローする",
    type: "N"
  }, {
    text: "原因を分析し、再発防止策を指導する",
    type: "K"
  }]
}, {
  id: 23,
  group: 'C',
  text: "映画やドラマを見た後、誰かと感想を話すなら？",
  options: [{
    text: "感情を共有したい",
    type: "N"
  }, {
    text: "ストーリーの構成や矛盾点を考察したい",
    type: "K"
  }]
}, {
  id: 24,
  group: 'C',
  text: "チームのリーダーに最も必要だと思う要素は？",
  options: [{
    text: "悩みに寄り添い、温かい居場所を作れること",
    type: "N"
  }, {
    text: "的確な指示と管理ができること",
    type: "K"
  }]
}, {
  id: 25,
  group: 'C',
  text: "議論が白熱し、意見が対立している時",
  options: [{
    text: "誰も傷つかないよう間を取り持つ",
    type: "N"
  }, {
    text: "論点を整理し、合理的な結論へ導く",
    type: "K"
  }]
}, {
  id: 26,
  group: 'C',
  text: "家族や友人が「最近疲れてるんだ」と相談してきたら",
  options: [{
    text: "「いつも頑張ってるね」と労う",
    type: "N"
  }, {
    text: "具体的な解決策を提示する",
    type: "K"
  }]
}, {
  id: 27,
  group: 'C',
  text: "何か重要な決断を下す時に重視する基準は？",
  options: [{
    text: "関わる人がどう感じるか",
    type: "N"
  }, {
    text: "原理原則に則っているか",
    type: "K"
  }]
}, {
  id: 28,
  group: 'D',
  text: "会議で意見が対立しています",
  options: [{
    text: "気持ちを尊重し、間を取り持つ",
    type: "N"
  }, {
    text: "波風が立たないよう静観する",
    type: "A"
  }]
}, {
  id: 29,
  group: 'D',
  text: "頼まれごとをした時",
  options: [{
    text: "相手が助かるなら引き受ける",
    type: "N"
  }, {
    text: "断った後の影響を考えて引き受ける",
    type: "A"
  }]
}, {
  id: 30,
  group: 'D',
  text: "初対面の人が多い場では…",
  options: [{
    text: "孤立している人に声をかける",
    type: "N"
  }, {
    text: "自分が浮かないよう周囲を観察する",
    type: "A"
  }]
}, {
  id: 31,
  group: 'D',
  text: "職場でとても忙しそうにしている同僚を見かけたら",
  options: [{
    text: "積極的に声をかける",
    type: "N"
  }, {
    text: "邪魔にならないよう自分の仕事を進める",
    type: "A"
  }]
}, {
  id: 32,
  group: 'D',
  text: "複数人のLINEグループでのやり取り",
  options: [{
    text: "温かく反応を返す",
    type: "N"
  }, {
    text: "他の人のやり取りを見て無難に同調する",
    type: "A"
  }]
}, {
  id: 33,
  group: 'D',
  text: "友人との待ち合わせに、相手が遅刻してきそうなら",
  options: [{
    text: "相手を気遣う",
    type: "N"
  }, {
    text: "自分の予定を確認する",
    type: "A"
  }]
}, {
  id: 34,
  group: 'D',
  text: "パーティーなどの場で、ポツンと一人でいる人がいたら",
  options: [{
    text: "隣に行って話しかける",
    type: "N"
  }, {
    text: "話しかけるのを躊躇する",
    type: "A"
  }]
}, {
  id: 35,
  group: 'D',
  text: "上司から少し理不尽な指示を受けた時",
  options: [{
    text: "事情を汲んで受け入れる",
    type: "N"
  }, {
    text: "面倒になりそうだからとりあえず従う",
    type: "A"
  }]
}, {
  id: 36,
  group: 'D',
  text: "飲み会で大皿の料理が少しだけ残っている時",
  options: [{
    text: "周りの人に勧める",
    type: "N"
  }, {
    text: "周りの出方をうかがう",
    type: "A"
  }]
}];
const situationQuestionsPool = [{
  id: 101,
  isSituation: true,
  text: "今、あなたの手元に花があります。どんな風に飾りたいですか？",
  options: [{
    text: "無造作なブーケにする",
    type: "W"
  }, {
    text: "種類や高さを揃えて美しく生ける",
    type: "K"
  }]
}, {
  id: 102,
  isSituation: true,
  text: "今の気持ちを色に例えるなら、どちらに近いですか？",
  options: [{
    text: "やわらかな暖色",
    type: "N"
  }, {
    text: "深く落ち着いた寒色",
    type: "A"
  }]
}, {
  id: 103,
  isSituation: true,
  text: "今、歩いてみたいのはどんな道ですか？",
  options: [{
    text: "曲がりくねった小道",
    type: "W"
  }, {
    text: "見通しの良い平坦な道",
    type: "A"
  }]
}, {
  id: 104,
  isSituation: true,
  text: "絵の具で絵を描くなら、どんなスタイルが良いですか？",
  options: [{
    text: "思いのままに筆を走らせる",
    type: "W"
  }, {
    text: "構図を決め、丁寧に塗る",
    type: "K"
  }]
}, {
  id: 105,
  isSituation: true,
  text: "音楽を聴くとき、今のあなたがより惹かれるのは？",
  options: [{
    text: "想いや感情が伝わる曲",
    type: "N"
  }, {
    text: "緻密な音の構成が美しい曲",
    type: "K"
  }]
}, {
  id: 106,
  isSituation: true,
  text: "休日の朝、窓の外の風景はどちらが良いですか？",
  options: [{
    text: "雲ひとつない青空",
    type: "W"
  }, {
    text: "しとしとと降る静かな雨",
    type: "A"
  }]
}, {
  id: 107,
  isSituation: true,
  text: "お茶の時間を楽しむなら、どちらが良いですか？",
  options: [{
    text: "誰かとおしゃべりしながら",
    type: "N"
  }, {
    text: "一人で静かに本を読みながら",
    type: "A"
  }]
}, {
  id: 108,
  isSituation: true,
  text: "未知の世界を旅するなら、何を持って行きたいですか？",
  options: [{
    text: "真っ白なスケッチブック",
    type: "W"
  }, {
    text: "精密なコンパス",
    type: "K"
  }]
}, {
  id: 109,
  isSituation: true,
  text: "今のあなたの内側にあるエネルギーは、どちらに近いですか？",
  options: [{
    text: "ゆっくり育む「土」",
    type: "N"
  }, {
    text: "鋭く本質を見抜く「鷹」",
    type: "K"
  }]
}];
const resultsData = {
  W: {
    title: "ワンダー",
    subTitle: "（自由・発見・挑戦）",
    detail: ["あなたは決して「落ち着きがない・無鉄砲」なわけではありません。停滞を打ち破り、新しいことを始めるための「生きる原動力・エンジン」として機能しています。\n\n今は理屈やルールを少しだけ横に置いて、思い切り自由に「ワクワクすること」を楽しむことを自分に許可してあげてください。", "今は「これ面白そう！」と未知の世界に飛び込む好奇心のエネルギーが満ちています。周囲からは「枠に収まらない」と思われることもあるかもしれませんが、あなたは「新しい発見やブレイクスルーを生み出す着火剤」です。\n\nまずは心の動くままに、制約を忘れてアイデアを広げてみてください。", "十分に安心できる状態が整い、「ちょっと挑戦してみようかな」という内発的なエネルギーが自然と湧き上がっている状態です。あなたは「チームに活気と新しい風を吹き込む役割」を担っています。\n\n今は「できる・できない」の損得勘定を一旦脇に置き、直感に従って動いてみましょう。"],
    theme: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      cardBg: "bg-amber-100/50",
      header: "from-amber-400 to-orange-500",
      text: "text-amber-900",
      textLight: "text-amber-700",
      btnBg: "bg-amber-100",
      btnHover: "hover:bg-amber-200"
    }
  },
  K: {
    title: "キーパー",
    subTitle: "（信念・論理・規律）",
    detail: ["あなたは決して「頭が固い・冷たい」わけではありません。チームや自分自身を危険から守り、物事を確実な成功へと導く「信頼のアンカー（錨）」として機能しています。\n\n今は「自分の信じる正しさ」を大切にし、筋道立てて物事を進めることに自信を持ってください。", "今は「目的・論理・正しさ」を重んじ、安全な計画を立てようとするエネルギーが前に出ています。周りから「口うるさい」と誤解されることもあるかもしれませんが、あなたは「みんなが安全に活動できるための『守りの柵』を築いてくれている」状態です。\n\nあなたの論理的な判断は、周囲を守る大きな優しさです。", "物事の「原理原則」や「納得感」を大切にするエネルギーが高まっています。「これをやることは正しい」と納得できた時、あなたは力強い原動力となります。決して冷たいのではなく、ルールや仕組みを整えることで全体を良くしようとする「静かなる情熱」です。\n\n今はご自身のペースで、事実と論理を積み上げるプロセスを大切にしてください。"],
    theme: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      cardBg: "bg-blue-100/50",
      header: "from-blue-500 to-indigo-600",
      text: "text-blue-900",
      textLight: "text-blue-700",
      btnBg: "bg-blue-100",
      btnHover: "hover:bg-blue-200"
    }
  },
  N: {
    title: "ナーチャー",
    subTitle: "（保護・調和）",
    detail: ["あなたは決して「お節介・甘やかしている」わけではありません。人が安心して存在できる温かい居場所を作り、組織やチームに潤いをもたらす「心のオアシス」として機能しています。\n\n今は、その豊かな感受性と優しさを、他者だけでなく「自分自身」にも向けてあげてください。", "他者の感情に寄り添い、気持ちを受け止めようとするエネルギーが前面に出ています。「ただ話を聞いて受け止める」というあなたの姿勢は、周囲の心理的安全性を育む「土」のような役割を果たしています。\n\n今は解決策を急がず、「ただそこにいて共感する」というあなたらしい優しさを大切にしてください。", "周囲の人が心地よく過ごせているか、温かい視点で見守るエネルギーが高まっています。あなたはチームの潤滑油であり、波風を立てずに調和をもたらす大切な存在です。\n\n誰かを気遣うのと同じくらい、ご自身の心と体が心地よいと感じる時間もたっぷりと取ってあげてください。"],
    theme: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      cardBg: "bg-pink-100/50",
      header: "from-pink-400 to-rose-500",
      text: "text-pink-900",
      textLight: "text-pink-700",
      btnBg: "bg-pink-100",
      btnHover: "hover:bg-pink-200"
    }
  },
  A: {
    title: "アダプター",
    subTitle: "（洞察・適応）",
    detail: ["あなたは決して「臆病・消極的」なわけではありません。リスクを未然に防ぎ、周囲との摩擦を減らして安全な状態をキープする「高感度な危機管理レーダー」として機能しています。\n\n今は「不安を感じること」そのものを肯定し、まずは自分が一番安心できる環境や状態を確保することを最優先にしてください。", "曖昧なことを避け、確実で安全な道を探るエネルギーが強くなっています。あなたは「臆病」なのではなく、慎重にリスクを回避し、大きな失敗からみんなを守る「優秀なセンサー」です。\n\n無理に前に出る必要はありません。まずはご自身の安全基地を確保し、「大丈夫」と思えるまで待つことを許可してください。", "周囲の期待や状況を敏感に察知し、最適に合わせようとするエネルギーが出ています。あなたが「空気を読む」ことで、無用なトラブルが回避されています。\n\n今は「挑戦」よりも「安心」を優先する時期です。「どうせなら失敗しない確実な方法でやろう」と、自分を守る選択に自信を持ってください。"],
    theme: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      cardBg: "bg-cyan-100/50",
      header: "from-cyan-400 to-teal-500",
      text: "text-cyan-900",
      textLight: "text-cyan-700",
      btnBg: "bg-cyan-100",
      btnHover: "hover:bg-cyan-200"
    }
  }
};
const secondAdditions = {
  W: "さらに、ワンダーの「楽しさや自由な発想」も同時に強く働いているため、ただ枠に収まるだけでなく、新しい可能性や面白さも積極的に取り入れていける素晴らしいバランスです。",
  K: "さらに、キーパーの「計画性や確実性」も同時に強く働いているため、勢い任せになるのではなく、しっかりと現実的な形に落とし込みながら進んでいける非常に安定した状態です。",
  N: "さらに、ナーチャーの「他者への思いやりや共感」も同時に強く働いているため、周囲の人々を温かく巻き込み、良好な関係性を保ちながら進んでいける状態です。",
  A: "さらに、アダプターの「慎重さやリスク回避の視点」も同時に強く働いているため、細部まで気を配り、つまずきや失敗を防ぐ確かな足場も確保できているとても頼もしい状態です。"
};
const doubleThemes = {
  K_W: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    cardBg: "bg-teal-100/50",
    header: "from-amber-400 to-blue-500",
    text: "text-teal-900",
    textLight: "text-teal-700",
    btnBg: "bg-teal-100",
    btnHover: "hover:bg-teal-200"
  },
  N_W: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    cardBg: "bg-orange-100/50",
    header: "from-amber-400 to-pink-400",
    text: "text-orange-900",
    textLight: "text-orange-700",
    btnBg: "bg-orange-100",
    btnHover: "hover:bg-orange-200"
  },
  A_W: {
    bg: "bg-lime-50",
    border: "border-lime-200",
    cardBg: "bg-lime-100/50",
    header: "from-amber-400 to-cyan-400",
    text: "text-lime-900",
    textLight: "text-lime-700",
    btnBg: "bg-lime-100",
    btnHover: "hover:bg-lime-200"
  },
  K_N: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    cardBg: "bg-violet-100/50",
    header: "from-blue-500 to-pink-500",
    text: "text-violet-900",
    textLight: "text-violet-700",
    btnBg: "bg-violet-100",
    btnHover: "hover:bg-violet-200"
  },
  A_K: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    cardBg: "bg-sky-100/50",
    header: "from-blue-500 to-cyan-500",
    text: "text-sky-900",
    textLight: "text-sky-700",
    btnBg: "bg-sky-100",
    btnHover: "hover:bg-sky-200"
  },
  A_N: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    cardBg: "bg-fuchsia-100/50",
    header: "from-pink-400 to-cyan-400",
    text: "text-fuchsia-900",
    textLight: "text-fuchsia-700",
    btnBg: "bg-fuchsia-100",
    btnHover: "hover:bg-fuchsia-200"
  }
};
const bgColors = {
  W: '251, 191, 36',
  // amber-400
  K: '59, 130, 246',
  // blue-500
  N: '244, 114, 182',
  // pink-400
  A: '34, 211, 238' // cyan-400
};
const practiceQuestion = {
  isPractice: true,
  text: "喉が渇いて何かを飲もうとしています",
  options: [{
    text: "紅茶を飲む",
    type: "A"
  }, {
    text: "麦茶を飲む",
    type: "N"
  }]
};
const backsData = {
  W: {
    title: "ワンダー",
    desc: "今は「新しいこと」や「ワクワク」を少しお休みして、着実さや周囲との調和を優先している状態です。\nノリや勢いを求められ続けたり、沢山のアイデアを求められたりすると疲れやすいかもしれません。\n\n【バックスに潜む価値観（not Will）】\nワンダーがバックスにある人は、「リスクをとりたくない」と感じやすいかもしれません。\nでも、それは単に臆病ということではありません。\n\n・失敗で誰かに迷惑をかけたくない\n・不確実なことに振り回されたくない\n・安全に、確実に進めたい\n\nそうした価値観があるからこそ、リスクをとることに慎重になるのです。"
  },
  K: {
    title: "キーパー",
    desc: "今は「ルール」や「正確さ」よりも、柔軟な発想や周囲の感情に寄り添うことを大切にしている状態です。\n人に指示をしなくてはいけないシーンや、自分を律し続けないシーンが続くと疲れを感じやすいかもしれません。\n\n【バックスに潜む価値観（not Will）】\nキーパーがバックスにある人は、「厳しくしたくない」と感じやすいかもしれません。\nでも、それは判断力がないということではありません。\n\n・人をルールで縛りたくない\n・正しさを押しつけたくない\n・相手の自由や柔軟さを奪いたくない\n\nそうした価値観があるからこそ、厳しさや線引きに慎重になるのです。"
  },
  N: {
    title: "ナーチャー",
    desc: "今は「他者への共感」や「気遣い」よりも、自分の直感や論理的な判断を優先して進みたい状態です。\n人を気遣わなくてはいけないシーン、人に気遣い続けられるシーンが続くと疲れやすいかもしれません。\n\n【バックスに潜む価値観（not Will）】\nナーチャーがバックスにある人は、「甘やかしたくない」と感じやすいかもしれません。\nでも、それは冷たいということではありません。\n\n・相手の成長を奪いたくない\n・依存を生みたくない\n・本当にその人のためになる関わりをしたい\n\nそうした価値観があるからこそ、受け止めることや寄り添うことに距離を取ることがあるのです。"
  },
  A: {
    title: "アダプター",
    desc: "今は「失敗への警戒」や「空気を読むこと」を手放し、自分の信念や直感を信じて大胆に動けている状態です。\n人に合わせなくてはいけないシーンが続くと疲れを感じやすいかもしれません。\n\n【バックスに潜む価値観（not Will）】\nアダプターがバックスにある人は、「従いたくない」と感じやすいかもしれません。\nでも、それは協調性がないということではありません。\n\n・自分を見失いたくない\n・流されたくない\n・迎合して、自分の意思を消したくない\n\nそうした価値観があるからこそ、合わせることに強い抵抗を感じることがあるのです。"
  }
};

// ==========================================
// メインアプリケーション
// ==========================================
function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultType, setResultType] = useState(null);
  const [resultScores, setResultScores] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isSavingModeCard, setIsSavingModeCard] = useState(false);
  const [modeCardName, setModeCardName] = useState('今のモードバランス');
  const [modeCardNameInput, setModeCardNameInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showWorkshopGuide, setShowWorkshopGuide] = useState(false);
  const [showResultHistory, setShowResultHistory] = useState(false);
  const [resultHistory, setResultHistory] = useState(() => initializeMiniResultHistory());
  const [historyTransferUrl, setHistoryTransferUrl] = useState('');
  const [isCreatingHistoryTransferUrl, setIsCreatingHistoryTransferUrl] = useState(false);
  const [historyTransferCopyState, setHistoryTransferCopyState] = useState('idle');

  // モード切替 (TOPページのみで変更)
  const [colorMode, setColorMode] = useState('natural');

  // 2度タップ用のステート
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [tempSelectedChoiceIndex, setTempSelectedChoiceIndex] = useState(null);
  const [isPractice, setIsPractice] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [hoverPos, setHoverPos] = useState(50); // 0〜100

  useEffect(() => {
    if (started && !resultType) {
      setHoverPos(50);
      setSelectedChoiceIndex(null);
      setTempSelectedChoiceIndex(null);
    }
  }, [currentIndex, started, resultType, isPractice]);
  useEffect(() => {
    let isActive = true;
    importMiniResultHistoryFromUrl().then(importedHistory => {
      if (isActive) setResultHistory(importedHistory);
    });
    return () => {
      isActive = false;
    };
  }, []);
  const shuffleArray = array => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const generateTodayQuestions = useCallback(() => {
    const getRandom = (arr, n) => shuffleArray([...arr]).slice(0, n);
    let textSelected = [...getRandom(questionsPool.filter(q => q.group === 'A'), 3), ...getRandom(questionsPool.filter(q => q.group === 'B'), 3), ...getRandom(questionsPool.filter(q => q.group === 'C'), 3), ...getRandom(questionsPool.filter(q => q.group === 'D'), 3)];
    textSelected = shuffleArray(textSelected).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    let situationSelected = shuffleArray(situationQuestionsPool).slice(0, 3).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    return [...textSelected, ...situationSelected];
  }, []);
  const startQuiz = () => {
    const questions = generateTodayQuestions();
    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setAnswers([]);
    setResultType(null);
    setResultScores(null);
    setModeCardName('今のモードバランス');
    setModeCardNameInput('');
    setSelectedChoiceIndex(null);
    setTempSelectedChoiceIndex(null);
    setIsPractice(false);
    setTutorialCompleted(false);
    setStarted(true);
  };
  const startTutorial = () => {
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setResultType(null);
    setResultScores(null);
    setModeCardName('今のモードバランス');
    setModeCardNameInput('');
    setSelectedChoiceIndex(null);
    setTempSelectedChoiceIndex(null);
    setIsPractice(true);
    setTutorialCompleted(false);
    setHoverPos(50);
    setStarted(true);
  };
  const returnToTop = () => {
    setStarted(false);
    setIsPractice(false);
    setTutorialCompleted(false);
    setSelectedChoiceIndex(null);
    setTempSelectedChoiceIndex(null);
    setHoverPos(50);
  };
  const handleAnswer = useCallback(scoreUpdates => {
    const newAnswers = [...answers, scoreUpdates];
    setAnswers(newAnswers);
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  }, [answers, currentIndex, currentQuestions]);
  const handleBack = () => {
    // チュートリアル中、または本番の1問目の場合はトップ画面に戻る
    if (isPractice || currentIndex === 0) {
      returnToTop();
      return;
    }
    // 本番の2問目以降は、1つ前の質問に戻る
    if (currentIndex > 0) {
      setSelectedChoiceIndex(null);
      setTempSelectedChoiceIndex(null);
      setCurrentIndex(currentIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // --- 6択ボタン用 二度タップ選択の処理 ---
  const handleChoiceSelect = choice => {
    if (selectedChoiceIndex !== null) return;
    if (tempSelectedChoiceIndex !== choice.index) {
      // 1回目のタップ (仮選択)
      setTempSelectedChoiceIndex(choice.index);
    } else {
      // 2回目のタップ (本決定)
      setSelectedChoiceIndex(choice.index);
      setTempSelectedChoiceIndex(null);
      window.setTimeout(() => {
        if (isPractice) {
          setTutorialCompleted(true);
          return;
        }
        handleAnswer(choice.scoreUpdates);
      }, 350);
    }
  };
  const calculateResult = finalAnswers => {
    const scores = {
      W: 0,
      K: 0,
      N: 0,
      A: 0
    };
    finalAnswers.forEach(updates => {
      updates.forEach(update => {
        if (scores[update.type] !== undefined) scores[update.type] += update.weight;
      });
    });
    const sortedTypes = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const maxType = sortedTypes[0];
    const maxScore = scores[maxType];
    const secondType = sortedTypes[1];
    const secondScore = scores[secondType];
    const minType = sortedTypes[3];
    let front = maxType;
    let isDouble = false;
    let frontKey = "";
    if (maxScore > 0) {
      const ratio = secondScore / maxScore;
      if (ratio >= 0.85) {
        isDouble = true;
        frontKey = [maxType, secondType].sort().join('_');
      }
    }
    const detailIndex = Math.floor(Math.random() * 3);
    const nextResultType = {
      front: front,
      second: secondType,
      back: minType,
      isDouble: isDouble,
      frontKey: frontKey,
      detailIndex: detailIndex
    };
    setResultScores(scores);
    setResultType(nextResultType);
    const createdAt = Date.now();
    setResultHistory(storeMiniResultHistory({
      id: `${createdAt}-${Math.random().toString(36).slice(2, 9)}`,
      createdAt,
      scores,
      resultType: nextResultType
    }));
  };
  const showToast = message => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 5000);
  };
  const copyTextToClipboard = async text => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    if (!copied) throw new Error('コピーに失敗しました。');
  };
  const handleCreateHistoryTransferUrl = async () => {
    setIsCreatingHistoryTransferUrl(true);
    setHistoryTransferCopyState('creating');
    try {
      const history = mergeMiniResultHistory(resultHistory, readMiniResultHistory());
      const payload = await encodeMiniResultHistory(history);
      if (!payload) {
        setHistoryTransferCopyState('idle');
        showToast('保存できる結果がまだありません。先に「いまの自分を観る」を実施してください。');
        return;
      }
      const url = new URL(window.location.href);
      url.searchParams.set(MINI_HISTORY_URL_PARAM, payload);
      const transferUrl = url.toString();
      setHistoryTransferUrl(transferUrl);
      try {
        await copyTextToClipboard(transferUrl);
        setHistoryTransferCopyState('copied');
        showToast(`過去${history.length}件の履歴を圧縮・暗号化したURLをコピーしました。`);
      } catch (copyError) {
        console.warn('履歴URLを自動コピーできませんでした。', copyError);
        setHistoryTransferCopyState('ready');
        showToast('URLを作成しました。表示されたURLをコピーして保存してください。');
      }
    } catch (error) {
      console.warn('履歴URLを作成できませんでした。', error);
      setHistoryTransferCopyState('error');
      showToast('履歴URLを作成できませんでした。このブラウザの暗号化機能をご確認ください。');
    } finally {
      setIsCreatingHistoryTransferUrl(false);
    }
  };
  const handleApplyModeCardName = () => {
    const normalizedName = modeCardNameInput.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!normalizedName) {
      showToast('お名前を入力してください。');
      return;
    }
    setModeCardName(normalizedName);
    showToast('カードのお名前を変更しました。');
  };
  const handleSaveModeCard = async () => {
    const element = document.getElementById('riesm-mini-mode-card');
    if (!element || !window.html2canvas) {
      showToast('エラー：カード画像の生成に失敗しました。');
      return;
    }
    setIsSavingModeCard(true);
    let exportHost = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      // Always render from the same reference width. Rendering the responsive
      // on-screen element directly makes the downloaded PNG depend on the
      // phone/PC viewport and can change text wrapping and vertical rhythm.
      exportHost = document.createElement('div');
      exportHost.setAttribute('aria-hidden', 'true');
      Object.assign(exportHost.style, {
        position: 'fixed',
        left: '-10000px',
        top: '0',
        width: '455px',
        height: 'auto',
        pointerEvents: 'none'
      });
      const exportCard = element.cloneNode(true);
      exportCard.removeAttribute('id');
      exportCard.style.width = '455px';
      exportHost.appendChild(exportCard);
      document.body.appendChild(exportHost);
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const canvas = await window.html2canvas(exportCard, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fffdf8',
        logging: false,
        width: 455,
        height: 275,
        windowWidth: 455,
        windowHeight: 275
      });
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG変換に失敗しました。')), 'image/png');
      });
      const safeName = modeCardName.replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_').slice(0, 60) || '今のモードバランス';
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `RIESM_ModeCard_${safeName}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      showToast('パーソナルモードカードを画像で保存しました。');
    } catch (error) {
      console.error('ModeCard save failed:', error);
      showToast('エラー：カード画像の生成に失敗しました。もう一度お試しください。');
    } finally {
      if (exportHost) exportHost.remove();
      setIsSavingModeCard(false);
    }
  };
  const handleShare = async () => {
    setIsSharing(true);
    const element = document.getElementById('capture-area');
    if (!element || !window.html2canvas) {
      showToast('エラー：画像の生成に失敗しました。');
      setIsSharing(false);
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvas = await window.html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: clonedDoc => {
          const watermark = clonedDoc.getElementById('capture-watermark');
          if (watermark) {
            watermark.style.display = 'block';
          }
        }
      });
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'riesm_mini_result.png', {
        type: 'image/png'
      });
      const shareText = "約３分！やるたびに設問が替わり今の自分を感じれる #RIESM_mini🌈\n私のいまの「心のフロント」はこんな感じでした✨皆さんも体験してみて！🔍#自己理解\nhttps://ninin-cc.github.io/rm/";
      if (navigator.canShare && navigator.canShare({
        files: [file]
      })) {
        try {
          await navigator.share({
            text: shareText,
            files: [file]
          });
        } catch (shareError) {
          console.log('Share canceled or failed:', shareError);
        }
      } else {
        fallbackShare(shareText, dataUrl);
      }
    } catch (error) {
      console.error('Share failed:', error);
      showToast('エラー：画像の生成に失敗しました。もう一度お試しください。');
    } finally {
      setIsSharing(false);
    }
  };
  const fallbackShare = (text, dataUrl) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      const link = document.createElement('a');
      link.download = 'riesm_mini_result.png';
      link.href = dataUrl;
      link.click();
      showToast('結果画像を保存し、投稿文をコピーしました！\nSNSに画像を添付して投稿してください。');
    } catch (err) {
      console.error('Fallback copy/download failed', err);
      showToast('画像の保存に失敗しました。');
    }
  };

  // ==========================================
  // 画面描画: トップ（未開始）
  // ==========================================
  if (!started) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen flex items-center justify-center p-4 bg-gray-50 flex-col selection:bg-indigo-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-md w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center animate-fade-in border border-slate-100 relative overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-20 -right-20 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute -bottom-20 -left-20 w-40 h-40 bg-pink-50 rounded-full blur-3xl opacity-60 pointer-events-none"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 mb-6 flex items-center justify-center gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-none items-center justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-4xl sm:text-5xl"
    }, "\uD83C\uDF08")), /*#__PURE__*/React.createElement("h1", {
      className: "text-left text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
    }, "RIESM\u2122 mini")), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center gap-3 sm:gap-4 mb-8 relative z-10"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setColorMode('natural'),
      className: `flex items-center gap-1.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[13px] sm:text-sm transition-all shadow-sm border border-slate-200 ${colorMode === 'natural' ? 'bg-white text-slate-800 font-extrabold shadow-md' : 'bg-white text-slate-500 font-bold hover:bg-slate-50'}`
    }, "\uD83C\uDF3F \u30CA\u30C1\u30E5\u30E9\u30EB"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setColorMode('colorful'),
      className: `flex items-center gap-1.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[13px] sm:text-sm transition-all shadow-sm border border-slate-200 ${colorMode === 'colorful' ? 'bg-white text-slate-800 font-extrabold shadow-md' : 'bg-white text-slate-500 font-bold hover:bg-slate-50'}`
    }, "\uD83C\uDFA8 \u30AB\u30E9\u30D5\u30EB")), /*#__PURE__*/React.createElement("p", {
      className: "relative z-10 text-slate-600 mb-8 font-medium leading-relaxed text-sm sm:text-base"
    }, "\u4ECA\u306E\u3042\u306A\u305F\u306E\u300C\u5FC3\u306E\u30E2\u30FC\u30C9\uFF08\u30D5\u30ED\u30F3\u30C8\uFF09\u300D\u3092\u6E2C\u308A\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u76F4\u611F\u3067\u3001\u3044\u307E\u306E\u81EA\u5206\u306B\u8FD1\u3044\u65B9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 space-y-4 mb-10"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: startTutorial,
      className: "w-full py-4 px-6 bg-white text-slate-700 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98] border-2 border-slate-200 flex justify-center items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", null, "\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB")), /*#__PURE__*/React.createElement("button", {
      onClick: startQuiz,
      className: `w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2 ${colorMode === 'colorful' ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white hover:opacity-90' : 'bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950 hover:opacity-90'}`
    }, /*#__PURE__*/React.createElement("span", null, "\u3044\u307E\u306E\u81EA\u5206\u3092\u89B3\u308B")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setResultHistory(readMiniResultHistory());
        setShowResultHistory(true);
      },
      className: `w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2 ${colorMode === 'colorful' ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white hover:opacity-90' : 'bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950 hover:opacity-90'}`
    }, /*#__PURE__*/React.createElement("span", null, "\u524D\u56DE\u307E\u3067\u306E\u7D50\u679C\u3092\u89B3\u308B")), /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 bg-slate-50/80 p-3 shadow-sm"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: handleCreateHistoryTransferUrl,
      disabled: isCreatingHistoryTransferUrl,
      className: `flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold shadow-sm transition active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 sm:text-base ${historyTransferCopyState === 'copied' ? 'border-emerald-300 bg-emerald-100 text-emerald-900' : 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:border-emerald-400 hover:bg-emerald-100'}`
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\uD83D\uDD17"), /*#__PURE__*/React.createElement("span", {
      className: "flex flex-col items-center leading-tight"
    }, /*#__PURE__*/React.createElement("span", null, "URL\u3067\u4FDD\u5B58\u30FB\u30D6\u30E9\u30A6\u30B6\u79FB\u52D5"), /*#__PURE__*/React.createElement("span", {
      className: "mt-1 text-[10px] font-bold text-emerald-700 sm:text-xs"
    }, isCreatingHistoryTransferUrl ? 'URLを作成してコピー中...' : historyTransferCopyState === 'copied' ? '✅コピーされました' : 'ここを押すとURLがコピーされます'))), /*#__PURE__*/React.createElement("p", {
      className: "mt-2 px-1 text-left text-[11px] leading-relaxed text-slate-500 sm:text-xs"
    }, "\u904E\u53BB100\u4EF6\u307E\u3067\u306E\u5C65\u6B74\u3092\u5727\u7E2E\u3057\u3066URL\u306B\u4FDD\u5B58\u3057\u307E\u3059\u3002\u5225\u306E\u30D6\u30E9\u30A6\u30B6\u3067URL\u3092\u958B\u304F\u3068\u5C65\u6B74\u3092\u5FA9\u5143\u3067\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
      "aria-live": "polite",
      role: "status"
    }, historyTransferCopyState === 'ready' && /*#__PURE__*/React.createElement("p", {
      className: "mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-left text-xs font-bold leading-relaxed text-amber-950 sm:text-sm"
    }, "URL\u306F\u4F5C\u6210\u3067\u304D\u307E\u3057\u305F\u3002\u81EA\u52D5\u30B3\u30D4\u30FC\u306F\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081\u3001\u4E0B\u306E\u300C\u3053\u306EURL\u3092\u30B3\u30D4\u30FC\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), historyTransferCopyState === 'error' && /*#__PURE__*/React.createElement("p", {
      className: "mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-left text-xs font-bold leading-relaxed text-red-900 sm:text-sm"
    }, "URL\u3092\u4F5C\u6210\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30D6\u30E9\u30A6\u30B6\u3092\u66F4\u65B0\u3057\u3066\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002")), historyTransferUrl && /*#__PURE__*/React.createElement("div", {
      className: "mt-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "history-transfer-url",
      className: "mb-1 block text-left text-[11px] font-bold text-emerald-800"
    }, historyTransferCopyState === 'copied' ? 'コピー済みの保存用URL' : '履歴を含む保存用URL'), /*#__PURE__*/React.createElement("textarea", {
      id: "history-transfer-url",
      readOnly: true,
      value: historyTransferUrl,
      onFocus: event => event.currentTarget.select(),
      rows: "3",
      className: "w-full resize-none rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-[10px] leading-relaxed text-slate-700 outline-none focus:border-emerald-400 sm:text-xs",
      "aria-label": "\u5C65\u6B74\u3092\u542B\u3080\u4FDD\u5B58\u7528URL"
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: async () => {
        try {
          await copyTextToClipboard(historyTransferUrl);
          setHistoryTransferCopyState('copied');
          showToast('保存用URLをコピーしました。');
        } catch (error) {
          setHistoryTransferCopyState('ready');
          showToast('自動コピーできませんでした。URL欄を選択してコピーしてください。');
        }
      },
      className: "mt-2 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
    }, historyTransferCopyState === 'copied' ? 'このURLをもう一度コピー' : 'このURLをコピー'))), /*#__PURE__*/React.createElement(WorkshopLicenseCard, null), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setShowWorkshopGuide(true),
      className: "w-full rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-md"
    }, /*#__PURE__*/React.createElement("span", {
      className: "block text-[10px] font-black tracking-[0.18em] text-indigo-500"
    }, "WORKSHOP GUIDE"), /*#__PURE__*/React.createElement("span", {
      className: "mt-1 block text-sm sm:text-base font-black leading-relaxed text-indigo-950"
    }, "\u3053\u306E\u30A2\u30D7\u30EA\u3092\u300C\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u300D\u3067\u4F7F\u3046\u3068\u304D\u306E\u30C8\u30EA\u30BB\u30C4"))), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 bg-indigo-50/50 rounded-2xl p-5 text-left border border-indigo-100/50 mb-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-3 mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mt-0.5"
    }, /*#__PURE__*/React.createElement(InfoIcon, null)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs sm:text-sm text-indigo-900/80 leading-relaxed"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-indigo-900"
    }, "\u5FC3\u306E\u72B6\u614B\u306F\u300C\u5929\u6C17\u300D\u306E\u3088\u3046\u306B\u6BCE\u65E5\u63FA\u3089\u304E\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("br", null), "\u3053\u306E\u30A2\u30D7\u30EA\u306F\u3001\u5909\u5316\u3059\u308B\u30D5\u30ED\u30F3\u30C8\u3092\u89B3\u308B\u300C\u5FC3\u306E\u4F53\u6E29\u8A08\u300D\u3067\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u57FA\u790E\u4F53\u6E29\u3092\u6E2C\u308B\u3088\u3046\u306B\u3001\u6C17\u306B\u306A\u3063\u305F\u6642\u306B\u4F55\u5EA6\u3067\u3082\u8A66\u3057\u3066\u307F\u3066\u304F\u3060\u3055\u3044\u3002", /*#__PURE__*/React.createElement("br", null), "\u9006\u306B", /*#__PURE__*/React.createElement("span", {
      className: "font-bold text-indigo-900"
    }, "\u300C\u4F55\u5EA6\u3084\u3063\u3066\u3082\u5909\u308F\u3089\u306A\u3044\u90E8\u5206\uFF08\u30D0\u30C3\u30AF\u30B9\uFF09\u300D"), "\u306B\u6C17\u3065\u304F\u3053\u3068\u3082\u3001\u5927\u5207\u306A\u89B3\u6E2C\u306E1\u3064\u3067\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
      className: "bg-white/80 rounded-xl p-3 text-[11px] sm:text-xs text-indigo-900/80 font-medium flex items-center justify-center gap-2 shadow-sm border border-indigo-50"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm"
    }, "\uD83D\uDCF1"), " \u30D6\u30E9\u30A6\u30B6\u306E\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u3010\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u3011\u3059\u308B\u3068\u4FBF\u5229\u3067\u3059")), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 rounded-2xl p-5 border border-slate-200 bg-white text-left shadow-sm hover:shadow-md transition-shadow"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[13px] text-slate-600 mb-4 leading-relaxed font-medium"
    }, "\u5B8C\u5168\u7248RIESM\u2122\u3067\u306F\u30014\u3064\u306E\u30E2\u30FC\u30C9\u306B\u52A0\u3048\u3066\u30016\u3064\u306E\u8208\u5473\u306E\u86C7\u53E3\u3002\u305D\u3057\u306624\u306E\u5F79\u5272\u300C\u3042\u306A\u305F\u3060\u3051\u306E\u30B3\u30C3\u30AF\u30D4\u30C3\u30C8\u300D\u306B\u3088\u308A", /*#__PURE__*/React.createElement("br", {
      className: "hidden sm:block"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-bold bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-1.5 py-0.5 rounded text-slate-800"
    }, "\u300C\u3069\u3093\u306A\u5F79\u5272\u3067\u529B\u3092\u767A\u63EE\u3057\u3084\u3059\u3044\u304B\u30FB\u3069\u3046\u3057\u305F\u3089\u81EA\u7136\u306B\u30E9\u30AF\u306B\u3067\u304D\u308B\u306E\u304B\uFF1F\u300D"), "\u307E\u3067\u6574\u7406\u3067\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("a", {
      href: "https://ninin-cc.github.io/riesm.html",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all group"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] sm:text-xs text-slate-500 font-bold mb-1"
    }, "\u4ED5\u4E8B\u3084\u4EBA\u9593\u95A2\u4FC2\u3067\u672C\u683C\u7684\u306B\u6D3B\u304B\u3057\u305F\u3044\u65B9\u306F"), /*#__PURE__*/React.createElement("div", {
      className: "text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors"
    }, "\uD83C\uDF08 \u5B8C\u5168\u7248RIESM\u2122\u3078")), /*#__PURE__*/React.createElement("div", {
      className: "text-slate-400 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1"
    }, /*#__PURE__*/React.createElement(ExternalLinkIcon, null)))), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 mt-8 text-center space-y-4"
    }, /*#__PURE__*/React.createElement("a", {
      href: "https://note.com/ninin2025/n/n236a6f29ad63",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1"
    }, "\uD83C\uDF08RIESM\u2122\u306B\u3064\u3044\u3066\u8A73\u3057\u304F\u77E5\u308B(note) ", /*#__PURE__*/React.createElement(ExternalLinkIcon, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      href: "https://ninin-cc.github.io/riesm.html",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "text-[10px] sm:text-xs text-slate-400 font-medium hover:text-slate-600 transition-colors"
    }, "\xA9 2026 ninin consulting\uFF06counseling")))), showWorkshopGuide && /*#__PURE__*/React.createElement(WorkshopGuideModal, {
      onClose: () => setShowWorkshopGuide(false)
    }), showResultHistory && /*#__PURE__*/React.createElement(ResultHistoryModal, {
      entries: resultHistory,
      onClose: () => setShowResultHistory(false)
    }));
  }

  // ==========================================
  // 画面描画: 結果画面
  // ==========================================
  if (resultType) {
    let result;
    if (resultType.isDouble) {
      const frontData = resultsData[resultType.front];
      const secondData = resultsData[resultType.second];
      const themeKey = resultType.frontKey;
      result = {
        title: `${frontData.title} ＆ ${secondData.title}`,
        subTitle: `（${frontData.subTitle.replace(/[（）]/g, '')} × ${secondData.subTitle.replace(/[（）]/g, '')}）`,
        detail: frontData.detail.map(d => `${d}\n\n${secondAdditions[resultType.second]}`),
        theme: doubleThemes[themeKey] || frontData.theme
      };
    } else {
      result = resultsData[resultType.front];
    }
    const t = result.theme;
    const backResult = backsData[resultType.back];
    return /*#__PURE__*/React.createElement("div", {
      className: `min-h-screen flex items-center justify-center p-3 sm:p-6 py-8 sm:py-12 transition-colors duration-1000 ${t.bg}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-lg w-full animate-fade-in relative"
    }, toastMessage && /*#__PURE__*/React.createElement("div", {
      className: "fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 text-sm font-bold text-center whitespace-pre-line w-[90%] max-w-sm border border-slate-600 animate-fade-in"
    }, toastMessage), /*#__PURE__*/React.createElement("div", {
      id: "result-card",
      className: `bg-white rounded-3xl shadow-2xl overflow-hidden border-2 ${t.border}`
    }, /*#__PURE__*/React.createElement("div", {
      id: "capture-area",
      className: "bg-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: `px-6 py-8 sm:p-10 text-center relative overflow-hidden bg-gradient-to-br ${t.header} text-white`
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
    }), /*#__PURE__*/React.createElement("h2", {
      className: "text-xs sm:text-sm font-bold tracking-[0.2em] text-white/90 mb-4 relative z-10"
    }, "\u4ECA\u306E\u3010\u30D5\u30ED\u30F3\u30C8\u3011"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-4 mb-4 relative z-10"
    }, /*#__PURE__*/React.createElement(ModeIcon, {
      type: resultType.front,
      className: "w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
    }), resultType.isDouble && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "text-2xl font-bold opacity-70"
    }, "+"), /*#__PURE__*/React.createElement(ModeIcon, {
      type: resultType.second,
      className: "w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md"
    }))), /*#__PURE__*/React.createElement("h1", {
      className: "text-2xl sm:text-3xl font-extrabold relative z-10 drop-shadow-md leading-tight"
    }, result.title, result.subTitle && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      className: "text-base sm:text-lg font-bold opacity-90 block mt-1"
    }, result.subTitle)))), /*#__PURE__*/React.createElement("div", {
      className: "p-5 sm:p-8 pb-3 sm:pb-4"
    }, /*#__PURE__*/React.createElement(MiniModeBalanceCard, {
      scores: resultScores,
      frontType: resultType.front,
      displayName: modeCardName
    }), /*#__PURE__*/React.createElement("div", {
      id: "capture-watermark",
      style: {
        display: 'none'
      },
      className: "text-center mt-6 pb-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-bold text-slate-500 mb-2"
    }, "\u7686\u3055\u3093\u3082\u4F53\u9A13\u3057\u3066\u307F\u3066\u304F\u3060\u3055\u3044\u3002", /*#__PURE__*/React.createElement("br", {
      className: "sm:hidden"
    }), "\u5C11\u3057\u8A73\u7D30\u306A\u30E2\u30FC\u30C9\u30D0\u30E9\u30F3\u30B9\u306E\u89E3\u8AAC\u3082\u51FA\u3066\u304D\u307E\u3059\uD83D\uDD0D"), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] text-slate-400/80 font-medium tracking-wide"
    }, "\uD83C\uDF08 RIESM\u2122 mini \xA92026 ninin consulting\uFF06counseling")))), /*#__PURE__*/React.createElement("div", {
      className: "px-5 pt-4 sm:px-8",
      "data-html2canvas-ignore": "true"
    }, /*#__PURE__*/React.createElement("p", {
      className: "rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-center text-xs font-bold leading-relaxed text-amber-950 sm:text-sm"
    }, "\u3053\u306E\u30A2\u30D7\u30EA\u3092\u300C\u30EF\u30FC\u30AF\u30B7\u30E7\u30C3\u30D7\u300D\u3067\u4F7F\u3046\u3068\u304D\u306E\u30C8\u30EA\u30BB\u30C4\u306F\u3001TOP\u30DA\u30FC\u30B8\u306B\u3054\u3056\u3044\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
      className: "px-5 sm:px-8",
      "data-html2canvas-ignore": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "riesm-mini-mode-card-tools"
    }, /*#__PURE__*/React.createElement("div", {
      className: "riesm-mini-mode-card-tools__row"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: modeCardNameInput,
      onChange: event => setModeCardNameInput(event.target.value),
      onKeyDown: event => {
        if (event.key === 'Enter') handleApplyModeCardName();
      },
      placeholder: "\u30AB\u30FC\u30C9\u306B\u8868\u793A\u3059\u308B\u304A\u540D\u524D",
      maxLength: "40",
      "aria-label": "\u30AB\u30FC\u30C9\u306B\u8868\u793A\u3059\u308B\u304A\u540D\u524D"
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "riesm-mini-mode-card-tools__apply",
      onClick: handleApplyModeCardName
    }, "\u6C7A\u5B9A")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "riesm-mini-mode-card-tools__save",
      onClick: handleSaveModeCard,
      disabled: isSavingModeCard
    }, isSavingModeCard ? 'カード画像を作成中...' : 'カードを画像で保存'))), /*#__PURE__*/React.createElement("div", {
      className: "px-5 sm:px-8 pb-0",
      "data-html2canvas-ignore": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: `rounded-2xl p-5 sm:p-7 mb-5 border border-white shadow-sm ${t.cardBg}`
    }, /*#__PURE__*/React.createElement("p", {
      className: `leading-relaxed text-[14px] sm:text-base font-medium whitespace-pre-line ${t.text}`
    }, result.detail[resultType.detailIndex]))), /*#__PURE__*/React.createElement("div", {
      className: "px-5 sm:px-8 pb-5 space-y-3 sm:space-y-4",
      "data-html2canvas-ignore": "true"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: handleShare,
      disabled: isSharing,
      className: `flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold transition-all text-sm sm:text-base text-white shadow-md hover:shadow-lg active:scale-[0.98] ${isSharing ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`
    }, /*#__PURE__*/React.createElement(ShareIcon, null), " ", isSharing ? '画像を作成中...' : '今のフロントを保存・シェアする'), /*#__PURE__*/React.createElement("button", {
      onClick: startQuiz,
      className: `flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold transition-all text-sm sm:text-base border-2 border-transparent active:scale-[0.98] ${t.btnBg} ${t.text} ${t.btnHover}`
    }, /*#__PURE__*/React.createElement(RefreshCwIcon, null), " \u3082\u3046\u4E00\u5EA6\u89B3\u308B"), /*#__PURE__*/React.createElement("div", {
      className: `mt-8 p-5 sm:p-6 rounded-2xl border-2 ${t.border} bg-white text-left shadow-sm hover:shadow-md transition-shadow`
    }, /*#__PURE__*/React.createElement("p", {
      className: `text-[13px] sm:text-sm font-medium mb-4 leading-relaxed ${t.text}`
    }, "\u5B8C\u5168\u7248RIESM\u2122\u3067\u306F\u30014\u3064\u306E\u30E2\u30FC\u30C9\u306B\u52A0\u3048\u3066\u30016\u3064\u306E\u8208\u5473\u306E\u86C7\u53E3\u3002\u305D\u3057\u306624\u306E\u5F79\u5272\u300C\u3042\u306A\u305F\u3060\u3051\u306E\u30B3\u30C3\u30AF\u30D4\u30C3\u30C8\u300D\u306B\u3088\u308A", /*#__PURE__*/React.createElement("br", {
      className: "hidden sm:block"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-bold bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-1.5 py-0.5 rounded"
    }, "\u300C\u3069\u3093\u306A\u5F79\u5272\u3067\u529B\u3092\u767A\u63EE\u3057\u3084\u3059\u3044\u304B\u30FB\u3069\u3046\u3057\u305F\u3089\u81EA\u7136\u306B\u30E9\u30AF\u306B\u3067\u304D\u308B\u306E\u304B\uFF1F\u300D"), "\u307E\u3067\u6574\u7406\u3067\u304D\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("a", {
      href: "https://ninin-cc.github.io/riesm.html",
      target: "_blank",
      rel: "noopener noreferrer",
      className: `flex items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all group text-white bg-gradient-to-r ${t.header}`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] sm:text-xs font-bold mb-1 opacity-90"
    }, "\u4ED5\u4E8B\u3084\u4EBA\u9593\u95A2\u4FC2\u3067\u672C\u683C\u7684\u306B\u6D3B\u304B\u3057\u305F\u3044\u65B9\u306F"), /*#__PURE__*/React.createElement("div", {
      className: "text-sm sm:text-base font-bold"
    }, "\uD83C\uDF08 \u5B8C\u5168\u7248RIESM\u2122\u3078")), /*#__PURE__*/React.createElement("div", {
      className: "opacity-80 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
    }, /*#__PURE__*/React.createElement(ExternalLinkIcon, null))))), /*#__PURE__*/React.createElement("div", {
      className: "px-5 sm:px-8 pb-8",
      "data-html2canvas-ignore": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: `rounded-2xl p-5 sm:p-7 mb-6 border border-white shadow-sm ${t.cardBg}`
    }, /*#__PURE__*/React.createElement("h4", {
      className: `font-bold text-sm sm:text-base mb-4 opacity-90 ${t.text} flex items-center gap-2`
    }, /*#__PURE__*/React.createElement("span", {
      className: "bg-white/50 p-1.5 rounded-lg"
    }, "\u25BC"), " \u30D0\u30C3\u30AF\u30B9\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", {
      className: `text-[13px] sm:text-sm font-medium opacity-80 whitespace-pre-line leading-relaxed ${t.text}`
    }, backResult.desc), /*#__PURE__*/React.createElement("div", {
      className: `mt-6 p-4 sm:p-5 rounded-xl bg-white/60 border border-white shadow-sm`
    }, /*#__PURE__*/React.createElement("p", {
      className: `text-[11px] sm:text-xs font-bold opacity-90 leading-relaxed ${t.text}`
    }, "\uD83D\uDCA1 \u89B3\u6E2C\u306E\u30D2\u30F3\u30C8\uFF1A\u3010\u30D0\u30C3\u30AF\u30B9\u3011\u306F\u4F55\u5EA6\u5B9F\u65BD\u3057\u3066\u3082\u3042\u307E\u308A\u5909\u308F\u3089\u306A\u3044\u50BE\u5411\u304C\u3042\u308A\u307E\u3059\u3002\u81EA\u5206\u304C\u4F55\u3092\u907F\u3051\u3001\u4F55\u3092\u5B88\u308D\u3046\u3068\u3057\u3066\u3044\u308B\u306E\u304B\u3002\u4F55\u5EA6\u304B\u89B3\u6E2C\u3059\u308B\u4E2D\u3067\u3001\u305D\u3093\u306A\u81EA\u5206\u3068\u306E\u5BFE\u8A71\u3082\u697D\u3057\u3093\u3067\u307F\u3066\u304F\u3060\u3055\u3044\u306D\u3002"))), /*#__PURE__*/React.createElement("div", {
      className: "text-center pt-2 space-y-3"
    }, /*#__PURE__*/React.createElement("a", {
      href: "https://note.com/ninin2025/n/n236a6f29ad63",
      target: "_blank",
      rel: "noopener noreferrer",
      className: `text-xs font-bold opacity-60 hover:opacity-100 transition-opacity inline-flex items-center gap-1 ${t.text}`
    }, "\uD83C\uDF08RIESM\u2122\u306B\u3064\u3044\u3066\u8A73\u3057\u304F\u77E5\u308B(note) ", /*#__PURE__*/React.createElement(ExternalLinkIcon, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      href: "https://ninin-cc.github.io/riesm.html",
      target: "_blank",
      rel: "noopener noreferrer",
      className: `text-[10px] sm:text-xs font-medium opacity-50 hover:opacity-100 transition-opacity ${t.text}`
    }, "\xA9 2026 ninin consulting\uFF06counseling")))))));
  }

  // ==========================================
  // 画面描画: 質問画面
  // ==========================================
  const q = isPractice ? practiceQuestion : currentQuestions[currentIndex];
  const progress = isPractice ? 4 : (currentIndex + 1) / currentQuestions.length * 100;
  const labelStrong = q.isSituation ? "に、強く惹かれる" : "と、強くそう思う";
  const labelMid = q.isSituation ? "に、惹かれる" : "と、そう思う";
  const topType = q.options[0].type;
  const bottomType = q.options[1].type;

  // カラーモードによる色の出し分け
  const topColorRGB = colorMode === 'colorful' ? bgColors[topType] : '110, 231, 183'; // emerald-300
  const bottomColorRGB = colorMode === 'colorful' ? bgColors[bottomType] : '190, 242, 100'; // lime-300

  const answerChoices = [{
    index: 0,
    hoverPos: 15,
    caption: 'かなりA',
    topSize: 'w-10 h-10 sm:w-12 sm:h-12',
    bottomSize: null,
    scoreUpdates: [{
      type: topType,
      weight: 4
    }],
    ariaLabel: `【${q.options[0].text}】${labelStrong}`
  }, {
    index: 1,
    hoverPos: 30,
    caption: 'A',
    topSize: 'w-8 h-8 sm:w-10 sm:h-10',
    bottomSize: null,
    scoreUpdates: [{
      type: topType,
      weight: 3
    }],
    ariaLabel: `【${q.options[0].text}】${labelMid}`
  }, {
    index: 2,
    hoverPos: 45,
    caption: 'ややA',
    topSize: 'w-7 h-7 sm:w-8 sm:h-8',
    bottomSize: 'w-4 h-4 sm:w-5 sm:h-5',
    scoreUpdates: [{
      type: topType,
      weight: 2
    }, {
      type: bottomType,
      weight: 1
    }],
    ariaLabel: `どちらかといえば【${q.options[0].text}】`
  }, {
    index: 3,
    hoverPos: 55,
    caption: 'ややB',
    topSize: 'w-4 h-4 sm:w-5 sm:h-5',
    bottomSize: 'w-7 h-7 sm:w-8 sm:h-8',
    scoreUpdates: [{
      type: bottomType,
      weight: 2
    }, {
      type: topType,
      weight: 1
    }],
    ariaLabel: `どちらかといえば【${q.options[1].text}】`
  }, {
    index: 4,
    hoverPos: 70,
    caption: 'B',
    topSize: null,
    bottomSize: 'w-8 h-8 sm:w-10 sm:h-10',
    scoreUpdates: [{
      type: bottomType,
      weight: 3
    }],
    ariaLabel: `【${q.options[1].text}】${labelMid}`
  }, {
    index: 5,
    hoverPos: 85,
    caption: 'かなりB',
    topSize: null,
    bottomSize: 'w-10 h-10 sm:w-12 sm:h-12',
    scoreUpdates: [{
      type: bottomType,
      weight: 4
    }],
    ariaLabel: `【${q.options[1].text}】${labelStrong}`
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex items-center justify-center p-3 sm:p-4 bg-slate-50 transition-colors duration-1000 selection:bg-indigo-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md w-full bg-white/95 rounded-3xl shadow-2xl overflow-hidden border border-white animate-fade-in relative backdrop-blur-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-full transition-all duration-700 ease-in-out pointer-events-none",
    style: {
      height: `${100 - hoverPos + 10}%`,
      background: `linear-gradient(to bottom, rgba(${topColorRGB}, 0.25) 0%, rgba(${topColorRGB}, 0) 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-full transition-all duration-700 ease-in-out pointer-events-none",
    style: {
      height: `${hoverPos + 10}%`,
      background: `linear-gradient(to top, rgba(${bottomColorRGB}, 0.25) 0%, rgba(${bottomColorRGB}, 0) 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-20 h-2 bg-slate-100/50 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-indigo-500/80 transition-all duration-500 ease-out",
    style: {
      width: `${progress}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 p-4 sm:p-8 pb-4 sm:pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] sm:text-xs font-bold text-slate-400 mb-3 sm:mb-4 tracking-[0.2em] flex justify-between px-2"
  }, /*#__PURE__*/React.createElement("span", null, isPractice ? 'PRACTICE' : 'QUESTION'), /*#__PURE__*/React.createElement("span", null, isPractice ? '練習' : `${currentIndex + 1} / ${currentQuestions.length}`)), /*#__PURE__*/React.createElement("div", {
    className: "notebook-bg min-h-[6rem] sm:min-h-[8rem] rounded-xl sm:rounded-2xl shadow-sm border border-slate-200/80 mb-4 sm:mb-6 w-full flex items-center relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-6 sm:px-8 py-5 w-full"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[15px] sm:text-[17px] font-bold text-slate-700 leading-[32px] tracking-wide relative z-10 text-center"
  }, q.text))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4 sm:space-y-5 animate-fade-in relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-full w-full rounded-xl sm:rounded-2xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-md flex items-center min-h-[4.5rem] overflow-hidden mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 h-full w-8 sm:w-10 flex items-center justify-center text-sm sm:text-base font-black text-white shadow-md z-10",
    style: {
      backgroundColor: `rgb(${topColorRGB})`
    }
  }, "A"), /*#__PURE__*/React.createElement("div", {
    className: "w-full py-4 sm:py-5 flex items-center justify-center px-10 sm:px-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[13px] sm:text-base font-bold leading-relaxed text-slate-900 text-center relative z-20"
  }, q.options[0].text))), /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-3xl border border-white bg-white/60 p-2 sm:p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] backdrop-blur-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-6 items-start gap-1 sm:gap-1.5"
  }, answerChoices.map(choice => {
    const isSelected = selectedChoiceIndex === choice.index;
    const isTempSelected = tempSelectedChoiceIndex === choice.index;
    const isDimmed = selectedChoiceIndex !== null && !isSelected || tempSelectedChoiceIndex !== null && !isTempSelected;
    const topShadow = isSelected || isTempSelected ? `0 0 20px 6px rgba(${topColorRGB}, 0.5)` : `0 0 8px rgba(${topColorRGB}, 0.2)`;
    const bottomShadow = isSelected || isTempSelected ? `0 0 20px 6px rgba(${bottomColorRGB}, 0.5)` : `0 0 8px rgba(${bottomColorRGB}, 0.2)`;
    return /*#__PURE__*/React.createElement("button", {
      key: choice.index,
      type: "button",
      "aria-label": choice.ariaLabel,
      title: choice.ariaLabel,
      disabled: selectedChoiceIndex !== null,
      onMouseEnter: () => setHoverPos(choice.hoverPos),
      onMouseLeave: () => selectedChoiceIndex === null && tempSelectedChoiceIndex === null && setHoverPos(50),
      onClick: () => handleChoiceSelect(choice),
      className: `relative group flex min-w-0 flex-col items-center rounded-2xl border py-1.5 sm:py-2 transition-all duration-300 active:scale-[0.95] disabled:cursor-default ${isSelected || isTempSelected ? 'border-white bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20' : 'border-transparent hover:bg-white/80 hover:shadow-sm z-10'} ${isDimmed ? 'opacity-30 scale-95' : ''}`
    }, isPractice && isTempSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-indigo-500/95 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-40 animate-fade-in pointer-events-none tracking-wide flex items-center gap-1.5"
    }, /*#__PURE__*/React.createElement("span", {
      className: "animate-pulse text-sm"
    }, "\uD83D\uDC46"), " 2\u30BF\u30C3\u30D7\u3067\u6C7A\u5B9A"), /*#__PURE__*/React.createElement("div", {
      className: "relative h-24 sm:h-28 w-full flex flex-col justify-center pointer-events-none"
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute top-1/2 h-px -translate-y-1/2 bg-slate-200 ${choice.index === 0 ? 'left-1/2 right-0' : choice.index === answerChoices.length - 1 ? 'left-0 right-1/2' : 'left-0 right-0'}`
    }), /*#__PURE__*/React.createElement("span", {
      className: `absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] sm:text-[11px] font-black leading-none transition-all duration-300 ${isSelected || isTempSelected ? 'text-slate-800 shadow-md ring-2 ring-slate-100 scale-110' : 'text-slate-400 shadow-sm group-hover:text-slate-600 group-hover:shadow'}`
    }, choice.caption), choice.topSize && /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-1/2 left-0 right-0 flex justify-center pb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: `rounded-full transition-all duration-300 ${choice.topSize} ${isSelected || isTempSelected ? 'riesm-orb-selected ring-4 ring-white' : 'group-hover:scale-110 group-hover:-translate-y-1'}`,
      style: {
        backgroundColor: `rgb(${topColorRGB})`,
        boxShadow: topShadow
      }
    })), choice.bottomSize && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1/2 left-0 right-0 flex justify-center pt-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: `rounded-full transition-all duration-300 ${choice.bottomSize} ${isSelected || isTempSelected ? 'riesm-orb-selected ring-4 ring-white' : 'group-hover:scale-110 group-hover:translate-y-1'}`,
      style: {
        backgroundColor: `rgb(${bottomColorRGB})`,
        boxShadow: bottomShadow
      }
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative h-full w-full rounded-xl sm:rounded-2xl border border-white/70 bg-white/70 shadow-sm backdrop-blur-md flex items-center min-h-[4.5rem] overflow-hidden mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full py-4 sm:py-5 flex items-center justify-center px-10 sm:px-12"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[13px] sm:text-base font-bold leading-relaxed text-slate-900 text-center relative z-20"
  }, q.options[1].text)), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 h-full w-8 sm:w-10 flex items-center justify-center text-sm sm:text-base font-black text-white shadow-md z-10",
    style: {
      backgroundColor: `rgb(${bottomColorRGB})`
    }
  }, "B"))), isPractice && tutorialCompleted && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    className: "w-full max-w-sm rounded-3xl border border-white/20 bg-white p-6 sm:p-8 text-center shadow-2xl transform scale-100 transition-transform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-8 h-8 text-green-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "3",
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "mb-3 text-lg sm:text-xl font-extrabold leading-relaxed text-slate-800"
  }, "\u64CD\u4F5C\u65B9\u6CD5\u306F\u30D0\u30C3\u30C1\u30EA\u3067\u3059\uFF01"), /*#__PURE__*/React.createElement("p", {
    className: "mb-6 text-[13px] sm:text-sm font-bold leading-relaxed text-slate-700"
  }, "\u3053\u306E\u3088\u3046\u306B\u81EA\u5206\u306E\u6C17\u6301\u3061\u3092\u7D20\u76F4\u306B\u611F\u3058\u3066\u9078\u3093\u3067\u4E0B\u3055\u3044\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u3053\u3053\u304B\u3089\u304C\u50BE\u5411\u78BA\u8A8D\u8A2D\u554F\u3067\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u30EA\u30E9\u30C3\u30AF\u30B9\u3057\u3066\u304A\u9032\u307F\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement("button", {
    onClick: startQuiz,
    className: `w-full rounded-xl px-4 py-3 sm:py-4 text-sm sm:text-base font-bold shadow-sm transition-all active:scale-[0.98] ${colorMode === 'colorful' ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white hover:opacity-90' : 'bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950 hover:opacity-90'}`
  }, "\u6E96\u5099\u306F\u3067\u304D\u305F\u306E\u3067\u958B\u59CB\u3059\u308B"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 sm:mt-6 flex items-center justify-between pt-2 sm:pt-4 relative z-10 px-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleBack,
    disabled: selectedChoiceIndex !== null,
    className: `flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 transition-all ${selectedChoiceIndex !== null ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-100 hover:text-slate-800'}`
  }, /*#__PURE__*/React.createElement(ArrowLeftIcon, null), " \u3082\u3069\u308B")))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));
