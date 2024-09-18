// ısımlere takılmadan dedıgım gibi burada neleri anlatmak ısteıdıgmızı örneklerle ıcselleştirmek bıze katkı saglayacaktır...

//
// Single Responsibility Principle

// Bu prensip, bir sınıfın yalnızca bir işlevi olması gerektiğini belirtir.
// Yani bir sınıfın sadece bir işi olmalıdır.
// Eğer bir sınıfın birden fazla işlevi varsa, bu sınıfı parçalara ayırmak gerekir.
// Bu prensip, sınıfların daha okunabilir, daha sürdürülebilir ve daha esnek olmasını sağlar.
// Ayrıca, sınıfların daha kolay test edilmesini sağlar.
// Bu prensip, kodun daha temiz ve daha düzenli olmasını sağlar.

// Örneğin, bir web uygulamasında bir User (Kullanıcı) sınıfınız olduğunu ve bu sınıfın hem kullanıcı verileri yönetimi (kullanıcı bilgileri ve tercihleri gibi) hem de kullanıcı kimlik doğrulamasını yönettiğini varsayalım. SRP'ye göre, bunlar farklı sorumluluk alanlarını temsil ettikleri için ayrı sınıflar olmalıdır. Kullanıcı verilerinin nasıl yönetildiğiyle ilgili olası bir değişiklik, kullanıcı kimlik doğrulamasının nasıl ele alındığını etkilememeli ve tam tersi de geçerlidir."

class UserB {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
  //? burda  userauthenticate metotumu ayrı class halıne getırdım aşagıda ornegın..
}

class UserAuthentication {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  authenticate(password: string) {
    // Authenticate user
    return true;
  }
}
// Yukarıdaki örnekte, kullanıcı bilgilerini yönetmekten sorumlu olan User sınıfını, kullanıcı kimlik doğrulamasını yapan UserAuthentication sınıfından ayırdık. Her sınıf artık yalnızca tek bir nedenden dolayı değişikliğe ihtiyaç duyuyor ve bu, Tek Sorumluluk İlkesi ile uyumludur

//!Real World Applications of SRP

class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  // Methods related to content management
  createPost() {
    // Implementation here
  }

  updatePost() {
    // Implementation here
  }

  deletePost() {
    // Implementation here
  }

  // Method related to post display
  displayHTML() {
    return `<h1>${this.title}</h1><p>${this.content}</p>`;
  }
}
// Burada BlogPost sınıfının iki değişiklik nedeni vardır. Biri, içerik yönetimi işlevselliği değiştiğinde, diğeri ise gönderilerin nasıl görüntülendiğini değiştirmek istediğimizde. Bu tasarım, Tek Sorumluluk İlkesi'ne uymamaktadır.

// Bu durumu, içerik yönetimi ve görüntüleme sorumluluklarını iki ayrı sınıfa ayırarak SRP'yi takip edecek şekilde yeniden düzenleyebiliriz:

//!refactor

class BlogPostRefactor {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  // Methods related to content management
  createPost() {
    // Implementation here
  }

  updatePost() {
    // Implementation here
  }

  deletePost() {
    // Implementation here
  }
}

class BlogPostDisplay {
  blogPost: BlogPostRefactor;

  constructor(blogPost: BlogPostRefactor) {
    this.blogPost = blogPost;
  }

  displayHTML() {
    return `<h1>${this.blogPost.title}</h1><p>${this.blogPost.content}</p>`;
  }
}

//Artık BlogPost sınıfı yalnızca içerik yönetiminden sorumludur ve BlogPostDisplay sınıfı gönderilerin görüntülenmesinden sorumludur. Bu sınıfların her birinin yalnızca bir değişiklik nedeni vardır, bu da Tek Sorumluluk İlkesi'ne uygundur.
// Bu ayrım, bakımı ve anlaşılabilirliği iyileştirir. Gönderilerin nasıl görüntüleneceğini değiştirmemiz gerekirse, yalnızca BlogPostDisplay sınıfını değiştirmemiz yeterlidir. Benzer şekilde, gönderilerin nasıl yönetildiğini değiştirmemiz gerekirse, yalnızca BlogPost sınıfını değiştirmemiz yeterlidir.

