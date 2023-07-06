import { utilService } from "../../../services/util.service.js"
import { emailService } from "../services/email.service.js"

export default {
    template: `
        <section class="email-compose">
            <button @click="onClose">
                x
            </button>
            <form @submit.prevent="onSend">
                <input type="email" name="recipient" v-model="email.to" placeholder="recipient">
                <input type="text" name="subject" v-model="email.subject" placeholder="subject">
                <textarea rows="9" cols="30" v-model="email.body" placeholder="content"></textarea>
                <input type="submit">
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
                removedAt: null,
                from: 'myuser@approdite.com',
                to: ''
            }
        }
    },
    methods: {
        onClose() {
            this.$emit('close')
        },
        onSend() {
            console.log(this.email)
            emailService.add(this.email)
        }
    }
}