import db from '../db/db-init';
import setupDatabase from '../db/db-config';
import { getAllCondicionBucal, insertCondicionBucal } from '../service/dbManager/CondicionBucalManager';
import { insertSexo, getAllSexo } from '../service/dbManager/SexoManager';
import { getAllEnfermedad, insertEnfermedad } from '../service/dbManager/EnfermedadManager';
import { insertRevisionOvino } from '../service/dbManager/RevisionOvinoManager';
import { RevisionOvino }  from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service'

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorRevisionOvino {
  constructor() {
    if (!ControladorRevisionOvino.instance) {
      this.revisiones = []; // Array para almacenar los objetos RevisionOvino
      ControladorRevisionOvino.instance = this;
    }
    return ControladorRevisionOvino.instance;
  }


  registrarRevision(sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const sexoValue = SexoSingleton.getInstance().getSexoByDescripcion(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalByDescripcion(condicionBucal);
    let enfermedadValue = 0;
    if (EnfermedadSingleton.getInstance().getEnfermedadByDescripcion(enfermedad)) {
      enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadByDescripcion(enfermedad);
    }
    if (sexoValue && condicionBucalObjetoValue) {
      const revisionOvino = new RevisionOvino(
        caravana ? caravana : 'No posee', // Si hay caravana, usar el valor ingresado; si no, usar un valor por defecto
        sexoValue,
        condicionCorporal,
        condicionBucalObjetoValue,
        enfermedadValue
      );
      this.revisiones.push(revisionOvino); // Agregar la nueva revisión al array

      // Guardar los datos en la base de datos
      
      setupDatabase();
      insertCondicionBucal(condicionBucalObjetoValue);
      insertSexo(sexoValue);
      insertEnfermedad(enfermedadValue)
      insertRevisionOvino(revisionOvino);
      getAllCondicionBucal();
    }
  }

  obtenerRevisiones() {
    return this.revisiones;
  }
  
}

// Asegurar una única instancia
const instanciaControlador = new ControladorRevisionOvino();
Object.freeze(instanciaControlador);

export default instanciaControlador;
