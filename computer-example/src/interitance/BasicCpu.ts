import { Computer } from './Computer';

export class BasicCPU extends Computer {
  constructor(public model: string, public cores: number) {
    super();
  }

  compute() {
    console.log(`Computing with ${this.model} (${this.cores} cores).`);
  }
}
