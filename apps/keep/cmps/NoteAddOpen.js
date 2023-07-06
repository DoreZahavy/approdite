
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
            this.noteToEdit.type = 'NoteTxt'
            this.noteToEdit.id = ''
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

     

    },
    components: {
        NoteEditTxt,
        NoteEditImg
    }
}


{/* <article class="note-add-open" :style="note.style">
<span class="tack fa-regular"></span>
   <Component 
       :is="type"  
       :note="note" 
   <ul class="actions clean-list flex">
       <li @click="onCopyNote" class="fa-regular" title="Duplicate Note"></li>
       <li @click="onRemoveNote" class="fa-regular" title="Delete Note"></li>
       <li>
           <label :for="inputId" class="fa-regular"></label>
           <input type="color" 
               title="Change Background"
               v-model="note.style.backgroundColor" 
               :id="inputId" 
               style="display:none;"
               @input="onSetBgColor"/>
       </li>
       <li><Router-link :to="'/note/' + note.id" title="Edit Note" class="fa-regular"></Router-link></li>
   </ul>
</article> */}