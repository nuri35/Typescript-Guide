import axios, { AxiosResponse } from 'axios';
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
// adım adım refactoring yapıyoruz refactoring with composition olayı = red rengindeki aşamalar.
//! eventing diye bir class olusturup on ve trigger metotlarını oraya aldık işte anahtar burada. yani bır user create edıldıgıınde eventleri işlemek için kullanabilcegımız bir modul bir class ekleyebıldıgımızden emın olmak ıstıyoruz. işte User class'ında constructor'Da interface yapımız sadece event için event:EventInterface seklınde olcak ornegın eventing class'ı bu yapıya uyacak ve ona referans olacak.
// ? .......

export class User {
  constructor(private data: UserProps) {}

  get<K extends keyof UserProps>(key: K): UserProps[K] {
    return this.data[key];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
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
// DERS 162 ^dE KALDIN EN BAŞTAN YARIN DEVAM EDERSİN MESAİDEN SONRA.. kırmızı ıle yazdıgın yerı yenı yazdım suana kadar vıdeodan anladıgın ve anlatılana göre. 162.dersde 1.sanyedesin ordan başla dıkkatlıce
