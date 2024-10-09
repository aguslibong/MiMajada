import * as SQLite from 'expo-sqlite';

// Inicializa la variable db para que pueda ser utilizada más adelante
let db: SQLite.SQLiteDatabase | null = null;

export const setupDatabase = async () => {
    try {
        // Abre o crea la base de datos (si no existe, la crea automáticamente)
        db = await SQLite.openDatabaseAsync('sheep_inspection.db');

        // Verificamos que la base de datos se haya abierto
        if (db) {
            // Configura las tablas dentro de la base de datos
            await db.withTransactionAsync(async () => {
                // Crear tabla "Sexo" si no existe
                await db!.execAsync(
                    `CREATE TABLE IF NOT EXISTS Sexo (
                        idSexo INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla ConditionBucal
                await db!.execAsync(
                    `CREATE TABLE IF NOT EXISTS ConditionBucal (
                        idConditionBucal INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla Enfermedades
                await db!.execAsync(`
                    CREATE TABLE IF NOT EXISTS Enfermedades (
                        idEnfermedad INTEGER PRIMARY KEY,
                        descripcion TEXT
                    );`
                );
                // Crear tabla RevisionOvinos
                await db!.execAsync(`
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
export const insertSexo = async (idSexo: number, descripcion: string) => {
    if (!db) return;

    try {
        await db.withTransactionAsync(async () => {
            await db?.runAsync(
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
export const insertConditionBucal = async (idConditionBucal: number, descripcion: string) => {
    if (!db) return;

    try {
        await db.withTransactionAsync(async () => {
            await db?.runAsync(
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
export const insertEnfermedad = async (idEnfermedad: number, descripcion: string) => {
    // ... (código similar a las funciones anteriores)
};

// Función para insertar una nueva revisión de ovino
export const insertRevisionOvino = async (
    condicionCorporal: number,
    idSexo: number,
    idConditionBucal: number,
    idEnfermedad: number,
    caravana: string
) => {
    if (!db) return;

    try {
        await db.withTransactionAsync(async () => {
            await db?.runAsync(
                'INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?);',
                [condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana]
            );
        });
        console.log('Revisión de ovino insertada correctamente.');
    } catch (error) {
        console.error('Error al insertar revisión de ovino:', error);
    }
};