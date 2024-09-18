// artık burdayız herşey ok 114.dersden ıtıbaren...

//
interface UserItem {
  userName: string;
  email: string;
  login: () => void;
}

class AdminI implements UserItem {
  constructor(public userName: string, public email: string) {}

  login() {
    console.log('login');
  }
}

class CustomerI implements UserItem {
  constructor(public userName: string, public email: string) {}

  login() {
    console.log('login');
  }
}

// user: UserItem ile bildigimiz gibi aklımızdan gecıtgı gibi işte yapılıyor...
//todo burdakı örnek işte reusable coding interface bildigmiz kafamızdakı şeylerin kucuk ornegı işte bu ornegı de bızım tanımlamalar updaten sonra projemızde kod duzenlerken zaten ornek yapacaktık controller service dekı bu yapıyı burdakı gibi yapabilirmyiz dusun bakalım... en azından service içerisndekı tum kodlar yerıne user.login gibi metot ıcerıde calsır sadece daha temız olur mesela ama başka şeyler ıcınde ornek yapılabılır not olarak kalsın..
class Auth {
  public static login(user: UserItem) {
    user.login();
  }
}

const admins = new AdminI('admin', 'as');
const customers = new CustomerI('customer', 'as');

Auth.login(admins);
Auth.login(customers);

//----------------------------------------------------------------
