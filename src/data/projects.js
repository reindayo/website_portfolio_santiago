export const projects = [
  {
    id: 'part-tract',
    index: 'Project 1 · Placeholder',
    title: 'Part-Tract',
    summary:
      'A web-based tracking and management system designed to streamline part and resource monitoring.',
    link: null,
    blocks: [
      {
        id: 'part-tract-overview',
        heading: 'Overview',
        value: 'summary',
      },
      {
        id: 'part-tract-solution',
        heading: 'Solution',
        text: 'The planned build uses a responsive web interface with a clear tracking workflow, reusable views, and a structured data model that can be expanded as requirements are defined.',
      },
      {
        id: 'part-tract-role',
        heading: 'My Role',
        text: 'Planned the interface structure and data flow, prepared reusable React components, and left the content intentionally generic so project-specific details can be added later.',
      },
      {
        id: 'part-tract-stack',
        heading: 'Tech Stack',
        tags: ['ReactJS', 'JavaScript', 'PostgreSQL'],
      },
    ],
    visuals: {
      id: 'part-tract-visuals',
      caption:
        'Placeholder schematic: part records move through a simple tracking flow into a shared resource overview.',
      diagram: 'part-tract',
    },
  },
  {
    id: 'peer-tutoring',
    index: 'Project 2 · Completed',
    title: 'Peer Tutoring Matching System',
    summary:
      'Full-stack peer-to-peer tutoring request platform that routes student subject requests, queries tutor availability across dual SQLite databases (requests_staff.db and tutors.db), serves deduplicated subject options via /api/subjects, and dispatches automated Gmail SMTP notifications behind session-authenticated staff routes.',
    link: {
      label: 'GitHub Repository',
      href: 'https://github.com/reindayo/Website_project',
    },
    blocks: [
      {
        id: 'peer-tutoring-overview',
        heading: 'Overview',
        value: 'summary',
      },
      {
        id: 'peer-tutoring-role',
        heading: 'Role / Focus',
        text: 'Full-Stack Web Application & QA Edge-Case Hardening',
      },
      {
        id: 'peer-tutoring-stack',
        heading: 'Tech Stack',
        tags: ['Python', 'Flask', 'SQLite', 'HTML5', 'CSS3', 'JavaScript', 'SMTP'],
      },
    ],
    visuals: {
      id: 'peer-tutoring-visuals',
      caption:
        'Fallback schematic: student subject requests, dual-database tutor lookup, deduplicated subject options, and staff-authenticated notification flow.',
      diagram: 'peer-tutoring',
    },
  },
]
