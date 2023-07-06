import NoteTxt from '../cmps/NoteTxt.js'
import NoteImg from '../cmps/NoteImg.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview" :style="note.style">
         <span class="tack fa-regular"></span>
            <Component 
                :is="note.type"  
                :note="note" 
                @set-val="setAns($event, idx)" />
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
        </article>
    `,
    data() {
        return {
        }
    },
    methods: {
        onCopyNote() {
            this.$emit('copy', this.note)
        },
        onRemoveNote() {
            this.$emit('remove', this.note.id)
        },
        onSetBgColor() {
            this.$emit('paint',  this.note)
        }

    },
    computed: {
        bgColor() {
            return `display: `
        },
        inputId(){
            return `color-input ${this.note.id}`
        }
    },
    components: {
        NoteTxt,
        NoteImg
    }
}