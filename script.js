let myLibrary = [];

function Book(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read;
}

let authorName = '';
let titleName = '';
let pagesNumber = 0;
let readYN = '';
const table = document.querySelector(".table-class");
document.querySelector(".book-form").addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
  event.preventDefault();
  authorName = document.getElementById("author").value;
  titleName = document.getElementById("title").value;
  pagesNumber = document.getElementById("pages").value;
  readYN = document.getElementById("read").value;
  let idValue = '';

  if (!authorName || !titleName || !pagesNumber || !readYN) {
    alert("Please fill in all fields.");
    return;
  }

  myLibrary.push(new Book(authorName, titleName, pagesNumber, readYN));
  const arrayLength = myLibrary.length;
  const book = Object.values(myLibrary[arrayLength-1]);

  const tablerow = document.createElement("tr");

  for (let i = 0; i < book.length+1; i++){
    if (i === 0){
      idValue = book[0];
    }
    else {
      const tablehead = document.createElement("th");
      tablehead.textContent = book[i];
      tablerow.appendChild(tablehead);
      if (i === book.length){
        const deleteBookFromArrayButton = document.createElement("button");
        deleteBookFromArrayButton.className = "delete-book-from-array";
        deleteBookFromArrayButton.textContent = "X";
        deleteBookFromArrayButton.addEventListener("click", deleteBookFromLibrary);
        deleteBookFromArrayButton.dataset.index = idValue;
        tablehead.appendChild(deleteBookFromArrayButton);
        tablerow.appendChild(tablehead);
      }
    }
  }
  table.appendChild(tablerow);
  event.target.reset();
}

function deleteBookFromLibrary(event){
  const deleteTheBookFromLibraryById = event.target.dataset.index;
  console.table(myLibrary);
  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].id === deleteTheBookFromLibraryById){
      console.log(myLibrary[i].id + " |||||| " + deleteTheBookFromLibraryById);
      myLibrary.splice(i,1);
      table.deleteRow(i+1);
      console.log(myLibrary.length);
    }
  }
}


