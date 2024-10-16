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
export default setupDatabase;
