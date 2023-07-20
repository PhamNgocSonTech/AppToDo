import {createRouter, createWebHistory} from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Error from "@/pages/Error.vue";

const initRoutes = [
  {path: '/', component: Dashboard},
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {path: '/:pathMatch(.*)*', component: Error},
]

const routers = createRouter({
  history: createWebHistory(),
  routes: initRoutes
})
export default routers
