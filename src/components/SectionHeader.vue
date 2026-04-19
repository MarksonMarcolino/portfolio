<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-title {
  font-family: var(--font-display);
  font-size: var(--display-lg);
  color: var(--text-primary);
  line-height: var(--leading-tight);
  font-weight: 400;
}

.section-subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-eyebrow);
  color: var(--text-secondary);
  margin-top: 4px;
}
</style>
