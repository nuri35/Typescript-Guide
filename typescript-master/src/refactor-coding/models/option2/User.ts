import { Eventing } from '../Eventing';
import { SyncRefactorGeneric } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

//! tamemen secme secenegımız  bagımlılık olarak new Eventing(); başka bir class yok yani new EventingUpper mesela olsa aynı görevi yapan başka class bu sefer hardcoded olarak degıstırmek zor olur ozaman option 1 gibi yapardık. event = diyip başka ne koyabilirsinki alternatif bu örnek baglamında yok .. böylelikle bu yapıda  yapıyoruz ve option 1 yapısını yazmamış oluyoruz. bu tur case örneklerınde böyle yapıda hardcoded  class içine yazabılrsın

const rootUrl = 'http://localhost:3000/users';
//!option 2

//!newNOT :Eventing,  ornegın bunun metotlarını ayrı class'A aldık tabilide interface sayeesınde superEventing diye ayrı class olurdu o ınterface'e uydugu ıcın buraya gelebilrdi sorun yok reusable coding yapmıs oluruz. aynı sekılde sync class yaptık onunla ılgılı metotları ayrı işte sync class'ında barınıyor sync interface'i yaptık ona uygun farklı sync ile ilgil class'lar gelebilir aynı sekılde .. böylelikle yenı User class'ımız  constructorda interface kurallarına uyan o model'dekı gibi şeyi hayal edebilrisn.. artık User uzerınden sync dekı metotlara ulaşabilrsin vs vs vs... User dada karısık metotlar artık burda goremıyoruz daha temız oldu..
//todo kal burda.. 165.dersi dinle
export class User {
  event: Eventing = new Eventing(); // bagımlılıklarımızı bu sekılde kodlucaz.
  public sync: SyncRefactorGeneric<UserProps> =
    new SyncRefactorGeneric<UserProps>(rootUrl); // object composiiton gibi event mantıgında hardocded olarak eklıyoruz.... sımdılık... dolayısılya interface olusturmamıza gerek yok...

  public attributes: Attributes<UserProps>; // burda  new Attributes<UserProps>({}); böyle cagıramazdım cunku data ekleyecegım ve datayı dışardan beklıyoruz onun ıcın constructorda yazdım cagırmayı new dıyerek.

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
  on(eventName: string, callback: () => void): void {
    this.event.on(eventName, callback);
  } //?burada bunun iyi olmamasının sebebi; bir fonksıyon cagırısından gecıyor on diyerek. veya bir metot cagırısndan gecmek ıstedıgımızde her seferınde once bu fonksıyon tarafından beklenen ozellıklerın ne olduguna bakmamız ve hepsini buraya el ile yazmamız gerekecegı anlamına gelıyor yanı içersinie ornegın this.event.on yazıyoruz... neyle ilgili ise yanı  ornegın event alt modulunde yontemı degıstırdıgımzıde el ile gelıp buraya bunuda degıstırmek zorundayız. (ister alt moduldekı yontemın ismi olsun ister içerigi olsun gelip buraya buraya uygunmu dıyede kontrol edeceksindir.) yanı dırek alt modullerden ulaşmak ıstemıyorsan buraya metotlar yazıyorsun ve o ıcerısınde o alt modullerı trıgger edıyorsun ama burdakı metotlarıda accessor olmadan bır metot olarak yazar ve cagırısan işte burdakı sorunlar ortaya cıkabılıyor ozetle...

  //
} //!accessors olmadan  buraya bazi metotlar ekleyecegız buda alt modullerdeki yontemleri cagıracak..

