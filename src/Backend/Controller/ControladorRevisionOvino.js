import setupDatabase from '../db/db-config';
import { getAllRevisionOvino, insertRevisionOvino, deleteRevisionOvino, updateRevisionOvino } from '../service/repository/RevisionOvinoManagerRepository';
import { RevisionOvino }  from '../model/RevisionOvino';
import { SexoSingleton } from '../service/Singleton/RevisionOvino/SexoSingleton.service';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';
import { EnfermedadSingleton } from '../service/Singleton/RevisionOvino/EnfermedadSingleton.service';
// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorRevisionOvino {
  constructor() {
    if (!ControladorRevisionOvino.instance) {
      this.revisiones = []; // Array para almacenar los objetos RevisionOvino
      ControladorRevisionOvino.instance = this;
    }
    return ControladorRevisionOvino.instance;
  }


  registrarRevision(idMajada, sexo, condicionCorporal, condicionBucal, enfermedad, caravana) {
    const sexoValue = SexoSingleton.getInstance().getSexoById(sexo);
    const condicionBucalObjetoValue = CondicionBucalSingleton.getInstance().getCondicionBucalById(condicionBucal);
    const enfermedadValue = EnfermedadSingleton.getInstance().getEnfermedadById(enfermedad)
    console.log(this.revisiones.length);
    if (sexoValue && condicionBucalObjetoValue) {
      const revisionOvino = new RevisionOvino(
        idMajada, // ID autogenerado
        caravana ? caravana : 'No posee', // Si hay caravana, usar el valor ingresado; si no, usar un valor por defecto
        sexoValue,
        condicionCorporal,
        condicionBucalObjetoValue,
        enfermedadValue ? enfermedadValue : EnfermedadSingleton.getInstance().getEnfermedadById(1) // Si hay enfermedad, usar el valor ingresado; si no, usar un valor por defecto
      );
      this.revisiones.push(revisionOvino); // Agregar la nueva revisión al array

      // Guardar los datos en la base de datos
      insertRevisionOvino(revisionOvino)
    }
  }

  crearRevisionOvino(revisionOvino) {
    if (revisionOvino) {
      const sexo = SexoSingleton.getInstance().getSexoById(revisionOvino.idSexo);
      const condicionBucal = CondicionBucalSingleton.getInstance().getCondicionBucalById(revisionOvino.idConditionBucal);
      const enfermedad = EnfermedadSingleton.getInstance().getEnfermedadById(revisionOvino.idEnfermedad);
      return new RevisionOvino(
        revisionOvino.id,
        revisionOvino.idMajada,
        revisionOvino.caravana,
        sexo,
        revisionOvino.condicionCorporal,
        condicionBucal,
        enfermedad
      );
    }
  }
    
  async obtenerRevisiones(idMajada) {
    if (this.revisiones.length === 0) {
      arrayOvinos = await getAllRevisionOvino(idMajada);
      arrayOvinos.forEach((ovino) => {
        this.revisiones.push(this.crearRevisionOvino(ovino));
      });
    } 
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
const instanciaControlador = new ControladorRevisionOvino();
Object.freeze(instanciaControlador);

export default instanciaControlador;
