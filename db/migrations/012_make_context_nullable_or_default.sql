-- 012_make_context_nullable.sql

PRAGMA foreign_keys = OFF;

-- 1) Sauvegarde
CREATE TABLE _appointments_backup AS
SELECT * FROM appointments;

-- 2) Supprime l’ancienne table
DROP TABLE appointments;

-- 3) Recrée avec context nullable et défaut chaîne vide
CREATE TABLE appointments (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  offer_id         INTEGER NOT NULL,
  appointment_date TEXT    NOT NULL,
  context          TEXT    DEFAULT '',       -- devient facultatif
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (offer_id) REFERENCES offre_emploie(id) ON DELETE CASCADE
);

-- 4) Restaure les données (context vide si NULL)
INSERT INTO appointments (id, offer_id, appointment_date, context, created_at)
SELECT id, offer_id, appointment_date, COALESCE(context, ''), created_at
FROM _appointments_backup;

-- 5) Nettoyage
DROP TABLE _appointments_backup;
PRAGMA foreign_keys = ON;
