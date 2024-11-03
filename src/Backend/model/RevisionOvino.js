import { Majada } from "./Majada";

export class RevisionOvino {
  constructor(majada,id, caravana, sexo, condicionCorporal, condicionBucal, enfermedad) {
    
    this.majada = majada;
    this.id = id
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

  getIdMajada(){
    return this.majada.getId();
  }

  setMajada(majada){
    this.majada = majada
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

