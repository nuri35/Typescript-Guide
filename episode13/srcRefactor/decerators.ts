class Boat {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  @testDecorator //!unutma bu sekılde koyduk () seklınde cagırmadık..
  pilot(): void {
    console.log('swish');
  } //
} // burda bır decerator olusturabılır ve bunu bu farklı şeylerin her biirne uygulayabilriz. ornegın testDecorator var dolayısılya  pilot ıcerısındekı olay degısmıs oluyor.    console.log('swish'); yerıne    console.log('Target:', target); vs yazdırıyor. testDecorator bunu  pilot, formattedColor veya herhangi birşeye uygulayaiblriz.. .

//? destDecerator fonksıyonu olan decerator fonksıyonun kendısı bırkac farklı argumanla cagrılacaktır.
//!ilk arguman  nesnenın pprototipi olacaktır.. yanı boat class'ın prototipınden bahsedıyoruz. hatırlayın js prototipleri hakkında example.ts'de inceleme yaptık bir class olusturdugumuzda aynı zamanda bır boat constructor işlevı olusturur ve bu constructor işlevdede bir prototip tnaımlar. burada decerator fonksıyonumuzun ilk argurmanı olan target, boat class'ın prototipi olacak.. prototiplerdede genelde metotlar barındırır onun ıcın aşagıda output'Da metotları gorebılrız.. özellik tanımı gibi şeyler ornegın color burda yer almaz.. color gibi seyler constructor  içine taşınır.. doalysıyla target output'unda yer almaz.. 2.arguman key olacak buda deceratorumuzu uyguladıgımız property/method/accessor gibi yerlerdekı adı olacka..
function testDecorator(target: any, key: string): void {
  console.log('Target:', target); // output olarak: Target: Boat {   formattedColor: [Getter], pilot: [Function] }

  console.log('Key:', key); // output olarak: Key: pilot  cunku testDecorator'ı oraya koyduk..
}

//!EN COK ANLAMAMIZ GEREKEN KURAL
//? decorators are applied when the code for this class is ran (not when an instance of the class is created). başka bir deyişle decerator yalnızca tek bir kez calıstırılır ve buda sınıfmız ilk tanımladıgımız zaamandır..
// baska deyısle ts bu koda ılk baktııgnda yada js bu koda ılk baktııgndaa demelıyım,  boat class tanımladıgımz bır noktada bu decerator calıstırılır. bu sınfın bır ornegı olusturugumuzda new dıyerek decerator calıstırılmaz... yukardakı class boat'a baktıgımızda kodumuza hic biryerde new diyerek bir instance olusturmadık..sadece kodumuz var.ve zaten ts-node decerators.ts dedıgımızde dosyanın kendınsın her calsıtırgımızda deceratorumuz kesınlıkle calıstı cıktı olarak Target: Boat {   formattedColor: [Getter], pilot: [Function] } Key: pilot yazdıracaktır. yada içerisinde ne ayar varsa o olacaktır...çalışan şey.. yanı bır decerator sınıfı tanımladıgımızda yalnızca tek bir kez calıstırılır.

//!sonuc olarak bir instance oluşturmadık sadece class kodumuz var yukarda  ve ıcıne decerator kyoduk en basıtınden  ardından bu dosyayı calıstırdık ve deceratorumuz calıstı..o an decerator fonksıyonun ıcınde bir set eden bir ayar olabilir vs hayal et...

//   unutma  @testDecorator yok ise zaten arka planda o an bırşey olmuyor ts-node decerators.ts dedıgınde zaten birşey calısşmaz.... cunku decerator belırtmedık ve birşey gormek ıstersen ınstance olusturmak zorundasın...
//***** */

// sımdı deceratorlerın bazen neden gerçekten cok yararlı olduguna dair hızlı bir örnek görecegız..

class BoatNew {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  @logError
  pilot(): void {
    throw new Error();
    console.log('swish');
  } //
} // ne yapıyoruz: pilot her cagırdıgımızda ve kacınılmaz olarak bir hata verdgımızde yanı    throw new Error(); calıstıgında deceratorumuzdan dolayı pılot ıcerıgı artık degıstı  logError metot ıcındekı kod yapısı oldu...  throw new Error(); gordugumuz an artık try catchli yapı oldugu ıcın  catch'de yaakalayacak hatayı....

