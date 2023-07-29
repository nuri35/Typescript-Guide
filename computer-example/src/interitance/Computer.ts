export abstract class Computer {
  abstract compute(): void;
  runApplications() {
    console.log('Running applications on the computer:');
    this.compute();
  }
}
