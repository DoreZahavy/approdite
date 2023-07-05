import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    name: 'BookEdit',
    template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>{{(bookToEdit.id)? 'Edit' : 'Add'}} a Book</h2>
            <input v-model="bookToEdit.title" type="text" placeholder="Enter title">
            how many pages?
            <input v-model.number="bookToEdit.pageCount" type="number"  >
            year published
            <input v-model.number="bookToEdit.publishedDate" type="number">
            price
            <input v-model.number="bookToEdit.listPrice.amount" type="number">
            <div class="on-sale-input">
                <input type="checkbox" v-model="bookToEdit.listPrice.isOnSale" value="true"/>
                <span>On Sale?</span>
            </div>

            <RouterLink to="/book">Cancel</RouterLink> 
            <button :disabled="!isValid">save</button>
        </form>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook(),
        }
    },
    computed: {
        isValid() {
            return this.bookToEdit.title.length > 0
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (!bookId) return
        bookService.get(bookId)
            .then(book => {
                this.bookToEdit = book
            })
            .catch(err => {
                showErrorMsg('Cannot load book for edit')
                this.$router.push('/book')
            })
    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(savedBook => {
                    console.log('Saved Book', savedBook)
                    showSuccessMsg('Book saved')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Cannot save book')
                })
        }
    }
}