//! yanı user create edildiginde class tetıklendıgı an ıcerde event'ı 'De tetıklıyor.tabı bu yaklaşım bazi avantajları kaybettiriyor object -composition yapısında. option 1 veya option 1.1'de  constructor'Da istiyordu ve o an o interface' kuralına göre consturctur'A atacagın class yani bilgi kaynagı degişeblirdi. burda o yok. ama zaten ihtiyacımzı yokki yani o event interface'ine uyacak başka bir class örnegi ile değiştirmeyecegiz umrumuzda degil bu case'de. yanı event ınterface'ine uyan superEvent diye bir class'ı constuructur'A vermicem yani. diger bütün object-composition'ın faydalarından yararlanıyoruz....... mesela new Eventing class'ını başka bir class'da cok kolay kullanabilrsin birbirlerine bagımlı degiller. eventing class'ını kolay test edebilrsin cunku o class sadece kendi işini yapıyor. sadece user içine hardcode şekinde yazdıgımzı ıcın user class içinde kolayca degiştiremiyrouz buda umrumuzda degil new Eventing'den başka  new SuperEventing diye birşey eklemıcez hayal edemiyoruz yani. olsaydı ozaman constructor'da tutardık zaten hardcode user class ıcıne yazmazdık.
const user = new User({ name: 'ali', age: 20 }); // bunu dedıkten sonra
// aşagıda user.event de başka ayar yapmana gerek kalmıyor..
user.event.on('change', () => {
  console.log('change');
}); //fikir: eventi private yapardık bır metotu dışardan cagırıp o metot ıcınde this.event.on diyebilirsin.
//? sadece event ıcın bır ornek alt modulunu cagırdık...  fakat bazen user.event demek ıc ıce gecmıs ozellıge basvurmak zorunda kalmak bıraz sıkıntılı olabilir. yanı bızım oncekı compositon orneklerımızede hatırlamak gerekrse ordada alt bırlestırmek ıcı kullandıgmız o ornegın matchreader gıbı class'lara ulaşmıyoruz burdada user.sync.save demek ıstemeyız tabikide ama burdada bır mantıgı calsıtaracak metotumuz da yok ornegın run diye metot olur alt modullerı calıstırı ama burdakı ornegımzı ıcın gerek yok dolayısıyla event ıcın sync ıcın kendılerı ıcın on gibi yukarda metotlar oluşturduk... ordan alt module tabikide ulaştık..tabıkıed dogru olanda bu composition yaparken instance olusturula class uzerınden alt classlara dırek ulaşmak dogru olmaz bir metot uzerınden o metot o alt class'adakı metotlara ulaşılması dogru olur... fakat ordakı notu oku oranında dejavantajı var... bu ornek adına..
//?tabıkıed burdakı iş mantıgında tek bır metot cagırıp işimizi halletmıyoruz dolayısıyla bu ornek baglamında  ayrı ayrı metotlar oluşturduk onları cagırıyoruz o cagrılan metotlarda işte alt modullerdekı metotlara ulaşıp iş yapıyor.. reusable coding yapmıs oluyoruz sorun yok... ornegın ayrıca on trigger ıcı metotlar oluşturdum alt modul olarak event ıcın calısacaklar istediigmizde...fakat burda bu ornek ıcın on trigger  get set yanı event ve attirubtes ıcın normal metotlar yapman mantıksız kalıyor bıraz yukarda on metot kısmında anlattım. fakat ornegın fetch ve save ıcın accessor kullanmadık aşagıda onları metot olarak kullandım o da alt sync metotlarını kullandı istersen alt sync2other  metotunu kullanarak yıne aynı sekılde resuable coding yapmsı oluyorzu dışardan yine bir metot cagırıyoruz ve o metot alt moduldekı metotu cagrıyor dırek ulaşmıyıruz sorun yok ama on tigger gibi şeyler ıcın normal metot yerıne accessors kullandık ... ha tabıkıde bu ornek baaglamında on trigger ıcın accessor kullandık uste anlatılan zorluk baglamında..oncekı orneklerdekı tekbır metot mantıksal yapıda degıl on triiger ayrı metotlar oluşturuyoruz ya ve bu metot'dada parametre koydugumuzda yukarda bahsedılen zorluk varya vs  ondan accessorslar ıyı olur bunun ıcın. aynı mantıkta fetch save'ide yapabilridik ama zaten parametresı yok. gerek yok gerçekten orası ıcın. ve fetch save'dede reusable coding yıne yapmıs olduk sadece bi dışardan metot cagrımını yapıp yine alt module o metot zaten ulaşmıs oluyor fakat o dışardan cagrılan metotu normal metot yaptık accessors degıl....

// accessor olmadan yine bır ornek

user.on('change', () => {
  console.log('change');
});

//refactor with accessors...

