import db from '../../db/db-init';

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
        arrayMajadas.push()//new Majada(row.idMajada,row.idEpocaDelAño,row.estancia,row.fechaDeRevision,row.observacion))
    };
    return arrayMajadas;
}

const deleteMajada = async (idMajada) => {
    if (!db) return;
    (await db).runAsync('DELETE FROM Majadas WHERE idMajada = ?', idMajada);
}

const updateMajada = async (majada) => {
    if (!db) return;
    
    const idMajada = majada.getIdMajada();
    const estancia = majada.getEstancia();
    const idEpocaDelAño = majada.getEpocaDelAño().getIdEpocaDelAño();
    const fechaActual = majada.getFechaDeRevision();
    const observacion = majada.getObservacion();

    (await db).runAsync('UPDATE Majadas SET idEpocaDelAño = ?, estancia = ?, fechaDeRevision = ?, observacion = ? WHERE idMajada = ?',
    idEpocaDelAño, estancia, fechaActual, observacion, idMajada);


}

export { insertMajada, getAllMajada, deleteMajada, updateMajada};