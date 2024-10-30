import db from './db-init.js';


//Acá se inicializa la base de datos y se crean las tablas si no existen
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
            `CREATE TABLE IF NOT EXISTS EpocasDelAño (
                    idEpocaDelAño INTEGER PRIMARY KEY,
                    descripcion TEXT
                );`
        )

        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS Majadas (
                idMajada INTEGER PRIMARY KEY,
                idEpocaDelAño INTEGER,
                estancia TEXT,
                fechaDeRevision DATETIME,
                observacion TEXT,
                FOREIGN KEY(idEpocaDelAño) REFERENCES EpocasDelAño(idEpocaDelAño)
            );`
        )
         
        await (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS RevisionOvinos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    condicionCorporal INTEGER,
                    idSexo INTEGER,
                    idConditionBucal INTEGER,
                    idEnfermedad INTEGER,
                    idMajada INTEGER,
                    caravana TEXT,
                    FOREIGN KEY(idSexo) REFERENCES Sexo(idSexo),
                    FOREIGN KEY(idConditionBucal) REFERENCES CondicionBucal(idCondicionBucal),
                    FOREIGN KEY(idEnfermedad) REFERENCES Enfermedades(idEnfermedad),
                    FOREIGN KEY(idMajada) REFERENCES Majadas(idMajada)
                );`
        )

        //Seteo los valores predeterminados que nunca cambian de los atributos de la revision ovino
        
        await (await db).runAsync(
            'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (0, "Macho"), (1, "Hembra");'
          );

        await (await db).runAsync(
            'INSERT OR IGNORE INTO CondicionBucal (idCondicionBucal, descripcion) VALUES (1, "ddl"), (2, "2d"), (3, "4d"), (4, "6d"), (5, "bll"), (6, "md"), (7, "sd");'
          );

        await (await db).runAsync(
            'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (1, "No posee"), (2, "Sarna"), (3, "Infeccion"), (4, "Garrapata"), (5, "Otra");'
        );
        
        /*LIMPIAR BASE DE DATOS
        await (await db).runAsync(
            'DELETE FROM Sexo'
          );

        await (await db).runAsync(
            'DELETE FROM CondicionBucal'
          );

        await (await db).runAsync(
            'DELETE FROM Enfermedades'
        );

        await (await db).runAsync(
            'DROP TABLE IF EXISTS RevisionOvinos'
        );*/
        console.log("Base de datos configurada y tablas creadas correctamente.");
    } catch (error) {
        console.error("Error al configurar la base de datos:", error);
    }
};
export default setupDatabase;
