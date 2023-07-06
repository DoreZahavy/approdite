import { emailService } from "../services/email.service.js"

export default {
    template: `
        <pre>
            {{email}}
        </pre>
    `,
    data() {
        return {
            email: null,
        }
    },
    created(){
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
        }
    },
}