let tuple: [string, number, boolean];
tuple = ['hello', 10, true];
// tuple[0] = 10; // error
tuple[0] = 'hassaas'; // ok
// tuple[1] = 'hello'; // error
tuple[1] = 11; // ok
// tuple[2] = 'hello'; // error
// tuple[3] = 'hello'; // error

// tuple'larda turu dırek satıra eklemek yerıne yukardakı gıbı. onun yerıne alternativ bir şey yapcagız.
// type alias

const pepsi2 = ['brown', true, 40]; // this is pepsi2: (string | number | boolean)[] type type inference. böyle yaparsak bu type tahmını olarak tip arraydir.

type Drink = [string, boolean, number];
const pepsi: Drink = ['brown', true, 40]; // good
const sprite: Drink = ['clear', true, 40]; // good
const tea: Drink = ['brown', false, 0]; // good

// Why won't we use it very often

const carSpecs: [number, number] = [400, 3354];
// Well, if we use a tuple to represent some meaningful data, it's really hard for you and I as engineers to look at this value right here and understand what we are trying to say.

//  mesela obje olsaydı keylerden dolayı daha anlaşılır olurdu 400 ve 3354 neyi temsil ediyor anlamak zor.
// dolaysıyla bir kydı modellemek ıcın bir nesne kullandıgımızda daha anlaşılır olur. dolayısıyla genel olarak bir kaydı modellemek yada uygulamamızda kaydetmek ısteıdıgmızde tuple kullanmayız. yerıne bir nesneye ulaşmaya yonelık bir js kuralına baglı kalcaz.

//we not use tuple but sometimes use tuple and give example on applications later....
