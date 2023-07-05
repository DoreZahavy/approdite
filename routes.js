import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

// missBooks
// import BookIndex from './apps/book/pages/BookIndex.js'
// import BookDetails from './apps/book/pages/BookDetails.js'
// import BookEdit from './apps/book/pages/BookEdit.js'
// import BookAdd from './apps/book/cmps/BookAdd.js'

//missKeep
import NoteIndex from './apps/keep/pages/NoteIndex.js'
// import NoteEdit from './apps/keep/pages/NoteEdit.js'

//misterEmail
import MailIndex from './apps/mail/pages/MailIndex.js'

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
		// {
        //     path: '/book',
        //     component: BookIndex
        // },
        // {
        //     path: '/book/add',
        //     component: BookAdd
        // },
        // {
        //     path: '/book/:bookId',
        //     component: BookDetails
        // },
        // {
        //     path: '/book/edit/:bookId?',
        //     component: BookEdit
        // },

		// missKeep
		{
            path: '/note',
            component: NoteIndex,
			// children: [
            //     {
            //         path: ':noteId',
            //         component: NoteEdit,
            //     }

            // ]
        },

		// misterEmail

		{
			path: '/mail',
            component: MailIndex
		}
	],
}

export const router = createRouter(routerOptions)