export class UserAccessors {
  event: Eventing = new Eventing();
  public sync: SyncRefactorGeneric<UserProps> =
    new SyncRefactorGeneric<UserProps>(rootUrl);

  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.event.on; // unutma burda bır metotu referans vererek donduruyorsun..
  }
  get trigger() {
    return this.event.trigger;
  } // burdada yıne get kullanmadan yapardın ama trigger'a parametre  eventName: string) vs ataman lazım oda ıcerdekı cagırdıgın metota parametre olarak atanır.. yıne trigger() seklınde yapsam ama ıcerıde referansı return etsem bu sefer ılk once this.trigger() seklınde cagırıp donen degerı metot olarak cagırısın ne gerek var. get ile this.trigger() yaparak o parantez içersiindekı return olarak donen referans verılen metot olmus olur. onun parametre kurallarını uygularsın hemde alt module dırek ulaşmadan işini ypaarsın..

  get get() {
    return this.attributes.get; // getter'larda vs içeride metot cagırıyorsan parantez acmadık o alt modulun yontemlerıne yıne referans olusturduk. gettter kullanmasaydık get() seklınde sadece kullansaydık bu seefer cagırcagımız zaman get(required:parameter) bır parametre vermemız ve  attributes.get dekı kurallara uygun sekle getırmemız gerekırdı ve  o parametredekını  return this.attributes.get() parametreye aktarmamız gerekıyor cunku..ıkı iş yapmıs olurduk. ve yıne ama alt module ulaşmadan halletmiş olurduk. ama ben yıne at module ulaşmadan attirbutes'dekı alt modul cagırcam ama  get get() yaparak bu sekılde parametre atayamıyroum zaten  dolayısyla ıcerıgınıde  return this.attributes.get; vererek referans olusturduugmda  cagırdıgımda UserAccessors.get() burdakı parametre aslında ıcerıdıekı referansın parametresı olmus olur ve onun kurallarına göre parametreyı koyarım... bukadar.. basit...
  }

  set(update: UserProps) {
    this.attributes.set(update);
    this.event.trigger('change');
  } // burdada setter'rı kullanabilrsin sorun olmaz ama onun ıcın cagırma yontemı su sekıldır  this.set = response.data; bız burda setter kullanmadık.... tabıkıde setter'lardada parametre koyabilrsin sadece cagırma seklı degıısk ornek amacıyla yazdım.. zaten bız dışardada ornegın user.set() seklınde metot olarak caıgmrak ısterız.

  //! ornegın dışardan fetch'E bir parametre vermıyoruz gereklı şeyleri bu metot'da alt class metotlarını calıstırken  this.attributes.get('id') vs seklıned alıyoruz zaten... burdada accesors kullanmaya gerek duymadık..
  fetch(): void {
    const id = this.attributes.get('id'); // ama burası mesela istersen this.get yap sana kalmıs bir durum tabikide burası cok fark yaratmaz ondan kalsın böyle this.set(response.data); yapmamız sebebı  this.event.trigger('change'); de tetıklenmesı ıcın
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // this.attributes.set(response.data);
      // burada this.set diyerek bu classdakı set ilede yapardık burda direk  this.attributes.set ile yaptık dolayııslya    this.event.trigger('change'); uyarısından ıgnore olmus olduk asında. buyuk ıhtımalle verılermızı her guncelledıgmızde bir degısıklıgı tetıklemek ısterız dolayısılya bu class ıcerısındekı set'e guvensek daha iyi oalcak
      this.set(response.data);
    });
  }

  //save
  //attributes.getAll ile objenın hepsini alıyoruz
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
    //!bunlarda setter kullanmaya gerek yok set save() seklınde ornegın cunku user.save() diye cagırmak ıstıyorum zaten o ıcerısınde alt modullerı cagıracak zaten... setter ile user.save = dııyp ne yapcan zaten parametre olarak bile birşey koymuyorsun bunu metot olarak caıgmrak en guzelı zaten...
  }
}
//getter fikri ise birisi user'daki on metotuna başvurdugunda direk this.event.on diyerek  döndürmek. amaç get ile sadece this.event.'deki on yontemıne referans oluşturmak
//! dikkat edersek return this.event.on dedim. yanı this.event.on() diyerek on kısmında fonksıyon gibi çagırma yapmadım. bunun yerıne event.on yöntemine bir referans döndürmeye calsııyorum

