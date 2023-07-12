import { SorterExtended } from './Sorter';

export class NumbersCollection extends SorterExtended {
  constructor(public data: number[]) {
    super(); // super() is a reference to the constructor of the parent class
    // super 'ı cagırarak parent class'ın constructor'ını çalıştırıyoruz. eger sorter class'ında constructor yoksa bile cagır.
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex] > this.data[rightIndex];
  }

  swap(leftIndex: number, rightIndex: number): void {
    const leftHand = this.data[leftIndex];
    this.data[leftIndex] = this.data[rightIndex];
    this.data[rightIndex] = leftHand;
  }

  get length(): number {
    return this.data.length;
  }
}
