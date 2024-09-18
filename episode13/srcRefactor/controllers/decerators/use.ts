import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

//use adında decerator olusturyoruz middleweare eklemek ıcın.. en dışdakı fonksıyon use(middleware: RequestHandler) burası bızım atacagım ara katman degerı.
export function use(middleware: RequestHandler) {
  //return functıon dedıgımız  bu nesnenın prototipi olacak bir targett cagrılacak olan asıl deceratordur
  return function (target: any, key: string, desc: PropertyDescriptor) {
    // ılk getMetadata dıyoruz..
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || []; // target, key ile hedef nesneye ve ozellıkle anahtar ozellıgıne bakmak ıstıyoruz.. sonuc output : [ [Function (anonymous)] ] array ıcınde depoluyor cunku mıddlewarelar bırden fazla olabilir..
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware], // deger olarak olan mdiddleweare uzerıne yanına yanı bızım parametredekı mıddlewearı ekleyecegız.. ve bunu bır array ıcınde depolayacagız..
      target,
      key // buda class ıcındekı hangı metot'a ise ona bu metaveriyi eklıyor..tabı bu metaveri degerı olan ara katman birden fazlada olabilri..
    );

    // sımdı ara katman dızınını alıp metada nesnesıne geri atacagız..
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
// sımdı son olarak bunu tamamladıysak controller.ts'e gıdtmekdir.. controller deceratorunu calıstırdıgımızda bu ara yazılım araçlarını cıkardıgımızdan ve bunları istek işleyiicmize bagladıgımızdan emın olmamız gerekır.
