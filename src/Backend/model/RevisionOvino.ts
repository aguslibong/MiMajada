import { CondicionBucal } from "./CondicionBucal";
import { Enfermedad } from "./Enfermedad";
import { Sexo } from "./Sexo";

export class RevisionOvino {
  private sexo: Sexo;
  private condicionCorporal: number; 
  private condicionBucal: CondicionBucal;
  private caravana: string;
  private enfermedad: Enfermedad;

  public constructor(caravana: string, sexo: Sexo, condicionCorporal: number, condicionBucal: CondicionBucal, enfermedad: Enfermedad) { 
    this.sexo = sexo;
    this.condicionCorporal = condicionCorporal;
    this.condicionBucal = condicionBucal;
    this.caravana = caravana;
    this.enfermedad = enfermedad
  }

  public getEnfermedad(): Enfermedad {
    return this.enfermedad;
  }

  public setEnfermedad(enfermedad: Enfermedad): void {
    this.enfermedad = enfermedad;
  }

  public getCaravana(): string {
    return this.caravana;
  }

  public setCaravana(caravana: string): void {
    this.caravana = caravana;
  }

  public getSexo(): Sexo {
    return this.sexo;
  }

  public setSexo(sexo: Sexo): void {
    this.sexo = sexo;
  }

  public getCondicionCorporal(): number {
    return this.condicionCorporal;
  }

  public setCondicionCorporal(condicionCorporal: number): void { 
    this.condicionCorporal = condicionCorporal;
  }

  public getCondicionBucal(): CondicionBucal {
    return this.condicionBucal;
  }

  public setCondicionBucal(condicionBucal: CondicionBucal): void {
    this.condicionBucal = condicionBucal;
  }

  public toString(): string {
    return `Sexo: ${this.sexo}, Condicion Corporal: ${this.condicionCorporal}, Condicion Bucal: ${this.condicionBucal}`;
  }

}