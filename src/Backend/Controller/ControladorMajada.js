import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/Majada.js';
import { getAllMajada, insertMajada, updateMajada, deleteMajada } from '../service/repository/MajadaRepository.js';

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorMajada {
    constructor() {
        if (!ControladorMajada.instance) {
            this.majada = new Majada();
            this.majadas = new Array();
            setupDatabase();
            ControladorMajada.instance = this;
        }
        return ControladorMajada.this;
    }

    registrarMajada(epocaDelAño, estancia) {

        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const date = new Date();
        const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");

        if (epocaDelAño && estancia ) {
            this.majada.setEpocaDelAño(epocaDelAñoValue)
            this.majada.setEstancia(estancia)
            this.majada.setFechaDeRevision(fechaActual)

            const idMajada = insertMajada(this.majada)
            this.majada.setId(idMajada)

            return idMajada;
            
        } else {
            return console.log("No se han registrado todos los datos necesarios")
        }
    }

    obtenerMajada(){
        if(this.majadas.length === 0){ 
            this.majadas = getAllMajada();
        }
        return this.majadas;
    }

    modifificarMajada(id, epocaDelAño, estancia){
        const majada = getAllMajada().find((majada) => majada.idMajada === id);
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);

        if (majada) {
            majada.setEpocaDelAño(epocaDelAñoValue);
            majada.setEstancia(estancia);
            majada.setFecha(fechaActual);
            updateMajada(majada)
        }

    }

    registrarObservacion(observacion){
        this.majada.setObservacion(observacion);
        updateMajada(this.majada)
    }

    eliminarMajada(idMajada){
        deleteMajada(idMajada)
    }
}

// Asegurar una única instancia
const instanciaControlador = new ControladorMajada();
Object.freeze(instanciaControlador);

export default instanciaControlador;
