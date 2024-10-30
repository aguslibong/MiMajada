import db from '../../db/db-init';

const insertSexo = async (sexo) => {
    if (!db) return;

    const idSexo = sexo.getIdSexo();
    const descripcion = sexo.getDescripcion();

    (await db).runAsync(
        'INSERT OR IGNORE INTO Sexo (idSexo, descripcion) VALUES (?, ?);',
        idSexo, descripcion)
};

const getAllSexo = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM Sexo');
    for (const row of allRows) {
        console.log(row.idSexo, row.descripcion);
    };
}

export { insertSexo, getAllSexo };