import db from '../../db/db-init';

const insertEnfermedad = async (enfermedad) => {
    if (!db) return;

    const idEnfermedad = enfermedad.getIdEnfermedad();
    const descripcion = enfermedad.getDescripcion();

    (await db).runAsync(
        'INSERT OR IGNORE INTO Enfermedades (idEnfermedad, descripcion) VALUES (?, ?);',
        idEnfermedad, descripcion)
};


const getAllEpocaDelAño = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM EpocasDelAño');
    for (const row of allRows) {
        console.log(row.idEpocaDelAño, row.descripcion);
    };
}

export { insertEnfermedad, getAllEpocaDelAño };