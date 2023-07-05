
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

export default {
    props: ['email'],
    template: `
        <article class="email-preview" :class="isRead" @click="openDetails(email.id)">
            <RouterLink :to="'/mail/emaildetails/' + email.id">
                <span>{{email.from}}</span><span>{{email.subject}}</span><span>{{formattedTime}}</span>
                <span>
                    <button class="fa-solid">
                    
                    </button>
                    <button class="fa-solid">
                    
                    </button>
                </span>
            </RouterLink>
        </article>
    `,
    computed: {
        formattedTime() {
            return Date(this.email.sentAt).toString()
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
        }
    }
}