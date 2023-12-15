
const myLibrary = [];
const tableBody = document.querySelector("#book-list>tbody");
const newBookBtn = document.querySelector("#new-book-btn");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialogBtn = document.querySelector("#close-dialog");
const newBookForm = document.querySelector("#new-book-dialog>form");
const submitBookBtn = document.querySelector("#submit-book");
const cancelBtn = document.querySelector("#cancel-book");


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

/* Use if book should be added without updating the whole table display*/
function displayNewBook(book){
    let bookRow = document.createElement("tr");
    let countCell = document.createElement("td");
    countCell.innerText = myLibrary.length; //newbook already added to library
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

function populateTable(){
    tableBody.innerHTML="";
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
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("title", "Delete");
        deleteBtn.innerText="X";
        deleteBtn.setAttribute("data-attribute", i);
        deleteBtn.onclick=deleteBook;

        let readBtn = document.createElement("button");
        readBtn.setAttribute("title", "Mark Read/Unread");
        readBtn.innerHTML= `
        <img src="icons/book-open-blank-variant.png">
        `;
        readBtn.setAttribute("data-attribute", i);
        readBtn.onclick = toggleRead;

        let actionCell = document.createElement("td");
        actionCell.appendChild(readBtn);
        actionCell.appendChild(deleteBtn);
        bookRow.appendChild(actionCell);
        tableBody.appendChild(bookRow);
    }
}

function addNewBook(){
    let inputs = Array.from(newBookForm.querySelectorAll("input"));
    let book = new Book(
        inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked
    )
    addBookToLibrary(book);
    populateTable();
    newBookForm.reset();
}

function cancelNewBook(){
    newBookDialog.close();
    newBookForm.reset();
}

function deleteBook(){
    myLibrary.splice(this.getAttribute("data-attribute"), 1);
    populateTable();
}

function toggleRead(){
    let book = myLibrary[this.getAttribute("data-attribute")];
    book.isRead = !book.isRead;
    populateTable();
}

/*INIT PAGE*/
initDefaultLibrary();
populateTable();
newBookBtn.addEventListener("click", ()=>{
    newBookDialog.show();
});
closeDialogBtn.addEventListener("click", ()=>{
    newBookDialog.close();
})
newBookForm.addEventListener("submit", addNewBook);
cancelBtn.addEventListener("click", cancelNewBook);





