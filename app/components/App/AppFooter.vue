<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const email = ref('')
</script>

<template>
  <footer class="w-full bg-background-dark text-white pt-16 pb-8">
    <div class="max-w-wide mx-auto px-4 md:px-10 lg:px-16">
      <!-- 4-column grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink :to="localePath('/')" class="inline-block mb-4">
            <AppLogo />
          </NuxtLink>
          <p class="text-white/60 text-sm leading-relaxed">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Shop links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
            {{ t('footer.shopTitle') }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="item in ['bestsellers', 'vegan', 'sweets', 'gifts']" :key="item">
              <NuxtLink
                :to="localePath('/shop')"
                class="text-white/70 hover:text-primary text-sm transition-colors duration-200"
              >
                {{ t(`footer.${item}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
            {{ t('footer.companyTitle') }}
          </h3>
          <ul class="space-y-2.5">
            <li>
              <NuxtLink :to="localePath('/about')" class="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                {{ t('footer.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/about')" class="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                {{ t('footer.sustainability') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/')" class="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                {{ t('footer.journal') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/')" class="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                {{ t('footer.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
            {{ t('footer.newsletterTitle') }}
          </h3>
          <form class="flex gap-2" @submit.prevent>
            <input
              v-model="email"
              type="email"
              :placeholder="t('footer.newsletterPlaceholder')"
              class="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-primary hover:bg-primary-dark text-background-dark font-semibold text-sm rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              {{ t('footer.newsletterButton') }}
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom row -->
      <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/40 text-xs">{{ t('footer.copyright') }}</p>
        <div class="flex items-center gap-4">
          <NuxtLink target="_blank" href="/pdf/eSenza_PrivacyPolicy.pdf" class="text-white/40 hover:text-white/70 text-xs transition-colors duration-200">
            {{ t('footer.privacy') }}
          </NuxtLink>
          <NuxtLink target="_blank" href="/pdf/eSenza_TermsOfService.pdf" class="text-white/40 hover:text-white/70 text-xs transition-colors duration-200">
            {{ t('footer.terms') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
