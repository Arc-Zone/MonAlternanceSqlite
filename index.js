// index.js
const path       = require('path');
const http       = require('http');
const { app: electronApp, BrowserWindow, shell } = require('electron');
const { clipboard } = require('electron');

// Charge ton Express “server.js”
const expressApp = require('./server');

let mainWindow;

// 1) Montage du serveur HTTP autour d’Express
const apiServer = http.createServer(expressApp);

// 2) Démarrage d’Express via le serveur HTTP
async function startExpress() {
  return new Promise((resolve, reject) => {
    apiServer.listen(3000, (err) => {
      if (err) return reject(err);
      console.log('✅ Serveur Express démarré sur http://localhost:3000');
      resolve();
    });
  });
}

// 3) Création de la fenêtre Electron
function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Ouvre les liens externes dans le navigateur par défaut
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  // Charge l’URL de ton API
  mainWindow.loadURL('http://localhost:3000');
}

// 4) Pipeline de démarrage
electronApp.whenReady()
  .then(startExpress)   // Démarre Express d’abord
  .then(createWindow)   // Puis la fenêtre
  .catch(err => {
    console.error('❌ Erreur au démarrage :', err);
    electronApp.quit();
  });

// 5) Fermeture propre
electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electronApp.quit();
});

electronApp.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
