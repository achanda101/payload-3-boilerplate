'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToAnchor() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash

      if (hash) {
        const id = hash.replace('#', '')

        // Wait for content to render
        setTimeout(() => {
          const element = document.getElementById(id)

          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }, 100)
      }
    }

    // Scroll on initial load and pathname changes
    scrollToHash()

    // Also listen for hash changes (when clicking anchor links)
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [pathname])

  return null
}
