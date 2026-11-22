<script setup>
import { useI18n } from 'vue-i18n'
import { Github, Download } from 'lucide-vue-next'
import { useCV } from '../composables/useCV.js'
import StageGraph from './StageGraph.vue'

const { t } = useI18n()
const { downloadCV } = useCV()
</script>

<template>
  <section id="hero" class="hero">
    <p class="eyebrow">{{ t('hero.location') }} · {{ t('hero.years') }} · {{ t('hero.languagesCount') }}</p>

    <div class="name-row">
      <h1 class="name">Markson Rebelo Marcolino</h1>
      <img class="portrait" src="/profile-hero.jpg" alt="Markson Rebelo Marcolino" />
    </div>

    <ul class="roles">
      <li class="role engineering">
        <span class="role-dot" aria-hidden="true" />
        <span><strong>{{ t('hero.roleEngineering.title') }}</strong> {{ t('hero.roleEngineering.place') }}</span>
      </li>
      <li class="role research">
        <span class="role-dot" aria-hidden="true" />
        <span><strong>{{ t('hero.roleResearch.title') }}</strong> {{ t('hero.roleResearch.place') }}</span>
      </li>
    </ul>

    <p class="lede">{{ t('hero.lede') }}</p>

    <div class="ctas">
      <button type="button" class="cta primary" @click="downloadCV">
        <Download :size="16" aria-hidden="true" />
        {{ t('hero.download_cv') }}
      </button>
      <a class="cta" href="https://github.com/MarksonMarcolino" target="_blank" rel="noopener">
        <Github :size="16" aria-hidden="true" />
        {{ t('common.github') }}
      </a>
      <a class="cta" href="https://orcid.org/0009-0006-2494-1595" target="_blank" rel="noopener">
        {{ t('common.orcid') }}
      </a>
    </div>

    <StageGraph />
  </section>
</template>

<style scoped>
.hero {
  max-width: 1320px;
  margin: 0 auto;
  padding: clamp(96px, 12vw, 140px) clamp(20px, 6vw, 120px) clamp(48px, 6vw, 80px);
  background: var(--bg-0);
}

.eyebrow {
  margin: 0 0 20px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-eyebrow);
  color: var(--text-muted);
}

.name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px 32px;
}

.name {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--display-xl);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  overflow-wrap: anywhere;
}

.portrait {
  width: clamp(72px, 12vw, 144px);
  height: clamp(72px, 12vw, 144px);
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  object-fit: cover;
  object-position: top;
}

.roles {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.role {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.role strong {
  font-weight: 600;
  color: var(--text-primary);
}

.role-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bronze);
}

.role.research .role-dot {
  background: var(--research);
}

.lede {
  max-width: 62ch;
  margin: 24px 0 0;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--text-muted);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 32px 0 56px;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 24px;
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.cta:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.cta.primary {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--bg-0);
}

.cta.primary:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-0);
}

@media (max-width: 479px) {
  .ctas {
    flex-direction: column;
  }
}
</style>
