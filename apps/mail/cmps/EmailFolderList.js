export default {
    props: ['emails'],
    template: `
        <ul class="email-folder-list">
            <li>inbox {{unread}}</li>
            <li>outgoing</li>
            <li>trash</li>
            <li>draft</li>
        </ul>
    `,
    data() {
        return {
        }
    },
    computed: {
        unread() {
            const res = this.emails.filter(email => {
                return !email.isRead
            });
            return `(${res.length})`
        }
    }

}