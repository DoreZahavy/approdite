import { emailService } from "../services/email.service.js"
import MailList from "../cmps/EmailList.js"
import EmailFilter from "../cmps/EmailFilter.js"
import EmailFolderList from "../cmps/EmailFolderList.js"
import ComposeEmail from "../cmps/ComposeEmail.js"

export default {
    template: `
    <section class="email-index" >
        <EmailFilter/>
        <EmailFolderList
            :emails="emails"
        />
       <!-- <MailList
            v-if="emails"
            :emails="emails"
       /> -->
       <RouterView :emails="emails" @remove="spliceRemoved"/>
       <ComposeEmail/>
    </section>
    `,
    data() {
        return {
            emails: [],
            criteria: {
                status: 'inbox',
                txt: '', // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStared: null, // (optional property, if missing: show all)
                // lables: ['important', 'romantic'] // has any of the labels
            }
        }
    },
    created() {
        this.loadEmails()
    },
    methods: {
        loadEmails() {
            console.log('loading emails')
            const params = this.$route.params
            this.criteria.status = params.folder ? params.folder : 'inbox'
            emailService.query(this.criteria)
                .then(emails => {
                    this.emails = emails
                })
        },
        spliceRemoved(emailId) {
            console.log('splicing..')
            console.log(emailId)
            const idx = this.emails.findIndex(email => {
                return email.id === emailId
            })
            this.emails.splice(idx,1)
        }

    },
    computed: {
        params() {
            return this.$route.params.folder
        }
    },
    watch: {
        params() {
            this.loadEmails()
        }
    },
    components: {
        emailService,
        MailList,
        EmailFilter,
        EmailFolderList,
        ComposeEmail,

    },

}
