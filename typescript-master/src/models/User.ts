import axios, { AxiosResponse } from 'axios';

//TODONOT: 2 TUR class olacak model classes ve view classes... model sınıfı bazi verileri işlemeye yarayan herhangi bir sınıf olacak.. dolayısılya blog gondelerileri veya users veya resimler veya yorumlar yada bunun gibi herhangi bir şey gibi kaynakları veya uygulamamızın ıcındekı şeyleri temsıl etmek ıcın model sınıflarını kullanacagız...
//!view class ıse html uretmekten ve bu htmlyi kullanıcya gosteremkten sorumlu olacak. ayrıca tıklama yazma yada enter gibi olaylarıda ele almaktan sorumlu olacak

// yaklaşımımız şu sekılde olacak ilk once
//!: buyuk bir user class yapacagız ve ıcerısını ıstedıgımız metotları yazacagız. ama sımdılık sadece user class'ımızda olacak.
//! sonra user class'ımızı refactor edecegız... composiiton kullanarak ıcerısındekı metotları class'lara ayıracagız
//! sonra user class'ı sadece bır user degıl bır blogpost bır ımage bır comment gibi her şeyi temsil etmek ıcın kullanabilcegımız bir cok yenıdnen kullanılabilir bır sınıf olacak şekilde yenıden duzenleyecegız.

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void; // hıc bır arguman almayan ve bır sey dondurmeyen

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get<K extends keyof UserProps>(key: K): UserProps[K] {
    return this.data[key];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    // this.events[eventName]   2 olası degere sahıp olabılır. 1. undefined 2. Callback[].
    // user create edıldıgınde  this.events boş bir nesnemiz aslında. dolayısıyla callback kaydetmeyi dusunmeye basladıgımızda on metotu yanı bu metot ıcıersınde dikkate almamız gereken 2 durum vardır.
    // user ilk create edildiginde buradakı kod satırnın undefined olması garanti edilir. ancak bu metot fonksıoyna gercek eventler eklemeye basladıgımızda sonunda bu keyler'den bazıları bize bir calback function  vrebilir. temelde her ıkı durumuda uygun sekılde ele almamız gerekıyor.
    // dolayısıyla ılk yapacagımız şey şu:

    const handlers = this.events[eventName] || [];

    // user create edildilkten sonra bize muhtemelen  this.events[eventName]'bunun undefined verecek. || operatoru yani Lojik Veya Operatörü ile  eğer this.events[eventName] undefined degılse onu kullancak yani değer olarak [calback] birşey kullanır. eğer undefined ise boş bir array kullanacak. böylelikle hardık handlers her iki durumdada undefind yada undefined degılse bile Callback[] tipinde bir array olacak.
    handlers.push(callback); // bu satırda da callback'ı handlers'a ekliyoruz.
    this.events[eventName] = handlers; // bu satırda da this.events[eventName]'e handlers'ı atıyoruz.
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback(); // artık sectıgımız evente göre callback trigger olcak
    });
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get<'id'>('id')}`)
      .then((response: AxiosResponse) => {
        this.set(response.data);
      });
  }

  save(): void {
    if (this.get('id')) {
      axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
  //! ornegın save ve fetch sekronize olarak adlandıralım kafadan. bu sefer bu sekronize için apiden ceken degilde busefer başka yerden çeken istek atan bir şey olaiblirde fetch2 ve save2 metotlarımız olurdu böyle böyle burdakı metotlar karışır..... uzar gider. onun ıcın örnegın sekronize diye ayrı class yaparım sekronize2 diye ayrı class olur ... ve user class'ımıza composiiton ile gelir.. işlem görür.. en basitinden..
}

//daha sonra  burda user class'ımızda bın ton metot yazdık. new user dıyerek caagırdıktan sonra bu metotlarımızı kullanabılıyoruz. index.ts de en başta user uzerınden metotlarıda cagırdık vs... sımdı bunları refactor edecegız... daha sonra bu class'ada ısım verecegız sımdılık user olarak kurguladıgımızı dusun.... burdakı konumuz bır data vercen onu setlıyor sonra onu apiye save edıyor vs oldugu ıcın class'a rastgele user dedık sorun degıl... burdakı metotları da dıger ornekler gıbı ayrı ayrı metotlara ayırcagız ornegın save fetch metot ıcın ayrı sync class olcak syc classdan farklı apisync vs tabi olabilir buraya bırleşecek vs.... ve composiiton kullanarak user classımızı reusable coding yapmıs oluyoruz. ama user bızı kesmezkı sadece dıyoruz belkı blogpost belkı comment class olacak dıyoruz.. sonra dıcezkı bunu user ıcın yapıyoruz ama genel model yapalım bu user class'ı yanı tamamen ıhtıyaca ve o ankı duruma göre bunları dusunuyoruz..
