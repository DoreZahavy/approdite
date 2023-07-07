import { noteService } from "../services/note.service.js"

export default {
    template: `
    <div class="sidebar">
<ul class="clean-list">
    <li :class="{active: active==='note'}" @click="activateNotes">
        <span class="fa-regular"></span><span>Notes</span>
    </li>
    <li v-if="labels" v-for="label in labels" @click=setLabel(label)
    :class="{active: active===label}">
        <span class="fa-regular"></span><span>{{label}}</span>
    </li>
    <li :class="{active:active==='label'}" @click="activateLabels">
        <span class="fa-regular"></span><span>Edit Labes</span>
    </li>
    <li :class="{active:active==='trash'}" @click="activateTrash">
        <span class="fa-regular"></span><span>Trash</span>
    </li>
 
    
</ul>
    </div>
    `,
    data() {
        return {
            active:'',
            labels: null
        }
    },
    created() {
        this.active = this.$route.name
        this.loadLabels()
    },
    methods: {
        loadLabels() {
            noteService.getLabels()
                .then(labels => {
                    this.labels = labels
                })
        },
        activateNotes() {
            this.active = 'note'
            this.$emit('setlabel','') 
            this.$router.push('/note')
        },
        activateTrash() {
            this.active = 'trash'
            this.$emit('trash')
        },
        activateLabels() {
            this.active = 'label'
            this.$emit('label')
        },
        setLabel(label){
            this.active = label
            this.$emit('setlabel',label) 
            this.$router.push('/note')
        }
    }
}