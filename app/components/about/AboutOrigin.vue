<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full bg-background-light dark:bg-background-dark py-16 md:py-24 px-4 md:px-10 relative overflow-hidden">
    <!-- Dot pattern decoration -->
    <div
class="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none"
         style="background-image: radial-gradient(circle, #6c8863 1px, transparent 1px); background-size: 28px 28px;"></div>

    <div class="relative z-10 max-w-2xl mx-auto text-center">
      <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <span class="material-symbols-outlined text-primary text-[28px]">public</span>
      </div>

      <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mb-1">
        {{ t('about.origin.title') }}
      </h2>
      <p class="text-text-muted dark:text-white/50 text-base mb-6">{{ t('about.origin.titleJa') }}</p>

      <p class="text-text-muted dark:text-white/70 text-sm leading-relaxed mb-8">
        {{ t('about.origin.body') }}
      </p>
    </div>
  </section>
</template>
