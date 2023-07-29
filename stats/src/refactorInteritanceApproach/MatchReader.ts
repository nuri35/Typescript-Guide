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
