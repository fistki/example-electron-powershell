const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runPowerShellCommand: (command) => ipcRenderer.invoke('run-powershell-command', command)
});