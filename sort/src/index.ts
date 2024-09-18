import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

class SorterBad {
  constructor(public collection: number[] | string) {
    this.collection = collection;
  }
  // this is bad code but good code in sorter.ts
  // burda 50 tane if blogu varkı tıpler ıcın yazmak kotu olurdu kod karısıklıgı olurdu ayrıca if içerisi ffarklı olabilir ama sureklı if if yazarak kendımızı bır nevi tekrar etmiş oluyoruz..
  bubbleSort(): void {
    const { length } = this.collection;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // burda typeguard yaparak instanceof kullanarak yanı gercekten typecript ne oldugunu anlıyor.
        if (this.collection instanceof Array) {
          if (this.collection[j] > this.collection[j + 1]) {
            const leftHand = this.collection[j];
            this.collection[j] = this.collection[j + 1];
            this.collection[j + 1] = leftHand;

            // typescript knows that this.collection is a number[]
            // if you do not use instanceof  control  you will get an error by typescript
            // because     this.collection[j] = this.collection[j + 1]; burdaki atamayı sadece arraylerde yapabilcegını typescript bilir. onun ıcın hata verir. dolayıslya instanceof ile kontrol ederiz. typescript'e soylerız bu if'in içindeki algoritma sadece array için gecerli diye. onuda  this.collection instanceof Array ile soyleriz.(this.collection instanceof Array dıyerek type guard yaptık.) böylelıkle  this.collection[j] = this.collection[j + 1]; kısım adece array'De calıstıgın bıldıgı ıcın  bızde type guard yaptıgımız ıcın typescrıpt hata vermez. type guard yaparak cunku bu  if içindekıler array ınstance olunca calıssın dıyoruz. bu yuzden typescript hata vermez.
          }
        }
        if (typeof this.collection === 'string') {
          // write code
        }

        // if (this.collection instanceof LinkedList) {
        //   // write code
        // }
      }
    }
  }
}
//***** */ bu sekılde cagırmak ıstemıyoruz yanı  const numbersCollection = new NumbersCollection([10, 3, -5, 0]); dedık bunun ınstance'ını  new Sorter dıyerek parametre  olarak eklemek ıstemıyoruz. daha sonra  const sorter = new Sorter(numbersCollection); dıyıp sorter.bublesort() demekde ıstemıyoruz onun yerıne   const numbersCollection = new NumbersCollection([10, 3, -5, 0]);  numbersCollection.bubleSorter() demek istyirouz. dolayısıyla extends Sorter edecegız.

// const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
// const charactersCollection = new CharactersCollection('Xaayb');
// const linkedList = new LinkedList();
// linkedList.add(500);
// linkedList.add(-10);
// linkedList.add(-3);
// linkedList.add(4);

// const sorter = new Sorter(numbersCollection);
// const sorter2 = new Sorter(charactersCollection);
// const sorter3 = new Sorter(linkedList);
// sorter3.bubbleSort();
// linkedList.print();
// sorter.bubbleSort();
// sorter2.bubbleSort();

// correct
//!eger gerçekten biz new diyerek cagırmak ıstemıyorusak sorter class'ımızı ozaman ıcerısınde static metot ile yaparız bir çok ornegımız var.. fakat biz interface yada inheritance mı hangısıne daha yatkın dıye ayırt ettıgımız noktada inheritance kullanmaya karar verdiysek bunun ıcın bazi şeyleri kafamızdan geçirdik. ozman inheritance kullanırız. dolaylı yoldan bırdaha new Sortable diye birşey başlatmamış olruuz ....

const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
numbersCollection.bubbleSort();
console.log(numbersCollection.data);
