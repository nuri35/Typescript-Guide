import { Sorter } from './Sorter';
import { NumbersCollection } from './NumbersCollection';

class SorterBad {
  constructor(public collection: number[] | string) {
    this.collection = collection;
  }
  // this is bad code but good code in sorter.ts
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
          // code
        }
      }
    }
  }
}

const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
const sorter = new Sorter(numbersCollection);
sorter.bubbleSort();
