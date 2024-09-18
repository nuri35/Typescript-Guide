// burdada gereklı şeyler yazılır.
class Book {
  constructor(
    public title: string,
    public author: string,
    public readonly ISBN: string,
    public yearPublished?: number
  ) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.ISBN = ISBN;
  }
}

const firstBook = new Book('Typescript', 'John Doe', '1234567890', 2021);

function getBookInfo(book: Book): string {
  return `Book: ${book.title} - ${book.author}`;
}

console.log(getBookInfo(firstBook));

class Ebook extends Book {
  constructor(
    public title: string,
    public author: string,
    public ISBN: string,
    public fileSize: number,
    public format: string,
    public yearPublished?: number
  ) {
    super(title, author, ISBN, yearPublished);
    this.fileSize = fileSize;
    this.format = format;
  }
}
