import { emailService } from "../services/email.service.js"
import MailList from "../cmps/MailList.js"

export default {
    template: `
    <section class="book-index" >
       <h1>emails here</h1>
       <MailList
            v-if="emails"
            :emails="emails"
       />
    </section>
    `,
    data(){
        return{
            emails:[],
        }
    },
    created(){
      emailService.query()
        .then(emails=> this.emails = emails)
    },
    components:{
        emailService,
        MailList,
    },
    
}
