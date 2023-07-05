import NoteTxt from '../cmps/NoteTxt.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <Component 
                :is="note.type"  
                :note="note" 
                @set-val="setAns($event, idx)" />
            <div class="actions">
                <button @click="onCopyNote">Copy</button>
                <button @click="onRemoveNote">Remove</button>
                <RouterLink :to="'/note/' + note.id">edit</RouterLink>
           </div>
        </article>
    `,
     methods: {
        onCopyNote(){
            this.$emit('copy' , this.note.id)
        },
        onRemoveNote(){
            this.$emit('remove' , this.note.id)
        },
        oneditNote(){
            this.$emit('edit' , this.note.id)
        }
    },
    components:{
        NoteTxt
    }
}