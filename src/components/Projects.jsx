import { projects } from '../data/projects'
import { PartTractDiagram, PeerTutoringDiagram } from './ProjectDiagrams'

const diagrams = {
  'part-tract': PartTractDiagram,
  'peer-tutoring': PeerTutoringDiagram,
}

export default function Projects() {
  return (
    <section id="projects" className="projects section" aria-labelledby="projects-title">
      <div className="section__intro">
        <p className="meta-label">Completed Work</p>
        <h2 id="projects-title">Featured Projects</h2>
        <p>
          Two portfolio entries, one completed build and one editable placeholder. Each case study
          covers the problem, solution, my role, tech stack, and interface visuals.
        </p>
      </div>

      {projects.map((project) => {
        const Diagram = diagrams[project.visuals.diagram]
        return (
          <article
            className="case-study reveal"
            aria-labelledby={`project-${project.id}`}
            key={project.id}
          >
            <header className="case-study__header">
              <p className="case-study__index">{project.index}</p>
              <h3 id={`project-${project.id}`}>{project.title}</h3>
              {project.link && (
                <a
                  className="case-study__link"
                  href={project.link.href}
                  target={project.link.href.startsWith('http') ? '_blank' : undefined}
                  rel={project.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {project.link.label}
                </a>
              )}
            </header>

            <div className="case-study__grid">
              {project.blocks.map((block) => (
                <div className="case-study__block reveal" aria-labelledby={block.id} key={block.id}>
                  <h4 id={block.id}>{block.heading}</h4>
                  {(block.value === 'summary' ? project.summary : block.text) && (
                    <p>{block.value === 'summary' ? project.summary : block.text}</p>
                  )}
                  {block.tags && (
                    <ul className="tech-stack">
                      {block.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div
                className="case-study__block case-study__block--visuals reveal"
                aria-labelledby={project.visuals.id}
              >
                <h4 id={project.visuals.id}>Visuals</h4>
                <figure className="case-study__figure">
                  <Diagram />
                  <figcaption>{project.visuals.caption}</figcaption>
                </figure>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
