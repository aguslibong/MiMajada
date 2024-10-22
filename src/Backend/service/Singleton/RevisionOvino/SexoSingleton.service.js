import { Sexo } from "../../../model/Sexo";


//Clase para asegurar que haya solo estos objetos creados de está manera 
//de sexos
export class SexoSingleton {
    static instance;
    sexos;

    constructor() {
        if (!SexoSingleton.instance) {
            this.sexos = [
                new Sexo(0, 'Macho'),
                new Sexo(1, 'Hembra'),
            ];
            SexoSingleton.instance = this;
        }

        return SexoSingleton.instance;
    }

    static getInstance() {
        if (!SexoSingleton.instance) {
            SexoSingleton.instance = new SexoSingleton();
        }
        return SexoSingleton.instance;
    }

    getSexoById(id) {
        return this.sexos.find(sexo => sexo.getIdSexo() === id);
    }
}
