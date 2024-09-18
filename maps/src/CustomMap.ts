import { User } from './User';
import { Company } from './Company';
import color from './User';

//!NOT EKLEMEK İSTEDİGİM ŞEY: class'larda genel olarak object composiiton yapıyorsak interface yada inheritance abstract ile metot degısken vsisimler aynı ıcerık farklıdır. ama main class'da bırşey yer alıyor ise hem ısım aynı hemde o işlevın ıcerıgı aynıdır.. fakat hem ısım farklı hem ıcerık farklı ise zaten biribirnden ayı olarak farklı class'lardaki şeylerdir onlar.. bu böyle bir kıstas olarak kalsın..
export class CustomMap {
  private googleMap: google.maps.Map; // diyerek this.googleMap. diye metotlara ulaşamaz.

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    }); //? brn burayı dışarda kulalnırım sonra Marker metotunu cagırım kullanırm hatta başka metotlarda cagırırm başkasıda cagırır this.googleMap degıskenı uzerınden bir suru metot bozabilir. dolayısıyla  this.googleMap ile farklı metotlara erişşmenın sınırnını bu CustomMap class'ı ile birlikte yapıyoruz...ve CustomMap class'ı sayesınde sadece kendımiz class ıcınde metotları yazıyoruz addUserMarker gibi o metotların ıcınde   this.googleMap ıcınde ıstedıgımız metotu cagırıyoruz... böylelikle bir başka developer bu iş ıcın sadece CustomMap'de bızım yazdıgımız metotu cagırıyor ve customrandom map olayı ıcın... böylelikle o kutuphanedekı başka metotları cagıramıyor bızım bu amac için.... cagırdıgı tek şey bızım yazdıgımzı addUserMarker gıbı metotlar oluyor...
  }

  addUserMarker(user: User): void {
    const userMarkContent = (user: User): string => {
      return `
      <div>
        <h1>User Name: ${user.name}</h1>
        
      </div>
    `;
    };
    const infowindow = new google.maps.InfoWindow({
      content: userMarkContent(user),
    });
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    });
  } //  new google.maps.Marker 'ı 2 kere yazdıgımız ıcın kod tekrarı olmus dedık..

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

// burda bir ana class var ve bir interface ile bellı ilgli class'ları birleştirdik.. yani belirli bir yontemın dogru calısması ıcın başka bir nesne alması gerkeıyorsa bu dıger nesne turunu belırtmek yerıne bir interface belırtıyoruz..böylece uygulamamızdakı dıger ensneler bu arayuzu uygulamayı secebılır ve böylece bu sınıfn tanımıyla calısabılırler uygun degılse zaten ts kızmıs olacak.. böyleleıkle mukemmel mıktarda kod ynıden kullanımı ve cok düşük classlar arasında baglantı elde edecegız..
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
//   burda temel olarak edinilen amac şu:
//? birincisi, CustomMapGood ıle  this.googleMap'ı sarmalıoruz ve dışarıya sadece  addMarker metotu verdık bu metot'da sadece marker gorevı goruyor. böylelikle bir class belli bir gorevı yapıyor ve başka developer dışarıdan bunu ımport ettıgınde sadece bızım belırtılen metotu kullanabılıyor ve onun işlevıvını kullanabılır yani boyle bır sınırlamamız var. ayrıca  Mappable interface'i ile başka class'ılarıda baglamıs oluyoruz. yanı marker'Da belkı bır user işaretleyebilrsin belkı campany işaretliyebilrisn. mappable metotuna uyan bu tarz marker edecegın yanı işaretleyecegın class'lar eger mappable'a uyuyor ise metot'dan içeri boru olarak girebiliyor..böylelikle o interface'ın ıstedıgı kuralları addMarker metotu ıcınde kullanabılıyorum. ve Mappable kuralına uyan class'ları ıcerı alabiliyorum. bunlar ne olabilir bır user bır park bır campany olabilir cunku addMarker zaten işaretleme gorevı goren metot ben farklı şeyleri işaretlıyebılrım dolayıısyla farklı class'ları mappable ınterfacine uydugu surece alabılyıorum ıste reusable coding'e ornektir...
