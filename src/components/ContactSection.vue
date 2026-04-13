<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import { Mail, Github, Linkedin, ExternalLink, Send } from 'lucide-vue-next'
import WordReveal from './WordReveal.vue'

const { t } = useI18n()
const sectionRef = ref(null)

useScrollReveal(sectionRef, '.card', { y: 20, stagger: 0.08 })

const contacts = [
  { label: 'Email', href: 'mailto:markson.marcolino@gmail.com', display: 'markson.marcolino@gmail.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/MarksonMarcolino', display: 'github.com/MarksonMarcolino', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/marksonmarcolino', display: 'linkedin.com/in/marksonmarcolino', icon: Linkedin },
]
</script>

<template>
  <section id="contact" ref="sectionRef" class="relative z-10 py-20 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <div class="flex justify-center mb-2">
        <div>
          <div class="section-header">
            <Send :size="22" class="text-accent" />
            <WordReveal :text="t('contact.title')" />
          </div>
          <div class="section-underline mx-auto" />
        </div>
      </div>

      <p class="text-text-secondary text-sm mb-10 mt-4">{{ t('contact.subtitle') }}</p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a
          v-for="c in contacts"
          :key="c.label"
          :href="c.href"
          target="_blank"
          rel="noopener"
          class="card flex items-center gap-3 cursor-pointer group !p-4"
          style="visibility: hidden;"
        >
          <component :is="c.icon" :size="20" class="text-accent shrink-0" />
          <div class="text-left">
            <div class="text-xs text-text-muted font-mono">{{ c.label }}</div>
            <div class="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{{ c.display }}</div>
          </div>
          <ExternalLink :size="14" class="text-text-muted ml-auto shrink-0 contact-arrow" />
        </a>
      </div>

      <p class="mt-16 text-xs text-text-muted font-mono">{{ t('contact.footer') }}</p>
    </div>
  </section>
</template>
