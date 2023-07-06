
export default {
    template: `
        <article class="note-info">
           <h2 contenteditable @input="onSetTitle">Title</h2>
           <p contenteditable @input="onSetTxt">Take a note...</p>

         
        </article>
    `,
 
    
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