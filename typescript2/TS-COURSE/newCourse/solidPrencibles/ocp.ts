//open-closeed principle
class Discount {
  giveDiscount(customerType: string) {
    if (customerType === 'Regular') {
      return 10;
    } else if (customerType === 'Premium') {
      return 20;
    }
  }
}
// Bu örnekte, eğer yeni bir müşteri tipi eklemek istersek, örneğin "Altın" müşterisi gibi farklı bir indirimle, Discount sınıfındaki giveDiscount metodunu değiştirmemiz gerekecektir:

interface Customer {
  type: string;
}

class Discount2 {
  giveDiscount(customer: Customer): number {
    if (customer.type === 'Regular') {
      return 10;
    } else if (customer.type === 'Premium') {
      return 20;
    } else if (customer.type === 'Gold') {
      return 30;
    }
    return 0;
  }
}

// Bu, Açık-Kapalı Prensibini ihlal eder çünkü yeni bir işlevselliği (yeni müşteri tipi) eklemek için mevcut kodu değiştiriyoruz.Ayrıca karısıklıklar ve yenı mevcut kodu degısıtrerek daha fazla yneı hatalara neden olabilirz. Açık-Kapalı Prensibine göre, bu yeni işlevselliği, yeni kod ekleyerek (genişleterek) ekleyebilmemiz gerekir, mevcut kodu değiştirerek değil.

// Açık-Kapalı Prensibi ile

interface CustomerA {
  giveDiscount(): number;
}

class RegularCustomer implements CustomerA {
  giveDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements CustomerA {
  giveDiscount(): number {
    return 20;
  }
}

class DiscountRefactored {
  giveDiscount(customer: CustomerA): number {
    return customer.giveDiscount();
  }
}

// Yukarıdaki örnekte, giveDiscount metoduna sahip bir CustomerA arayüzü tanımladık. RegularCustomer ve PremiumCustomer sınıfları CustomerA arayüzünü uygular.

// DiscountRefactored sınıfı artık her yeni müşteri tipi eklendiğinde değiştirilmesi gerekmediğinden değişikliğe kapalı hale gelir. yanı mevcut kodu degıstırmıyoruz.  return customer.giveDiscount(); kısmı hep aynı kalmıs oluyor.. Genişlemeye açık hale getirdik çünkü Customer arayüzünü uygulayan daha fazla sınıf oluşturarak kolayca daha fazla müşteri tipi ekleyebiliriz. yenı kod ekleyerek....

// Bu, SOLID prensiplerinden Açık-Kapalı Prensibi'nin (OCP) TypeScript kod örneğiyle kısa bir açıklamasıdır. Bu prensibe doğru bir şekilde uyulduğunda, kod daha sağlam, esnek ve hatalara daha az eğilimli olur."

// Açık-Kapalı Prensibi (OCP), genişlemeye açık ancak değişikliğe kapalı olan bileşenler oluşturmayı teşvik ederek daha yüksek bir kod tekrar kullanılabilirliği derecesini destekler. yanı var olan kodu asla duzelterek yenı şeyler eklenmez... o kodları ayrı class'lara ayırısın ornegın yenı class yenı ozellıkler yenı metotlar olusutursun onlarlı ana class'da birleştırmıs ornegın kullanırsın... böylelıkle genıslemeye teşvik eder..

// Örneğin, her müşteri tipi için sadakat puanlarını farklı şekilde hesaplayan yeni bir işlevsellik eklemek isteseydik, RegularCustomer, PremiumCustomer ve GoldCustomer sınıflarını değiştirmeden kullanabilirdik, çünkü bu sınıflar her müşteri tipi ile ilişkili davranışı kapsüller. İşte bunu nasıl yapabileceğinize dair bir örnek:

interface CustomerRef {
  giveDiscount(): number;

  addLoyaltyPoints(amountSpent: number): number;
}

class RegularCustomerA implements CustomerRef {
  giveDiscount(): number {
    return 10;
  }

  addLoyaltyPoints(amountSpent: number): number {
    // Normal müşteriler her harcanan dolar için 1 puan alır varsayalım.
    return amountSpent;
  }
}

class PremiumCustomerA implements CustomerRef {
  giveDiscount(): number {
    return 20;
  }

  addLoyaltyPoints(amountSpent: number): number {
    // Premium müşteriler her harcanan dolar için 3 puan alır varsayalım.
    return 3 * amountSpent;
  }
}

class GoldCustomer implements CustomerRef {
  giveDiscount(): number {
    return 30;
  }

