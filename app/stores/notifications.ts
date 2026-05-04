import { defineStore } from 'pinia'
import type {
  AddNotificationOptions,
  Notification,
  NotificationMessage,
  NotificationPosition,
  NotificationState,
} from '~/types/notification'

const DEFAULT_TIMEOUT = 2000

const DEFAULT_POSITION: NotificationPosition = 'top-right'

const POSITIONS: NotificationPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

const generateId = () => globalThis.crypto?.randomUUID?.() ?? `n-${Date.now()}-${Math.random()}`

export const useNotificationsStore = defineStore('notifications', () => {
  const items = ref<Notification[]>([])
  const timers = new Map<string, ReturnType<typeof setTimeout>>()

  const remove = (id: string) => {
    const handle = timers.get(id)
    if (handle !== undefined) {
      clearTimeout(handle)
      timers.delete(id)
    }
    items.value = items.value.filter((n) => n.id !== id)
  }

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

    const timeout = options.timeout ?? DEFAULT_TIMEOUT
    if (timeout > 0) {
      timers.set(
        id,
        setTimeout(() => remove(id), timeout),
      )
    }

    return id
  }

  const clear = () => {
    for (const handle of timers.values()) clearTimeout(handle)
    timers.clear()
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
