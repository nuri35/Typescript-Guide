// normal js'De consturctor'alrın ve prototiplerin ne oldugunu hakkında hızlı bır hatırlatma yapcagı<
//js'de yazdıgın sınıflar sozdısımzel bir şeker oldugunu soylıyebılrız. yanı js'de gerçek class'lar yoktur...es2015 ile yazdıgın class'lar o class mantıgı olmayan class'Lar işte js yazarken yazdıgınızda sahne arkasında prototypal inheritance sistemi kullanılarak javascirpt tarafından yurutulur.. typescript ile anlam kazanan class'larda derlendıgınde js'e dondugunda arka planda aynı sekılde prototipal inheritance sistemini kullanır.. cunku artık js'e donmustur... js o sistemı kullanır..

//! o halde prototip kalıtımın ne oldugu hakkında daha iyi fikir edinmek amacıyla 234.dersde 1.30'da anlatıyor.. 8.05'E kadar dinle...
// burda yapalım ornek

// class Boats {
//   color: string = 'red';

//   pilot(): void {
//     console.log('swish');
//   }
// } // ts'de yazdıgımız bir class

// js'de dondugunde olusan yapı aşagıda

var Boats = /** @class */ (function () {
  function Boats() {
    this.color = 'red';
  }
  Boat.prototype.pilot = function () {
    console.log('swish');
  };
  return Boat;
})(); // gorundugu uzere typescript sınıfnımızdan gelen cıktının js tarafında bir sınınf olduguna dair bır kanıt yok. işte bu tur bır sınınıfı yukardakı sınıfı prototip sistemını kullanaraj bu sekılde uygulayabilriz javascript'de... senın yazdıgın js'dekı gerçek olmayan class'da arka planda yine bu sekılde oluyor prototip sistemini kullanıyor onda sorun yok ben burda sadece ts dekı yazdıgımız kod js'de dondugunde bu sekılde oldgunu gösterdim. ve nasıl bir sistem kullandıgını belırtmek ıstedım..

console.log(new Boats()); // output Boats { color: 'red' }
console.log(new Boats().pilot()); // output swish

// sımdı donusulen var Boats  ornegımızı ıncelersek... oncelıkle ıcerısınde function Boats() olarak tanımlanan fonksıyona constructor fonksıyonumuz olarak atıfta bulunuyoruz. yanı bu bır class ıcınde ogrmeye alıskın oldugumuz normal bir kurucu fonksıyona ock benzer bir amaca sahıp... nesnemız sahip olmasını istedigimiz farklı ozellıklerı başlatmak ııcın bu constructor fuctioonı kullanırız.. yanı js'e donen kodda  function Boats() { kısmı oluyor..Ayrıca herhangi bir fakrlı yontemı bu boats instance ile ilişkilendırmek ıstıyorsak bu farklı metotları prototip özellgine atayacagız.. işte bu prottoip ozellıgı burada olup bitenlerin gerçek sihridir.. işte odaklanmamız gerken konuda bu...

//! ilginc bırşey gosterecegım
//cagırdık başarılı sekılde js kodunu sorun yok...
const boat = new Boats();
boat.pilot(); // output swish
///şimdi
console.log(boat); // output Boats { color: 'red' } sadece bunu goruyorum consolda ve pilot diye birşeye atıfda bulunulmadıgını farkedecegız.. ama  outputu consolda genıslettıgımızde o pilot metotu taa bunun __proto__:Object ksımında gorebılıyoruz..

// pekı bu __proto__ olayı nedir prototiple nasıl bir ilişkisi vardır.. 4.15de anlatıyor... orda gösterdıgı şeyde  boat'a atamak ıstedıgımız tum yontemler bu prototip özellgine baglanır bunu deemek ıstıyor... bu arada __proto__ kısmını tarayıcıda consolda anca gorebılrız... console.log(boat); dedıgımzıde shellde felan asla goremezsın tabikide.. yanı gerçek javascript spesifikiasyonunda __proto__ özellgihi yoktur... zaten kod'dada ulaşamıyoruz shelldende goremıyoruz js soz konusu oldugunda bu proto özellgii asında mevcut degıldır.. dolayısıyla burada boat instance'da pilot yöntemini cagırmaya calsıtgımda boat.pilot() diyerek perde arkasında aslında olan şu javascript boat nesnesine bakacak v dıyecek sana baglı bir pılot yontemın var mı.. yanı perde arkasında sizin ve benım ıcın yuzde yuz gorunmez olana javascript, boat'ın prottotip ozellgıne bakacak ve buradakı prototpin gorunmez oldugunu hatırlayacaktır... ve js boat'ın prototipi olan bu protop özellgi tarafından atıfda bulunan nesneye bakacaktır. ve orada pilot yontemı bulacak ve onu cagıracaktır.. ve bızım başta yazdıgımız boat.pilot() bu sekılde calısmıs olacaktır.. perde arkasında bu arama surecı bızım haberımız olmadan devam edıyor...

