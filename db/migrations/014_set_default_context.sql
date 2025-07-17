PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

CREATE TABLE appointments_new (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  context          TEXT    NOT NULL DEFAULT '',  -- <— default vide
  appointment_date TEXT    NOT NULL,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO appointments_new (id, context, appointment_date, created_at)
SELECT
  id,
  COALESCE(context, ''),   -- au cas où il y ait déjà des valeurs
  appointment_date,
  created_at
FROM appointments;

DROP TABLE appointments;
ALTER TABLE appointments_new RENAME TO appointments;

COMMIT;
PRAGMA foreign_keys = ON;
