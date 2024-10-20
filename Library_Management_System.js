class Book {
    constructor(title,author,ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true;
    }

    getDetails(){
        console.log(`Title: ${this.title}, Author: ${this.author},ISBN: ${this.ISBN}`);
    }

    get isAvailable(){
        console.log(this._isAvailable);
    }

    set isAvailable(availability){
    this._isAvailable = availability;
    }
}

class Section{
    constructor(name){
        this.name = name;
        this.books = [];
    }

    addBook(book){
        if (book instanceof Book){
            this.books.push(book);
        }
        else{
            console.log("Error");
        }
    }

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
}

class Patron{
    constructor(name){
        this.name = name;
        this.borrowedBooks = [];
    }
    
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

class VIPPatron extends Patron {
    constructor(name) {
        super(name);
        this.priority = true;
    }

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
