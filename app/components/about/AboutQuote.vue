<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="w-full bg-background-dark py-16 md:py-24 px-4 md:px-10">
    <div class="max-w-2xl mx-auto text-center">
      <span class="material-symbols-outlined text-primary text-[48px] mb-6 block">format_quote</span>
      <blockquote class="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8 italic">
        "{{ t('about.quote.text') }}"
      </blockquote>
      <div class="w-12 h-px bg-white/20 mx-auto mb-6"></div>
      <p class="font-semibold text-white">{{ t('about.quote.author') }}</p>
      <p class="text-sm text-white/50 mt-1">{{ t('about.quote.role') }}</p>
    </div>
  </section>
</template>
