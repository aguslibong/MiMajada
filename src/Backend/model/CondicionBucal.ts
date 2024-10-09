export class CondicionBucal {
    private idCondicionBucal: number;
    private descripcion: string;

    constructor(idCondicionBucal: number, descripcion: string) {
        this.idCondicionBucal = idCondicionBucal;
        this.descripcion = descripcion;
    }

    public getIdCondicionBucal(): number {
        return this.idCondicionBucal;
    }

    public setIdCondicionBucal(idCondicionBucal: number): void {
        this.idCondicionBucal = idCondicionBucal;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }


}