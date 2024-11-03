import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/Majada';
import { deleteMajada, getAllMajada, insertMajada, obtenerIdMajadaMasGrande, updateMajada } from '../service/repository/MajadaRepository';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos

class ControladorMajada {
    static instance;

    constructor() {
        if (ControladorMajada.instance) {
            
            return ControladorMajada.instance;
        }
        this.majada = new Majada();
        ControladorMajada.instance = this;
    }


    getFechaActual(){
        const date = new Date()

        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    registrarMajada(epocaDelAño, estancia, observacion) {
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const fechaActual = this.getFechaActual();

        if (epocaDelAño && estancia) {
            this.majada.setEpocaDelAño(epocaDelAñoValue);
            this.majada.setEstancia(estancia);
            this.majada.setFechaDeRevision(fechaActual);
            this.majada.setObservacion(observacion)
            const idMajada = insertMajada(this.majada);
            return idMajada;
        } else {
            console.log("No se han registrado todos los datos necesarios");
            return null;
        }
    }

    async obtenerMajada() {
        return await getAllMajada();
    }

    async modificarMajada(id, epocaDelAño, estancia, observacion){
        return await updateMajada(id, epocaDelAño, estancia, observacion)
    }
    async eliminarMajada(idMajada){
        deleteMajada(idMajada)
    }
}

// Asegurar una única instancia
const instanciaControladorMajada = new ControladorMajada();
Object.freeze(instanciaControladorMajada);

export default instanciaControladorMajada;
