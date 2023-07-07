import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import NoteEditTxt from './NoteEditTxt.js'
import NoteEditImg from './NoteEditImg.js'
import NoteEditTodos from './NoteEditTodos.js'

export default {

    template: `
        <article class="note-edit" :class="isScreen"  :style="noteToEdit.style" v-if="noteToEdit">
        
           <!-- <pre>{{noteToEdit}}</pre> -->
           <Component 
            v-if="noteToEdit"
            :is="noteToEdit.type"  
            :note="noteToEdit" 
            @newval="onChangeVal"/>
           
        <ul class="actions clean-list flex align-center">
            <li>
                <label  title="Change Background" :for="note-add-color" class="fa-regular"></label>
                <input type="color" 
                    v-model="noteToEdit.style.backgroundColor" 
                    :id="note-add-color" 
                    style="display:none;"
                    />
            </li>
            <li @click="onUpdateNote" class="fa-regular"></li> 
            <li @click="exitModal" class="fa-regular"></li>
        </ul> 
       
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
                const type = this.noteToEdit.type 
                if (type === 'NoteTxt') this.noteToEdit.type = 'NoteEditTxt'
                if (type === 'NoteImg') this.noteToEdit.type = 'NoteEditImg'
                if (type === 'NoteVideo') this.noteToEdit.type = 'NoteEditVideo'
                if (type === 'NoteTodos') this.noteToEdit.type = 'NoteEditTodos'
                console.log('note:', this.noteToEdit.type)

                this.screen = true
            })
            .catch(err => {
                showErrorMsg('Cannot load note for edit')
                this.$router.push('/note')
            })
    },

    methods: {
        exitModal() {
            this.$router.push('/note')
        },
        onUpdateNote() {
            const type = this.noteToEdit.type 
            if (type === 'NoteEditTxt') this.noteToEdit.type = 'NoteTxt'
            if (type === 'NoteEditImg') this.noteToEdit.type = 'NoteImg'
            if (type === 'NoteEditVideo') this.noteToEdit.type = 'NoteVideo'
            if (type === 'NoteEditTodos') this.noteToEdit.type = 'NoteTodos'
            this.$emit('add', this.noteToEdit)
            this.noteToEdit = noteService.getEmptyNote(this.type)
            this.$router.push('/note')
        },
        onChangeVal(newVal){
            this.noteToEdit.info[newVal.key] = newVal.value
        }
    },
    name: 'NoteEdit',
    components: {
        NoteEditImg,
        NoteEditTxt,
        NoteEditTodos
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