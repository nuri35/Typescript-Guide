import { Employee, IFetcher } from '../../interfaces';

//!NOT: <T> SEKLINDE neden verdım belkı main.ts de employe2 dedi artık ona uyacak sekılde interface olacak ama bunu compsoiton yapcagım zaman employee'da kaldıgı ıcın dınamık olmamış olcak... ondan dolayı APIEmployeeFetcher bunu new dıyerek calıstırcagımız zaman new APIEmployeeFetcher<Employee> dedıgımızde employee olacak ama bunu new APIEmployeeFetcher<Employee2> dedıgımızde employee2 olacak... yani dınamık olacak... main'dekı ınterface'dekı kurallarla eşdeger olmus olur.
export class APIFetcher<T> implements IFetcher<T> {
  async fetch(departmentId: number): Promise<T[]> {
    return []; // mock ok
  }
}
