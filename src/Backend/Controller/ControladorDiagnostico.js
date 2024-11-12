import setupDatabase from '../db/db-config';
import { EpocaDelAñoSingleton } from '../service/Singleton/RevisionOvino/EpocaDelAñoSingleton.service';
import { Majada } from '../model/Majada';
import { deleteMajada, getAllMajada, getMajadaById, insertMajada, obtenerIdMajadaMasGrande, updateMajada } from '../service/repository/MajadaRepository';
import { getAllRevisionOvino } from '../service/repository/RevisionOvinoRepository';
import { CondicionBucalSingleton } from '../service/Singleton/RevisionOvino/CondicionBucalSingleton.service';

// Clase que lleva la lógica de cómo se registran las revisiones de ovinos

class ControladorDiagnostico {
    static instance;

    constructor() {
        if (ControladorDiagnostico.instance) {
            return ControladorDiagnostico.instance;
        }
        ControladorDiagnostico.instance = this;
    }

    async calcularPorEdad(idMajada) {
        const revisiones = await this.traerArray(idMajada)
        console.log("lista en controlador :" + revisiones)
        const cantidadTotalRevisiones = revisiones.length();
        const length = CondicionBucalSingleton.getInstance().length();
        const conteoCondicionBucal = Array(length).fill(0);
        for(const revision of revisiones){
            conteoCondicionBucal[revision.getCondicionBucal().getIdCondicionBucal() - 1] = conteoCondicionBucal[revision.getCondicionBucal().getIdCondicionBucal() - 1] + 1;
        }
        return (conteoCondicionBucal)
    }

    async traerArray(idMajada){
        return await getAllRevisionOvino(idMajada)
    }

    async calcularPorCondicionBucalPorEdades(idMajada) {
        const revisiones = await this.traerArray(idMajada);
        const lengthRow = CondicionBucalSingleton.getInstance().length();
        const filas = 10; // 5 filas para los intervalos de 1.0 a 5.0 y 1 extra para totales.
        const columnas = lengthRow; // Número de columnas basado en condiciones bucales (1 a 7).
        const matrizCondicionBucalPorEdades = Array.from({ length: filas }, () => Array(columnas).fill(0));
    
        for (const revision of revisiones) {
            const { idCondicionBucal, condicionCorporal } = revision;
    
            // Calcula el índice de columna basado en idCondicionBucal
            const columnaIndex = idCondicionBucal - 1;
    
            // Calcula el índice de fila basado en condicionCorporal
            const filaIndex = (condicionCorporal * 2) - 2;
    
            // Verifica que los índices estén dentro de los límites de la matriz
            if (columnaIndex >= 0 && columnaIndex < columnas && filaIndex >= 0 && filaIndex < filas - 1) {
                matrizCondicionBucalPorEdades[filaIndex][columnaIndex] += 1;
                matrizCondicionBucalPorEdades[filas - 1][columnaIndex] += 1; // Suma al total de la columna
            }
        }
    
        console.log(matrizCondicionBucalPorEdades);
        //Como filas tiene la condición corporal y como columnas la condición bucal
        return matrizCondicionBucalPorEdades;
    }

    async condicionCorporalTotal(idMajada){
        const revisiones = this.traerArray(idMajada)
        const cantidadTotalRevisiones = revisiones.length();
        const conteoCondicionCorporal = 0;
        for(const revision of revisiones){
            conteoCondicionCorporal += revision.condicionCorporal 
        }
        const totalConCorp = conteoCondicionCorporal/cantidadTotalRevisiones;
        const majada = getMajadaById(idMajada)
        if (majada.idEpocaDelAño = 1 ){
            return [totalConCorp, 1.2]
        }
        if (majada.idEpocaDelAño = 2 ){
            return [totalConCorp, 2.2]
        }
        if (majada.idEpocaDelAño = 3 ){
            return [totalConCorp, 3.5]
        }

    }
    
}

// Asegurar una única instancia
const instanciaControladorDiagnostico = new ControladorDiagnostico();
Object.freeze(instanciaControladorDiagnostico);

export default instanciaControladorDiagnostico;
