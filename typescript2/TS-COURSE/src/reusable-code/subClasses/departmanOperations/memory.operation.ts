import { IOperations } from '../../interfaces';

export interface HasId {
  id?: number;
  salary?: number;
  bonus?: number;
}

export class InMemoryOperations<T extends HasId> implements IOperations<T> {
  private employees: T[] = []; // db gıbı dusunuyoruz.

  addEntity(employee: T): void {
    this.employees.push(employee);
  }

  getEntities(): T[] {
    return this.employees;
  }
}
