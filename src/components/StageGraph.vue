<script setup>
import { useI18n } from 'vue-i18n'
import { stages } from '../data/stages.js'

const { t } = useI18n()
</script>

<template>
  <figure class="graph">
    <p class="graph-title">{{ t('graph.title') }}</p>
    <!-- Nodes sit where each kind of work happened; no edge or element may join one node's organisation to another's. -->
    <ol class="graph-nodes">
      <li
        v-for="(s, i) in stages"
        :key="s.id"
        class="node"
        :class="s.side"
        :style="{ '--i': i }"
      >
        <span class="node-tag">{{ s.n }} · {{ t(`stages.${s.id}.label`) }}</span>
        <span class="node-line">{{ t(`stages.${s.id}.line`) }}</span>
        <span class="node-where">{{ t(`stages.${s.id}.where`) }}</span>
      </li>
    </ol>
    <ul class="legend">
      <li class="legend-item engineering"><span class="legend-dot" aria-hidden="true" />{{ t('graph.legend.engineering') }}</li>
      <li class="legend-item research"><span class="legend-dot" aria-hidden="true" />{{ t('graph.legend.research') }}</li>
    </ul>
    <figcaption class="graph-caption">{{ t('graph.caption') }}</figcaption>
  </figure>
</template>

<style scoped>
.graph {
  margin: 0;
  padding: clamp(16px, 3vw, 28px);
  background: var(--bg-1);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
}

.graph-title {
  margin: 0 0 20px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
  color: var(--text-muted);
}

.graph-nodes {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.node {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 16px;
  background: var(--bg-0);
  border: 1.5px solid var(--edge);
  border-top: 4px solid var(--bronze);
  overflow-wrap: anywhere;
}

.node.research {
  border-top-color: var(--research);
}

.node:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -34px;
  width: 32px;
  height: 2px;
  background: var(--edge);
}

.node:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 50%;
  right: -41px;
  width: 0;
  height: 0;
  margin-top: -4px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid var(--edge);
  z-index: 1;
}

.node-tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--bronze);
}

.node.research .node-tag {
  color: var(--research);
}

.node-line {
  font-size: 15px;
  font-weight: 500;
  line-height: var(--leading-snug);
  color: var(--text-primary);
}

.node-where {
  font-size: 13px;
  line-height: var(--leading-normal);
  color: var(--text-muted);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bronze);
}

.legend-item.research .legend-dot {
  background: var(--research);
}

.graph-caption {
  margin-top: 12px;
  max-width: 70ch;
  font-size: 13px;
  line-height: var(--leading-normal);
  color: var(--text-muted);
}

@media (max-width: 899px) {
  .graph-nodes {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .node:not(:last-child)::after {
    top: auto;
    right: auto;
    bottom: -26px;
    left: 24px;
    width: 2px;
    height: 24px;
  }

  .node:not(:last-child)::before {
    top: auto;
    right: auto;
    bottom: -33px;
    left: 24px;
    margin: 0 0 0 -4px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid var(--edge);
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .node {
    animation: node-in 0.5s ease-out both;
    animation-delay: calc(var(--i) * 0.08s);
  }

  @keyframes node-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }
}
</style>
