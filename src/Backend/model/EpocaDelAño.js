export class EpocaDelAño {
    constructor(idEpocaDelAño, descripcion) {
        this.idEpocaDelAño = idEpocaDelAño;
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
