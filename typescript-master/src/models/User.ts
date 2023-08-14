import axios, { AxiosResponse } from 'axios';
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// type Callback = () => {}; //incorrect hıc bır arguman almayan ve bir nesne donduren...

// correct

type Callback = () => void; // hıc bır arguman almayan ve bır sey dondurmeyen

export class User {
  events: { [key: string]: Callback[] } = {};
  // burda neden objenın key kısmına x, name , abc , click gibi şey yazmadık da yanı {click:Callback[]}  yapmadıkda [key: string] dedık  cunku bu durumda gerceklestırecegımız farklı eventlerin adlarını bılmıyoruz  hic bir fikrimiz yok. yanı kullanacıya baglıdır belkı click belkı hover belkı mouseover gibi kullanıcıya baglı bır event olabilir. dolayısıyla ts^' e dıyoruz obje'Dekı key'ler hakkında fikrim yok ne olcaıgnı bilmiyoruz dıyoruz ama bu keyler birer string bılyoruz  ve [key: string] dıyoruz böylelikle o kısma. sonraısnda keylerin karsısında tip olarak ne atanacıngı bılıyoruz ama Callback[] onu yazıoyruz böylelikle böyle bır tip ataması cıkyor karsımıza.
  // this.events['gffggghhhj'] = [];bu bır ornek    [key: string] dıyerek typescript'E hangı anahtara veya anahtarlara sahip oldugunu bılmıyoruz.
  constructor(private data: UserProps) {}

  get<K extends keyof UserProps>(key: K): UserProps[K] {
    return this.data[key];
  }

  // UserProps turunde ıstıyoruz ama belkı sadece ben name'ı guncellemek ıstıyorum age'ı vermedıgımde ts kızacak bana onun ıcın yukarda ? işareti koyduk. optional yani.
  set(update: UserProps): void {
    Object.assign(this.data, update); // update'deki degerler this.data'da ki eskı degerlerın uzerıne yazılıyor.
  }

  on(eventName: string, callback: Callback): void {
    // this.events[eventName]   2 olası degere sahıp olabılır. 1. undefined 2. Callback[].
    // user create edıldıgınde  this.events boş bir nesnemiz aslında. dolayısıyla callback kaydetmeyi dusunmeye basladıgımızda on metotu yanı bu metot ıcıersınde dikkate almamız gereken 2 durum vardır.
    // user ilk create edildiginde buradakı kod satırnın undefined olması garanti edilir. ancak bu metot fonksıoyna gercek eventler eklemeye basladıgımızda sonunda bu keyler'den bazıları bize bir calback function  vrebilir. temelde her ıkı durumuda uygun sekılde ele almamız gerekıyor.
    // dolayısıyla ılk yapacagımız şey şu:

    const handlers = this.events[eventName] || []; // ilk yaptıgımız şey...

    // user create edildilkten sonra bize muhtemelen  this.events[eventName]'bunun undefined verecek. || operatoru yani Lojik Veya Operatörü ile  eğer this.events[eventName] undefined degılse onu kullancak yani değer olarak [calback] birşey kullanır. eğer undefined ise boş bir array kullanacak. böylelikle hardık handlers her iki durumdada undefind yada undefined degılse bile Callback[] tipinde bir array olacak.
    handlers.push(callback); // bu satırda da callback'ı handlers'a ekliyoruz.
    this.events[eventName] = handlers; // bu satırda da this.events[eventName]'e handlers'ı atıyoruz.
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback(); // artık sectıgımız evente göre callback trigger olcak
    });
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse) => {
        this.set(response.data);
      });
  }

  save(): void {
    if (this.get('id')) {
      axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