// ayrıca  ts'De class'a yenı ekledıgın metot sonucunda yine js'de nasıl gorunur Boat.prototype.float vs seklınde gorunur...yenı eklenmıs olarak js'de kodda. sorun yok... ancak prototip kalıtımıyla ılgılı (işte yukarda anlattıgımız şeyler.). gerçekten ılgınc ve beklenmedık olan şey bir nesne olsusturukduktan sonra bile bu prototipe prototipler veya yontemler ekleyebilmemizdir. yanı sımdı ts'den js'e kod dondu... var Boats ile ilgili kodumuz yukarda ama ona yeni prototipler veya yontemler ekleyecegım işte şöyle

// bu js kod unutma... js' donen kod'a yeni bir prototip ekleyebiliriz.. hatta bızde js'de böyle kod yazabılrız... işte..
// Boats.prototype.sink = function () {
//   console.log('glugluglug');
// };
// const boatWihoutSink = new Boats();
// boatWihoutSink.sink(); // output glugluglug
// buda tam şey gibi degılmı ts'de class ıcıne yazdıımız tum metotlar js'e dondugunde bu sekılde eklenıyor bızde burda js'e donen koda bile prototype ekleyebiliyoruz cok ilginc..
//*** */
//!böylece bir prototipe geri donup metot ekleyebilir metot kaldırabilir yada metotları anında degiştirebilrsiinz.. yanı js kodunda class'ların calısma mantıgı bu js'dekı kod mantıgınıda prototypal inheritance olarak calısıyor  tabı ıcerısınde constructor fonksıyon var ve sen yenı prototyp'lar ekleyebiliyorsun vs... ama biz genel olarak typescript ile calısacagız js'e dondugunde otomatık js bu syntax'a cevırecek ve bu prototypal sistem ile calısacak zaten...

//????? bu biraz tuhaf biraz beklenmedık bır durum ama asında bazi acılardan özelliklede deceratorlere bakmaya başladıgımızda bu durum lehimize olabilir...
//! tsDE sınıfları yazarken arka planda js'e donduugnde class gorunumden cıkıp farklı gorunume kavusuyor kodun ve hala prottop sistemden yararlanıyoruz js'de....

//? unutma olusturdugumzu her sınıf prototip adı verılen bir şey yaratır ve bu prototip sınıfmızla yada bu durumda yaratmaya calsıtıgımız nesneyle ılıskılı tum farklı yontemlerı saklar...

// sonuc olarak ts'de yazdıgımzı bir class'ı js'e cevrıldıgınde nasıl bir syntxda oldguunu ve nasıl bir mantıkta calıstııgnı işte prototypal inheritance sistemınde calıstıgını ogrendık o syntax'da yenı prototyp'lar ekleyebildik vsss javascript kod'da... işin mantıgına indik ve bunlaır anlatıtık cunku asıl decerator'ları kullanırkan cok işimize yarayacak...

// smıdı gelelım decerators in ts konusuna...
//? basıt tanım: bir decerator bır sınıfın ıcındekı farklı ozellıklerı veya yontemlerı degıstırmek veya başka sekilde karıstırmak ıcın kullanılabilen bir işlevdir.. ts'de deceratorları yalnızca sınıfların etrafında kullancagız bu nedenle hıc bır zaman kendı basına yuzen bir decerator gormeyeceksınız.. her zman bazıı sınıf tanımlarıyla cok sıkı bır sekılde baglantılı oalcaktır.
//? ayrıca bunları ozellıklerı veya yontemlerı veya statik yontemlerı veya aksesuarları veya sınıfların kendılerın ıdegıstırmek ıcınde kullanabiriz. ornek amacıyla decerator.ts e bakabilrsin..
// dolaysıyla bır sınıfn farklı ozellıklerını veya bir sınıfn farklı bolumlerını degıstırmek ıcın bir sınıfn ıcınde cok cok farklı yerlerde kullanılan deceratorler goreceksınız... bunları hem kendımızde custom deceratorlar kullanabılrız hemde bazı kutuphanelerı kullanırken onların bıze kullanmamız ıcın hazırladıgı deceratorlar olabilir bir çok amaca hızmet edebilir class'lar ıcerısınde..

//SIMDI DECERATOR.TS'E BKMA ZAMANI
