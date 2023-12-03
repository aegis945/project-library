const newBookBtn = document.querySelector('.add-book-btn');
const newBookForm = document.querySelector('.modal-container');
const formSubmitBtn = document.querySelector('.form-submit-btn');
const cancelFormBtn = document.querySelector('.form-cancel-btn');
const bookTitle = document.querySelector('#form-book-title');
const bookAuthor = document.querySelector('#form-book-author');
const bookLength = document.querySelector('#form-book-length');
const readingStatuses = document.querySelectorAll('input[name="reading-status"]');

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookLength.value;
  const status = getReadingStatus();

  const newBook = new Book(title, author, pages, status);
  console.log(newBook);
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