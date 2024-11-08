import { CondicionBucal } from "../../../model/CondicionBucal";

//Clase para asegurar que haya solo estos objetos creados de está manera 
//de Condición Bucal
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

    getCondicionBucalById(id) {
        return this.condicionesBucales.find(condicion => condicion.getIdCondicionBucal() == id);
    }
}
