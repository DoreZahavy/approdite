
import { noteService } from '../services/note.service.js';

import NoteEditTxt from '../cmps/NoteEditTxt.js'
import NoteEditImg from '../cmps/NoteEditImg.js'

export default {
    props: ['type'],
    template: `
        <article class="note-add note-add-open" :style="noteToEdit.style">
  
        <span class="tack fa-regular"></span>
        <Component 
            v-if="noteToEdit"
            :is="type"  
            :note="noteToEdit" 
            @newval="onChangeVal"/>
        <ul class="actions clean-list flex align-center">
            <li>
                <label  title="Change Background" :for="note-add-color" class="fa-regular"></label>
                <input type="color" 
                    v-model="noteToEdit.style.backgroundColor" 
                    :id="note-add-color" 
                    style="display:none;"
                    @input="onSetBgColor"/>
            </li>
            <li @click="onAddNote" class="fa-regular"></li> 
            <li @click="setAddMode" class="fa-regular"></li>
        </ul>    
        </article>
    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(this.type),
        }
    },
    created() {
        console.log(this.NoteToEdit);
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
            // this.noteToEdit.id = ''
            this.$emit('add', this.noteToEdit)
            this.noteToEdit = noteService.getEmptyNote(this.type)
            this.$emit('type', 'unfocused')
        },
        onSetBgColor(){
           console.log('hi color');
        },
        onChangeVal(newVal){
            this.noteToEdit.info[newVal.key] = newVal.value
        }
    },
    computed: {
        isValid() {
            this.noteToEdit.info.title.length > 0
        },
        prepareToShow(type){
            if (type === 'NoteEditTxt') return 'NoteTxt'
            if (type === 'NoteEditImg') return 'NoteImg'
            if (type === 'NoteEditVideo') return 'NoteVideo'
            if (type === 'NoteEditTodos') return 'NoteTodos'
        }
    },
    components: {
        NoteEditTxt,
        NoteEditImg
    }
}


