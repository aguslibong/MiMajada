export class CondicionBucal {
    constructor(idCondicionBucal, descripcion) {
        this.idCondicionBucal = idCondicionBucal;
        this.descripcion = descripcion;
    }

    getIdCondicionBucal() {
        return this.idCondicionBucal;
    }

    setIdCondicionBucal(idCondicionBucal) {
        this.idCondicionBucal = idCondicionBucal;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
}
