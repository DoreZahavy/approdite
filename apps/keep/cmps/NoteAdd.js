export default {
    template: `
        <section class="note-add flex align-center justify-between">
           <p @click="setAddMode('NoteEditTxt')">Take a note...</p>
           <ul class="note-types fa-solids flex clean-list">
                <li class="fa-solid" title="New note with text" @click="setAddMode('NoteEditTxt')"></li>
                <li class="fa-regular" title="New note with image" @click="setAddMode('NoteEditImg')"></li>
                <!-- <li class="fa-regular" @click="setAddMode('NoteEditVideo')"></li> -->
                <li class="fa-regular" title="New note with list" @click="setAddMode('NoteEditTodos')"></li>
           </ul>
        </section>
    `,
    methods: {
        setAddMode(noteType) {
            this.$emit('type', noteType)
        }
    }
}