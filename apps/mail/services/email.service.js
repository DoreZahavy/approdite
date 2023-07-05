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
    get
}
function query(criteria={status:'inbox'}) {
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
        if(criteria.status){
            switch (criteria.status){
                case 'inbox':
                    emails = emails.filter(email => {if(email.to === loggedinUser.email) return email})
            }
        }
        return emails
    })
}
function get(emailId){
    return storageService.get(EMAIL_KEY, emailId)
}
function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails = [{
            "id": "01H4JGABGJSD1Q0TE0CYGXB4NX",
            "subject": "Synchronised responsive analyzer",
            "body": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "dprozescky2@livejournal.com",
            "to": "myuser@approdite.com "
        },
        {
            "id": "01H4JGABGMCDZS63M4WTWFHPSV",
            "subject": "Cross-group optimal groupware",
            "body": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "cadamiec3@meetup.com",
            "to": "myuser@approdite.com"
        },
        {
            "id": "01H4JGABGPS3PY3FEQ6NM9X6YJ",
            "subject": "Triple-buffered incremental local area network",
            "body": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "dendrici4@geocities.jp",
            "to": "myuser@approdite.com "
        },
        {
            "id": "01H4JGABGR9F0SCD72J88MYGVV",
            "subject": "De-engineered client-driven archive",
            "body": "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
            "isRead": true,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "fburgen5@wunderground.com",
            "to": "myuser@approdite.com"
        },
        {
            "id": "01H4JGABGSDBCZP0DBDE5G9V3V",
            "subject": "Focused incremental instruction set",
            "body": "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "jfuxman6@cam.ac.uk"
        },
        {
            "id": "01H4JGABGVKQ641TW7R7DEXB0F",
            "subject": "Future-proofed modular extranet",
            "body": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "cmileham7@mozilla.com"
        },
        {
            "id": "01H4JGABGXSTSFB53STQMFS2KS",
            "subject": "Optional clear-thinking encryption",
            "body": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "spendlebury8@si.edu"
        },
        {
            "id": "01H4JGABGY7N4F0SE6M8CTM3CN",
            "subject": "Reverse-engineered content-based parallelism",
            "body": "Cras in purus eu magna vulputate luctus.",
            "isRead": true,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "msaffrin9@typepad.com"
        },
        {
            "id": "01H4JGABH01W2YES9R16HV4GNG",
            "subject": "Intuitive background frame",
            "body": "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "lgogana@ezinearticles.com"
        },
        {
            "id": "01H4JGABH32EGXMTHZPMZBCFFW",
            "subject": "Versatile intermediate flexibility",
            "body": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "ereedeb@bluehost.com"
        },
        {
            "id": "01H4JGABH5BQWZMW53Z12CDD5M",
            "subject": "Realigned eco-centric database",
            "body": "Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "mbridgstockc@uol.com.br"
        },
        {
            "id": "01H4JGABH74EHJ630KHBWP24JK",
            "subject": "Face to face incremental infrastructure",
            "body": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
            "isRead": true,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "ftaddd@reverbnation.com"
        },
        {
            "id": "01H4JGABH8C51GAKVCHFS50P4P",
            "subject": "Multi-channelled logistical secured line",
            "body": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "nhaingee@privacy.gov.au"
        },
        {
            "id": "01H4JGABHA9MT8FAMT7XT8FQ3J",
            "subject": "Open-architected multimedia challenge",
            "body": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "khempshallf@sfgate.com"
        },
        {
            "id": "01H4JGABHCKAPETB44JTWMAD73",
            "subject": "Realigned 6th generation algorithm",
            "body": "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
            "isRead": true,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "jviccaryg@storify.com"
        },
        {
            "id": "01H4JGABHD3Q37T5D9H42FTFRA",
            "subject": "Multi-lateral value-added model",
            "body": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "btrimmillh@narod.ru"
        },
        {
            "id": "01H4JGABHF41SKG8760PVQMEKY",
            "subject": "Synergistic multi-tasking synergy",
            "body": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
            "isRead": true,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "adeverillei@cafepress.com"
        },
        {
            "id": "01H4JGABHH1W2D5N66V9YB9KF8",
            "subject": "Proactive optimizing standardization",
            "body": "Fusce consequat. Nulla nisl.",
            "isRead": false,
            "sentAt": "1551052800",
            "removedAt": null,
            "from": "myuser@approdite.com",
            "to": "mgiovannonij@google.fr"
        }]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}