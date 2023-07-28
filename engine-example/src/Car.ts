export interface Engine {
  start(): void;
}

export class Car {
  constructor(public engine: Engine) {}

  start() {
    console.log('Car starting...');
    this.engine.start();
  }
}
