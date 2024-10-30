export class RevisionOvino {
  constructor(id, caravana, sexo, condicionCorporal, condicionBucal, enfermedad) {
    this.id = id;
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

