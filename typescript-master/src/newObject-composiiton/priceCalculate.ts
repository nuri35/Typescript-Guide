export interface PriceCalculationOptions {
  discount?: number; // Percentage discount (0-100)
  taxRate?: number; // Percentage tax rate (0-100)
  bulkDiscount?: number; // Percentage bulk discount (0-100)
  bulkDiscountThreshold?: number; // Minimum quantity for bulk discount
  roundingPrecision?: number; // Number of decimal places for rounding
} // statıc bu turdekı ınterface'i options olarak kullanabirim  PriceCalculate'ı başka class ile objeect compositon yaparken onun ıcın generc type yapmadım sorun yok..

export class PriceCalculate {
  constructor(public price: number, public quantity: number) {}
  calculate(options: PriceCalculationOptions = {}): number {
    let total = this.price * this.quantity;

    // Apply discounts (if applicable)
    if (options.discount) {
      const discountAmount = total * (options.discount / 100);
      total -= discountAmount;
    }

    // Apply taxes (if applicable)
    if (options.taxRate) {
      const taxAmount = total * (options.taxRate / 100);
      total += taxAmount;
    }

    // Apply bulk discounts (optional)
    if (
      options.bulkDiscount &&
      this.quantity >= (options.bulkDiscountThreshold || 0)
    ) {
      const bulkDiscountAmount = total * (options.bulkDiscount / 100);
      total -= bulkDiscountAmount;
    }

    // Rounding (optional)
    if (options.roundingPrecision) {
      total =
        Math.round(total * 10 ** options.roundingPrecision) /
        10 ** options.roundingPrecision;
    }

    return total;
  }
}
