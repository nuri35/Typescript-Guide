import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
} // Request ınterface'ındekı şeylerde bu ınterface'de gecerlı oluyor... sadece body'ı kendımız belırledık..

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(
    `
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
      `
  ); // cok onemlı degıl ıcerık oyle bır html dondurduk
});

//! index.ts'de anlatılana göre 3 senecek2i yapmadan once burda saf express'in bize izin verdigi kadarını yapıp sadece tip ataması yapyıoruz yanı 1.secenegı ardından sadece burda ekstradan konudan bagımsız bazi bilgiler paylaştık. aşagıda 29.satırdan itibaren..
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
});
// ister inanın ister inanmayın buradaki dört satırlık kod router.post yani ve muhtemelen daha spesifik olarak  const { email, password } = req.body; bu kod satırı typescriptin bu populer js kuutphaneleriyle (bodyparser library)güzel bir şekilde bir araya getirmenin neden gerçekten zor olabilcegını tam olarak anlamanıza yardımcı olacaktır...

// burda ilk işey req.body nesnesındekı body ozellgının nereden geldıgını vurgulamak.bir istek geldıgınde body parser sayesıned request objemızde body key vaue kısmı var oraya body'dekı alanları koyar. body alanıdna her turlu bılgıyı ıcerır tabıkıde. tıp olarakda any yanı ReqBody = any, fakat ara katmandakı bodyparser mıddlewearı olmaz ise req.body diye bir alanın olmadıgını söyleyebilriz. ama tyepescriptde ona ragmen yinede type definatıon dosyamızda req.body: any diye birşey oan ragmen gorunur....ve istek  attıgında body parser ara katmanı olmadıgı ıcın o an calıstırmadan oncde typescript uyarmadıgı ıcın calıstırınca ınputdakı alanları body'ye koymadıgından  calısırken req.body undefıned oldugu ıcın hata verecek service içersiinde. ama isterdikki body parser ara katmanı kapattıgımızda type definatıon dosyasında  kızması gerekıyordu onun gibi buda type definatıon dosyalarının dejavantajlarından biri... yanı soyle oluyor req.undefıned.email gibi ulaşılmıs oluyor calısırken..

// typepscriptin en onemlı ıslerınden bırı bır objenın sahıp olduug farklı ozellıklerı anlamaktır degılmı.. bunu bılyıoruz. ts bu objenın sahıp oldugu farklı ozellıklere ve turlere bakar ve kodunuzun bır sorun olup olmadıgına karar verrır. ara katmanın gorevı ise yanıt olarka bazi nesne isteklerini almak ve ondan ozellıkler eklemek kaldırmak veya degıstırmektır. bu typescript'in yaptıgı işe yüzde yüz bir ters durumdur.. bunun bu   kadar verımsız ve  uygunsuz olmasının nedenı kullandıgmız bu aaaaaaara yazılımların tamda javascripte uygun olmasıdır. ve ts'inde hangı ozellıklerın  eklendıgını veya kaldırıldıgı konusunda hıcbır fıkrı olmadıfıdır.

//! type definatıon file'rın ne oldugunu hemen hatırlamak gerekırse type definatıon file'lar typescript'e bu js dunyasında olup biten her şeyi gerçekten anlatmaz. onun yaptıgı tek şey bir js kutuphanesının bize sundugu farklı ozellıkler hakkında  bılgı vermektir. ve ona göre kodumuzu kontrol eder. ornegın express typede defınatıoon file'a gıtıgımızde bir request bir response bir router objelerın oldugunu gorutoruz. bize bu nesnelerın sahıp oldugu tum farklı ozellıkler ve sahıp oldukları farklı yontemler hakkında bılgı verır onun dısında bır tıp ataması yaptıgında uyarır.... Ama ancak typescipte bu işlevlerin(requst response handler cookieoption gibi tanımlar) içine eklenebilcek farklı türler veya gorunuste farklı özellikler hakkında hicbirşey söylemez.. bu type definatıon file'da her hangi bir işlevin içinde neler olup bıttıgıne daır hic bir bilgi içermez.. yanı request objesınde body alanı su durumad soyle alcak gıbı bir şeyi içermez..

