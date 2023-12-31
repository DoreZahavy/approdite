import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="label-editor">
            <h2>Edit labels</h2>
            <div class="input-line">
                <span @click="clearInput" title="Cancel" class="fa-solid">X</span>
                <input ref="input" type="text" placeholder="Create new label" />
                <span @click="addLabel" title="Create Label" class="fa-solid"></span>
            </div>
            <ul class="clean-list" v-if="labels">
                <li v-for="(label,idx) in labels">
                    <span @click="removeLabel(idx)" title="Delete Label" class="fa-regular"></span>
                    <p>{{label}}</p>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
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
        clearInput() {
            const val =
                this.$refs.input.value = ''
        },
        addLabel() {
            const val = this.$refs.input.value
            this.labels.push(val)
            this.$emit('addlabel', val)
        },
        removeLabel(idx) {
            this.labels.splice(idx, 1)
            this.$emit('removelabel', idx)
        }
    }

}