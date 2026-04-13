<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { User } from 'lucide-vue-next'
import WordReveal from './WordReveal.vue'

const { t } = useI18n()
const sectionRef = ref(null)

useScrollReveal(sectionRef, '[data-reveal]', { y: 30, stagger: 0.12 })

const languages = [
  { flag: '\u{1F1E7}\u{1F1F7}', key: 'portuguese', levelKey: 'native' },
  { flag: '\u{1F1EA}\u{1F1F8}', key: 'spanish', levelKey: 'advanced' },
  { flag: '\u{1F1EC}\u{1F1E7}', key: 'english', levelKey: 'advanced' },
  { flag: '\u{1F1EB}\u{1F1F7}', key: 'french', levelKey: 'intermediate' },
]

</script>

<template>
  <section id="about" ref="sectionRef" class="relative z-10 py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="mb-2">
        <div class="section-header">
          <User :size="22" class="text-accent" />
          <WordReveal :text="t('about.title')" />
        </div>
        <div class="section-underline ml-8" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div data-reveal style="visibility: hidden;">
          <div class="flex justify-center lg:justify-start mb-6">
            <div class="photo-circle w-[120px] h-[120px]" style="box-shadow: 0 0 30px rgba(0, 210, 255, 0.08);">
              <img
                src="/profile.jpg"
                alt="Markson Rebelo Marcolino"
                class="w-full h-full object-cover relative z-0"
                style="object-position: 50% 25%;"
              />
            </div>
          </div>
          <p class="text-text-secondary leading-relaxed">{{ t('about.bio') }}</p>
        </div>

        <div class="space-y-8">
          <div data-reveal style="visibility: hidden;">
            <h3 class="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">{{ t('about.languages') }}</h3>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="lang in languages" :key="lang.key" class="card-static !p-3 flex items-center gap-2">
                <span class="text-lg">{{ lang.flag }}</span>
                <div>
                  <div class="text-sm text-text-primary">{{ t(`about.langList.${lang.key}`) }}</div>
                  <div class="text-xs text-text-muted">{{ t(`about.levels.${lang.levelKey}`) }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
