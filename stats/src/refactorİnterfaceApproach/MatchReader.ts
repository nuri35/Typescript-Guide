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

export class VoteReader {
  matches: string[] = []; // exaMPLE
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = ['ok'];
  }
}
