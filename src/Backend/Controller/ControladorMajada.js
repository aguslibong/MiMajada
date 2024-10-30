import db from '../db/db-init';
import setupDatabase from '../db/db-config';
import { getAllCondicionBucal, insertCondicionBucal } from '../service/repository/CondicionBucalRepository';
import { insertSexo, getAllSexo } from '../service/repository/SexoRepository';
import { getAllEnfermedad, insertEnfermedad } from '../service/repository/EnfermedadManagerRepository';
import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/repository/RevisionOvinoManagerRepository';
import { RevisionOvino }  from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service'
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import instanciaControlador from './ControladorRevisionOvino';
import { Majada } from '../model/majada';

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorMajada {
  constructor() {
    if (!ControladorMajada.instance) {
        const majada = new Majada();
        ControladorMajada.instance = this;
    }
    return ControladorMajada.this;
  }


  registrarMajada(epocaDelAño, estancia) {
    const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
    const arrayRevisiones = instanciaControlador.obtenerRevisiones();
    const date = new Date();
    const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");
    
    try{ if(epocaDelAño && estancia && arrayRevisiones){

        majada.set

    }} catch {

    }


      // Guardar los datos en la base de datos
      setupDatabase();
      insertRevisionOvino(revisionOvino)
    }
  }

  obtenerRevisiones() {
    return this.revisiones;
  }

  eliminarRevision(id) {
    const index = this.revisiones.findIndex((revision) => revision.id === id);
    if (index !== -1) {
      this.revisiones.splice(index, 1);
    }
    deleteRevisionOvino(id);
  }

  modificarRevision(id, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const revision = this.revisiones.find((revision) => revision.id === id);
    const sexoValue = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad)
    if (revision) {
      revision.setSexo(sexoValue);
      revision.setCondicionCorporal(condicionCorporal);
      revision.setCondicionBucal(condicionBucalObjetoValue);
      revision.setEnfermedad(enfermedadValue);
      revision.setCaravana(caravana);
      updateRevisionOvino(revision);
    }
  }
  obtenerRevisionPorId(id) {
    return this.revisiones.find((revision) => revision.id == id);
}
}

// Asegurar una única instancia
const instanciaControladorMajada = new ControladorMajada();
Object.freeze(instanciaControladorMajada);

export default instanciaControladorMajada;
