const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:3000");

  // Open the DevTools.
  win.webContents.openDevTools();
}
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function runPowerShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(`powershell.exe -Command "${command}"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

ipcMain.handle("run-powershell-command", async (event, command) => {
  try {
    const result = await runPowerShellCommand(command);
    return result;
  } catch (error) {
    console.error(error);
    return `Error: ${error.message}`;
  }
});