class UserXX {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  saveUserToDB() {
    // Veritabanına kaydetme işlemi burada
  }

  sendWelcomeEmail() {
    // Hoş geldin e-postası gönderme işlemi burada
  }
}
// Bu haliyle, User sınıfı hem veritabanına kullanıcı kaydetmekten hem de hoş geldin e-postası göndermekten sorumlu. Ancak Tek Sorumluluk İlkesi'ne göre, bu iki sorumluluğun farklı sınıflara bölünmesi gerekmektedir."

//REFACTORED

class Usertt {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
// burda Usertt class tıpı olarak verdı ama o vardı dıye yanı ısterse ınterface olabılırdı yanı burda dırek emailservice ve userdb'leri ayrı class oldugu olayına dıkkat cekıyoruz
class UserDB {
  saveUser(user: Usertt) {
    // Implementation here
  }
}

class EmailService {
  sendWelcomeEmail(user: Usertt) {
    // Implementation here
  }
}

// 'Artık User sınıfı, UserDB sınıfı ve EmailService sınıfı, her biri tek bir sorumluluğa sahip. Veritabanı veya e-posta sistemiyle nasıl etkileşim kurduğumuzda bir değişiklik olursa, sırasıyla sadece UserDB veya EmailService sınıfını güncellememiz gerekir. Bu, sistemi daha kolay bir şekilde bakıma uygun hale getirir.';
// SRP'yi takip eden kod genellikle daha okunabilir ve anlaşılır olur. Her sınıfın tek bir odak noktası vardır ve amacı geliştiriciler için genellikle nettir

//! "Büyük sınıfları, her biri tek bir sorumluluğa sahip daha küçük sınıflara bölerek, her sınıfın amacı daha belirgin hale gelir. Önceki örnekte, User'ın bir kullanıcıyı temsil ettiği, UserDB'nin kullanıcılar için veritabanı işlemlerini yönettiği ve EmailService'in e-posta işlemlerini ele aldığı hemen anlaşılır.

// Bir sınıf veya modül çok fazla sorumluluk üstlendiğinde, bir alandaki değişiklikler farkında olmadan başka bir alanı etkileyebilir ve küçük değişikliklerin büyük ve öngörülemeyen etkilere sahip olduğu kırılgan bir sistem oluşturabilir. Her sınıfın yalnızca bir değişiklik nedeni olduğundan emin olarak, değişikliklerin etkisini en aza indirir ve ilgisiz özelliklerde hataların oluşma riskini azaltırsınız.
// hem veri yönetimi (CRUD işlemleri) hem de veri sunumu (kitap verilerinin HTML görüntüsünü oluşturma) yöntemlerini içeren bir Book sınıfı. Bu tasarım, Tek Sorumluluk İlkesi'ni (SRP) ihlal eder ve yüksek bağımlılığa yol açabilir."

//! Yeniden düzenlenmiş Book örneğinde, kitap verilerini yönetmek için Book sınıfı ve kitap verilerini HTML formatında sunmak için BookPresenter sınıfı olmak üzere iki ayrı sınıfımız var.

class BookAS {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  // Methods related to data management
  createBook() {
    // Implementation here
  }

  readBook() {
    // Implementation here
  }

  updateBook() {
    // Implementation here
  }

  deleteBook() {
    // Implementation here
  }
}

// yukardakı bookAS soylede yapılabılır

interface BookI {
  title: string;
  author: string;
}
// bookAs class'ınıda bookcrud olarak degıstırdım zaten crud ıslemlerı yapıyordu...
class BookCrud {
  constructor(book: BookI) {}

  // Methods related to data management
  createBook() {
    // Implementation here
  }

  readBook() {
    // Implementation here
  }

  updateBook() {
    // Implementation here
  }

  deleteBook() {
    // Implementation here
  }
}

class BookPresenter {
  book: BookI;

  constructor(book: BookI) {
    this.book = book;
  }

