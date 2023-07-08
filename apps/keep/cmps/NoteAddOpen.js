
import { noteService } from '../services/note.service.js';

import NoteEditTxt from '../cmps/NoteEditTxt.js'
import NoteEditImg from '../cmps/NoteEditImg.js'
import NoteEditTodos from '../cmps/NoteEditTodos.js'
import ColorPicker from '../cmps/ColorPicker.js'

export default {
    props: ['type'],
    template: `
        <article class="note-add-open" title="Pin Note" :style="noteToEdit.style">
            <span class="tack fa-regular"></span>
            <Component 
                v-if="noteToEdit"
                :is="type"  
                :note="noteToEdit" 
                @newval="onChangeVal"
                @newtodo="setTodo"/>
            <ul class="actions clean-list flex align-center">
                <li  class="color-icon fa-regular"><ColorPicker @color="setColor"/></li>
                <li @click="onAddNote" title="Add Note" class="fa-regular"></li> 
                <li @click="setAddMode" title="Cancel" class="fa-regular"></li>
            </ul>    
        </article>
    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(this.type),
        }
    },
    methods: {
        setAddMode() {
            this.$emit('type', 'unfocused')
        },
        onAddNote() {
            const type = this.noteToEdit.type
            if (type === 'NoteEditTxt') this.noteToEdit.type = 'NoteTxt'
            if (type === 'NoteEditImg') this.noteToEdit.type = 'NoteImg'
            if (type === 'NoteEditVideo') this.noteToEdit.type = 'NoteVideo'
            if (type === 'NoteEditTodos') this.noteToEdit.type = 'NoteTodos'
            this.$emit('add', this.noteToEdit)
            this.noteToEdit = noteService.getEmptyNote(this.type)
            this.$emit('type', 'unfocused')
        },

        onChangeVal(newVal) {
            this.noteToEdit.info[newVal.key] = newVal.value
        },
        setColor(color) {
            this.noteToEdit.style.backgroundColor = color
        },
        setTodo(data) {
            console.log('data.idx:', data.idx)
            console.log('data.value:', data.value)
            this.noteToEdit.info.todos[data.idx] = data.value
        }
    },
    computed: {
        isValid() {
            this.noteToEdit.info.title.length > 0
        },
    },
    components: {
        NoteEditTxt,
        NoteEditImg,
        NoteEditTodos,
        ColorPicker
    }
}


