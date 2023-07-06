import NoteTxt from '../cmps/NoteTxt.js'

export default {
    props: ['note'],
    template: `
        <article class="note-preview">
         <span class="tack fa-regular"></span>
            <Component 
                :is="note.type"  
                :note="note" 
                @set-val="setAns($event, idx)" />
            <ul class="actions clean-list flex">
                <li @click="onCopyNote" class="fa-regular" title="Duplicate Note"></li>
                <li @click="onRemoveNote" class="fa-regular" title="Delete Note"></li>
                <li><Router-link :to="'/note/' + note.id" title="Edit Note" class="fa-regular"></Router-link></li>
            </ul>
        </article>
    `,
    methods: {
        onCopyNote() {
            this.$emit('copy', this.note)
        },
        onRemoveNote() {
            this.$emit('remove', this.note.id)
        }

    },
    components: {
        NoteTxt
    }
}