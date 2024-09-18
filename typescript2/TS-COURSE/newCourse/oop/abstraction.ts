// Here's a basic example of abstraction using TypeScript:
//!Soyutlama (abstraction), yazılım geliştirmede karmaşık sistemlerin daha basit, anlaşılır ve kullanılabilir hale getirilmesi amacıyla gereksiz detayların gizlenmesi anlamına gelir.Yani, soyutlama sayesinde bir nesnenin veya sürecin sadece önemli ve gerekli özelliklerine odaklanırız, geri kalan karmaşıklıkları saklarız.

// Define an interface for a shape
interface Shape {
  area(): number;

  perimeter(): number;
}

// Define a class that implements the Shape interface
//!Bu, her iki sınıfın da area() ve perimeter() yöntemlerine sahip olmasını zorunlu kılarak bir soyutlama seviyesi sağlar. bunları oncekı tum ornkelerımızde yapmıstık fakat ısmi abstractıon diye gecıyormuş.
//Verdiğimiz örnekte, Shape adında bir arabirim (interface) tanımladık. Bu arabirim, bir şeklin sahip olması gereken iki önemli metodu tanımlıyor: area() ve perimeter(). Bu metotlar, bir şeklin alanını ve çevresini hesaplamak için kullanılıyor. Ancak, bu metotların nasıl çalıştığını, yani şeklin türüne göre nasıl hesaplama yapıldığını tanımlamıyor. Bu, soyutlamanın ta kendisidir.
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

// Create an instance of the Rectangle class

const rectangle = new Rectangle(10, 20);

console.log(rectangle.area()); // 200

console.log(rectangle.perimeter()); // 60

// Define a class that implements the Shape interface

class Circle implements Shape {
  constructor(private radius: number) {}

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Create an instance of the Circle class

const circle = new Circle(10);

console.log(circle.area()); // 314.1592653589793

console.log(circle.perimeter()); // 62.83185307179586

// Function to calculate the total area of an array of shapes

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((acc, shape) => acc + shape.area(), 0);
}
//!alculateTotalArea() fonksiyonu, Shape nesnelerinin bir dizisini kabul eder ve toplam alanı hesaplar, farklı shape türleriyle tutarlı ve basitleştirilmiş bir şekilde çalışarak buda soyutlamanın faydalarını gösterir."yanı Shape ınterfaceıne uyacak tum dızileri kabul eder ve toplam alanı hesaplar"
// Create an array of shapes

const shapes: Shape[] = [rectangle, circle];

console.log(totalArea(shapes)); // 514.1592653589793

//  Soyutlamanın Olması İçin Ne Gerekiyor?
// Soyutlama olması için şunlar gereklidir:

// Gereksiz Detayların Gizlenmesi: Kullanıcıya sadece ihtiyaç duyduğu bilgiler verilmelidir, detaylar gizlenmelidir. Örneğin, bir dairenin alanını hesaplamak için area() metodunu çağırırsınız, ama metodun içinde Pi çarpımı nasıl yapılıyor bilmek zorunda değilsiniz.

// Genelleme ve Ortak Yapı: Farklı nesneler arasında ortak özellikler veya davranışlar belirlenmeli ve bunlar soyutlamalar (interface veya abstract class gibi) aracılığıyla sunulmalıdır. Shape arabirimi bu ortak yapıyı sağlar.

// Örneğimizde iki farklı sınıf tanımlamıştık: Circle (Daire) ve Rectangle (Dikdörtgen). Her iki sınıf da Shape arabirimini (interface) uyguluyor. Shape arabirimi, area() ve perimeter() adlı iki metodu tanımlar. Ancak bu arabirim, bu metodların nasıl çalıştığını (yani içlerindeki hesaplama mantığını) söylemez; sadece bu metodların var olduğunu ve bu metodların bir sayısal değer (number) döndürmesi gerektiğini belirtir.

// Bu örnekte, userRepository ile çalışırken veri tabanının nasıl yapılandırıldığını veya sorguların nasıl oluşturulduğunu bilmeye gerek yoktur. TypeORM bu detayları soyutlar ve find ve findOneBy gibi metodlar sağlar