//? yanı tum sorun bir tür tanımlama dosyamız olmasına ragmen bir mıddlewear'ımızın olmaısdır.. ara katman ile bu farklı objeler uzerındekı bu farklı ozellıklere serbestce ekleme kaldırma veya herhangı birşey yapılabilir... buda ts'Eın bızım ıcnı yapmaya calıstıgı şeye yüzde yüz ters bır durumdur.. yanı anlamamız gereken şey middleweare işlevlerinin(js ile yazıldıgından ts mantıgı yoktur) genel oalrak işlemden gectıkten sonra ele alınmasının gerçekten zor oldugudur..  ara yazılım yanı bır mıddleweare  JavaScript kodunda yazılmışsa, TypeScript'in orada ne olduğunu anlaması zor olabilir." buna en ıyı ornek bodyparser middlewear'ıdır... body parser ara katmanı request objesıne ozellıkler eklıyor ve ts'in bunun gerceklestıgınden haberı bıle yok. yanı hayal et body parser ara katmanını kapattım yoruma aldım ve yukarda router.post'da req.body dememe ragmen hıc bır hata vermedi.. zaten ts geliştirme ortamı oldugu ıcın o ara katmanı calsıtırmadım sadece yoruma aldım... req.body dedıgımde bana kızmadı işte type defınastıon dosyası statıc onceden tanımlanmıs dosyalardır.... ara katmanı kapattıgımda req.body dedıgımed hıc bır uyarı almadıgımı gorurusn. ts bunun kapattıgında yoruma aldıgımızda ne olup bıttıgını anlamaz ts type definastıon dosyasına bakar dırek ne yazıldıysa.. pekı neden typescript tanımsız olabilecek bir ozellık yanı req.body dıye bır sey olmayan ozellık konsuunda tamamen sorunsuz gorunuyor diye dusunuyor olabilrsiniz

//****s *

//! 1 .sorun işte ts'in bu ara katman yazılımların (body parser orengın) ıcınde neler olup bıtıggını hakında fıkrı olmamasıydı. yanı body parser yoruma aldım o an ts ne olup bittigine dair fikir ayrımı yapamaz... sadece ts type defınatıon dosyasındakı tanımlamalara göre hareket eder...
//!2: sorun ise unutmayın type tanımlama dosyalarından yararlanıyoruz. ve bıze tum hıkayayeyı tam olarak anlatmıyor.. yanı bodyparser yoruma aldıgımda request objesınde body diye bır ozellgıın olmaması gerektgıı gıbı işte ıkıcnı sorun ise bazen bize yanlıs hıkaye anlatmalırıdır. yanı req.body: any demıs sankı zorunlu bodyparser kullanılıyor gibi belkı bodyparser yok yada var ama req.body'yi kaldırdı. ama type defınatıon dosyasına baktıgımad req.body : any dıyerek hep varmıs gibi hikaye soylyor bize.

//? yanı ben gelıstırme ortamında bodyparser ara katmanını kapattıgımda tip tanımalam dosyasıda ona göre algıalyıp benım req.body yazdıgım yerde daha gelsıtırme ortamında buna kızması gerekse guzel olurdu. index.d.ts'e gıttıgıdme type defınastıon dosyasında req.body : any dyie gorunup ilginc bir şekilde birde yüzde yüz body ozellgııne sahıp olacagı ve türünün any alacagını soyluyor.. yanı demekkı bu tur dosyasını kım yazdıysa bızım adımıza büyük bir varsayımda bulunuyor.. yanı sankı ara katmanda gercekten bodyParser ara katmanını kullanıcak dolayısyla body alanını olacaktır diye.. en kotusu any | undefined diye bilrdi tam hikayeyi anlatamıyorsa yani..

