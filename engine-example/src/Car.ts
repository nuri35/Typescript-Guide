interface Engine {
  start(): void;
}

class Car {
  constructor(public engine: Engine) {}

  start() {
    console.log('Car starting...');
    this.engine.start();
  }
}
