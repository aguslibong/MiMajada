export class EpocaDelAño {
    constructor(idEnfermedad, descripcion) {
        this.idEpocaDelAño = idEnfermedad;
        this.descripcion = descripcion;
    }

    getIdEpocaDelAño() {
        return this.idEpocaDelAño;
    }

    setIdEpocaDelAño(idEpocaDelAño) {
        this.idEpocaDelAño = idEpocaDelAño;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
}
