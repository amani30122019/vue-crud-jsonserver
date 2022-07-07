import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App);
/* Fontawesome icons */
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
/* Bootstrap css framework */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
/* Main css file */
import "./assets/css/main.css"
app.use(store)
app.use(router)
app.mount('#app')
