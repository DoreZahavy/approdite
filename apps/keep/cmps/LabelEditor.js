import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
    // props:['labels'],
    template: `
        <section class="label-editor">
            <h2>Edit labels</h2>
            <div class="input-line">
                <span @click="clearInput" class="fa-solid">X</span>
                <input ref="input" type="text" placeholder="Create new label" />
                <span @click="addLabel" class="fa-solid"></span>
            </div>
            <ul class="clean-list" v-if="labels">
                <li v-for="(label,idx) in labels">
                    <span @click="removeLabel(idx)" class="fa-regular"></span>
                    <p>{{label}}</p>
                </li>
            </ul>
          
        </section>
    `,
    data(){
        return {
            labels: null
        }
    },
    created(){
        this.loadLabels()
    },
    methods: {
       loadLabels(){
        noteService.getLabels()
            .then(labels=>{
                this.labels = labels
            })
       },
       clearInput(){
            const val = 
            this.$refs.input.value = ''


       },
       addLabel(){
        const val = this.$refs.input.value
        this.labels.push(val)
        // utilService.saveToStorage('labelDB',this.labels)
        this.$emit('addlabel',val)
       },
       removeLabel(idx){
           this.labels.splice(idx , 1)
        //    const val = this.$refs.input.value
           this.$emit('removelabel',idx)
            // utilService.saveToStorage('labelDB',this.labels)
       }
    }
   
}