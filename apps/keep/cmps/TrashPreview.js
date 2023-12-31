import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'
import NoteTodos from '../cmps/NoteTodos.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
            <Component 
                :is="note.type"  
                :note="note"  />
            <ul class="actions clean-list flex">
                <li @click="onRestore" class="fa-solid" title="Restore"></li>
                <li @click="onRemovePerm" class="fa-solid" title="Delete Forever"></li>
            </ul>
        </article>
    `,
    data() {
        return {
            currNote: this.note
        }
    },
    methods: {

        onRestore() {
            this.$emit('restore', this.note)
        },
        onRemovePerm() {
            this.$emit('remove', this.note.id)
        }
    },
    components: {
        NoteTxt,
        NoteImg,
        NoteTodos
    }
}


