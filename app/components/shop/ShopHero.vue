<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full relative min-h-[360px] flex items-end overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqq7jfbg8RG0U85tVEjcu8EyQ43KXUnM0zqifg_F9vk9kKmy1k4AWY48oU3wk6eTxTz0LaczwexC4n9RSPjt_prjD-LDzx4AJGxEC4H5CPwuVSGRgm8pl94TmVoXfCA7q1s-UWbNY_QOq354yxHhajN1jv87eawpGm2nA-uXKwnHss8JiF2YCgUFTL5lHcfcX4f96uRHgS1-wzbXaB82a5zngeFy65pvTAcMypKo4a79uJUqhx9VUs5QleHZcREMpkugqCbghSZ1g')"
    ></div>
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
