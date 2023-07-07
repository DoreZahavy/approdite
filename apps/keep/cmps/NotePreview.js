import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'
import NoteTodos from '../cmps/NoteTodos.js'
import ColorPicker from '../cmps/ColorPicker.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
            <span class="tack " :class="isPinned" @click="onSetPin(note.id)"></span>
            <Component 
                :is="note.type"  
                :note="note" 
                @toggle=toggleLine />
            <ul class="actions clean-list flex">
                <li @click="onCopyNote" class="fa-regular" title="Duplicate Note"></li>
                <li @click="onSendNote" class="fa-regular" title="Send Note as Mail"></li>
                <li @click="onRemoveNote" class="fa-solid" title="Delete Note"></li>
                <!-- <li>
                    <label :for="inputId" class="fa-regular"></label>
                    <input type="color" 
                        title="Change Background"
                        v-model="currNote.style.backgroundColor" 
                        :id="inputId" 
                        style="display:none;"
                        @input="onUpdateNote()"
                      />
                      
                     
                    </li> -->
                    <li  class="color-icon fa-regular" title="Delete Note"><ColorPicker @color="setColor"/></li>
                <li><Router-link :to="'/note/' + note.id" title="Edit Note" class="fa-regular"></Router-link></li>
            </ul>
        </article>
    `,
    data() {
        return {
            currNote: this.note
        }
    },
    methods: {
        onCopyNote() {
            this.$emit('copy', this.note)
        },
        onRemoveNote() {
            this.$emit('remove', this.currNote)
        },
        onUpdateNote() {
            this.$emit('save', this.currNote)
        },
        onSetPin(noteId) {
            console.log('noteId:', noteId)
            this.currNote.isPinned = !this.currNote.isPinned
            // console.log('preview set pin');
            console.log('this.currNote:', this.currNote)
            this.$emit('save', this.currNote)
            // this.currNote = null 
            // this.$emit('tack',  noteId)
        },
        onSendNote() {
            const noteToMail = {
                id: '',
                subject: this.currNote.info.title,
                body: this.currNote.info.txt,
                isRead: false,
                isStarred: false,
                sentAt: null,
                removedAt: null,
                from: 'myuser@approdite.com',
                to: ''
            }
            this.$emit('mail', noteToMail)
        },
        setColor(color){
            this.currNote.style.backgroundColor = color
            this.$emit('save', this.currNote)
        },
        toggleLine(idx){
            console.log('this.currNote.info.todos[idx].doneAt:', this.currNote.info.todos[idx].doneAt)
            const todo = this.currNote.info.todos[idx]
            todo.doneAt = (todo.doneAt)? null : Date.now()
            todo.isDone= !todo.isDone
            this.$emit('save', this.currNote)
            console.log('this.currNote.info.todos[idx].doneAt:', this.currNote.info.todos[idx].doneAt)
        }

    },
    computed: {
        bgColor() {
            return `display: `
        },
        inputId() {
            return `color-input ${this.note.id}`
        },
        isPinned(){
            return {
                'fa-regular': !this.currNote.isPinned,
                'fa-solid': this.currNote.isPinned
            }
        }
    },
    components: {
        NoteTxt,
        NoteImg,
        NoteTodos,
        ColorPicker
    }
}


