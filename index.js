// main.js
const { app: electronApp, BrowserWindow, shell } = require('electron');
const initServer = require('./server'); // ton initServer exporté depuis server.js

async function createWindow() {
  // 1) Démarre Express + SQLite
  const expressApp = await initServer();
  console.log('✅ Serveur Express démarré');

  // 2) Crée la fenêtre Electron
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 3) Ouvre les liens externes dans le navigateur natif
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // 4) Charge l'URL de ton serveur
  mainWindow.loadURL('http://localhost:3000');
}

// Quand Electron est prêt, on lance tout
electronApp.whenReady().then(createWindow);

electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electronApp.quit();
});
