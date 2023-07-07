export default {
    props: ['note'],
    template: `
        <article class="note-todos">
           <h2>{{note.info.title}}</h2>
           <ul>
               <li v-for="(todo,idx) in note.info.todos" 
               @click=toggleTodo(idx,todo)
               :class="{done: todo.isDone}"
               >
              
                   {{todo.txt}}
             
                </li>
            </ul>

           
        </article>
    `,
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
        toggleTodo(idx,todo) {
           console.log('!todo.isDone:', !todo.isDone)
            // const todo = this.currNote.info.todos[idx]
            // todo.doneAt = (todo.doneAt)? null : Date.now()
            // console.log('idx:', idx)
            this.$emit('toggle', idx)
        }
    }
}
//  :class="isDone(idx)" 