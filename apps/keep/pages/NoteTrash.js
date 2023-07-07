import { noteService } from "../services/note.service.js"
import TrashPreview from '../cmps/TrashPreview.js'

export default {
    template: `
        <section class="note-trash">
           <section class="trash-columns" v-f="trashedNotes">
                <div v-for="(note, idx) in pinnedNotes" class="notes-grp" >
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
            trashedNotes:null
        }
    },
    methods: {
        loadNotes() {
            noteService.queryTrash()
                .then(notes => {
                    this.trashedNotes = notes
                })
        },
        restoreNote(note){

        },
        removeNote(noteId){

        }
    },
   
    computed: { 
        
    },
    components: {
        TrashPreview
    }
}