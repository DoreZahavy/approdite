export default {
    props: ['emails','folder'],
    template: `
        <ul class="email-folder-list fa-regular">
            <li><RouterLink to="/mail/list/inbox"> <span>inbox</span> <span v-if="folder==='inbox'">{{unread}}</span></RouterLink></li>
            <!-- <li><RouterLink to="/mail/list/starred"> Starred <span v-if="folder==='starred'">{{unread}}</span></RouterLink></li> -->
            <li><RouterLink to="/mail/list/outgoing"> <span>outgoing</span> <span v-if="folder==='outgoing'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/trash"> <span>trash</span> <span v-if="folder==='trash'">{{unread}}</span></RouterLink></li>
            <li><RouterLink to="/mail/list/drafts"> <span>drafts</span> <span v-if="folder==='drafts'">{{unread}}</span></RouterLink></li>
        </ul>
    `,
    data() {
        return {
        }
    },
    created(){
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