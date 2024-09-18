//Encapsulation
// Kapsülleme, sorumlulukların ayrılmasını ve veri gizliliğini teşvik eder, bu da kodun anlaşılmasını, bakımını ve yeniden kullanılmasını kolaylaştırır.

// Kapsülleme sayesinde, bir nesnenin iç durumu dışarıdaki kod tarafından doğrudan manipüle edilemez veya erişilemez. Bunun yerine, nesnenin durumuna erişim genellikle getter ve setter yöntemleri biçiminde iyi tanımlanmış bir arayüz aracılığıyla sağlanır. Bu, verilerin daha iyi kontrol edilmesine ve doğrulanmasına olanak tanır ve nesnenin iç durumunun tutarlı kalmasını sağlar.

//!aşagıda buna bir örnek banka hesabı class'ımız bulunmaktadır.
class BankaHesabi {
  private _bakiye: number;

  constructor(ilkBakiye: number) {
    this._bakiye = ilkBakiye;
  }

  // Bakiye için getter metodu
  public get bakiye(): number {
    return this._bakiye;
  }

  // Para yatırma metodu
  public paraYatir(miktar: number): void {
    if (miktar < 0) {
      console.log('Geçersiz para yatırma miktarı');
      return;
    }
    this._bakiye += miktar;
  }

  // Para çekme metodu
  public paraCek(miktar: number): void {
    if (miktar < 0) {
      console.log('Geçersiz para çekme miktarı');
      return;
    }
    if (this._bakiye - miktar < 0) {
      console.log('Yetersiz bakiye');
      return;
    }
    this._bakiye -= miktar;
  }
}

// Bu örnekte, BankaHesabi sınıfı _bakiye adlı veri özelliğini kapsüller ve onunla etkileşim kurmak için yöntemler sağlar (para yatırma, para çekme ve bakiye için bir getter). _bakiye özelliği özel olarak işaretlenmiştir, bu da sınıf dışından doğrudan erişilemeyeceği veya değiştirilemeyeceği anlamına gelir. Bunun yerine, sınıf genel yöntemleri aracılığıyla nesnenin durumu ile etkileşime geçmek için iyi tanımlanmış bir arayüz sunar.

// Para yatırma ve para çekme yöntemleri, nesnenin iç durumunun tutarlı kalmasını sağlamak için bazı temel doğrulamaları da uygular (örneğin, negatif miktarlara veya mevcut bakiyeyi aşan para çekme işlemlerine izin verilmez). Bu, kapsülleme işleminin bir örneğidir çünkü veri bütünlüğünün korunmasına yardımcı olur ve kodu daha sağlam hale getirir.

// yanı  bir nesnenin içsel durumunu (verilerini  ) dışarıdan erişime kapatıp, bu verilere yalnızca tanımlı yöntemlerle (metotlarla) erişilmesini sağlayan bir tekniktir. yada private metotlar olabilir class ıcınde başka yerde kullanılan bunlarıda kapsulleyeıblrım..  hashPassword metodu dışarıdan erişilemez çünkü bu işlem sınıfın içsel bir detayıdır. Şifre nasıl saklanıyor ya da işleniyor, kullanıcıyı ilgilendirmeyen bir detaydır. işte hashPassword ornegın private yaparım ona dışarıdan ulaşmasını saglattırmakı ıstemıyorumdur.  cunku onu manıpule edebilir ben checkPassword dıye bır metot publıc yaparım o metot ıcınde o private metotu cagırır.. onun uzeırnden işlem gorur yanı.. böylelıkle kapsulleme yapmıs olurum

