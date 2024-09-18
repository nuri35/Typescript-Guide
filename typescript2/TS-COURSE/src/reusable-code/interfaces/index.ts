// Interface for Department Operations
export interface IOperations<T> {
  addEntity(entity: T): void;
  getEntities(): T[];
}

export interface IFetcher<T> {
  fetch(departmentId: number): Promise<T[]>;
}

// Interface for Budget Calculator
export interface IBudgetCalculator<T> {
  calculateBudget(entities: T[]): number;
}

export interface IReportGenerator<T> {
  generateReport(entities: T[]): string; // Raporu döner
}

export interface Employee {
  id: number;
  name: string;
  salary: number;
  bonus: number;
}
