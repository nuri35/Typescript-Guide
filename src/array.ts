const carMakers = []; // wrong approach beacuse type inference is become any[] we do not want this any[] type so we need to add type annotation if you start with an empty array and then add values to it later. you should add type annotation
const carMakers2: string[] = []; // right approach

const carmakers3 = ['ford', 'toyota', 'chevy']; // if you declare and initialize value ınside array at the same time then you do not need to add type annotation

const carsByMake = [['f150'], ['corolla'], ['camaro']];
const carsByMake2: string[][] = []; // if you do not want to add type annotation then you need to initialize value inside array at the same time like this you can avoid type inference add type annotation

// help with type inference when extracting values
const abc = carmakers3[0];
const myCar = carmakers3.pop(); // Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.

// prevent incompatible values
// carmakers3.push(100); // error

// help with 'map'
carmakers3.map((car: string): string => {
  return car.toUpperCase();
});
// when we start with map foreach reduce etc. typescript prodive otomatic completion via car variable parameter. and then type will be string[]. but we want to return string so we need to add type annotation to return value this is string type. but  carmakers3 type is string[]

// flexible types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push('2030-10-10'); // ok
