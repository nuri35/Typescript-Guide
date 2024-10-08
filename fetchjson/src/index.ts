import axios, { AxiosResponse } from 'axios';

// Todo: 1. Fix the error by adding an interface to the response.data
const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response: AxiosResponse<Todo, any>) => {
  let datams = response.data; // this is the best correct approach

  const id: number = datams.id;
  const title: string = datams.title;
  const completed: boolean = datams.completed;
  logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is it finished? ${completed}
  `);
};

declare global {
  interface Array<T> {
    myFn(): void;
  }
}
// arraye tıplemeyı ekledıgımız ıcın javascript'DE artık protypına myfn dıye fonksıyon ekleyebırlız
Array.prototype.myFn = function () {
  console.log('myFn');
};

const abc: Array<number> = [1, 2, 3];
abc.myFn(); // ok
console.log(abc.length);
