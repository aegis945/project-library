const newBookBtn = document.querySelector('.add-book-btn');
const newBookForm = document.querySelector('.modal-container');
const formSubmitBtn = document.querySelector('.form-submit-btn');
const cancelFormBtn = document.querySelector('.form-cancel-btn');
const bookTitle = document.querySelector('#form-book-title');
const bookAuthor = document.querySelector('#form-book-author');
const bookLength = document.querySelector('#form-book-length');
const readingStatuses = document.querySelectorAll('input[name="reading-status"]');
const bookLibrary = document.querySelector('.books-container');

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function displayBooks() {
  bookLibrary.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement('div');
    bookEl.setAttribute('class', 'book-card');
    bookEl.innerHTML = `
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>by
            <span>${book.author}</span>
          </p>
          <div class="separator"></div>
          <p>Book length:
            <span>${book.pages}</span>
          </p>
            <p>Reading status:
              <span>${book.status}</span>
            </p>
        </div>
        <div class="card-btn-container">
          <button class="card-status-btn">Change reading status</button>
          <button class="card-remove-btn">Remove</button>
        </div>`
    bookLibrary.appendChild(bookEl);
  }
}

function addBookToLibrary() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookLength.value;
  const status = getReadingStatus();

  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  displayBooks();
}

function resetForm() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookLength.value = '';
  readingStatuses.forEach(statusEl => {
    statusEl.checked = false;
  })
}

function enableForm() {
  bookTitle.removeAttribute('disabled');
  bookAuthor.removeAttribute('disabled');
  bookLength.removeAttribute('disabled');
  readingStatuses.forEach(statusEl => {
    statusEl.removeAttribute('disabled');
  })
  newBookForm.style.display = 'block';
}

function disableForm() {
  bookTitle.setAttribute('disabled', 'true');
  bookAuthor.setAttribute('disabled', 'true');
  bookLength.setAttribute('disabled', 'true');
  readingStatuses.forEach(statusEl => {
    statusEl.setAttribute('disabled', 'true');
  })
  newBookForm.style.display = 'none';
}

function checkForm() {
  let status = getReadingStatus();

  if(bookTitle.value !== '' && bookAuthor.value !== '' && bookLength.value !== '' && status !== null && status !== undefined) { 
    addBookToLibrary();
    resetForm();
    disableForm();
  }
}

function getReadingStatus() {
  let status;
  readingStatuses.forEach(statusEl => {
    if (statusEl.checked) {
      status = statusEl.value;
    }
  });
  return status;
}

newBookBtn.addEventListener('click', function(){
  enableForm();
})

cancelFormBtn.addEventListener('click', function(event){
  event.preventDefault();
  resetForm();
  disableForm();
})

formSubmitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  checkForm();
})