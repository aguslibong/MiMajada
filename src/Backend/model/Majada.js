export class Majada{
    constructor(){};
    
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

    getRevisionOvino() {
        return this.RevisionOvino;
    }

    insertRevisionOvino(revisionOvino) {
        this.RevisionOvino.push(revisionOvino);
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