import { emailService } from "../services/email.service.js";
import EmailPreview from "./EmailPreview.js";
export default {
    props: ['emails','folder'],
    template: `
        <section class="email-list"   v-if="emails">
            <ul>
                <li v-for="email in emails">
                    <EmailPreview 
                    :email="email" 
                    :folder="folder"
                    @remove="onRemove"
                    @starred="onStarred"
                    @toggleRead="onToggleRead"
                    @draftCompose="onDraftCompose"
                    />
                </li>
            </ul>
        </section>
    `,
    methods:{
        onRemove(emailId){
            this.$emit('remove',emailId)
        },
        onStarred(emailId){
            this.$emit('starred',emailId)
        },
        onToggleRead(emailId){
            this.$emit('toggleRead', emailId)
        },
        onDraftCompose(emailId){
            console.log('on draft compose')
            this.$emit('draftCompose',emailId)
        }
    },
    components: {
        EmailPreview,
    },
    name:'list'
}