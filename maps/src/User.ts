import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

interface Location {
  lat: number;
  lng: number;
}

const color = 'red';

export default color; // not recommended export default in ts. fakat bu kendı export yaptıgımız şeyler için gecerlı 3.partı paketlerde export default yapabilirler. kutuphanelerin dokumantasyonlarına bakarak import edebiliriz.

export class User implements Mappable {
  color: string;
  name: string;
  location: Location; // constructor'dan almadıgımız ıcın burda tanımlamak ıstedım..
  constructor() {
    this.name = faker.person.firstName();
    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    };
  }
  markerContent(): string {
    return `
    <div>
    <h1>User Name: ${this.name}</h1>
    </div>
    `;
  }
}
