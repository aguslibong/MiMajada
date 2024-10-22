import {Enfermedad} from '../../../model/Enfermedad';

//Clase para asegurar que haya solo estos objetos creados de está manera 
//de Enfermedad

export class EnfermedadSingleton {
    static instance;
    enfermedades;

    constructor() {
        if (!EnfermedadSingleton.instance) {
            this.enfermedades = [
                new Enfermedad(1, 'No posee'),
                new Enfermedad(2, 'Sarna'),
                new Enfermedad(3, 'Infeccion'),
                new Enfermedad(4, 'Garrapata'),
                new Enfermedad(5, 'Otra')
            ];
            EnfermedadSingleton.instance = this;
        }

        return EnfermedadSingleton.instance;
    }

    static getInstance() {
        if (!EnfermedadSingleton.instance) {
            EnfermedadSingleton.instance = new EnfermedadSingleton();
        }
        return EnfermedadSingleton.instance;
    }

    getEnfermedadByDescripcion(descripcion) {
        return this.enfermedades.find(enfermedad => enfermedad.getDescripcion() === descripcion);
    }
}