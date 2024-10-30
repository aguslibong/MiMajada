import db from '../../db/db-init';
import { Majada } from '../../model/majada';

const insertMajada = async (majada) => {
    if (!db) return;

    const estancia = majada.getEstancia();
    const idEpocaDelAño = majada.getEpocaDelAño().getIdEpocaDelAño();
    const fechaActual = majada.getFechaDeRevision();
    const observacion = majada.getObservacion();

    const result = (await db).runAsync('INSERT INTO Majadas (idEpocaDelAño, estancia, fechaDeRevision, observacion) VALUES (?, ?, ?, ?)',
    idEpocaDelAño, estancia, fechaActual, observacion)
    
    return (await result).lastInsertRowId;
};

const getAllMajada = async () => {
    if (!db) return;
    const allRows = await (await db).getAllAsync('SELECT * FROM Majadas');
    const arrayMajadas = new Array();
    for (const row of allRows) {
        arrayMajadas.push(new Majada(row.idMajada,row.idEpocaDelAño,row.estancia,row.fechaDeRevision,row.observacion))
    };
    return arrayMajadas;
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

export { insertMajada, getAllMajada, deleteRevisionOvino, updateRevisionOvino, obtenerIdMajadaMasGrande };