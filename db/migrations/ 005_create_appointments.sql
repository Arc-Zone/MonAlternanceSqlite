-- 005_create_appointments.sql

CREATE TABLE IF NOT EXISTS appointments (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_date TEXT    NOT NULL,
  context          TEXT    DEFAULT '',         -- nullable + défaut vide
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);