function logError(target: any, key: string, desc: PropertyDescriptor): void {
  // PropertyDescriptor  , bır nesne uzeırnde tnaımlanan bir özellik etrafında bazi yapılandırma seceneklerıne sahıp bir nesnedir... Bu nesne, bir özelliğin yapılandırılabilirliği, yazılabilirliği ve erişilebilirliği hakkında bilgi içerir. yanı PropertyDescriptor esasen baska bir nesne uzerındekı bir ozellıgı yapılandırmak ıcın kullanılan bir nesnedir. buna benzer birşeyı

  //getOwnPropertyDescriptor ve Object.defineProperty ile bir örnek ypaalım..
  // örnek const car = { make: 'Honda', model: 'Accord' };   dıyelım buna Object.getOwnPropertyDescriptor(car, 'make'); dıyerek car nesnesındekı make ozellıgının yapılandırılmasını alıyoruz. yanı yapılandırılabilirliği, yazılabilirliği ve erişilebilirliği hakkında bilgi içerir.  output olarak şöyle: { value: 'Honda', writable: true, enumerable: true, configurable: true } işte PropertyDescriptor nesnesındede şu alanlar var : value, writable, enumerable, configurable alanları var.... bızım burdada desc.value; aslında ne oluyor.. BoatNew class'ındakı kullandıgımız decerator neresı pıilot dolayısıyla pılot ıcındekı degerı alıyoruz. yanı car nesnesındeki make'i nasıl sectık o oluyor..

  // şöyle ornekde var Object.defineProperty(car, 'make', { writable: false }); dıyerek make ozellıgını yazılabilir olmaktan cıkarıyoruz. yanı artık make ozellıgını degıstıremeyız. yanı yapılandırılabilirliği, yazılabilirliği ve erişilebilirliği hakkında bilgi içerir.  output olarak şöyle: {make: "Honda", model: "Accord"} yanı sımdıde oncekı gibi gorundu.. buyuk fark make ozellıgının writable false olması yanıı degerını guncelleyemeyız demek oluyor. yanı car.make = 'Toyota'; dıyerek degerını degıstıremeyız. yine output {make: "Honda", model: "Accord"} olurdu. doalyısıyla tum bu özellık tanımlayıcı nesnesı, tanımlayıcılarımızın ıcındekı farklı ozellklerı degıstırmemızın temel yolu olacaktır..

  const method = desc.value; // pilot fonsıyonuna bir referans olacak..
  desc.value = function () {
    try {
      method(); // yanı pılot ıcerısınde try catch oldugunu method kısmındada   throw new Error(); oldugunu hayal et... yukarda..
    } catch (e) {
      console.log('Boat was sunk');
    }
  }; // ornegımız bu sekıl degıstırebıldık ..... he tabi decerator foksıyonumuz ıcerısı degıstırmelık degıl set etmelık başka birşey olsa function logError ıcerısı farklı kodlar olcaktı ınstance olusturmadna once bu class'ımızı calıstırdıgımızda calısan decerator ona göre yön alacaktı... bu ornegımızde  ılgılı decerator'un yapıstıgı metotu degıstırmeye yonelıktı..ornegın deceratorumuz bir router ile ilgili olsun içerisini ona göre ayarladın setledin deceratoru koydugun metot kısmına koydun dosya calıstı... bir istekde artık decerator sayesınde o metot'a gelecektır..vb gibi orneklerde var sonra bakılacka..

  //!içerik degıstırme konsuunda bir metot'da decerator fonskıyon ıcerısınde target[key] = ()=> {} bu sekılde  yazıp ilgili deceraotru koydugumuz metot'un ıcerısını degıstremeyız yukardakı gibi anlattıgımz en dogrusudur.. içeride guncelledıgım işlevsellık parçalarından biri deceratorumuz cagrıldıktan sonra tyepscriptin dahili olarak bir özellik tanımlayıcını prototipe geri uygulamaya calısmasıydı.. dolasıyla dogrudan prototip uzerındekı yontemlerın uzerıne yazamayız.. bunun yerıne bunları degıstırmek ıstıoyrsak esasen propertyDescriptor 3.paremetreden gecmemız ve bu özellık tnaımlayıcını kullanarak mevcut işlevsellıgı veya mevcut metot'u degıstımrmeye veya bir tür sarmalamaya calısmamız gerekır.
}

new BoatNew().pilot(); // output olarak: Boat was sunk boyle cagırınca  anladıgım kadarıyla  instance olmadan once zaten decerator calısmıs olcak. o işini halletmiş olcak sonra instance calısınca zaten    decerator ıcın olan fonksıoyn ıcındekıler pılot'da olacak sekılde calısmıs olur.degısımı yanı pılot metotunu ınstance olusturarak cagırarak görebilriz tabikide... cunku instance olusturmassan sadece decerator calısır işini yapar biter... istedigimizi halleder.. sonra  ınstance olusturarak pılot nesnesı cagırdıgını dusun yada istek geldıgını dusun senın deceratorda ıstedıklerın oldugunu göreceksın...

