import { CondicionBucal } from "./CondicionBucal";
import { Enfermedad } from "./Enfermedad";
import { Sexo } from "./Sexo";
import * as RevisionOvinoManager from "../service/repository/RevisionOvinoManagerRepository";

export class RevisionOvino {
  constructor(id,nroRevision, caravana, sexo, condicionCorporal, condicionBucal, enfermedad) {
    this.id = id;
    this.nroRevision = nroRevision;
    this.sexo = sexo;
    this.condicionCorporal = condicionCorporal;
    this.condicionBucal = condicionBucal;
    this.caravana = caravana;
    this.enfermedad = enfermedad;
  }

 getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNroRevision() {
    return this.nroRevision;
  }

  setNroRevision(nroRevision) {
    this.nroRevision = nroRevision;
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

  delete(){
    this.RevisionOvino = null;
  }


}

