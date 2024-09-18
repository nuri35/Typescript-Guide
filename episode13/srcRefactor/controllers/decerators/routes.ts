import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
} // burası bızım ııcn ne anlama gelıyor.. bir arayüz bir rota işleyici tanımlayıcısı olarak nitelendirlmek istiyorsanız verilen tüm bu özellikleri karşılamanız gerektigini söyler... yanı bir value property'iniz var ise bunun istege baglı oldugunu söyluyor. ve RequestHandler turunde olmalıdır. buda demek oluyor ki aşagıda function (target: any, key: string, desc: RouteHandlerDescriptor)  kısmını cagıroyrsak  sadece bir şey aktarabilriz yada deceratorumuzu bu arayüzü karsılayan  yanı RouteHandlerDescriptor interfaceini karsıyalan bir özellgge uygulayabilriz. böyle yaptıktan sonra zaten
//  @get('/')
// add(a: number, b: number): number {
//   return a + b;
// }  loginController.ts'de hata verdi burası   @get('/' kısmı kızdı yanı

export function routeBinder(method: string) {
  return function (path: string) {
    // burdakı paremetre @post('/login') bu ornektekı (path: string) kısma denk gelır..
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      // key output getLogin, getPost, getDelete, getPatch gibi metotlar.. o an deceratoru uyguladıgın yerdkeı metot aslında..
      // target output { getLogin: [Function], getPost: [Function], getDelete: [Function], getPatch: [Function] } bu da o an deceratoru uyguladıgın yerdeki class'ı temsil eder.. ama output'da obje ıcındekı metotları belırtır. target deııgmız o ankı nesnenın prototyp'larıdır.  3.PARAMETREYE path metaveri isimli metaveriyi hangi class'a  ekleyecegımzı söyluyoruz. aslında target diyoruz.. target dıyerek aslında o class'ın kendısı oluyor işte . 4.parametreyede key diyerek o x class'ın içindekı deceratoru koydugumuz metotun ısmı oluyor işte ve böylelıkle o metota metaveri eklemıs oluyoruz.. degerıde path olan vs...
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);

      //?yine 1.parametre metaverinin ismi.. 2. metaverinin degeri.. 3.parametre ise bu metaveriyi atmaak istedigimiz nesneyi ve 4.parametre ise bu nesne uzerındekı anahtarı tanımlamamız gerekıyor oda 4.parametre olarak deceratoru uyguladıgın metotun ismi oluyor aslında.. 3.parametre olarak ozaman ornegın LoginController ıcınde deceratoru kullandıgımda 3.parametre LoginController class'ı olmus olcak ne güzel...
    }; //defineMetadata metotunda 3.parametre bu meta veriyi atamatk ıstedıgımız nesneyi belirtir .ve bu nesne uzerındekı anahtarı tanımlamamız da 4.parametredir.
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put); // bu sekılde yukardakı fonksıyonumuz her metot ıcın kullanmıs oluyoruz
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch); // parametrelerı hardocded olmasın enumdan okuttuk. ve   Reflect.defineMetadata('method', method, target, key); burda  method degerı enum olacagını garanti edıyoruz aslında..

//for post request
// export function post(path: string) {
//   return function (target: any, key: string, desc: PropertyDescriptor) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   };
// }
// bu sefer delete olsa delete ıcın mı decerator ıcın bır fonksıyon yazacagız bu bıraz kotu olur. yoruma aldık onun ıcın yukarda dışarda routeBinder metotu yazıyoruz...

//! desc: PropertyDescriptor kısmımız vardı neydı hatırla yazılabilir yapılandırabılır vs bir ozellıge sahıp bir nesne olacak... bıızm ıcın en onemlısı bır deger özelligi.. ve bu deger özellgii deceratorumuzu uyguladııgmız gerçek fonksıyon gbi bazi gerçek fonksıyonlara bir referans olacaktır.. dolayısıyla yukarda kucuk guncelleme yapıldı.. RouteHandlerDescriptor adında ınterface olusturuldu.. desc: PropertyDescriptor yerıne  desc: RouteHandlerDescriptor yapıldı..
