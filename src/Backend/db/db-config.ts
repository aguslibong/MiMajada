import * as SQLite from 'expo-sqlite';
import { CondicionBucal } from '../model/CondicionBucal';
import { Sexo } from '../model/Sexo';
import { RevisionOvino } from '../model/RevisionOvino';
import { Enfermedad } from '../model/Enfermedad';

// Inicializa la variable db para que pueda ser utilizada más adelante
let db: SQLite.WebSQLDatabase | null = null;

const setupDatabase = async () => {
    try {
        // Abre o crea la base de datos (si no existe, la crea automáticamente)
        db = await SQLite.openDatabaseAsync('sheep_inspection.db');

        // Verificamos que la base de datos se haya abierto
        if (db) {
            // Configura las tablas dentro de la base de datos
            await db.withTransactionAsync(async (tx) => {
                // Crear tabla "Sexo" si no existe
                await tx.executeSqlAsync(
                    `CREATE TABLE IF NOT EXISTS Sexo (
                        idSexo INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla ConditionBucal
                await tx.executeSqlAsync(
                    `CREATE TABLE IF NOT EXISTS ConditionBucal (
                        idConditionBucal INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla Enfermedades
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS Enfermedades (
                        idEnfermedad INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla RevisionOvinos
                await tx.executeSqlAsync(`
                    CREATE TABLE IF NOT EXISTS RevisionOvinos (
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

// Función para insertar un nuevo sexo
const insertSexo = async (sexo: Sexo) => {
    if (!db) return;

    const idSexo = sexo.getIdSexo();
    const descripcion = sexo.getDescripcion();

    try {
        await db.withTransactionAsync(async (tx) => {
            await tx.executeSqlAsync(
                'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (?, ?);',
                [idSexo, descripcion]
            );
        });
        console.log('Sexo insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar sexo:', error);
    }
};

// Función para insertar una nueva condición bucal
const insertConditionBucal = async (condicionBucal: CondicionBucal) => {
    if (!db) return;

    const idConditionBucal = condicionBucal.getIdCondicionBucal();
    const descripcion = condicionBucal.getDescripcion();
    try {
        await db.withTransactionAsync(async (tx) => {
            await tx.executeSqlAsync(
                'INSERT OR IGNORE INTO ConditionBucal (idConditionBucal, descripcion) VALUES (?, ?);',
                [idConditionBucal, descripcion]
            );
        });
        console.log('Condición bucal insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar condición bucal:', error);
    }
};

// Función para insertar una nueva enfermedad
const insertEnfermedad = async (enfermedad: Enfermedad) => {
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();
    try {
        await db.withTransactionAsync(async (tx) => {
            await tx.executeSqlAsync(
                'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
                [idEnfermedad, descripcion]
            );
        });
        console.log('Enfermedad insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar enfermedad:', error);
    }
};

// Función para insertar una nueva revisión de ovino
const insertRevisionOvino = async (revisionOvino: RevisionOvino) => {
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    try {
        await db.withTransactionAsync(async (tx) => {
            await tx.executeSqlAsync(
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