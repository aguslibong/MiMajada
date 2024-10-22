import db from '../../db/db-init';

const insertEnfermedad = async (enfermedad) => {
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();

    (await db).runAsync(
        'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
        idEnfermedad, descripcion)
};


const getAllEnfermedad = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM Enfermedades');
    for (const row of allRows) {
        console.log(row.idEnfermedad, row.descripcion);
    };
}

export { insertEnfermedad, getAllEnfermedad };