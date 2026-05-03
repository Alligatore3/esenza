<template>
  <div
    class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main font-display antialiased"
  >
    <AppHeader />
    <main class="flex flex-col items-center w-full grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
