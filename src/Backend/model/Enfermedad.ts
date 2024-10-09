export class Enfermedad {
    private idEnfermedad: number;
    private descripcion: string;

    constructor(idEnfermedad: number, descripcion: string) {
        this.idEnfermedad = idEnfermedad;
        this.descripcion = descripcion;
    }

    public getIdEnfermedad(): number {
        return this.idEnfermedad;
    }

    public setIdEnfermedad(idEnfermedad: number): void {
        this.idEnfermedad = idEnfermedad;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
}