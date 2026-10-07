'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('overlayBridge', {
  getState: () => ipcRenderer.invoke('overlay:get-state'),
  setClickThrough: (enabled) => ipcRenderer.invoke('overlay:set-click-through', Boolean(enabled)),
  setAlwaysOnTop: (enabled) => ipcRenderer.invoke('overlay:set-always-on-top', Boolean(enabled)),
  setMinimumHeight: (height) => ipcRenderer.invoke('overlay:set-minimum-height', Number(height)),
  toggleFullscreen: () => ipcRenderer.invoke('overlay:toggle-fullscreen'),
  minimize: () => ipcRenderer.send('overlay:minimize'),
  close: () => ipcRenderer.send('overlay:close'),
  onCommand: (callback) => {
    ipcRenderer.on('overlay:command', (_event, command) => callback(command));
  },
  onState: (callback) => {
    ipcRenderer.on('overlay:state', (_event, state) => callback(state));
  }
});
