
export default {
    props: ['note'],
    template: `
        <article class="note-info">
           <h2 contenteditable ref="title" @input="onSetTitle">Title</h2>
           <p contenteditable ref="url" @input="onSetUrl">Image URL goes here</p>   
        </article>
    `,
    mounted() {
        if (this.note) {
            this.$refs.title.innerText = this.note.info.title
            this.$refs.url.innerText = this.note.info.url
        }
    },
    methods: {
        onSetTitle(ev) {
            this.$emit('newval', { key: 'title', value: ev.target.innerText })
        },
        onSetUrl(ev) {
            this.$emit('newval', { key: 'url', value: ev.target.innerText })
        }
    }
}