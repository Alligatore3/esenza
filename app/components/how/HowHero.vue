<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="w-full relative min-h-[420px] flex items-end overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuABkr1hP9BBh2Yk18RT6iqHZzZhbQIvQ9sq9rnsPao_6lgIFN39WAm6XJ1vhovGSzyoe8Hl1NXYBQN7TX-vcX6qnQmUXNPZPKnObftmtBrarL90YgoBRCvJIepDxdOeDKC_z70f1tCYxSUeY2DA4DZX80wVfg8ZZKO84GrexGbaxQVlqLQIEeUWyI0k2wQ_UDBROCowpF7dOJ_ZTMd5P3g88OfuDRYrQv8-IKrKc1msQ3DGATjMp3pdW-i4nkUyas2k8OISd55qWgE')"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent"></div>

    <div class="relative z-10 w-full max-w-wide mx-auto px-4 md:px-10 lg:px-16 pb-16 pt-32">
      <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3">
        {{ t('howItWorks.hero.title') }}
      </h1>
      <p class="text-xl text-white/70 font-medium mb-4">{{ t('howItWorks.hero.titleJa') }}</p>
      <p class="text-white/60 text-sm mb-6 max-w-xl">{{ t('howItWorks.hero.subtitle') }}</p>
      <NuxtLink
        :to="localePath('/shop')"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl transition-colors duration-200"
      >
        {{ t('howItWorks.hero.cta') }}
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </NuxtLink>
    </div>
  </section>
</template>
