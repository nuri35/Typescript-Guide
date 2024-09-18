// generic ile ilgili ekstra şeyler buraya yazılacka..

//örnek

type GetFirstElement = <T>(arr: T[]) => T;

const getFirstElement: GetFirstElement = (arr) => {
  return arr[0];
}; // BURDA <T>(arr:T[]) BUNA GEREK YOK YANI  CUNKU GetFirstElement dıye tip atıyoruz.

const result = getFirstElement<number>([1, 2, 3]);

console.log(result);

//
type HasLength = {
  length: number;
};

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

const len = logLength([1, 2, 3]);
// neden hata vermıyor cunku T o an numberArray oluyor ve numberArrayın length propertysi vardır.
// string de olurdu çünkü stringin de length propertysi vardır. yanı logLength<number[]> dedik ve T oan number[] oldu. ve dusun T bir obje olup lenght property aramıoyoruz otomatık number arraylerinde length propertysi oldugu ıcın hata vermedı. T o an number tipi vs başka tipler olabilir yeterkı o T tipi  extends HasLength olsun yani o haslenght'dekı ozellıklerı bunyesınde barındırsın ıstıyor..

const abc: number[] = [1, 2, 3];
abc.length; // 3 işte ornek

//!const objTest = logLength({ abc: 10 }); // hata verir çünkü objenin length propertysi yoktur.
const objTest = logLength({ length: 10 }); // hata vermez çünkü objenin length propertysi vardır. objelerın kendı proptery'sinde yoktur ama obje ıcıne key olarak bızverdık bunuda böyle duusn..

//----

// type karsısıdna obje diyorsak yanı KeyValuePair obje tipinde yani... interfacelerdekı gbi onlara tanımlarken generictype atayabilriz..
type KeyValuePair<K, V> = { key: K; value: V };

interface KeyValuePairs<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<number, string> = { key: 1, value: 'first' };
const pair2: KeyValuePairs<number, string> = { key: 2, value: 'second' };

//-----

type Events = {
  id: number;
  name: string;
  date: Date;
  type: 'public' | 'private';
};

type UnionOfKeysEvents = keyof Events; // 'id' | 'name' | 'date' | 'type'

//let idOfEvent: UnionOfKeysEvents = 'sasasa'; // hata verir çünkü sasasa yoktur. yanı strıng tipinde sadece id name date type olabilir. = karsısında

let idOfEvent: UnionOfKeysEvents = 'name';

//-- generic example loving

const filter = <T>(arr: T[], cb: (item: T) => boolean): T[] => {
  const filteredArr: T[] = [];

  arr.forEach((item) => {
    if (cb(item)) {
      filteredArr.push(item);
    }
  });

  return filteredArr;
};

const names = ['John', 'Mary', 'Ann', 'Jane'];
const filteredNames = filter(names, (name) => name.length > 3);

//-- generic example2 loving

const map = <T, R>(arr: T[], cb: (item: T) => R): R[] => {
  const mappedArr: R[] = [];

  arr.forEach((item) => {
    mappedArr.push(cb(item));
  });

  return mappedArr;
};

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = map(numbers, (number) => number * 2);

// herşey ok ders 76 dayız..
