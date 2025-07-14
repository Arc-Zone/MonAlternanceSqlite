// db/db.js
const { readdirSync, readFileSync, existsSync } = require('fs');
<<<<<<< HEAD
const { join } = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function init() {
  // Ouvre (ou crée) le fichier dev.sqlite
  const db = await open({
    filename: './dev.sqlite',
    driver: sqlite3.Database
  });

  // Chemin vers le dossier de migrations (db/migrations)
  const migrationsDir = join(__dirname, 'migrations');

=======
const { join }                   = require('path');
const sqlite3                    = require('sqlite3');
const { open }                   = require('sqlite');

async function init() {
  const db = await open({
    filename: './dev.sqlite',
    driver:   sqlite3.Database
  });

  // Chemin vers ton dossier de migrations, adapté si db.js est dans /db
  const migrationsDir = join(__dirname, 'migrations');

  // Si le dossier existe, on exécute les migrations
>>>>>>> 97cb854 (Add files via upload)
  if (existsSync(migrationsDir)) {
    const files = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();
<<<<<<< HEAD

    for (const file of files) {
      const sql = readFileSync(join(migrationsDir, file), 'utf8');
      try {
        await db.exec(sql);
      } catch (err) {
        // On ignore :
        //  - “already (another )?table|index exists”
        //  - “duplicate column name”
        const msg = err.message || '';
        if (
          /already (another )?(table|index)/i.test(msg) ||
          /duplicate column name/i.test(msg)
        ) {
          continue;
        }
        console.error(`Erreur lors de la migration ${file}:`, err);
        throw err;
      }
    }

=======
    for (const file of files) {
      const sql = readFileSync(join(migrationsDir, file), 'utf8');
      await db.exec(sql);
    }
>>>>>>> 97cb854 (Add files via upload)
    console.log(`✅ Applied ${files.length} migrations from ${migrationsDir}`);
  } else {
    console.warn(`⚠️  No migrations folder found at ${migrationsDir}, skipping migrations.`);
  }

  return db;
}

const dbPromise = init();

async function query(sql, params = []) {
  const db = await dbPromise;
  if (/^\s*SELECT/i.test(sql)) {
    const rows = await db.all(sql, params);
    return [rows, []];
  } else {
    const result = await db.run(sql, params);
    return [{ affectedRows: result.changes }, []];
  }
}

module.exports = { init: dbPromise, query };
