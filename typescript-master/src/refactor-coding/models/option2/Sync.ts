import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { UserProps } from '../../../models/User';

//!!! export class Sync {
//   constructor(public rootUrl: string) {}
//   fetch(): void {
//     axios
//       .get(`http://localhost:3000/users/${this.get('id')}`)
//       .then((response: AxiosResponse) => {
//         this.set(response.data);
//       });
//   }

//   save(): void {
//     if (this.get('id')) {
//       axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data);
//     } else {
//       axios.post('http://localhost:3000/users', this.data);
//     }
//   }
// }
//? bir çok kod var ve this.set ve this.data bize hata veriyor. user class'ında bulunan bazi özelliklere başvurmaya çalışıyor.bu class ile x class arasında çok iyi tanımlanmış bir ilişkiye sahip olmamız gerekıyor. çünkü x class sync class olmadan dogru calışamaz X'class'daki data objesi güncel olmaz. ayrıca sync 'de X class olmadan dogru calısamaz cunku this.set ile vs guncelicek ama o an X'class olmassa nasıl guncelicek birbirlerine ihtiyaçları var yani... her iki class'ında birbirlerine tür bagımlılıkları var.  ŞUANLIK X = USER CLASS ama başka bir class'da olabilir.

//todo 1.yoldan gıderek 3.yola dogru bu class'ı refactor edecegız
//1.yol
export class SyncRefactor {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
  // bu class'ı aktaracagımız interface dekı save metotu suan statık data:Userprops ıstedıgını dusunursek suan save metotu boyle paramtreler alıyor durumda sorun yok. burdakı ınerface kuralından dolayı burdakı parametre cok kotu hal alır soyle
  // save(data: UserProps | BookProps | CarProps): void {} interface'dede soyle olur export Sync interface { save(data: UserProps | BookProps | CarProps): void; fetch(id: number): void; }
  save(data: UserProps): AxiosPromise {
    if (data.id) {
      return axios.put(`${this.rootUrl}/${data.id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}

//1.yoldu kullanarak sadece generic class haline cevırecegız

interface HasId {
  id?: number;
}

export class SyncRefactorGeneric<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    if (data.id) {
      return axios.put(`${this.rootUrl}/${data.id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
} // sync'de bu sekılde user class'a birleştirme yoluna gittik. sorun yok.
