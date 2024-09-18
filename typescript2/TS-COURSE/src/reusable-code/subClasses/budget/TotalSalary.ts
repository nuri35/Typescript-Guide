import { IBudgetCalculator } from '../../interfaces';
import { HasId } from '../departmanOperations/memory.operation';

export class TotalSalaryBudgetCalculator<T extends HasId>
  implements IBudgetCalculator<T>
{
  calculateBudget(employees: T[]): number {
    return employees.reduce((total, employee) => total + employee.salary!, 0);
  }
}
