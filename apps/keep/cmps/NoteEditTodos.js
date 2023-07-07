
export default {
    props: ['note'],
    template: `
        <article class="note-edit-todos">
           <h2 contenteditable ref="title" @input="onSetTitle">Title</h2>
           <!-- <p contenteditable ref="txt" @input="onSetTxt">Take a note...</p> -->
           <ul class="clean-list">
               <li v-for="(todo,idx) in note.info.todos" 
               contenteditable ref="'txt'+idx"
               :class="{done: todo.isDone}"
               class="todo-item"
               >
               <!-- @input="onSetTxt(idx)" -->
               <!-- @click=toggleTodo(idx,todo) -->
                <span v-if="todo.isDone" class="fa-regular"></span>
                <span v-else class="fa-regular"></span>
                   {{todo.txt}}
             
                </li>
                <li class="fa-solid" @click="addItem">+</li>
            </ul>
         
        </article>
    `,
    mounted(){
        if(this.note) {
            this.$refs.title.innerText = this.note.info.title
            for (var i = 0; i < length; i++) {
                this.$refs.txt.innerText = this.note.info.txt

            }
        }
    },
    data() {
        return {
            currNote: this.note
        }
    },
   
    computed: {
        todos() {
            return this.note.info.todos
        },
        // isDone(idx){
        //     console.log('idx:', idx)
        //     return {
        //         done: this.note.info.todos[idx].donaAt
        //     }
        // }


    },
    
    methods: {
        onSetTitle(x){
            this.$emit('newval',{key:'title',value: x.target.innerText} )
            console.log('title');
        },
        onSetTxt(x){
            this.$emit('newval',{key:'txt',value: x.target.innerText} )
            console.log('txt');
        },
        addItem(){
            const num = this.currNote.info.todos.length
            const newTodos = [...this.currNote.info.todos,{ txt: `List item ${num+1}`, doneAt: null , isDone:false}]
            this.$emit('newval',{key:'todos',value:newTodos})
        }
    }
 
   
}