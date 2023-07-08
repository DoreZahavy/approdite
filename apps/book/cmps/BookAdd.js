import { bookService } from '../services/book.service.js'
import { utilService } from '../../../services/util.service.js'
import { googleBookService } from '../services/google-book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    props: [],
    template: `
    <section class="book-add">
        <h1>Search Google Books!</h1>
        <input type="text" v-model="searchValue" @input="debouncedOnSearch" placeholder="search books"/>
        <ul>
            <li v-for="(res,idx) in results" v-if="results">
                <h2>{{res.title}}</h2>
                <button @click=onAddBook(idx)>+{{idx}}</button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchValue: '',
            results: [],
        }
    },
    created() {
        this.debouncedOnSearch = utilService.debounce(this.onSearch, 500)
    },
    methods: {
        onSearch() {
            googleBookService.query(this.searchValue)
                .then(books => {
                    console.log('books:', books)
                    this.results = books
                })
        },
        onAddBook(idx) {
            bookService.save(this.results[idx])
                .then(book => {
                    this.$emit('add', book)
                    showSuccessMsg('Book saved')
                    this.$router.push('/book')
                })
        },
    }
}