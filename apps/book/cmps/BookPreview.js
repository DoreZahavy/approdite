export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <img :src="bookThumbnail" alt="" />
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <RouterLink :to="'/book/' + book.id">Details</RouterLink> |
            <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
        </article>
    `,
    computed: { 
        bookThumbnail(){
            return this.book.thumbnail
        }
    }
}