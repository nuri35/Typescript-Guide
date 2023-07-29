import { CPU } from './../CpuType';

export class Computer {
  constructor(public cpu: CPU) {}

  runApplications() {
    console.log('Running applications on the computer:');
    this.cpu.compute();
  }
}
