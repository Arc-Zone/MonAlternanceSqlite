CREATE TABLE IF NOT EXISTS offre_emploie (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_emploie TEXT NOT NULL,
  entreprise TEXT NOT NULL,
  date_emploie TEXT NOT NULL,
  plateform_job TEXT NOT NULL,
  waiting INTEGER DEFAULT 0,
  refused INTEGER DEFAULT 0,
  valided INTEGER DEFAULT 0
);