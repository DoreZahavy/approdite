
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
                    </button>
                    <button class="fa-solid" title="mark as read">
                    
                    </button>
                </span>
        </article>
    `,
    created() {
        const folder = this.$route.params
    },
    data() {
        return {
            criteria: {
                status: 'inbox/sent/trash/draft',
                txt: '', // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStared: null, // (optional property, if missing: show all)
                lables: ['important', 'romantic'] // has any of the labels
            }
        }
    },
    computed: {
        formattedTime() {

            // const sentAt = new Date(0)
            // sentAt = this.email.sentAt
            // const year = new Date(sentAt).getFullYear()
            // const month = new Date(sentAt).getMonth() + 1
            // const day = new Date(sentAt).getDate()
            // return `${day}/${month}/${year}`
            return this.email.sentAt
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
                    email.removedAt = Date.now()+''
                    emailService.update(email)
                    this.$emit('remove',emailId)
                })
        }
    }
}