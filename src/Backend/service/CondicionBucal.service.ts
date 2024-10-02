import { CondicionBucal } from "../model/CondicionBucal";

export class CondicionBucalService {
    private static instance: CondicionBucalService;
    private condicionesBucales: CondicionBucal[];

    private constructor() {
        this.condicionesBucales = [
            new CondicionBucal(1, 'ddl'),
            new CondicionBucal(2, '2d'),
            new CondicionBucal(3, '4d'),
            new CondicionBucal(4, '6d'),
            new CondicionBucal(5, 'bll'),
            new CondicionBucal(6, 'md'),
            new CondicionBucal(7, 'sd')
        ];
    }

    public static getInstance(): CondicionBucalService {
        if (!CondicionBucalService.instance) {
            CondicionBucalService.instance = new CondicionBucalService();
        }
        return CondicionBucalService.instance;
    }

    public getCondicionBucalByDescripcion(descripcion: string): CondicionBucal | undefined {
        return this.condicionesBucales.find(condicion => condicion.getDescripcion() === descripcion);
    }
}
