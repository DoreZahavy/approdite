import { emailService } from "../services/email.service.js"
import Loading from "../../../cmps/Loading.js"
import MailList from "../cmps/EmailList.js"
import EmailFilter from "../cmps/EmailFilter.js"
import EmailFolderList from "../cmps/EmailFolderList.js"
import ComposeEmail from "../cmps/ComposeEmail.js"


export default {
    template: `
    <section class="email-index" >
            <button class="compose-btn" @click="viewCompose = true">
            <i class="fa-regular"></i>
            <span>Compose</span>
            </button>
        <ComposeEmail 
            v-show="viewCompose"
            @close="viewCompose = false"
            :draft="draftToEmail"/>
        <EmailFilter 
            @search="onSearch"
            @filter="onFilter"
            />
        <EmailFolderList
            :emails="emails"
            :folder="criteria.status"
        />
        <Loading v-show="!emails"/>
       <RouterView 
       v-if="emails" 
       :emails="emails" 
       :folder = "criteria.status"
       @remove="spliceRemoved"
       @starred="onStarred"
       @toggleRead="loadEmails"
       @draftCompose="openDraft"
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
            viewCompose: false,
            draftToEmail: null
        }
    },
    created() {
        this.loadEmails()
    },
    methods: {
        loadEmails() {

            console.log(this.emails)
            const params = this.$route.params
            this.criteria.status = params.folder ? params.folder : 'inbox'
            emailService.query(this.criteria)
                .then(emails => {
                    // if (emails.length <= 0) this.loadEmails()
                    this.emails = []
                    setTimeout(() => {
                        this.emails = emails
                    }, 0);
                })
                .catch(err => console.log(err))
        },
        spliceRemoved(emailId) {
            const idx = this.emails.findIndex(email => {
                return email.id === emailId
            })
            this.emails.splice(idx, 1)
            // this.loadEmails()
        },
        onSearch(params) {
            this.criteria.txt = params
            this.loadEmails()
        },
        onFilter(val) {
            this.emaills = []
            switch (val) {
                case 'read':
                    this.criteria.isRead = true
                    this.criteria.isStarred = null
                    break;
                case 'unread':
                    this.criteria.isRead = false
                    this.criteria.isStarred = null
                    break;
                case 'starred':
                    this.criteria.isStarred = true
                    this.criteria.isRead = null
                    break
                case 'all':
                    this.criteria.isRead = null
                    this.criteria.isStarred = null
                    break;
            }
            this.loadEmails()
        },
        openDraft(emailId) {
            this.viewCompose = true
            emailService.get(emailId)
                .then(email => this.draftToEmail = email)
        },
        onStarred(emailId) {
            // this.loadEmails()
            const idx = this.emails.findIndex(x => x.id === emailId)

            if (this.criteria.isStarred && !this.emails[idx].isStarred) {
                vue.delete(this.emails, idx)
            }
            // this.loadEmails()
            console.log(this.emails)
        }

    },
    computed: {
        params() {
            return this.$route.params.folder
        },
        emailCount() {
            return this.emails.length
        }
    },
    watch: {
        params() {
            console.log('params changed - loading emails')
            console.log(this.$route.params.folder)
            this.loadEmails()
        },
        emailCount() {
        }
    },
    components: {
        emailService,
        MailList,
        EmailFilter,
        EmailFolderList,
        ComposeEmail,
        Loading,
    },

}
