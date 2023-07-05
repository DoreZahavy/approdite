
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddTxt from '../cmps/NoteAddTxt.js'
import NoteEdit from '../cmps/NoteEdit.js'
import Sidebar from '../cmps/Sidebar.js'

export default {
    template: `
    <section class="note-index">
       <!-- <h1>notes here</h1> -->
       <NoteFilter />

       <Sidebar />

       <section class="add-cmps">
           <NoteAdd />
           <NoteAddTxt />
        </section>

        <section class="notes-columns">

            <div v-for="(note, idx) in notes"  v-if="notes">
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                 />
            </div>
        </section>

        <NoteEdit />
    </section>
    `,
      data() {
        return {
            notes: null,
            
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
               
            })

    },
    methods: {
        removeNote(noteId){
            noteService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => noteId === note.id)
                this.notes.splice(idx, 1)
                showSuccessMsg('Note removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove note')
            })
        },
        copyNote(note){
            // const duplicateNote = utilService.deepCopy(this.note)
            
            const duplicateNote = utilService.deepCopy(note)
            duplicateNote.id = ''
            noteService.save(duplicateNote)
                .then(()=>{
                    this.notes.push(duplicateNote)
                    showSuccessMsg('Note copied')
                })
                .catch(()=>{showErrorMsg('Cannot copy note')})
        }
    },
    components:{
        NotePreview,
        NoteAdd,
        NoteAddTxt,
        NoteFilter,
        NoteEdit,
        Sidebar
    }
}