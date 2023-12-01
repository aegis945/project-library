const newBookBtn = document.querySelector('.add-book-btn');
const newBookForm = document.querySelector('.modal-container');
const cancelFormBtn = document.querySelector('.form-cancel-btn');
const bookTitle = document.querySelector('#form-book-title');
const bookAuthor = document.querySelector('#form-book-author');
const bookLength = document.querySelector('#form-book-length');

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

newBookBtn.addEventListener('click', function(){
  newBookForm.style.display = 'block';
})

cancelFormBtn.addEventListener('click', function(){
  newBookForm.style.display = 'none';
  resetForm();
})

function resetForm() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookLength.value = '';
}