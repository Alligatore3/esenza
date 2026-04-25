<script setup lang="ts">
const { t } = useI18n()

const cards = [
  { icon: 'eco', titleKey: 'about.philosophy.card1Title', titleJaKey: 'about.philosophy.card1TitleJa', bodyKey: 'about.philosophy.card1Body' },
  { icon: 'spa', titleKey: 'about.philosophy.card2Title', titleJaKey: 'about.philosophy.card2TitleJa', bodyKey: 'about.philosophy.card2Body' },
  { icon: 'favorite', titleKey: 'about.philosophy.card3Title', titleJaKey: 'about.philosophy.card3TitleJa', bodyKey: 'about.philosophy.card3Body' },
]
</script>

<template>
  <section class="w-full bg-white dark:bg-surface-dark py-16 md:py-24 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-1">
          {{ t('about.philosophy.title') }}
        </h2>
        <p class="text-text-muted dark:text-white/50 text-base">{{ t('about.philosophy.titleJa') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="card in cards"
          :key="card.icon"
          class="flex flex-col items-center text-center p-8 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5"
        >
          <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
            <span class="material-symbols-outlined text-primary text-[28px]">{{ card.icon }}</span>
          </div>
          <h3 class="font-bold text-text-main dark:text-white mb-0.5">{{ t(card.titleKey) }}</h3>
          <p class="text-sm text-text-muted dark:text-white/50 mb-3">{{ t(card.titleJaKey) }}</p>
          <p class="text-sm text-text-muted dark:text-white/60 leading-relaxed">{{ t(card.bodyKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
