import { IReportGenerator } from '../../interfaces';
import { HasId } from '../departmanOperations/memory.operation';

export class CSVReportGenerator<T extends HasId>
  implements IReportGenerator<T>
{
  generateReport(entities: T[]): string {
    if (entities.length === 0) {
      return '';
    }

    const headers = Object.keys(entities[0]).join(',');
    const rows = entities
      .map((entity) => Object.values(entity).join(','))
      .join('\n');

    return `${headers}\n${rows}`;
  }
}
