import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/Majada.js';
import { getAllMajada, insertMajada, updateMajada, deleteMajada } from '../service/repository/MajadaRepository.js';
import { getAllEpocaDelAño } from '../service/repository/EpocaDelAñoRepository.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

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

    async registrarMajada(estancia, epocaDelAño, observacion) {

        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const date = new Date();
        const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");

        if (epocaDelAño && estancia) {
            this.majada.setEpocaDelAño(epocaDelAñoValue)
            this.majada.setEstancia(estancia)
            this.majada.setFechaDeRevision(fechaActual)
            this.majada.setObservacion(observacion)
            const idMajada = await insertMajada(this.majada)
            this.majada.setId(idMajada)
            getAllEpocaDelAño();
            return idMajada;
            
        } else {
            return console.log("No se han registrado todos los datos necesarios")
        }
    }

    async obtenerMajada() {
            const majadas = await getAllMajada();  // Espera a que la función asíncrona devuelva los datos
            const majadaCreada = majadas.forEach((majada)=>{
                this.majada.push(this.crearMajada(majada));}
            )
        return majadaCreada;
}
    
    crearMajada(majada) {
        if (majada) {
            const epocaDelAño = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(majada.idEpocaDelAño);
            return new Majada(
                majada.idMajada,
                epocaDelAño,
                majada.estancia,
                majada.fechaDeRevision,
                majada.observacion
            );
        }
    }

    modifificarMajada(id, epocaDelAño, estancia){
        this.majada = getAllMajada().find((majada) => majada.idMajada === id);
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);

        if (this.majada) {
            this.majada.setEpocaDelAño(epocaDelAñoValue);
            this.majada.setEstancia(estancia);
            this.majada.setFecha(fechaActual);
            updateMajada(this.majada)
        }

    }

    registrarObservacion(observacion){
        this.majada.setObservacion(observacion);
        updateMajada(this.majada)
    }

    eliminarMajada(idMajada){
        deleteMajada(idMajada)
        this.majadas.splice(this.majadas.findIndex((majada) => majada.idMajada === idMajada), 1);
    }
}

// Asegurar una única instancia
const instanciaControlador = new ControladorMajada();
Object.freeze(instanciaControlador);

export default instanciaControlador;
