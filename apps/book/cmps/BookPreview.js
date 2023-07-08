export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <img :src="bookThumbnail" alt="Image" />
            <h2>{{ book.title }}</h2>
            <p>{{ book.subtitle }}</p>
            <hr />
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