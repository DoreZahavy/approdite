
// {
//     "id": "01H4JGABGJSD1Q0TE0CYGXB4NX",
//     "subject": "Synchronised responsive analyzer",
//     "body": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
//     "isRead": false,
//     "isStarred":false,
//     "sentAt": "1551052800",
//     "removedAt": null,
//     "from": "dprozescky2@livejournal.com",
//     "to": "myuser@approdite.com "
// }

import { emailService } from "../services/email.service.js"

export default {
    props: ['email'],
    template: `
        <article class="email-preview" :class="isRead" @click="openDetails(email.id)">
            <button class="fa-solid star" v-if="currEmail.isStarred" @click="onToggleStarred(email.id)">
            
            </button>
            <button class="fa-regular star" v-if="!currEmail.isStarred" @click="onToggleStarred(email.id)">
            
            </button>
            {{currEmail.isStarred}}
            <RouterLink :to="'/mail/' + email.id" :email="email">
                <span>{{email.from}}</span><span>{{email.subject}}</span><span>{{formattedTime}}</span>
            </RouterLink>
                <span class="preview-buttons">
                    <button @click="onTrash(email.id)" class="fa-solid" title="move to trash">
                    
                    </button >
                    <button @click="onToggleRead(email.id)" v-if="!email.isRead" class="fa-solid" title="mark as read">
                    
                    </button>
                    <button @click="onToggleRead(email.id)" v-if="email.isRead" class="fa-solid" title="mark as unread">
                    
                    </button>
                </span>
        </article>
    `,
    data() {
        return {
            currEmail: this.email
        }
    },
    created() {
    },
    computed: {
        formattedTime() {
            let epoch = new Date(0).setUTCSeconds(this.currEmail.sentAt)
            // formattedDate = this.email.sentAt
            const year = new Date(epoch).getFullYear()
            const month = new Date(epoch).getMonth() + 1
            const day = new Date(epoch).getDate()
            const hour = new Date(epoch).getHours()
            return `${day}/${month}/${year}`

        },
        isRead() {
            // return email.isRead? 'email-read': 'email-unread'
            return {
                read: this.email.isRead,
                unread: !this.email.isRead
            }
        },
        isStarred() {
            return this.email.isStarred ? true : false
        }
    },
    methods: {
        openDetails(emailId) {
            // this.email.isRead = true
        },
        onTrash(emailId) {
            emailService.get(emailId)
                .then(email => {
                    email.removedAt = Date.now() + ''
                    emailService.update(email)
                    this.$emit('remove', emailId)
                })
        },
        onToggleRead() {
            this.email.isRead = !this.email.isRead
            emailService.update(this.email)
        },
        onToggleStarred(emailId) {
            // this.email.isStarred = !this.email.isStarred
            // emailService.update(this.email)
            // email.isStarred = !email.isStarred
            emailService.get(emailId)
                .then(email => {
                    email.isStarred = !email.isStarred
                    emailService.update(email)
                    console.log(email)
                    this.currEmail = email
                    this.$emit('starred')
                })

        }
    }
}