import { noteService } from '../services/note.service.js'

import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'
import NoteTodos from '../cmps/NoteTodos.js'
import ColorPicker from '../cmps/ColorPicker.js'
import LabelPicker from '../cmps/LabelPicker.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
            <span class="tack" :class="isPinned" @click="onSetPin(note.id)"></span>
            <Component 
                :is="note.type"  
                :note="note" 
                @toggle=toggleLine />
            <ul class="prev-labels clean-list flex">
                <li v-for="label in note.labels">
                    {{label}}
                </li>
            </ul>
            <ul class="actions clean-list flex">
                <li @click="onCopyNote" class="fa-regular" title="Duplicate Note"></li>
                <li @click="onSendNote" class="fa-regular" title="Send Note as Mail"></li>
                <li @click="onRemoveNote" class="fa-solid" title="Delete Note"></li>
                <li class="fa-regular label-icon" title="Delete Note"><LabelPicker :labels="labels" @label="onToggleLabel"/></li>
               
            
                    <li  class="color-icon fa-regular" title="Delete Note"><ColorPicker @color="setColor"/></li>
                <li><Router-link :to="'/note/' + note.id" title="Edit Note" class="fa-regular"></Router-link></li>
            </ul>
        </article>
    `,
    data() {
        return {
            currNote: this.note,
            labels: null
        }
    },
    created() {
        this.loadLabels()
    },
    methods: {
        loadLabels() {
            noteService.getLabels()
                .then(labels => {
                    this.labels = labels
                })
        },
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
            this.currNote.isPinned = !this.currNote.isPinned
            // console.log('preview set pin');
            this.$emit('save', this.currNote)
            // this.currNote = null 
           
            // this.$emit('tack',  noteId)
        },
        onToggleLabel(label){
            const labelIdx = this.currNote.labels.indexOf(label)

            if(labelIdx===-1)this.currNote.labels.push(label)
            else this.currNote.labels.splice(labelIdx,1)
            
            this.$emit('save', this.currNote)
           
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
        ColorPicker,
        LabelPicker
    }
}


