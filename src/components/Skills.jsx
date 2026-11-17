const domains = [
  {
    id: 'skills-languages',
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'Python', tier: 'core-proficiency', label: 'Core Proficiency' },
      { name: 'C', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'SQL', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'HTML5 & CSS3', tier: 'core-proficiency', label: 'Core Proficiency' },
    ],
  },
  {
    id: 'skills-frameworks',
    title: 'Frameworks & APIs',
    skills: [
      { name: 'ReactJS', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'Node.js', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'Express.js', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'REST APIs', tier: 'working-knowledge', label: 'Working Knowledge' },
    ],
  },
  {
    id: 'skills-databases',
    title: 'Databases',
    skills: [
      { name: 'MySQL', tier: 'working-knowledge', label: 'Working Knowledge' },
      { name: 'PostgreSQL', tier: 'core-proficiency', label: 'Core Proficiency' },
    ],
  },
  {
    id: 'skills-tools-ai',
    title: 'Tools & AI Engineering',
    skills: [
      { name: 'Git & GitHub', tier: 'core-proficiency', label: 'Core Proficiency' },
      { name: 'VS Code', tier: 'core-proficiency', label: 'Core Proficiency' },
      {
        name: 'Custom AI Skill Systems & Anti-Hallucination Prompting',
        tier: 'working-knowledge',
        label: 'Working Knowledge',
      },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills section" aria-labelledby="skills-title">
      <div className="section__intro">
        <p className="meta-label">Capabilities</p>
        <h2 id="skills-title">Curated Skills Matrix</h2>
        <p>Organized by domain with explicit familiarity tiers to reflect current depth and growth trajectory.</p>
      </div>

      <div className="skills__grid">
        {domains.map((domain) => (
          <article className="skill-domain reveal" aria-labelledby={domain.id} key={domain.id}>
            <h3 id={domain.id}>{domain.title}</h3>
            <ul className="skill-list">
              {domain.skills.map((skill) => (
                <li className="skill-item" key={skill.name}>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-tier" data-tier={skill.tier}>
                    {skill.label}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
