import { Pointable } from './store';

export class Product implements Pointable {
  constructor(public title: string, public price: number) {
    this.title = title;
    this.price = price;
  }

  async addPoint(): Promise<void> {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.title,
          price: this.price,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }
}
