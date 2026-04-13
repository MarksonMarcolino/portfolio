<script setup>
import { useI18n } from 'vue-i18n'
import { Briefcase, BookOpen, X } from 'lucide-vue-next'
import HeroSection from '../components/HeroSection.vue'
import TechStackMap from '../components/TechStackMap.vue'
import TimelineEntry from '../components/TimelineEntry.vue'
import PublicationCard from '../components/PublicationCard.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
import { useFilters } from '../composables/useFilters.js'
import { publications } from '../data/publications.js'

const { t } = useI18n()
const { activeFilter, activeFilterType, clearFilter, matchesFilter, isFiltering, filteredTimeline } = useFilters()
</script>

<template>
  <main>
    <HeroSection />
    <TechStackMap />

    <!-- Timeline -->
    <section id="timeline" class="relative z-10 py-20 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-2">
          <div>
            <div class="section-header">
              <Briefcase :size="22" class="text-accent" />
              <span class="title">{{ t('timeline.title') }}</span>
            </div>
            <div class="section-underline ml-8" />
          </div>

          <button
            v-if="isFiltering"
            @click="clearFilter"
            class="flex items-center gap-1.5 text-xs text-white px-3 py-1 rounded-full cursor-pointer transition-all hover:scale-[1.02]"
            :style="activeFilterType === 'stack'
              ? 'background: linear-gradient(135deg, #00d2ff, #7b2ff7);'
              : 'background: linear-gradient(135deg, #f59e0b, #ef4444);'"
          >
            {{ t('timeline.filtering') }}: {{ activeFilter }}
            <X :size="12" />
          </button>
        </div>

        <p class="text-text-secondary text-sm mb-12 ml-8">{{ t('timeline.subtitle') }}</p>

        <div class="relative">
          <div class="absolute left-[6px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 rounded-full" style="background: linear-gradient(to bottom, #00d2ff, #7b2ff7);" />

          <div class="space-y-8">
            <div
              v-for="(entry, i) in filteredTimeline"
              :key="entry.id"
              class="transition-all duration-200"
              :class="{ dimmed: isFiltering && !matchesFilter(entry) }"
            >
              <TimelineEntry :entry="entry" :index="i" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Publications -->
    <section id="publications" class="relative z-10 py-20 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="mb-2">
          <div class="section-header">
            <BookOpen :size="22" class="text-accent" />
            <span class="title">{{ t('publications.title') }}</span>
          </div>
          <div class="section-underline ml-8" />
        </div>
        <p class="text-text-secondary text-sm mb-10 ml-8">{{ t('publications.subtitle') }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div
            v-for="pub in publications"
            :key="pub.id"
            class="transition-all duration-200 flex"
            :class="{ dimmed: isFiltering && !matchesFilter(pub) }"
          >
            <PublicationCard :pub="pub" class="flex-1" />
          </div>
        </div>
      </div>
    </section>

    <AboutSection />
    <ContactSection />
  </main>
</template>
