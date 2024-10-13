import { CondicionBucal } from "../model/CondicionBucal";
export class CondicionBucalService {
    static instance;
    condicionesBucales;

    constructor() {
        if (!CondicionBucalService.instance) {
            this.condicionesBucales = [
                new CondicionBucal(1, 'ddl'),
                new CondicionBucal(2, '2d'),
                new CondicionBucal(3, '4d'),
                new CondicionBucal(4, '6d'),
                new CondicionBucal(5, 'bll'),
                new CondicionBucal(6, 'md'),
                new CondicionBucal(7, 'sd')
            ];
            CondicionBucalService.instance = this;
        }

        return CondicionBucalService.instance;
    }

    static getInstance() {
        if (!CondicionBucalService.instance) {
            CondicionBucalService.instance = new CondicionBucalService();
        }
        return CondicionBucalService.instance;
    }

    getCondicionBucalByDescripcion(descripcion) {
        return this.condicionesBucales.find(condicion => condicion.getDescripcion() === descripcion);
    }
}
