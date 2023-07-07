import { NumbersCollection } from './NumbersCollection';

export class Sorter {
  constructor(public collection: NumbersCollection) {
    this.collection = collection;
  }

  bubbleSort(): void {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1);
          }
        
      }
    }
  }
}

// yarın devam et vıdeodan ızleyerek anlamaya calıs en son good code yapısını kendın uzerındne gecerek cıkarım
// yaparsın
