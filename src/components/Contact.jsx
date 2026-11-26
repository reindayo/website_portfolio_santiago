import { useEffect, useRef, useState } from 'react'

const EMAIL = 'johnanthonysantiago@gmail.com'

export default function Contact() {
  const [copyState, setCopyState] = useState({ label: 'Copy Email', status: '', copied: false })
  const resetTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const legacyCopy = () => {
    const field = document.createElement('textarea')
    field.value = EMAIL
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.top = '-9999px'
    document.body.appendChild(field)
    field.select()
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch (error) {
      copied = false
    }
    document.body.removeChild(field)
    return copied
  }

  const report = (message, copied) => {
    setCopyState({ label: copied ? 'Email Copied!' : 'Copy Email', status: message, copied })
    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => {
      setCopyState({ label: 'Copy Email', status: '', copied: false })
    }, 2000)
  }

  const handleCopy = async () => {
    const fallback = () => {
      const copied = legacyCopy()
      report(copied ? 'Email Copied!' : 'Copy failed — select the address manually.', copied)
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(EMAIL)
        report('Email Copied!', true)
      } catch (error) {
        fallback()
      }
    } else {
      fallback()
    }
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="section__intro">
        <p className="meta-label">Contact Channel</p>
        <h2 id="contact-title">Open to Software Engineering / Web Developer Intern roles</h2>
        <p>
          If you are hiring for a Software Engineering / Web Developer Intern, I would welcome the
          opportunity to contribute and grow with your team.
        </p>
      </div>

      <div className="contact__layout">
        <div className="contact__details">
          <div className="contact-email-block">
            <p className="meta-label">Email</p>
            <p className="contact-email">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <button
              className={copyState.copied ? 'button button--secondary is-copied' : 'button button--secondary'}
              type="button"
              onClick={handleCopy}
            >
              {copyState.label}
            </button>
            <p className="copy-status" role="status" aria-live="polite">
              {copyState.status}
            </p>
          </div>

          <div className="contact-links">
            <p className="meta-label">Profiles</p>
            <ul>
              <li>
                <a
                  href="https://github.com/reindayo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/reindayo
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/john-anthony-santiago/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  data-editable-link="linkedin"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.4rem' }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                  linkedin.com/in/john-anthony-santiago
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="contact-form" action={`mailto:${EMAIL}`} method="get">
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" type="text" required />
          </div>
          <div className="form-field form-field--full">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="body" rows="6" required />
          </div>
          <div className="form-actions">
            <button className="button button--primary" type="submit">
              Open Email Draft
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
