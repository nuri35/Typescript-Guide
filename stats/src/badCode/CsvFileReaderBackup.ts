import fs from 'fs';
import { dateStringToDate } from '../utils';
import { MatchResult } from '../index';

// write ınterface type second map method return

type MatchData = [Date, string, string, number, number, MatchResult, string];
// MatchData adında bır turum var. eşittir dıyerek matchdata turunun ne oldugnuda belırlemıs olduk..
export class CsvFileReaderBackup {
  data: MatchData[] = []; // bir array var ve bu arrayın ıcerısındekı tupple oluyor.
  // data: string[][] idi degıstırdık.
  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' })
      .split('\n') // string[] ooldu
      .map((row: string): string[] => row.split(',')) // string[][] oldu suan
      .map((row: string[]): MatchData => {
        // bu fonksıyonun donme tıpını tuple kullanacagız bu tur (MatchResult | Date | number | string)[] dip tanımlaması yapmayacagız. cunku array tıp tanımlamasında 1.ci sırada date varsa mesela ben o date'i son sıraya yazsamda sorun cıkarmıyor ama tuple'da 1.ci sırada date varsa son sıraya yazamıyoruz. bızım ıcın sıra onemlı oldugu ıcın tuple kullanacagız.
        return [
          dateStringToDate(row[0]),
          row[1],
          row[2],
          parseInt(row[3]),
          parseInt(row[4]),
          // type assertion
          row[5] as MatchResult,
          row[6],
        ];
      });
  }
}
//! bu sınıfmız yenıden kullanabılır degıl. football.csv'ye ozgu oldu. refeactor etmemız gerekıyor.buda dıger dosyada olacak. en azından yorumları buraya yazdık.. yanı butun x.csv dosyalarına ozgu olması gerekır orengın book.csv yede ozgu olması laım onun ıcın ornegın en sondakı .map'i refactor etmemız gerek. ayrıca footboll için   .map((row: string[]): MatchData =>  yaptın fakat farklı bır projede yıne footbol.csv olur ama onun ıcın farklı bır map mantıgı içerisini yapmamız gerekır. yani bu sınıfı yenıden kullanabılır hale getırmemız gerekır. bunun ıcın refactor etmemız gerekır.
