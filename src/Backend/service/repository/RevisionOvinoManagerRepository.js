import db from '../../db/db-init';
import { RevisionOvino } from '../../model/RevisionOvino';
const insertRevisionOvino = async (revisionOvino) => {
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    const result = (await db).runAsync('INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?)',
    condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana)

    const idRevionOvino = (await result).lastInsertRowId;
    revisionOvino.setId(idRevionOvino);
    
};

const getAllRevisionOvino = async (idMajada) => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM RevisionOvinos WHERE idMajada = ?', idMajada);
    const arrayRevisiones = new Array();
    for (const row of allRows) {
        arrayRevisiones.push(new RevisionOvino(row.id, row.idMajada, row.condicionCorporal, row.idSexo, row.idConditionBucal, row.idEnfermedad, row.caravana))
    };
    return arrayRevisiones;
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
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    (await db).runAsync('UPDATE RevisionOvinos SET condicionCorporal = ?, idSexo = ?, idConditionBucal = ?, idEnfermedad = ?, caravana = ? WHERE id = ?',
    condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana, id);
}

export { insertRevisionOvino, getAllRevisionOvino, deleteRevisionOvino, updateRevisionOvino };