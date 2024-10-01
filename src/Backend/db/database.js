import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('DbMajada.db');

// hay que usar SetupDatabase dentro de un useEffect 
const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Sexo (
        idSexo INTEGER PRIMARY KEY NOT NULL,
        descripcion TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS CondicionBucal (
        idCondicionBucal INTEGER PRIMARY KEY NOT NULL,
        descripcion TEXT,
        edad INTEGER
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Enfermedades (
        idEnfermedad INTEGER PRIMARY KEY NOT NULL,
        descripcion TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS RevisionOvinos (
        id INTEGER PRIMARY KEY NOT NULL,
        condicionCorporal INTEGER,
        idSexo INTEGER,
        idCondicionBucal INTEGER,
        idEnfermedad INTEGER,
        caravana TEXT,
        FOREIGN KEY (idSexo) REFERENCES Sexo(idSexo),
        FOREIGN KEY (idCondicionBucal) REFERENCES CondicionBucal(idCondicionBucal),
        FOREIGN KEY (idEnfermedad) REFERENCES Enfermedades(idEnfermedad)
      );`
    );
  });
};

const getDatabase = () => {
  return db;
};

export default {setupDatabase, getDatabase}

