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
