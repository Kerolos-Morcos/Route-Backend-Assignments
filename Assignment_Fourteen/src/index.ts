// User Class
class User {
  private readonly _id: number;
  public name: string;
  public email: string;
  private _password: string;
  public phone: string;
  private _age: number;
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    notebooks: NoteBook[] = [],
  ) {
    this._id = id;
    this.name = name;
    this.email = email;
    this._password = password;
    this.phone = phone;
    this.validateAge(age);
    this._age = age;
    this.notebooks = notebooks;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this.validateAge(value);
    this._age = value;
  }

  private validateAge(age: number): void {
    if (age < 18 || age > 60) {
      throw new Error("Age must be an integer between 18 and 60");
    }
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public displayNotebooks(): void {
    this.notebooks.forEach((notebook) => {
      notebook.displayNotes();
    });
  }

  public displayInfo(): void {
    console.log(`
    Id: ${this._id}
    Name: ${this.name}
    Email: ${this.email}
    Phone: ${this.phone}
    Age: ${this.age}`);
  }
}
const user1 = new User(
  1,
  "Kerolos",
  "kerolos@gmail.com",
  "123456",
  "1234567890",
  26,
);
// user1.displayInfo();

// Note Class
class Note {
  private readonly _id: number;
  public title: string;
  public content: string;
  public author: User;

  public getId(): number {
    return this._id;
  }
  constructor(id: number, title: string, content: string, author: User) {
    this._id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public preview(): string {
    return `${this.content.substring(0, 20)}...`;
  }
}
const note1 = new Note(1, "Note 1", "This is the content of note 1.", user1);
// console.log(note1.preview(), note1.author.name);

// Admin Class
class Admin extends User {
  public manageNotes(note: Note, newTitle: string): void {
    note.title = newTitle;
    console.log("Admin can manage notes.");
  }
}
const admin1 = new Admin(
  2,
  "Admin1",
  "admin1@gmail.com",
  "123456",
  "0987654321",
  30,
);
// admin1.displayInfo();
// admin1.manageNotes();
// console.log(note1.title);
// admin1.manageNotes(note1, "Updated Note 1");
// console.log(note1.title);

// NoteBook Class
class NoteBook {
  private notes: Note[] = [];
  //   First Solution:
  //   public addNote(note: Note): void {
  //     const newNote = new Note(
  //       note.getId(),
  //       note.title,
  //       note.content,
  //       note.author,
  //     );
  //     this.notes.push(newNote);
  //   }
  public addNote(id: number, title: string, content: string, user: User): void {
    const newNote = new Note(id, title, content, user);
    this.notes.push(newNote);
  }
  public removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.getId() !== noteId);
  }

  public displayNotes(): void {
    this.notes.forEach((note) => {
      console.log(`
      Note Id: ${note.getId()}
      Title: ${note.title}
      Content: ${note.content}
      User: ${note.author.name}`);
    });
  }
}
const noteBook1 = new NoteBook();
noteBook1.addNote(1, "Note 1", "This is the content of note 1.", user1);
user1.addNotebook(noteBook1);
// noteBook1.displayNotes();
// user1.displayNotebooks();
// user1.displayInfo();

// Generics
class Storage<T> {
  private _items: T[];
  constructor(items: T[] = []) {
    this._items = items;
  }
  public addItem(item: T): void {
    this._items.push(item);
  }
  removeItem(item: T): void {
    this._items = this._items.filter((i) => i !== item);
  }
  getAllItems(): T[] {
    return this._items;
  }
}
const numbers = new Storage<number>();
numbers.addItem(10);
numbers.addItem(20);
numbers.addItem(30);
numbers.removeItem(20);
// console.log(numbers.getAllItems());
