export class Majada{
    constructor(id,epocaDelAño,estancia,fechaDeRevision,observacion){
    
        if (epocaDelAño && estancia && fechaDeRevision) {this.id = id;
        this.epocaDelAño = epocaDelAño;
        this.estancia = estancia;
        this.fechaDeRevision = fechaDeRevision;
        this.observacion = observacion;} else {
            this.id = null,
            this.epocaDelAño = null,
            this.estancia = null,
            this.fechaDeRevision = null,
            this.observacion = null
        }
    }

    getId(){
        return this.id;
    };

    setId(id){
        this.id = id
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


    toString() {
        return `Majada {
            epocaDelAño: ${this.epocaDelAño},
            estancia: ${this.estancia},
            fechaDeRevision: ${this.fechaDeRevision},
            observacion: ${this.observacion},
            RevisionOvino: ${this.RevisionOvino}
        }`;
    }
}