export const projects = [
  {
    id: 'part-tract',
    index: 'Project 1 · In Development',
    title: 'Part-Tract',
    summary:
      'A web-based electronic parts and inventory tracking system for component lookup, storage bin assignment, and stock status tracking across shared resource views.',
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
        text: 'The responsive web interface connects component lookup, storage bin assignment, and stock status updates through a clear tracking workflow, reusable views, and a structured parts inventory data model.',
      },
      {
        id: 'part-tract-role',
        heading: 'My Role',
        text: 'Designed the component lookup flow, bin assignment states, and stock status views, then prepared reusable React components and a schema for part records, locations, and availability.',
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
        'Interactive schematic: component records move through lookup, storage bin assignment, and stock status review into a shared inventory overview.',
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
      href: 'https://github.com/reindayo/peer-tutoring-matching-system',
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
        'System pipeline preview: student request, dual SQLite lookup, exact subject match, and SMTP dispatch with QA-verified email_sent and duplicate_blocked states.',
      diagram: 'peer-tutoring',
    },
  },
]
