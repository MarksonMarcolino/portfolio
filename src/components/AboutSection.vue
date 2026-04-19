<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { ExternalLink } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'

const { t } = useI18n()
const sectionRef = ref(null)

useScrollReveal(sectionRef, '[data-reveal]', { y: 30, stagger: 0.12 })

const projects = [
  { name: 'Serena', descKey: 'serena', url: 'https://serena.ia.br/' },
  { name: 'nanoncore', descKey: 'nanoncore', url: 'https://nanoncore.com/' },
  { name: 'voz', descKey: 'voz', url: 'https://github.com/MarksonMarcolino/voz' },
]

const languages = [
  { flag: '\u{1F1E7}\u{1F1F7}', key: 'portuguese', levelKey: 'native' },
  { flag: '\u{1F1EA}\u{1F1F8}', key: 'spanish', levelKey: 'advanced' },
  { flag: '\u{1F1EC}\u{1F1E7}', key: 'english', levelKey: 'advanced' },
  { flag: '\u{1F1EB}\u{1F1F7}', key: 'french', levelKey: 'intermediate' },
]

const education = [
  { degreeKey: 'masters', school: 'UFSC', years: '2024–2025' },
  { degreeKey: 'bachelors', school: 'UFSC', years: '2010–2015' },
]
</script>

<template>
  <section id="about" ref="sectionRef" class="relative z-10 px-4" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 40px;">
    <div class="max-w-6xl mx-auto">
      <!-- Title -->
      <SectionHeader :title="t('about.title')" :subtitle="t('about.subtitle')" style="margin-bottom: 40px;" />

      <div class="flex flex-col lg:flex-row items-start" style="gap: clamp(40px, 8vw, 80px);">
        <!-- Left column -->
        <div data-reveal class="w-full lg:w-[40%] lg:shrink-0" style="visibility: hidden;">
          <img
            src="/profile-about.jpg"
            alt="Markson Rebelo Marcolino"
            class="w-full object-cover object-top"
            style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); aspect-ratio: 4/5;"
          />
          <p style="font-family: Inter, sans-serif; font-size: 1rem; color: #888; line-height: 1.8; margin-top: 28px;">
            {{ t('about.bio') }}
          </p>
        </div>

        <!-- Right column -->
        <div data-reveal style="visibility: hidden;">
          <!-- Currently building -->
          <p style="font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: #444; margin-bottom: 16px;">
            {{ t('about.currentlyBuilding') }}
          </p>

          <div>
            <component
              v-for="proj in projects"
              :key="proj.name"
              :is="proj.url ? 'a' : 'div'"
              :href="proj.url"
              :target="proj.url ? '_blank' : undefined"
              rel="noopener"
              class="flex items-center justify-between group transition-colors duration-200"
              :class="proj.url ? 'cursor-pointer' : 'cursor-default'"
              style="padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); text-decoration: none;"
            >
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="inline-block w-1.5 h-1.5 rounded-full" style="background: #22c55e;" />
                  <span style="font-family: Inter, sans-serif; font-size: 0.9rem; color: #f0f0f0;">{{ proj.name }}</span>
                </div>
                <span style="font-family: Inter, sans-serif; font-size: 0.8rem; color: #888; margin-left: 14px;">{{ t(`about.projects.${proj.descKey}`) }}</span>
              </div>
              <ExternalLink v-if="proj.url" :size="14" class="shrink-0 transition-colors duration-200" style="color: #444;" />
            </component>
          </div>

          <!-- Languages -->
          <p style="font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: #444; margin-top: 40px; margin-bottom: 16px;">
            {{ t('about.languages') }}
          </p>

          <div>
            <div
              v-for="lang in languages"
              :key="lang.key"
              class="flex items-center justify-between"
              style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"
            >
              <span class="flex items-center gap-2">
                <span style="font-size: 1rem;">{{ lang.flag }}</span>
                <span style="font-family: Inter, sans-serif; font-size: 0.9rem; color: #f0f0f0;">{{ t(`about.langList.${lang.key}`) }}</span>
              </span>
              <span style="font-family: Inter, sans-serif; font-size: 0.8rem; color: #888;">{{ t(`about.levels.${lang.levelKey}`) }}</span>
            </div>
          </div>

          <!-- Education -->
          <p style="font-family: Inter, sans-serif; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.12em; color: #444; margin-top: 40px; margin-bottom: 16px;">
            {{ t('about.education') }}
          </p>

          <div>
            <div
              v-for="edu in education"
              :key="edu.degreeKey"
              style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);"
            >
              <div style="font-family: Inter, sans-serif; font-size: 0.9rem; color: #f0f0f0;">{{ t(`about.degrees.${edu.degreeKey}`) }}</div>
              <div style="font-family: Inter, sans-serif; font-size: 0.8rem; color: #888;">{{ edu.school }}, {{ edu.years }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
