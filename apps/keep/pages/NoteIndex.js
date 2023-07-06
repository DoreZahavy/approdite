
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddOpen from '../cmps/NoteAddOpen.js'
import NoteEdit from '../cmps/NoteEdit.js'
import Sidebar from '../cmps/Sidebar.js'

export default {
    template: `
    <section class="note-index">
       <!-- <h1>notes here</h1> -->
       <NoteFilter />

       <Sidebar />

       <!-- <section class="add-cmps"> -->
           <NoteAdd @type="setType" v-if="noteAddType === 'unfocused'"/>
            <NoteAddOpen v-else :type="noteAddType" 
                @type="setType" 
                @add="addNote" />
        <!-- </section> -->
    <section class="note-container" v-if="notes">
        <div class="pin-title" v-show="pinnedNotes !== null">
            <span >pinned</span>
        </div>
        <section class="notes-columns" v-if="pinnedNotes" >
            <div v-for="(note, idx) in pinnedNotes" class="notes-grp" >
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                @save="saveNote"
                @tack="updatePin" />
            </div>
        </section>
        <div  class="pin-title" v-show="pinnedNotes !== null">
            <span >others</span>
        </div>
        <section class="notes-columns" v-if="unpinnedNotes" >
            <div v-for="(note, idx) in unpinnedNotes" class="notes-grp">
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                @save="saveNote"
                @tack="updatePin"
                />
            </div>
        </section>
    </section>
            
        <NoteEdit />
    </section>
    `,
    data() {
        return {
            notes: null,
            noteAddType: 'unfocused'

        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes

            })

    },
    computed: {
        pinnedNotes() {
            let pinnedNotes = this.notes.filter(note => note.isPinned)
            if (pinnedNotes) return pinnedNotes
        },
        unpinnedNotes() {
            let unpinnedNotes = this.notes.filter(note => !note.isPinned)
            if (unpinnedNotes) return unpinnedNotes
        },
        isPinned() {
            if (this.pinnedNotes > 0) return true
            return false
        }
    },
    methods: {
        removeNote(noteId) {
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
        copyNote(note) {
            // const duplicateNote = utilService.deepCopy(this.note)

            const duplicateNote = utilService.deepCopy(note)
            duplicateNote.id = ''
            noteService.save(duplicateNote)
                .then(() => {
                    this.notes.push(duplicateNote)
                    showSuccessMsg('Note copied')
                })
                .catch(() => { showErrorMsg('Cannot copy note') })
        },
        saveNote(updatedNote) {
            noteService.save(updatedNote)
                .then(newNote => {
                    // console.log('newNote:', newNote)
                    // console.log('this.notes:', this.notes)
                    // const idx = this.notes.findIndex(note => note.id === newNote.id)

                    // this.notes.splice(idx, 1, newNote)
                    noteService.query()
                        .then(notes => {
                            this.notes = notes

                        })
                    // else this.notes.push(newNote)
                })
        },
        updatePin(noteId) {
            const idx = this.notes.findIndex(note => note.id === newNote.id)
            noteService.get(noteId)
                .then(note => {

                })
        },
        addNote(newNote) {
            noteService.save(newNote)
                .then(note => {
                    this.notes.push(newNote)

                })
        },
        setType(type) {
            this.noteAddType = type
        }
    },
    components: {
        NotePreview,
        NoteAdd,
        NoteAddOpen,
        NoteFilter,
        NoteEdit,
        Sidebar
    }
}