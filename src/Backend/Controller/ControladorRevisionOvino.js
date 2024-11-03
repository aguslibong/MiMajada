import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/repository/RevisionOvinoRepository';
import { RevisionOvino } from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service';
import { getMajadaById } from '../service/repository/MajadaRepository';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos
class ControladorRevisionOvino {
  static instance;

  constructor() {
    if (ControladorRevisionOvino.instance) {
      return ControladorRevisionOvino.instance;
    }
    ControladorRevisionOvino.instance = this;
  }

  registrarRevision(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const sexoObjeto = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjeto = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadObjeto = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad);
    const majadaObjeto = getMajadaById(idMajada)

    if (sexoObjeto && condicionBucalObjeto) {
      const revisionOvino = new RevisionOvino(
        majadaObjeto,
        0,
        caravana ? caravana : 'No posee',
        sexoObjeto,
        condicionCorporal,
        condicionBucalObjeto,
        enfermedadObjeto || EnfermedadSingleton.getInstance().getEnfermedadById(1)
      );
      this.revisiones.push(revisionOvino);
      insertRevisionOvino(revisionOvino);
    }
  }

  async obtenerRevisiones(idMajada) {
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
    const sexoObjeto = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoObjeto = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadObjeto = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad);

    if (revision) {
      revision.setSexo(sexoObjeto);
      revision.setCondicionCorporal(condicionCorporal);
      revision.setCondicionBucal(condicionBucalObjetoObjeto);
      revision.setEnfermedad(enfermedadObjeto);
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
