import { CPU } from './../CpuType';

export class Machine {
  constructor(public cpu: CPU) {}

  runApplications() {
    console.log('Running applications on the computer:');
    this.cpu.compute();
  }
}
