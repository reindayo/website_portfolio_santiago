import { useEffect, useState } from 'react'

const links = [
  { href: '#hero', label: 'Positioning' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#documentation', label: 'Documentation' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false)
        document.getElementById('nav-toggle')?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isNavOpen])

  useEffect(() => {
    const media = window.matchMedia && window.matchMedia('(min-width: 769px)')
    if (!media) {
      return undefined
    }

    const handleChange = (event) => {
      if (event.matches) {
        setIsNavOpen(false)
      }
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

  return (
    <header className="site-header" id="top">
      <div className="site-header__inner">
        <a className="site-brand" href="#hero" aria-label="JAOS Portfolio home">
          <span className="site-brand__mark">JAOS</span>
          <span className="site-brand__label">Portfolio</span>
        </a>

        <nav
          className={isNavOpen ? 'site-nav is-open' : 'site-nav'}
          id="primary-navigation"
          aria-label="Primary"
        >
          <ul className="site-nav__list">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsNavOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__controls">
          <button
            id="theme-toggle"
            className="theme-toggle"
            type="button"
            aria-label="Toggle Dark Mode"
            aria-pressed={theme === 'dark'}
            onClick={onToggleTheme}
          >
            <svg
              className="theme-toggle__icon theme-toggle__icon--moon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
            </svg>
            <svg
              className="theme-toggle__icon theme-toggle__icon--sun"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>

          <button
            id="nav-toggle"
            className="nav-toggle"
            type="button"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isNavOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            <svg
              className="nav-toggle__icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              aria-hidden="true"
              focusable="false"
            >
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line className="nav-toggle__line nav-toggle__line--top" x1="4" y1="7" x2="20" y2="7" />
                <line
                  className="nav-toggle__line nav-toggle__line--middle"
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                />
                <line
                  className="nav-toggle__line nav-toggle__line--bottom"
                  x1="4"
                  y1="17"
                  x2="20"
                  y2="17"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
