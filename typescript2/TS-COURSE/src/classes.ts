abstract class Department {
  protected employees: string[] = []; // dışardan bozulmasını ıstemıyoruz priave yaptık.
  constructor(protected readonly id: string, public name: string) {
    this.name = name;
    this.employees = [];
  }

  // descriibe metot arrow function

  //   describe = () => {
  //     console.log('Department: ' + this.name);
  //   }; // böyle yaparak javascriptdkeı bılgımızı kullanaraj arrow fonksıyonları kulllanarak o anki this'i dogru yere referans verdirebilriz..

  abstract describe(): void; // dıyerek extend edilen class'Larda bu metotun zorunlu olmasını saglyoruz her class'da overwrite etmesı yerıne...

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department('d1', 'Accounting'); //! artık abscract class oldugundan ınstance olusturamayız..
// accounting.id = 'd2'; // readonly oldugu ıcın degıstıremeyız.. kızar.. eger private degıl sadece readonly ise
// accounting.addEmployee('Max');
// accounting.addEmployee('Manu');
// // accounting.employees[2] = 'Anna'; kızar cunku private durumda

// accounting.describe();
// accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins; // Department classında olmayan bu classsda olacaklarıda super metotundan sonraa yazıyoruz
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

it.describe();
it.name = 'NEW NAME'; // name public oldugu ıcın degıstırebılırız..
it.printEmployeeInformation();

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // bu statik bir deger olacak cunku
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting'); // bunun anlamı  extend ettıgın class'Dakı constructor buraya ekler. ordada 2 parametre var o parametreye uygun degerlerı yolluyoruz. id ve name burası ıcınde gecerlı olur ..
    this.lastReport = reports[0];
  }

  static getInstance(id: string, reports: string[]) {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    //? artık id: string degerımız isterse d3 olsun oncesınde d2 degerı ıcın ınstance olustugu ıcın artık d3 ıcın  bır ınstance oluşturmyacak böylelıkle instance d2 için olanı return edecektır. istersek bunun ıcın böyle oldugu ıcın zaten getinstance'da parametre koymasakda olur..  ama burda  ılk yaptıgmız şey new dememek ıcın constructor kısmına private diyerek hata vermesını saglıyoruz ordan yola cıkara k static yontem ile kendı ıcınde instnace oluşturmasını saglıyoruz oyle class ıcındekı degerlere ulaşabiliyorzu . burda bız  AccountingDepartment 'dan birtane degerde olacagı ıcınde static metotun ıcınde if koyarak  ılk yaptıgı deger ornegını baz almış oluyoruz başka degerlerde static metotu cagırsada oncekı ınstanceı baz alırız yine .. tabi if blogunu koymayabilrizde böyle durumlarda olaiblir.
    this.instance = new AccountingDepartment(id, reports);
    return this.instance;
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  addEmployee(employee: string): void {
    if (employee === 'Max') {
      return;
    }
    this.employees.push(employee); // employees private oldugu ıcın burda erıselemez bunun ıcın protected yaparsın
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  describe(): void {
    console.log('Accounting Department - ID: ' + this.id); // this.id protected yapmalıyz burdan erirşiz ozaman tbıkıde new AccountingDepartment yaptıgımızdakı degere erişrşiz. sorun yok. sadece id'ler ortak oldugu ıcın super metotu olarak olarak cagırıyoruz  Department class'ındakı constructorda burda gecerlı olmus oluyor  name ve id olmak uzere... sadece  this.id protected yaptık departman class'nda ortak olup alt class'larında kullanmak ıcın...
  }
}

// const value = new AccountingDepartment('d2', []);
const value = AccountingDepartment.getInstance('d2', []); // statik metot oldugu ıcın bu sekılde cagırıyoruz..
value.addReport('Something went wrong...');
value.mostRecentReport;
value.mostRecentReport = 'Year End Report';
// value.id  dersen kızar aslında AccountingDepartment class'ında public gibi ama o asında super metotu kullanılarak ana class'daı consturoctordakı id özellıgı artık AccountingDepartment class'ında gecerlı olmus oluyor.

//! sımdı bu class'lar Department classını temel alıyor ordakı metotlara erişebılyıoruz.sorun yok ordakı bir yontemı gecersız kılarak ornegın AccountingDepartment class'ında yenıden yazarak overwrite yapabilriz orneegın describe metotunu ele alalım. AccountingDepartment'da yaptık describe metotunu... ordada ekstradan bazi ek eacıklamalarda bulundum ok. ayrıca  ITDepartment 'ndada describe metotu yazabilrim ona özel ondakı degerlerı tabı kullanır.. ancak bazen sadece bir yontemı gecersız kılma secenegı sunmak ıstemezsınız cunku bu her zaman vardır. bunun yerıne belırlı bır sınınfla calısan veya belırlı bır ısnınfı genısleten geliştiricileri belırlı bir yontemı uygulamaya veya belirli bir yontemı gecersız kılmaya zorlamak ısteyebılırsınız. bunu ne zaman yapacaksın ? belirlli bir yontemın yanı metotun bu durumda deppartmen gibi bir temel sınıfa dayalı tum sınıflarda kullanılabilir olmasını saglamak istediginizde ancak aynı zamanda tam uygulamanın belırlı bır surume baglı olacagıınıda bildiginizde genel bir yontem saglayabildinizde ancak bu yotmeın var olmasını zorunlu klmak ıstedıgınızde temel sınıfta varsayılan bir uygulama saglayamayacagınız ıcın mıras alan sınıfların kendı uygulamlarını saglamaları gerecektır.. böyle bir durumda depertman class'ında ornegın describe metotunu abstract yaparız. böylelıkle bu depertmant class'ına dayanan tum sınıfları bu yontemı eklemeye ve gecersız kılmaya zorlayabılrız ve bunu buraya abstract ekleyerek yaparız.. bu bıze + başka şeyde saglar ornegın  Department class'ımızda bir metot ıcerısınde this.describe metotu cagırdık ama Department class'ımızda zaten yok ya  ve abstract desccribe dedık ya başka class'larda oldugunu söyledik başka class uzerınden x bir metot cagırılıp ıcerısınde this.decribe denıldıgınde o this o bbaşka class oldugundan o classdakı metotu cagırmış olur... bu bıze cok buyuk avantaj saglar..

//? ek bilgli .unutma bu class'lara describe eklemessen depertmandakı describe metotunu calısıtırsanda zaten ılk super calısıtıgı ıcn  new AccountingDepartment('d2', []); deıdgınde depertmen constructor'undakıler  AccountingDepartment class'ında olusur ve AccountingDepartment class'ında dı degerler 'd2', [] olarak ele alınır . sonra depertmen classındakı describe'ı callıstırdıgında zaten   console.log('Department: ' + this.name, this.id); calısır o anda this.name  'd2', [] degerlerı olur.

//!! ekBİLGİ : OOP dünyasında singeleton kalıbı var. bu kalıp belırlı bır sınıfın her aman yalnızca bir örnegıne instance'ına sahıp olmanızı saglamakla ilgilidir. bu bir şekilde statik yontemlerı veya özellikleri kulanamadıgınz veya kullanmak ıstemedıgnız senaryolarda yararlı olabilir. ancak aynı zamanda bir sınıfa dayalı birden fazla nesne oluşturamayacagınızdan ancak her zaman bir sınıfa dayalı tam olarak bir nesnenız oldugundan emın olmak istersiniz örnegın AccountingDepartment nesnensıne dayalı olarak yanlızca bir nesne oluşturabilcegınızden emın olmak ıstıyoruz. çünkü tüm sirketmızde tam olarak bir musahsebe departmanımız var ..
//! işte şimdi bunu uygulamak ve new AccountingDepartment'ı dıyerek manuel olarak birden fazla kez cagırmaktan kacınmak ıcın bu clas sınfınn constructor onune private anahtar sozcugunu ekleyerek. böylelelıkle bunun uzeırnde new diyemeyecegımzı saglamaktır. private koyarak const value = new AccountingDepartment('d2', []); dedıgmızde kızar artık. private constructor oldugu ıcın artık sınıfın ıcınden erişelebilir. buda kulaga sacma gelebilir.. cunku artık ona dayalı nesneler oluşturamıyorsak sınfın ıcıne nasıl girecegız. yanı ordakı degerlere nasıl ulaşacagız. dogru.. işte bunun ıcınde statık metotlar kullanacagız. statik metotlar sınfın kendısınıde cagırabılır.
