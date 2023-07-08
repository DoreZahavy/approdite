import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

export default {
    name: 'BookIndex',
    template: `
    <section class="book-index">
        <div class="add-btns">
            <RouterLink to="/book/edit" class="add-btn">Add Custom Book</RouterLink>
            <span>  |  </span>
            <RouterLink to="/book/add" class="add-btn">Add Google Book</RouterLink>
        </div>
       
        <BookFilter @filter="setFilterBy"/>
        <BookList 
                v-if="books" 
                :books="filteredBooks"
                @remove="removeBook"/>
    </section>
    `,
    data() {
        return {
            filterBy: null,
            books: [],
         
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => bookId === book.id)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove book')
                })
        },
      
        setFilterBy(filterBy = {}) {
            this.filterBy = filterBy
        },
        addGoogleBook(book){
            this.books.push(book)
        }
    },
    computed: {
        filteredBooks() {
            if (!this.filterBy) return this.books
            let { txt = '', minPageCount = 0,maxPageCount = 2000, minDate = 0, maxDate = 2025 , language = '' } = this.filterBy
            console.log('language:', this.filterBy.language)
            const regex = new RegExp(txt, 'i')

            return this.books.filter(book => 
                regex.test(book.title) &&
                book.language.includes(language.toLowerCase()) &&
                book.publishedDate >= minDate &&
                book.publishedDate <= maxDate &&
                book.pageCount >= minPageCount &&
                book.pageCount <= maxPageCount
            )
        }
    },
    components: {
        BookFilter,
        BookList,
    }
}