const userAccessors = new UserAccessors({ name: 'ali', age: 20 });
const on = userAccessors.on;
on('change', () => {
  console.log('change');
}); // burda unutulmaması gereken şey: userAccessors.on; diyerek referans verdigimizde olay sınıfndakı on yöntemine bir referans aldıımgızdır.

on('click', () => {
  console.log('click');
}); // sımdı böyle yazıyoruz ama farklı yerde yıne yazmak ıstedııgnde const on = userAccessors.on; dıyerek cagıracaksın başta. dolayıslya böyel yazmaya gerek yk
//****** */
userAccessors.on('right', () => {
  console.log('right');
}); // direk böyle yapabilriz burda direk userAccessors.on derdemez parantez acarak cagırdıgında direk dondurdugu this.event.on'daki metotun parametrelerini ister artık... yanı get on() Dakı parantezler degıl bu parantezler... bu parantezler event.on metotunun parametrelerıdır. parantez kullanamadan userAccessors.on dıyerek o an referans verıyoruz o hemen return donduruyor o dondurdugu metotun parantezleri oluyor (: (:))
// böylelikle ayrıca event'e user.events.on diyerek ulaşmamış oluyoruz...

userAccessors.on('left', () => {
  console.log('left');
});

// ornek cagırma ***

console.log(userAccessors.get('name')); // brda webden consol'a baktımgızda typerror cannotread name of undefined gibi hata verıyor..javascriptde calsırken bir örnek yazacagım ozaman anlarız bu hatyı neden aldıgımızı

const colors = {
  color: 'red',
  printColor() {
    console.log(this.color);
  },
};
colors.printColor(); // red no problem printColor calıstırdıgında ıcerısındekı this aslında printColor fonksıyonun solundakı oluyor solunda ne var colors ozaman this = colors sorun yok dolayısıyla colors.color dan red yazdırdı

const printColor = colors.printColor;
printColor(); // solunda hıc bısı yok this o an undefined yanı. dolayısıyla printColor metot ıcerısınde console.log'da undefined.color gibi birşeyo luyor.

//!!! burdan yola çıkmak gerekirse....
console.log(userAccessors.get('name')); // burdada get ile ilk referans verılıyor sonra () açarak aslında  o parantez this.attributes.get;'ın parantezi oluyor. yanı ozet olarak  userAccessors.get'den döneni cagırıyoruz o donen şey'in parantezi oluyor () bu. yanı userAccessors.get('name') dırek artk   Attributes'dkeı get cagrıldıgında ıcerısınde this.data var  o an this ne oldu userAccessors oldu yanı userAccessors.data['name'] vs vs... yanı userAccessors.data.name oluyor  dolayısıyla consol'umuzda webde cannot read property 'name' of undefined hatası alıyoruz..

// !bunu cozmek ıcın arrow functıon kullanabilriz... attributes class'ında arrow functıon yapalım get metotunu..
//? böylelikle Attributes class'ındakı get içersinde ki this arrow functıondan dolayı artık this = Attributes olur sorun kalmaz.. yanı Attributes.data['name']; olur.
// ve heryerde yüzde yüz arrow functıonları class ıcerısınde kullanmalıyız..... cunku bıze this anahtar kelımesının gercekten oldugu class'ı saglar.

/// ve artık ozgurce yazabilriz sorun yok

console.log(userAccessors.get('name'));
userAccessors.on('change', () => {
  console.log('change');
});
userAccessors.trigger('change');

//!  fetch gibi yenı metotlar ekledık ve cagrım ıcın

// userAccessors.fetch();

// userAccessors.save();

//todo sımdı bız burda 3 tane ınterface kuralına uyan kurallarımız var sync event attributes buna göre reusable coding composiiton vs yaptık..fakat burdakı kullanım seklımızbunları ayrı ayrı cagırmak oldugu ıcın ayrıca alt sınıflara ulaşmak dırek olmadıgı ıcın bunlara uygun metotlar yazıp o metotlar alt sınıflara ulaştı.. sorun yok... ve dışarda ayrı ayrı kullandık metotları... bunları anladık tekrar ettik. ayrıca tam nerde neden accesors kullandıgımız vs anladık. ayrıca buraya kadar diger orneklerle vs karsılaştırdık ayrıca interface mi inheritance mı kaarar vererek sonuca ulaştık.

