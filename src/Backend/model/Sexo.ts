export class Sexo{
    private descripcion: string;
    private IdSexo: number;

    constructor(IdSexo: number, descripcion: string ) {
        this.descripcion = descripcion;
        this.IdSexo = IdSexo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getIdSexo(): number {
        return this.IdSexo;
    }

    public setIdSexo(IdSexo: number): void {
        this.IdSexo = IdSexo;
    }
}