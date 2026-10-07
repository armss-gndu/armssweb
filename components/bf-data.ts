export const joinUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSd4JSOaJXuagxt5x-fU-nzsQc2FaBTK4yFw_QftLPHgGHPEUQ/viewform?pli=1&utm_source=ig&utm_medium=social&utm_content=link_in_bio'
export const buildfestUrl = 'https://forms.gle/xDdATJ3TbiSAzNZE8'

export const buildfestKickoffMs = new Date('2026-10-13T10:00:00+05:30').getTime()
export const buildfestEndMs = new Date('2026-10-15T17:00:00+05:30').getTime()

export type BfEvent = {
  id: string
  tag: string
  title: string
  desc: string
  meta: [string, string][]
  rules: string[]
}

export const bfEvents: BfEvent[] = [
  {
    id: 'hackathon',
    tag: 'FLAGSHIP / 3 DAYS',
    title: 'Hackathon',
    desc: 'From problem analysis to a working prototype — ideate, build and pitch across three structured days, with the ARMSS technical team on hand for soldering, electronics and troubleshooting.',
    meta: [
      ['DATES', '13–15 October'],
      ['TEAM', '2–4 members · ₹500 / team'],
      ['SOLO', '₹350 / participant'],
      ['PRIZE', '₹10,000 pool + goodies'],
      ['PERKS', 'Lunch & refreshments all 3 days'],
    ],
    rules: [
      'Day 1 — problem statements issued; teams pitch solutions on the official ARMSS PPT template, judged on understanding, innovation, feasibility, methodology & clarity.',
      'Day 2 — hands-on prototype development; teams demo their progress at the end of the day.',
      'Day 3 — refine, test and present final working models to the judging panel.',
      'Final judging: innovation, technical implementation, functionality, feasibility, problem-solving approach & overall execution.',
      'Prize: ₹10,000 pool for the winning team + goodie bags & recognition.',
      'Free lunch & refreshments all three days; ARMSS tech team available for soldering, electronics & troubleshooting.',
    ],
  },
  {
    id: 'hunt',
    tag: 'CAMPUS WIDE',
    title: 'Treasure Hunt',
    desc: 'Decode a series of clues and race across campus checkpoints to reach the final destination. ARMSS crew at every point — teamwork and logic win.',
    meta: [
      ['DATE', '14 October · 1:30–3:30 PM'],
      ['TEAM', '3–5 members'],
      ['FEE', '₹70 / member'],
      ['START', 'Reporting 1:00 PM @ UIT'],
    ],
    rules: [
      'Report at UIT — the starting point — for instructions and your first clue.',
      'Decode each clue to reach the next location; the chain continues until the final destination.',
      'Checkpoints are spread across the entire university campus.',
      'An ARMSS team member is stationed at every checkpoint — look for ARMSS T-shirts & official ID cards.',
      'Volunteers ensure smooth coordination and movement of participants throughout the hunt.',
    ],
  },
  {
    id: 'esports',
    tag: 'E-SPORTS / BGMI',
    title: 'BGMI Tournament',
    desc: 'Two matches — Rondo and Erangel. Placement and kill points combine into the final standings, with rankings updated after every match.',
    meta: [
      ['DATES', '13–14 October · 1:15–2:00 PM'],
      ['FEE', '₹50 / participant'],
      ['FORMAT', '2 matches · combined scoring'],
      ['START', 'Reporting 1:00 PM'],
    ],
    rules: [
      'Match 1 — Rondo · Match 2 — Erangel.',
      'Points: 1st place = 5 · 2nd place = 2 · each kill = +1.',
      'Example: finish 1st in Rondo with 8 kills → 13 points, then add your Erangel total.',
      'Scores from both matches combine into the final standings.',
      'Updated rankings are displayed after every match so squads can track their position.',
    ],
  },
]

export type BfDay = {
  date: string
  crew: string
  rows: [string, string, string][]
}

