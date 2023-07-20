import {createApp} from 'vue'
import App from './App.vue'
import StoreUser from './store/store'
import router from './router/index'

const app = createApp(App)
app.use(StoreUser)
app.use(router)
app.mount('#app')
// createApp(App).mount('#app')
