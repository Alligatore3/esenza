<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="w-full relative overflow-hidden bg-background-cream dark:bg-background-dark">
    <div class="max-w-wide mx-auto px-4 md:px-10 lg:px-16 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      <!-- Text -->
      <div class="flex-1 flex flex-col items-start gap-5 z-10">
        <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          <span class="material-symbols-outlined text-[14px]">eco</span>
          {{ t('home.hero.badge') }}
        </span>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main dark:text-white leading-tight tracking-tight">
          {{ t('home.hero.title') }}
        </h1>

        <p class="text-base text-text-muted dark:text-white/60 font-medium">
          {{ t('home.hero.subtitle') }}
        </p>

        <p class="text-text-muted dark:text-white/60 text-sm leading-relaxed max-w-md">
          {{ t('home.hero.body') }}
        </p>

        <div class="flex flex-wrap items-center gap-3 mt-2">
          <NuxtLink
            :to="localePath('/shop')"
            class="px-6 py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold text-sm rounded-xl transition-colors duration-200"
          >
            {{ t('home.hero.cta') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/about')"
            class="px-6 py-3 border-2 border-text-main/20 dark:border-white/20 text-text-main dark:text-white font-bold text-sm rounded-xl hover:border-primary hover:text-primary transition-colors duration-200"
          >
            {{ t('home.hero.ctaSecondary') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Image -->
      <div class="flex-1 relative w-full max-w-lg">
        <div class="rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[4/5] shadow-2xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1TNmwvwX0TZz8NbORZvdYpdxnTux3gc0L9AL-yqT2FR7Xm9pvoMb-U43Ty_GU89Q53RoAtUYaisV6i7XJTCT1DoMAHHx4BL50pBOJ4DTBn4usWaBvh8C6Wfyo9AhpIfIhiM-VTZadUgDw35KW3BePUkyTNM5sHeJmKKvBI5e0NH5gA_0qiaBhNEeq543M6P7d6I2HcOfyuchbGzSiWXu_8ItWqoi_OpWnzievyyu3f8rguq7hTUmc_9mVX8-8NfZgvCZ8LpNgwjs"
            alt="Glass jar with organic mix on a wooden table"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Floating badge -->
        <div
          class="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-white dark:bg-dark-nav p-4 rounded-xl shadow-xl border border-border-light dark:border-white/5 flex items-center gap-3 animate-bounce"
          style="animation-duration: 3s"
        >
          <div class="bg-primary/20 p-2 rounded-full text-primary">
            <span class="material-symbols-outlined">eco</span>
          </div>
          <div>
            <p class="text-sm font-bold text-text-main dark:text-white">{{ t('home.hero.floatingBadgeLine1') }}</p>
            <p class="text-xs text-text-muted">{{ t('home.hero.floatingBadgeLine2') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
