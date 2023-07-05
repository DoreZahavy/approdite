export default {
    template: `
    <div class="email-filter">
        <div>
            <button @click="search" class="fa-solid">
            
            </button>
            <input type="text" placeholder="Search Mail">
        </div>
        <select>
            <option>show all</option>
            <option>show read</option>
            <option>show unread</option>
        </select>
    </div>
    `,
    methods:{
        search(){
            console.log('searching :DDD')
        }
    }
}