import {noteService} from '../services/note.service.js'

export default {
    
    template: `
        <article class="note-edit"  v-if="noteToEdit">
        
           <pre>{{noteToEdit}}</pre>
           <button>Save</button>
           <div class="edit-screen" @click="onExitModal"></div>
        </article>
    `,
     data() {
        return {
            noteToEdit: null,
        }
    },
     created() {
        const { noteId } = this.$route.params
        if (!noteId) return noteService.get
        noteService.get(noteId)
            .then(note => {
                this.noteToEdit = note
                console.log('note:', note)
            })
            .catch(err => {
                showErrorMsg('Cannot load note for edit')
                this.$router.push('/note')
            })
    },
   
}