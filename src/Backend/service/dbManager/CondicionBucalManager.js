import db from '../../db/db-init';

const insertCondicionBucal = async (condicionBucal) => {
    if (!db) return;

    const idCondicionBucal = condicionBucal.getIdCondicionBucal();
    const descripcion = condicionBucal.getDescripcion();

    result = (await db).runAsync(
        'INSERT OR IGNORE INTO CondicionBucal (idCondicionBucal, descripcion) VALUES (?, ?);',
        idCondicionBucal, descripcion)

};

const getAllCondicionBucal = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM CondicionBucal');
    for (const row of allRows) {
        console.log(row.idCondicionBucal, row.descripcion);
    };
}

export { insertCondicionBucal, getAllCondicionBucal };