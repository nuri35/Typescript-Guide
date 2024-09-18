import { IFetcher } from '../../interfaces';

class DatabaseFetcher<T> implements IFetcher<T> {
  async fetch(departmentId: number): Promise<T[]> {
    return [];
  }
}
