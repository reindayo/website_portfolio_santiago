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
          IT, led by a resume-connected QA defect report from StudyQuest.
        </p>
      </div>

      <article id="qa-artifact" className="qa-artifact reveal" aria-labelledby="qa-artifact-title">
        <header className="qa-artifact__header">
          <p className="meta-label">Artifact ID: QA-SQ-019</p>
          <h3 id="qa-artifact-title">QA Defect & Resolution Report</h3>
          <p className="qa-artifact__system">
            Target System: StudyQuest 3D Level Generator (Unity / C# / Async JSON Parser)
          </p>
        </header>
        <div className="qa-artifact__grid">
          <section className="qa-artifact__block" aria-labelledby="qa-summary">
            <h4 id="qa-summary">Summary</h4>
            <p>
              Asynchronous PDF-to-JSON parsing stalls at 90% when ingesting multi-column academic
              reviewers containing non-UTF8 special characters, causing the level generator coroutine
              to hang before scene instantiation.
            </p>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-steps">
            <h4 id="qa-steps">Steps to Reproduce</h4>
            <ol className="qa-steps">
              <li>
                Upload a multi-column <code>.pdf</code> lecture reviewer (&gt;15 pages) containing
                em-dashes or mathematical symbols.
              </li>
              <li>
                Trigger the <code>GenerateQuizEnvironment()</code> async pipeline.
              </li>
              <li>
                Observe the coroutine thread lock prior to <code>SceneManager.LoadSceneAsync()</code>.
              </li>
            </ol>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-results">
            <h4 id="qa-results">Expected vs. Actual Result</h4>
            <dl className="qa-results">
              <dt>Expected</dt>
              <dd>Sanitized JSON question nodes populate 3D stage triggers within 3 seconds.</dd>
              <dt>Actual</dt>
              <dd>
                Unhandled <code>JsonReaderException</code> halts the main thread parser.
              </dd>
            </dl>
          </section>
          <section className="qa-artifact__block" aria-labelledby="qa-resolution">
            <h4 id="qa-resolution">Resolution & Verification</h4>
            <p>
              Implemented pre-flight UTF-8 byte sanitization (<code>Encoding.UTF8</code>) and
              structured try-catch fallback handling in C#; verified across 12 BSCS course reviewers
              with 0% crash recurrence.
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
          <section className="qa-artifact__block" aria-labelledby="certification-recipient">
            <h4 id="certification-recipient">Recipient</h4>
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
