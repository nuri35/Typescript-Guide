import { CsvFileReader } from './CsvFileReader';
import { dateStringToDate } from '../utils';
import { MatchResult } from '../index';

// type konusuna typescript sitesinden birdaha bakarsın buraya geldıgınde
type MatchData = [Date, string, string, number, number, MatchResult, string];
// match = football match
export class MatchReader extends CsvFileReader<MatchData> {
  constructor(public filename: string) {
    super(filename);
  }

  mapRow(row: string[]): MatchData {
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
  }
}

//! export class PeopleReader extends CsvFileReader
//! export class CarReader extends CsvFileReader
//! export class BookReader extends CsvFileReader
// ayrı amaclarla böyle yapabilriz ve böylelikle her konuya gore mapRow dınamık olarak csvfile reader'da maplenir.

// fakat biz inheritance kullanmamalıyız burda. ana amacımız zaten CsvFileReader'ri farkklı amaclarla yenıden kullanabılır yapmaktı. ordakı  .map(this.mapRow); kısmını dınamıkleştirdik o kısım if else yerıne ayrı  PeopleReader gıbı class'lara burundu..sorun yok...
//fakat extends ıle ınheritance yapmamalıyız. sebebi ise... ornegın MatchReader ile  CsvFileReader birbirlerınden cok farklı class'lar... MatchReader yada  PeopleReader'ı ben hem  CsvFileReader ile hemde x başka bir şey ile extends edebılırım dolayıısyla kopyalanmıs dublıcate kod olusur. bu yuzden ınheritance yerıne composition kullanmalıyız. hatta  PeopleReader'ı x birşey ile dedık ama mesela PeopleReader'ı extend apireader diyebilrim böylelikle tekrardan PeopleReader'ı kopyalayıp kod  tekrarına sokuyorum kotu birşey olur bu.. ve ayrıca neden PeopleReader extends  CsvFileReader dedıgımde butun ozellıklerını alayımki...
// dolayısıyla interface yaklaşımını kullanarak 1 kere  MatchReader yazarsın ve uygun interface kurallarını karsılayan istedigin class'a parametre  olarak atayabırlsın..

//TODO herşeyı anladın 129 da kal dırek calıscagın zaman 129 dan devam et..