// ama bodyparser ara katmanı kullanmassak request objesınde body ozellıgı olmuyacaktır. buda tur tanım dosyasının yüzde yüz yanlıs oldugu anlamına gelır..

//**** */
//!Sonuc olarak express'in ts ile guzel sekılde calısmasını saglamak ıcın 2 buyuk soruna degındık
//? ilk buyuk sorun middleweare ornegın body parser işte genel olarak bu isteklerde farklı ozellıklerı degıstırmeye veya eklemeye yada cıkarmaya calısmasıdır. ve ts'deki request objesı type definaston dosyasındakı işte request response objelerın bu farklı özelliklerin varlgıı veya degısıklıgı hakkında bılgılendırılmesının hıc bır yolu yoktur..

//?ikinci sorun ise yukarda router.post'da bır tür tanımlama dosyasında faylanıyor olmamızdır ki bu tamamen samımıyetsızlıktır.. bize yalan soyluyor. bodyparser'ı yoruma aldık cunku.. belkı req.body yok undefned durumda ama tip dosyası any diyor sonuna kadar..

// doalyıslya ts'in cok populer bır kutuphaneyle guzel bır sekılde calısmasını saglmanın neden cok zor olabilcegını daır cok farklı iki nedendir.

// özetle tur tanımlama dosyalarının tek başına bir js işllevinin içnide neler olup bititgini gerçekten ifade etmemesidir. example : middleweare, sadece bir jsavascript fonskıoynun var olabilcegını bildirir. bunun en buuk sorunu ise ara katman işlevi olarak ara katman yazılımının özelliklere ekleme yapabilmesi veya özellikleri kaldırabilmesi vs ve işte typescriptekı nsnenın buun gerçekleştigine dair hic bir fikri yoktur yanı type definatıon dosyasının .... buda cok kolay bir şekilde typescript koduumuzun içinde var oldguunu dusundugumuz ancak gerçekte kaldırılmış olabilcek özelliklere başvurmaya calsıtıgımız veya bir ara katman yazılımı tarafından eklendıgnı bildigimiz bir özellige başvurmaya calsıtımgız sorunlara yol açabilir.......
// ancak typescript söyle der hey bu nesnenın bu ozellıge sahıp oldugunu sanmıyorum cuku typescript bu işlevin ıcınde neler olup bıtttıgını bılmıyor..

// uzerıne bastıgım ıkıncı sorundda bu tıp dosyalarının her zaman dogru olmadıgıdır... en guzel ornegıde request interface'lerdir. kım yazdıysa req.body kısmı any demıs ve ara yazılımı kullandıgımızı varsayarak gerçekten buyuk bir varsayım yaptı...

//--------KAL 1 SAAT SONRA GEL..

//! sımdı typescripin express ile calısmasını saglamının bazen okadar ıyı olmadıgını tartışmamızın 3.nedenı ise sunucumuza dışarıdan bır bılgı kaynagı saglandıgında bu bilginindogru  bir şekilde olusturulup olusturulmadıgını bılmememızdır. yanı bır form gonderımı aldıgımızda post istegı gerçekte saglanmamıs olabilecek bazi özelliklere sahip oldugunu varsayıyor olabilriz. dışarıdan bılgı alan herhangi bir backend bir program bu dış bilgi kaynagının beklenen tum özelliklerinin yüzde yüz dogru oldugnu varsayamaz.. benım fıkrımce bu sorunun daha da kotuleştigi yonunde. yada tür tanımlama dosyası tarafından daha kotuleştirildi.

//!sonuc olarak yukarda yazdıgım 3 sorun da tur tanımlama dosyalayıla ılgılı. unutmayın burada tum tartısma typescriptin artık populer javascript cerceveleryle nasıl kullanılacagı hakkındaır. typescriptin javascript çerçevecelri ile guzel bir şekilde calısmasını saglamak ıcın sahıp oldugumzu araç ise tip tanımlama dosyalaırdır.

