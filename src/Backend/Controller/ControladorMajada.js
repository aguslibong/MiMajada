import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import instanciaControlador from './ControladorRevisionOvino';
import { Majada } from '../model/majada';
import { insertMajada, obtenerIdMajadaMasGrande } from '../service/repository/MajadaRepository';

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorMajada {
    constructor() {
        if (!ControladorMajada.instance) {
            this.majada = new Majada();
            this.idMajada = obtenerIdMajadaMasGrande() + 1;
            setupDatabase();
            ControladorMajada.instance = this;
        }
        return ControladorMajada.this;
    }


    registrarMajada(epocaDelAño, estancia) {
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const arrayRevisiones = instanciaControlador.obtenerRevisiones();
        const date = new Date();
        const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");

        if (epocaDelAño && estancia && arrayRevisiones) {
            this.majada.setEpocaDelAño(epocaDelAñoValue)
            this.majada.setEstancia(estancia)
            arrayRevisiones.forEach(revision => {
                this.majada.insertRevisionOvino(revision)
                // Guardar los ovinos en la base de datos
                insertRevisionOvino(revision)
            })

            insertMajada(this.majada)

        } else {
            return console.log("No se han registrado todos los datos necesarios")
        }
    }

    registrarObservacion(observacion){
        this.majada.setObservacion(observacion);
    }

    getId(){
        this.idMajada
    }
    
}

// Asegurar una única instancia
const instanciaControladorMajada = new ControladorMajada();
Object.freeze(instanciaControladorMajada);

export default instanciaControladorMajada;
