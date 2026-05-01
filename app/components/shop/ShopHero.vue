<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full relative min-h-[360px] flex items-end overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/images/shop.jpeg')"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent"></div>

    <div class="relative z-10 w-full max-w-wide mx-auto px-4 md:px-10 lg:px-16 pb-12 pt-28">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
        {{ t('shop.hero.title') }}
      </h1>
      <p class="text-lg text-white/70 font-medium mb-2">{{ t('shop.hero.titleJa') }}</p>
      <p class="text-white/60 text-sm max-w-lg">{{ t('shop.hero.subtitle') }}</p>
    </div>
  </section>
</template>
