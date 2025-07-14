MonAlternance

MonAlternance est une application de bureau (Electron + Express) permettant de gérer efficacement ta recherche d’alternance : candidatures, entreprises contactées, modèles de message, To‑Do list et prise de rendez‑vous.

🚀 Fonctionnalités clés

Gestion des candidatures

Ajouter/Supprimer/Modifier le statut (En attente, Refusée, Acceptée)

Regroupement par date de candidature (ex. mardi 15 juillet 2025)

Liste d’entreprises

Ajouter/Supprimer les entreprises contactées

Modèles de messages

Stocker et copier facilement tes modèles de mails ou SMS

Gestion des tâches (To‑Do)

Ajouter/Supprimer des tâches pour t’organiser

Documents & Lettres de motivation

Visualiser tes PDF (CV, lettres de motivation) dans une carte

Télécharger / Supprimer directement depuis l’application

Rendez‑vous

Planifier un rendez‑vous post‑entrée en base (table appointments)

Base de données embarquée

SQLite léger, pas besoin d’installation externe

Interface responsive

Bootstrap 5 pour un design épuré et adaptatif

🛠️ Tech Stack

Couche

Technologie

Frontend

EJS + Bootstrap 5

Backend

Node.js + Express

BDD

SQLite (fichier dev.sqlite)

Desktop

Electron

Migrations

SQL scripts (db/migrations/)

📦 Installation & Lancement

Clone le dépôt

git clone git@github.com:Arc-Zone/MonAlternance.git
cd MonAlternance

Installer les dépendances

npm install

Lancer l’application

npm start

Express démarre sur http://localhost:3000

Electron ouvre automatiquement la fenêtre

Rebuild pour distribution (optionnel)

npm run make  # via Electron Forge

🗂 Structure du projet

MonAlternance/
├── db/
│   ├── migrations/       # Scripts SQL pour la BDD
│   └── db.js             # Wrapper SQLite
├── public/               # Fichiers statiques (CSS, JS, images)
├── routes/               # Définition des routes Express
│   └── routes.js
├── controllers/          # Logique métier des routes
│   └── home.js
├── views/                # Templates EJS
├── scripts/              # JS côté client (modal, recherche...)
├── main.js               # Point d’entrée Electron
├── server.js             # Configuration Express + migrations
├── package.json
└── README.md

⭐ Contribuer

Fork le dépôt

Crée une branche feature : git checkout -b feature/ma-fonctionnalite

Commit tes changements : git commit -m "feat: description de la fonctionnalité"

Push vers ta branche : git push origin feature/ma-fonctionnalite

Ouvre une Pull Request sur main

📝 License

Ce projet est open source sous la licence MIT.Voir le fichier LICENSE pour plus d’informations.

