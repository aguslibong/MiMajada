import { RevisionOvino } from "../../../model/RevisionOvino";

class RevisionOvinoService {
    constructor() {
        this.revisionesOvinos = [];
    }

    agregarRevisionOvino(RO) {
        // Aquí puedes agregar la lógica para agregar una revisión ovina
        this.revisionesOvinos.push(RO);
    }
}

export default RevisionOvinoService;
