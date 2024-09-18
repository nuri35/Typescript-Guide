//liskov substitution principle
// bir alt sınıfın, üst sınıfın yerine kullanılabilmesini gerektirir. Bu, alt sınıfın üst sınıfın sunduğu davranışı değiştirmeden genişletmesi gerektiği anlamına gelir.

//!örnek

// Bir ulaşım aracı sistemini düşünelim. Temel sınıfımız TransportationDevice olsun ve bu sınıfın bir getMaxSpeed (maksimum hız) metodu ve bir move (hareket) metodu olsun. Alt sınıflar olarak da Car (Araba) ve Bicycle (Bisiklet) sınıflarını oluşturacağız.

abstract class TransportationDevice {
  abstract getMaxSpeed(): number;
  abstract move(): string;
  abstract fly(): string; // Tüm ulaşım araçlarının uçmasını bekliyoruz
}

class CarZ extends TransportationDevice {
  public getMaxSpeed(): number {
    return 200;
  }

  public move(): string {
    return 'Araba hareket ediyor';
  }

  public fly(): string {
    throw new Error('Bir araba uçamaz!'); // Bu LSP'yi ihlal eder
  }
}

class Bicycle extends TransportationDevice {
  public getMaxSpeed(): number {
    return 25; // Bisikletin maksimum hızı
  }

  public move(): string {
    return 'Bisiklet sürülüyor'; // Bisikleti sür
  }

  public fly(): string {
    throw new Error('Bir bisiklet uçamaz!'); // Bu LSP'yi ihlal eder
  }
}

class Airplane extends TransportationDevice {
  public getMaxSpeed(): number {
    return 900;
  }

  public move(): string {
    return 'Uçak pistte hareket ediyor';
  }

  public fly(): string {
    return 'Uçak uçuyor';
  }
} // buna koyabılrız..

// ====== Client Code
function testTransportation(device: TransportationDevice) {
  console.log(device.move());
  console.log(`Maksimum hız: ${device.getMaxSpeed()} km/h`);
}

let car = new CarZ();
let bicycle = new Bicycle();

testTransportation(car); // Araba hareket ediyor, Maksimum hız: 200 km/h
testTransportation(bicycle); // Bisiklet sürülüyor, Maksimum hız: 25 km/h

//** */ Detaylı Açıklama
// Temel Sınıf (TransportationDevice):

// Bu, genel bir ulaşım aracını temsil eder. getMaxSpeed ve move gibi iki soyut metot içerir.
// Bu metodlar, her ulaşım aracının kendi maksimum hızını ve hareket şeklini belirtebileceği şekilde tasarlanmıştır.
// Alt Sınıflar (Car ve Bicycle):

// Car ve Bicycle, TransportationDevice sınıfını genişletir.
// Car sınıfı, arabanın maksimum hızını 200 km/h olarak belirler ve hareket ederken "Araba hareket ediyor" mesajını döndürür.
// Bicycle sınıfı, bisikletin maksimum hızını 25 km/h olarak belirler ve hareket ederken "Bisiklet sürülüyor" mesajını döndürür.

//! LSP'nin Uygulanması:

// testTransportation fonksiyonu, bir TransportationDevice nesnesini alır  tip olarak kullanırz ve onun move ve getMaxSpeed metodlarını çağırır.
// Bu fonksiyon hem Car hem de Bicycle nesneleri ile çalışabilir ve her ikisini de TransportationDevice tipiyle aynı şekilde işler.
// Bu, Liskov Değiştirme Prensibi'ne uyar. Yani, Car ve Bicycle nesneleri, TransportationDevice tipinin kullanıldığı her yerde sorunsuzca kullanılabilir.

// LSP, kodun genişletilebilir ve bakımı kolay olmasını sağlar.
// Alt sınıflar, üst sınıfın beklenen davranışını bozmadığı sürece, mevcut kodu değiştirmeden yeni türler ekleyebiliriz.
// Bu, programın esnekliğini ve yeniden kullanılabilirliğini artırır.

//**LSP'ye Uygun Olmayan Bir Durum */
//  Ancak Liskov Değiştirme Prensibi'nin ihlali, sınıfların nasıl tanımlandığı ve beklenen davranışların tutarlı bir şekilde uygulanıp uygulanmadığı ile ilgilidir
// (LSP), alt sınıfların, üst sınıfların yerine kullanılabileceğini garanti etmelidir. Bu, alt sınıfların üst sınıfların beklenen davranışlarını bozmadan genişletmesi gerektiği anlamına gelir. fly örneğinde, LSP'nin ihlal edilmesi, üst sınıfın belirttiği davranışların alt sınıflar tarafından tam olarak karşılanmaması durumudur. yanı ornegın  TransportationDevice'a abstract fly():number da yazsak bunu bu sefer car class'ındada yazmak durumundayız ama car class'ında fly() metodu olmamalıdır. Bu durumda LSP ihlal edilmiş olur.

// Üst sınıf TransportationDevice sınıfında bir fly metodu ekleyerek, tüm ulaşım araçlarının uçabilmesini bekliyoruz. Yani, bir TransportationDevice nesnesi üzerinde fly metodu çağrıldığında, bu nesnenin gerçekten uçabilmesi gerekiyor.
// Ancak Car sınıfı, uçamaz. Bu nedenle, Car sınıfı, TransportationDevice sınıfının sunduğu davranışı genişletmez ve uygunsuz bir şekilde uygular. aslında car class'ına fly metotu eklersın ve calıstırısn ama  TransportationDevice yanı toplu taşıma aracı sınıfında fly metodu olmamalıdır. Bu durumda LSP ihlal edilmiş olur. olursada Car sınıfı, fly metodunu uygulayabilir, ancak gerçek dünyada bir araba uçamaz. Bu durumda, Car sınıfı bu metodu uygulasa bile mantıksal olarak doğru bir davranış göstermeyecektir. Yani, bu beklenen davranışı (uçmayı) tam olarak karşılamaz.

// Bir yerde TransportationDevice tipinde bir nesne kullanıyorsak ve bu nesne uçma yeteneğine sahip değilse, programın belirli bölümlerinde hatalara veya beklenmedik davranışlara yol açabiliriz.
// LSP, bir üst sınıfın alt sınıfı tarafından genişletilirken, alt sınıfın üst sınıfın sunduğu tüm davranışları tutarlı ve anlamlı bir şekilde desteklemesini gerektirir.

// Bu durumda, fly metodunun her ulaşım aracı için anlamlı olmadığını gördük. Bu gibi durumlarda, farklı davranışlar sergileyen nesneleri daha doğru bir şekilde temsil etmek için ayrı sınıflar ve arayüzler kullanmak iyi bir yaklaşım olabilir.

abstract class FlyingTransportationDevice extends TransportationDevice {
  abstract fly(): string;
}

class AirplaneR extends FlyingTransportationDevice {
  public getMaxSpeed(): number {
    return 900;
  }

  public move(): string {
    return 'Uçak pistte hareket ediyor';
  }

  public fly(): string {
    return 'Uçak uçuyor';
  }
}

function testFlyingTransportation(device: FlyingTransportationDevice) {
  console.log(device.fly());
}
//bunuda ayrı fonksıyonda calıstıroyurz tabıkıde ıhtıyaca göre..

//** REAL WORD EXAMPLE */

// bu gerçek ornegıde aslında anladın chatgpt suan yarın daha sakın kafayla buraya yazarak ilerlersın aynı sekılde....sımdı paydosss yarın devm..
