import { Request, Response } from 'express';
import { controller, get, use, post, bodyValidator } from './decerators'; //decerators/index.ts'de export ettik.. ve burada import ettik..

function logger(req: Request, res: Response, next: () => void) {
  console.log('Request was made!!!');
  next();
}

@controller('/auth') // bu controller deceratoru hangı sınıfa uyguluyorsak ona bakacaktır.. yanı bu sınfın prototipinın tum farklı ozellıklerı uzerınde yıneleme yapacak ve bu yontemlerının kendıleriyle ilişkili herhangi bir meta veriye sahip olup olmadıgını kontrol edecektir.. bunu yaparlarsa bu meta veri bilgierlni alacak ve bazi ekspress yonlendırıcılerle ılıskılndırecektir..
class LoginController {
  // @get('/')
  // addx(a: number, b: number) {} artık hata verir. @get('/') ksımı

  @get('/')
  add(req: Request, res: Response) {
    res.send('ok');
  } // ıstek geldgınde bu fonksıyona gırecek ama muhtemel sunucumuz askıda kalacaktır... a ve b degerlerı yok birde clıenta bir respons donmuyor gordugun uzere... ayrıca buyuk sorun burda bır error gormememız.. doalyısyla deceratorumuze bır sekılde yanlızca bir istek ve yanıt alan ve sonra belkide hıc bırşey dondurmeyen bir işlevde kullanbilcegını soylemenın bır yolunu bulmak ıstıyorum.. decerators/routes.ts'e bak.. orada bu sorunu cozecegız.. kırmızı ile yazıldı orda.. orda ayar yaptık ve burası kızdı artık böyle bir  @get('/') şey yazıldıgında oyle bir add metotu yazmaya izin vermez yoruma aldık yada işte parameterede illa req: Request, res: Response vs aşagıdakı gıbı metotlar yazmamız gerekır herşey okkkk

  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response) {
    res.send('Login Page');
  } //? buradakı amac bir şekilde bu getlogin metot uzerınde bazi meta veriler tnaımlamaktır. bu oturum acmak ıcın her get istegi yaptııgmızda /login endpontne. bu yontemın  getLogin metotun cagrılması gerektıgını söyleyecektir. kendımız deceratorları olsuturcagız..

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    // artık decerator ile body validasyonundan gectıgınde burda onun var oldugun bılıyoruz

    if (email === 'hi@.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

// sımdı uygulamızı bu yenı tur decerator tabanlı sozdızımı ıle calıstırdık... index.ts'de import ederek oke...
