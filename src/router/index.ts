import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/home/home.vue"
import setting from "@/pages/setting/setting.vue"
import history from "@/pages/history/history.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home
    }, {
      path: "/setting",
      component: setting
    }, {
      path: "/history",
      component: history
    }
  ]
})

export default router
