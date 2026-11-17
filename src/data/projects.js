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
    title:
      'Peer Tutoring Matching System — Student-Tutor Scheduling & Matching Web Platform',
    summary:
      'A completed scheduling and matching web platform that connects students with volunteer tutors by subject and availability.',
    link: {
      label: 'GitHub Repository',
      href: 'https://github.com/reindayo/Website_project',
    },
    blocks: [
      {
        id: 'peer-tutoring-problem',
        heading: 'Problem',
        text: 'Students and volunteer tutors coordinated sessions through group chats and shared spreadsheets. Double bookings, missed subject matches, and lost schedule changes made the process unreliable for both sides.',
      },
      {
        id: 'peer-tutoring-solution',
        heading: 'Solution',
        text: 'A completed scheduling and matching web platform: students request sessions by subject and availability, tutors publish time slots, and the matching view ranks compatible tutors by subject overlap and schedule fit before a session is confirmed.',
      },
      {
        id: 'peer-tutoring-role',
        heading: 'My Role',
        text: 'Designed and delivered the responsive interface, scheduling flow, matching logic, and form validation for the completed Website_project build, then published the final source and handoff notes on GitHub.',
      },
      {
        id: 'peer-tutoring-stack',
        heading: 'Tech Stack',
        tags: [
          'HTML5',
          'CSS3',
          'JavaScript',
          'Responsive Web UI',
          'Scheduling & Matching Logic',
          'Form Validation',
        ],
      },
    ],
    visuals: {
      id: 'peer-tutoring-visuals',
      caption:
        'Interface schematic: weekly availability grid, ranked tutor matches scored by subject and schedule fit, and a confirmed session state.',
      diagram: 'peer-tutoring',
    },
  },
]
