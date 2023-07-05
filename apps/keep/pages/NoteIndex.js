
import { noteService } from '../services/note.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteEdit from '../cmps/NoteEdit.js'

export default {
    template: `
    <section class="note-index">
       <h1>notes here</h1>
       <NoteFilter />

       <NoteAdd />

        <section class="notes-columns">

            <div v-for="(note, idx) in notes"  v-if="notes">
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                @edit="editNote" />
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
                console.log('notes:', notes)
                console.log('notes:', this.notes)
               
            })

    },
    methods: {

    },
    components:{
        NotePreview,
        NoteAdd,
        NoteFilter,
        NoteEdit
    }
}