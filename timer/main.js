'use strict';

const path = require('node:path');
const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron');

const NININ_URL = 'https://ninin-cc.github.io/i/';
const TABE_LAB_URL = 'https://note.com/ninin2025/membership/join';

let mainWindow = null;
const overlayState = {
  alwaysOnTop: true,
  clickThrough: false
};

function stateSnapshot() {
  return { ...overlayState };
}

function sendState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('overlay:state', stateSnapshot());
  }
}

function setClickThrough(enabled) {
  if (!mainWindow || mainWindow.isDestroyed()) return stateSnapshot();
  overlayState.clickThrough = Boolean(enabled);
  mainWindow.setIgnoreMouseEvents(overlayState.clickThrough, { forward: true });
  sendState();
  return stateSnapshot();
}

function setAlwaysOnTop(enabled) {
  if (!mainWindow || mainWindow.isDestroyed()) return stateSnapshot();
  overlayState.alwaysOnTop = Boolean(enabled);
  mainWindow.setAlwaysOnTop(overlayState.alwaysOnTop, 'screen-saver');
  sendState();
  return stateSnapshot();
}

function sendCommand(command) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('overlay:command', command);
  }
}

function registerShortcut(accelerator, action) {
  const registered = globalShortcut.register(accelerator, action);
  if (!registered) console.warn(`ショートカットを登録できませんでした: ${accelerator}`);
}

function registerGlobalShortcuts() {
  registerShortcut('CommandOrControl+Shift+Space', () => sendCommand('toggle-timer'));
  registerShortcut('CommandOrControl+Shift+T', () => setClickThrough(!overlayState.clickThrough));
  registerShortcut('CommandOrControl+Shift+H', () => sendCommand('toggle-controls'));
  registerShortcut('CommandOrControl+Shift+R', () => sendCommand('reset'));
  registerShortcut('CommandOrControl+Shift+F', () => sendCommand('toggle-fullscreen'));
  registerShortcut('CommandOrControl+Shift+Q', () => app.quit());
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 760,
    minWidth: 520,
    minHeight: 300,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    resizable: true,
    fullscreenable: true,
    show: false,
    title: 'Workshop Timer Overlay',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === NININ_URL || url === TABE_LAB_URL) {
      void shell.openExternal(url).catch((error) => console.error('リンクを開けませんでした', error));
      return { action: 'deny' };
    }
    if (url.startsWith('file:') && url.includes('/agenda.html')) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 520,
          height: 760,
          minWidth: 360,
          minHeight: 480,
          backgroundColor: '#eaf0f7',
          alwaysOnTop: true,
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
          }
        }
      };
    }
    if (url.startsWith('file:') && url.includes('index.html?view=pomodoro')) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 620,
          height: 760,
          minWidth: 380,
          minHeight: 520,
          backgroundColor: '#111827',
          alwaysOnTop: true,
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
          }
        }
      };
    }
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, targetUrl) => {
    if (targetUrl !== mainWindow.webContents.getURL()) event.preventDefault();
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    sendState();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.handle('overlay:get-state', () => stateSnapshot());
ipcMain.handle('overlay:set-click-through', (_event, enabled) => setClickThrough(enabled));
ipcMain.handle('overlay:set-always-on-top', (_event, enabled) => setAlwaysOnTop(enabled));
ipcMain.handle('overlay:set-minimum-height', (_event, height) => {
  if (!mainWindow || mainWindow.isDestroyed()) return 300;
  const safeHeight = Math.min(1400, Math.max(180, Math.round(Number(height) || 300)));
  mainWindow.setMinimumSize(520, safeHeight);
  return safeHeight;
});
ipcMain.handle('overlay:toggle-fullscreen', () => {
  if (!mainWindow || mainWindow.isDestroyed()) return false;
  const nextValue = !mainWindow.isFullScreen();
  mainWindow.setFullScreen(nextValue);
  return nextValue;
});
ipcMain.on('overlay:minimize', () => mainWindow?.minimize());
ipcMain.on('overlay:close', () => mainWindow?.close());

app.whenReady().then(() => {
  createWindow();
  registerGlobalShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
