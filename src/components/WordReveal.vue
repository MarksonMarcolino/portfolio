<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({ text: String })
const containerRef = ref(null)
const { locale } = useI18n()
let ctx

const words = computed(() => props.text?.split(/\s+/).filter(Boolean) || [])

function animate() {
  ctx?.revert()
  nextTick(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        '.word-inner',
        { y: '100%' },
        {
          y: '0%',
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef.value)
  })
}

onMounted(animate)
watch(() => props.text, () => nextTick(animate))
onUnmounted(() => ctx?.revert())
</script>

<template>
  <span ref="containerRef" class="inline-flex flex-wrap gap-x-[0.3em]">
    <span v-for="(word, i) in words" :key="`${word}-${i}`" class="overflow-hidden inline-block">
      <span class="word-inner inline-block gradient-text">{{ word }}</span>
    </span>
  </span>
</template>
