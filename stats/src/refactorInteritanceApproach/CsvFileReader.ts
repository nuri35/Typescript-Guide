import fs from 'fs';
// like that sorter example
export abstract class CsvFileReader<T> {
  data: T[] = [];

  constructor(public filename: string) {}
  abstract mapRow(row: string[]): T; //? burda bu MatchData turunu atamamalıyız kodun yenıden kullanılabılırlıgı ıcın. başka class'lara extend ettıgmızde bu parent class'ı o child class'da maprow olcagını soyluyoruz abstract dıyerek ama o chıld class'da bu metot  ınstance'larındakı  maprow metodu farklı bır tur return edebilir. : any dıyebılrız ama bundan kacınmamız gerekıyor. generics'lerden yararlanacagız.
  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' })
      .split('\n')
      .map((row: string): string[] => row.split(','))
      .map(this.mapRow);
  }
}
