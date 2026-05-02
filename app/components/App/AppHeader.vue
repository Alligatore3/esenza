<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const mobileOpen = ref(false)
const cart = useCartStore()

const navLinks = computed(() => [
  { key: 'nav.shop', path: '/shop' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.howItWorks', path: '/how-it-works' },
])

const isActive = (path: string) => route.path === localePath(path) || route.path.startsWith(localePath(path) + '/')
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-soft/20 transition-colors duration-300"
    style="height: var(--header-height)"
  >
    <div class="flex items-center justify-between h-full px-4 md:px-10 lg:px-16 container mx-auto">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex-shrink-0" @click="mobileOpen = false">
        <AppLogo />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="localePath(link.path)"
          class="text-sm font-medium transition-colors duration-200 hover:text-primary"
          :class="isActive(link.path) ? 'text-primary' : 'text-text-main dark:text-white/80'"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </nav>

      <!-- Action buttons -->
      <div class="flex items-center gap-1">
        <!-- Dark mode toggle -->
        <AppColorModeToggle />

        <!-- Search -->
        <button
          class="p-2 rounded-lg text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors"
          :aria-label="t('nav.search')"
        >
          <span class="material-symbols-outlined text-[22px]">search</span>
        </button>

        <!-- Cart -->
        <NuxtLink
          :to="localePath('/cart')"
          class="p-2 rounded-lg text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors relative"
          :aria-label="t('nav.cart')"
        >
          <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
          <span
            v-if="cart.count > 0"
            class="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-primary text-background-dark text-[10px] font-bold rounded-full leading-none"
          >{{ cart.count }}</span>
        </NuxtLink>

        <!-- User -->
        <button
          class="hidden md:flex p-2 rounded-lg text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors"
        >
          <span class="material-symbols-outlined text-[22px]">person</span>
        </button>

        <AppLanguageSwitcher />

        <!-- Hamburger -->
        <button
          class="md:hidden p-2 rounded-lg text-text-main dark:text-white/80 hover:bg-background-light dark:hover:bg-surface-dark transition-colors"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="material-symbols-outlined text-[22px]">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-background-dark border-b border-border-light dark:border-border-soft/20 shadow-lg"
      >
        <nav class="flex flex-col px-4 py-4 gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.key"
            :to="localePath(link.path)"
            class="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-background-light dark:hover:bg-surface-dark"
            :class="isActive(link.path) ? 'text-primary bg-background-light dark:bg-surface-dark' : 'text-text-main dark:text-white/80'"
            @click="mobileOpen = false"
          >
            {{ t(link.key) }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>
