<script setup>
import { useI18n } from 'vue-i18n'
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n()

const contacts = [
  { label: 'EMAIL', href: 'mailto:markson.marcolino@gmail.com', display: 'markson.marcolino@gmail.com', icon: Mail },
  { label: 'GITHUB', href: 'https://github.com/MarksonMarcolino', display: 'github.com/MarksonMarcolino', icon: Github },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/marksonmarcolino', display: 'linkedin.com/in/marksonmarcolino', icon: Linkedin },
]
</script>

<template>
  <section id="contact" class="relative z-10 px-4" style="padding-top: clamp(80px, 10vw, 120px); padding-bottom: 0;">
    <div class="max-w-4xl mx-auto">
      <!-- Title -->
      <div class="text-center" style="margin-bottom: 48px;">
        <div style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 7rem); line-height: 0.92; font-weight: 400;">
          <div style="color: #f0f0f0;">{{ t('contact.line1') }}</div>
          <div style="color: #00d2ff;">{{ t('contact.line2') }}</div>
        </div>
        <p style="font-family: Inter, sans-serif; font-size: 0.9rem; color: #888; margin-top: 16px;">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <!-- Contact rows -->
      <div style="padding-right: clamp(16px, 3vw, 40px);">
        <a
          v-for="(c, i) in contacts"
          :key="c.label"
          :href="c.href"
          target="_blank"
          rel="noopener"
          class="contact-row flex items-center justify-between cursor-pointer transition-all duration-200 group"
          :style="{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', borderTop: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', textDecoration: 'none' }"
        >
          <div class="flex items-center" style="gap: 16px;">
            <component :is="c.icon" :size="20" class="shrink-0 transition-colors duration-200" style="color: #888;" />
            <span class="transition-colors duration-200" style="font-family: Inter, sans-serif; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">{{ c.label }}</span>
            <span class="transition-colors duration-200" style="font-family: Inter, sans-serif; font-size: 1rem; color: #f0f0f0;">{{ c.display }}</span>
          </div>
          <ArrowRight :size="16" class="contact-arrow shrink-0 transition-all duration-200" style="color: #444;" />
        </a>
      </div>

      <!-- Footer -->
      <p class="text-center" style="padding: 32px 0;">
        <a
          href="https://github.com/MarksonMarcolino"
          target="_blank"
          rel="noopener"
          class="footer-link"
          style="font-family: Inter, sans-serif; font-size: 0.72rem; color: #3d3d3d; text-decoration: none; transition: color 0.2s ease;"
        >
          {{ t('contact.footer') }}
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact-row:hover span {
  color: #f0f0f0;
}
.contact-row:hover .contact-arrow {
  color: #00d2ff;
  transform: translateX(4px);
}
.footer-link:hover {
  color: #888 !important;
}
</style>
