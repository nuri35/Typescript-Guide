import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

//! bunları new dıyerek cagrıdında zaten tek başına cagırsanda rastgele company user felan olusturur ıcerıısnde boylelıkle bır company nesnesı felan olusturur bunları bılıyoruz..
export class Company implements Mappable {
  color: string;
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    };
  }
  markerContent(): string {
    return `
    <div>
    <h1>Company Name: ${this.companyName}</h1>
    <h3>Catchphrase: ${this.catchPhrase}</h3>
    </div>
    `;
  }
}
