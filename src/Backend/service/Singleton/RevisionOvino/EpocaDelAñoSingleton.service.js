import { EpocaDelAño } from "../../../model/EpocaDelAño";

//Clase para asegurar que haya solo estos objetos creados de está manera 
//de Enfermedad

export class EpocaDelAñoSingleton {
    static instance;
    epocasDelAño;

    constructor() {
        if (!EpocaDelAñoSingleton.instance) {
            this.epocasDelAño = [
                new EpocaDelAño(1, 'PreServicio'),
                new EpocaDelAño(2, 'PreParto'),
                new EpocaDelAño(3, 'PosParto'),
<<<<<<< HEAD
                new EpocaDelAño(4, 'Otro')
=======
>>>>>>> Agus
            ];
            EpocaDelAñoSingleton.instance = this;
        }

        return EpocaDelAñoSingleton.instance;
    }

    static getInstance() {
        if (!EpocaDelAñoSingleton.instance) {
            EpocaDelAñoSingleton.instance = new EpocaDelAñoSingleton();
        }
        return EpocaDelAñoSingleton.instance;
    }

<<<<<<< HEAD
    getEpocaDelAñoById(id) {
        return this.epocasDelAño.find(epoca => epoca.getIdEpocaDelAño() == id);
=======
    async getEpocaDelAñoById(id) {
        return await this.epocasDelAño.find(epoca => epoca.getIdEpocaDelAño() == id);
>>>>>>> Agus
    }
}