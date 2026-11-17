import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'
const THEME_EVENT = 'portfolio:themechange'

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') {
      return stored
    }
  } catch (error) {}

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }

    document.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { theme } }))
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    if (!media) {
      return undefined
    }

    const handleChange = (event) => {
      let stored = null
      try {
        stored = window.localStorage.getItem(STORAGE_KEY)
      } catch (error) {}

      if (stored === 'dark' || stored === 'light') {
        return
      }

      setTheme(event.matches ? 'dark' : 'light')
    }

    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }

    if (media.addListener) {
      media.addListener(handleChange)
      return () => media.removeListener(handleChange)
    }

    return undefined
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch (error) {}
    setTheme(nextTheme)
  }

  return { theme, toggleTheme }
}
