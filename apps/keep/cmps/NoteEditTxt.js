
export default {
    props: ['note'],
    template: `
        <article class="note-info">
           <h2 contenteditable ref="title" @input="onSetTitle">Title</h2>
           <p contenteditable ref="txt" @input="onSetTxt">Take a note...</p>

         
        </article>
    `,
    mounted(){
        if(this.note) {
            this.$refs.title.innerText = this.note.info.title
            this.$refs.txt.innerText = this.note.info.txt
        }
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