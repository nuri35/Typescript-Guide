const add = (a: number, b: number): number => {
  // typpe annotation for return value => : number

  return a + b;
}; // correct recommended way

//  no ttype  inference for  arguuuments
const add2 = (a: number, b: number) => {
  // typpe inferrence for return value => : number

  return a + b;
}; // this approach is not recommended because maybe we forget to add return and not added type annotations  for example just write a+b function is void now  but want to return number thise is problem
// if we add type annotation for return value, typescript will warn us typescript say that  return value is void but we want to return number

// yyes ttype  inference for  arguuuments
const add3 = (a, b) => {
  // typpe inferrence for return value => : anny

  return a + b;
}; // just a example do not confuse your mind

function divide(a: number, b: number): number {
  // typpe annotation for return value => : number

  return a / b;
}

function multiply(a: number, b: number): number {
  // typpe annotation for return value => : number

  return a * b;
}

const logger = (message: string): void => {
  console.log(message); // ok
  // return undefined;
  // return null ok
};

const example = (message: string) => {
  return null;
}; // any type

const throwError = (message: string): never => {
  throw new Error(message);
}; // never type always use throw error or infinite loop or something like that.

// this function is acceptable we use throw error like this
const throwNewError = (message: string): string => {
  if (!message) {
    throw new Error(message);
  }
  return message;
}; // If you want to guarantee that the comments will never complete normally and will always throw errors, you can specify the return type of the function as never.

const throwNewError2 = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
  console.log(message);
  return undefined;
}; // void tyype

const throwNewError4 = (message: string) => {
  if (!message) {
    throw new Error(message);
  }
  console.log(message);
  return undefined;
}; // any tyype

const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};
logWeather(todaysWeather);

// ES2015 DESTURCTURING PARAMETER
const logWeather2 = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