// yanı amacımız type defınastion dosyalarının bazen nasıl yetersız kaldıgnı anlamamız gerektıgıdr..  neyse boylece sunucumuzun gecersız gırdılerı kabul etmede bır sorun yaşadıgını ve bu soruna yardımcı olunmadıgını görecegız.. tip tanım dosyasında kucuk bir degişiklık yapıp bu sorunu cok daha iyi bir sekılde cozebilecekken tip tanım dosyamızdan hic bir yardım alamıyoruz..

// yukardakı router.post'da gerı donelım ve aşagıda bunu anlatıyoruz..

router.post('/loginx', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // burda email  normalde any durumda

  //?  res.send(email.toUpperCase()); // burda email'in string oldugunu bıldıgımız ıcın toUpperCase metodu cagırabılırız. ama varsayımda buyuk varsayımda bulunuyoruz aslında req.body nasıl any ise body ıcındekı'lerde any tıpınde sadece strıng olacagını varsayıyoruz

  // ayrıca req.body'de email ve password diye 2 alanın oldguunu varsayıyoruz.. form'dakı ınput alanlara göre.. ama sadece varsayıyoruz..
  //! bır an ıcnı tamamen gecersız bır formla bazı bılgılerın gonderıldıgını dusunelım. belkı yanlıs adlandırılmıs bazı ozellıklerı vardır ornegın em psw alanları yollanıyordur req.body'De. dusnursek bu sefer undefined.toUpperCase seklınde doner bıze. işte buradakı sorunum suanda ts'in bize bu kodla ılgılı bir sorun olabilcegıne dair bir gösterge vermemiş olmasıdır.

  //? oylese tıp tanımlama dosyasıdna yapabilcegımız ve tum bu sorunu sorun olmaktan cıkaracak kucuk bır degısklıgı araştıralım... sımdı req.body ye gıttıgımda any tipinde oldgunu soylyuor yardımcı olmuyor pek fazla. bizde type definastıon dosyasını degıstırmeyı deneyecegız.

  // index.d.ts type definatıoon dosyasıdna body: { [key: string]: string |  undefined; }  olarak degıstırelım. işte o an email.toUpperCase kızacak undefined'Da olabilir dıyecek if koyarak bunu haletmiş olcaz

  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.send('You must provide an email property');
  } // typescript sayesınde tip tanımlama dosyası sayesınde onceden kuralalr ona göre belırlenmıs bendeo na göre tip tanımlama dosyasıan göre yazdıgım ıcın artık bırısı gecerszı bır form gonderdıgınde  kesınlıkle karsılasacagım bır sorunu cozdum.. yanı type definastıon dosyasına kucuk bır ayar cektım bu ornek olması amacıyla ve  service içerisinde req.body.key body ıcınde obje ıcınde kım hangı key olursa olsun undefined olabilir oldugundan tıp tanımalam dosyamızda burda hata vermıs olur. daha calıstırmadan böylelikle gercekten undefined gelme durumudna if'e girmez... hata verdıgı ıcın calıstıramam doalyısyla if koyarak ayırırım olayı.. calıstırma ortamındada hıc bır sorun yaşamam.. cunku req.body: any dıyor kendımde bu durumda if koyarım fakat ben daha typescript ile kodu yazarsak  email.toUpperCase() kısmında if koymadan bunu yazdıgımda hata vermesını ıstıyorum... ondan yaptık. böylelıkle uyarı vermıs oldu calıstırtmadı bana bende unefıned'a gore aksıyon aldım if koydum if else koydum vs... böylelıkle undefıned durumunda sunucu bazınad bir hata ile karsılasmadım...

  // tabıkıde burada type definatıon dosyasını degıstırdık bu yanlıs onlara mudahale etmeyecegız orengını yapacagız... ne ypacagız request objesını genişletecek yenı bır arayuz olusturacagız... RequestWithBody adında olusturdum request objesı ile extends ettım..

  // yanı aslında express js kutuphanemız ile istek gelırken type definasyon dosyalarını kullanırken soruna dıkkat çektik bu sefer ıstek atarken body'de burda email atılmayabilir.. biz istemezmiydik req.body: any | undefıend olsun böylelikle degerde unedfıned olma ihtimaline göre type definasyo dosyası benı uyararak express'de duzgun yazmıs olurdukk... ama maalesef resmi tip tanımlama dosyası bazi şeyleri dogru gostermıyor... ve ıstek atarkende maalesef sorun yasıyoruz işte..  ha söyle sorun devam edıyor email alanı belkı array gelcek [email, email].toUpperCase dedıgımızde  bu js express istek attgıında böyle olur patlar oysaki tip tanımlama dosyamız o gıbı durumlar ıcınde bızı uyarsaydı keşkee
});

