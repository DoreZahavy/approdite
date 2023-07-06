import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
const EMAIL_KEY = 'emailDb'

_createEmails()

const loggedinUser = {
    email: 'myuser@approdite.com',
    fullname: 'Aphrodite goddess of beauty'
}
export const emailService = {
    query,
    get,
    update,
    add
}
function query(criteria = { status: 'inbox' }) {
    //TODO: add filtering
    // const criteria = {
    //     status: 'inbox/sent/trash/draft',
    //     txt: 'puki', // no need to support complex text search
    //     isRead: true, // (optional property, if missing: show all)
    //     isStared: true, // (optional property, if missing: show all)
    //     lables: ['important', 'romantic'] // has any of the labels
    //     }
    _createEmails()
    return storageService.query(EMAIL_KEY).then(emails => {
        if (criteria.status) {
            switch (criteria.status) {
                case 'inbox':
                    emails = emails.filter(email => { if (email.to === loggedinUser.email && !email.removedAt) return email })
                    break;
                case 'outgoing':
                    emails = emails.filter(email => { if (email.to !== loggedinUser.email) return email })
                    break;
                case 'trash':
                    emails = emails.filter(email => { if (email.removedAt !== null) return email })
                    break;
                default:
                    emails = emails.filter(email => { if (email.to === loggedinUser.email) return email })
                    break;
            }

        }
        if (criteria.txt) {
            console.log('checking text criteria')
            emails = emails.filter(email => {
                if (email.body.includes(criteria.txt)) return email
            })
        }
        if(criteria.isRead && criteria.isRead!=null){
            console.log('show read only')
            emails = emails.filter(email=>{
                if(email.isRead)return email
            })
        }else if(!criteria.isRead && criteria.isRead!=null){
            console.log('show unread only')
            emails = emails.filter(email=>{
                if(email.isRead===false)return email
            })
        }
        return emails
    })
}
function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}
function remove(emailId) {

}
function update(email) {
    storageService.put(EMAIL_KEY, email)
}
function add(email) {
    storageService.post(EMAIL_KEY, email)
}
function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        fetch('apps/mail/data/email_demo_data.json')
            .then(res => {
                return res.json()
            })
            .then(res => {
                utilService.saveToStorage(EMAIL_KEY, res)
            })

    }
}