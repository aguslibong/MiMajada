import { Sexo } from "../model/Sexo";

export class SexoService {
    static instance;
    sexos;

    constructor() {
        if (!SexoService.instance) {
            this.sexos = [
                new Sexo(0, 'Macho'),
                new Sexo(1, 'Hembra'),
            ];
            SexoService.instance = this;
        }

        return SexoService.instance;
    }

    static getInstance() {
        if (!SexoService.instance) {
            SexoService.instance = new SexoService();
        }
        return SexoService.instance;
    }

    getSexoByDescripcion(id) {
        return this.sexos.find(sexo => sexo.getIdSexo() === id);
    }
}
