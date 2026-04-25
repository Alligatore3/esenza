<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full relative min-h-[480px] flex items-end overflow-hidden">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3ziHy-OG3MrV3w__gyx27dBIvquq9pRckq0ulWZnkQtwrv0YKyxydtWOHTjirtkSHQugrQshvkfKHrkqugYi3M847_8lUeNVP2j8vmhsKjEtnitKyt3xnX8XqMePev7DBHxI4pxJ2dgsg13DcWuHcC88iBDf_bJK7Niv1-ALCfbMfkJeUO6A1Uq272m22ngbA9FCRbHSbMnI-ICoZVAj4_XJIYkLoqG2IPpvno9nGH_exesTLtHT_cyZwDDJurUdBpDZGcqEymak')"
    ></div>
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