// Encapsulation, sınıflardaki verilerin yalnızca sınıfın içindeki belirli yöntemlerle işlenebilmesi gerektiğini belirler ve bu da yazılımda hataların önüne geçer, kodun daha güvenli ve yönetilebilir olmasını sağlar. örnegın Encapsulation Kullanımı: Bu şekilde, _balance dışarıdan rastgele değiştirilemez ve yalnızca belirlenen yöntemler aracılığıyla güncellenir. Encapsulation Kullanımı: Bakiyeye yalnızca geçerli bir miktar eklenmesini sağlayarak, verilerin kontrol altında tutulmasını sağlar. boylede veriler uzerınde daha guvenlı işlemler yapılabilir.
// _balance alanına dışarıdan direkt erişim yasaklanarak, kontrol altında tutuluyor.
// Getter ve setter (deposit, withdraw) yöntemleriyle dış dünyadan bu alana erişim ve değişiklik yapılması yalnızca belirlenen kurallar çerçevesinde gerçekleşiyor. böyle bir çok mantıkta kapsullemeler vardır burada bir kac ornek verdık
//!Real-World Example uzeırnden anlatım..

//
class Engine {
  private horsepower: number;

  constructor(horsepower: number) {
    this.horsepower = horsepower;
  }

  public start(): void {
    console.log(`Engine started with ${this.horsepower} horsepower.`);
  }
}

class Car {
  private engine: Engine;

  constructor(horsepower: number) {
    this.engine = new Engine(horsepower); // Dışarıdan motor kontrol edilemez
  }

  public startCar(): void {
    this.engine.start(); // Motor sadece aracın içinden çalıştırılabilir
  }
}
// burada Engine sınıfının işlevselliği dışarıya açılmamıştır. Sadece Car sınıfının içinde kontrol edilir. Dış dünyadan direkt engine.start() gibi işlemler yapılamaz. yanı startCar metotu cagırabılrı onun uzerınden işlem gorur..
// hatta constuctorda private şeklinde engine: Engine tipinde kural koyarız hardoceded degılde aynı composition mantıgında olur. mesela constructor(private engine:Engine) seklınde. bı sekılde işin içine direk static metot cagırımından başlar sonra car ınstance uzerınden yıne engine ulaşamam sadec bazi metotlar uzerınden işlem gorur..

// Encapsulation'ın Ana Prensipleri:
// Verileri Gizlemek:

// Sınıfın içindeki verileri (alanları) private ya da protected yaparak, bu verilere dışarıdan doğrudan erişimi engellemek.
// Bu verileri yalnızca sınıfın kendi içinde işlemek ve gerektiğinde dışarıya kontrollü bir şekilde sunmak.
// Kontrollü Erişim Sağlamak:

// Verilere erişmek veya onları değiştirmek için getter/setter metotları veya diğer public metodlar kullanmak. Bu metotlar, veriler üzerinde güvenli işlemler yapılmasını sağlar ve verinin geçerliliğini kontrol eder.
// Örneğin, para yatırma işlemi yaparken negatif bir miktarın kabul edilmemesi gibi.
// İç İşleyişi Dışarıdan Gizlemek:

// Sınıfın iç işleyişini (örneğin, bir şifreleme algoritması veya hesaplama yöntemi) dış dünyadan saklamak ve sadece sonuca odaklanmak. İç detayları kimse bilmek zorunda değil, sadece nasıl kullanılacağı önemli.

//! Encapsulation Tam Olarak Nasıl Gerçekleşir? bu tur şeyleri hep yapıyoruz..
// Bir sınıfta tam anlamıyla Encapsulation uygulanabilmesi için şu adımlar izlenmelidir:

// Tüm alanlar (değişkenler), sınıf içinde saklanmalı ve dışarıya private ya da protected olarak belirlenmelidir. Bu sayede dış dünyadan direkt erişim kısıtlanır.

// Public metotlar (getter/setter veya işlemler), bu saklanan verilere erişim sağlar. Ancak bu metotlar, verinin doğruluğunu veya geçerliliğini kontrol eder. Örneğin, bir bakiye artırma metodu negatif miktarların yatırılmasına izin vermez.

// Dış dünyaya gösterilmesi gerekmeyen detaylar (iç hesaplamalar, algoritmalar, geçici işlemler) private metotlarla veya sınıf içinde saklanarak dışarıya açılmaz. Bu sayede sınıfın iç işleyişi gizlenmiş olur.