//!!!!!okey.. sımdı herşey okey fakat son bir  sorun var. yukardakı user class ok fakat bu sefer bookclass yapsak aynı ınterface kurallarını koyduk aynı sekılde bu sefer onlarada ayrı ayrı tek tek 3 alt class'daki metotları cagırcagım ıcın yıen dışardan ulaşmak ıstemyecegım dırek yıne metotları yazmak durumundayım on trigger gibi vs burada kendımızı tekrarlamamak adına model class'ı oluşturalım..

//!PROBLEMLER:

//!3:  şuanda user class'ında baglı muazzam mıktarda işlevselligimiz var. ama unutlmamalıdırkı burada cerceve olusturmaya calısıyoruz. dıger gelıstırıcıler tarafından cılgınca farklı uygulamalar olusturmak ıcın kullanılabılecek bazı yenıden kullanılabılır ogeler olusturmak ıstıyoruz.sonunda uygulamamızın ıcınde bır lbog yazısı veya buna benzer bırşey gibi başka bir model sınıfmız olabilir. tam anlamıyla bır blog gonderısının temsıl etmek ıcın blog post adına bir ıkıncı bır sınıf olustuursak buyuk olaslıkla tum bu yontemlerı blogpost sınıfnda aynı user classdakı gıbı uygulamak zorunda kalacagız yanı user class'ındakı metotları dırek kopyalayıp blogpost class'ına aktaracagız işte trigger get set gibi bu metotları. burda o hardocded yazılanlar cok onemlı degıl onları hardocded olarak eklemek ıstersın zaten yada ınterface seklinde onlar alt modul onlarda sorun yok mecbur composiiton mantıgında birleştirsin onemlı olan we dont want to have to reimplement all these methods for each new model yanı blogpost comment gıbı ayrı classlarda geet set on trigger save gibi metotları ımpelement etmek tekrardan bunu yapmak ıstemeyız.  dolayısıyla bu konuda yapmamız gerkeen bir cok iş vardaha..... birde ayrıca user olsun book olsun dışardan dırek ulaşmamak adına o yazılan trigger get fetch gibi metotlar class ıcerısınde cok var ya  bunları ayrı model'e alalım.

//todo BURDA KAL.... BURAYA KADAR HERŞEYİ ANLADIN COK GUZEL BİRŞEKİLDE LAKİN BURDAKI SORUN İLE İLGLİ SENDE KENDİ ÖRNEKLERİNDE KARSILASIRSAN BUNA BENZER OZAMAN ZATEN BÖYLE BİR ÖRNEGIMIZI HATIRLARSIN.... VE GELIRSIN BURDAKI ALT KISIMDAKI COZUME ODAKLANIRSIN... SIMDI HER TEKRARDA ALTTAKI COZUME ODAKLANMAK BIIZIM ICIN IHTIYACIMIZDAN FAZLASINIYAPMIS OLUYORUZ GIBI OLUYOR... ZAMAN KAYBETMIYELIM.... BİRDAHA BÖYLE BİR SORUNA  GERÇEKTE NE KADAR ULAŞIRSIN BUDA MUAMMA ONUN ICIN BÖYLE YAPALIM.
//TODO YARIN SAAAT 17.00 DA ARTIK BURASI OKEY OLDUGU ICIN DEPARTMAN ORNEGINI ACARAK BAŞLIYABLİRSİN--------------------------------*********************-------------------------------------------- **** udemy'deki tekrarda okey artık ayrıca yapay zekadan vs bir örnekte yapmsı oldun.. direk yarın sımmdıkı sıradaki şey şu olcak departman ornegını yapay zekaya sun onun ıcın ne yapabilir...  fıkır edin ve departman ornegıne başla.. böylelikle farklı ornkeler uzerınden bu edındıngız bılgılerı kullanmıs olacagız..

// bır user class olusutmak. sımdı olsutrudugmuz tum bu farklı yontelmlerden bır mıktar kod yenıden kullanımı elde etmek ıcın bir tür composiiton tarzı yaklaşım benımseyecegız.
// class user artık basıt olacak ıcerısınde  model: Model dedıgımız bir tür olacak  yanı model:Model = new Model() seklınde yukardakı hardoceded alt class'larımız gibi.