  displayHTML() {
    return `<h1>${this.book.title}</h1><p>${this.book.author}</p>`;
  }
}

// Şimdi, kitap verilerini sadece HTML'de değil, düz metin veya JSON formatında da sunmak istediğiniz bir durumu düşünün, örneğin düz metin bir e-posta için veya bir API yanıtı için. SRP uygulandığında, Book sınıfını veya BookPresenter sınıfını değiştirmeden yeni sunucu sınıfları eklemek kolaydır. Bunu şu şekilde yapabilirsiniz:"

class TextBookPresenter {
  book: BookAS;

  constructor(book: BookAS) {
    this.book = book;
  }

  displayText() {
    return `Title: ${this.book.title}, Author: ${this.book.author}`;
  }
}

class JSONBookPresenter {
  book: BookAS;

  constructor(book: BookAS) {
    this.book = book;
  }

  displayJSON() {
    return JSON.stringify({ title: this.book.title, author: this.book.author });
  }
}

// Bu şekilde, Book sınıfı, kodunda herhangi bir değişiklik yapmadan farklı bağlamlarda (HTML görüntüleme, metin görüntüleme, JSON görüntüleme) yeniden kullanılabilir. Bu, Tek Sorumluluk İlkesi'ne uymanın getirdiği yeniden kullanılabilirliğin gücüdür
// Sınıfları tek bir göreve odaklı tutarak, mevcut sınıfları değiştirmeden işlevselliği genişletebiliriz, bu da SOLID'in başka bir ilkesi olan Açık/Kapalı İlkesine (Open/Closed Principle) uygundur.

//Diğer yandan, SRP uygulanmadan önceki orijinal Book sınıfında, kitapları metin veya JSON formatında görüntülemek için bir özellik eklemek istediğinizde, Book sınıfını değiştirmek zorunda kalırdınız, bu da mevcut işlevselliği bozabilir. Orijinal Book sınıfı, sorumlulukları çok çeşitli olduğundan daha az yeniden kullanılabilir hale gelir ve yeni bağımlılıklar ve potansiyel hatalar ortaya çıkarma riski olmadan işlevselliğini genişletmek daha zor olur.

//! srp adına Durum: Fatura Yönetim Sistemi orngı vermek gerekirse...

// bad code

class Invoice {
  customer: string;
  amount: number;

  constructor(customer: string, amount: number) {
    this.customer = customer;
    this.amount = amount;
  }

  generateInvoice() {
    // Fatura oluşturma işlemi
    console.log(`Fatura müşteri: ${this.customer}, tutar: ${this.amount}`);
  }

  saveToFile() {
    // Faturayı bir dosyaya kaydetme işlemi
    console.log('Fatura dosyaya kaydedildi.');
  }
}
// invoice sınıfı hem fatura oluşturma işini yapıyor hem de dosya sistemiyle ilgileniyor. Eğer dosya kaydetme işlemi değişirse (örneğin, veritabanına kaydetme gibi), bu sınıfı değiştirmek zorunda kalırsınız. Bu da kodun yönetimini zorlaştırır.
interface InvoiceData {
  customer: string;
  amount: number;
}
class InvoiceRefactor {
  // for generate invoice
  customer: string;
  amount: number;

  constructor(customer: string, amount: number) {
    this.customer = customer;
    this.amount = amount;
  }

  generateInvoice() {
    // Fatura oluşturma işlemi
    console.log(`Fatura müşteri: ${this.customer}, tutar: ${this.amount}`);
  }
}

class InvoiceFileSaver {
  saveToFile(invoice: InvoiceData) {
    // Faturayı dosyaya kaydetme işlemi
    console.log(
      `Fatura dosyaya kaydedildi: ${invoice.customer} - ${invoice.amount}`
    );
  }
}

class InvoiceJSONSaver {
  saveToJSON(invoice: InvoiceData) {
    const jsonData = JSON.stringify({
      customer: invoice.customer,
      amount: invoice.amount,
    });

    console.log(`Fatura JSON formatında kaydedildi: ${jsonData}`);
  }
}
