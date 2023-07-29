import { Machine } from './Computer';

export class BasicCPU extends Machine {
  constructor(public model: string, public cores: number) {
    super();
  }

  compute() {
    console.log(`Computing with ${this.model} (${this.cores} cores).`);
  }
}