// teoırik olarak bır sınıfın belırlı bır yontemının ıcınde herhangı bır şeyin yanlış gitmesini beklersek sadece logerror decaratrounu atabilriz ve her oradakı hataları otamatık olarak yakalayacagız ve uygunsekılde gunluge kaydeedecegız. bır sekılde fonksıyona nasıl ulaşabilcegımıze ve onu bazı ek sılevlerle nasıl sarabılcegımıze dair sadece bir örnektir..

//  buraya kadar herşey okey... muhtemelen bu deceratoru herzaman yanlınızca boat class adına kullanmayacagız.. deceratoru gercekten kullandıgımızda bu hata mesajını ozellestırebılmek guzel olurdu..   decerator'a bir parametre gondermek ısteyebılrız. @logError('oops' ) gibi..

// parametrelı olması adına şöyle yapacagız.

class BoatNew2 {
  @testoneDecorator
  color: string = 'red';

  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  @customLogError('oops')
  pilot(): void {
    throw new Error();
    console.log('swish');
  } //
}

function testoneDecorator(target: any, key: string): void {
  console.log('Target222:', target);
  console.log('Key222:', key);
}

function customLogError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;

    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}
// new BoatNew2().pilot(); // output olarak: oops suan buna ıhtyıac yok  color ıcın deneyecegım.. new demeden ts-node decerators.ts dedıgımızde  output olarak Target222:  BoatNew2 {   formattedColor: [Getter], pilot: [Function] } Key222: color yazdıracaktır.. console.log ile target[key] yada target.color dersemde undefined cıkıyor  function testoneDecorator'da

//unutmayın bır decerator fonksıyonun ılk argumanı(target) her zaman bu sınıfın prototipi olacaktır.. prototplerdede metotlar barınır. yanı target dedıgımde metotlar aklımıza gelmelı .key kısmım color ama ben target.color dersem undefined alırım.protptipin genellıkle yontem tanımlarını sakladıgını bir string vs saklamadıgını bılmelıyız.strıng sayılar booolean array vb gibi şeyler tümü constructor ıcınde tnaımlanır..unutulmamalıdır ki sınfımızı tanımladıgımızda tum bu deceratorların calsııtıgnı unutmayın ınstance olusunca calısmaz oncesınde calısır.. yanı deceratorumuz gerçekten bir instance uzerındekı herhangi bir instance özellgine asla erişemeyecektir..

// target.color gibi.. properties'lerede yanı class ıcındekı string gibi yerlerde color ='red' gibi yerlerde decerator kullanabılmemzıın tek nedeni daha cok sunu bılme yetenegıne sahip olmamızdır oh hey ornegın bir renk ozellıgı var ve bunu bılıyoruz cunku key color olacak hemen hepso bu. bu bir sınıf tanımı ıcındekı özelliklerımız etrafında bir deceratorun gerçekten tek kullanımdır. bu yuzden bu ozellıklerı degıstırmeye calısamayız.. color gibi şeyleri işte sonra onları degıstmreye yada bır fonksıyonla sarmalamaya calısamayız..
//! yoksa ote yandan deceratorlar genellıkle metotlar etrafında kullanrıız

// ozetle bır sınıfın ıcındekı bır özellik tanımının etrafında yanı  @testoneDecorator color: string = 'red'; gibi kullandıgımızda bu özellige dogrudan erişemeyecegımzdır.  cunku decerator biz bir instance olusturmadan once yurutulur decerator'lar. decerator fonksıyon ıcındede target prototpleri alır oda ilgili metotlardır.. class'dakı normal olarak özellikler color gibi vs constuructorda oluşuyor consturctorda olusuyorsa onlarda instance olusturmadna calısmaz....doalyısyla ınstance olusmadan calısan deceratorlarda erişemeyiz özelliklere. 2 numara ise deceratorumuze ulaştıgımız tek arguman target oda gerçek prototip.

//! deceratorları kullanabılcegımız bir kac yerdaha göstermek ıstıyorum..

class BoatNew22 {
  color: string = 'red';

  @testone2Decorator
  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  @customLogError('oops')
  pilot(speed: string): void {
    // speed adlı argumana dogrudan bır decerator uyguayabırlız. aşagıda yaptık
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  } //
}