// işte iiyi olmayan tur tanımalam dosyalarıyla calsıırsak sorunlar cıkabilir.. genel olarak tip tanımlama dosyalarını degıstıremeyız o an duruma göre tip tanımlama dosyalarında aktif birşey degiştirilemez.o an nasıl tanımlandıysa odur... bir çıkarım yapılamaz sadce işlevler hakkında tür bilgilendirilmesi alırız.

router.post('/loginxNew', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body; // email vs string yada undefıned dıye gosterir typescript undefıned da olabilcegını soyler uyarır bızı ondan if koyarız. okey.. ama şu var email string'de olabilir diyorda belkı email array ıcerısınde gelıyor bılemeyız..... buda bır sorun... ama eger req.body:any olsaydı typescript bana hıc bır uyarı vermezdi. kafama göre yazardım. sonra undefined olarak yollasaydım calıstırma ortamında hata verırdı...enazından onu hallettik.

  if (email) {
    res.send(email.toUpperCase());
  } else {
    res.send('You must provide an email property');
  }
});
//! işte bu yaptıgımız bır yol idi.. daha ıyı cozumler bulacagız.. cunku asında bir body ozellıgıne sahip olmayı bekleyen bir istek işleyicisini yazdıgımızda  muhendısler yada bız  req türünün requestWithbody türünde olacagını söylemeyi hatırlamalıyız. dolayısılya mukemmel bir cozum oldugunu söyleyemem..

// new*****

//? dedıgımız gibi index.tsde 3 madde gösterdik.. 1.maddedeki gibi typescript ile en azını yapın ve işleri duzeltmek ve typescriptin kodudmuzun içinde gerçekte neler olup bittigini anlmasına yardımcı olmak ıcın bu tmeel tur ek acıklamalarından bazilerini ekleyın..

router.post('/loginxNew222', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === 'password') {
    req.session = { loggedIn: true }; // req.sessıon objesınde  [propertyName: string]: any; alanı oldugu ıcn böyle yneı birşey ekledık..
    // email === 'hi@hi.com' esıt olmasını ıstedık. bu durumda tek geçerlı valid e postnaın bu olacagını söyleyecegım..

    //! hayırlayın bodyParser ornegını.. bu asında istegimize bir body ozellıgı ekledıgımız anlamına gelıyordu. tip tanımlama doyasının bu gövde ozellgını barındırmak ıcın nasıl cok iyi ayarlanmadıgına dair tüm o tartışmaları yaşadık.. ancak bırde  cookieSession ara katman yazılımı var bu cok farklı.. cookie session tanımlama dosyası aslında ıstek nesnesıne ekledııg ozellıgı cok daha iyi ele alır..
    // normal olarak express'i tek başına kullanıyor olsaydık ve req.sessıon yazmaya calıssaydık. varsayılan olarak bundan tanımsız alırdık. bır request objesının oturum ozellıgı yoktur.. tıpkı nomalde bir istek nesnesının body ozellıgı olmadıgı gıbı.. sadece bu cookie session ara katmanı buraya ekledıgımız ıcın bi rrequest nesnesı kendısıne baglı bır sessıon ozellıgı alacaktır. mesela req.body ıcın RequestWithBody ınterface'i yazdık ama cookie session asında bunu dogru bır sekılde kendısı gercekleştirdi tıp tanımlama dosyasında. cookie session ıcın tur tnaımlama dosyası cok daha iyi bir şekilde ele alınır. mesela tıp tanımlama doyasına baktıgımzıda declare namespace Express ıcıne   interface Request extends CookieSessionInterfaces.CookieSessionRequest {} konmus yanı express'de request objesı var. ama request'ide bir CookieSessionInterfaces ınterface ile extend etmişler... request'de onunla ılgılı ozellıkler geeçrlı olması adına. yanı bu cookieSession'a tıkladıgımızda gidilen tur tanımlama doyasında işte böyle anlatıyor yani. bu tur tanımlama dosyasının soyledııg bir şyy var hey git request interface'i bul ona ek bir özellık eklemek ıstıyoruz oda cookiesessioninterface'i.. yanı işte o ara katman'a index.ts'den tıklarsan tur tnaımlama dosyası acılıyor orda sen eger işte bu cookiesession kutuphanesını silersen req.session dedıgın kızar sana o request nesnesınde olmaz işte guzel iş yapıyor yani..

    // req.session;
    res.redirect('/'); // böyle birşey olsun
  } // böyle birşey olsun
  else {
    res.send('Invalid email or password');
  }
});

