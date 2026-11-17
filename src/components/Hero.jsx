import BlueprintCanvas from './BlueprintCanvas'

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__visual-column">
          <figure className="profile-frame">
            <img
              src="/assets/images/profile.jpg"
              width="1113"
              height="1280"
              alt="John Anthony O. Santiago — Software Engineering / Web Developer Intern"
              fetchPriority="high"
            />
          </figure>
          <div className="hero__location-meta">
            <p className="meta-label">Location</p>
            <p>
              Roxas City, Capiz, Philippines (3rd-Year BS in Computer Science, Filamer Christian
              University)
            </p>
          </div>
        </div>

        <div className="hero__content-column">
          <p className="eyebrow">Professional Track — Business Communication in IT</p>
          <h1 id="hero-title" className="hero__name">
            John Anthony O. Santiago
          </h1>
          <p className="hero__role">Software Engineering / Web Developer Intern</p>
          <p className="hero__pitch">
            3rd-Year BS Computer Science, Filamer Christian University, Expected Graduation: 2028.
            Bridging low-level C hardware fundamentals, normalized relational databases, and
            structured AI-assisted engineering to build reliable, well-documented software systems.
          </p>

          <div className="hero__actions" aria-label="Primary actions">
            <a
              className="button button--primary"
              href="https://github.com/reindayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="button button--secondary"
              href="https://www.linkedin.com/in/john-anthony-santiago"
              target="_blank"
              rel="noopener noreferrer"
              data-editable-link="linkedin"
            >
              LinkedIn
            </a>
            <a
              className="button button--ghost"
              href="/assets/docs/John_Anthony_Santiago_Resume.pdf"
              download
            >
              Download PDF Resume
            </a>
          </div>

          <article className="engineering-philosophy reveal" aria-labelledby="philosophy-title">
            <p className="meta-label">Engineering Philosophy</p>
            <h2 id="philosophy-title">Monograph on practice and rigor</h2>
            <p>
              My journey began with learning C on my own to understand how hardware reads code at
              the memory level. From that foundation, I moved into building relational backends in
              PostgreSQL and MySQL (phpMyAdmin), developing web interfaces with HTML/CSS, JavaScript,
              basic React.js, and exploring Next.js + REST API integrations. Today I engineer
              deterministic AI workflows using custom skills and anti-hallucination constraints
              rather than casual generic prompting, treating clarity, verification, and documentation
              as core parts of software delivery.
            </p>
          </article>
        </div>
      </div>

      <BlueprintCanvas />
    </section>
  )
}
