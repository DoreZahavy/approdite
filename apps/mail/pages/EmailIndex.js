import { emailService } from "../services/email.service.js"
import MailList from "../cmps/EmailList.js"
import EmailFilter from "../cmps/EmailFilter.js"
import EmailFolderList from "../cmps/EmailFolderList.js"
import ComposeEmail from "../cmps/ComposeEmail.js"

export default {
    template: `
    <section class="email-index" >
            <button class="compose-btn" @click="viewCompose = true">
            <i class="fa-regular"></i>
            Compose
            </button>
        <ComposeEmail 
            v-show="viewCompose"
            @close="viewCompose = false"/>
        <EmailFilter 
            @search="onSearch"
            @filter="onFilter"
            />
        <EmailFolderList
            :emails="emails"
        />
       <RouterView :emails="emails" 
       @remove="spliceRemoved"
       @toggleRead="loadEmails"
       />
    </section>
    `,
    data() {
        return {
            emails: [],
            criteria: {
                status: 'inbox',
                txt: '', // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStarred: null, // (optional property, if missing: show all)
                // lables: ['important', 'romantic'] // has any of the labels
            },
            viewCompose:false,
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
                .catch(err=>console.log(err))
        },
        spliceRemoved(emailId) {
            console.log('splicing..')
            console.log(emailId)
            const idx = this.emails.findIndex(email => {
                return email.id === emailId
            })
            this.emails.splice(idx, 1)
            this.loadEmails()
        },
        onSearch(params){
            this.criteria.txt = params
            this.loadEmails()
        },
        onFilter(val){
            switch (val){
                case 'read':
                    this.criteria.isRead = true
                    break;
                case 'unread':
                    this.criteria.isRead = false
                    break;
                case 'all':
                    this.criteria.isRead = null
                    break;
            }
            this.loadEmails()
        }

    },
    computed: {
        params() {
            return this.$route.params.folder
        },
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
