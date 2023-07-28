import fs from 'fs';
import { CsvFileReaderBackup } from './badCode/CsvFileReaderBackup';
import { MatchReader } from './refactorInteritanceApproach/MatchReader';
import { MatchReader as MatchReader2 } from './refactorİnterfaceApproach/MatchReader';
import { CsvFileReader as CsvFileReader2 } from './refactorİnterfaceApproach/CsvFileReader';

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

// BAD CODE
for (let match of matches) {
  if (match[1] === 'Man United' && match[5] === 'H') {
    manUnitedWins++;
  } else if (match[2] === 'Man United' && match[5] === 'A') {
    manUnitedWins++;
  }
  if (match[1] === 'Man United' || match[2] === 'Man United') {
    manUnitedHavePlayed++;
  }
}

// const homeWin = 'H';
// const awayWin = 'A';
// const draw = 'D'; //

// enum

export enum MatchResult {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D',
} // enum  birbiryle cok yakından ılısklı bazı degerlerı depolyaoanbir nesnedir. javascript nesneside kullanabılrdın fakat eger bellı bir nedenın yoksa javascript nesnesi kullanma. typescriptdesın enum kullan.

// Aslında, son sorun şu ki, tipik JavaScript'te, burada TypeScript yazıyor olsak da, nesnelerin birçok farklı amaç için kullanılmasıdır.

// JavaScript'te nesneleri kayıtları veya bilgi parçalarını temsil etmek için kullanırız. Diğer zamanlarda, farklı yöntemleri veya özellikleri içeren bir koleksiyonu depolamak için kullanırız. Ve bazen, tam da bu senaryoda olduğu gibi, bir maçın olası sonuçlarını temsil etmek için kullanırız.

// Yani, mevcut nesne tabanlı yaklaşımın tek sorunu, diğer mühendislerin bunu gördüğünde "Bu şey neden bir nesne olarak tanımlanmış? Acaba önemli bir şeyi mi temsil ediyor?" gibi düşünebilecek olmasıdır. Amacı biraz belirsizdir.

// Bu nedenle, gördüğümüz gibi bir nesne kullanmak yerine, TypeScript içinde bir şey kullanacağız ve bu şeyin adı "enum" olacak.

//neden js object yapmadık enum yaptık?:   enumun amacı, her şeyden önce, performans açısından büyük bir iyileştirme veya TypeScript'in herhangi bir kontrol yapabilme gibi bir özelliğin olmadığını diğer mühendislere bildirmektir.
// Bir enum kullanarak, sadece diğer mühendislere bu çok yakından ilişkili değerler koleksiyonu olduğunu belirtmek için kullanırız.
// Bir enum oluşturduğumuzda, uygulamamızda aynı zamanda yeni bir tip de oluşturmuş oluruz. Yani bu tip, "match result" olur.
// enum yazarak Asıl amaç, diğer mühendislere kodumuzun amacını ve yazdığımız kodun amacını iletmektir.
// Kodumuz çalışırken enum seçeneklerine sonradan eklemek gibi bir şey yapamayız. yanı MatchResult.Draw = 2, d, s gibi degısım olmaz.
// enumları küçük, sabit bir değer kümesine ve bu değerleri derleme zamanında bilebildiğimiz zamanlarda kullanmaya çalışacağız.

// örnek:**********
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
summary.buildAndPrintReport(matchReaderValx.matches);

// related summary call static method

const sum = Summary.winsAnalysisWithConsoleReport('Man United');
sum.buildAndPrintReport(matchReaderValx.matches);

// yarın ılk bu orneklerı gozden gecır sakın kafayla sonra yapay zekanın orneklerınden gıderek onları
// dusun en son yapay zekaya bir konu anlattır sen yaz kodu
