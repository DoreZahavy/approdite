export default {
    template: `
    <div class="email-filter">
        <div>
            <button @click="search" class="fa-solid">
            
            </button>
            <input type="text" placeholder="Search Mail" @keydown.enter="search" v-model="searchParams">
        </div>
        <select @input="filter">
            <option>show all</option>
            <option>show read</option>
            <option>show unread</option>
        </select>
    </div>
    `,
    data(){
        return{
            searchParams:'' ,
            isRead:null
        }
    },
    methods:{
        search(){
            console.log(this.searchParams)
            this.$emit('search', this.searchParams)
        },
        filter(val){
            const res = val.target.value.split(' ')
            this.$emit('filter',res[1])
        }
    }
}