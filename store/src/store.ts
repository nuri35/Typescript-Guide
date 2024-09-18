import { Product } from './product';
import { Users } from './users';

//?? How can we improve this code?

export interface Pointable {
  addPoint(): Promise<void>;
}

//!!!! this is bad code
export class StoreBad {
  constructor() {}

  addProductPoint(product: Product) {
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  addUsersPoint(user: Users) {
    fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  addCategoryPoint(category: string) {
    fetch('https://fakestoreapi.com/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }
}

//!!!! this is good code
class StoreGood {
  constructor(public point: Pointable) {
    this.point = point;
  }

  addPoint() {
    this.point.addPoint();
  }
}

const product = new Product('title', 100);
const store = new StoreGood(product);
store.addPoint();
