import * as SQLite from 'expo-sqlite';
import { CondicionBucal } from '../model/CondicionBucal';
import { Sexo } from '../model/Sexo';
import { RevisionOvino } from '../model/RevisionOvino';
import { Enfermedad } from '../model/Enfermedad';


const setupDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    try {
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS Sexo (
                    idSexo INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
        
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS CondicionBucal (
                    idCondicionBucal INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS Enfermedades (
                    idEnfermedad INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )
         
        await db.execAsync(
            `PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS RevisionOvinos (
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
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    if (!db) return;

    const idSexo = sexo.getIdSexo();
    const descripcion = sexo.getDescripcion();

    await db.execAsync(
        'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (?, ?);',
        [idSexo, descripcion],
        () => console.log('Sexo insertado correctamente.'),
        (_, error) => {
            console.error('Error al insertar sexo:', error);
            return false;
        }
    );
};

const insertConditionBucal = async (condicionBucal) => {
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    if (!db) return;

    const idCondicionBucal = condicionBucal.getIdCondicionBucal();
    console.log(idCondicionBucal);
    const descripcion = condicionBucal.getDescripcion();

    db.execAsync(
        'INSERT OR IGNORE INTO CondicionBucal (idCondicionBucal, descripcion) VALUES (?, ?);',
        [idCondicionBucal, descripcion],
        () => console.log('Condición bucal insertada correctamente.'),
        (_, error) => {
            console.error('Error al insertar condición bucal:', error);
            return false;
        }
    );
};

const insertEnfermedad = async (enfermedad) => {
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();

    db.execAsync(
        'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
        [idEnfermedad, descripcion],
        () => console.log('Enfermedad insertada correctamente.'),
        (_, error) => {
            console.error('Error al insertar enfermedad:', error);
            return false;
        }
    )
};

const insertRevisionOvino = async (revisionOvino) => {
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    db.execAsync(
        'INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?);',
        [condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana],
        () => console.log('Revisión ovino insertada correctamente.'),
        (_, error) => {
            console.error('Error al insertar revisión ovino:', error);
            return false;
        }
    );
};


const getAllRevisionOvino = async () => {
    const db = await SQLite.openDatabaseAsync('mimajada.db');
    if (!db) return;
    const allRows = db.getAllAsync('SELECT * FROM RevisionOvinos');
    for (const row of allRows) {
    console.log(row.id,row.condicionCorporal, row.idSexo, row.idCondicionBucal, row.idEnfermedad, row.caravana);
    }
}

export default { setupDatabase, insertConditionBucal, insertEnfermedad, insertSexo, insertRevisionOvino, getAllRevisionOvino };
