import { emailService } from "../services/email.service.js"
import { noteService } from "../../keep/services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"


export default {
    // props: ['email'],
    template: `
    <section class="email-details" v-if="email">
        <nav class="fa-solid">
            <router-link to="/mail/list" title="back to inbox"> </router-link>
            <button @click="onTrash" class="fa-solid" title="move to trash">
                
            </button>
            <button @click="onSaveToNote" class="fa-solid" title="save to note">
            
            </button>
        </nav>
        <div>
            <h1>{{email.subject}}</h1>
            <h4>{{email.from}}</h4>
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
        },
        onSaveToNote() {
            const note = {
                id: this.email.id,
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                isTrashed: false,
                labels:[],
                info: {
                    title: this.email.subject,
                    txt: this.email.body
                },
                style: {
                    backgroundColor: '#bababa'
                }
            }
            noteService.save(note).then(()=>{
                showSuccessMsg('Email saved as note')
                console.log('email saved as note')
            })
            .catch(err=>{
                showErrorMsg('Cannot save as note')
            })
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