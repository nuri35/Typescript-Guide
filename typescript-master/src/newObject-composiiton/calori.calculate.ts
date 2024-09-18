export interface CalorieCalculationOptions {
  round?: boolean; // Whether to round the result
  precision?: number; // Number of decimal places for rounding (if round is true)
}

export class CaloriCalculate {
  constructor(
    public carbohydrate: number,
    public protein: number,
    public fat: number
  ) {}

  private calculateCaloriesFromCarbs(): number {
    return this.carbohydrate * 4;
  }

  private calculateCaloriesFromProtein(): number {
    return this.protein * 4;
  }

  private calculateCaloriesFromFat(): number {
    return this.fat * 9;
  }

  calculate(options: CalorieCalculationOptions = {}): number {
    let totalCalories =
      this.calculateCaloriesFromCarbs() +
      this.calculateCaloriesFromProtein() +
      this.calculateCaloriesFromFat();

    if (options.round) {
      totalCalories = Math.round(totalCalories);
    } else if (options.precision) {
      totalCalories = Number(totalCalories.toFixed(options.precision));
    }

    return totalCalories;
  }
}
