import { utilService } from '../../../services/util.service'
import { storageService } from '../../../services/async-storage.service.js'

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'

var gFilterBy = { txt: '', minSpeed: 0 }
var gSortBy = { vendor: 1 }
var gPageIdx
var gBookList = null

fetch("../data/books.json")
.then(response => {
   return response.json();
})
.then(data => {
    gBookList = data
    _createBooks()
});




export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addGoogleBook

}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
      
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(car=> _setNextPrevBookId(car))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function addGoogleBook(book){

}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(currBook => currBook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1]
                ? books[bookIdx - 1].id
                : books[books.length - 1].id
            return book
        })
}



function getEmptyBook(title = '', publishedDate = 0, pageCount = 0,
        isOnSale = false, amount = 0) {
    return {
        id: '',
        title,
        subtitle: 'velit sapien eget tincidunt nunc tortor',
        authors:['Anonymous'],
        publishedDate,
        description:'aenean mauris porta netus accumsan turpis etiam vestibulum vivamus',
        pageCount,
        categories:[],
        thumbnail: '../assets/img/default-book.png',
        language: 'he',
        reviews:[],
        listPrice:{ 
            amount,
            currencyCode:'ILS',
            isOnSale
        }
      }
}



function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = gBookList
        console.log('books:', books)
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}