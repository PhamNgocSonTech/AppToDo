import {createApp} from 'vue'
import App from './App.vue'
import StoreUser from './store/store'
import router from './router/index'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
app.use(StoreUser)
app.use(router)
app.use(VueToast)
app.mount('#app')
// createApp(App).mount('#app')
