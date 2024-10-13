import { CondicionBucal } from "./CondicionBucal";
import { Enfermedad } from "./Enfermedad";
import { Sexo } from "./Sexo";

export class RevisionOvino {
  constructor(caravana, sexo, condicionCorporal, condicionBucal, enfermedad) {
    this.sexo = sexo;
    this.condicionCorporal = condicionCorporal;
    this.condicionBucal = condicionBucal;
    this.caravana = caravana;
    this.enfermedad = enfermedad;
  }

  getEnfermedad() {
    return this.enfermedad;
  }

  setEnfermedad(enfermedad) {
    this.enfermedad = enfermedad;
  }

  getCaravana() {
    return this.caravana;
  }

  setCaravana(caravana) {
    this.caravana = caravana;
  }

  getSexo() {
    return this.sexo;
  }

  setSexo(sexo) {
    this.sexo = sexo;
  }

  getCondicionCorporal() {
    return this.condicionCorporal;
  }

  setCondicionCorporal(condicionCorporal) {
    this.condicionCorporal = condicionCorporal;
  }

  getCondicionBucal() {
    return this.condicionBucal;
  }

  setCondicionBucal(condicionBucal) {
    this.condicionBucal = condicionBucal;
  }

  toString() {
    return `Sexo: ${this.sexo}, Condicion Corporal: ${this.condicionCorporal}, Condicion Bucal: ${this.condicionBucal}`;
  }
}

