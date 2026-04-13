<script setup>
import { useI18n } from 'vue-i18n'
import { Globe, ExternalLink, User } from 'lucide-vue-next'

const { t } = useI18n()

const languages = [
  { flag: '\u{1F1E7}\u{1F1F7}', key: 'portuguese', levelKey: 'native' },
  { flag: '\u{1F1EA}\u{1F1F8}', key: 'spanish', levelKey: 'advanced' },
  { flag: '\u{1F1EC}\u{1F1E7}', key: 'english', levelKey: 'advanced' },
  { flag: '\u{1F1EB}\u{1F1F7}', key: 'french', levelKey: 'intermediate' },
]

const building = [
  { name: 'Serena', descKey: 'serena', url: 'https://serena.ia.br/', icon: 'Globe' },
  { name: 'nanoncore', descKey: 'nanoncore', url: 'https://nanoncore.com/', icon: 'Globe' },
  { name: 'voz', descKey: 'voz', url: 'https://github.com/MarksonMarcolino/voz', icon: 'ExternalLink' },
]

const linkIcons = { Globe, ExternalLink }
</script>

<template>
  <section id="about" class="relative z-10 py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="mb-2">
        <div class="section-header">
          <User :size="22" class="text-accent" />
          <span class="title">{{ t('about.title') }}</span>
        </div>
        <div class="section-underline ml-8" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <p class="text-text-secondary leading-relaxed">{{ t('about.bio') }}</p>
        </div>

        <div class="space-y-8">
          <div>
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

          <div>
            <h3 class="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">{{ t('about.currentlyBuilding') }}</h3>
            <div class="space-y-2">
              <a
                v-for="proj in building"
                :key="proj.name"
                :href="proj.url"
                :target="proj.url ? '_blank' : undefined"
                rel="noopener"
                class="card-static !p-3 flex items-center justify-between transition-all hover:bg-surface-elevated"
                :class="{ 'cursor-pointer': proj.url, 'cursor-default': !proj.url }"
              >
                <div>
                  <div class="text-sm text-accent font-mono font-medium">{{ proj.name }}</div>
                  <div class="text-xs text-text-muted">{{ t(`about.projects.${proj.descKey}`) }}</div>
                </div>
                <component v-if="proj.icon" :is="linkIcons[proj.icon]" :size="14" class="text-text-muted" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
