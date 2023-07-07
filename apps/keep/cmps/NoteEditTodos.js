
export default {
    props: ['note'],
    template: `
        <article class="note-info">
           <h2 contenteditable ref="title" @input="onSetTitle">Title</h2>
           <!-- <p contenteditable ref="txt" @input="onSetTxt">Take a note...</p> -->
           <ul>
               <li v-for="(todo,idx) in note.info.todos" 
               contenteditable ref="'txt'+idx"
               :class="{done: todo.isDone}"
               >
               <!-- @input="onSetTxt(idx)" -->
               <!-- @click=toggleTodo(idx,todo) -->
              
                   {{todo.txt}}
             
                </li>
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
        }
    }
 
   
}