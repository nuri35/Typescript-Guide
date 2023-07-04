import { User } from './User';
import { Company } from './Company';
import color from './User';

export class CustomMap {
  private googleMap: google.maps.Map; // diyerek this.googleMap. diye metotlara ulaşamaz.

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addUserMarker(user: User): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    });
  }

  addCompanyMarker(company: Company): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: company.location.lat,
        lng: company.location.lng,
      },
    });
  }
} // ****** THİS İS BAD CODEEEEEEE******* example

// burası ındex.ts'Deydı const map = new google.maps.Map(document.getElementById('map'), mapOptions);
// ********
// burda map. dedıgımızde google harita ile ilgili verılen metotları gorebılrız bu metotları cagırarak
// aslında ızdedıgımız lat, lng'E göre harita uzerınde ıstedıgımız yeri bozabılırız. bu metotlara ulaşmasını engellememiz gerekecektır. başka bır muhendıs geldıgınde map. dıyemıcek ısteıdıgmız harıtadakı yerı bozamayacak.bunun ıcın customMap.ts'E bakalım.

// ****** THİS İS Good CODEEEEEEE*******

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };

  markerContent(): string;
  color: string;
}
export class CustomMapGood {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }
  // FİRST APPROACH but bad approach
  //   addMarker(mappable: User | Company): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: mappable.location.lat,
  //         lng: mappable.location.lng,
  //       },
  //     });
  //   }

  // SECOND APPROACH good approach
  addMarker(mappable: Mappable): void {
    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });
    const { lat, lng } = mappable.location;
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat,
        lng,
      },
    });
    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
