const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
	template: `
        <section>
            <main class="main-layout">
                <AppHeader />
                <div class="main-route">
                    <RouterView />
                    <AppFooter />
                </div>
            </main>
            <UserMsg />
        </section>
    `,
	components: {
		AppHeader,
		AppFooter,
		UserMsg,
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
