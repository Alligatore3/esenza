<script setup lang="ts">
import type { Notification, NotificationPosition } from '~/types/notification'

const store = useNotificationsStore()
const { t, te } = useI18n()

function renderMessage(n: Notification): string {
  if (typeof n.message === 'string') return n.message
  return te(n.message.key) ? t(n.message.key, n.message.params ?? {}) : n.message.key
}

const positionClasses: Record<NotificationPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
}

const stateClasses: Record<Notification['state'], string> = {
  success: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-100 dark:border-emerald-800',
  error: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/60 dark:text-red-100 dark:border-red-800',
  warning: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-100 dark:border-amber-800',
  info: 'bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/60 dark:text-sky-100 dark:border-sky-800',
}

const stateIcons: Record<Notification['state'], string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
}
</script>

<template>
  <template v-for="(list, position) in store.byPosition" :key="position">
    <div
      v-if="list.length"
      :class="['fixed z-[60] flex flex-col gap-2 pointer-events-none', positionClasses[position]]"
    >
      <div
        v-for="n in list"
        :key="n.id"
        :class="[
          'pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-sm rounded-xl border px-4 py-3 shadow-lg',
          stateClasses[n.state],
        ]"
        role="status"
      >
        <span class="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
          {{ stateIcons[n.state] }}
        </span>
        <p class="text-sm font-medium leading-snug grow">{{ renderMessage(n) }}</p>
        <button
          type="button"
          class="shrink-0 -mr-1 -mt-1 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
          :aria-label="t('notifications.close')"
          @click="store.remove(n.id)"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  </template>
</template>
