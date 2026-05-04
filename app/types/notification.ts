export type NotificationState = 'success' | 'error' | 'warning' | 'info'

export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export type NotificationMessage =
  | string
  | { key: string; params?: Record<string, unknown> }

export interface Notification {
  id: string
  state: NotificationState
  message: NotificationMessage
  position: NotificationPosition
}

export interface AddNotificationOptions {
  position?: NotificationPosition
  id?: string
}
