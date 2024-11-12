export class Majada{
    constructor(idMajada,epocaDelAño,estancia,fechaDeRevision,observacion, finalizado){
        if (epocaDelAño && estancia && fechaDeRevision) {
        this.idMajada = idMajada;
        this.epocaDelAño = epocaDelAño;
        this.estancia = estancia;
        this.fechaDeRevision = fechaDeRevision;
        this.finalizado = finalizado
        this.observacion = observacion;} else {
            this.idMajada = null,
            this.epocaDelAño = null,
            this.estancia = null,
            this.fechaDeRevision = null,
            this.observacion = null,
            this.finalizado = null
        }
    }

    getId(){
        return this.idMajada;
    };

    setId(idMajada){
        this.idMajada = idMajada
    }

    getEpocaDelAño() {
        return this.epocaDelAño;
    }

    setEpocaDelAño(epocaDelAño) {
        this.epocaDelAño = epocaDelAño;
    }

    getEstancia() {
        return this.estancia;
    }

    setEstancia(estancia) {
        this.estancia = estancia;
    }

    getFechaDeRevision() {
        return this.fechaDeRevision;
    }

    setFechaDeRevision(fechaDeRevision) {
        this.fechaDeRevision = fechaDeRevision;
    }

    getObservacion() {
        return this.observacion;
    }

    setObservacion(observacion) {
        this.observacion = observacion;
    }

    getFinalizado(){
        return this.finalizado
    }

    setFinalizado(finalizado){
        this.finalizado = finalizado
    }


    toString() {
        return `Majada {
            idMajada: ${this.idMajada}
            epocaDelAño: ${this.epocaDelAño},
            estancia: ${this.estancia},
            fechaDeRevision: ${this.fechaDeRevision},
            observacion: ${this.observacion},
            RevisionOvino: ${this.RevisionOvino}
        }`;
    }
}