import { emailService } from "../services/email.service.js"

export default {
    // props: ['email'],
    template: `
    <section class="email-details">
        <nav class="fa-solid">
            <router-link to="/mail/list"> </router-link>
            <button @click="onTrash" class="fa-solid">
                
            </button>
        </nav>
        <div>
            <h1>{{email.subject}}</h1>
            <h3>{{formattedTime}}</h3>
        </div>
        <p>{{email.body}}</p>
    </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    created() {
        this.loadEmail()
    },
    methods: {
        loadEmail() {
            const { emailId } = this.$route.params
            console.log(emailId)
            emailService.get(emailId)
                .then(email => {
                    this.email = email
                    this.email.isRead = true
                    emailService.update(this.email)
                })
            .catch(err => {
                console.log(err)
            })
        },
        onTrash() {
            this.email.removedAt = Date.now() + ''
            emailService.update(this.email)
            this.$emit('remove', this.email.id)
            this.$router.push('/mail/list')
        }
    },
    computed: {
        formattedTime() {
            let epoch = new Date(0).setUTCSeconds(this.email.sentAt)
            const year = new Date(epoch).getFullYear()
            const month = new Date(epoch).getMonth() + 1
            const day = new Date(epoch).getDate()
            const hour = new Date(epoch).getHours()
            const minute = new Date(epoch).getMinutes()
            return `${day}/${month}/${year}  ${hour}:${minute}`
        }
    }
}