  addLoyaltyPoints(amountSpent: number): number {
    // Altın müşteriler her harcanan dolar için 5 puan alır.
    return 5 * amountSpent;
  }
} // unutma ornegın  bu yukardakı ayrıdıgmız class'lara yenı ozellıkler metotlar eklıyoruz gordugun gibi.. yukardakı classları genısletebılyıoruz degıstıroyuz orası acık oluyor.. discountSt ıcerısı kapalı degısıme yanı return customer.giveDiscount(); kısmı mesela..

class DiscounSt {
  giveDiscount(customer: CustomerRef): number {
    return customer.giveDiscount();
  }
}

class LoyaltyProgram {
  addPoints(customer: CustomerRef, amountSpent: number): number {
    return customer.addLoyaltyPoints(amountSpent);
  }
}

// Yukarıdaki kodda, Customer arayüzüne addLoyaltyPoints adlı bir yöntem ekledim. Customer arayüzünü uygulayan her sınıf, bu metodun nasıl çalıştığını tanımlamak zorundadır. GoldCustomer sınıfı, harcanan miktarın 5 katını döndürecek şekilde tanımlar.

// Bu şekilde, kodumuza yeni davranışlar ve sınıflar eklemeye devam edebiliriz, mevcut sınıfları değiştirmeden, Açık-Kapalı Prensibine uygunluğu koruyarak. Ayrıca, her müşteriye puan ekleyen yeni bir LoyaltyProgram sınıfımız var, bu da kodun tekrar kullanılabilirliğini daha da göstermektedir."

//! yeni işlevsellik, tipik olarak yeni sınıflar veya modüller eklenerek genişletme yoluyla eklenir. Bu ayrım, sürümleme ve yamalama açısından önemli etkiler taşır.
// Bu yeni ekleme ile, Discount ve LoyaltyProgram sınıflarının, yeni bir müşteri türü eklenmesine rağmen değişmediğini görebiliriz. Yeni VIPCustomer sınıfımız Customer arayüzünü doğru bir şekilde uyguladığı sürece, mevcut kodumuzun doğru bir şekilde çalışmaya devam edeceğinden emin olabiliriz. Bu, Açık-Kapalı Prensibi'ni takip etmenin doğrudan bir sonucudur."

//!ÖRNEK ocp'yi ihlal eden bir ornek

class PaymentProcessor {
  processPayment(method: string, amount: number): void {
    if (method === 'CreditCard') {
      console.log(`Processing credit card payment of ${amount}`);
      // Kredi kartı ödeme işlemi...
    } else if (method === 'PayPal') {
      console.log(`Processing PayPal payment of ${amount}`);
      // PayPal ödeme işlemi...
    }
  }
}
//  yeni bir ödeme yöntemi eklemek istediğimizde mevcut kodu değiştirmek zorunda kalıyoruz.
// Bu tasarım, Açık-Kapalı Prensibi'ni ihlal eder çünkü yeni bir ödeme yöntemi eklemek için processPayment metodunu değiştirmemiz gerekecektir.

//! OCP'ye uygun bir tasarım yapalım. Her bir ödeme yöntemi için ayrı bir sınıf oluşturup, bunları bir arayüz ile uygulayacağız. Yeni bir ödeme yöntemi eklemek istediğimizde, mevcut kodu değiştirmek yerine yeni bir sınıf ekleyeceğiz. dilersen o sınıflarıda yneı ozellkler ekeyebılcegız tabikide..

interface PaymentMethodI {
  process(amount: number): void;
}

class CreditCardPaymentS implements PaymentMethodI {
  process(amount: number): void {
    console.log(`Processing credit card payment of ${amount}`);
    // Kredi kartı ödeme işlemi...
  }
}

class PayPalPaymentS implements PaymentMethodI {
  process(amount: number): void {
    console.log(`Processing PayPal payment of ${amount}`);
    // PayPal ödeme işlemi...
  }
}

class PaymentProcessorS {
  processPayment(paymentMethod: PaymentMethodI, amount: number): void {
    paymentMethod.process(amount);
  } //!ama mesela burda o stephen griderdan ogrendıgımız gibi bu yapıyı anlatmıyor orda hikayeleştirerek bir nedene bagladık ama ordada bunu ocp'yi halletmişiz ... yanı o ogrendıgım o stephen grıder orneklerındeede yaparken aslında ocp de yapmısız.. ama burda bır hıkayeye baglı bir nedene baglı gıtmedık dırek olayı anlattık. kirli kodu ayırdık farklı modullere ve o modull class'lardakı şeyleri  PaymentProcessorS classında kullanabılmek ıcınde ınterface ile bagladık bu yontem ile aslında   paymentMethod.process(amount); ile farklı class'lardakı metotları calıstırdık işimizi gordu o stephen griderda hıkayeleştirerek ogrendıgımı dusunmessek burda işimizi gordu hemde bu  paymentMethod.process(amount); kısma hıc ellemeden  yenı classlar yenı ozellıkler ekleyerek dışardakı class'lara işte genısletebildim... buna dıkkat cektık..
} //? bunun dışında farklı kod yazım sekıllerındede belkı ocp kullanılabilir bol bol gordukce anlarız...
// Şimdi, yeni bir ödeme yöntemi eklemek istediğimizde, sadece yeni bir sınıf oluşturup PaymentMethod arayüzünü uygularız. Mevcut kodu değiştirmeye gerek kalmaz.

//!Bu örnekte, Açık-Kapalı Prensibi'ni izleyerek ödeme sistemi tasarladık. Yeni bir ödeme yöntemi eklemek istediğimizde, sadece yeni bir sınıf oluşturarak mevcut kodu değiştirmeden sistemi genişletebildik. Bu, kodun bakımını kolaylaştırır, hataların azalmasını sağlar ve yeni işlevlerin eklenmesini hızlandırır.
// Diyelim ki yeni bir ödeme yöntemi olarak "Bitcoin" eklemek istiyoruz. OCP'yi izlediğimiz için, bu yeni ödeme yöntemini mevcut kodu değiştirmeden ekleyebiliriz. yenı bıtcoin class'ı olusuturz.. ornegın.

//burdakı vurgulanmak ıstenen şey o karısık if else'leri her birini anlamlı sekılde ayrı class'lara ayırdık yenı bır if ekleyecegın zaman ornegın odeme sistemı onuda ayrıca class halinde yazarsın hıcbırzaman PaymentProcessorS dakı metot degısmez daha az kod  hatası daha az karısıklık olur. ayrıca ayrıdıgın class'larada yenı ozellıkler ekleyebılrsın..

// todo birazdan hemen başla
