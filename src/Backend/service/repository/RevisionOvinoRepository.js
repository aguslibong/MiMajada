import db from '../../db/db-init';

const insertRevisionOvino = async (revisionOvino) => {
    if (!db) return;
    
    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idCondicionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();
    const idMajada = revisionOvino.getIdMajada();
    
    const result = (await db).runAsync('INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idCondicionBucal, idEnfermedad,idMajada, caravana) VALUES (?, ?, ?, ?, ?, ?)',
    condicionCorporal, idSexo, idCondicionBucal, idEnfermedad,idMajada, caravana)

    const idRevionOvino = (await result).lastInsertRowId;
    revisionOvino.setId(idRevionOvino);
};

const getAllRevisionOvino = async (idMajada) => {
    if (!db) return ;
    const allRows = await (await db).getAllAsync('SELECT * FROM RevisionOvinos WHERE idMajada = ?', idMajada);
    for (const row of allRows) {
        console.log(row.id, row.condicionCorporal, row.idSexo, row.idCondicionBucal, row.idEnfermedad, row.caravana);
    };
    return allRows;
}

const deleteRevisionOvino = async (id) => {
    if (!db) return;
    console.log(id);
    (await db).runAsync('DELETE FROM RevisionOvinos WHERE id = ?', id);
}

const updateRevisionOvino = async (revisionOvino) => {
    if (!db) return;
    const id = revisionOvino.getId();
    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idCondicionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    (await db).runAsync('UPDATE RevisionOvinos SET condicionCorporal = ?, idSexo = ?, idCondicionBucal = ?, idEnfermedad = ?, caravana = ? WHERE id = ?',
    condicionCorporal, idSexo, idCondicionBucal, idEnfermedad, caravana, id);
}

export { insertRevisionOvino, getAllRevisionOvino, deleteRevisionOvino, updateRevisionOvino };