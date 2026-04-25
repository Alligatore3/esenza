<script setup lang="ts">
const { t } = useI18n()

const items = [
  { icon: 'nutrition', titleKey: 'howItWorks.trust.item1Title', titleJaKey: 'howItWorks.trust.item1TitleJa' },
  { icon: 'public', titleKey: 'howItWorks.trust.item2Title', titleJaKey: 'howItWorks.trust.item2TitleJa' },
  { icon: 'recycling', titleKey: 'howItWorks.trust.item3Title', titleJaKey: 'howItWorks.trust.item3TitleJa' },
]
</script>

<template>
  <section class="w-full bg-white dark:bg-surface-dark py-12 px-4 md:px-10">
    <div class="max-w-wide mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in items"
        :key="item.icon"
        class="flex flex-col items-center text-center p-6 rounded-2xl bg-background-light dark:bg-dark-card border border-border-light dark:border-white/5"
      >
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-primary text-[24px]">{{ item.icon }}</span>
        </div>
        <p class="font-semibold text-text-main dark:text-white text-sm">{{ t(item.titleKey) }}</p>
        <p class="text-xs text-text-muted dark:text-white/50 mt-0.5">{{ t(item.titleJaKey) }}</p>
      </div>
    </div>
  </section>
</template>
