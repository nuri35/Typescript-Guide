import {
  IOperations,
  IFetcher,
  IBudgetCalculator,
  IReportGenerator,
} from './interfaces';

import { FileBasedOperations } from './subClasses/departmanOperations/file.operation';
import { APIFetcher } from './subClasses/fetcher/api.fetcher';
import { TotalSalaryBudgetCalculator } from './subClasses/budget/TotalSalary';
import { CSVReportGenerator } from './subClasses/report/csv.report';

import { Employee } from './interfaces';
import { HasId } from './subClasses/departmanOperations/memory.operation';

// DepartmentManager<T> burda T koymayabilirdimde direk constructorda static tip koyabilrdim..ama bu DepartmentManager'ı cagırken farklı tip uzerındende yapmak isteyebilrim..ornegın static metot'a T ekledım dışardan tip verdim artık bu class'ı ana class'ı farklı tipler uzerınden calıstıraıblrım..employee1 employee2 gibi.  ama alt class'lar okey onda sorun yok.. başka class'lara gidip dinamık olması gerekır anlatıtk onu alt class ornegınde. bu ornekte. yazdım.s

// istersem deıdgım gibi DepartmentEmployeeManager'da direk constructorda employee diye tip belırtebilriz birdaha bu class instance oluşurkken farklı employee tip yok ise sadece employee tipi olur..ama ben bu class'ı farklı tipler uzerınden calıstırmak ıstıyorum..bu yuzden T tipi koydum..

class DepartmentManager<T> {
  constructor(
    private operations: IOperations<T>,
    private fetcher: IFetcher<T>,
    private budgetCalculator: IBudgetCalculator<T>,
    private reportGenerator: IReportGenerator<T>
  ) {}

  static async build<T extends HasId>(
    filePath: string
  ): Promise<DepartmentManager<T>> {
    const operations = new FileBasedOperations<T>(filePath);
    const employeeFetcher = new APIFetcher<T>();
    const budgetCalculator = new TotalSalaryBudgetCalculator<T>();
    const reportGenerator = new CSVReportGenerator<T>();

    return new DepartmentManager<T>(
      operations,
      employeeFetcher,
      budgetCalculator,
      reportGenerator
    );
  }

  async add(departmentId: number): Promise<void> {
    const data = await this.fetcher.fetch(departmentId);
    data.forEach((data) => {
      this.operations.addEntity(data);
    });
  }

  async calculateBudget(): Promise<void> {
    const data = this.operations.getEntities();
    this.budgetCalculator.calculateBudget(data);
  }

  async generateReport(): Promise<void> {
    if (!this.reportGenerator) {
      throw new Error('No report generator provided');
    }
    const entities = this.operations.getEntities();
    const report = this.reportGenerator.generateReport(entities);
    console.log(report);
  }
}

//!burdakı dusuncemız şu... orneklere bakıldı.. hıkayenın akışı dıkkat edildi DepartmentManager olarak kalması daha mantıklı employe1 employe2 gibi tipler vererek yada policemanEm gibi tipler vererek onlara uygun şeilde calısacak.. ama ornegın user ornegımızde onu hatırlarsak. usr 1 userprops2 gibi tıpler vererek calsıtırz.. fakat user diye bir isim class var ana class olarak  ornegın bir cat home için ayrı class yapmak isterim belkı farklı şeylerde eklemek ıstersın.. ve user ana class'ına zaten cat tipi generic type olarak atmak isim anlamsızlıgına neden olur.. ama bızım bu ornegımızde böyle bir derdımız yok  DepartmentManager dıye koyduk belki farklı employe1,2 yada policeman gibi tipler atarak bu ana class'ı calıstırcaz.... cunku ana konumuz departman. fakat işte o policeman için ayrı metotlar vardır ve bu 3 interface alt class dakı metotları kullanmak isteyecektir.. ve ayrı class yapmak istemişimdir ona özel işte ozaman ayrı class yaparım.... ama özetle DepartmentManager class ısmı ok....durumda ... dıkkat et user class'A tip olarak cat vermek anlamsızlık olur..ama burda anlamsızlık yok..ve orda ayrıca cat diye ayrı class'da bu alt class'ları kullanmak ısteyebilirim. ve ayrıca farklı işlem metotlar yazmak isterim.. ama burda her trülü tipi kullanmak ısteyebilirim.. burdada ekstradan farklı ana class yaparak policemanDepartmanManager vs xManager gibi bu aynı alt class metotları kulllanmak ısterım ozaman bu metotları yazarım dışardan ulaşmak için. ayrıca yine farklı metot işlemler yazıyormdur... sadece bu..

//?ok işte project manager olabilir ayrı class yaparız ordada burdakı interface'leri kullanmak isteriz bu sefer dışardan ulaşması ıcınde aynı add calculate gibi isimleri tekrar yazarız ve hallederiz ama işte bir sorun oluşmus olacak bunun ııcn....model class yapılabilir.fakat burası ıcın gerek gormuyorum buranın olayı bukadar yeterlıdır...

// // run
(async () => {
  const manager = await DepartmentManager.build<Employee>('employees.json');
  await manager.add(1);
  await manager.calculateBudget();
  await manager.generateReport();
})();
