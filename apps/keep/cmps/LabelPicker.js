import { noteService } from "../services/note.service.js"

export default {
    props:['labels'],
    template: `
        <div class="label-picker">
            <ul class="label-list clean-list">
                <li class="label-pill" 
                    @click="pickLabel(label)"  
                    v-for="(label,idx) in labels" 
                    :key="idx">
                    {{label}}
                </li>  
           </ul>
        </div>
    `,
    data() {
        return {
           
        }
    },
   
    methods: {
        pickLabel(label){
            this.$emit('label',label)
        }
    }
}