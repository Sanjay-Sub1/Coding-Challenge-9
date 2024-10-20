//Creates a class Book
class Book {
    constructor(title,author,ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true;
    }
//Logs the title, authoer and ISBN of the book
    getDetails(){
        console.log(`Title: ${this.title}, Author: ${this.author},ISBN: ${this.ISBN}`);
    }
//A getter for _isAvailable
    get isAvailable(){
        console.log(this._isAvailable);
    }
//A setter for _isAvailable
    set isAvailable(availability){
    this._isAvailable = availability;
    }
}

//Creates a class section
class Section{
    constructor(name){
        this.name = name;
        this.books = [];
    }
//Adds a stated book into the stated section
    addBook(book){
        if (book instanceof Book){
            this.books.push(book);
        }
        else{
            console.log("Error");
        }
    }
//Shows what books are available in the section as of the current time
    getAvailableBooks(){
        console.log(this.books.filter(book => book.isAvailable).length);
    }
    
    listBooks(){
        let listbook = "";

        this.books.forEach(book => {
            let available;
            if (book.isAvailable) {
              available = "Available";
            } else {
              available = "Borrowed";
            }
            listbook += `${book.title}, ${available}`;
          });
    }
//Calculates the total amount of books remaining in the section as a number
    calculateTotalBooksAvailable(){
        let availableCount = 0
//Adds to the count
        this.books.forEach(book => {
            if(book.isAvailable){
                availableCount++;
            }
        });
    }
}
//Creates a class for patrons
class Patron{
    constructor(name){
        this.name = name;
        this.borrowedBooks = [];
    }
//Will update the status of a book to be currently borrowed by the patron
    borrowBook(book){
        if (book.isAvailable){
            book.isAvailable = false;
            this.borrowedBooks.push(book);
            console.log(`${this.name} is borrowing ${book.title}`);
        }
        else{
            console.log("Book not available");
        }
    }
//Returns a book a patron has borrowed, allowing for another person to borrow
    returnBook(book){
        if (this.borrowedBooks.includes(book)){
            book.isAvailable = true;
            this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
            console.log(`${this.name} returned ${book.title}`);
        }
        else{
            console.log(`${this.name} hasn't borrowed ${book.title}`);
        }
    }
//Shows the borrowed books listed
    listBorrowedBooks(){
        if(this.borrowedBooks.length === 0){
            console.log(`${this.name} has no borrowed books`)
        }
        else{
            console.log(`${this.name} has borrowed books`);
            this.borrowedBooks.forEach(book => console.log(`${book.title}`));
        }
    }
}
//Creates a class VIPPatron that extends the previously created Patron class
class VIPPatron extends Patron {
    constructor(name) {
        super(name);
        this.priority = true;
    }
//Overrides the borrowedBook in the Patron class
    borrowBook(book) {
        if (book.isAvailable || this.borrowedBooks.includes(book)) {
            book.isAvailable = false;
            this.borrowedBooks.push(book);
            console.log(`${this.name} (VIP) is borrowing "${book.title}".`);
        } else {
            console.log(`Error: "${book.title}" is currently unavailable.`);
        }
    }
}
//Creates a class libary that has sections and books
class Library {
    constructor() {
        this.sections = [];
    }
//Adds a section into the library
    addSection(section) {
        if (section instanceof Section) {
            this.sections.push(section);
        } else {
            console.log(`Error`);
        }
    }
//Calculates the total books available for each section
    calculateTotalBooksAvailable() {
        this.sections.forEach(section => {
            section.calculateTotalBooksAvailable();
        });
    }
}
//Creates a new library
const library = new Library();

//Creating 2 new sections for the new library
const fictionSection = new Section("Fiction");
const nonFictionSection = new Section("Non-Fiction");

//Creates 4 books
let book1 = new Book('Harry Potter and the prisoner of Azkaban', 'J.K Rowling', '9780743273565');
let book2 = new Book('Animal Farm', 'George Orwell', '9780451524935');
let book3 = new Book('Sapiens', 'Yuval Noah Harari', '9780062316097');
let book4 = new Book('Educated', 'Tara Westover', '9780399590504');

//Adds the books to their respective sections
fictionSection.addBook(book1);
fictionSection.addBook(book2);
nonFictionSection.addBook(book3);
nonFictionSection.addBook(book4);

//Adds the sections to the library
library.addSection(fictionSection);
library.addSection(nonFictionSection);

//Creating 1 regular and 1 VIP Patron
let regularPatron = new Patron('Elijah');
let vipPatron = new VIPPatron('Sanjay');

//Lets the patrons borrow books and updates it
regularPatron.borrowBook(book1);
vipPatron.borrowBook(book2);
vipPatron.borrowBook(book3);

//Lists the books borrowed by each type of patron
regularPatron.listBorrowedBooks();
vipPatron.listBorrowedBooks();

//Returns the books
regularPatron.returnBook(book1);
vipPatron.returnBook(book2);

library.calculateTotalBooksAvailable();
