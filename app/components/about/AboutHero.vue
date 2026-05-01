<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full relative min-h-[480px] flex items-end overflow-hidden">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/images/about-hero.jpeg')"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent"></div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-wide mx-auto px-4 md:px-10 lg:px-16 pb-16 pt-32">
      <span class="inline-block text-xs font-bold uppercase tracking-widest text-white/60 border border-white/30 px-3 py-1.5 rounded-full mb-5">
        {{ t('about.hero.badge') }}
      </span>
      <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
        {{ t('about.hero.title') }}
      </h1>
      <p class="text-lg text-white/70 font-medium mb-4">{{ t('about.hero.subtitle') }}</p>
      <p class="text-white/60 text-sm max-w-xl leading-relaxed">{{ t('about.hero.body') }}</p>
    </div>
  </section>
</template>
