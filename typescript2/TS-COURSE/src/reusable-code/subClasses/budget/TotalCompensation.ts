import { IBudgetCalculator } from '../../interfaces';
import { HasId } from '../departmanOperations/memory.operation';

export class TotalCompensationBudgetCalculator<T extends HasId>
  implements IBudgetCalculator<T>
{
  calculateBudget(employees: T[]): number {
    return employees.reduce(
      (total, employee) => total + employee.salary! + (employee.bonus || 0),
      0
    );
  }
}