// yonlendırme router

router.get('/', (req: Request, res: Response) => {
  // req.session possnbile undefined null dedıgınden typescript daha calıstırma yapmadan kkızdı mesela bana if'de kontrol koydum... req.session.loggedIn kısmım zaten var ama tip olarak CookieSessionObject[string]: any turunde onun ıcın böyle bir alan olabilcegını söyluyor typescript sorun yok yukardda belırttık zaaten loginxNew222 kısmında... ama ekstra sorun req.session.loggedIn da  loggedIn kısmı any yanı  [propertyName: string]: any; belkı bir yerde loggedIn array gelecekk ve sen burrda boolean gibi bir işlem yaptın anyden dolayı typescriptde kızmamış olacak calıstırma ortamında patlarsın....... bu ekstra sorun yukardada bahsettım ileride anlaatılıyor olacaktır...
  if (req.session && req.session.loggedIn) {
    res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
    `);
  } else {
    res.send(`
        <div>
            <div>You are not logged in</div>
            <a href="/login">Login</a>
        </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

// requireAuth middlewear

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
  }

  res.status(403);
  res.send('Not permitted');
}

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user');
});

export { router };

// burda bazi ana sorunlara typescript ile kucukcozumler urettık fakat yetmez. typescripti kulandıgımzıda dılın ana ozellıklerı sınıflar ve arayüzlerdir. bızde express yada baska bır kutuphaneyı typescript class'larla kullanmaya calısacagız typescriptin bir js kutuphanesiyle daha iyi calısmasını saglamaktan bahsetmeye başlar başlamaz tartısma kacınızlmaz olarak bu js kutuphanesının bır tur sınıf tabanlı odakta veya sınınf tabanlı bir rolde calısmasını nasıl saglayabilcegımıze gelıyor..

// sımdı en basıtınden tum express kodumuzu alıp bir sınıfn ıcınde yaşayacak sekılde yenıden düzenleyebilriz. oldukca koaly birşey.. ve typescriptin özelliklerini kullanmıs oluruz birazcıkkk...   ders 232.dersde 2.daıkıada yapıyor ama bız yapmayacagız...

//! sımdı soru ornegın index.ts'dekı kodları class ıcerısıne aldık. eee bu kodu bu satır sayısına cıkarmak gibi bir şey kazandıkmı.. hızlı sekılde index.ts'dekılerı class halıne getırdık birşey kazandıkmı yanı tabıkıde hayır..

