import * as SQLite from 'expo-sqlite';

// Abrir la base de datos 'mimajada.db' una sola vez
const db = SQLite.openDatabaseAsync('mimajada.db');

export default db;