import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailService } from '../../mail/services/email.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddOpen from '../cmps/NoteAddOpen.js'
import NoteEdit from '../cmps/NoteEdit.js'

export default {
    props: ['filter', 'label'],
    template: `
    <section class="note-list">
        <NoteAdd @type="setType" v-if="noteAddType === 'unfocused'"/>
            <NoteAddOpen v-else :type="noteAddType" 
                @type="setType" 
                @add="addNote" />
        <section class="note-container" v-if="notes">
            <div class="pin-title" v-show="showTag">
                <span >pinned</span>
            </div>
            <section class="notes-columns" v-if="pinnedNotes" >
                <div v-for="(note, idx) in pinnedNotes" class="notes-grp" >
                    <NotePreview  
                        :note="note" 
                        @remove="removeNote"
                        @copy="copyNote"
                        @save="saveNote"
                        @mail="sendMail"
                        />
                </div>
            </section>
            <hr v-show="showTag"/>
            <div  class="pin-title" v-show="showTag">
                <span >others</span>
            </div>
            <section class="notes-columns" v-if="unpinnedNotes" >
                <div v-for="(note, idx) in unpinnedNotes" class="notes-grp">
                    <NotePreview  
                        :note="note" 
                        @remove="removeNote"
                        @copy="copyNote"
                        @save="saveNote"
                        @mail="sendMail"
                        />
                </div>
            </section>
        </section >
        <div  class="edit-area" :class="isScreen">
            <div class="edit-screen"
                @click="exitModal">
            </div>
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
        if (this.$route.params.noteId) this.screen = true
    },
    computed: {
        showTag: function () {
            const regex = new RegExp(this.filter, 'i')
            let pinnedNotes = this.notes.filter(note => {
                return note.isPinned && !note.isTrashed && regex.test(note.info.title)
            })
            if (pinnedNotes.length !== 0) return true
        },
        pinnedNotes() {
            const regex = new RegExp(this.filter, 'i')
            let pinnedNotes = this.notes.filter(note => {

                return note.isPinned &&
                    !note.isTrashed &&
                    regex.test(note.info.title) &&
                    (note.labels.includes(this.label) || !this.label)
            })
            if (pinnedNotes) return pinnedNotes
        },
        unpinnedNotes() {
            const regex = new RegExp(this.filter, 'i')
            let unpinnedNotes = this.notes.filter(note => {
                return !note.isPinned &&
                    !note.isTrashed &&
                    regex.test(note.info.title) &&
                    (note.labels.includes(this.label) || !this.label)
            })
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
        removeNote(note) {
            var updatedNote = utilService.deepCopy(note)
            updatedNote.isTrashed = true
            noteService.save(updatedNote)
                .then(() => {
                    const idx = this.notes.findIndex(note => updatedNote.id === note.id)
                    this.notes.splice(idx, 1, updatedNote)
                    showSuccessMsg('Removed to trash')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove note')
                })
        },
        copyNote(note) {

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
                    console.log('returnedNote:', returnedNote)
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
        sendMail(note) {
            emailService.add(note)
                .then(() => {
                    showSuccessMsg('Note Saved as draft mail')
                })
                .catch(() => {
                    showErrorMsg('Cannot send note as mail')
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









