interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

export class Sorter {
  constructor(public collection: Sortable) {
    this.collection = collection;
  }

  bubbleSort(): void {
    const { length } = this.collection;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          // true ise swap yap
          this.collection.swap(j, j + 1);
        }
      }
    }
  }
}
//? yukardakı örnekten sonra bu ana class ile alt class'ları inheritance kullanarak birbirine bağlamış olduk... class CharactersCollection extends SorterExtended yaptık örnegın burda  CharactersCollection da sankı  bubbleSort varmış gibi ona ulaşıyoruz.new CharactersCollection.bubleSort gibi.  ve bubbleSort metotun ıcındede this diyoruz ardından o an this anahtar kelimesi o alt class olmuş oluyor ve o class'ın prototiplerine ulaşabiliyoruz... böylelıkle yine her class'ın aynı compare swap gibi metotlarına ulaşarak reusable code yazmış oluyoruz..... normal bir class'ı alt class'Larla extend ettik  fakat hala bize this.compare felan kırmızı yanıyor bunu javascript bilgimizle calsıyor oldugunu gösterdik zaten ama ts kızıyor bize işte kızdıgı konuda şu sorterExtend classın this.compare demişsin fakat bu class'Da öyle bir metot yok diyor.. bıızmde bekledıgımız şey yukardakı gibi zaten this.collection.swap ile interfaceli şekilde yapmıyoruz  inheritance kullandık ve  SorterExtended'classını instance'Da oluşturmayacagız.. sadece alt class uzerınden bubblsort calsıtracagız.. o metot ıcınde this.compare vs alt class'larda olmasını js ile biliyoruz yanı alt class uzeırnden ana classdakı metota ulaştıgımzda this.compare vs dedıgımzıde alt class'lardakı o metotları calıstıryoruz.. öyle calıstıgnı bılyıoruz fakat bunu ts' bilmez... belkı alt classda o metot yok... dolayısıyla abstract class'a cevırıyoruz ve böylelikle alt class'larda bu metotları implemente etmek zorunda oldugunu belırtmıs olyoruz tsde buna göre kızmıyor..

//! özetle interface yerıne inheritance kullanınca extend edilen bir alt class bubleSort metotdunu calıstırınca ıcerısınde bublesort metotun this kelımesının o ankı alt class oldugunu bılıyoruz ve buble sort ıcıerısnde compare swap gibi metotlar alt class'lardakı metotları calsıtıryor. fakat belkı o an alt class'da o metot yoksa undefıned olur.. doalysıyla abstract class'A cevırıyoruz typescript en azından extend edilen alt class'larda bu metotların olması gerektıgın kontrol ediyor... zaten abstract class demek bır ust class parent class demek  başka bir class ile extend edilir instance asla oluşturulmaz demek oluyor... dolayısıyla bublesort içerisinde this.compare gibi şeyler varsa alt class'larda bu metotun oldugunu söylyuoruz   abstract compare vs dıyerek... bunlarıda işte abstract class ile gerçekleştirmiş oluyoruz.
export abstract class SorterExtended {
  constructor() {}

  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  abstract length: number;

  bubbleSort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          // true ise swap yap
          this.swap(j, j + 1);
        }
      }
    }
  }
}

