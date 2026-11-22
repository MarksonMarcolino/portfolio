<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Analytics } from '@vercel/analytics/vue'
import NavBar from './components/NavBar.vue'
import LineageRail from './components/LineageRail.vue'
import CvTemplate from './components/CvTemplate.vue'
import { useTheme } from './composables/useTheme.js'

const { locale } = useI18n()
watch(locale, (l) => { document.documentElement.lang = l }, { immediate: true })

useTheme()
</script>

<template>
  <NavBar />
  <router-view />
  <LineageRail />
  <CvTemplate inert />
  <Analytics />
</template>
