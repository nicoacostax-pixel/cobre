'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function PixelEvent({ event }: { event: string }) {
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', event)
      return
    }
    const interval = setInterval(() => {
      if (window.fbq) {
        window.fbq('track', event)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [event])

  return null
}
