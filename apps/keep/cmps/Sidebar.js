export default {
    template: `
    <div class="sidebar">
<ul class="clean-list">
    <li @click="activateNotes"><span class="fa-regular"></span><span>Notes</span></li>
    <li><span class="fa-regular"></span><span>Edit Labes</span></li>
    <li @click="activateTrash"><span class="fa-regular"></span><span>Trash</span></li>
 
    
</ul>
    </div>
    `,
    methods: {
        activateNotes(){
            this.$router.push('/note')
        },
        activateTrash(){
            // this.$router.push('/note/trash')
            this.$emit('trash')
        }
    }
}