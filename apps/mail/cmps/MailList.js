import { emailService } from "../services/email.service.js";
import EmailPreview from "./EmailPreview.js";
export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails">
                    <EmailPreview :email="email"/>
                </li>
            </ul>
        </section>
    `,
    components: {
        EmailPreview,
    }
}