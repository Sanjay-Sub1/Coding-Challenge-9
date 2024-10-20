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
