import { noteService } from '../services/note.service.js'

export default {

    template: `
        <article class="note-edit" :class="isScreen"   v-if="noteToEdit">
        
           <pre>{{noteToEdit}}</pre>
           
           
        <ul class="actions clean-list flex align-center">
            <li>
                <label  title="Change Background" :for="note-add-color" class="fa-regular"></label>
                <input type="color" 
                    v-model="noteToEdit.style.backgroundColor" 
                    :id="note-add-color" 
                    style="display:none;"
                    />
            </li>
            <li @click="onAddNote" class="fa-regular"></li> 
            <li @click="exitModal" class="fa-regular"></li>
        </ul> 
        <div class="edit-screen"
        @click="exitModal"  
         >
    </div>
        </article>
    `,
    data() {
        return {
            noteToEdit: null,
            screen: false
        }
    },
    created() {
        const { noteId } = this.$route.params
        if (!noteId) return noteService.get
        noteService.get(noteId)
            .then(note => {
                this.noteToEdit = note
                console.log('note:', note)
                this.screen = true
            })
            .catch(err => {
                showErrorMsg('Cannot load note for edit')
                this.$router.push('/note')
            })
    },
    computed: {
        isScreen() {
            return {
                'screen-open':this.screen
            }
        }

    },
    methods: {
        exitModal() {
            this.$router.push('/note')
        }
    }
    //     loadNote() {
    //         const { noteId } = this.$route.params
    //         noteService
    //             .get(noteId)
    //             .then(note => {
    //                 this.noteToEdit = note
    //                 this.$router.push(`/note/${noteId}`)
    //             })
    //             .catch(err => {
    //                 alert('Cannot load note')
    //                 this.$router.push('/note')
    //             })
    //     }

    // },
    // watch: {
    //     noteId() {
    //         this.loadNote()

    //     }
    // },
    // computed: {
    //     carId() {
    //         return this.$route.params.noteId
    //     }
    // }

}