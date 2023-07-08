import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import TrashPreview from '../cmps/TrashPreview.js'

export default {
    props:['filter'],
    template: `
        <section class="note-trash">
           <section class="trash-columns" v-if="notes">
            <!-- <button @click="removeTrash" class="empty-btn">Empty Trash</button> -->
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
        },
        removeTrash(){
            const trashedNotes = this.notes.filter(note=>note.isTrashed)

            console.log('trashedNotes:', trashedNotes)
            for (var i = 0; i < trashedNotes.length; i++) {
            const idx = this.notes.findIndex(note => trashedNotes[i].id === note.id)
            this.notes.splice(idx, 1)
        }
         noteService.remove(trashedNotes[0].id)
       noteService.remove(trashedNotes[1].id)
       
        }
    },
   
    computed: { 
        trashedNotes(){
            return this.notes.filter(note=> {
                const regex = new RegExp(this.filter, 'i')
                return regex.test(note.info.title) && note.isTrashed
            })
        }
    },
    components: {
        TrashPreview
    }
}