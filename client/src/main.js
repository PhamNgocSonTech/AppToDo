import {createApp} from 'vue'
import App from './App.vue'
import StoreUser from './store/user'
import StoreLoading from "@/store/loading";
import router from './router/index'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import LoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)
app.use(StoreUser)
app.use(StoreLoading)
app.use(router)
app.use(VueToast)
app.use(LoadingOverlay)
app.mount('#app')
// createApp(App).mount('#app')