function testone2Decorator(target: any, key: string): void {
  console.log('keyTestOne2:', key); // output olarak: keyTestOne2: formattedColor
} // böylece accessorlardada bir yontemde  @testone2Decorator seklınde kullandık aynı yukarda bir properties'dakı gibi kullanabirlz...

//? deceratorlerı kullanbılcegınız bır kac yer daha var..
//!: bır deceratoru kullanbılcegımız ılk ek konum bir METODA uygun ve bir arguman veya bir parametre üzerindedir. diyelık pilot metotumuzda speed gibi bir arguman olduunu söylıyelım
//******* */

class BoatUpdated {
  color: string = 'red';

  @testone2Decorator
  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  @customLogError('oops')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}
//TODO target: any KISMINI any olarak bırakacagız sımdılık asında  target: BoatUpdated  seklınde dıyebırlıdık ama samımıyetsızlık olur.. nedenı ılk arguman target aslında prototip olarak almamızdır aslında boat sınfının bır ornegını degıl... yanı bır ınstance'ını almıyoruz onun ıcın target: BoatUpdated demek yanlıs olur.. sımdılık any olarak devam edecegız..
// ıkıncı arguman key olacak bu da metotun adı olacak yanı pilot. 3.arguman ıse index::number yanı bu deceratoru uyguladıgımız argumanın gerçekk indeksidir
function parameterDecorator(target: any, key: string, index: number) {
  console.log('key:', key);
  console.log('target', target); // output olarak: key: pilot target BoatUpdated {   formattedColor: [Getter],   pilot: [Function] }
  console.log('index:', index); // output olarak: key: pilot index: 0
}

// @parameterDecorator speed: string burda birden fazla argumanımız olsaydı bunlar indexksleri arttırdı
//   console.log(key, index); //output olarak: pilot 1 and pılot 0 tabıkıde pılot 0 dendıgınde     @parameterDecorator speed: string, kısmı söyler.

//? tabı sımdı  @parameterDecorator speed: string, bunları argumanlarda kullandık ınstance olmadan once kodu calıstırken bu deceratorlar calıstı ok ama decerator ofnksıyon ıcınde bırşey yapmadık console'a bastırak birşey yazdık okadar bunları mantık cercevesınde guzelce kullanacagız..

//! pekı bunları nezaman kullanabırızkı dıyor olabilrsiniz..
// bır fonksıyona gelen farklı argumanlar hakkında fıkır sahıbı olmak ısteyebılcegınız bazı gerçekten gelısmıs seneryolar vardır..kullandıkca ogrenecegız..

//!Son olarak class'lara ekleyecegımız deceratorlar var....

@classDecerator
class BoatUpdatedHG {
  color: string = 'red';

  get formattedColor(): string {
    return `This boat is ${this.color}`;
  }

  pilot(): void {
    console.log('swish');
  }
}

// bır sınıfa decerator uygulladıgımızdan deceratorun fonskıyonun tek argumanı  constructor adında bır arguman olur. yanı o class'ın constructor işlevi olacka. tip olarak atama yaptıgımızdada  constructor: Function olarak atama yapabilriz yada alternativ olarak o class'ın constructor işlevine bir  referans olan  BoatUpdatedHG türü diyebirliz.
function classDecerator(constructor: typeof BoatUpdatedHG) {
  console.log(constructor); // output olarak : [Function: BoatUpdatedHG]
  // BoatUpdatedHG fonksıyonu olarak adlandıırlan bir constructor fonksıyonu olacak
}
// yıne bunları kullanmak ıcın gelısmıs senearyolar var kullanacagız...
//! evet böyle birşeyı ne zaman kullanırdık.. bir class deceratorune bakma becerısıne sahıp olmak ısteyebılecgınız bazi gerçekten gelişmiş senaryolar vardır. fonksıyonda constructor: typeof BoatUpdatedHG bunu yazarak bır sekılde bır constructor fonksıyonla ugrasmak degıldır. bunun yerıne bır class tanımı ıcınde cok sayıda deceratoru koordine etmek ıcın bir tür sınınf deceratoru kullanacagız..

// buraya example.ts' ı okuduktan sonra geldım... ve burda temel olarak calısma mantıgını anlamak adına decerator'un  tam class'larda nerelerde kullanıldıgını anladık... sımdı express uygulamamızda deceratorları bırleştırecegız bir çok yerlerde..
//srcrefactor/routes/lognRoutes.ts'e bakabilrsin...
