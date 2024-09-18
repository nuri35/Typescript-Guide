class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index];
  }
}
// that is all baddd
// bu array boolen strıng number'da olabilir diyelilım ozaman burda class'da tip kontrolunu generics ile yaparız
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

const arr = new ArrayOfAnything<string>(['a', 'b', 'c']);

// example

function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
printAnything<string>(['a', 'b', 'c']);

// Generic Constraints

class House {
  print() {
    console.log('I am a house');
  }
}

class Carbx {
  print() {
    console.log('I am a car');
  }
}

interface Printable {
  print(): void;
}

function printHouseOrCar<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}

printHouseOrCar<House>([new House()]); // burda House class'ını cagırdık ve House class'ının print fonksiyonunu cagırdık

printHouseOrCar<Printable>([new Carbx()]);

// printHouseOrCar<number>([2]); // burda hata verir
