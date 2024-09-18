import { IOperations } from '../../interfaces';
import { HasId } from './memory.operation';

const fs = require('fs');

export class FileBasedOperations<T extends HasId> implements IOperations<T> {
  constructor(private filePath: string) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  addEntity(employee: T): void {
    const employees = this.getAllEntities();
    employees.push(employee);
    fs.writeFileSync(this.filePath, JSON.stringify(employees));
  }

  getEntities(): T[] {
    return this.getAllEntities();
  }

  private getAllEntities(): T[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as T[];
  }
}
