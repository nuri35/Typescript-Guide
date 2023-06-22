let age = 25;

// age = true // error

let nothingMuch = null;

let nothing: undefined = undefined;

// built in objects

let now: Date = new Date();
now = new Date('2020-01-01');

let colors: Array<string> = ['red', 'green', 'blue'];

const logNumber: (i: number) => void = (i: number): void => {
  console.log(i);
};

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
 * !  yanı bır alt satıra gectıgımız ıcın her şey gelebılır dıye dusunuyor any oluyor tipi eger bız bunu ılk satırda bir sayı ile eşitlersek ıntıtıalıze edersek number oluyor yanı type inference calısıyor tahmın edıyor typescript tipi ama alt satırda eşitlersek bir degere maalesef any tipi oluyor
 
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
//let numberAboveZero = false; // we  can't be inferred
let numberAboveZero: number | boolean = false;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
