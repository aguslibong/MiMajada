export class Sexo {
    constructor(IdSexo, descripcion) {
        this.descripcion = descripcion;
        this.IdSexo = IdSexo;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }

    getIdSexo() {
        return this.IdSexo;
    }

    setIdSexo(IdSexo) {
        this.IdSexo = IdSexo;
    }
}
