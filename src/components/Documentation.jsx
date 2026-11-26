import { useState } from 'react'

const tabs = [
  {
    id: 'panel-cover-letter',
    tabId: 'tab-cover-letter',
    label: 'Tab 1 — Technical Cover Letter',
  },
  {
    id: 'panel-resume-summary',
    tabId: 'tab-resume-summary',
    label: 'Tab 2 — Executive Resume Summary & PDF Download',
  },
  {
    id: 'panel-peer-tutoring',
    tabId: 'tab-peer-tutoring',
    label: 'Tab 3 — Peer Tutoring Matching System',
  },
]

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('panel-cover-letter')

  const selectTab = (id, shouldFocus = false) => {
    setActiveTab(id)
    if (shouldFocus) {
      const tab = tabs.find((item) => item.id === id)
      if (tab) {
        document.getElementById(tab.tabId)?.focus()
      }
    }
  }

  const handleKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    selectTab(tabs[nextIndex].id, true)
  }

  return (
    <section id="documentation" className="documentation section" aria-labelledby="documentation-title">
      <div className="section__intro">
        <p className="meta-label">Technical Communication</p>
        <h2 id="documentation-title">Documentation Artifact</h2>
        <p>
          Interactive viewer of real technical writing samples created for Business Communication in
          IT, led by a QA defect report from the Peer Tutoring Matching System.
        </p>
      </div>

      <article id="qa-artifact" className="qa-artifact reveal" aria-labelledby="qa-artifact-title">
        <header className="qa-artifact__header">
          <p className="meta-label">Artifact ID: QA-PT-019</p>
          <h3 id="qa-artifact-title">QA Defect & Resolution Report</h3>
          <p className="qa-artifact__system">
            Target System: Peer Tutoring Matching System (Python / Flask / SQLite3)
          </p>
        </header>
        <div className="qa-artifact__grid">
          <section className="qa-artifact__block" aria-labelledby="qa-summary">
            <h4 id="qa-summary">Summary</h4>
            <p>
              Submitting a second tutor with an already-registered email address triggers an
              unhandled <code>sqlite3.IntegrityError</code> crash, while a successful student request
              deletes all matched tutors from <code>tutors.db</code> via{' '}
              <code>delete_tutor_by_name()</code>, wiping out active tutor availability after a single
              submission.
            </p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-steps">
            <h4 id="qa-steps">Steps to Reproduce</h4>
            <ol className="qa-steps">
              <li>
                Register an active tutor in <code>/add_tutor.html</code> and submit a matching student
                request via <code>/request</code>.
              </li>
              <li>
                Observe <code>tutors.db</code> wiping the matched tutor record upon{' '}
                <code>email_sent</code>.
              </li>
              <li>
                Attempt to add a tutor using an existing email address and observe an unhandled{' '}
                <code>sqlite3.IntegrityError</code> 500 crash instead of the <code>tutor_error=1</code>{' '}
                alert.
              </li>
            </ol>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-results">
            <h4 id="qa-results">Expected vs. Actual Result</h4>
            <dl className="qa-results">
              <dt>Expected</dt>
              <dd>
                Matched tutors remain in <code>tutors.db</code> for future requests, and duplicate
                emails cleanly redirect with <code>tutor_error=1</code>.
              </dd>
              <dt>Actual</dt>
              <dd>
                Active tutors are permanently deleted on match, and duplicate email submissions crash
                the Flask worker.
              </dd>
            </dl>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-resolution">
            <h4 id="qa-resolution">Resolution & Verification</h4>
            <p>
              Replaced post-match deletion with non-destructive single-tutor assignment, added
              case-insensitive duplicate checks with <code>sqlite3.IntegrityError</code> handling in{' '}
              <code>save_tutor()</code>, upgraded subject lookup to prioritize exact token matches,
              and enforced a 10-second <code>smtplib.SMTP</code> socket timeout.
            </p>
          </section>
        </div>
      </article>

      <div className="doc-viewer reveal" data-doc-viewer>
        <div className="doc-tabs" role="tablist" aria-label="Documentation samples">
          {tabs.map((tab, index) => (
            <button
              className={activeTab === tab.id ? 'doc-tab is-active' : 'doc-tab'}
              type="button"
              role="tab"
              id={tab.tabId}
              key={tab.id}
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="doc-panels">
          <div
            className={activeTab === 'panel-cover-letter' ? 'doc-panel is-active' : 'doc-panel'}
            id="panel-cover-letter"
            role="tabpanel"
            aria-labelledby="tab-cover-letter"
            tabIndex={0}
            hidden={activeTab !== 'panel-cover-letter'}
          >
            <header className="doc-panel__header">
              <p className="meta-label">Technical Cover Letter</p>
              <h3>Application for Software Engineering / Web Developer Intern Role</h3>
              <p>
                John Anthony O. Santiago ·{' '}
                <a href="mailto:santiago.johnanthonyorillanes@filamer.edu.ph">santiago.johnanthonyorillanes@filamer.edu.ph</a> · +63
                962 527 7295
              </p>
            </header>
            <div className="letter">
              <p>Dear Hiring Manager,</p>
              <p>
                I am John Anthony O. Santiago, a 3rd-Year BS Computer Science student at Filamer
                Christian University (Expected Graduation: 2028) in Roxas City, Capiz, applying for a
                Software Engineering / Web Developer Intern opportunity. I bring a disciplined
                engineering approach grounded in C fundamentals, relational database design, and
                clear technical communication.
              </p>
              <p>
                Through self-directed study of C, I developed a practical understanding of how
                hardware reads code at the memory level, which informs how I reason about correctness
                and performance. I have designed normalized PostgreSQL schemas, written analytical
                SQL joins, and worked with MySQL (phpMyAdmin), while also building web interfaces
                with HTML/CSS and JavaScript and exploring React.js, Next.js, and REST API
                integrations. In my AI-assisted workflows, I prioritize deterministic outputs by
                using custom skills and anti-hallucination constraints supported by verification
                checks.
              </p>
              <p>
                I am eager to contribute reliable, well-documented software and to communicate
                technical decisions clearly within a team. Thank you for considering my application.
              </p>
              <p>
                Sincerely,
                <br />
                John Anthony O. Santiago
              </p>
            </div>
          </div>

          <div
            className={activeTab === 'panel-resume-summary' ? 'doc-panel is-active' : 'doc-panel'}
            id="panel-resume-summary"
            role="tabpanel"
            aria-labelledby="tab-resume-summary"
            tabIndex={0}
            hidden={activeTab !== 'panel-resume-summary'}
          >
            <header className="doc-panel__header">
              <p className="meta-label">Executive Resume Summary</p>
              <h3>John Anthony O. Santiago — Software Engineering / Web Developer Intern</h3>
              <p>
                3rd-Year BS Computer Science, Filamer Christian University (Expected Graduation: 2028){' '}
                · <a href="mailto:santiago.johnanthonyorillanes@filamer.edu.ph">santiago.johnanthonyorillanes@filamer.edu.ph</a> ·
                +63 962 527 7295
              </p>
            </header>
            <div className="resume-preview">
              <ul className="resume-highlights">
                <li>
                  3rd-Year BS Computer Science student at Filamer Christian University (Expected
                  Graduation: 2028) targeting a Software Engineering / Web Developer Intern role.
                </li>
                <li>
                  Builds with React, JavaScript (ES6+), Node.js, Express.js, REST APIs, MySQL,
                  PostgreSQL, and SQL to deliver reliable web and data-driven applications.
                </li>
                <li>
                  Applies C and Python foundations with disciplined debugging, documentation, and
                  structured AI-assisted engineering practices.
                </li>
              </ul>
              <a
                className="button button--primary"
                href={`${import.meta.env.BASE_URL}assets/docs/John_Anthony_Santiago_Resume.pdf`}
                download
              >
                Download Executive Resume (PDF)
              </a>
            </div>
          </div>

          <div
            className={activeTab === 'panel-peer-tutoring' ? 'doc-panel is-active' : 'doc-panel'}
            id="panel-peer-tutoring"
            role="tabpanel"
            aria-labelledby="tab-peer-tutoring"
            tabIndex={0}
            hidden={activeTab !== 'panel-peer-tutoring'}
          >
            <header className="doc-panel__header">
              <p className="meta-label">Peer Tutoring Matching System</p>
              <h3>Full-Stack Web Application &amp; QA Edge-Case Hardening</h3>
            </header>
            <div className="qa-artifact__grid">
              <section className="qa-artifact__block" aria-labelledby="peer-tutoring-overview-doc">
                <h4 id="peer-tutoring-overview-doc">Overview</h4>
                <p>
                  Full-stack peer-to-peer tutoring request platform that routes student subject
                  requests, queries tutor availability across dual SQLite databases (
                  <code>requests_staff.db</code> and <code>tutors.db</code>), serves deduplicated
                  subject options via <code>/api/subjects</code>, and dispatches automated Gmail SMTP
                  notifications behind session-authenticated staff routes.
                </p>
              </section>
              <section className="qa-artifact__block" aria-labelledby="peer-tutoring-architecture-doc">
                <h4 id="peer-tutoring-architecture-doc">Architecture</h4>
                <p>
                  Dual-database separation keeps <code>requests_staff.db</code> responsible for
                  student requests, match history, and staff authentication, while{' '}
                  <code>tutors.db</code> holds tutor rosters. A dynamic <code>/api/subjects</code> JSON
                  endpoint serves deduplicated subject options, and TLS-encrypted Gmail SMTP dispatch
                  runs only from session-authenticated staff routes.
                </p>
              </section>
            </div>
            <div className="qa-artifact__grid">
              <section className="qa-artifact__block" aria-labelledby="peer-tutoring-qa-doc">
                <h4 id="peer-tutoring-qa-doc">QA Fixes</h4>
                <ol className="qa-steps">
                  <li>
                    <strong>Data Persistence:</strong> Replaced destructive post-match tutor deletion
                    with non-destructive assignment so active tutors remain available for future
                    requests.
                  </li>
                  <li>
                    <strong>Constraint &amp; Input Hardening:</strong> Added case-insensitive duplicate
                    email/name checks, <code>sqlite3.IntegrityError</code> handling, and whitespace
                    sanitization across all POST forms to prevent unhandled database crashes.
                  </li>
                  <li>
                    <strong>Matching &amp; Network Resilience:</strong> Upgraded subject matching to
                    prioritize exact token matches over partial substring matches and enforced a
                    10-second SMTP socket timeout.
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </div>

      <article className="qa-artifact reveal" aria-labelledby="certifications-title">
        <header className="qa-artifact__header">
          <p className="meta-label">CERTIFICATIONS</p>
          <h3 id="certifications-title">Cisco Networking Academy Credential</h3>
        </header>
        <div className="qa-artifact__grid">
          <section className="qa-artifact__block" aria-labelledby="certification-credential">
            <h4 id="certification-credential">Credential</h4>
            <p>Introduction to Modern AI</p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="certification-issuer">
            <h4 id="certification-issuer">Issuer</h4>
            <p>Cisco Networking Academy</p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="certification-awarded-to">
            <h4 id="certification-awarded-to">Awarded to</h4>
            <p>John Anthony Santiago</p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="certification-date">
            <h4 id="certification-date">Completion Date</h4>
            <p>26 Nov 2026</p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="certification-id">
            <h4 id="certification-id">Certificate ID</h4>
            <p>4b941764-6367-4432-84d5-73c1813699c1</p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="certification-actions">
            <h4 id="certification-actions">Certificate Actions</h4>
            <div className="form-actions">
              <a
                className="button button--primary"
                href={`${import.meta.env.BASE_URL}assets/docs/Cisco_Introduction_to_Modern_AI_Certificate.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW CERTIFICATE
              </a>{' '}
              <a
                className="button button--secondary"
                href={`${import.meta.env.BASE_URL}assets/docs/Cisco_Introduction_to_Modern_AI_Certificate.pdf`}
                download="Cisco_Introduction_to_Modern_AI_Certificate.pdf"
              >
                DOWNLOAD PDF
              </a>
            </div>
          </section>
        </div>
      </article>
    </section>
  )
}
