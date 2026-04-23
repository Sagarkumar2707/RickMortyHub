import { open, OPSQLiteConnection } from '@op-engineering/op-sqlite';
import { DB_NAME } from '@constants/index';
import { FavouriteCharacter } from '@types/api.types';

// ============================================================
// DATABASE CONNECTION
// ============================================================

/** Singleton database connection instance */
let db: OPSQLiteConnection | null = null;

/**
 * Opens and returns the SQLite database connection.
 * Creates the database if it does not exist.
 * Uses singleton pattern — only one connection is created.
 */
export const getDatabase = (): OPSQLiteConnection => {
  if (!db) {
    db = open({ name: DB_NAME });
  }
  return db;
};

// ============================================================
// TABLE SETUP
// ============================================================

/**
 * Initializes the database schema.
 * Creates the favourites table if it does not already exist.
 * Must be called once on app startup before any DB operations.
 */
export const initDatabase = async (): Promise<void> => {
  const database = getDatabase();

  await database.execute(`
    CREATE TABLE IF NOT EXISTS favourites (
      id          INTEGER PRIMARY KEY NOT NULL,
      name        TEXT NOT NULL,
      status      TEXT NOT NULL,
      species     TEXT NOT NULL,
      gender      TEXT NOT NULL,
      image       TEXT NOT NULL,
      locationName TEXT NOT NULL,
      originName  TEXT NOT NULL,
      savedAt     TEXT NOT NULL
    );
  `);

  if (__DEV__) {
    console.log('[DB] Favourites table initialized');
  }
};

// ============================================================
// READ OPERATIONS
// ============================================================

/**
 * Fetches all favourite characters from SQLite.
 * Returns them sorted by most recently saved first.
 * @returns Array of FavouriteCharacter objects
 */
export const getAllFavourites = async (): Promise<FavouriteCharacter[]> => {
  const database = getDatabase();

  const result = await database.execute(
    'SELECT * FROM favourites ORDER BY savedAt DESC;',
  );

  if (!result.rows || result.rows.length === 0) {
    return [];
  }

  return result.rows as unknown as FavouriteCharacter[];
};

/**
 * Checks if a character is already saved as a favourite.
 * @param id - The character ID to check
 * @returns true if the character is a favourite, false otherwise
 */
export const isFavourite = async (id: number): Promise<boolean> => {
  const database = getDatabase();

  const result = await database.execute(
    'SELECT id FROM favourites WHERE id = ?;',
    [id],
  );

  return (result.rows?.length ?? 0) > 0;
};

// ============================================================
// WRITE OPERATIONS
// ============================================================

/**
 * Inserts a character into the favourites table.
 * Uses INSERT OR REPLACE to avoid duplicate entries.
 * @param character - The FavouriteCharacter object to save
 */
export const addFavourite = async (character: FavouriteCharacter): Promise<void> => {
  const database = getDatabase();

  await database.execute(
    `INSERT OR REPLACE INTO favourites
      (id, name, status, species, gender, image, locationName, originName, savedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      character.id,
      character.name,
      character.status,
      character.species,
      character.gender,
      character.image,
      character.locationName,
      character.originName,
      character.savedAt,
    ],
  );

  if (__DEV__) {
    console.log(`[DB] Added favourite: ${character.name}`);
  }
};

/**
 * Removes a character from the favourites table by ID.
 * @param id - The character ID to remove
 */
export const removeFavourite = async (id: number): Promise<void> => {
  const database = getDatabase();

  await database.execute(
    'DELETE FROM favourites WHERE id = ?;',
    [id],
  );

  if (__DEV__) {
    console.log(`[DB] Removed favourite with id: ${id}`);
  }
};

// ============================================================
// UTILITY
// ============================================================

/**
 * Closes the database connection.
 * Should be called when the app is unmounted or backgrounded.
 */
export const closeDatabase = (): void => {
  if (db) {
    db.close();
    db = null;

    if (__DEV__) {
      console.log('[DB] Database connection closed');
    }
  }
};
