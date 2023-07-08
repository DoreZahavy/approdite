
export default {
    props: ['note'],
    template: `
        <article class="note-edit-todos">
            <h2 contenteditable ref="title" @input="onSetTitle">Title</h2>
            <ul class="clean-list">
                <li v-for="(todo,idx) in note.info.todos" 
                    :class="{done: todo.isDone}"
                    class="todo-item" 
                    @input="onSetTodo($event,idx)">
                    <span @click="onRemoveLine(idx)" class="trash-line-btn fa-regular"></span>
                    <span @click="onToggle(idx)" v-if="todo.isDone" class="fa-regular"></span>
                    <span @click="onToggle(idx)" v-else class="fa-regular"></span>
                    <span   contenteditable ref="'txt'+idx">{{todo.txt}}</span>
                </li>
                <li class="fa-solid add-line-btn" @click="onAddItem">+</li>
            </ul>
        </article>
    `,
    mounted() {
        if (this.note) {
            this.$refs.title.innerText = this.note.info.title
            for (var i = 0; i < length; i++) {
                this.$refs['txt' + i].innerText = this.note.info.todos[i].txt
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
    },
    methods: {
        onSetTitle(ev) {
            this.$emit('newval', { key: 'title', value: ev.target.innerText })
            console.log('title');
        },
        onSetTodo(ev, idx) {
            this.currNote.info.todos[idx].txt = ev.target.innerText
            this.$emit('newval', { key: 'todos', value: this.currNote.info.todos })
        },
        onAddItem() {
            const num = this.currNote.info.todos.length
            const newTodos = [...this.currNote.info.todos, { txt: `List item ${num + 1}`, doneAt: null, isDone: false }]
            this.$emit('newval', { key: 'todos', value: newTodos })
        },
        onToggle(idx) {
            this.currNote.info.todos[idx].isDone = !this.currNote.info.todos[idx].isDone
            this.$emit('newval', { key: 'todos', value: this.currNote.info.todos })
        },
        onRemoveLine(idx) {
            this.currNote.info.todos.splice(idx, 1)
            this.$emit('newval', { key: 'todos', value: this.currNote.info.todos })
        }
    }
}