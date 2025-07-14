// server.js
const express = require('express');
const routes = require('./routes/routes.js');
const path = require('path');
const db = require('./db/db.js');

function configureExpress(app) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', routes.router);
}

async function startServer() {
  try {
    // 1) Initialise SQLite, crée dev.sqlite et toutes les tables
    await db.init;
    console.log('✅ Base de données initialisée');

    // 2) Configure and start Express
    const app = express();
    configureExpress(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
    });

    return app;
  } catch (err) {
    console.error('❌ Erreur au démarrage du serveur :', err);
    process.exit(1);
  }
}

// Démarrage
startServer();

// Pour tests ou Electron
module.exports = startServer;
