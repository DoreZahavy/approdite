export default {
    template: `
    <div class="note-filter">
    <!-- <span class="fa-solid"></span> -->
        <div>
            <button @click="search" class="fa-solid">
            
            </button>
            <input type="text" placeholder="Search Notes" @input="search" @keydown.enter="search" v-model="value">
        </div>
      
    </div>
    `,
    data(){
        return{
            value:'' ,
            isRead:null
        }
    },
    methods:{
        search(){
            console.log(this.value)
            this.$emit('search', this.value)
        }
    }
}
