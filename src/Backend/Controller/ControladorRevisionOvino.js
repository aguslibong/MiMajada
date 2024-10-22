import db from '../db/db-init';
import setupDatabase from '../db/db-config';
import { getAllCondicionBucal, insertCondicionBucal } from '../service/dbManager/CondicionBucalManager';
import { insertSexo, getAllSexo } from '../service/dbManager/SexoManager';
import { getAllEnfermedad, insertEnfermedad } from '../service/dbManager/EnfermedadManager';
import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/dbManager/RevisionOvinoManager';
import { RevisionOvino }  from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service'

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorRevisionOvino {
  constructor() {
    if (!ControladorRevisionOvino.instance) {
      this.revisiones = []; // Array para almacenar los objetos RevisionOvino
      posActual = 0,
      ControladorRevisionOvino.instance = this;
    }
    return ControladorRevisionOvino.instance;
  }


  registrarRevision(sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const sexoValue = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad)
    posActual++,
    console.log(this.revisiones.length);
    if (sexoValue && condicionBucalObjetoValue) {
      const revisionOvino = new RevisionOvino(
        0, // ID autogenerado
        posActual,
        caravana ? caravana : 'No posee', // Si hay caravana, usar el valor ingresado; si no, usar un valor por defecto
        sexoValue,
        condicionCorporal,
        condicionBucalObjetoValue,
        enfermedadValue
      );
      this.revisiones.push(revisionOvino); // Agregar la nueva revisión al array

      // Guardar los datos en la base de datos
      setupDatabase();
      insertRevisionOvino(revisionOvino)
      getAllRevisionOvino();
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
    if (revision) {
      revision.setSexo(sexo);
      revision.setCondicionCorporal(condicionCorporal);
      revision.setCondicionBucal(condicionBucal);
      revision.setEnfermedad(enfermedad);
      revision.setCaravana(caravana);
      updateRevisionOvino(revision);
    }
  }
  obtenerRevisionPorId(id) {
    return this.revisiones.find((revision) => revision.id == id);
}
}

// Asegurar una única instancia
const instanciaControlador = new ControladorRevisionOvino();
Object.freeze(instanciaControlador);

export default instanciaControlador;
