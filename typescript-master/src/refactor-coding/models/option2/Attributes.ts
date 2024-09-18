import { UserProps } from '../../../models/User';

// sync gibi ayrı class'a aldık ve generic kullandık....
export class Attributess<T extends object> {
  constructor(private data: T) {}

  get(propName: string): number | string | boolean {
    return this.data[propName];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
// geenrıc olarak T ye UserProps olacagını soyledık data'da onun tıpınden oldu
const attr = new Attributess<UserProps>({ id: 5, name: 'ali', age: 20 });
// buraya kadar okey.
const name = attr.get('name'); // get kullandıgımızda bize bazi sorunlar oluşturuyor buna dair bir çözüm yapmamız gerekiyor. zaten başlıca sorunlara sebeb oluyor. ama dusnun  böyle oldu degısken name: string | number | boolean birinden biri ama ben name key'ini atarak onun string turunde oldugunu bılıyorum yanı const name:String olmalı bırdaha bu sefer name as string demem lazım typescriptde buda bir sorun   yoksa  const name: string | number | boolean seklınde donguu ıcın bunlardan biridir gıbı goruyor.

//!  bunun ıcın bır cozum bulacagız...  cozumu ise generic kullanmak..

//  ama cozum bulmadan once 2 şey anlatacagız 173.dersde anlatılyıor bu 2 şeyi...

//??1111 sımdı biz type alias ekleyebilrdik type diyerek yanı onceden ne yapmıstık
type matchData = [Date, string, number, boolean, string]; // gibi matchData adında bir tipimiz olmus oluyor. yanı aslında type alias yapmıs oluyoruz.. = dıyerek de ıstedıgımız tıpı olusturabılırız. bu yaptıgımız ornegın bır = dıyıp tuple ekledık.
type BestName = 'stephen'; // type ile type alias olusturduk bestname adında bir tipim oldu. taiblide = eşittir diyerek sen ıstedıgıni yazabilrsin. fakat unutma karsı tarafında BestName'ın strıng koyduk ama bunu bir yere tip ataması yaparsan string ama ıcersıınde stephen yazacak bir string bekler artık unutma bunu.... böyle bir typealis olusturduysak. yanı 'stephen' diyip bunu type alias ıcın yapabilriz. type alias kullanırken = eşittir diyerek sag kısmında stringleri kullanaibrliz yani..

type BestMatchData = {
  date: Date;
  match: string;
  odds: number;
  win: boolean;
  team: string;
}; // böyle type aliasda olsturabılrız yanı  BestMatchData adında bır tıpim var. bu tip tam olarka ne oldgunu belırtmek ıcınde = 'tring sag tarafına yazıyorsun...

//??2222  2.ci soyleyecegımız son sey ise
// gerçekte tüm nesne anahtarları stringdir yanı objelerin key'lerini düşünürsek onlar bir stringdir bılıyoruz bunu... aslında bunun bir sayı oldugnu dusunsenız bile o bir string keydir.. ornek vermek gerekırse
const colors = { 5: 'red', red: 'red' }; // bunların key'leri hep stringdir.. javascript key'i stringe cevırır arka planda öyle düşün.. yanı colors[5] yada colors['5'] seklınde alabilriz. onun ıcın ornegın key'leri bilmiyorsak tahmın edemıyorsak şöyle tip ataması yapıyorduk [key:string]:any; gibi  vb tıp atamaları görmüştük.. typescript'Dede keyleri string olarak düşüünürüz.

//! bu 2 yaklaşımı dusunurek hareket ettgımızdde bir nesne uzerınde veya bir nesnenın anahtarlarınında aslında bir tür olabilcegını söyler dolayısıyla aşagıda  keyof T yaparak onuda tur olarak kullanabilriz. dolayısyla k parametrede soyle tip oluyor K: 'name' vs seklınde doalyısyla sende get 'i cagırken 'name' degerı veresınkı tip hatası olmasın..kızmasın.

export class Attributes<T extends object> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }; // user.ts'de acıklaması var neden arrow functıon kullandıgımızın..

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
const attrsax = new Attributes<UserProps>({ id: 5, name: 'ali', age: 20 });
const value = attrsax.get<'name'>('name'); // key: K key: 'name' gibi oluyor yanı  type BestName = 'stephen';  mantıgı oluyor string olcak ama deger olarak name diyor tip olarak ynıa. dolayıslya get parametresinde  'name' yazdık. işte K extends keyof T mantıgıda key'ler string olaarak kabul ettigimiz için keyof T diyerek  o objesının keylerinden birini get<'name'> string sekılde koyduruyoruz buda parametre de tip atamaısnda key: 'name' seklınde bır tur beklıyor ve paramatreye bunu koydugumuzda bunu  this.data['name']; böyle yapmıs olacaktır.....metot ıcerısınde...
