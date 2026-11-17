import { useState } from 'react'

const trackingStages = [
  {
    id: 'add',
    label: 'ADD',
    x: 278,
    width: 40,
    wash: 'var(--sienna-wash)',
    stroke: 'var(--sienna)',
    caption: 'Parts recorded into the stock ledger',
  },
  {
    id: 'update',
    label: 'UPDATE',
    x: 340,
    width: 56,
    wash: 'var(--paper)',
    stroke: 'var(--rule)',
    caption: 'Stock records moved into active use',
  },
  {
    id: 'review',
    label: 'REVIEW',
    x: 418,
    width: 62,
    wash: 'var(--teal-wash)',
    stroke: 'var(--teal)',
    caption: 'Ordered parts checked before release',
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
      aria-label="Part-Tract tracking schematic with interactive tracking stages"
    >
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="1.4" fill="var(--slate)">
        <text x="26" y="38">PART RECORDS</text>
        <text x="278" y="38">TRACKING FLOW</text>
        <text x="500" y="38">RESOURCE OVERVIEW</text>
      </g>
      <g fill="none" stroke="var(--rule)" strokeWidth="1.2">
        <rect x="26" y="56" width="198" height="216" fill="var(--paper)" />
        <line x1="26" y1="110" x2="224" y2="110" />
        <line x1="26" y1="164" x2="224" y2="164" />
        <line x1="26" y1="218" x2="224" y2="218" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)">
        <text x="46" y="86">PART-001 · IN STOCK</text>
        <text x="46" y="140">PART-002 · IN USE</text>
        <text x="46" y="194">PART-003 · ORDERED</text>
        <text x="46" y="248">PART-004 · IN STOCK</text>
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
        <text x="340" y="308">PLACEHOLDER TRACKING SCHEMATIC</text>
      </g>
    </svg>
  )
}

export function PeerTutoringDiagram() {
  return (
    <svg
      className="case-study__diagram"
      viewBox="0 0 680 320"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="1.4" fill="var(--slate)">
        <text x="26" y="38">WEEKLY AVAILABILITY</text>
        <text x="452" y="38">RANKED TUTOR MATCHES</text>
      </g>
      <g fill="none" stroke="var(--rule)" strokeWidth="1.2">
        <rect x="26" y="56" width="372" height="216" fill="var(--paper)" />
        <line x1="26" y1="92" x2="398" y2="92" />
        <line x1="100" y1="56" x2="100" y2="272" />
        <line x1="174" y1="56" x2="174" y2="272" />
        <line x1="248" y1="56" x2="248" y2="272" />
        <line x1="322" y1="56" x2="322" y2="272" />
        <line x1="26" y1="128" x2="398" y2="128" strokeDasharray="2 6" />
        <line x1="26" y1="164" x2="398" y2="164" strokeDasharray="2 6" />
        <line x1="26" y1="200" x2="398" y2="200" strokeDasharray="2 6" />
        <line x1="26" y1="236" x2="398" y2="236" strokeDasharray="2 6" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)" textAnchor="middle">
        <text x="63" y="78">MON</text>
        <text x="137" y="78">TUE</text>
        <text x="211" y="78">WED</text>
        <text x="285" y="78">THU</text>
        <text x="359" y="78">FRI</text>
      </g>
      <g fill="var(--teal-wash)" stroke="var(--teal)" strokeWidth="1.2">
        <rect x="104" y="132" width="66" height="28" />
        <rect x="252" y="168" width="66" height="28" />
        <rect x="326" y="204" width="66" height="28" />
      </g>
      <g fill="var(--sienna-wash)" stroke="var(--sienna)" strokeWidth="1.2">
        <rect x="30" y="96" width="66" height="28" />
        <rect x="178" y="204" width="66" height="28" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="var(--ink)" textAnchor="middle">
        <text x="137" y="150">MATCH</text>
        <text x="285" y="186">OPEN</text>
        <text x="359" y="222">MATCH</text>
        <text x="63" y="114">BOOKED</text>
        <text x="211" y="222">OPEN</text>
      </g>
      <g fill="none" stroke="var(--rule)" strokeWidth="1.2">
        <rect x="452" y="56" width="202" height="62" fill="var(--paper)" />
        <rect x="452" y="134" width="202" height="62" fill="var(--paper)" />
        <rect x="452" y="212" width="202" height="62" fill="var(--sienna-wash)" stroke="var(--sienna)" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)">
        <text x="466" y="78">TUTOR A · CS 201</text>
        <text x="466" y="96" fill="var(--teal)">94% SCHEDULE FIT</text>
        <text x="466" y="156">TUTOR B · MATH 101</text>
        <text x="466" y="174" fill="var(--teal)">88% SCHEDULE FIT</text>
        <text x="466" y="234">TUTOR C · CS 201</text>
        <text x="466" y="252" fill="var(--sienna)">76% SCHEDULE FIT</text>
      </g>
      <g stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M620 72 l5 5 9-10" />
      </g>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--slate)" textAnchor="middle">
        <text x="340" y="308">CONFIRMED SESSION STATE</text>
      </g>
    </svg>
  )
}
