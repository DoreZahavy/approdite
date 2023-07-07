export default {
    props: ['emails','folder'],
    template: `
        <ul class="email-folder-list fa-regular">
            <li><RouterLink to="/mail/list/inbox"> inbox <span v-if="folder==='inbox'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/starred"> Starred <span v-if="folder==='starred'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/outgoing"> outgoing <span v-if="folder==='outgoing'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/trash"> trash <span v-if="folder==='trash'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/drafts"> drafts <span v-if="folder==='drafts'">{{unread}}</span></RouterLink></li>
        </ul>
    `,
    data() {
        return {
        }
    },
    created(){
        console.log(this.folder)
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