//? sınıf tabanlı bır yaklaşım kullanarak projenızı ts ile calısacak sekılde yenıden düzenlemek ıcın tum bu surecten gececeksınız iyi bir sonuc elde etmenız gerekır.. dolayısıyla ts ve express gibi bir js kutuphaenesının birlikte calısması ıcın masaj yapacak veya bukeceksınız. bunu yapmak oldukca zaman alacaktır. ve bu cabanızı haklı cıkarmanız gerekırir.. ts kullanmak ıstıyorum dıye duusnrek kodunuzu sınıflara atmayın...
// bana göre ılk yada ılk ıdeal sonuc uzerınde bir entegrasyon yapmanın gerçekten bir yada ıkı olası sonucu olmalıdır. daha ıyı bir tip guvenlıgı sevıyesıne sahıp olurduk başka deyısle ts'in kodumuzdakı hhataları bulmak ıcın işini yapmasına yardımcı olacak daha iyi bir işimiz olurdu.. buda elde eedebilceıgmız olası ideal sonuclardan biri.. dıger sonuc ıse gelıstırıcı deneyımını onemlı olcude gelıstırmemız olacaktır. yanı bır sekılde express kodumuzu alıp ts sınıflarına atmanın bir yolunu bulabılırsek ve bu sonuc tam burada artık bir sunucuyu bir araya getırmenın gerçekten verımlı bır yolunu bulduk dıyebılrsek kullanırız..

// aynı şey ts'i react ile entegre etmeye calsıtıgmızdada gecerlı yanı tum kodunuzu ts sınıflarına aktarmak ıcın bu kadar caba harcayacaksanız bu cabanın karsılıgını vermelsınız

//! belkıde ts ve expressin birlikte calısmasını saglmanın bır başka yolu da tum express kodumuzu alıp sınıflara atmak olabilir. dahada ılerıye gıdersek ts'dekı bazı gelısmıs ozwllıklerı kullanmanın bır yolunu buluabılrsek belkı ozaman bu ıkı sonuctan bırını tatmın edebilriz..

// bızde kodun cogunu alacagız ve bunu classs'Lara koyacagız.. ama sınıflara koyduugmuzda gerçetken bır faydası olmayacak. ama bunu haklı nedene dayandırırsak bır anlamı olacak ve ts'in bazı gelısmıs ozellıklerını kullanmaya baslayacagız ve bu duurmda developer deneeyımını nasıl onemlı olcude gelıstıreıblceıgmızı bulacagız

//  refactor kodumuzu srcrefactor klasoru ıcerısnde bulabilris

// yanı bızım temel amacımız sımdı bır javascript kutuphanesı ile typescripti kullandıımgızda js kutuphanesının ızın verdıgı syntax'ı kullanır + biraz tip ataması yaparsın ama ts'in amacı class + interface kullanmaktır. ama js kutuphanesının kendısınde syntaxında ona dair birşeyler olmadıgı ıcın bız ts de kullandıgımzı ıcın class ve interface kullanmak ıssteyecegız.. gidip haklı bir sebebe dayandırarak javascript kutuphanemızde class'ları kullanacagız. bunu yaparkende typescript'in gelişmiş özelliklerini kullanarak yapacagız... bu gelısmıs ozellıklerı kullanarak class +interface'lerı kullanacagız ve typescriptin asıl olayı olan class'ları vs kullanmıs oalcagız hemde javascript kutuphanesınde bunu yapmıs olacagız.. tabı bunu yaaparkende kutuphanenın canına okumuz olcaz ama kafamıza göre de class yazmıcaz bunu needene baglıcaz...

// sonuc olarak express js ile yazılmıs.. ve express'in kendıne has kodları var orda ornegın ts kullandıgım ıcın class'ları kullanmak ıstıyorum ama sadece express kodlarını bir kapsule almıs gıbı oluyorum class kullanarak bir işe bir nedene baglamamıs oluyorum... boşuna class yazmıs oluyorum  işte express kodlarınıda class'lara alırken bir nedene baglayacagım(typescriptin gelısmıs ozellıgı olan deceratorlar ile developer deneyımını arttırabilriz ..) ve class'ları sonuna kadar kullanacagım bunu yaparkende kutuphaneın canına okuyacagım....
