import { User } from './models/User';

// const user = new User({ name: 'myname', age: 20 });
// user.set({ name: 'newname' });
// //
// user.get<'name'>('name');
// user.get('age');

// user.on('change', () => {
//   console.log('change #1');
// });
// user.trigger('change');

const user = new User({ name: 'new record', age: 0 });
// user.fetch();

// setTimeout(() => {
//   console.log(user);
// }, 4000);

// user.set({ name: 'new name', age: 999 }); // for update  if id exist first set and then save  aslında db'ye save ederken constructor'dakı datayıda guncellemış olduk..
user.save();
