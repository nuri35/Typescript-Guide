import { CPU } from './../CpuType';

export class BasicCPU implements CPU {
  constructor(public model: string, public cores: number) {}

  compute() {
    console.log(`Computing with ${this.model} (${this.cores} cores).`);
  }
}
