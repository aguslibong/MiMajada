import db from '../../db/db-init';
import { Majada } from '../../model/Majada'
import { EpocaDelAñoSingleton } from '../Singleton/RevisionOvino/EpocaDelAñoSingleton.service';

const insertMajada = async (majada) => {
    if (!db) {return};

    const estancia = majada.getEstancia();
    const idEpocaDelAño = majada.getEpocaDelAño().getIdEpocaDelAño();
    const fechaActual = majada.getFechaDeRevision();
    const observacion = majada.getObservacion();
    console.log("Insertando Majada en la base de datos", idEpocaDelAño, estancia, fechaActual, observacion) 

    const result = await (await db).runAsync('INSERT INTO Majadas (idEpocaDelAño, estancia, fechaDeRevision, observacion) VALUES (?, ?, ?, ?)',
    idEpocaDelAño, estancia, fechaActual, observacion)
    const id = result.lastInsertRowId;
    return id;
};

const getAllMajada = async () => {
    if (!db) return [];  // Devuelve un array vacío si `db` no está inicializado

    const allRows = await (await db).getAllAsync('SELECT * FROM Majadas');    

    return allRows.map(row => 
        new Majada(row.idMajada, EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(row.idEpocaDelAño), row.estancia, row.fechaDeRevision, row.observacion)
    );
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

const getMajadaById = async (idMajada) => {
    if (!db) return; 

    const row = await (await db).getFirstAsync('Select * FROM Majadas WHERE idMajada = ?', idMajada)
    if (row){
        return new Majada(row.idMajada, row.idEpocaDelAño, row.estancia, row.fechaDeRevision, row.observacion)
    }
    else {
        return ;
    }
}

export { insertMajada, getAllMajada, deleteMajada, updateMajada, getMajadaById};