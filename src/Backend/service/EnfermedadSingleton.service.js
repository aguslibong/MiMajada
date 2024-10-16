import {Enfermedad} from '../model/Enfermedad';

export class EnfermedadSingleton {
    static instance;
    enfermedades;

    constructor() {
        if (!EnfermedadSingleton.instance) {
            this.enfermedades = [
                new Enfermedad(0, 'No posee'),
                new Enfermedad(1, 'Sarna'),
                new Enfermedad(2, 'Infeccion'),
                new Enfermedad(3, 'Garrapata'),
                new Enfermedad(4, 'Otra')
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