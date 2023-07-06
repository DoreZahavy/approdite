
// {
//     "id": "01H4JGABGJSD1Q0TE0CYGXB4NX",
//     "subject": "Synchronised responsive analyzer",
//     "body": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
//     "isRead": false,
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
            <RouterLink :to="'/mail/' + email.id">
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
    created() {
        const folder = this.$route.params
        // console.log(criteria)
    },
    computed: {
        formattedTime() {


            let epoch = new Date(0).setUTCSeconds(this.email.sentAt)
            // formattedDate = this.email.sentAt
            const year = new Date(epoch).getFullYear()
            const month = new Date(epoch).getMonth() + 1
            const day = new Date(epoch).getDate()
            // const diff = Math.abs(epoch - Date.now())
            // const timeDiffs = {
            //     year: 31556952,
            //     month: 2678411,
            //     week: 604800,
            //     day: 86400,
            // }
            // if (diff > timeDiffs.year) {
            return `${day}/${month}/${year}`
            // }

        },
        isRead() {
            // return email.isRead? 'email-read': 'email-unread'
            return {
                read: this.email.isRead,
                unread: !this.email.isRead
            }
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
        }
    }
}