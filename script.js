let myLibrary = [];

class Library{
  constructor(author, title, pages, read){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

const table = document.querySelector(".table-class");
document.querySelector(".book-form").addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event) {
  event.preventDefault();

  const newBook = new Library(
    document.getElementById("author").value,
    document.getElementById("title").value,
    document.getElementById("pages").value,
    document.getElementById("read").value
  );
  myLibrary.push(newBook);

  const bookData = Object.values(newBook);
  const tablerow = document.createElement("tr");
  const idValue = bookData[0];

  for (let i = 1; i < bookData.length; i++) {
    const tablehead = document.createElement("th");
    tablehead.textContent = bookData[i];
    tablerow.appendChild(tablehead);
  }

  const deleteCell = document.createElement("th");
  const deleteBook = document.createElement("button");
  deleteBook.className = "delete-book-from-array";
  deleteBook.textContent = "X";
  deleteBook.dataset.index = idValue;
  deleteBook.addEventListener("click", deleteBookFromLibrary);
  deleteCell.appendChild(deleteBook);
  tablerow.appendChild(deleteCell);

  table.appendChild(tablerow);
  event.target.reset();
}

function deleteBookFromLibrary(event){
  const deleteTheBookFromLibraryById = event.target.dataset.index;

  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].id === deleteTheBookFromLibraryById){
      myLibrary.splice(i,1);
      table.deleteRow(i+1);
      break;
    }
  }
}


