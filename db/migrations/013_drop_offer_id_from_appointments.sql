-- 013_drop_offer_id_from_appointments.sql

PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

-- 1) On recrée la table sans offer_id
CREATE TABLE appointments_new (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  context          TEXT    NOT NULL DEFAULT '',
  appointment_date TEXT    NOT NULL,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- 2) On copie les données existantes (en adaptant si besoin)
INSERT INTO appointments_new (id, context, appointment_date, created_at)
SELECT
  id,
  COALESCE(context, ''),        -- si tu avais déjà ajouté la colonne context
  appointment_date,
  created_at
FROM appointments;

-- 3) On remplace l’ancienne table
DROP TABLE appointments;
ALTER TABLE appointments_new RENAME TO appointments;

COMMIT;
PRAGMA foreign_keys = ON;
