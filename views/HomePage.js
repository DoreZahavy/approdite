export default {
	template: `
        <section class="home-page">
            <div>
                <h1>Welcome to Approdite</h1>
                <h3>jump right in</h3>
                <section class="fa-solid">
                <router-link to="/book"></router-link>
                <router-link to="/mail/list"></router-link> 
                <router-link to="/note"></router-link>
                </section>
            </div>
            <img src="assets/img/aphrodite.png">
        </section>
    `,
}