export const bfSchedule: Record<string, BfDay> = {
  'DAY 1': {
    date: '13 October 2026',
    crew: 'Hackathon — Tarun Reehal & Junaid · E-Sports — Harmanjot Singh & Rajeev Kumar · Venue: TBD',
    rows: [
      ['10:00–11:00', 'Hackathon teams reporting', 'HACKATHON'],
      ['11:00–12:00', 'Inaugural ceremony', 'ALL'],
      ['12:00–13:00', 'Issue of problem statements', 'HACKATHON'],
      ['13:00–14:00', 'Lunch break', 'ALL'],
      ['13:00–14:00', 'BGMI Round 1 — Rondo', 'E-SPORTS'],
      ['14:00–15:30', 'PPT preparation (ARMSS template)', 'HACKATHON'],
      ['15:30–17:00', 'PPT presentations — Round 1', 'HACKATHON'],
      ['18:00–18:30', 'Round 1 evaluation via WhatsApp groups', 'HACKATHON'],
    ],
  },
  'DAY 2': {
    date: '14 October 2026',
    crew: 'Hackathon — Tarun Reehal & Junaid · E-Sports — Harmanjot Singh & Rajeev Kumar · Treasure Hunt — Ashish Attri & Krrish Sharma · Venue: TBD',
    rows: [
      ['10:00–10:30', 'Hackathon teams reporting', 'HACKATHON'],
      ['11:00–13:00', 'Prototype development', 'HACKATHON'],
      ['13:00–14:00', 'Lunch break', 'ALL'],
      ['13:00–14:00', 'BGMI Round 2 — Erangel', 'E-SPORTS'],
      ['13:00–13:30', 'Treasure Hunt reporting @ UIT', 'HUNT'],
      ['13:30–15:30', 'Treasure Hunt — campus checkpoints', 'HUNT'],
      ['14:00–15:30', 'Prototype development (contd.)', 'HACKATHON'],
      ['15:30–17:00', 'Progress check — Round 2', 'HACKATHON'],
      ['18:00–18:30', 'Round 2 evaluation via WhatsApp groups', 'HACKATHON'],
    ],
  },
  'DAY 3': {
    date: '15 October 2026',
    crew: 'Hackathon — Tarun Reehal & Junaid · Venue: TBD',
    rows: [
      ['10:00–10:30', 'Hackathon teams reporting', 'HACKATHON'],
      ['11:00–13:00', 'Prototype development & refinement', 'HACKATHON'],
      ['13:00–14:00', 'Lunch break', 'ALL'],
      ['14:00–15:30', 'Final evaluation — judging panel', 'HACKATHON'],
      ['15:30–17:00', 'Prize distribution', 'ALL'],
    ],
  },
}

export const bfTrackClass = (track: string) =>
  ({ HACKATHON: 'hack', 'E-SPORTS': 'esports', HUNT: 'hunt' })[track] ?? 'all'

export const bfFaqs: [string, string][] = [
  [
    'Who can participate?',
    'Any student can take part. The Hackathon accepts teams of 2–4 members as well as individual entries, the Treasure Hunt runs on teams of 3–5, and the BGMI tournament is open to individual players and squads.',
  ],
  [
    'What are the registration fees?',
    'Hackathon — ₹500 per team of 2–4, or ₹350 per individual. Treasure Hunt — ₹70 per member. BGMI — ₹50 per participant. One registration covers the full three days.',
  ],
  [
    'What should we bring?',
    'Bring your laptop and any hardware your prototype needs. ARMSS provides lab access, soldering stations, electronics components and on-site troubleshooting support across all three days.',
  ],
  [
    'Where is the event held?',
    'Across the GNDU Amritsar campus — the Treasure Hunt reports at UIT. Exact venues are announced to registered teams through the WhatsApp groups.',
  ],
  [
    'How are winners decided?',
    'The Hackathon is evaluated across three rounds — solution presentation, progress check and final evaluation — by a judging panel. BGMI standings combine placement and kill points from both matches.',
  ],
]
