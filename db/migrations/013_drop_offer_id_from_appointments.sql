PRAGMA foreign_keys = OFF;

-- 1) Supprimer l'éventuelle table de backup existante
DROP TABLE IF EXISTS _appointments_backup;

-- 2) Sauvegarder les données actuelles
CREATE TABLE _appointments_backup AS
SELECT id, appointment_date, context, created_at
FROM appointments;

-- 3) Supprimer l'ancienne table
DROP TABLE IF EXISTS appointments;

-- 4) Recréer la table sans la colonne offer_id
CREATE TABLE appointments (
id               INTEGER PRIMARY KEY AUTOINCREMENT,
appointment_date TEXT    NOT NULL,
context          TEXT    DEFAULT '',
created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- 5) Restaurer les données sauvegardées
INSERT INTO appointments (id, appointment_date, context, created_at)
SELECT id, appointment_date, context, created_at
FROM _appointments_backup;

-- 6) Nettoyer
DROP TABLE IF EXISTS _appointments_backup;
PRAGMA foreign_keys = ON;

