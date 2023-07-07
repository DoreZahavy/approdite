import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NotePreview from '../cmps/NotePreview.js'

import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddOpen from '../cmps/NoteAddOpen.js'
import NoteEdit from '../cmps/NoteEdit.js'

export default {
    // props: ['notes'],
    template: `
    <section class="note-list">
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
                        />
                </div>
            </section>
            <hr />
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
                        />
                </div>
            </section>
        </section >
        <div  class="edit-area" :class="isScreen">
                <!-- <div class="edit-screen"
                @click="exitModal" ></div> -->
                <RouterView @add="saveNote"/>
            </div>
         
    </section>
    `,

    data() {
        return {
            notes: null,
            noteAddType: 'unfocused',
            screen: false

        }
    },
    created() {
        this.loadNotes()

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
        },
        params() {
            return this.$route.params.noteId
        },
        isScreen() {
            return {
                'screen-open': this.screen
            }
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
                .then(note => {
                    noteService.saveToTrash(note)
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
                .then(returnedNote => {
                    const idx = this.notes.findIndex(note => note.id === returnedNote.id)
                    this.notes.splice(idx, 1, returnedNote)
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
        },
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes

                })
        },
        exitModal() {
            this.$router.push('/note')
        }
    },
    watch: {
        params() {
            if (this.$route.params.noteId) this.screen = true
            else this.screen = false
        }
    },
    components: {
        NotePreview,
        NoteAdd,
        NoteAddOpen,
        
        NoteEdit,
       
    }
}

 
   





