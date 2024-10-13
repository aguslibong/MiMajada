export class Enfermedad {
    constructor(idEnfermedad, descripcion) {
        this.idEnfermedad = idEnfermedad;
        this.descripcion = descripcion;
    }

    getIdEnfermedad() {
        return this.idEnfermedad;
    }

    setIdEnfermedad(idEnfermedad) {
        this.idEnfermedad = idEnfermedad;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
}
