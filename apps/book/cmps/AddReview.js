export default {
    // props: ['book'],
    template: `
        <form @submit.prevent="save" class="add-review">
            <h1>Add Book Review</h1>
            <label For="name-input"></label>
            <input type="text" v-model="review.fullname" placeholder="your name"
            name="name-input" id="name-input"/>
            <label htmlFor="rating-input"></label>
            <input type="number" min="0" max="10" v-model="review.rating" 
            placeholder="rating" name="rating-input" id="rating-input"/>
            <label htmlFor="date-input"></label>  
            <input type="date" v-model="review.readAt" name="date-input" id="date-input"/>  
            <button :disabled="!isValid">save</button>
        </form>
    `,
    data(){
        return {
            review:{
                fullname:'',
                rating:0,
                readAt:''
            }
        }
    },
    computed: { 
        bookThumbnail(){
            return this.book.thumbnail
        },
        isValid(){
            return this.review.fullname.length>0 && this.review.readAt !==''
        }
    },
    methods: {
        save(){
            this.$emit('save', this.review)
        }
    }
}