// ayrıca işte class Model sınıf ıcerısındede bızım user'dakı ıcerıklerı oraya taşıyacagız. get  set on trigger vb

// user class'a bazi özel işlevler eklemek ıstedıgımızı dusun  get fullname() { return `${this.model.get('name')} ${this.model.get('age')}`; } gibi yanı user class'a ozel metotlar ekleyeiblriz fullname gibi model class'ı tamamen dokunulmamıs halde  dışarda this.model diyerek cagırmadan. fullname adına bir getter ayarlamak ve fullaneme metot ıcerısınde  user classsın bu model ozellgıne yanı this.model diyerek başvurmasına izin verebilir ve esasen gereklı bazi bilgileri almak ıcın bu model uzerınde get'i cagırabılır veya belkıde bu kullanıcnın

//keısnlıkle iyi bir yaklaşım olackatır. bu farklı yontemlerı yazılnızca user class'a kolayca eklememıze olanak tanıyacaktır. ornegın class user yerıne bu sefer ımage class'ımızvar onun ıcındede model: Model diye tanımlarız ayrı o model class'ımıza referans verebılcegını kolayca hayal edebilriz. dolayısıyla burada kesınlıkle buyuk mıktarda kod yenıden kullanımı elde edebılyıoruz ama sadece class goruntusu ıcın ozel olan veya sadece user class ıcın tasarlanan yontemlerı ekleyecegımız yer var image class'ında resize() gibi yada user classDa get fullname() gibi
// sımdı bu ykalaşımın bır dejavantajı var.....

//şöyle bılıyorsun  ta yukarda user classımızda event sync attributes'ler vardı user.events user.attributes.get vs diyerek ulaşıyorduk bu yuzden bır dızı faktoru gozden gecırdık. getter'lar vs kullandık fetch işelemımız ıcın fetch metot kullanıp ıcerısınde getter vs kullandık
// bu yazımızdada artık composition tarzı bır sınıf olmasını ıstıyorsak model uzeırndekı farklı yontemlerı ortaya cıkarmak ıcın user sınıfndakı tum bu farklı yontemlerı duzeyını bır kez daha yenıden uygulamamız gerekecegı anlamına gelıyor. yanı user.model.get yada user.model.attirbutes.get vs dememek ıcın user class'ımızda tekrardan get set trigger gıbı yontemlerı bır kez daha uygulamamız gerekıyr. uygulamamak ıcınde dogrudan modele erişime izin verirsek bu bizi gerçekten garip senaryoya sokmaya başlıyacak.....**

// garıp olmasının nedenı dogrudan use class uzerınde  her zaman erişmek ısteyecegımz bazi özelliklere veya yontemlere sahıp olmaya başlayacak olmamızdır. ornegın const uuser =  new user(name:'sa', surname: 'sen') var
// ve ad soyada erişmek ıcın user.model.get('name') gibi dememız gerekıyor. yada tam adını donduren bır yontememız oldugunu dusunelım bu sefer user.fullname dememız gerekıyor. he ama user.model.get dememek ıcınde modeldekı yontemlerı tekrar user'a tekrar almamız gerekecek ıste cok kotu hal alacak.. dolayıslya user.model uzerınden gıtmeyız bu sefer oyle gıtmessek  user'a tekrar model class'a aldıgımız metotları tekrar yazmamız gerekecek....

// neyse; buralardada sureklı farklı bilgilere erişmek ıcın tamamen farklı bır sozdıızmı kullanmamız gerekebılır işte ornegın user.fullname yada user.model... gibi işte burda composition bozulmaya başladıgı yerde buraısdır... reusable sınıflar olusturmak ıcın compsoition harikadır. ancak user class'ı ozellıkle mesela ozellestırmek ıstedıgımız anda gerçekten kafa karısıtırıcı olmaya başlar. cunku iç içe gecmıs ozellıklerımız vrdır.
// ama burda inheritance kullanırsak  duzelebilir.

//TODO inheritance

