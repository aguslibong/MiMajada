import db from '../../db/db-init';

const insertRevisionOvino = async (revisionOvino) => {
    if (!db) return;

    const condicionCorporal = revisionOvino.getCondicionCorporal();
    const idSexo = revisionOvino.getSexo().getIdSexo();
    const idConditionBucal = revisionOvino.getCondicionBucal().getIdCondicionBucal();
    const idEnfermedad = revisionOvino.getEnfermedad().getIdEnfermedad();
    const caravana = revisionOvino.getCaravana();

    (await db).runAsync('INSERT INTO RevisionOvinos (condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana) VALUES (?, ?, ?, ?, ?)',
    condicionCorporal, idSexo, idConditionBucal, idEnfermedad, caravana)
    
};

const getAllRevisionOvino = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM RevisionOvinos');
    for (const row of allRows) {
        console.log(row.id, row.condicionCorporal, row.idSexo, row.idConditionBucal, row.idEnfermedad, row.caravana);
    };
}

export { insertRevisionOvino, getAllRevisionOvino };