import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
            <span class="tack fa-regular" @click="onSetPin(note.id)"></span>
            <Component 
                :is="note.type"  
                :note="note"  />
            <ul class="actions clean-list flex">
                <li @click="onCopyNote" class="fa-regular" title="Duplicate Note"></li>
                <li @click="onSendNote" class="fa-regular" title="Send Note as Mail"></li>
                <li @click="onRemoveNote" class="fa-solid" title="Delete Note"></li>
                <li>
                    <label :for="inputId" class="fa-regular"></label>
                    <input type="color" 
                        title="Change Background"
                        v-model="currNote.style.backgroundColor" 
                        :id="inputId" 
                        style="display:none;"
                        @input="onUpdateNote()"
                      />
                </li>
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
                sentAt: "1658014307",
                removedAt: null,
                from: 'myuser@approdite.com',
                to: ''
            }
            this.$emit('mail', noteToMail)
        }

    },
    computed: {
        bgColor() {
            return `display: `
        },
        inputId() {
            return `color-input ${this.note.id}`
        }
    },
    components: {
        NoteTxt,
        NoteImg
    }
}


