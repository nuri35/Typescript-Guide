import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

interface EventingUpper {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
// bır kullanıcı olsuturdugumuzda olayları ıslemek ıcın kulanabılcegımız bır modul bır sınıf yada bır nesne ekleyebıldımızden emın olmak ıstıyoruz. option 1 ile başlıyoruzç..

//! option 1
export class User {
  constructor(public event: EventingUpper) {}

  static fromDataEvntingVs(data: UserProps): User {
    return new User(new Eventing());
    // user.set(data); // new User(new Eventing()); burası degısebılır sorun yok ama alt satırlarda cok fazla configrasyon ayarı yapılıabilir. sorun olabilir. yada diyelim   new User(new Eventing()); kısmı degıstırmedk yeni static metot yazıp oraya yeni  new User(new SuperEventing());  dedık aynı configrasyon kodu alt satırda yenıden yapmış olcan hata yani. en guzel inilize edilen bır class yazarsın confıgrasyonla ilgili constructor ıcınde tetıklenır  böylelikle bu sıkıntılardan kurtulursun. ama yıne bır config ayarı yapmış oluyorsun.  option 2 senecengı yapacaz nedenını orda anlattım. birde data: UserProps'ı constructor'da bekleseydım  bu yapıda  static fromData  metotun ıcınde newUser'da parametrede vermek zorunda kalırdım.  new User(new Eventing(), { name: 'ali', age: 20 }); gibi yani  new User(new Eventing(), data); gibi static fromData(data: UserProps) seklınde oncesınde beklerdım tabi. yanı yıne fromData'yı dışarda cagırırken parametreye data'yı verırdık. bu sekıldede user.set'den kurtulabilirdim. yanı bu yapı benım işimi görürdü.user.set(data); ayarını yapmayıp bu sekıled confıgrasyondan kurtulsak dahi başka şeyler yazabilirdik static metotun ıcınde yada contructor'Da global bir config metotu yapsak dahi yıne bir config process uygulamış olurduk. bızım case'E göre bu yapıyada gerek yok.
  }
  //? static fromData2SuperEventnig(data: UserProps): User {
  //   const user = new User(new SuperEventing());
  //   user.set(data);
  //   return user;
  // }

  private data: UserProps = {};

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

const test = User.fromDataEvntingVs({ name: 'ali', age: 20 });
test.event.on('change', () => {
  console.log('change');
}); // burası okey option 2 yi ypaacagız...... ode option 2 klasorunde...

// option 1.1
export class UserOption1 {
  constructor(private data: UserProps, private event: Eventing) {}

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
// option 1.1 //  iyi bir seçenek fakat iyi bir yaklaşım degil
// her user create edildignde  birde  new Eventing() dememız lazım parametrede . new UserOption1(new Eventing(), { name: 'ali', age: 20 }); gibi
// buda farklı işlevsellik parçalarını yeniden düzenledıgımzıde  yani yeni bir parametrede yeni bir interface kuralı belirttigimzide bunları farklı arguman olarak eklememız gerekecek yani new UserOption1(new Eventing(), new Attiribues(), { name: 'ali', age: 20 }); gibi
