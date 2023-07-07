import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

// missBooks
import BookIndex from './apps/book/pages/BookIndex.js'
import BookDetails from './apps/book/pages/BookDetails.js'
import BookEdit from './apps/book/pages/BookEdit.js'
import BookAdd from './apps/book/cmps/BookAdd.js'

//missKeep
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteEdit from './apps/keep/cmps/NoteEdit.js'
import NoteTrash from './apps/keep/pages/NoteTrash.js'
import NoteList from './apps/keep/cmps/NoteList.js'

//misterEmail
import MailIndex from './apps/mail/pages/EmailIndex.js'
import EmailDetails from './apps/mail/pages/EmailDetails.js'
import MailList from './apps/mail/cmps/EmailList.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage,
        },
        {
            path: '/about',
            component: AboutUs,
        },
        // missBooks
        {
            path: '/book',
            component: BookIndex
        },
        {
            path: '/book/add',
            component: BookAdd
        },
        {
            path: '/book/:bookId',
            component: BookDetails
        },
        {
            path: '/book/edit/:bookId?',
            component: BookEdit
        },

        // missKeep
        {
            path: '/note',
            component: NoteIndex,
            children: [
                {
                    path: '',
                    name: 'note',
                    component: NoteList,
                    children: [
                        {
                            path: ':noteId',
                            component: NoteEdit,
                        }
                        
                    ]
                },
                {

                    path: 'trash',
                    component: NoteTrash
                }
                

            ]
        },
        {
            path: '/note/trash',
            component: NoteTrash
        },

        // misterEmail
        {
            path: '/mail',
            component: MailIndex,
            children: [
                {
                    path: 'list/:folder?',
                    component: MailList
                },
                {
                    path: ':emailId?',
                    component: EmailDetails
                }
            ]
        },
        // {
        //     path: '/mail/emaildetails/:emailId?',
        //     component: EmailDetails
        // },
        // {
        //     path: '/mail/:folder?',
        //     component:MailIndex
        // }
    ],
}

export const router = createRouter(routerOptions)
