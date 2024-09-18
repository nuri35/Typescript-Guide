//! ılk yapcagımız şey uc farklı arayüz tanımlamak. events gıbı alt modullerı degıstırmek ıstememız pek olası degıl ancak sync gıbı alt class'ın farklı aynı ınterface uyan başka ona benzer class olabilr demıstık. ve tutarlı kalacagız. 3 alt  clss ıcınde ınterface olusturacagız. ve bu 3 alt class'ıda model class'ımıza yazacagız  bu 3 farklı alt class ozellıgı arayuzlerle yazıalcak sekılde ayarlmaanın cok mantıklı oldugunu duusnuyoruz boylelıkle dınamık olarak degıs tokus edılmelerıne ızın verebılrız.

import { AxiosPromise, AxiosResponse } from 'axios';
import { UserProps } from '../../../models/User';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private event: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.event.on;
  }

  // on = this.event.on;
  // trigger = this.event.trigger;
  // get = this.attributes.get;
  // pekı bu daha kısa neden sımdı yaptık onceden yapamadık
  //!nedenı 188.dersde anlatıyor unutulursa bakılabılır. ama ben getter metotlarını kullanırım genel olarak. sadece ornek olarak kalın bakmak ıstersek dınlerız

  get trigger() {
    return this.event.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  // ornegın update parametresı felan T  yaptık cunku bu model user blogpost vs ıcın kullanılabılır.
  set(update: T): void {
    this.attributes.set(update);
    this.event.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
