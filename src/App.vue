<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import gsap from 'gsap'
import NavBar from './components/NavBar.vue'

const cursorGlow = ref(null)
const hasHover = useMediaQuery('(hover: hover)')

function onMouseMove(e) {
  if (cursorGlow.value) {
    gsap.to(cursorGlow.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: 'power3.out',
    })
  }
}

onMounted(() => {
  if (!hasHover.value) return
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="cursor-glow" v-if="hasHover" ref="cursorGlow" />
  <NavBar />
  <router-view />
</template>
