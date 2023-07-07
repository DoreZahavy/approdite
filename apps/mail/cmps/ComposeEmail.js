import { utilService } from "../../../services/util.service.js"
import { emailService } from "../services/email.service.js"
// import { showSuccessMsg, showErrorMsg } from '../../../cmps/UserMsg.js'
// import { showUserMsg } from "../../../services/event-bus.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export default {
    props: ['draft'],
    template: `
        <section class="email-compose">
            <nav >
                <button @click="onClose" class="fa-solid">
                    
                </button>
                
                <button @click="toDraft">save as draft</button>
            </nav>
            <form @submit.prevent="onSend">
                <input type="email" name="recipient" v-model="email.to" placeholder="recipient">
                <input type="text" name="subject" v-model="email.subject" placeholder="subject">
                <textarea rows="24" cols="30" v-model="email.body" placeholder="content"></textarea>
                <input type="submit" value="send">
            </form>
        </section>
    `,
    data() {
        return {
            email: {
                id: utilService.makeId(),
                subject: '',
                body: '',
                isRead: false,
                sentAt: Date.now(),
                isStarred: false,
                removedAt: null,
                from: 'myuser@approdite.com',
                to: ''
            }
        }
    },
    created() {
        if (!this.isDraft) this.email = emailService.getEmptyEmail()
        this.email.from = 'myuser@approdite.com'
    },
    methods: {
        onClose() {
            this.$emit('close')
        },
        onSend() {
            this.email.sentAt = Date.now()
            if (!this.isDraft) {
                emailService.add(this.email)
            } else {
                emailService.update(this.email)
            }
            this.onClose()
            showSuccessMsg('email sent')
        },
        toDraft() {
            console.log('draft...')
            this.email.sentAt = null
            emailService.add(this.email)
            showSuccessMsg('saved as draft')
            this.onClose()
        },
        fromDraft() {
            console.log(this.draft)
            this.email = this.draft
        }
    },
    computed: {
        isDraft() {
            return this.draft ? true : false
        },
        draftChange() {
            return this.draft
        }
    },
    watch: {
        isDraft() {
            this.fromDraft()
        },
        draftChange() {
            this.fromDraft()
        }
    }
}