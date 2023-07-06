export default {
    props: ['note'],
    template: `
        <article class="note-info">
           <h2>{{note.info.title}}</h2>
           <img :src="imgSrc" alt="Image" />

           
        </article>
    `,
   computed: {
    imgSrc(){
        return this.note.info.url
    }
   }
}