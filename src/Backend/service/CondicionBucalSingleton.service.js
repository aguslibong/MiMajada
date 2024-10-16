import { CondicionBucal } from "../model/CondicionBucal";
export class CondicionBucalSingleton {
    static instance;
    condicionesBucales;

    constructor() {
        if (!CondicionBucalSingleton.instance) {
            this.condicionesBucales = [
                new CondicionBucal(1, 'ddl'),
                new CondicionBucal(2, '2d'),
                new CondicionBucal(3, '4d'),
                new CondicionBucal(4, '6d'),
                new CondicionBucal(5, 'bll'),
                new CondicionBucal(6, 'md'),
                new CondicionBucal(7, 'sd')
            ];
            CondicionBucalSingleton.instance = this;
        }

        return CondicionBucalSingleton.instance;
    }

    static getInstance() {
        if (!CondicionBucalSingleton.instance) {
            CondicionBucalSingleton.instance = new CondicionBucalSingleton();
        }
        return CondicionBucalSingleton.instance;
    }

    getCondicionBucalByDescripcion(descripcion) {
        return this.condicionesBucales.find(condicion => condicion.getDescripcion() === descripcion);
    }
}
