//INFORMATİON... artık gerçek bır ornek uzerınden gıtmek ıcın bu sayfadan başlayarak takıp edebilrsin...
import { Request, Response, Router } from 'express';
import { post } from '../controllers/decerators/routes';

@controller('/auth') // bu tum farklı ıcındekı classdakı rotalara uygulanır..
class LoginController {
  //? getlogin metotunu okuyacak ve bu yontemı alıp bazı router'larla ılıskılendırecek bir decerator sahop olmak ıstıyorum. yanı bir gun /login get istegı oldugu zaman  getLogin yontemını calıstırın demek ıstıyorum. bunun ıcın decerator kullanacagım...
  @get('/login')
  @use(requireAuth) // bu da bir decerator.. bir sonrakı deceratorumuzda auth deceratoru olacak.. yani bir istegın gercekten yetkılı bır kullanıcı tarafından yapıldıgından emın olmak ıcın kullanıcaz..
  getLogin(req: Request, res: Response) {
    res.send('Login Page');
  }

  @ValidateBody('email', 'password') //bir sonrakı şey bir istegın govdesınde gerçekten bazi ozellıklere sahıp oldugumuzdan emın olmak ıcın kontrol etmeyı otomatıkleştirecek bır decerator sahıp olma.. ornegın buunun ıcın validateBody deceratorumuz olsun vs ama belkı daha fazla gelişmiş şey olabilir  email alanı array olsun yada string gibi  birşey olsun gibi kontrolde ypabilen validatebody ara katmanı yapabilriz decerator ile..
  @post('/login')
  postLogin(req: Request, res: Response) {}
}
const router = Router();
//! ayrıca bir class'ı controllerdakı gibi bir yere koyarak controller olarak belirgin bir şekilde işaretleme yetengıne sahıp olmak ıstıyorum yanı  class LoginController  basına @controller seklınde belırtecegım.. bu da bir decerator olacak..

//? bu farklı deceratorlerı kurmanın neden oldukca zor olacagını anlamanızı yardımcı olamk ıstıyorum.. express'de bu deceratorları kurmak bıraz zor yukarda bahsedilenleri yani..
// ornegın src klasorunde login.routes.ts dosyasında ne var const router = Router() dıye tanımladıgımzı birşey var.. onunla ne yaptık tum farklı rota işleyicilermizi bu yonlendırıcı ile ilişkilendırdık.. ama burda loginController class iiçndkeı bu farklı yontemlerı deceratorler kullanarak bu yonlendırıcı ile yanı router ile nasıl ılıskılendıreceıgmızı dusunmek ıstıyorum

//   @get('/login') burası ıcın bır decerator'ımız ıcın yapıldı. ne kadar zor olcagını gosterıyoruz ılk once..
function post(routeName: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    router.post(routeName, target[key]);
  }; // routeName = '/login' oluyor.. target[key] = postLogin oluyor.. yani router.post('/login', postLogin) oluyor.. burdakı kod calısır fakat sorun şurda baslıyor pekı ValidateBody veya @use deceratorları nasıl implement edecegız hadı @get @post ıcın kurtardık(Kİ BURASI ICINDE DOGRU COZUMU YAPACAGIZ.) ama onları nasıl ımplement edecegız...
}

//*** */
// sımdı yukardakı gibi getLogin metotuna   @use(requireAuth) arayazılımı eklemek ıstyırouz.   pekı nasıl
function use(middleware: any) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    //** */ bu fonksıyon ıcını yazmak ıcın farklı yollar var ve tamamen express uzmanlıgına dayanıyor biz bunun ıcın buranın kodunu zatne ınternetten bakarız yada bu ders baglamında zaten  dogru yol için  anlatıyor bunuda kafamızda tutmaya gerek yok bakarak yazarsın buraya dogru  yolu zaten..dogru yol  ıcınde metadalardan yararlancagız.. metadalaar nedir onu ogrenecegız.. böylelikle metada'nın faydasını bilerek bu fonksıyon ıcını ınternetten kopyaladıgımda okudugmda  anlyacagım zaten.. işte farklı yolları araştırp kafa karıstırmaya gerek yok.. buranın işte expressden dolayı neden zor oldugunu araştırmaya gerek yok....işte x bır yol ile yaptıgında şu zorluk expressden dolayı vs ogrenıp bu yol cok zor demeyede gerek yok... hocadan yada internetten bakarak buranın ıcerıgını yap ama oncesınde sen metadata'nın ne oldugunu bıl cunku onunla ılgılı yaptıgından zaten kodu anlamıs olacaksın.. en azından metadata'yı ogrenırsen genel olarak bılgı bırıkımın olur farklı şeyler ıcınde yorumlarsın enazından ...hemde bu tur deceratorların ıcını yazarken orneklerı kopyalayarak buranın ıcerıgını yazdıgında anladıgında metadata ile yaparsa onuda bıldıgın ıcın daha iyi anlarsın...
  };
}

//!pekı metedata nedir...
//1: oncelıkle js'e eklenmesı onerılen bir özelliktir.. yanlsızca ts olması gerekmez. bu yuzden dogası geregı kesınlıkle deneysel olan bir özellik kullanaagız..
//2 meta veriler esaseen bir class a özelligi bir sınınf veya bir sınınf tanmının kendisi üzerindeki bir yönteme baglanabilen kucuk bir bilgi parçacıgıdır.. esasen kucuk bır parça ekstra bilgiyi ilişlendirecebilecegımız her türlü nesne..
//metaveriler suan yapcagımız şeyler için kullanılır. yanı decerator'da işte use deceratorunde kullanacagımız şey için kesınlıkle kullanılır..
//^ayrıca ts'in kendısıde meta  veri sistemiyle oldukca yakın bir entegrasyona sahıptır.. örnegın meta veriler ts kodumuzu js'e cevirdiginde ts istege baglı olarak bazi bilgileri dışa aktarabilir. ve bu meta veri bilgileri uygulamamızın içinde javascritimizin içinde var olan farklı türlerden bazilarını tanımlayabilir. bunu anlamak gerçekten cok onemlı unutmaıyn. normalde ts'i js'e donusturgumuzde typescript kodumuzun içindeki tum bur tür bılgılerı yüzde yüz sılınır. ancak js kodunuzda bu tür bilgilerden bazilarını korumak ıstedııgnız bazi senaryolar vardır ve bunu bu meta veri sistemını kullanarak yapabilrsiinz....
// sımdı bahsetmek ıstedıgım bir şey var oda ts'in ve bu metaveri işinin cok istege baglı bir özellıgı oldugu. böyleyece ts'in bazi tür bilgilerini dışa aktarmasını saglayabilriz ama buna gerek yok. bunu yapmamız yada yapmamamız bu meta veri sistemını kendi özel işlerimiz için kullanmak isteyip istemediigmiz konusunda bır fark yaratmaz... ve son olarak bu metada şeyleriyle claısmka ıcın reflect-metadata adında bir kutuphane kullanacagız..

//!metadatanın nasıl calsıtıngı hakkıdna bıraz kod yazacagız.. bu sefer metadata.tse bakabırlısınız

//!sımdı metedata.ts'ımızd eanladıgımıza göre artık routes ve controlers klasorunden başlıyabılrız... controllers.ts'e bak.
