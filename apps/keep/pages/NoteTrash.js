import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import TrashPreview from '../cmps/TrashPreview.js'

export default {
    template: `
        <section class="note-trash">
           <section class="trash-columns" v-if="notes">
           <div v-for="(note, idx) in trashedNotes" class="notes-grp" >
                    <TrashPreview  
                        :note="note" 
                        @remove="removeNote"
                        @restore="restoreNote"
                 
                        />
                </div>
           </section>
           
        </section>
    `,
    data(){
        return {
            notes:null
        }
    },
    created(){
        this.loadNotes()
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    console.log('notes:', notes)
                    this.notes = notes
                })
        },
        restoreNote(note){
            var updatedNote = utilService.deepCopy(note) 
            updatedNote.isTrashed = false
            noteService.save(updatedNote)
            .then(() => {
                        const idx = this.notes.findIndex(note => updatedNote.id === note.id)
                        this.notes.splice(idx, 1,updatedNote)
                        showSuccessMsg('Note restored')
                    })
                    .catch(err => {
                        showErrorMsg('Cannot restore note')
                    })
        },
        removeNote(noteId){
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => noteId === note.id)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('Deleted Permanently')
                })
                .catch(err => {
                    showErrorMsg('Cannot delete note')
                })
        }
    },
   
    computed: { 
        trashedNotes(){
            return this.notes.filter(note=> note.isTrashed)
        }
    },
    components: {
        TrashPreview
    }
}