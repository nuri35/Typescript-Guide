//  ts'in amacı sınıfları kulanmkak ve bu sınıfların oncelıkle arayüzleri kullanarak birbirleriyle calısmaısnı saglmaktır. sınıflara yüzde yüz dayanan ve bu sınıfların arayüzlerle gibi birşeyle birlikte calısmaısnı saglayan  ne kadar javascript yazdınız.muhtemelen fazla degıl hıc degıl..

//artık şimdiye kadar ogrendıgımız her şeyi nasıl alabilcegımızı ve tum bu fıkırlerı suanda zaten calısmakta oldugumuz kullandıgımız backend kuutphanelerınde nasıl uygulayacımızı anlamak istiyoruz.... işte asıl büyük sorun. ts ile nesne yonemlı programalam kodu yazıyoruz.. sınıflardan compositonlardan inheritance'lardan vs yogun sekılde yararlanıyoruz.. normal linkedınde paylaştıgım ornekler ıcın vs  kullanıyoruz belkı bir backend servisinde bazi yerlerde kullanıyorum backend ıcerısınde ama backend konusundan bagımsız. yerlerde kullanıyorum vs..... buyuk sorun bu populer js kutuphanelerının bır cogunun js'in kendısı es2015 ile sınıfn fıkrıne sahıp olmadan cok once yazılmıs olmasıdır ornegın express gibi. tabı  es 2015dekı sınıfnların orjınal progralmalma anlamında ts'dekı classlar gibi ornegın geleneksel sınıflar gıbı olmadıgını bılıyoruz..

//örnegın  populer js kutuphanelerının bır cogu sınıfları kullanmak populer olmadan once yazılmıstır.. gercekten bunun en guzel ornegı express kuutphanesıdır.. yanı yıne ts oop vs express ıcerısınde express backend kuutphanesındekı ozellıkler olan router controller service app.ts dısında başka amaclar ıcınde kutuphane ıcınde kullanabılrız bunda sorun yok ama express'in ozellıklerını ıceren şeyler baglamında  ts'i kullandııgmızda sorunlar cıkıyor .. işte bu tur uyumsuzluk nedenıyle bazen ts'i populer bir js kuutphanesıne entegre etmek gerçekten zor olabilir.. bunun ıcın bazi maddeler var.. işte şunu dusunmelıyız express gibi kutuphanelerde expressin kendı özellikleri olan kısımlarda ts'i nasıl kullanabilriz bir araya getireiblriz onu dusunecegız..

//! genel olarak ts'i(ts ile amacımız class'Laırı kullanmktır unutma) bir js kuutphanesı ile kullanmak ıstedıgımızde kullanabilcegımız 3 fakrlı cozum olacaktır..
//1: normal kutuphaneyı kullan ve ts'i tip atamalarında vs kullan sadece işte... genel oalrak sınıf olusturma yada arayüzlerden yararlanma gibi konular hakkında endişelenmeyecegız.. express ozellıklerı dısında service içerisinde ek birşey yazdıgın yerlerde bile hiç ibryerde class'lardan yararlanmayacagız vs vs.. sadece tip atamaları kullanacgız. gerektıgınde o kuutphaneını programlama sitiline geri donecegız...--- İLK BU DENENECEK...---  ****login.routes.ts dosyasına bakabilirsin...

//2:birisinin kullanmaya calıstıgınız kutuphaneyle calısmak ıcın zaten yazmıs olabilcegı bir ts adaptör kutuphaneısnını kulanmaya calısmaktır..birileri ts-express-decerators diye  kuutphane yazmıs.... .--- YAPILMAYACAK...---

//3 senecek ise kullanmaya calsıtıngız kuutphane ne olursa olsun kutuphanenızın canına okumak ve typescrit sınıflarıyala calısmaısnı saglamaktır.... bu herhangi bir sınınf tabanlı yaklaşımı benımsemeyen bir kutuphaneyle calısıyor olabilcegımız en uc secenektır ornegın express.. gerçekten canına okuyacagız ve sınıflarla calısacagız.. ha zaten js kutuphanesı olan express'de express'in özelliklerinden bagımsız service'lerde ornegın response modeller vs express'in ozellıklerı dıısnda bazi yerlerde ister express olsun ben yıne class'larla calıstım(bır nevi ordada canına okumus olduk) ama express'in ızın verdıgı soz dızım yerlerı olsa dahi router controller gibi yerlerde typescriptin class'ları kulanarak canına okuyacagız kutuphanenıın ---- SONRA BU DENENECEK....---ve en uygunu ve en zoru bu olacaktır... ama en dogrusuda budur...

// ***********************

import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['tyuyuds'] }));
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
