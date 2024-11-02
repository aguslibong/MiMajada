import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/repository/RevisionOvinoRepository';
import { RevisionOvino } from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos
class ControladorRevisionOvino {
  static instance;

  constructor() {
    if (ControladorRevisionOvino.instance) {
      return ControladorRevisionOvino.instance;
    }
    this.revisiones = []; // Array para almacenar los objetos RevisionOvino
    ControladorRevisionOvino.instance = this;
  }

  registrarRevision(idMajada, id, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const sexoValue = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad);
    
    if (sexoValue && condicionBucalObjetoValue) {
      const revisionOvino = new RevisionOvino(
        idMajada,
        0,
        caravana ? caravana : 'No posee',
        sexoValue,
        condicionCorporal,
        condicionBucalObjetoValue,
        enfermedadValue || EnfermedadSingleton.getInstance().getEnfermedadById(1)
      );
      this.revisiones.push(revisionOvino);
      insertRevisionOvino(revisionOvino);
    }
  }

  async consultarRevisiones(idMajada) {
    return await getAllRevisionOvino(idMajada);
  }

  eliminarRevision(id) {
    const index = this.revisiones.findIndex((revision) => revision.id === id);
    if (index !== -1) {
      this.revisiones.splice(index, 1);
      deleteRevisionOvino(id);
    }
  }

  modificarRevision(id, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const revision = this.revisiones.find((revision) => revision.id === id);
    const sexoValue = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad);

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
    return this.revisiones.find((revision) => revision.id === id);
  }
}

// Asegurar una única instancia
const instanciaControlador = new ControladorRevisionOvino();
Object.freeze(instanciaControlador);

export default instanciaControlador;