// bu model özelliklık ilişkisini kurmak yerıne yanı model:Model dedik vs kullanının sınınf modelinden mıras alacagını söylersek yanı user class'ımızdan model:Model kaldırdık sadece orda işte fullname() gibi metotlarımız vs var. ve class User extends Model diyecegız. tabıkıde composition kullansaydık guzel olcaktı fakat bu snearyoda işe yaramadı tabilide her zaman kalıtım kullanmak zorunda olmadıgımız gıbı her zaman composiiton da kullanmamalıyız
// dolayısılya model sınınfını miraz alacagını söyleyecegız. kodda anlatacagız. böylece user class tum bu model classdakı fakrlı yontemlere  sahıp olabilir.

// sonuc olarak burda model diye bir class'a taşıdık metotları ve alt moduller orda  ben bu model'i başka kopyası yok dıye zaten user'a koydugumda user.model uzeırnden erişmesı kafa karıstıracak dogru bir yontem degıl kaldırısan bu sefer user metota tekrar o yontemlerı eklemen gerekır eklemeyıp sankı user metotunda varmıs gıbı yapmak adına model dekı metotları işte user extends Model yaparız bizi kurtarır... ama aslında tabıkıde user ve model class'ları bırıbrıne  cok baglı class'lar degıl ıheritance yapılmaması gerekır  ama burdakı cozumumuz ıcın böyle yaptık....

// model.ts e bazı şeyleri taşıdık... sımdı user class'ımız su sekıl olacak

//todo buraya kadar anladın  184.dersdesın cok ıyı gıdıyoruz..5.30da gelll

import { Model } from './Model';

interface testProps {
  sas: string;
  asassa: number;
  id?: number;
}

//!inheritnce sayesınde aslında user class'ımızda bulunan metotlar vardı bunlar hepsi sildik ve model diye bir class'a aktarmıstık ve bu model class'ımızdada alt class'lar composition yapılıyordu ya  ama bu model class'ımızdakı metotları ve alt gereklı modullerı de ıster user ıster comment ıster blogpost gibi class'larla kullanmak adına ınheritance kullanıyoruz.... aslında yıne bu metotlar user'dakymıs gibi aslında yine bu modelde consturctorda beklenılenler user'daymıs gibi olmuş oluyor...yanı senın blogpost class olusturdugunda bu classa metot eklemene gerek yok tekrardan extends et Model class'la ve etksini gör...

export class RefactorUserx extends Model<UserProps> {
  // new user dıyıp dışarda cagırmak yerıne static metot ıcerısınde halledıyoruz.... userProps'suda static metot'a parametre olarak eklıyoruz..
  static buildUser(attrs: UserProps): RefactorUserx {
    return new RefactorUserx(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new SyncRefactorGeneric<UserProps>(rootUrl)
    );
  }

  // static buildLocalUser(attrs: UserProps): RefactorUserx {
  //   return new RefactorUserx(
  //     new Attributes<UserProps>(attrs),
  //     new Eventing()
  //     new LocalSync<UserProps>(rootUrl)
  //   );
  // }example....

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
  // buraya user'a ozgu başka şeylerde ekleyebılrız
}

const newUser = RefactorUserx.buildUser({ name: 'ali', age: 20, id: 1 });

newUser.on('change', () => {
  console.log('change');
});
newUser.get('name');
newUser.set({ name: 'new name' }); // artk userprops'a uygun objeden koyabılrsın unutma burdakı set modelden ınheritance aldııgn set oluyor. oda ıcerısınde işlemleri yapıyor. ama onemlı nokta sankı bunlar user'daymıs gibi oluyor unutma cunku set sankı user'daymıs gibi ve user ıcerısındede ornegın this.attributes.set(update); dıyor o this o an user oluyor ve ıcerısındekı metotda sankı user'daymıs gibi oluyor this cunku o an user oluyor..
newUser.get<'name'>('name');
newUser.fetch();
newUser.save();
newUser.setRandomAge();
newUser.get<'age'>('age'); // artık degısen o degerı gorurum....
newUser.save();

// buraya kadar herşey okey... buraya kadarmıs anlatılanlar okey... bitti..
// artık bolum 14 deyız... ders 219dayız arıtkk bukadar...

//kendım yenı bır ornek yapapbilriz....
