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
                <Router-link :to="'/note/' + note.id">edit</Router-link>
           </div>
        </article>
    `,
     methods: {
        onCopyNote(){
            this.$emit('copy' , this.note)
        },
        onRemoveNote(){
            this.$emit('remove' , this.note.id)
        }
  
    },
    components:{
        NoteTxt
    }
}