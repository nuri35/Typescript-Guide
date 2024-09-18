// import { User } from './models/User';
import { User } from './refactor-coding/models/option2/User'; // refactorıng

// const user = new User({ name: 'myname', age: 20 , id:1});
// user.set({ name: 'newname' });
// //
// user.get<'name'>('name');
// user.get('age');

// user.on('change', () => {
//   console.log('change #1');
// });
// user.trigger('change'); // fetchden oncede bir mesaj vermek adına bunu yapıyoruz..

// user.fetch(); //id 1 kişili kişyi cekecek...

// setTimeout(() => {
//   console.log(user);
// }, 4000);

// user.set({ name: 'new name', age: 999 }); userpropsu el ile guncelledık istersen user.save ilede db tarafında guncelleyebilirsin.

// refectoring *************** coding ***************
// 176.derse kadar refactor  edildi kod.... sımdı cagımra zamanı..
//***CAĞIRMA */
const user = new User({ name: 'new record', age: 0 });
//user.attributes.data data prvate durumda oldugu ıcn ulaşamazsın zaten

user.event.on('change', () => {
  console.log('change #1');
});
user.event.trigger('change');
const valueDb = user.sync.save({ name: 'new name', age: 999 }).then((res) => {
  user.attributes.set(res.data); // burda res.data yapmamızın sebebi res.data'da name ve age var ve biz bunları set metotu ıle set edebiliriz.. tekrardan userProps'umuzu guncellemek ıstedık sadece aynı degerdır zaten..
});

//***CAĞIRMA */

// ve sonuc olarak böyle işte cagırmış oluyoruz.. bu yenıden refactor edılmış bu surumu böyle cagırmakta tamamen baş belası ugrastırıcı ama onceden mesela user.save yaparak kolayca yapardık yukarda ....
// kullanıcı sınıfnımızı bu uc ayrı alt module ayırmış olup bunları user class'a composition yapsakda kullanılabilirlik acısından hala yapmamız gereken biraz iş oldugu acıktır.. yanı user classında hardcoded yazılmıs bu alt class'lara dırek ulaşmak ıstemeyeız...*******

//! şu cok onemli: dırek sınıf kullanıcıınsa ulaşmasını ve dogrudan sycn metotuna ulaşmasını gercekten ıstmeıyoruz... yada dırek attributes'lere ulaşmasını ıstemıyoruz. ve yukarda user.attributes veya user.sync gibi diyerek işte sync'e yada attributes modulune ulaşmaya calıstıgımız buradaki gibi yukardaki gibi koda sahip olmak  delegasyonu uygulamaya calısıyorsak o kadr iyi degıldır.
// delegasyonla ilgili fikir user sınıfmızın hala tum bu aynı ozellıklere veya tum bu aynı yontemlere sahıp olacagı ve caller diye x bir metot bu yontemleri(yamo get set  fetch save gibi yontemleri) cagıracagıdır.. mesela caller dıye x bır metot save yontemını cagıracak ve bu yontemın ıcınde user sınıfmız bazi davranısları gercekten uygulamk ıcın bu farklı alt modullerı kullanacaktır. yanı burdakı delegasyon kısmı şuanda mevcut uygulamamızın ıcınde eksık olan kısımdır..
// bir ornek daha vermek gerkırse.... user yaada başka class ıcerısınde get metotumuz var dıyelım caller metot uzerınden get yontemı cagrıldıgında bu temelde sınıf nitelikleri üzeirndenki get yontemıne dogrudan bir gecıs olacaktır. bu basıt olacak orneklerıyle anlatacagız.

// öncesınde bazi tatlı temel soz dızımlerınden bahsedelim..

//! a quick reminder on accessors
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
const person = new Person('stephen', 'curry');
// console.log(person.fullName()); // stephen curry bu kod yuzde yuz calısıyor sorun yok. ama burda bır fonksıyon cagırmak zorunda kalmamak ıcın fullname getter setter ozellıgı ekleyecegız. eger bır fonksıyon olsaydı developer dusunebılırdı ya bu metot cagıgrarak bır duzeznleme birleştirme var gibi dusunebılırdı. aama getter ozellıgı ile bır degısıklık yok gibi sankı bır ozellıge erişiyormusuz gıbı gorunur. person ornegımız hakkında bır şeyi degıstırmemız gerekmez.
//! sımdı bu yukardakı hızlı hatırlatmadan sonra user class'da olacak farklı yontemlerı  get set on gibi metotları usere class uzeırnden yenıdne uygulamaya başşayacagız. bunu yapmak ıcın get accessors kullanacagız onun ıcın ornek vermek ıstedım..

//1: ilk once user.ts de refactor edılen kodda accessor kullanmadan  nasıl yapacagımızı anlatacagız.. user.ts de on get gibi metotlar olacak ve bu metotlar user class'ında olacak ve bu metotlarda ılgılı alt class'lardakı on trigget met gibi metotları cagıracak..
//!user.tsden bakabilrsin.
