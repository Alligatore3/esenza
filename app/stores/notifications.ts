import { defineStore } from 'pinia'
import type {
  AddNotificationOptions,
  Notification,
  NotificationMessage,
  NotificationPosition,
  NotificationState,
} from '~/types/notification'

const DEFAULT_POSITION: NotificationPosition = 'top-right'

const POSITIONS: NotificationPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

const generateId = () => globalThis.crypto?.randomUUID?.() ?? `n-${Date.now()}-${Math.random()}`

export const useNotificationsStore = defineStore('notifications', () => {
  const items = ref<Notification[]>([])

  function add(
    state: NotificationState,
    message: NotificationMessage,
    options: AddNotificationOptions = {},
  ): string {
    if (options.id && items.value.some((n) => n.id === options.id)) {
      return options.id
    }

    const id = options.id ?? generateId()

    items.value.push({
      id,
      state,
      message,
      position: options.position ?? DEFAULT_POSITION,
    })

    return id
  }

  const remove = (id: string) => {
    items.value = items.value.filter((n) => n.id !== id)
  }

  const clear = () => {
    items.value = []
  }

  const byPosition = computed(() => {
    const groups = POSITIONS.reduce(
      (acc, p) => {
        acc[p] = []
        return acc
      },
      {} as Record<NotificationPosition, Notification[]>,
    )
    for (const n of items.value) groups[n.position].push(n)
    return groups
  })

  return { items, byPosition, add, remove, clear }
})
