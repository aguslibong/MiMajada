import db from '../db/db-config';
import { RevisionOvino } from '../model/RevisionOvino';
import { SexoSingleton } from '../service/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/EnfermedadSingleton.service'

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
    let enfermedadValue = null;
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
      db.setupDatabase();
      db.insertConditionBucal(condicionBucalObjetoValue);
      db.insertSexo(sexoValue);
      db.insertRevisionOvino(revisionOvino);
      db.getAllRevisionOvino();
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
