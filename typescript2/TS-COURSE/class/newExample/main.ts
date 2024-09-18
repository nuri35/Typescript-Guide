class User {
  constructor(
    public name: string,
    public readonly email: string,
    public lastName?: string
  ) {
    this.name = name;
    this.email = email;
    this.lastName = lastName;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

class Admin extends User {
  isAdmin: boolean = true;
  usersReporting: number;

  constructor(
    name: string,
    email: string,
    usersReporting: number,
    lastName?: string
  ) {
    super(name, email, lastName);
    this.usersReporting = usersReporting;
  }

  public printName() {
    console.log(this.name);
  }

  greet() {
    // this is overriding
    return `Helloaaaaaaa ${this.name}`;
  }
}

const user: User = new User('Mark', 'Mark@email.com');
const admin: Admin = new Admin('John', 'John@email.com', 11);

class Counter {
  static count = 0;
  static increase() {
    Counter.count++;
  }

  static {
    console.log('initailizing counter');
    Counter.count = 5;
  } // aşagıdakı statıc cagırması  vs calısmadan once bura calısır burdakı ayarlar oncelıklı olur.
}
console.log(Counter.count);
Counter.increase();
console.log(Counter.count);

const counter: Counter = new Counter();
// counter.increase(); // error bızde sadece ornegın static metot vs var ama inilize etmek ısteıdgımız birşey var bunun ıcın ınstance olusturup constructorda yapabilriz fakat ordan static metotlara ulaşmak yok zaten dolayısıyla static {} gibi birşey ypaabilriz.

//!generic

type Identifiable = {
  id: string;
};

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getItemById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }
}

type UserAx = {
  id: string;
  name: string;
};

const userRepo = new Repository<UserAx>();
userRepo.add({ id: 'u1', name: 'Max' });

//composing new Classes with mixins

type Constructor = new (...args: any[]) => {};

function TimeStamped<T extends Constructor>(Base: T) {
  return class extends Base {
    protected timestamp = Date.now();

    getTimeStamp() {
      return this.timestamp;
    }
  };
}

class UserA {
  constructor(public name: string) {}

  test() {
    console.log('test');
  }
}

class UserWithTimeStamp extends TimeStamped(UserA) {
  constructor(name: string, public email: string) {
    super(name);
  }

  displayInfo() {
    console.log(this.name, this.email);
  }
}

const userWithTimeStamp = new UserWithTimeStamp('Max', 'abcEmail');
userWithTimeStamp.test();
console.log(userWithTimeStamp.getTimeStamp());

// örnek

class Employee {
  static companyName: string = 'Tech Solutions Inc.'; // Static member

  constructor(
    public name: string, // Public member using shorthand for constructor
    public age: number, // Public member using shorthand for constructor
    private _salary: number, // Private member
    protected id: number // Protected member
  ) {}

  // Getter for salary
  get salary(): number {
    return this._salary;
  }

  // Setter for salary
  set salary(newSalary: number) {
    if (newSalary > 0) {
      this._salary = newSalary;
    } else {
      throw new Error('Salary must be a positive number');
    }
  }

  // Static method to get company name
  static getCompanyName(): string {
    return Employee.companyName;
  }

  // Method to get employee details
  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(
    name: string,
    age: number,
    salary: number,
    id: number,
    public department: string // Public member using shorthand for constructor
  ) {
    super(name, age, salary, id);
  }

  // Overriding getDetails method to include department information
  getDetails(): string {
    return `${super.getDetails()}, Department: ${this.department}`;
  }
}

// Example usage
const emp1 = new Employee('Alice', 30, 50000, 1);
console.log(emp1.getDetails()); // Output: Name: Alice, Age: 30, Salary: 50000

const manager1 = new Manager('Bob', 40, 70000, 2, 'Engineering');
console.log(manager1.getDetails()); // Output: Name: Bob, Age: 40, Salary: 70000, Department: Engineering

console.log(Employee.getCompanyName());

// abstract class..

type Holidays = {
  date: Date;
  reason: string;
}[];

abstract class Departments {
  protected abstract holidays: Holidays;

  protected constructor(protected name: string) {}

  public addHolidays(holidays: Holidays) {
    if (Array.isArray(holidays)) {
      for (const holiday of holidays) {
        this.holidays.push(holiday);
      }
    }
  }

  // bu ısımde metotu alt class'lardada yazdım sadece overload etmek için.. ama ıstersek bu ana class'da böyle bir metot olması yerıne abstract yaparak alt class'larda implemente etmesını zorunlu kılabilirdik. hatta bunuda addHolidaysde this.printHolidays()  diyerekde kullanabilrdik.... fikirsel olarak yazmak istedim..
  // public printHolidays() {
  //   if (this.holidays.length === 0) {
  //     return console.log('There are no holidays');
  //   }
  //   console.log(`Here is the list of holidays`);

  //   this.holidays.forEach((holiday, index) => {
  //     console.log(`${index + 1}. ${holiday.reason}, ${holiday.date}`);
  //   });
  // } ben yoruma aldım yazdıgım fıkrı yapmak ıstıyorum

  public abstract printHolidays(): void; // işte istersemde bunu  addHolidays metotun ıcınde this.printHolidays()  diyerekde kullanabilirdim. cunku alt class'larda zaten zorunlu tutuyorum.
}

class ItDepartments extends Departments {
  protected holidays: Holidays = [];

  constructor() {
    super('IT Department');
  }

  public printHolidays() {
    // overload edebilirm..
    if (this.holidays.length === 0) {
      return console.log('There are no holidays');
    }
    console.log(`Here is the list of holidays ${this.name}`);

    this.holidays.forEach((holiday, index) => {
      console.log(`${index + 1}. ${holiday.reason}, ${holiday.date}`);
    });
  }
}

class AdminDepartments extends Departments {
  protected holidays: Holidays = [];

  constructor() {
    super('Admin Department');
  }

  public printHolidays() {
    // overload edebilirm..
    if (this.holidays.length === 0) {
      return console.log('There are no holidays');
    }
    console.log(`Here is the list of holidays ${this.name}`);

    this.holidays.forEach((holiday, index) => {
      console.log(`${index + 1}. ${holiday.reason}, ${holiday.date}`);
    });
  }
}

const itHolidays: Holidays = [
  {
    date: new Date(2022, 11, 1),
    reason: 'IT Department Day',
  },
  {
    date: new Date(2022, 12, 25),
    reason: 'Chistmas',
  },
];

const itDepartment = new ItDepartments();

itDepartment.addHolidays(itHolidays);

console.log(itDepartment);
