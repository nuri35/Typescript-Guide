class Vehicle {
  constructor(public color: string) {
    this.color = color;
  }

  // drive(): void {
  //   console.log('chugga chugga');
  // }

  protected honk(): void {
    console.log('beep' + this.color);
  }
}

const vehicle = new Vehicle('orange');

class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
    this.wheels = wheels;
  }

  private drive(): void {
    this.color;
    // vehıcle dekı drive'ı kapatmasaydık burda private yapamzdık cunku orda public durumda aslında sen vehicledeki fonksıyonu override ettın burda. yukarda public olanı burda private degıstıremessın. ıkısıde publıc olursa overwriten edebilrdin. dolayısıyla yukardakını yoruma aldım.
    console.log('vroom');
  }
  get startDrivingProcess(): string {
    this.drive(); // private you can call it in the class not call in outside
    // this.honk(); // eger bu ust class'Da yanı vehiclede private olmasaydı burda da call edebilirdik.
    this.honk(); // protected you can call it in the class and child class not call in outside
    return 'ok';
  }
}
const car = new Car(4, 'red');
car.startDrivingProcess;
