import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const items = Array.from(document.querySelectorAll('.reveal'))
    if (!items.length) {
      return undefined
    }

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion && 'IntersectionObserver' in window) {
      root.classList.add('reveal-ready')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )

      items.forEach((item) => observer.observe(item))
      return () => observer.disconnect()
    }

    items.forEach((item) => item.classList.add('is-visible'))
    return undefined
  }, [])
}
