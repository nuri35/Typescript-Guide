interface Product {
  type: string;
  price: number;
}

class PriceCalculatorImpl {
  calculatePrice(product: Product): number {
    switch (product.type) {
      case 'A':
        return product.price * 1.1;
      case 'B':
        return product.price * 1.2;
      case 'C':
        return product.price * 1.3;
      default:
        throw new Error('Invalid product type');
    }
  }
} // ıhtıyaca gore dusundum bu kendı ıcınde hesaplıyor sorun degıl gıdıp bunu  PriceCalculatorImpl uzerınden object composiiton yapmıyorum oyle bır ıhyıacım yok kendı ıcınde hesaplaması okey. belkı bunun gııb birde dateCalculatorImpl olabilir dıye dusunuyorum onun ıcın general bır calculater class olsuturyorum ıcerısıne dolduruyorum ayrı metotları sonrasında  GeneralCalculator dakı metotlarıda ayrı class'lara alıyorum o ayrı class'ları en aşagıda  SummaryCalculator class'ında kullanıyorum. object composition yparak..

class GeneralCalculator {
  calculate(data: any): number {
    switch (data.type) {
      case 'price':
        return this.calculatePrice(data);
      case 'date':
        return this.calculateDate(data);
      case 'time':
        return this.calculateTime(data);
      default:
        throw new Error('Invalid data type');
    }
  }

  private calculatePrice(data: any): number {
    // Price calculation logic
    return 0;
  }

  private calculateDate(data: any): number {
    // Date calculation logic
    return 0;
  }

  private calculateTime(data: any): number {
    // Time calculation logic
    return 0;
  }
} // bu ıcerısınde farklı metotları ayrı class'lara alacagım......

//refactor

import { PriceCalculate, PriceCalculationOptions } from './priceCalculate';
import { TimeCalculate, TimeCalculationOptions } from './timeCalculate';
import { CaloriCalculate, CalorieCalculationOptions } from './calori.calculate';

interface Calculator<T> {
  calculate(option: T): number;
}

class SummaryCalculator<T> {
  constructor(public analyzerCal: Calculator<T>) {}

  static staticFromPrice(price: number, quantity: number) {
    return new SummaryCalculator<PriceCalculationOptions>(
      new PriceCalculate(price, quantity)
    );
  }

  static staticFromTime(time: number, speed: number) {
    return new SummaryCalculator<TimeCalculationOptions>(
      new TimeCalculate(time, speed)
    );
  }

  static staticFromCalori(carbohydrate: number, protein: number, fat: number) {
    return new SummaryCalculator<CalorieCalculationOptions>(
      new CaloriCalculate(carbohydrate, protein, fat)
    );
  }

  buildReport(option: T): void {
    const output = this.analyzerCal.calculate(option);
    console.log(output);
  }
}

// Usage

const summaryCalculator = SummaryCalculator.staticFromPrice(100, 5);
summaryCalculator.buildReport({
  discount: 10,
  taxRate: 20,
  bulkDiscount: 5,
}); // 450

const summaryCalculator2 = SummaryCalculator.staticFromTime(10, 50);
summaryCalculator2.buildReport({
  unit: 'hours',
  targetUnit: 'minutes',
  restBreaks: [5, 10],
}); // 300

const summaryCalculator3 = SummaryCalculator.staticFromCalori(100, 50, 10);
summaryCalculator3.buildReport({ round: true }); // 800
summaryCalculator3.buildReport({ precision: 2 }); // 800.00

// goood perfect
// sımdı artık typescript de kursun yenı dersıne gecebılrsın... artık 219.deersdeyız..
