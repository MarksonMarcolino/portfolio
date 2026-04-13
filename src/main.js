import { createApp } from 'vue'
import Lenis from 'lenis'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

window.__lenis = lenis

createApp(App).use(router).use(i18n).mount('#app')
