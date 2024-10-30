import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/majada';
import { getAllMajada, insertMajada, updateMajada, deleteMajada } from '../service/repository/MajadaRepository';

// Clase que lleva la lógica de como se registran las revisiones de ovinos

class ControladorMajada {
    constructor() {
        if (!ControladorMajada.instance) {
            this.majada = new Majada();
            setupDatabase();
            ControladorMajada.instance = this;
        }
        return ControladorMajada.this;
    }

    registrarMajada(epocaDelAño, estancia) {
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const date = new Date();
        const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");

        if (epocaDelAño && estancia && arrayRevisiones) {
            this.majada.setEpocaDelAño(epocaDelAñoValue)
            this.majada.setEstancia(estancia)
            this.majada.setFecha(fechaActual)

            const idMajada = insertMajada(this.majada)
            this.majada.setIdMajada(idMajada)

            return idMajada;
            
        } else {
            return console.log("No se han registrado todos los datos necesarios")
        }
    }

    consultarMajada(){
        return getAllMajada();
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

    ekiminarMajada(idMajada){
        deleteMajada(idMajada)
    }
}

// Asegurar una única instancia
const instanciaControladorMajada = new ControladorMajada();
Object.freeze(instanciaControladorMajada);

export default instanciaControladorMajada;
