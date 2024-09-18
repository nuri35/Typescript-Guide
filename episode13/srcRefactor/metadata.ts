// ılk once ts.config dosyasına "emitDecoratorMetadata": true ekleyecegiz ayrıca experimentalDecorators: true ekleyecegiz. sonra reflect-metadata npm indir.

import 'reflect-metadata'; // sonra ımport ettik..

// sımdı ımport ettıkten sonra bu metaveri bilgilerini nasıl kullanacagımızı gösteren bir örnek yapacagız...sımdı ımport ettıgımızde otomatık olarak global kapsama tek bir degısken ekler..

// en dıkkat cekmek ıstedıgım husus  Rflect.defineMetadata dır.

// Reflect.defineMetadata bu fonksıyon bir nesneye vveeya bir nesnenın bır ozellıgıne metaveri eklememize ve meta veri almamıza olanak tanır. tahmin edebilcegınız gibi bir nesneden veya ozellıkten meta veri almamızada lanak tanır

//***  */ örnek
//TODO KAL 15 DE GEL..
const plane = {
  color: 'red',
}; // sımdı bu nesneyle bazı meta verileri ilişkilendirmek istiyorum..

// sımdı note adında bir metaveri ozellıgını bu nesneyle ılıskılendırecegım ve bunun degerını basitce merhaba olarak yazacagım

Reflect.defineMetadata('note', 'hi there', plane); // bu fonksıyon 3 parametre alır. 1. metaveri adı, 2. metaveri degeri, 3. metaveri ilişkilendirecegimiz nesne. yanı bunun perde arkasıdna  plane nesnesine hi degerıne sahip yenı bir note ozellıgı eklemek gibi hayal edebilriz. ancak bu hic bir zaman hata ayıklayıcıda veya benzeri birşeyde gorunmuyecektır... nesneye baktıgında sende gormeyeceksın..
Reflect.defineMetadata('hight', 10, plane); // plane nesnesıne bir cok metadata atayabilriz.

console.log(plane); //output'da { color: 'red' } gorunecektır hıc o note olayını gormedım bildigin uzere.

// ama bir nesneden meta veri almak ıcın reflect.getMetadata fonksıyonunu kullanabiliriz.

const note = Reflect.getMetadata('note', plane); // bu fonksıyon 2 parametre alır. 1. metaveri adı, 2. metaveri ilişkilendirecegimiz nesne. bu fonksıyonu kullanarak plane nesnesınden note metaveri degerını alabılırız.
console.log(note); // output'ta hi there gorunecektır.

//! yanı buradakı asıl ders metaverilerin bir nesneye kucuk bilgi parcaları eklememize izin vermesidir. ayrıca bu meta veri ogesını bır nesne uzerındekı bır ozellıge bılgı eklemek ıcınde kullanabilriz. yanı plane nesnesınde color ozellıgıne ozel bilgiler ekleyebilriz yani

Reflect.defineMetadata('note', 'hi there', plane, 'color'); // bu fonksıyon 4 parametre alır. 1. metaveri adı, 2. metaveri degeri, 3. metaveri ilişkilendirecegimiz nesne, 4. parametre olur ise 4.parametre metaveri ilişkilendirecegimiz nesnenin ozellıgı. yanı burada plane nesnesınde color ozellıgıne note metaveri degerını eklemıs olduk.

//! sımdı artık typescript sınıflarının etrafındakı bu meta verilerle nasıl çalışacagımızı görelim.

// O HALDE  şimdi bir dececerator ve metaddatayı bırlıkte kullanarak bazi metada ozellklerını anında metoda koymayı deneyelım.. decerator kullandıgımız ıcın mecbur class plane diye bir class yaptımm ....

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('HI THERE') // buraya farklı degerler koyabılıyoruz
  fly(): void {
    console.log('vrrrrrr');
  }
}

function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  }; //defineMetadata 3.parametresi hangi class'a metaveri ekleyecegını belırtır. biz burda target'ı console yazzddırdıgımızda output olarak {[fly:function]} gibi birşey cıkardı o nesne ve o nesnenın ıcındekı metotları barındırıyor işte  o nesnenın prototyp'ı oldugunu bılıyoruz yanı target diye belirtebilriz. 4.parametre ise ilgili class'ın ıcındekı metot'a yada bazi özelliklere metaveri ekleyebildıgımızden bizded fly metotuna eklıyoruz aslında bukadar...
} // sımdı plane prototpindeki fly özelliginin bulunduugu fly yontemıne bakacak ve secret adında bir meta veri tanımlayacak ve degerıde secretINfo olacak.

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly'); // secret metaveri ozellıgını plane prototpınden almaya calısacagız.. 3.parametreye dıkkat et..  3. metaveri ilişkilendirecegimiz nesnenin ozellıgı.
console.log(secret); // output'ta HI THERE gorunecektır. ('HI THERE') burdakı deger deceratordakı deger..

// bu sekılde bır sınıfn ıcındekı bir yonteme bılgı ekleme konusunda iyi bir iş cıkadıgımızı dusunuyorum..

// 2.farklı decerator işlevi tanımayacagım.. bu farklı olacak. bu deceratoru sınıfın kendısıne uygulamak istiyorum... direk plane class'ına olacak yani..

function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    // target.prototype zaten arraydır. for ile gezıyoruz... ornek amacıyla..
    // key ornegın fly
    // setlemıyoruz dırek class ustunde bır deceratorda getmetadatayı kullanıyoruz kucuk meteverileri alıyoruz.
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    //3.paremetre olarak koydugumuzda yanı fly metotunda bir metaveri var demek onu alıyoruz..
    console.log(secret); // output HI THERE yanı markFunction metotunda defineMetada yapmıstık o degerı alıyoruz cok guzel..
  }
  // for dongumuz prototipin tum farklı anahtarları arasında iterable yapacak ilk key anahtarımız fly olacak ornegın.. daha sonra Reflect.getMetadata kısmı calısacak. target prototpinden meta verileri almaya bakacagız. unutma class ustunde yapılan decerator en son calısır. yani burada secret metaveri ozellıgını plane prototpınden almaya calısacagız.. anahtar olarak 3.parametre gececegız. metaverilerimizi almaya calsıtımgız mulk fly olacak.. plane class'ındakı metotlardan metaverileri almıs oluyoruz..
}

// sımdı bu mantıkda bızım controller @use gibi deceratorlar ıcın kullancagız. srcrefactor/loginRoutes.ts'e bkabılrız.
