import fs from 'fs';
import { dateStringToDate } from './utils';
import { MatchResult } from './index';

export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' })
      .split('\n')
      .map((row: string): string[] => row.split(','))
      .map((row: string[]): any => {
        return [
          dateStringToDate(row[0]),
          row[1],
          row[2],
          parseInt(row[3]),
          parseInt(row[4]),
          // type assertion
          row[5] as MatchResult, // enum'dakı degerlerden bırı olmalı oldugnu bıldırmek lazım onun ıcın tıp ataması yaptım degısık bır tıp ataması array'in iinde böyle tıp ataması olablir.
          row[6],
        ];
      });
  }
}
