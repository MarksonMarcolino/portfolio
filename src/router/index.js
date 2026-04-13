import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      if (window.__lenis) {
        window.__lenis.scrollTo(to.hash)
        return false
      }
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
