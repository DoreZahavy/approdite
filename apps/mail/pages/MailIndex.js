import { emailService } from "../services/email.service.js"
import MailList from "../cmps/MailList.js"
import EmailFilter from "../cmps/EmailFilter.js"
import EmailFolderList from "../cmps/EmailFolderList.js"
import ComposeEmail from "../cmps/ComposeEmail.js"

export default {
    template: `
    <section class="email-index" >
        <EmailFilter/>
        <EmailFolderList/>
       <MailList
            v-if="emails"
            :emails="emails"
       />
       <ComposeEmail/>
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
        EmailFilter,
        EmailFolderList,
        ComposeEmail,

    },
    
}
