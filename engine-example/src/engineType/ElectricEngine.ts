import { Engine } from '../Car';

export class ElectricEngine implements Engine {
  start() {
    console.log('Electric engine started.');
  }
}
