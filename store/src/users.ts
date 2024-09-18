import { Pointable } from './store';

export class Users implements Pointable {
  constructor(public email: string, public username: string) {
    this.email = email;
    this.username = username;
  }

  async addPoint(): Promise<void> {
    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          username: this.username,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
}
