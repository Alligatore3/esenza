<script setup lang="ts">
const { t } = useI18n()

const steps = [
  {
    number: '1',
    tagKey: 'howItWorks.steps.step1Tag',
    titleKey: 'howItWorks.steps.step1Title',
    titleJaKey: 'howItWorks.steps.step1TitleJa',
    bodyKey: 'howItWorks.steps.step1Body',
    bodyJaKey: 'howItWorks.steps.step1BodyJa',
    image: '/images/how-works-1.jpeg',
    imageAlt: 'Jars on shelf showing selection',
    reverse: false,
  },
  {
    number: '2',
    tagKey: 'howItWorks.steps.step2Tag',
    titleKey: 'howItWorks.steps.step2Title',
    titleJaKey: 'howItWorks.steps.step2TitleJa',
    bodyKey: 'howItWorks.steps.step2Body',
    bodyJaKey: 'howItWorks.steps.step2BodyJa',
    image: '/images/how-works-2.jpeg',
    imageAlt: 'Hands mixing ingredients in a bowl',
    reverse: true,
  },
  {
    number: '3',
    tagKey: 'howItWorks.steps.step3Tag',
    titleKey: 'howItWorks.steps.step3Title',
    titleJaKey: 'howItWorks.steps.step3TitleJa',
    bodyKey: 'howItWorks.steps.step3Body',
    bodyJaKey: 'howItWorks.steps.step3BodyJa',
    image: '/images/how-works-3.jpeg',
    imageAlt: 'Finished Italian dish ready to enjoy',
    reverse: false,
  },
]
</script>

<template>
  <section class="w-full bg-background-light dark:bg-background-dark py-16 md:py-24 px-4 md:px-10 lg:px-16">
    <div class="max-w-wide mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="text-xs font-semibold uppercase tracking-widest text-primary">{{ t('howItWorks.process.eyebrow') }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white mt-2 mb-1">
          {{ t('howItWorks.process.title') }}
        </h2>
        <p class="text-text-muted dark:text-white/50 text-base">{{ t('howItWorks.process.titleJa') }}</p>
        <p class="text-text-muted dark:text-white/70 text-sm max-w-lg mx-auto mt-3">{{ t('howItWorks.process.subtitle') }}</p>
      </div>

      <!-- Steps -->
      <div class="flex flex-col gap-20">
        <div
          v-for="step in steps"
          :key="step.number"
          class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <!-- Text (order changes on reverse) -->
          <div :class="step.reverse ? 'lg:order-2' : 'lg:order-1'" class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-extrabold text-sm flex-shrink-0">
                {{ step.number }}
              </div>
              <span class="text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-white/50">
                {{ t(step.tagKey) }}
              </span>
            </div>
            <h3 class="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white">
              {{ t(step.titleKey) }}
            </h3>
            <p class="text-sm text-text-muted dark:text-white/50">{{ t(step.titleJaKey) }}</p>
            <p class="text-text-muted dark:text-white/70 text-sm leading-relaxed">{{ t(step.bodyKey) }}</p>
            <p class="text-text-muted dark:text-white/50 text-xs">{{ t(step.bodyJaKey) }}</p>
          </div>

          <!-- Image -->
          <div :class="step.reverse ? 'lg:order-1' : 'lg:order-2'" class="rounded-2xl overflow-hidden aspect-[4/3]">
            <img :src="step.image" :alt="step.imageAlt" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
