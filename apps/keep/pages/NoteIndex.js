
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

import NotePreview from '../cmps/NotePreview.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteAdd from '../cmps/NoteAdd.js'
import NoteAddOpen from '../cmps/NoteAddOpen.js'
import NoteEdit from '../cmps/NoteEdit.js'
import NoteList from '../cmps/NoteList.js'
import Sidebar from '../cmps/Sidebar.js'

export default {
    template: `
    <section class="note-index">

       <NoteFilter @search="setFilter"/>

       <Sidebar @trash="toTrash" 
            @label="toLabel" 
            @setlabel="setLabelFilter"
            :labels="labels"/>

       <RouterView :filter="filter" 
            :label="label" 
            @labels="setLabels"
            @removelabel="removeLabel"
            @addlabel="addLabel"/>  
            
    </section>
    `,
    data() {
        return {
            filter: '',
            label: '',
            labels: '',
            notes: null,
            noteAddType: 'unfocused',
            screen: false
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
        setLabels(labels) {
            this.labels = labels
        },
        setFilter(filter) {
            this.filter = filter
        },
        setLabelFilter(label) {
            this.label = label
        },
        removeLabel(idx) {
            this.labels.splice(idx, 1)
            utilService.saveToStorage('labelDB', this.labels)
        },
        addLabel(val) {
            this.labels.push(val)
            utilService.saveToStorage('labelDB', this.labels)
        },
        exitModal() {
            this.$router.push('/note')
        },
        toLabel() {
            this.$router.push('/note/label')
        },
        toTrash() {
            this.$router.push('/note/trash')
        }
    },
    watch: {
        params() {
            if (this.$route.params.noteId) this.screen = true
            else this.screen = false
        }
    },
    components: {
        NotePreview,
        NoteAdd,
        NoteAddOpen,
        NoteFilter,
        NoteEdit,
        Sidebar,
        NoteList
    }
}



