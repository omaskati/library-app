
const myLibrary = [];
const tableBody = document.querySelector("#book-list>tbody");

function Book(title, author, numPages, isRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.info = function(){
        return `${this.title} by ${this.author}, ${numPages} pages, ${(isRead?"read already": "not read yet")}`;
    }
}

function addBookToLibrary(book){
    if(book instanceof Book){
        myLibrary.push(book);
        return true;
    }
    else return false;
}

function initDefaultLibrary(){
    addBookToLibrary(new Book("Green Eggs and Ham", "Dr. Seuss", 65, true));
    addBookToLibrary(new Book("Where the Wild Things Are", "Maurice Sendak", 40, true));
    addBookToLibrary(new Book("The Very Hungry Caterpillar", "Eric Carle", 26, true));
}

// myLibrary.forEach((book)=>{console.log(book.title)});


function populateTable(){
    for(let i = 0; i< myLibrary.length; i++){
        let book = myLibrary[i];
        let bookRow = document.createElement("tr");
        let countCell = document.createElement("td");
        countCell.innerText=i+1;
        bookRow.appendChild(countCell);
        for(let property in book){
            if(property !== "info"){
                let cell= document.createElement("td");
                cell.innerText=book[property];
                bookRow.appendChild(cell);
            }
        }
        tableBody.appendChild(bookRow);
    }
}

/*INIT PAGE*/
initDefaultLibrary();
populateTable();



