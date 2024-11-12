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
        try {
            const revisionesData = await this.traerArray(idMajada);
            console.log("Tipo de datos recibidos:", typeof revisionesData);

            // Parsear el JSON si viene como string
            let revisiones;
            if (typeof revisionesData === 'string') {
                revisiones = JSON.parse(revisionesData);
            } else {
                revisiones = revisionesData;
            }

            console.log("Revisiones parseadas:", revisiones);

            if (!Array.isArray(revisiones)) {
                throw new Error('Los datos no son un array después del parsing');
            }

            const cantidadTotalRevisiones = revisiones.length;
            console.log("Cantidad total de revisiones:", cantidadTotalRevisiones);

            const conteoCondicionBucal = new Array(7).fill(0);

            for (const revision of revisiones) {
                const idCondicionBucal = revision.condicionBucal.idCondicionBucal;
                if (idCondicionBucal > 0 && idCondicionBucal <= 7) {
                    conteoCondicionBucal[idCondicionBucal - 1]++;
                }
            }

            console.log("Conteo final:", conteoCondicionBucal);
            return conteoCondicionBucal;

        } catch (error) {
            console.error("Error en calcularPorEdad:", error);
            throw error;
        }
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
        const revisionesData = await this.traerArray(idMajada)
        
        let revisiones;
        if (typeof revisionesData === 'string') {
            revisiones = JSON.parse(revisionesData);
        } else {
            revisiones = revisionesData;
        }

        console.log("Revisiones parseadas:", revisiones);

        if (!Array.isArray(revisiones)) {
            throw new Error('Los datos no son un array después del parsing');
        }

        const cantidadTotalRevisiones = revisiones.length;
        
        console.log("Cantidad total de revisiones:", cantidadTotalRevisiones);
        
        let conteoCondicionCorporal = 0;
        

        revisiones.forEach( r => {
            conteoCondicionCorporal += r.condicionCorporal 
            console.log(conteoCondicionCorporal)
        })
       

        const totalConCorp = conteoCondicionCorporal/cantidadTotalRevisiones;
        
        const majada = getMajadaById(idMajada)
        
        if (majada.idEpocaDelAño = 1 ){
            return [1.2, totalConCorp]
        }
        if (majada.idEpocaDelAño = 2 ){
            return [2.2, totalConCorp]
        }
        if (majada.idEpocaDelAño = 3 ){
            return [3.5, totalConCorp]
        }

    }
    
}

// Asegurar una única instancia
const instanciaControladorDiagnostico = new ControladorDiagnostico();
Object.freeze(instanciaControladorDiagnostico);

export default instanciaControladorDiagnostico;
