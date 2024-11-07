import db from '../../db/db-init';
import { RevisionOvino } from '../../model/RevisionOvino';
import { CondicionBucalSingleton } from '../Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../Singleton/RevisionOvino/EnfermedadSingleton.service';
import { SexoSingleton } from '../Singleton/RevisionOvino/SexoSingleton.service';
import { getMajadaById } from './MajadaRepository';

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

const crearOvinoDeClaseAEntidad = async (idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) => {
    const sexoObjeto = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjeto = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadObjeto = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad);
    const majadaObjeto = await getMajadaById(idMajada);
    
    if (sexoObjeto && condicionBucalObjeto) {
        return new RevisionOvino(
            majadaObjeto,
            0,
            sexoObjeto,
            condicionCorporal,
            condicionBucalObjeto,
            caravana || 'No posee',
            enfermedadObjeto || EnfermedadSingleton.getInstance().getEnfermedadById(1)
        );
    }
    
    return;
};

const getAllRevisionOvino = async (idMajada) => {
    if (!db) return;
    
    const allRows = await (await db).getAllAsync('SELECT * FROM RevisionOvinos WHERE idMajada = ?', idMajada);
    
    for (const row of allRows) {
        console.log(row.id, row.condicionCorporal, row.idSexo, row.idCondicionBucal, row.idEnfermedad, row.caravana);
    }

    return Promise.all(
        allRows.map(row => crearOvinoDeClaseAEntidad(
            row.idMajada, 
            row.idSexo, 
            row.condicionCorporal, 
            row.idCondicionBucal, 
            row.idEnfermedad, 
            row.caravana
        ))
    );
};


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