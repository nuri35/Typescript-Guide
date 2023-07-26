import fs from 'fs';
// this example is composition example so this is interface example that is all
export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' })
      .split('\n')
      .map((row: string): string[] => row.split(','));
  }
}

// example better understanding

export class ApiReader {
  data: string[][] = []; // this is wrong just for example

  constructor(public url: string) {}

  read(): void {
    //global effect of code
  }
}
