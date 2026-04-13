<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import gsap from 'gsap'
import {
  Briefcase, BookOpen, X,
  Briefcase as BriefcaseIcon, Code2, GraduationCap, Award
} from 'lucide-vue-next'
import HeroSection from '../components/HeroSection.vue'
import TechStackMap from '../components/TechStackMap.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import TimelineEntry from '../components/TimelineEntry.vue'
import PublicationCard from '../components/PublicationCard.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
import WordReveal from '../components/WordReveal.vue'
import { useFilters } from '../composables/useFilters.js'
import { publications } from '../data/publications.js'

const { t } = useI18n()
const { activeFilter, activeFilterType, clearFilter, matchesFilter, isFiltering, filteredTimeline } = useFilters()

const pubSectionRef = ref(null)
useScrollReveal(pubSectionRef, '[data-reveal-pub]', { y: 20, stagger: 0.06 })

// Timeline type icons for dots
const typeIcons = { work: BriefcaseIcon, project: Code2, education: GraduationCap, certification: Award }

// --- Horizontal timeline drag ---
const timelineTrack = ref(null)
let isDragging = false
let startX = 0
let scrollLeft = 0
let lastX = 0
let lastTime = 0
let velocity = 0

function onPointerDown(e) {
  if (!timelineTrack.value) return
  isDragging = true
  timelineTrack.value.style.cursor = 'grabbing'
  startX = e.clientX
  scrollLeft = timelineTrack.value.scrollLeft
  lastX = e.clientX
  lastTime = Date.now()
  velocity = 0
}

function onPointerMove(e) {
  if (!isDragging || !timelineTrack.value) return
  e.preventDefault()
  const now = Date.now()
  const dt = now - lastTime
  if (dt > 0) velocity = (e.clientX - lastX) / dt
  lastX = e.clientX
  lastTime = now
  const dx = e.clientX - startX
  timelineTrack.value.scrollLeft = scrollLeft - dx
}

function onPointerUp() {
  if (!isDragging || !timelineTrack.value) return
  isDragging = false
  timelineTrack.value.style.cursor = 'grab'
  gsap.to(timelineTrack.value, {
    scrollLeft: timelineTrack.value.scrollLeft - velocity * 500,
    duration: 0.8,
    ease: 'power3.out',
  })
}
</script>

<template>
  <main>
    <HeroSection />
    <TechStackMap />
    <ProjectsSection />

    <!-- Timeline (horizontal) -->
    <section id="timeline" class="relative z-10 py-20">
      <div class="max-w-6xl mx-auto px-4 mb-2">
        <div class="flex items-center justify-between">
          <div>
            <div class="section-header">
              <Briefcase :size="22" class="text-accent" />
              <WordReveal :text="t('timeline.title')" />
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
        <p class="text-text-secondary text-sm mt-4 ml-8">{{ t('timeline.subtitle') }}</p>
      </div>

      <!-- Horizontal track with edge fades -->
      <div class="timeline-edge-fade mt-10">
        <div
          ref="timelineTrack"
          class="timeline-track overflow-x-auto px-8 pb-6 cursor-grab"
          data-lenis-prevent
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
          style="scroll-snap-type: x proximity;"
        >
          <!-- Inner wrapper: holds line + cards, width stretches to content -->
          <div class="relative inline-flex gap-5 pt-10">
            <!-- Horizontal gradient line spanning full content width -->
            <div class="absolute left-0 right-0 top-0 h-0.5 rounded-full pointer-events-none" style="background: linear-gradient(to right, #00d2ff, #7b2ff7);" />

            <div
              v-for="entry in filteredTimeline"
              :key="entry.id"
              class="flex-shrink-0 w-[280px] md:w-[340px] relative transition-all duration-300 self-stretch"
              :class="{ dimmed: isFiltering && !matchesFilter(entry) }"
              style="scroll-snap-align: start;"
            >
              <!-- Dot on horizontal line -->
              <div class="absolute left-6 -top-[24px] z-10">
                <div class="relative w-[14px] h-[14px] rounded-full flex items-center justify-center" style="background: #080b12;">
                  <div class="absolute inset-0 rounded-full p-[1px]" style="background: linear-gradient(135deg, #00d2ff, #7b2ff7); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;" />
                  <component :is="typeIcons[entry.type]" :size="8" class="text-accent relative z-10" />
                </div>
              </div>

              <TimelineEntry :entry="entry" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Publications -->
    <section id="publications" ref="pubSectionRef" class="relative z-10 py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="mb-2">
          <div class="section-header">
            <BookOpen :size="22" class="text-accent" />
            <WordReveal :text="t('publications.title')" />
          </div>
          <div class="section-underline ml-8" />
        </div>
        <p class="text-text-secondary text-sm mb-10 ml-8">{{ t('publications.subtitle') }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <div
            v-for="pub in publications"
            :key="pub.id"
            data-reveal-pub
            class="transition-all duration-200 flex"
            :class="{ dimmed: isFiltering && !matchesFilter(pub) }"
            style="visibility: hidden;"
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
