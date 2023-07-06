import { emailService } from "../services/email.service.js";
import EmailPreview from "./EmailPreview.js";
export default {
    props: ['emails'],
    template: `
        <section class="email-list"   v-if="emails">
            <ul>
                <li v-for="email in emails">
                    <EmailPreview :email="email" @remove="onRemove" :criteria="criteria"/>
                </li>
            </ul>
        </section>
    `,
    methods:{
        onRemove(emailId){
            this.$emit('remove',emailId)
        }
    },
    components: {
        EmailPreview,
    },
    name:'list'
}