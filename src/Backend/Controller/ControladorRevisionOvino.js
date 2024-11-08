import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/repository/RevisionOvinoRepository';
import { RevisionOvino } from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service';
import { getMajadaById } from '../service/repository/MajadaRepository';
import { Sexo } from '../model/Sexo';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos
class ControladorRevisionOvino {
  static instance;
  sexoSingleton = SexoSingleton.getInstance();
  condicionBucalSingleton = CondicionBucalSingleton.getInstance();
  enfermedadSingleton = EnfermedadSingleton.getInstance();

  constructor() {
    if (ControladorRevisionOvino.instance) {
      return ControladorRevisionOvino.instance;
    }
    ControladorRevisionOvino.instance = this;
  }

  async registrarRevision(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
      const revisionOvino = await this.crearOvinoDeClaseAEntidad(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana)
      await insertRevisionOvino(revisionOvino);
    }


  async crearOvinoDeClaseAEntidad(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana){
    const sexoObjeto = this.sexoSingleton.getSexoById(sexo);
    const condicionBucalObjeto = this.condicionBucalSingleton.getCondicionBucalById(condicionBucal);
    const enfermedadObjeto = this.enfermedadSingleton.getEnfermedadById(enfermedad);
    const majadaObjeto = await getMajadaById(idMajada)
    if (sexoObjeto && condicionBucalObjeto) {
      return new RevisionOvino(
        majadaObjeto,
        0,
        sexoObjeto,
        condicionCorporal,
        condicionBucalObjeto,
        caravana ? caravana : 'No posee',
        enfermedadObjeto || EnfermedadSingleton.getInstance().getEnfermedadById(1)
      );}
    
    return ;
  }

  async obtenerRevisiones(idMajada) {
    return await getAllRevisionOvino(idMajada)
  }

  async eliminarRevision(id) {
      await deleteRevisionOvino(id);
  }

  async modificarRevision(id, idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const revision = await this.crearOvinoDeClaseAEntidad(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana)
    revision.setId(id)
    if (revision) {
      await updateRevisionOvino(revision);
    }
  }

}

// Asegurar una única instancia
const instanciaControlador = new ControladorRevisionOvino();
Object.freeze(instanciaControlador);

export default instanciaControlador;
