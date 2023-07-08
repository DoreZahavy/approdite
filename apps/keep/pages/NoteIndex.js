
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddOpen from '../cmps/NoteAddOpen.js'
import NoteEdit from '../cmps/NoteEdit.js'
import NoteList from '../cmps/NoteList.js'
import Sidebar from '../cmps/Sidebar.js'

export default {
    template: `
    <section class="note-index">
       <!-- <h1>notes here</h1> -->
      
       <NoteFilter @search="setFilter"/>

       <Sidebar @trash="toTrash" @label="toLabel" @setlabel="setLabelFilter"/>

       <RouterView :filter="filter" :label="label" />
      
    </section>
    `,
    data() {
        return {
            filter:'',
            label:'',
            notes: null,
            noteAddType: 'unfocused',
            screen : false

        }
    },
    created() {
        // this.loadNotes()

    },
    computed: {
        // pinnedNotes() {
        //     let pinnedNotes = this.notes.filter(note => note.isPinned)
        //     if (pinnedNotes) return pinnedNotes
        // },
        // unpinnedNotes() {
        //     let unpinnedNotes = this.notes.filter(note => !note.isPinned)
        //     if (unpinnedNotes) return unpinnedNotes
        // },
        // isPinned() {
        //     if (this.pinnedNotes > 0) return true
        //     return false
        // },
        // params() {
        //     return this.$route.params.noteId
        // },
        // isScreen(){
        //     return {
        //         'screen-open':this.screen
        //     }
        // }

    },
    methods: {
        setFilter(filter){
            console.log('this.filter:', this.filter)
            this.filter = filter
            console.log('this.filter:', this.filter)
        },
        setLabelFilter(label){
            this.label = label
        },
        // removeNote(noteId) {
        //     noteService.remove(noteId)
        //         .then(() => {
        //             const idx = this.notes.findIndex(note => noteId === note.id)
        //             this.notes.splice(idx, 1)
        //             showSuccessMsg('Note removed')
        //         })
        //         .catch(err => {
        //             showErrorMsg('Cannot remove note')
        //         })
        // },
        // copyNote(note) {
        //     // const duplicateNote = utilService.deepCopy(this.note)

        //     const duplicateNote = utilService.deepCopy(note)
        //     duplicateNote.id = ''
        //     noteService.save(duplicateNote)
        //         .then(() => {
        //             this.notes.push(duplicateNote)
        //             showSuccessMsg('Note copied')
        //         })
        //         .catch(() => { showErrorMsg('Cannot copy note') })
        // },
        // saveNote(updatedNote) {
        //     noteService.save(updatedNote)
        //         .then(returnedNote=>{
        //             const idx = this.notes.findIndex(note=>note.id===returnedNote.id)
        //             this.notes.splice(idx,1,returnedNote)
        //         })


        // },
        // updatePin(noteId) {
        //     const idx = this.notes.findIndex(note => note.id === newNote.id)
        //     noteService.get(noteId)
        //         .then(note => {

        //         })
        // },
        // addNote(newNote) {
        //     noteService.save(newNote)
        //         .then(note => {
        //             this.notes.push(newNote)

        //         })
        // },
        // setType(type) {
        //     this.noteAddType = type
        // },
        // loadNotes() {
        //     noteService.query()
        //         .then(notes => {
        //             this.notes = notes

        //         })
        // },
        exitModal() {
            this.$router.push('/note')
        },
        toLabel() {
            this.$router.push('/note/label')
        },
        toTrash(){
            this.$router.push('/note/trash')
        }
    },
    watch: {
        params() {
            if(this.$route.params.noteId) this.screen = true
            else this.screen = false
        }
    },
    components: {
        NotePreview,
        NoteAdd,
        NoteAddOpen,
        NoteFilter,
        NoteEdit,
        Sidebar,
        NoteList
    }
}



