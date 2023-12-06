const newBookBtn = document.querySelector('.add-book-btn');
const newBookForm = document.querySelector('.modal-container');
const formSubmitBtn = document.querySelector('.form-submit-btn');
const cancelFormBtn = document.querySelector('.form-cancel-btn');
const bookTitle = document.querySelector('#form-book-title');
const bookAuthor = document.querySelector('#form-book-author');
const bookLength = document.querySelector('#form-book-length');
const readingStatuses = document.querySelectorAll('input[name="reading-status"]');
const bookLibrary = document.querySelector('.books-container');
const removeAllBooksBtn = document.querySelector('.remove-books-btn');
const unreadBooksNr = document.querySelector('.unread-books');
const readingBooksNr = document.querySelector('.reading-books');
const readBooksNr = document.querySelector('.read-books');
const totalBooksNr = document.querySelector('.total-books');
const addDemoBooksBtn = document.querySelector('.add-demo-books');

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
    let statusClass = getStatusColor(book.status);
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
              <span class="${statusClass}">${book.status}</span>
            </p>
        </div>
        <div class="card-btn-container">
          <button class="card-status-btn" onclick="changeReadingStatus(${i})">Change reading status</button>
          <button class="card-remove-btn" onclick="removeBook(${i})">Remove</button>
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
  calculateStatistics();
  displayStatistics();
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

function getStatusColor(status) {
  switch (status) {
    case "Not read":
      return "not-read";
    case "Reading":
      return "reading";
    case "Read":
      return "read";
    default:
      return "";
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

function changeReadingStatus(index) {
  const statusOptions = ["Not read", "Reading", "Read"];
  const currentStatus = myLibrary[index].status;
  const currentIndex = statusOptions.indexOf(currentStatus);
  const nextIndex = (currentIndex + 1) % statusOptions.length;
  myLibrary[index].status = statusOptions[nextIndex];
  calculateStatistics();
  displayStatistics();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  calculateStatistics();
  displayStatistics();
  displayBooks();
}

function removeAllBooks() {
  myLibrary.splice(0, myLibrary.length);
  calculateStatistics();
  displayStatistics();
  displayBooks();
}

function calculateStatistics() {
  unreadBooksCount = 0;
  readingBooksCount = 0;
  readBooksCount = 0;
  totalBooksCount = myLibrary.length;

  myLibrary.forEach(book => {
    switch (book.status) {
      case "Not read":
        unreadBooksCount++;
        break;
      case "Reading":
        readingBooksCount++;
        break;
      case "Read":
        readBooksCount++;
        break;
      default:
        break;
    }
  });
}

function displayStatistics() {
  unreadBooksNr.textContent = unreadBooksCount;
  readingBooksNr.textContent = readingBooksCount;
  readBooksNr.textContent = readBooksCount;
  totalBooksNr.textContent = totalBooksCount;
}

function addDemoBooks() {
  const demoBooks = [
    new Book("The Picture of Dorian Gray", "Oscar Wilde", 304, "Read"),
    new Book("Frankenstein", "Mary Shelley", 166, "Not read"),
    new Book("Great Expectations", "Charles Dickens", 544, "Reading"),
    new Book("The Last Wish", "Andrzej Sapkowski", 288, "Not read"),
    new Book("Crime and Punishment", "Fyodor Dostoevsky", 527, "Read"),
    new Book("The Metamorphosis", "Franz Kafka", 70, "Reading")
  ];
  myLibrary.push(...demoBooks);

  calculateStatistics();
  displayStatistics();
  displayBooks();
}

removeAllBooksBtn.addEventListener('click', function() {
  removeAllBooks();
})

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

addDemoBooksBtn.addEventListener('click', function() {
  addDemoBooks();
  displayBooks;
})