export default {
    template: `
    <div class="email-filter">
        <div>
            <button @click="search" class="fa-solid">
            
            </button>
            <input type="text" placeholder="Search Mail" @keydown.enter="search" v-model="searchParams">
        </div>
        <select>
            <option>show all</option>
            <option>show read</option>
            <option>show unread</option>
        </select>
    </div>
    `,
    data(){
        return{
            searchParams:'' 
        }
    },
    methods:{
        search(){
            console.log(this.searchParams)
            this.$emit('search', this.searchParams)
        }
    }
}