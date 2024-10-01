import database from '../db/database.js' 

const insertRevisionOvino = (condicionCorporal, idSexo, idCondicionBucal, idEnfermedad, caravana) => {
  const db = database.getDatabase();
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idCondicionBucal, idEnfermedad, caravana) 
      VALUES (?, ?, ?, ?, ?);`,
      [condicionCorporal, idSexo, idCondicionBucal, idEnfermedad, caravana],
      (_, { rowsAffected }) => {
        console.log(`${rowsAffected} row(s) inserted.`);
      },
      (tx, error) => {
        console.error(error);
        return false;
      }
    );
  });
};

const getRevisionOvinos = (callback) => {
  const db = database.getDatabase();
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM RevisionOvinos;`,
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (tx, error) => {
        console.error(error);
        return false;
      }
    );
  });
};



export default { getRevisionOvinos, insertRevisionOvino}






  