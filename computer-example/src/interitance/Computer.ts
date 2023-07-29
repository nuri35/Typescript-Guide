export abstract class Machine {
  abstract compute(): void;
  runApplications() {
    console.log('Running applications on the computer:');
    this.compute();
  }
}
