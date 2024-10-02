import { Sexo } from "../model/Sexo";

export class SexoService {
    private static instance: SexoService;
    private sexos: Sexo[];

    private constructor() {
        this.sexos = [
            new Sexo(0, 'Macho'),
            new Sexo(1, 'Hembra'),
        ];
    }

    public static getInstance(): SexoService {
        if (!SexoService.instance) {
            SexoService.instance = new SexoService();
        }
        return SexoService.instance;
    }

    public getSexoByDescripcion(id : number): Sexo | undefined {
        return this.sexos.find(sexo => sexo.getIdSexo() === id);
    }
}