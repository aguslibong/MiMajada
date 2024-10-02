import { CondicionBucal } from "./CondicionBucal";
import { Sexo } from "./Sexo";

export class RevisionOvino {
  private sexo: Sexo;
  private condicionCorporal: number; 
  private condicionBucal: CondicionBucal;

  constructor(sexo: Sexo, condicionCorporal: number, condicionBucal: CondicionBucal) { 
    this.sexo = sexo;
    this.condicionCorporal = condicionCorporal;
    this.condicionBucal = condicionBucal;
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


}