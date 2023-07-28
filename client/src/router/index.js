import {createRouter, createWebHistory} from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Error from "@/pages/Error.vue";

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/:pathMatch(.*)*',
    component: Error
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
export default router
