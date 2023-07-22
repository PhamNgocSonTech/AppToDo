import {createApp} from 'vue'
import App from './App.vue'
import StoreUser from './store/store'
import router from './router/index'
import ToastPlugin from "vue-toast-notification";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const app = createApp(App)
app.use(StoreUser)
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
// createApp(App).mount('#app')
