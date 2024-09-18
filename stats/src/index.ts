import fs from 'fs';
import { CsvFileReaderBackup } from './badCode/CsvFileReaderBackup';
import { MatchReader } from './refactorInteritanceApproach/MatchReader';
import { MatchReader as MatchReader2 } from './refactorİnterfaceApproach/MatchReader';
import { CsvFileReader as CsvFileReader2 } from './refactorİnterfaceApproach/CsvFileReader';

const matches2 = fs
  .readFileSync('football.csv', {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row: string): string[] => {
    return row.split(',');
  }); // set data structure ok

let manUnitedWins2 = 0;
let manUnitedHavePlayed2 = 0;

// BAD CODE
for (let match of matches2) {
  if (match[1] === 'Man United' && match[5] === 'H') {
    manUnitedWins2++;
  } else if (match[2] === 'Man United' && match[5] === 'A') {
    manUnitedWins2++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed2++;
  }
}

// Bir enum oluşturduğumuzda, uygulamamızda aynı zamanda yeni bir tip de oluşturmuş oluruz. Yani bu tip, "match result" olur.

// enum yazarak Asıl amaç, diğer mühendislere kodumuzun amacını ve yazdığımız kodun amacını iletmektir.

// Kodumuz çalışırken enum seçeneklerine sonradan eklemek gibi bir şey yapamayız. yanı MatchResult.Draw = 2, d, s gibi degısım olmaz.

// enumları küçük, sabit bir değer kümesine ve bu değerleri derleme zamanında bilebildiğimiz zamanlarda kullanmaya çalışacağız.

//???? örnek:**********
//1: Bir renk seçici üzerindeki farklı ana renkleri temsil etmek için enum kullanmalı mıyız? (Örneğin: kırmızı, sarı, mavi)

// Evet, enum kullanmak uygun olur. Ana renkler, derleme zamanında bilinen bir sabit küçük değer kümesidir.

// Netflix'teki film kategorilerini temsil etmek için enum kullanmalı mıyız?

// Hayır, bu durumda enum kullanmak uygun olmaz. Netflix'teki film kategorileri sürekli değişebilir ve elimizde tüm kategorilerin listesi olmayabilir.

// Belirli bir kullanıcının blog yazılarının farklı başlıklarını temsil etmek için enum kullanmalı mıyız?

// Hayır, bu durumda da enum kullanmak uygun olmaz. Kullanıcının tüm farklı blog yazılarının başlıklarını bilmiyoruz ve derleme zamanında bilemeyiz.

// Sipariş menüsünde içeceğin boyutlarını temsil etmek için enum kullanmalı mıyız? (Örneğin: küçük, orta, büyük)

// Evet, enum kullanmak uygun olur. İçecek boyutları, sabit ve sınırlı bir değer kümesidir ve derleme zamanında bilinir.
// 1750 yılından itibaren geçen tüm yılları temsil etmek için enum kullanmalı mıyız?

// Hayır, bu durumda da enum kullanmak uygun olmaz. Yılların tamamı çok büyük bir değer kümesi olacaktır ve enumlar için uygun değildir.
// Bir metin mesajının durumunu temsil etmek için enum kullanmalı mıyız? (Örneğin: okunmamış, okundu, gönderilmedi)

// Evet, enum kullanmak uygun olur. Metin mesajlarının durumları sabit ve sınırlı bir değer kümesidir ve derleme zamanında bilinir.

const matches = fs
  .readFileSync('football.csv', {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row: string): string[] => {
    return row.split(',');
  }); // set data structure ok

let manUnitedWins = 0;
let manUnitedHavePlayed = 0;

export enum MatchResult {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D',
}

// BAD CODE
for (let match of matches) {
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
    manUnitedWins++;
  } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
    manUnitedWins++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed++;
  }
}

// console.log(`Man United won ${manUnitedWins} games`);
// console.log(`Man United have played ${manUnitedHavePlayed} games`);

// ********
//!NOT: ORNEGIN YUKARDA matches cvs file 'dan okuyor ama onun yerıne apidende okuyabılrıım komple sılmek durumunda kalıyoruz yukardaakı kodu yanı alternatif bir bilgi kaynagına sahıp olmaya karar verdıgımızde onu sılmek zorunda kalmamızı engellemek.. ve ıkıncısı bunu gelecektekı projelerde de kullanılabılır hale getırın....

const reader = new CsvFileReaderBackup(`football.csv`);
reader.read();
const match = reader.data[0][3];
for (let match of reader.data) {
  // REFACTORING
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
    manUnitedWins++;
  } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
    manUnitedWins++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed++;
  }
}

// *****

const readergd = new MatchReader(`football.csv`);
readergd.read();

for (let match of readergd.data) {
  // REFACTORING
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
    manUnitedWins++;
  } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
    manUnitedWins++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed++;
  }
}

const csvFileReaderVal = new CsvFileReader2(`football.csv`);
const matchReaderVal = new MatchReader2(csvFileReaderVal);
matchReaderVal.load();

for (let match of matchReaderVal.matches) {
  // REFACTORING
  if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
    manUnitedWins++;
  } else if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) {
    manUnitedWins++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed++;
  }
}
import { ConsoleReport } from './reportTargets/ConsoleReport';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { Summary } from './Summary';
// better good code the best code

const csvFileReaderValx = new CsvFileReader2(`football.csv`); // static metotu bunun ıcınde uygulayabırlzı aşagıda ornegı var.
const matchReaderValx = new MatchReader2(csvFileReaderValx);
matchReaderValx.load();
// summary example
const summary = new Summary(
  new WinsAnalysis('Man United'),
  new ConsoleReport()
);

// related summary call static method

const sum = Summary.winsAnalysisWithConsoleReport('Man United');
sum.buildAndPrintReport(matchReaderValx.matches);

// *******ders 139.dasın....
