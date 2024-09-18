abstract class Shape {
  abstract areas(): number; // Soyut bir metot, alt sınıflar bunu uygulayacak
}

class Rectangles extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  areas(): number {
    return this.width * this.height; // Dikdörtgenin alanı
  }
}

class Circles extends Shape {
  constructor(private radius: number) {
    super();
  }

  areas(): number {
    return Math.PI * this.radius * this.radius; // Dairenin alanı
  }
}
const shapesA: Shape[] = [new Rectangles(4, 5), new Circles(3)];

shapesA.forEach((shape) => {
  console.log(`Area: ${shape.area()}`);
});

// bir sınıf hiyerarşisinde üst sınıf (base class) referanslarının, alt sınıf (subclass) nesnelerine işaret edebilmesine ve onların metodlarını, özelliklerini kullanabilmesine olanak tanır. Böylece, farklı alt sınıflar tek bir üst sınıf referansı aracılığıyla yönetilebilir ve işlenebilir.

//  Alt Tür Polimorfizmi aynı zamanda arayüzler (interface) kullanılarak da uygulanabilir. Arayüzler, bir sınıfın belirli metodları uygulaması gerektiğini belirtir, ancak nasıl uygulanacağına dair bir zorunluluk getirmez.

// Shape arayüzü tanımlanıyor
interface ShapeX {
  area(): number;
  perimeter(): number;
}

// Rectangle sınıfı, Shape arayüzünü uyguluyor
class RectangleA implements ShapeX {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Circle sınıfı, Shape arayüzünü uyguluyor
class CircleA implements ShapeX {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Bir fonksiyon yazalım, Shape arayüzünü uygulayan her tür nesneyi kabul ediyor
function calculateShapes(shapes: ShapeX[]): void {
  shapes.forEach((shape) => {
    console.log(`Area: ${shape.area()}, Perimeter: ${shape.perimeter()}`);
  });
}

// 2.örnek

interface PaymentMethod {
  processPayment(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number) {
    console.log(`Kredi kartıyla ${amount} TL ödendi.`);
  }
}

class PayPalPayment implements PaymentMethod {
  processPayment(amount: number) {
    console.log(`PayPal ile ${amount} TL ödendi.`);
  }
}

class BankTransferPayment implements PaymentMethod {
  processPayment(amount: number) {
    console.log(`Banka havalesi ile ${amount} TL ödendi.`);
  }
}
// Bir e-ticaret sitesinde farklı ödeme yöntemleri (kredi kartı, PayPal, banka havalesi, vb.) kullanılabilir. Her ödeme yöntemi farklı bir süreç gerektirebilir ama hepsi ödeme işlemini başlat ve ödeme işlemini tamamla gibi aynı adımları içerir.
// CreditCardPayment, PayPalPayment, ve BankTransferPayment sınıflarının hepsi farklı ödeme yöntemleri sunar, fakat hepsi processPayment metodunu uygular.

function completePayment(method: PaymentMethod, amount: number) {
  method.processPayment(amount);
}

const method: PaymentMethod = new CreditCardPayment();
completePayment(method, 100);
// burada bızım reusable codinig orneklerımıze benzıyor ama bız orda bıraz daha hıkayeleştirerek farlı dusunerek ılerledık hemen hemen aynı işte bu tur işleyısler var.... oncesınde bizde bu tur şeyler yapmıstık..