//! inheritance/abstract classes vs interface
//:interface farklı sınıflar arasında  koalyca bir sozleşme kurmamızısaglar. buda farklı sınıfların aralarında dogrudan bir bagımlılık olmadan birbiriyle cok bagımsız 2 class'ın birlikte calısmaısnı sagladı..bu yuzden interfacler genellıkle cok gevsek bir baglantıyı teşvik eder. örnegın custommap ve user company class'larımızı hayal edelim. öncekı orneımız. bırbırınden bagımsız benzemeyen class'lardı.
// birbiirne cok benzeyemeyen nesnelerle yada cok farklı amaclara sahıp nesnelerle 2 class'ı birleştirmeye calsıtıgmızda her an işte ozaman interface'leri kullanmak ıyı secenektir.
// ancak uzerınde calsıtımgız bu ornekte biriirne cok benzeyen bazi sınıfları kullanarak bir nesnenın tnaımını olsuturmaya calsıtıgmız bir ornegımız vardı bu yuzden bir cracters numbers collection tanımlyıorduk vve onlarada bir sortable classs ile calısmaya calsıyordu
// bir sorter class muhtmelen sayılar veya dizeler gibi bir veri koleksıyonuyla cok ılgısı vardır.. bu yuzden inheritance hakkında dusunmeye basamak ıcın daha ıyı bir senearyoydu..
// abstract bir sınıfla  farklı sınıfnalr arasında  bir sozleşme kurmamızıda gerçekten kolaylaştırır. ancak bu daha cok inheritance ve bir ust sınıftakı bazi yontemlerı bir alt sınıfta kulanmaya calısmakla ilgilidir.işte bu ornekte yaptıgmız gibi..
// inheritance kullandıgmızda farklı sınıfları gerçekten guclu br ielilde bir araya getirmesidir. yanı bu noktada tam buraya geri dondugmuzde charecter collection number collection gibi class'lara yüzde yüz bagımlıgımız var.. bradakı alt sınıflar SorterExtended classı olmadan düzgün bir sekılde calısamaz. anlamsız olur cunku  sorter class'ımızda metot ıcınde bazı for dongusu logicler var.. ve ayn ısekılde sorter clas'ımızda bu alt sınıflar olmadan tek başına anlamsızdır. cunku o alt sınıflardakı metotları calsıtırıyoruz... birbirlerınden ayrı gerçekten yaşayamazşar.. bu dejavantajı cok birbirlerine cok ılıskılı yakın class'lar oldugu ıcın gozyumabılıyoruz..
//! bu orneıgmızde ornegın interface tabanlı yaklaşım yaptık tum bu sınıfalr gerçektne ayrı ayrı yaşayabilirler. o alt class'lar ynai interface yaklaşımı kullandıgımz için. ha tabi elbette character collection vs kendı kendılerını sıralayamakcaktı yada başka class'larla ilişkilendiremeyecegız sadece ornek olarak gosterdık ancak gunun sonunda bu sınınfların h er birini kesınlıkle kendı başlarına kullanaiblirdk..ama sorter yapmazdı
//? bu nednele genel olarka birbiryle cok ykaından ılıskılı farklı nesnelere sahıp oldugmuz bir senaryoda olmadıgmız surece kodun yenıden kullanbilirligi adına her zaman ılk olarak arayuzlere ulaşmak ısterız..

//*** */
// object composiiton yada inheritance den biriini kullanmak ıcın bu soruları kendıne sor

//! 1: ornegın numbercollection ı ana classa parametre olarak attıgında interface'E uydu ıcerı gırdı sorun yok bu 2 class yanı NumbersCollection ve  Sorter birbirlerine cok yakın class mı
//?   farklı nesnelerimiz (birbiriyle ilişkili olmayan cok yakın olmayan ama ) birlikte calısmak isteyen farklı nesnelerimiz varsa interface kullanırız.  bır user bır campany bır customMap  class'ından cok farklı.bunlar bırbırıne benzemeyen nesnelerdir. o ornegımız ıcınde bu 4 soruyu aklına getırebılrsın... birbirine cok benzemeyen nesnelerle yada cok farklı amaclarla sahıp nesnelerle calsıtıgmız her an interface kullanırız...

//! 2: ayrıca  ben Sorter'ı extend ıle dıger class'larda işte NumbersCollection veya CharactersCollection class'larında extend ettıgımde bu CharactersCollection gibi class'lar bu sefer child class'ın yanı sorter'ın butun prototplerini metotlarını alsa bir sorun olurmu...

//! 3: ayrıca ornegın CharactersCollection 'ı constructor'a parametre olarak attıgımda ok fakat başka bir class'a interface'i yine uyan sorter2 gibi bir class'ada CharactersCollection'ı parametre olarak atma ihtiyacı duyuyormuyum..

//! 4 yada class CharactersCollection extends SorterExtended nasıl dedıysem multiple inheritance olmadıgı ıcın eger class CharactersCollection extends SorterExtended2farklı bir class'ada inheritance yapma geregı duyuyormuyum  CharactersCollection içim...

//? yukardakı 4 soruyu kendıne sor öyle anlaşılmmış oluyor...
