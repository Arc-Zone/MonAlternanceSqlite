// server.js
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');
const { app: electronApp } = require('electron');

const app = express();

// === 1) Configuration des uploads hors ASAR ===
const userDataPath = electronApp.getPath('userData');
const uploadDir    = path.join(userDataPath, 'docs', 'cv');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Sert les PDF depuis le dossier userData
app.use('/docs/cv', express.static(uploadDir));

// === 2) Statics & Vues ===
const isDev = process.env.NODE_ENV !== 'production';
const resourcesPath = isDev
  ? __dirname
  : path.join(process.resourcesPath, 'app.asar.unpacked');

app.use(express.static(path.join(resourcesPath, 'public')));
app.set('views', path.join(resourcesPath, 'views'));
app.set('view engine', 'ejs');

// === 3) Body parsers ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === 4) Routes de ton appli ===
// Exemple d’upload
app.post('/upload-doc', upload.single('cv'), (_req, res) => {
  res.redirect('/docs');
});

// Ici, monte tes routes existantes
const routes = require('./routes/routes.js');
app.use('/', routes.router);

// === 5) Démarrage du serveur Express ===
function startServer() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Serveur Express démarré sur le port ${port}`);
  });
}

// Si on exécute directement server.js (et non importé par Electron), on démarre aussi le serveur
if (require.main === module) {
  startServer();
}

module.exports = app;
