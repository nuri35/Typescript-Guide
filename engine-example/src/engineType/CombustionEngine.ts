import { Engine } from '../Car';

export class CombustionEngine implements Engine {
  start() {
    console.log('Combustion engine started.');
  }
}
