CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  context TEXT          NOT NULL,  -- ce qui se passe pendant le rdv
  appointment_date TEXT NOT NULL   -- le jour choisi dans le calendrier
);
