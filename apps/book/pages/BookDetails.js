import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import AddReview from '../cmps/AddReview.js'
import { noteService } from "../../keep/services/note.service.js"

export default {
    name: 'BookDetails',
    template: `
        <section class="book-details" v-if="book">
           <h1>{{book.title}}</h1>
           <img class="thumbnail" :src="imgSrc" alt="">
           <p>{{book.subtitle}}</p>
           <h4>Difficulty: {{difficulty}}</h4>
           <h4>{{age}}</h4>
           <h4 :class="priceColor">Price {{book.listPrice.amount}} {{book.listPrice.currencyCode}}</h4>
           <img class="on-sale" src="../../assets/img/on-sale.png" v-if="book.listPrice.isOnSale" />
            <ul class="review-list">
                <h2 v-if="book.reviews">Reviews!</h2>
                <li v-for="(review ,idx) in book.reviews" class="clean-list">
                    <p>Name: {{review.fullname}}</p>
                    <p>Rating: {{review.rating}}</p>
                    <p>Submitted on {{review.readAt}}</p>
                    <button class="remove-btn" @click="removeReview(idx)">X</button>
                </li>
            </ul>
            <div class="details-routing">
                <RouterLink :to="'/book/' + book.prevBookId">Previous Book</RouterLink> |
                <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink> |
                <RouterLink to="/book">Back to List</RouterLink>
            </div>
           <AddReview @save="saveReview"/>
        </section>
    `,
     data() {
        return {
            book: null
        }
    },
    created() {
       this.loadBook()
    },
    methods: {
        saveReview(review){
            if(!this.book.reviews) this.book.reviews=[]
            this.book.reviews.push(review)
            bookService.save(this.book)
                .then(savedBook => {
                    console.log('Saved Book', savedBook)
                    showSuccessMsg('Review saved')
                    this.$router.push(`/book/${this.book.id}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot save review')
                })
        },
        loadBook(){
            const {bookId} = this.$route.params
            bookService.get(bookId)
                .then(book => {
                    this.book = book
                })
                .catch(err => {
                    showErrorMsg('Cannot load book')
                    this.$router.push('/book')
                })
        },
        removeReview(idx){
            this.book.reviews.splice(idx,1)
            noteService.save(this.book)
                .then(savedBook=>{
                    showSuccessMsg('Review deleted')
                    this.$router.push(`/book/${this.book.id}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot delete review')
                })
        }
    },
    computed: { 
        imgSrc() {
            return this.book.thumbnail
        },
        difficulty(){
            if(this.book.pageCount>500) return 'Serious Reading'
            else if(this.book.pageCount>200) return 'Decent Reading'
            else return 'Light Reading'
        },
        age(){
            const date = new Date()
            return (date.getFullYear()-this.book.publishedDate > 10)? 'Vintage' : 'New'
        },
        priceColor(){
            return {
                expensive: this.book.listPrice.amount > 150,
                cheap: this.book.listPrice.amount < 20
            }
        },
        bookIdParam(){
            return this.$route.params.bookId
        }
    },
    watch:{
        bookIdParam(){ this.loadBook()}
    },
    components: {
        AddReview,
    }
}