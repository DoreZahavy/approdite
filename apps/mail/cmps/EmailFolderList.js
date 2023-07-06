export default {
    props: ['emails'],
    template: `
        <ul class="email-folder-list">
            <li><RouterLink to="/mail/list/inbox">inbox {{unread}}</RouterLink></li>
            <li><RouterLink to="/mail/list/outgoing">outgoing</RouterLink></li>
            <li><RouterLink to="/mail/list/trash">trash</RouterLink></li>
            <li><RouterLink to="/mail/list/drafts">drafts</RouterLink></li>
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