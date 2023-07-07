export default {
    template: `
    <div class="note-filter">
    <!-- <span class="fa-solid"></span> -->
        <div>
            <button @click="search" class="fa-solid">
            
            </button>
            <input type="text" placeholder="Search Notes" @keydown.enter="search" v-model="value">
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
        },
        filter(val){
            const res = val.target.value.split(' ')
            this.$emit('filter',res[1])
        }
    }
}
