<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { X } from 'lucide-vue-next'
import HeroSection from '../components/HeroSection.vue'
import TechStackMap from '../components/TechStackMap.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import PublicationCard from '../components/PublicationCard.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
import TimelineLanes from '../components/TimelineLanes.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { useFilters } from '../composables/useFilters.js'
import { publications } from '../data/publications.js'

const { t } = useI18n()
const { activeFilter, activeFilterType, clearFilter, matchesFilter, isFiltering, filteredTimeline } = useFilters()

const pubSectionRef = ref(null)
useScrollReveal(pubSectionRef, '[data-reveal-pub]', { y: 20, stagger: 0.06 })
</script>

<template>
  <main>
    <HeroSection />

    <!-- Timeline -->
    <section id="timeline" class="relative z-10" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 80px;">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between">
          <SectionHeader :title="t('timeline.title')" :subtitle="t('timeline.subtitle')" />

          <button
            v-if="isFiltering"
            @click="clearFilter"
            class="flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
            style="font-size: var(--text-xs); color: var(--text-primary); background: var(--bg-2); border: 1px solid var(--border-default); border-radius: 4px; padding: 4px 12px;"
          >
            {{ t('timeline.filtering') }}: {{ activeFilter }}
            <X :size="12" />
          </button>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4" style="margin-top: 32px;">
        <TimelineLanes :entries="filteredTimeline" />
      </div>
    </section>

    <!-- Publications -->
    <section id="publications" ref="pubSectionRef" class="relative z-10 px-4" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 80px;">
      <div class="max-w-6xl mx-auto">
        <SectionHeader :title="t('publications.title')" :subtitle="t('publications.subtitle')" style="margin-bottom: 40px;" />

        <div>
          <div
            v-for="pub in publications"
            :key="pub.id"
            data-reveal-pub
            class="transition-all duration-200"
            :class="{ dimmed: isFiltering && !matchesFilter(pub) }"
            style="visibility: hidden;"
          >
            <PublicationCard :pub="pub" />
          </div>
        </div>
      </div>
    </section>

    <ProjectsSection />
    <TechStackMap />
    <AboutSection />
    <ContactSection />
  </main>
</template>
