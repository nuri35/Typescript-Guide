// this is car example for composition
import { ElectricEngine } from './engineType/ElectricEngine';
import { Car } from './Car';

const electricEngine = new ElectricEngine();
const car = new Car(electricEngine);
car.start();
