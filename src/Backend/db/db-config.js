import db from './db-init.js';

const setupDatabase = async () => {
    try {
        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS Sexo (
                    idSexo INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
        
        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS CondicionBucal (
                    idCondicionBucal INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS Enfermedades (
                    idEnfermedad INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
         
        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS RevisionOvinos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    condicionCorporal INTEGER,
                    idSexo INTEGER,
                    idConditionBucal INTEGER,
                    idEnfermedad INTEGER,
                    caravana TEXT,
                    FOREIGN KEY(idSexo) REFERENCES Sexo(idSexo),
                    FOREIGN KEY(idConditionBucal) REFERENCES CondicionBucal(idCondicionBucal),
                    FOREIGN KEY(idEnfermedad) REFERENCES Enfermedades(idEnfermedad)
                );`
        )
        console.log("Base de datos configurada y tablas creadas correctamente.");
    } catch (error) {
        console.error("Error al configurar la base de datos:", error);
    }
};

const insertSexo = async (sexo) => {
    if (!db) return;

    const idSexo = sexo.getIdSexo();
    const descripcion = sexo.getDescripcion();

    (await db).runAsync(
        'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (?, ?);',
        idSexo, descripcion)
};

const insertConditionBucal = async (condicionBucal) => {
    if (!db) return;

    const idCondicionBucal = condicionBucal.getIdCondicionBucal();
    const descripcion = condicionBucal.getDescripcion();

    result = (await db).runAsync(
        'INSERT OR IGNORE INTO CondicionBucal (idCondicionBucal, descripcion) VALUES (?, ?);',
        idCondicionBucal, descripcion)

};

const insertEnfermedad = async (enfermedad) => {
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();

    (await db).runAsync(
        'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
        idEnfermedad, descripcion)
};

const insertRevisionOvino = async (revisionOvino) => {
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    const result = (await db).runAsync('INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?)',
    condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana)
    console.log((await result).lastInsertRowId);
    
};


const getAllRevisionOvino = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM RevisionOvinos');
    const contador = 0;
    for (const row of allRows) {
        console.log(row.id, row.condicionCorporal, row.idSexo, row.idConditionBucal, row.idEnfermedad, row.caravana);
    };
}
export default { setupDatabase, insertConditionBucal, insertEnfermedad, insertSexo, insertRevisionOvino, getAllRevisionOvino };
