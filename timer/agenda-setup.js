(() => {
  'use strict';

  const app = window.agendaApp;
  if (!app) return;

  const themeIds = ['fun', 'gentle', 'steady', 'healing'];
  const storageKey = 'workshopTimer.agendas.v1';
  const defaultItems = [
    { title: 'オープニング・ゴール確認', minutes: 5 },
    { title: 'テーマと進め方の説明', minutes: 10 },
    { title: '個人・グループワーク', minutes: 20 },
    { title: '共有・対話', minutes: 15 },
    { title: 'まとめ・次の一歩', minutes: 10 }
  ];

  const nameInput = document.getElementById('agenda-name');
  const rowsContainer = document.getElementById('agenda-rows');
  const totalLabel = document.getElementById('agenda-total');
  const note = document.getElementById('agenda-note');
  const addButton = document.getElementById('btn-agenda-add');
  const applyButton = document.getElementById('btn-agenda-apply');
  const themeInputs = Array.from(document.querySelectorAll('input[name="agenda-theme"]'));
  const savedSelect = document.getElementById('agenda-saved');
  const loadButton = document.getElementById('btn-agenda-load');
  const saveButton = document.getElementById('btn-agenda-save');
  const deleteButton = document.getElementById('btn-agenda-delete');
  const exportButton = document.getElementById('btn-agenda-export');
  const importFile = document.getElementById('agenda-import-file');
  const backgroundFile = document.getElementById('agenda-background-file');
  const backgroundPreview = document.getElementById('agenda-background-preview');
  const backgroundName = document.getElementById('agenda-background-name');
  const backgroundClearButton = document.getElementById('btn-agenda-background-clear');

  let activeAgendaId = '';
  let backgroundPreviewUrl = '';

  function collectItems() {
    return Array.from(rowsContainer.querySelectorAll('.agenda-row')).map((row, index) => {
      const title = row.querySelector('[data-agenda-title]').value.trim() || `項目 ${index + 1}`;
      const rawMinutes = Number(row.querySelector('[data-agenda-minutes]').value);
      return { title, minutes: Math.min(1440, Math.max(1, Math.round(rawMinutes || 1))) };
    });
  }

  function updateTotal() {
    const total = collectItems().reduce((sum, item) => sum + item.minutes, 0);
    const hours = Math.floor(total / 60);
    const rest = total % 60;
    const readable = hours ? `（${hours}時間${rest ? `${rest}分` : ''}）` : '';
    totalLabel.textContent = `合計 ${total}分 ${readable}`.trim();
    applyButton.disabled = total <= 0;
  }

  function addRow(item = { title: '', minutes: 5 }) {
    const row = document.createElement('div');
    row.className = 'agenda-row';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.maxLength = 60;
    titleInput.value = item.title;
    titleInput.placeholder = '進行内容';
    titleInput.dataset.agendaTitle = '';
    titleInput.setAttribute('aria-label', '進行内容');

    const minutesInput = document.createElement('input');
    minutesInput.type = 'number';
    minutesInput.min = '1';
    minutesInput.max = '1440';
    minutesInput.step = '1';
    minutesInput.value = String(item.minutes);
    minutesInput.dataset.agendaMinutes = '';
    minutesInput.setAttribute('aria-label', `${item.title || '進行項目'}の分数`);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'agenda-remove';
    removeButton.textContent = '×';
    removeButton.setAttribute('aria-label', 'この項目を削除');
    removeButton.addEventListener('click', () => {
      if (rowsContainer.children.length <= 1) return;
      row.remove();
      updateTotal();
    });

    titleInput.addEventListener('input', updateTotal);
    minutesInput.addEventListener('input', updateTotal);
    row.append(titleInput, minutesInput, removeButton);
    rowsContainer.appendChild(row);
  }

  function replaceRows(items) {
    rowsContainer.replaceChildren();
    (items?.length ? items : [{ title: '', minutes: 5 }]).forEach(addRow);
    updateTotal();
  }

  function selectedTheme() {
    const value = themeInputs.find((input) => input.checked)?.value;
    return themeIds.includes(value) ? value : 'steady';
  }

  function setTheme(theme) {
    const safeTheme = themeIds.includes(theme) ? theme : 'steady';
    themeInputs.forEach((input) => {
      input.checked = input.value === safeTheme;
    });
  }

  function setNote(message, state = '') {
    note.textContent = message;
    note.classList.toggle('is-success', state === 'success');
    note.classList.toggle('is-error', state === 'error');
  }

  function readSaved() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(parsed) ? parsed.filter((entry) => entry && typeof entry.id === 'string' && Array.isArray(entry.items)) : [];
    } catch (_error) {
      return [];
    }
  }

  function writeSaved(entries) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
      return true;
    } catch (_error) {
      setNote('この環境では保存できませんでした。CSV書き出しをご利用ください。', 'error');
      return false;
    }
  }

  function refreshSaved(selectedId = activeAgendaId) {
    const entries = readSaved().sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
    savedSelect.replaceChildren();
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = entries.length ? '保存した進行表を選択' : '保存した進行表はありません';
    savedSelect.appendChild(placeholder);
    entries.forEach((entry) => {
      const option = document.createElement('option');
      option.value = entry.id;
      option.textContent = `${entry.name}（${entry.items.reduce((sum, item) => sum + (Number(item.minutes) || 0), 0)}分）`;
      savedSelect.appendChild(option);
    });
    savedSelect.value = entries.some((entry) => entry.id === selectedId) ? selectedId : '';
    loadButton.disabled = !savedSelect.value;
    deleteButton.disabled = !savedSelect.value;
  }

  function saveAgenda() {
    const entries = readSaved();
    const now = Date.now();
    const name = nameInput.value.trim() || 'ワーク進行表';
    let entry = activeAgendaId ? entries.find((item) => item.id === activeAgendaId) : null;
    if (!entry) {
      activeAgendaId = window.crypto?.randomUUID?.() || `agenda-${now}-${Math.random().toString(16).slice(2)}`;
      entry = { id: activeAgendaId };
      entries.push(entry);
    }
    Object.assign(entry, { name, items: collectItems(), theme: selectedTheme(), updatedAt: now });
    if (!writeSaved(entries)) return;
    refreshSaved(activeAgendaId);
    setNote(`「${name}」をこのブラウザに記録しました。`, 'success');
  }

  function loadAgenda() {
    const entry = readSaved().find((item) => item.id === savedSelect.value);
    if (!entry) return;
    activeAgendaId = entry.id;
    nameInput.value = entry.name || 'ワーク進行表';
    setTheme(entry.theme);
    replaceRows(entry.items);
    setNote(`「${entry.name}」を呼び出しました。`, 'success');
  }

  function deleteAgenda() {
    const entry = readSaved().find((item) => item.id === savedSelect.value);
    if (!entry || !window.confirm(`保存した「${entry.name}」を削除しますか？`)) return;
    if (!writeSaved(readSaved().filter((item) => item.id !== entry.id))) return;
    if (activeAgendaId === entry.id) activeAgendaId = '';
    refreshSaved();
    setNote(`「${entry.name}」を削除しました。`);
  }

  function csvCell(value) {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportCsv() {
    const name = nameInput.value.trim() || 'ワーク進行表';
    const lines = [
      ['進行表名', 'テーマ', '項目', '時間（分）'],
      ...collectItems().map((item) => [name, selectedTheme(), item.title, item.minutes])
    ];
    const blobUrl = URL.createObjectURL(new Blob([`\uFEFF${lines.map((row) => row.map(csvCell).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = `${name.replace(/[\\/:*?"<>|]/g, '_') || 'ワーク進行表'}.csv`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    setNote('CSVを書き出しました。', 'success');
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
        } else quoted = !quoted;
      } else if (character === ',' && !quoted) {
        row.push(field);
        field = '';
      } else if ((character === '\n' || character === '\r') && !quoted) {
        if (character === '\r' && source[index + 1] === '\n') index += 1;
        row.push(field);
        if (row.some(Boolean)) rows.push(row);
        row = [];
        field = '';
      } else field += character;
    }
    row.push(field);
    if (row.some(Boolean)) rows.push(row);
    return rows;
  }

  async function importCsv(file) {
    try {
      const rows = parseCsv(await file.text());
      const header = (rows[0] || []).map((cell) => cell.trim());
      const nameIndex = header.indexOf('進行表名');
      const themeIndex = header.indexOf('テーマ');
      const itemIndex = header.indexOf('項目');
      const minutesIndex = header.indexOf('時間（分）');
      if (nameIndex < 0 || itemIndex < 0 || minutesIndex < 0) throw new Error('header');
      const imported = rows.slice(1).map((row, index) => ({
        title: String(row[itemIndex] || '').trim() || `項目 ${index + 1}`,
        minutes: Math.min(1440, Math.max(1, Math.round(Number(row[minutesIndex]) || 1)))
      }));
      if (!imported.length) throw new Error('empty');
      activeAgendaId = '';
      nameInput.value = String(rows[1]?.[nameIndex] || 'ワーク進行表').trim() || 'ワーク進行表';
      setTheme(themeIndex >= 0 ? rows[1]?.[themeIndex] : 'steady');
      replaceRows(imported);
      refreshSaved();
      setNote('CSVを読み込みました。', 'success');
    } catch (_error) {
      setNote('CSVを読み込めませんでした。書き出したCSVと同じ形式か確認してください。', 'error');
    } finally {
      importFile.value = '';
    }
  }

  function applySettings() {
    app.applySettings({
      title: nameInput.value.trim() || 'ワーク進行表',
      theme: selectedTheme(),
      items: collectItems()
    });
  }

  function syncFromProgress() {
    const current = app.getConfig();
    nameInput.value = current.title;
    setTheme(current.theme);
    replaceRows(current.items);
  }

  addButton.addEventListener('click', () => {
    addRow();
    updateTotal();
    rowsContainer.lastElementChild?.querySelector('input')?.focus();
  });
  applyButton.addEventListener('click', applySettings);
  window.addEventListener('agenda:progress-requested', (event) => {
    event.preventDefault();
    applySettings();
  });
  window.addEventListener('agenda:settings-opened', syncFromProgress);
  savedSelect.addEventListener('change', () => {
    loadButton.disabled = !savedSelect.value;
    deleteButton.disabled = !savedSelect.value;
  });
  loadButton.addEventListener('click', loadAgenda);
  saveButton.addEventListener('click', saveAgenda);
  deleteButton.addEventListener('click', deleteAgenda);
  exportButton.addEventListener('click', exportCsv);
  importFile.addEventListener('change', () => {
    const [file] = importFile.files;
    if (file) void importCsv(file);
  });
  backgroundFile.addEventListener('change', () => {
    const [file] = backgroundFile.files;
    if (!file || !app.setBackgroundFile(file)) {
      setNote('画像ファイルを選択してください。', 'error');
      return;
    }
    if (backgroundPreviewUrl) URL.revokeObjectURL(backgroundPreviewUrl);
    backgroundPreviewUrl = URL.createObjectURL(file);
    backgroundPreview.src = backgroundPreviewUrl;
    backgroundPreview.hidden = false;
    backgroundName.textContent = file.name;
    backgroundClearButton.disabled = false;
    setNote('背景画像を設定しました。進行画面に反映されます。', 'success');
  });
  backgroundClearButton.addEventListener('click', () => {
    if (backgroundPreviewUrl) URL.revokeObjectURL(backgroundPreviewUrl);
    backgroundPreviewUrl = '';
    backgroundPreview.removeAttribute('src');
    backgroundPreview.hidden = true;
    backgroundName.textContent = '未設定';
    backgroundFile.value = '';
    backgroundClearButton.disabled = true;
    app.clearBackground();
  });
  window.addEventListener('beforeunload', () => {
    if (backgroundPreviewUrl) URL.revokeObjectURL(backgroundPreviewUrl);
  });

  const initial = app.getConfig();
  nameInput.value = initial.title === 'ワーク進行表' ? 'ワークショップ' : initial.title;
  setTheme(initial.theme);
  replaceRows(initial.items?.length ? initial.items : defaultItems);
  refreshSaved();
})();