//! Sonuç:
// Encapsulation tam anlamıyla şu şekilde tanımlanabilir:

// Verileri saklayarak dışarıdan doğrudan müdahaleyi önlemek.
// Kontrollü metotlarla bu verilere erişim ve değişiklik imkanı sağlamak.
// İçsel detayları gizleyerek dış dünyadan sadece gereken bilgilerin görünmesini sağlamak.

//!Real-World Example

const now = new Date();
console.log('Current date and time:', now.toString());

const specificDate = new Date('2023-05-01T00:00:00');
console.log('Specific date:', specificDate.toString());

console.log('Current year:', now.getFullYear());
console.log('Current month (0-based):', now.getMonth());
console.log('Current date:', now.getDate());

now.setFullYear(2024);
console.log('Modified date:', now.toString());

//! açıklama şu şekilde olabilir
//Date objesinin içsel verilerine (zaman, tarih) doğrudan erişemezsin. Bunun yerine, JavaScript bize kontrollü metotlar sağlar o metotlar uzerınden işlerız dışarıya cıkmayan verileri..
// new Date() ile oluşturduğun bir tarih objesi, içsel olarak çok sayıda veri tutar (saniye, dakika, gün, ay, yıl gibi). Ancak bu verilere doğrudan erişemezsin, sadece belirli getter ve setter metodları kullanarak bu verilere ulaşabilir ya da değiştirebilirsin. yanı ornegın now.getYear() gıbı metotlar ıle halledersın.. now._year diye dırek ulaşamazsın Aynı şekilde, setFullYear(), setMonth() gibi setter metotlarla da bu içsel verileri kontrollü bir şekilde değiştirebiliyoruz.
// Date objesinin nasıl çalıştığını, tarih ve saatin nasıl hesaplandığını bilmemize gerek yok. JavaScript’in bu sınıfı bizim için tüm hesaplamaları yapıyor, biz sadece metodları kullanarak sonuç alıyoruz.

//!NESTJS'DEN ÖRNEK VERMEK GEREKİRSE
//örneıgn controller da metotlar ıcınde serviceler cagrılıyor... dış dünyaya Controller üzerinden kontrollü olarak açılır.  service'ı dırek acmıyoruz private ediyoruz bazi metotlar ile kontrollu acılmıs oluyor kapsulleme yapmıs olyuoruz.. Controller, dış dünyadan gelen HTTP isteklerini alır ve bunları Service içinde tanımlanmış metotlara yönlendirir. Ancak, iş mantığı ve veriler Controller içinde bulunmaz. o controllerdakı metot calıstııgnda biz service detayı vs ilgimiz olmaz fazla detaydan..  veriye erişim veya değişiklik yapmak için doğrudan kontrol saglamıyoruz. orda private edilmiş service metotlarını calsıtrıyoruz  dış dünyadan gelen GET veya POST isteklerini alır, ilgili Service fonksiyonlarına yönlendirir.
// Encapsulation burada, iş mantığını ve veriyi Controller'dan ayırmak, dış dünyaya sadece sonuçları göstermekle ilgilidir.

// Service: İş mantığının ve verilerin kapsüllendiği yerdir. Bu katman, dış dünyaya doğrudan açılmaz ve veriler burada gizlenir. Kontrollü erişim ve işlemler yalnızca Service'in metotları aracılığıyla yapılır. Controller: Dış dünyaya açılan kapıdır. Veriye ve iş mantığına doğrudan erişmez; sadece Service'ten gelen sonuçları kullanıcılara sunar. bu sekılde bir kapsulleme mantıgı vardır.

//!onemlı şey olarak git her zaman ornegın polomypism nedir ha şuymus degilde onun altında verılen ornekler neye hızmet edıyor nerelerde kulanıyor gibi içselleştir bol bol ornek vs yapp bu yeterlı. gunun sonunda kafanın arkasında ıngınlızce yazılım cercevesınde ısmı hatırlıyor ol biraz o da denk geldıkce yer eder zaten....

//
