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
const form = document.querySelector(".book-form");
const errorElement = document.getElementById('error');
form.addEventListener("submit", (e) =>{
  let messages = [];
  
  const author = document.getElementById("author");
  const title = document.getElementById("title");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");

  if (author.value === '' || author.value == null){
    messages.push('Author is required');
  }
  else if (/\d/.test(author.value)) {
    messages.push('Author name cannot contain numbers');
  }
  if (title.value === '' || title.value == null){
    messages.push('Book title is required');
  }
  if (pages.value === '' || pages.value == null){
    messages.push('Pages are required');
  }
  else if (pages.value.length > 4){
    messages.push('Pages number is too big');
  }

  if (messages.length > 0){
    e.preventDefault();
    errorElement.innerText = messages.join('\n');
  }
  else {
    e.preventDefault();
    errorElement.innerText = ''; 
    addBookToLibrary(author, title, pages, read, form);
  }
});

function addBookToLibrary(author, title, pages, read, form) {

  const newBook = new Library(
    author.value,
    title.value,
    pages.value,
    read.value
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
  deleteBook.textContent = "x";
  deleteBook.dataset.index = idValue;
  deleteBook.addEventListener("click", deleteBookFromLibrary);
  deleteCell.appendChild(deleteBook);
  tablerow.appendChild(deleteCell);

  table.appendChild(tablerow);
  form.reset();
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

