-- 012_make_context_nullable.sql

PRAGMA foreign_keys = OFF;

-- 1) Supprime la table de backup si elle existe déjà
DROP TABLE IF EXISTS _appointments_backup;

-- 2) Sauvegarde temporaire des données actuelles
CREATE TABLE _appointments_backup AS
SELECT * FROM appointments;

-- 3) Supprime l’ancienne table
DROP TABLE IF EXISTS appointments;

-- 4) Crée la nouvelle table (context par défaut vide, appointment_date NOT NULL)
CREATE TABLE appointments (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  offer_id         INTEGER NOT NULL,
  appointment_date TEXT    NOT NULL,
  context          TEXT    DEFAULT '',
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (offer_id) REFERENCES offre_emploie(id) ON DELETE CASCADE
);

-- 5) Restaure les données (context vide si NULL)
INSERT INTO appointments (id, offer_id, appointment_date, context, created_at)
SELECT id, offer_id, appointment_date, COALESCE(context, ''), created_at
FROM _appointments_backup;

-- 6) Nettoie la table de backup
DROP TABLE IF EXISTS _appointments_backup;

PRAGMA foreign_keys = ON;
