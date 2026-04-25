<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const open = ref(false)

const available = computed(() =>
  (locales.value as { code: string; name: string }[]).filter((l) => l.code !== locale.value)
)
const current = computed(() =>
  (locales.value as { code: string; name: string }[]).find((l) => l.code === locale.value)
)

function toggle() { open.value = !open.value }
async function pick(code: string) {
  open.value = false
  await setLocale(code as 'en' | 'ja')
}

onMounted(() => {
  const onClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('[data-lang-switcher]')) open.value = false
  }
  document.addEventListener('click', onClick)
  onUnmounted(() => document.removeEventListener('click', onClick))
})
</script>

<template>
  <ClientOnly>
    <div data-lang-switcher class="relative">
      <button
        class="flex items-center gap-1 px-2 py-2 rounded-lg text-sm font-medium text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors"
        :aria-label="`Current language: ${current?.name}`"
        @click="toggle"
      >
        <span class="material-symbols-outlined text-[20px]">language</span>
        <span class="text-xs uppercase font-semibold">{{ locale }}</span>
      </button>

      <Transition
        enter-active-class="transition-all duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="absolute top-full right-0 mt-1 min-w-[140px] bg-white dark:bg-surface-dark border border-border-light dark:border-white/10 rounded-xl shadow-lg overflow-hidden"
        >
          <button
            v-for="l in available"
            :key="l.code"
            class="w-full text-left px-4 py-2.5 text-sm text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
            @click="pick(l.code)"
          >
            {{ l.name }}
          </button>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>
