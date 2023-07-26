import { dateStringToDate } from '../utils';
import { MatchData } from './MatchData';
import { MatchResult } from '../index';

interface DataReader {
  read(): void;
  data: string[][];
}
export class MatchReader {
  matches: MatchData[] = [];
  constructor(public reader: DataReader) {}
  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map((row: string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult,
        row[6],
      ];
    });
  }
}

// example VoteReader maybe can for csv file reader and api reader and this is must be different page
export class VoteReader {
  matches: string[] = []; // exaMPLE
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = ['ok']; // bu class'ın constructor'ıan gelen csv'Ye ozgu bı return ıslemı kısmı
  }
}
