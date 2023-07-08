export default {
    props: ['note'],
    template: `
        <article class="note-todos">
            <h2>{{note.info.title}}</h2>
            <ul class="clean-list">
                <li v-for="(todo,idx) in note.info.todos" 
                    @click=toggleTodo(idx,todo)
                    :class="{done: todo.isDone}"
                    class="todo-item">
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
    },
    methods: {
        toggleTodo(idx,todo) {
            this.$emit('toggle', idx)
        }
    }
}