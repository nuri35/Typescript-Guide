import { CPU } from './../CpuType';

export class HighEndCPU implements CPU {
  constructor(public model: string, public cores: number) {}

  compute() {
    console.log(`Advanced computing with ${this.model} (${this.cores} cores).`);
  }
}
