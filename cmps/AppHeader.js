export default {
	template: `
        <header class="app-header">
            <!-- <h1>Approdite</h1 -->
            <i class="fa-solid"></i>
             <img src="assets/img/logo.svg">
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> | 
                <router-link to="/book">Books</router-link> | 
                <router-link to="/mail/list">Email</router-link> | 
                <router-link to="/note">Notes</router-link>
            </nav>
        </header>
    `,
}
