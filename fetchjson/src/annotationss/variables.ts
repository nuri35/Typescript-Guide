let ages = 25;

// age = true // error

let nothingMuch: null = null; // null tıpı atamışım nullve undefined degerınden başka birşey atamayız
let nothingMuchas = null; // ama deger olarak sadece null atadıysam any oluyor tip..

let nothing: undefined = undefined; // undefined tıpı atamışım null ve undefined degerınden başka birşey atamayız
let nothingas = undefined; // ama deger olarak sadece undefined atadıysam any oluyor tip..

// built in objects

let now: Date = new Date();
now = new Date('2020-01-01');

let colors: Array<string> = ['red', 'green', 'blue'];

const logNumber = (i: number): void => {
  console.log(i);
};

// classes

class Car {
  car: Car;
  constructor() {
    this.car = new Car();
  }
}

let car: Car = new Car();

/**
 * ? WHEN WE SHOULD USE TYPE İNFERENCE
 * *  TO BE HONEST, ALWAYS (:D)
 * @param args
 * @throws Ecxeption
 */

let apples = 5; // type inference works here type is number

let speed;
speed = 5; //  typescript say that  type is  any
speed = '5'; // type is  any beause we did not initialize it with a value

/**
 
 
 * @param args
 * @throws Ecxeption
 */

/**
 * ? WHEN WE SHOULD USE TYPE ANNOTATIONS (self type adding)
 * * 1) when we declare a variable on one line then initialize it later
 * * 2) when we want a variable to have a type that can't be inferred (inference)
 * * 3) when a function returns the 'any' type and we need to clarify the value
 * @param args
 * @throws Ecxeption
 */

// 1.)
let word: string; // ı want to declare a variable but ı do not want to initialize it now and not declare type annotation then result type is any. so if you want to  initialize it later,  we should add type annotation
word = 'xa';
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}

// 3.)
const json = '{"x":10,"y":20}';
const value = JSON.parse(json);
const coordinates: { x: number; y: number } = value; // this function returns any type so we should add type annotation

// 2.)
let numbers = [-10, -1, 12];
//let numberAboveZero = false; // burda false atamışım. sonra şagıda for ile numbers arrayın cınde bazı degerler atamısım.
let numberAboveZero: number | boolean = false; // ılk başta direk false koydum sorun yok ama aşagıda for dongusu calıstı yanı boolean mı number mı degerler gelecek kkafası karıstı. dolayısıyla   number | boolean tıpı atıyoruz bu durumlardada tiip ataması gereklıdır.
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
