let myLibrary = [];

class Library{
  constructor(author, title, pages, read){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  set author(newAuthor){
    this._author = newAuthor
  };
  get author(){
    return this._author
  };
  
  set title(newTitle){
    this._title = newTitle
  };
  get title(){
    return this._title
  };

  set pages(newPages){
    this._pages = newPages
  };
  get pages(){
    return this._pages
  };

  set read(newRead){
    this._read = newRead
  };
  get read(){
    return this._read;
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
  )
  let idValue = '';

  myLibrary.push(newBook);
  const bookData = Object.values(newBook);
  const tablerow = document.createElement("tr");

  for (let i = 0; i < bookData.length+1; i++){
    if (i === 0){
      idValue = bookData[0];
    }
    else {
      const tablehead = document.createElement("th");
      tablehead.textContent = bookData[i];
      tablerow.appendChild(tablehead);
      if (i === bookData.length){
        const deleteBook = document.createElement("button");
        deleteBook.className = "delete-book-from-array";
        deleteBook.textContent = "X";
        deleteBook.addEventListener("click", deleteBookFromLibrary);
        deleteBook.dataset.index = idValue;
        tablehead.appendChild(deleteBook);
      }
    }
  }
  table.appendChild(tablerow);
  event.target.reset();
}

function deleteBookFromLibrary(event){
  const deleteTheBookFromLibraryById = event.target.dataset.index;
  for (let i = 0; i < myLibrary.length; i++){
    if (myLibrary[i].id === deleteTheBookFromLibraryById){
      myLibrary.splice(i,1);
      table.deleteRow(i+1);
    }
  }
}


