import 'reflect-metadata'; // her dosyada ımport et...
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// export const router = express.Router();

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }

    next();
  };
}
//TODO GELDIGIMIZDE BURAYI AYNI SEKILDE DUSUNREK OUTPUTLARI YAZARAK CALIS ROUTES.TS GİBİ. BİTİR..
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance(); // bunu en son yenı yazdık sadece ıcerde ıhtıyacımız dahılınde global biryerden cagırıyoruz..

    // unutmayın bir deceratoru bır sınfın kendısıne uygulamdıgımızda buradakı LoginController gibi. (target: Function ) yaptık. bu bızım kurucu fonksıyonumuz olacak. genellıkle bir metoda veya ozellgıe decerator uyguladıgmızda bunun yerine prototip olacaktır.. ancak burada sınıfın kendısıne uyguladıgımızda bu bır fonksıyon olacak.. yanı aslında console.log(target) output olarka : ne çıkar :
    // [Function: LoginController] bu cıkar ornegın.. target: Function bu sekılde tıp ataybilirz..
    // ulaştıgım target.prototype da bir array o class'ın coklu prototype'larına erişiyorum for ile donuyorum.
    // target output: [Function: LoginController]
    // target.prototype output { getLogin: [Function], getPost: [Function], getDelete: [Function], getPatch: [Function] }
    for (let key in target.prototype) {
      // key output getLogin, getPost, getDelete, getPatch gibi metotlar..

      const routeHandler = target.prototype[key]; // output  { getLogin: [Function] } // ılgılı keydekı degerı o metotu alıyoruz.. yani getLogin metotunu alıyoruz.. örnegın.
      const path = Reflect.getMetadata(
        MetadataKeys.path, // buralarıda yanlıs yazabılrız onun ıcın enum yaptı..
        target.prototype, // hangı class oldugunu belrııyorum ve ıcındede output verıdgımde metotlar var. bunuda  target.prototype olarka yazabılrım definemetadata'da ise target yazıyordum buraya unutma..
        key
      ); // output /login
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      ); // output get
      // sımdılık dogrudan bu dosyanın ıcınde yenı bır yonlendırıcı olusturacagım.. ve ardından tum bu farklı rotaları bu yonlendırıcıya ekleyecegım..
      //! burda ulaşamayacagımız şeyleri metaveri uzerınden alarak yapıyoruz...
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      //! middlewares birden cok olabilir array olarak gelecektır deger. ayrıca array boşda olabilir. sorun yok en altta router'a koyuyurouz..
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        []; // output [ 'email', 'password' ]
      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        // bu sekılde dınamıkleşmiş oldu.. ama router[method]'da method'un tıpını belırtmessen router.get post delete gibi şeyler sadece olcagından belırtmek lazım dolayısyla  const method: Methods seklınde yukarda tpini belırttık router[method] seklinde yazdıkdgımızda sadece router[get] router[post] router[delete] gibi seyler olacaktır...
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}

// buranın calısması ıcın index.ts'e bak oraya import ettık

//!en onemlı sorunlardan biri yukarda export const router = express.Router(); bunun olması. controller dosyanın ıcınde bir yonlendırıcı olusturyoruz. ve bu yonlendırıcıye uygulamamızın ıcındekı dıger yerlerden erişmek controller yada basitce deceratorler giib bir diiznle ulaşmak zorunda kalmadan potansiyel olarak biraz zor olacaktır. dolayııyla bu yonlendırıcnın suanda uygun biryerde tanımlanmadıgının dusunuyorum. oda src de appRouter.ts de olacak global merkezi yerde...
