import { User } from './models/User';

const user = new User({ name: 'myname', age: 20 });
user.set({ name: 'newname' });
//
user.get<'name'>('name');
user.get('age');

user.on('change', () => {
  console.log('change #1');
});
user.trigger('change');
