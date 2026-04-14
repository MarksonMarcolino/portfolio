<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import gsap from 'gsap'
import { X, ChevronRight } from 'lucide-vue-next'
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
    <section id="timeline" class="relative z-10" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 80px;">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); color: #f0f0f0; line-height: 1; font-weight: 400;">
              {{ t('timeline.title') }}
            </h2>
            <p style="font-family: Inter, sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-top: 4px;">
              {{ t('timeline.subtitle') }}
            </p>
          </div>

          <button
            v-if="isFiltering"
            @click="clearFilter"
            class="flex items-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
            style="font-size: 0.75rem; color: #f0f0f0; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 4px 12px;"
          >
            {{ t('timeline.filtering') }}: {{ activeFilter }}
            <X :size="12" />
          </button>
        </div>
      </div>

      <!-- Horizontal track with edge fades -->
      <div class="timeline-edge-fade" style="margin-top: 32px;">
        <div
          ref="timelineTrack"
          class="timeline-track overflow-x-auto px-8 pb-6 cursor-grab"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointerleave="onPointerUp"
          style="scroll-snap-type: x proximity;"
        >
          <!-- Inner wrapper -->
          <div class="relative inline-flex gap-5 pt-8">
            <!-- Horizontal connector line -->
            <div class="absolute left-0 right-0 top-0 pointer-events-none" style="height: 1px; background: rgba(255,255,255,0.08);" />

            <div
              v-for="entry in filteredTimeline"
              :key="entry.id"
              class="flex-shrink-0 relative transition-all duration-300 timeline-card-wrapper"
              :class="{ dimmed: isFiltering && !matchesFilter(entry) }"
              style="scroll-snap-align: start;"
            >
              <!-- Dot on horizontal line -->
              <div class="absolute left-6 z-10" style="top: -20px;">
                <div class="rounded-full" style="width: 8px; height: 8px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.15);" />
              </div>

              <TimelineEntry :entry="entry" />
            </div>
          </div>
        </div>
        <!-- Mobile scroll hint -->
        <div class="scroll-hint flex items-center justify-center gap-1 mt-3 md:hidden" style="color: #444; font-size: 0.75rem; font-family: Inter, sans-serif;">
          Swipe <ChevronRight :size="14" />
        </div>
      </div>
    </section>

    <!-- Publications -->
    <section id="publications" ref="pubSectionRef" class="relative z-10 px-4" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 80px;">
      <div class="max-w-6xl mx-auto">
        <div style="margin-bottom: 40px;">
          <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem); color: #f0f0f0; line-height: 1; font-weight: 400;">
            {{ t('publications.title') }}
          </h2>
          <p style="font-family: Inter, sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #888; margin-top: 4px;">
            {{ t('publications.subtitle') }}
          </p>
        </div>

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

    <AboutSection />
    <ContactSection />
  </main>
</template>
