import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/Majada';
import { getAllMajada, insertMajada, obtenerIdMajadaMasGrande } from '../service/repository/MajadaRepository';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos

class ControladorMajada {
    static instance;

    constructor() {
        if (ControladorMajada.instance) {
            return ControladorMajada.instance;
        }
        this.majada = new Majada();
        setupDatabase();
        ControladorMajada.instance = this;
    }

    registrarMajada(epocaDelAño, estancia) {
        const epocaDelAñoValue = EpocaDelAñoSingleton.getInstance().getEpocaDelAñoById(epocaDelAño);
        const date = new Date();
        const fechaActual = date.toISOString().slice(0, 19).replace("T", " ");

        if (epocaDelAño && estancia) {
            this.majada.setEpocaDelAño(epocaDelAñoValue);
            this.majada.setEstancia(estancia);
            this.majada.setFechaDeRevision(fechaActual);
            const idMajada = insertMajada(this.majada);

            return idMajada;
        } else {
            console.log("No se han registrado todos los datos necesarios");
            return null;
        }
    }

    async obtenerMajada() {
<<<<<<< HEAD
            const majadas = await getAllMajada();  // Espera a que la función asíncrona devuelva los datos
            const majadaCreada = majadas.forEach((majada)=>{
                majada.push(this.crearMajada(majada));}
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
=======
        return await getAllMajada();
>>>>>>> cafeeeab5820e4d6522a2d178d8733fe0897e885
    }

    registrarObservacion(observacion) {
        this.majada.setObservacion(observacion);
    }

    getId() {
        return this.idMajada;
    }
}

// Asegurar una única instancia
const instanciaControladorMajada = new ControladorMajada();
Object.freeze(instanciaControladorMajada);

export default instanciaControladorMajada;
