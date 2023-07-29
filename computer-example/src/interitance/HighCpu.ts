import { Computer } from './Computer';

export class HighEndCPU extends Computer {
  constructor(public model: string, public cores: number) {
    super();
  }

  compute() {
    console.log(`Advanced computing with ${this.model} (${this.cores} cores).`);
  }
}
