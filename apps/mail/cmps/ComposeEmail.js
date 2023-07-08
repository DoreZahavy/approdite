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
            },
            draftInterval: null
        }
    },
    created() {
        if (!this.isDraft) this.email = emailService.getEmptyEmail()
        this.email.from = 'myuser@approdite.com'
        // emailService.add(this.email)
        // this.draftInterval = setInterval(() => {
        //     this.saveDraft()
        // }, 3000);
    },
    methods: {
        onClose() {
            window.clearInterval(this.draftInterval)
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
            this.email.sentAt = null
            emailService.add(this.email)
            this.onClose()
        },
        fromDraft() {
            console.log(this.draft)
            this.email = this.draft
        },
        saveDraft() {//this one's for the interval, needed a comment because of bad naming schemes
            
            // emailService.update(this.email)
            //     if (!emailService.doesEmailExist()) {
            //         emailService.add(this.email)
            //     }
            //     emailService.get(this.email.id)
            //         .then(() => {
            //             console.log('draft updated')
            //         })
            //         .catch()
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