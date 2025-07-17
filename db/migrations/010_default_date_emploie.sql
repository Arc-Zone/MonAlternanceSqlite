-- 011_default_date_emploie.sqlite.sql

PRAGMA foreign_keys = OFF;

-- 1) Sauvegarde temporaire
CREATE TABLE IF NOT EXISTS _offre_emploie_backup AS
SELECT * FROM offre_emploie;

-- 2) Supprime l’ancienne table
DROP TABLE IF EXISTS offre_emploie;

-- 3) Recrée la table avec DEFAULT CURRENT_TIMESTAMP
CREATE TABLE IF NOT EXISTS offre_emploie (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name_emploie  TEXT    NOT NULL,
  entreprise    TEXT    NOT NULL,
  date_emploie  TEXT    NOT NULL DEFAULT (datetime('now')),
  plateform_job TEXT    NOT NULL,
  waiting       INTEGER DEFAULT 0,
  refused       INTEGER DEFAULT 0,
  valided       INTEGER DEFAULT 0,
  type_emploie  TEXT,
  description_job TEXT,
  city_job      TEXT,
  link_job      TEXT
);

-- 4) Restaure les données
INSERT INTO offre_emploie (
  id,
  name_emploie,
  entreprise,
  date_emploie,
  plateform_job,
  waiting,
  refused,
  valided,
  type_emploie,
  description_job,
  city_job,
  link_job
)
SELECT
  id,
  name_emploie,
  entreprise,
  date_emploie,
  plateform_job,
  waiting,
  refused,
  valided,
  type_emploie,
  description_job,
  city_job,
  link_job
FROM _offre_emploie_backup;

-- 5) Nettoyage
DROP TABLE IF EXISTS _offre_emploie_backup;
PRAGMA foreign_keys = ON;
