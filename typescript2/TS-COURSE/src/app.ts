interface Gettable {
  name: string;
  age: number;
  greet(phrase: string): void;
}
// bu interface yerıne type, type yerınede interface degıstrıebılrzı
type Persons = {
  name: string;
  age: number;
  greet(phrase: string): void;
}; //ornek amaıyla yazıldı.. fakat type ile interface arasında bazi farklılıklar vardır..
//arayüzler sadece bir nesnenın yapısını tanımlamak ıcın kullanılırken, typelar her tür veri türünü tanımlamak ıcın  (bunun ıcın type kullanarakda nesne tanımlayabilrisn) kullanılabilir. interface ile daha acık şekilde ibr nesne tanımladıgını belırtırsın acık dunyada interface daha fazla kullanılır.
//!!sımdı arayuzlerle yapabilcegınız ancak yanlnızca custom type'larla yapabilcegınız bir başka şeyde bir interface bir sınıfta uygulayabilmenizdir. yanı interface'le calısmanızın nedeni bir interfacein bır sınıfın uygulayabilcegı ve bir sınfın daha sonra uygması gereken bir sozleşme olarak kullanabılmesidir. aşagıda ornekle anlatalım..

let user1: Gettable;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
  //   abc:1 fazla birşey koydunmu deıgsken atamasında ama kızar ılgınc burda sadece fazladan koyunca kızıyor.
};

//*** örnek ile. */
// implements Person dıyerek person interface'indekıerın hepsının olmasını ıstıyor fazlası olsada olur ama bu 3 tanesı oalcak
class Person implements Gettable {
  // implements Gettable ile Person interface'indekilerin hepsinin olmasını istiyoruz. bu bıraz abstrac class'larla calısmaya benzer abstract diyerek extend edilen class'larda abstract keywordu kullandıgmız şeylerin olmasını ıstıyoruz ya onu cagrıştıryor. ornegın burda implements Gettable diyerek Person interface'indekilerin olmasını istiyoruz. daha sonra bunu bir gettable interface kuralını bekleyen class'a gatekeeper olarak aktarabilriz e burda bunları zorunlu kıldıgımız ıcınde oradan gecmede sorun olmayacaktır. borudan gececektır... bir ek bilgi interface'ın ıcınde sadece vermek ıstedıgın kural vardır. ama abstrack class'ında abstract keyword ile vermek istedigin zorunlu kural ok fakat ayrıca ondan bagımsız metotlarda vardır
  name: string;
  age: number;
  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }

  test() {
    console.log('test');
  } // fazladan ama kızmaz..
}

// person impelments ederek onu bellı ınterface kuralına uydurduk..

user1 = new Person('Max', 30); // dedıgımde  user1 tip olarak Gettable olmalıdır dedıgı ıcın Person class'ı Gettable'ı implement ettıgı ıcın sorun olmadan calısır.

//! interface as function types

interface AddFn {
  (a: number, b: number): number; // bır ornegın greet ısımde fonskıyondegılde anonım bir fonksıyon tanımlayabılırsın

  // testvalue: number; // burda testvalue diye bir değişken tanımlayamazsın. çünkü interface içinde sadece fonksiyon tanımlayabilirsin. yanı bu ınterface boyle fonksıyon tanımlarsan bı ınterffacei bir fonksıyon turu olarak tnaımlar. custom type alternetifidir. ornegın.. type AddFn = (a: number, b: number) => number; ıle aynıdır.
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
