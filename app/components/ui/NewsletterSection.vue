<script setup lang="ts">
const props = defineProps<{
  title?: string
  subtitle?: string
}>()
const { t } = useI18n()
const email = ref('')

const heading = computed(() => props.title ?? t('newsletter.title'))
const sub = computed(() => props.subtitle ?? t('newsletter.subtitle'))
</script>

<template>
  <section class="w-full bg-[#f1f4f0] dark:bg-[#0f160c] py-16 px-4 md:px-10">
    <div class="max-w-lg mx-auto text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-text-main dark:text-white mb-3">
        {{ heading }}
      </h2>
      <p class="text-text-muted dark:text-white/60 text-sm mb-6">
        {{ sub }}
      </p>
      <form class="flex gap-2 max-w-sm mx-auto" @submit.prevent>
        <input
          v-model="email"
          type="email"
          :placeholder="t('newsletter.placeholder')"
          class="flex-1 min-w-0 bg-white dark:bg-surface-dark border border-border-soft dark:border-white/10 rounded-xl px-4 py-3 text-sm text-text-main dark:text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <button
          type="submit"
          class="px-5 py-3 bg-primary hover:bg-primary-dark text-background-dark font-semibold text-sm rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          {{ t('newsletter.button') }}
        </button>
      </form>
    </div>
  </section>
</template>
