import { useState } from 'react'

const trackingStages = [
  {
    id: 'add',
    label: 'ADD',
    x: 278,
    width: 40,
    wash: 'var(--sienna-wash)',
    stroke: 'var(--sienna)',
    caption: 'Component SKU recorded in parts ledger',
  },
  {
    id: 'update',
    label: 'UPDATE',
    x: 340,
    width: 56,
    wash: 'var(--paper)',
    stroke: 'var(--rule)',
    caption: 'Bin assignment and stock status updated',
  },
  {
    id: 'review',
    label: 'REVIEW',
    x: 418,
    width: 62,
    wash: 'var(--teal-wash)',
    stroke: 'var(--teal)',
    caption: 'Stock levels checked before release',
  },
]

export function PartTractDiagram() {
  const [activeStage, setActiveStage] = useState(trackingStages[0].id)
  const currentStage = trackingStages.find((stage) => stage.id === activeStage) || trackingStages[0]

  const selectStage = (id) => setActiveStage(id)

  const handleStageKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectStage(id)
    }
  }

  return (
    <svg
      className="case-study__diagram"
      viewBox="0 0 680 320"
      role="group"
      aria-label="Part-Tract inventory schematic with interactive component lookup, bin assignment, and stock status stages"
    >
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="1.4" fill="var(--slate)">
        <text x="26" y="38">COMPONENT RECORDS</text>
        <text x="278" y="38">TRACKING FLOW</text>
        <text x="500" y="38">STOCK STATUS OVERVIEW</text>
      </g>
      <g fill="none" stroke="var(--rule)" strokeWidth="1.2">
        <rect x="26" y="56" width="198" height="216" fill="var(--paper)" />
        <line x1="26" y1="110" x2="224" y2="110" />
        <line x1="26" y1="164" x2="224" y2="164" />
        <line x1="26" y1="218" x2="224" y2="218" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)">
        <text x="46" y="86">LM358 · BIN A1 · IN STOCK</text>
        <text x="46" y="140">74HC595 · BIN B2 · IN USE</text>
        <text x="46" y="194">USB-C-16P · BIN C4 · ORDERED</text>
        <text x="46" y="248">NE555 · BIN A3 · IN STOCK</text>
      </g>
      <g fill="var(--teal-wash)" stroke="var(--teal)" strokeWidth="1.2">
        <rect x="32" y="79" width="8" height="8" />
        <rect x="32" y="133" width="8" height="8" />
        <rect x="32" y="187" width="8" height="8" />
        <rect x="32" y="241" width="8" height="8" />
      </g>
      <g
        aria-hidden="true"
        stroke="var(--sienna)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M323 148 H333 M330 145 L335 148 L330 151" />
        <path d="M401 148 H411 M408 145 L413 148 L408 151" />
      </g>
      {trackingStages.map((stage) => (
        <g
          key={stage.id}
          className={`tracking-stage${activeStage === stage.id ? ' is-active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={`${stage.label}: ${stage.caption}`}
          aria-pressed={activeStage === stage.id}
          onClick={() => selectStage(stage.id)}
          onMouseEnter={() => selectStage(stage.id)}
          onFocus={() => selectStage(stage.id)}
          onKeyDown={(event) => handleStageKeyDown(event, stage.id)}
        >
          <rect
            className="tracking-stage__box"
            x={stage.x}
            y="116"
            width={stage.width}
            height="64"
            fill={stage.wash}
            stroke={stage.stroke}
            strokeWidth="1.2"
          />
          <text
            className="tracking-stage__label"
            x={stage.x + stage.width / 2}
            y="154"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8"
            fill="var(--ink)"
          >
            {stage.label}
          </text>
        </g>
      ))}
      <g fontFamily="'JetBrains Mono', monospace">
        <text className="tracking-status-label" x="278" y="209">
          STATUS · {currentStage.label}
        </text>
        <text className="tracking-status-text" x="278" y="225">
          {currentStage.caption}
        </text>
      </g>
      <g fill="none" stroke="var(--rule)" strokeWidth="1.2">
        <rect x="500" y="56" width="154" height="216" fill="var(--paper)" />
        <line x1="500" y1="110" x2="654" y2="110" />
        <line x1="500" y1="164" x2="654" y2="164" />
        <line x1="500" y1="218" x2="654" y2="218" />
        <line x1="577" y1="56" x2="577" y2="272" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)" textAnchor="middle">
        <text x="538" y="86">IN STOCK</text>
        <text x="615" y="86">24</text>
        <text x="538" y="140">IN USE</text>
        <text x="615" y="140">08</text>
        <text x="538" y="194">ORDERED</text>
        <text x="615" y="194">05</text>
        <text x="538" y="248">TOTAL</text>
        <text x="615" y="248" fill="var(--sienna)">37</text>
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)" textAnchor="middle">
        <text x="340" y="308">{'ELECTRONIC PARTS & INVENTORY TRACKING FLOW'}</text>
      </g>
    </svg>
  )
}

const pipelineStages = [
  {
    id: 'request',
    lines: ['STUDENT', 'REQUEST'],
    x: 26,
    width: 144,
    wash: 'var(--sienna-wash)',
    stroke: 'var(--sienna)',
    detail: 'POST /request',
    caption: 'POST /request submits a subject through staff-authenticated routes',
  },
  {
    id: 'lookup',
    lines: ['DUAL SQLITE', 'LOOKUP'],
    x: 186,
    width: 144,
    wash: 'var(--paper)',
    stroke: 'var(--rule)',
    detail: 'requests_staff.db / tutors.db',
    caption: 'requests_staff.db and tutors.db queried for subject availability',
  },
  {
    id: 'match',
    lines: ['EXACT SUBJECT', 'MATCH'],
    x: 346,
    width: 144,
    wash: 'var(--paper)',
    stroke: 'var(--rule)',
    detail: 'exact token match',
    caption: 'Exact subject tokens outrank partial matches; duplicates blocked',
  },
  {
    id: 'dispatch',
    lines: ['SMTP', 'DISPATCH'],
    x: 506,
    width: 144,
    wash: 'var(--teal-wash)',
    stroke: 'var(--teal)',
    detail: 'email_sent',
    caption: 'Gmail SMTP notification sent with a 10-second socket timeout',
  },
]

export function PeerTutoringDiagram() {
  const [activeStage, setActiveStage] = useState(pipelineStages[0].id)
  const currentStage = pipelineStages.find((stage) => stage.id === activeStage) || pipelineStages[0]

  const selectStage = (id) => setActiveStage(id)

  const handleStageKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectStage(id)
    }
  }

  return (
    <svg
      className="case-study__diagram"
      viewBox="0 0 680 320"
      role="group"
      aria-label="Peer Tutoring Matching System pipeline preview with interactive request, lookup, match, and dispatch stages"
    >
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="1.4" fill="var(--slate)">
        <text x="26" y="38">SYSTEM PIPELINE PREVIEW</text>
        <text x="506" y="38">QA STATUS</text>
      </g>
      <g
        aria-hidden="true"
        stroke="var(--sienna)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M172 126 H184 M181 123 L184 126 L181 129" />
        <path d="M332 126 H344 M341 123 L344 126 L341 129" />
        <path d="M492 126 H504 M501 123 L504 126 L501 129" />
      </g>
      {pipelineStages.map((stage, index) => (
        <g
          key={stage.id}
          className={`tracking-stage${activeStage === stage.id ? ' is-active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={`${stage.lines.join(' ')}: ${stage.caption}`}
          aria-pressed={activeStage === stage.id}
          onClick={() => selectStage(stage.id)}
          onMouseEnter={() => selectStage(stage.id)}
          onFocus={() => selectStage(stage.id)}
          onKeyDown={(event) => handleStageKeyDown(event, stage.id)}
        >
          <rect
            className="tracking-stage__box"
            x={stage.x}
            y="56"
            width={stage.width}
            height="140"
            fill={stage.wash}
            stroke={stage.stroke}
            strokeWidth="1.2"
          />
          <text
            x={stage.x + 12}
            y="76"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            fill={stage.stroke}
          >
            {String(index + 1).padStart(2, '0')}
          </text>
          <text
            className="tracking-stage__label"
            x={stage.x + stage.width / 2}
            y="116"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            fill="var(--ink)"
          >
            {stage.lines[0]}
          </text>
          <text
            className="tracking-stage__label"
            x={stage.x + stage.width / 2}
            y="132"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            fill="var(--ink)"
          >
            {stage.lines[1]}
          </text>
          <text
            x={stage.x + stage.width / 2}
            y="170"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="8"
            fill="var(--slate)"
          >
            {stage.detail}
          </text>
        </g>
      ))}
      <g fontFamily="'JetBrains Mono', monospace">
        <text className="tracking-status-label" x="26" y="220">
          PIPELINE · {currentStage.lines.join(' / ')}
        </text>
        <text className="tracking-status-text" x="26" y="238">
          {currentStage.caption}
        </text>
      </g>
      <g fontFamily="'JetBrains Mono', monospace">
        <rect x="26" y="250" width="300" height="40" fill="var(--teal-wash)" stroke="var(--teal)" strokeWidth="1.2" />
        <text x="40" y="266" fontSize="9" fontWeight="600" fill="var(--teal)">
          email_sent
        </text>
        <text x="40" y="282" fontSize="8" fill="var(--slate)">
          tutor record retained · SMTP dispatched
        </text>
        <rect x="354" y="250" width="300" height="40" fill="var(--sienna-wash)" stroke="var(--sienna)" strokeWidth="1.2" />
        <text x="368" y="266" fontSize="9" fontWeight="600" fill="var(--sienna)">
          duplicate_blocked
        </text>
        <text x="368" y="282" fontSize="8" fill="var(--slate)">
          tutor_error=1 · duplicate email rejected
        </text>
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)" textAnchor="middle">
        <text x="340" y="308">FLASK · SQLITE3 · SMTP · QA VERIFIED</text>
      </g>
    </svg>
  )
}
