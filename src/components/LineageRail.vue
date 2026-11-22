<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useLenis } from '../composables/useLenis.js'

const { t } = useI18n()
const lenis = useLenis()
const router = useRouter()

const sections = [
  { id: 'hero', key: 'home' },
  { id: 'timeline', key: 'timeline' },
  { id: 'publications', key: 'publications' },
  { id: 'projects', key: 'projects' },
  { id: 'stack', key: 'stack' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
]

const current = ref('hero')
let observer

onMounted(async () => {
  await router.isReady()
  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) current.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <nav class="rail" :aria-label="t('nav.sections')">
    <ol>
      <li v-for="s in sections" :key="s.id">
        <a
          :href="`#${s.id}`"
          :aria-current="current === s.id ? 'location' : undefined"
          @click.prevent="lenis.scrollTo(`#${s.id}`)"
        >
          <span class="node" aria-hidden="true" />
          <span class="label">{{ t(`nav.${s.key}`) }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.rail {
  display: none;
}

@media (min-width: 1600px) {
  .rail {
    display: block;
    position: fixed;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
  }
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

ol::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--edge);
}

li + li {
  margin-top: 14px;
}

a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
}

a:hover,
a[aria-current='location'] {
  color: var(--text-primary);
}

.node {
  width: 12px;
  height: 12px;
  flex: none;
  box-sizing: border-box;
  background: var(--bg-0);
  border: 2px solid var(--edge);
}

a[aria-current='location'] .node {
  background: var(--bronze);
  border-color: var(--bronze);
}
</style>
