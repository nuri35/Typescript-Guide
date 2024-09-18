import { IReportGenerator } from '../../interfaces';
import { HasId } from '../departmanOperations/memory.operation';

export class XMLReportGenerator<T extends HasId>
  implements IReportGenerator<T>
{
  generateReport(entities: T[]): string {
    const xmlEntities = entities
      .map((entity) => {
        const xmlFields = Object.entries(entity)
          .map(([key, value]) => `<${key}>${value}</${key}>`)
          .join('');
        return `<entity>${xmlFields}</entity>`;
      })
      .join('');

    return `<entities>${xmlEntities}</entities>`;
  }
}
