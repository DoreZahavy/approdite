
export default {
    template: `
        <article class="note-info">
           <h2 contenteditable @input="onSetTitle">Title</h2>
           <p contenteditable @input="onSetUrl">Image URL goes here</p>   
        </article>
    `,
    methods: {
        onSetTitle(el){
            this.$emit('newval',{key:'title',value: el.target.innerText} )
        },
        onSetUrl(el){
            this.$emit('newval',{key:'url',value: el.target.innerText} )
        }
    }
}