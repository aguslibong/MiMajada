import * as SQLite from 'expo-sqlite';
import { CondicionBucal } from '../model/CondicionBucal';
import { Sexo } from '../model/Sexo';
import { RevisionOvino } from '../model/RevisionOvino';
import { Enfermedad } from '../model/Enfermedad';

let db = null;

const setupDatabase = async () => {
    try {
        db = await SQLite.openDatabaseAsync('sheep_inspection.db');

        if (db) {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Sexo (
                        idSexo INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                await tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ConditionBucal (
                        idConditionBucal INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                await tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Enfermedades (
                        idEnfermedad INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                await tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS RevisionOvinos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        condicionCorporal INTEGER,
                        idSexo INTEGER,
                        idConditionBucal INTEGER,
                        idEnfermedad INTEGER,
                        caravana TEXT,
                        FOREIGN KEY(idSexo) REFERENCES Sexo(idSexo),
                        FOREIGN KEY(idConditionBucal) REFERENCES ConditionBucal(idConditionBucal),
                        FOREIGN KEY(idEnfermedad) REFERENCES Enfermedades(idEnfermedad)
                    );`
                );
            });

            console.log("Base de datos configurada y tablas creadas correctamente.");
        } else {
            console.error("Error: No se pudo abrir la base de datos.");
        }
    } catch (error) {
        console.error("Error al configurar la base de datos:", error);
    }
};

const insertSexo = async (sexo) => {
    if (!db) return;

    const idSexo = sexo.getIdSexo();
    const descripcion = sexo.getDescripcion();

    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (?, ?);',
                [idSexo, descripcion]
            );
        });
        console.log('Sexo insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar sexo:', error);
    }
};

const insertConditionBucal = async (condicionBucal) => {
    if (!db) return;

    const idConditionBucal = condicionBucal.getIdCondicionBucal();
    const descripcion = condicionBucal.getDescripcion();
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                'INSERT OR IGNORE INTO ConditionBucal (idConditionBucal, descripcion) VALUES (?, ?);',
                [idConditionBucal, descripcion]
            );
        });
        console.log('Condición bucal insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar condición bucal:', error);
    }
};

const insertEnfermedad = async (enfermedad) => {
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
                [idEnfermedad, descripcion]
            );
        });
        console.log('Enfermedad insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar enfermedad:', error);
    }
};

const insertRevisionOvino = async (revisionOvino) => {
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                'INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?);',
                [condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana]
            );
        });
        console.log('Revisión de ovino insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar revisión de ovino:', error);
    }
};

export default { setupDatabase, insertConditionBucal, insertEnfermedad, insertSexo, insertRevisionOvino };
