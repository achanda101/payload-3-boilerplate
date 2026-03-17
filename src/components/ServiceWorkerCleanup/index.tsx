'use client'

import { useEffect } from 'react'

export function ServiceWorkerCleanup() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register the kill-switch SW so it can unregister the old one
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silently ignore if registration fails (e.g. in private mode)
      })
    }
  }, [])

  return null
}
