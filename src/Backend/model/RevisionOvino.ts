class RevisionOvino {
    private sexo: Sexo;
    private condicionCorporal: String;
    private condicionBucal: String;

    public RevisionOvino(sexo, condicionBucal, condicionCorporal): void {
      this.sexo = sexo;
      this.condicionBucal = condicionBucal;
      this.condicionCorporal = condicionCorporal;
    }


    // Getter and Setter for 'sexo'
    getSexo(): Sexo {
      return this.sexo;
    }
    setSexo(sexo) {
      this.sexo = sexo;
    }

    // Getter and Setter for 'condicionCorporal'
    getCondicionCorporal() {
      return this.condicionCorporal;
    }

    setCondicionCorporal(condicionCorporal) {
      this.condicionCorporal = condicionCorporal;
    }

    // Getter and Setter for 'condicionBucal'
    getCondicionBucal() {
      return this.condicionBucal;
    }

    setCondicionBucal(condicionBucal) {
      this.condicionBucal = condicionBucal;
    }

}