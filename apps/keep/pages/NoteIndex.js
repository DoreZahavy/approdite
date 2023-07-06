
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

        <section class="notes-columns" v-if="notes" >
            <div class="pin-title" v-if="pinnedNotes">
                <span >pinned</span>
            </div>
            <div v-for="(note, idx) in pinnedNotes" class="notes-grp" v-if="pinnedNotes">
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                @save="saveNote"
                
                 />
            </div>
            <div  class="pin-title" v-if="unpinnedNotes">

                <span >others</span>
            </div>
            <div v-for="(note, idx) in unpinnedNotes" class="notes-grp" v-if="unpinnedNotes">
                <NotePreview  
                :note="note" 
                @remove="removeNote"
                @copy="copyNote"
                @save="saveNote"
                 />
            </div>
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
        pinnedNotes(){
           return  this.notes.filter(note=>note.isPinned)
        },
        unpinnedNotes(){
           return  this.notes.filter(note=>!note.isPinned)
        }
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
        },
        saveNote(newNote){
            noteService.save(newNote)
                .then(note=>{
                    const idx = this.notes.findIndex(note=> note.id===newNote.id)
                    if(idx) this.notes.splice(idx,1,newNote)
                    else this.notes.push(newNote)
                })
            },
            addNote(newNote) {
                noteService.save(newNote)
                .then(note => {
                    console.log('note after save:', note)
                    this.notes.push(newNote)

                })
        },
        setType(type){
            console.log('type:', type)
            this.noteAddType = type 
        }
    },
    components:{
        NotePreview,
        NoteAdd,
        NoteAddOpen,
        NoteFilter,
        NoteEdit,
        Sidebar
    }
}