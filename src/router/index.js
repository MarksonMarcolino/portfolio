import { createRouter, createWebHistory } from 'vue-router'
import { useLenis } from '../composables/useLenis.js'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      useLenis().scrollTo(to.hash)
      return false
    }
    return { top: 0 }
  },
})

export default router
