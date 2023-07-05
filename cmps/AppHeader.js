export default {
	template: `
        <header class="app-header">
            <!-- <h1>Approdite</h1 -->
             <img src="../assets/img/logo.svg">
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> | 
                <router-link to="/book">Books</router-link> | 
                <router-link to="/mail">Email</router-link> | 
                <router-link to="/note">Notes</router-link>
            </nav>
        </header>
    `,
}
