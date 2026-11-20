"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User Class
class User {
    _id;
    name;
    email;
    _password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, age, notebooks = []) {
        this._id = id;
        this.name = name;
        this.email = email;
        this._password = password;
        this.phone = phone;
        this.validateAge(age);
        this._age = age;
        this.notebooks = notebooks;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this.validateAge(value);
        this._age = value;
    }
    validateAge(age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be an integer between 18 and 60");
        }
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    displayNotebooks() {
        this.notebooks.forEach((notebook) => {
            notebook.displayNotes();
        });
    }
    displayInfo() {
        console.log(`
    Id: ${this._id}
    Name: ${this.name}
    Email: ${this.email}
    Phone: ${this.phone}
    Age: ${this.age}`);
    }
}
const user1 = new User(1, "Kerolos", "kerolos@gmail.com", "123456", "1234567890", 26);
// user1.displayInfo();
// Note Class
class Note {
    _id;
    title;
    content;
    author;
    getId() {
        return this._id;
    }
    constructor(id, title, content, author) {
        this._id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        return `${this.content.substring(0, 20)}...`;
    }
}
const note1 = new Note(1, "Note 1", "This is the content of note 1.", user1);
// console.log(note1.preview(), note1.author.name);
// Admin Class
class Admin extends User {
    manageNotes(note, newTitle) {
        note.title = newTitle;
        console.log("Admin can manage notes.");
    }
}
const admin1 = new Admin(2, "Admin1", "admin1@gmail.com", "123456", "0987654321", 30);
// admin1.displayInfo();
// admin1.manageNotes();
// console.log(note1.title);
// admin1.manageNotes(note1, "Updated Note 1");
// console.log(note1.title);
// NoteBook Class
class NoteBook {
    notes = [];
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
    addNote(id, title, content, user) {
        const newNote = new Note(id, title, content, user);
        this.notes.push(newNote);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.getId() !== noteId);
    }
    displayNotes() {
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
class Storage {
    _items;
    constructor(items = []) {
        this._items = items;
    }
    addItem(item) {
        this._items.push(item);
    }
    removeItem(item) {
        this._items = this._items.filter((i) => i !== item);
    }
    getAllItems() {
        return this._items;
    }
}
const numbers = new Storage();
numbers.addItem(10);
numbers.addItem(20);
numbers.addItem(30);
numbers.removeItem(20);
// console.log(numbers.getAllItems());
