'use client'

import { useState } from 'react'
import { ArrowUpRight, Cpu, Gamepad2, MapPinned, MoveDown } from 'lucide-react'
import { Footer, Navbar, useRevealOnScroll } from './chrome'
import { KickoffCountdown } from './kickoff-countdown'
import { bfEvents, bfFaqs, bfSchedule, bfTrackClass, buildfestUrl } from './bf-data'

const eventIcons: Record<string, typeof Cpu> = { hackathon: Cpu, hunt: MapPinned, esports: Gamepad2 }

function BfEvents() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="events" className="bfv-section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 01 / EVENTS</span>
          <h2 className="sheet-title">
            THREE WAYS
            <br />
            <em>TO COMPETE.</em>
          </h2>
          <div className="sheet-meta">
            <span>3 EVENTS</span>
            <span>ONE PASS</span>
          </div>
        </div>
        <div className="bf-cards">
          {bfEvents.map((ev) => {
            const Icon = eventIcons[ev.id] ?? Cpu
            const expanded = open === ev.id
            return (
              <article className="bf-card" key={ev.id}>
                <div className="bf-card-top">
                  <span className={`bf-tag ${ev.id === 'hackathon' ? 'bf-tag-hot' : ''}`}>{ev.tag}</span>
                  <Icon className="bf-icon" size={22} strokeWidth={1.5} />
                </div>
                <h3>{ev.title}</h3>
                <p className="bf-desc">{ev.desc}</p>
                <button
                  type="button"
                  className="bf-toggle"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : ev.id)}
                >
                  {expanded ? 'HIDE RULES −' : 'VIEW FULL RULES +'}
                </button>
                {expanded && (
                  <ul className="bf-rules">
                    {ev.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                )}
                <div className="bf-meta">
                  {ev.meta.map(([k, v]) => (
                    <p key={k}>
                      <b>{k}</b> {v}
                    </p>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BfSchedule() {
  const [day, setDay] = useState('DAY 1')
  const schedule = bfSchedule[day]

  return (
    <section id="schedule" className="bfv-section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 02 / SCHEDULE</span>
          <h2 className="sheet-title">
            DAY-WISE
            <br />
            <em>PROGRAM.</em>
          </h2>
          <div className="sheet-meta">
            <span>13 → 15 OCT</span>
          </div>
        </div>
        <div className="bf-tabs" role="tablist" aria-label="Buildfest schedule days" style={{ marginTop: 34 }}>
          {Object.keys(bfSchedule).map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={day === d}
              className={`bf-tab ${day === d ? 'on' : ''}`}
              onClick={() => setDay(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="bf-day-head">
          <b>{schedule.date}</b>
          <span>{schedule.crew}</span>
        </div>
        <div className="bf-rows">
          {schedule.rows.map(([time, activity, track]) => (
            <div className="bf-row" key={`${time}-${activity}`}>
              <time>{time}</time>
              <p>{activity}</p>
              <span className={`track trk-${bfTrackClass(track)}`}>{track}</span>
            </div>
          ))}
        </div>
        <p className="bf-sched-note">VENUES ANNOUNCED TO REGISTERED TEAMS VIA WHATSAPP GROUPS</p>
      </div>
    </section>
  )
}

function BfPrizes() {
  return (
    <section id="prizes" className="bfv-section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 03 / PRIZES</span>
          <h2 className="sheet-title">
            WHAT YOU
            <br />
            <em>WIN.</em>
          </h2>
          <div className="sheet-meta">
            <span>POOL + GOODIES</span>
          </div>
        </div>
        <div className="prize-band">
          <div>
            <span className="prize-amount">
              ₹10,000
              <small>HACKATHON PRIZE POOL</small>
            </span>
          </div>
          <ul className="prize-items">
            <li>Winning team takes the ₹10,000 pool — split four ways if needed.</li>
            <li>Goodie bags &amp; recognition for the top hackathon teams.</li>
            <li>Treasure Hunt &amp; BGMI winners crowned with ARMSS merch.</li>
            <li>Free lunch &amp; refreshments for all participants, all three days.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function BfFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bfv-section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 04 / FAQ</span>
          <h2 className="sheet-title">
            BEFORE YOU
            <br />
            <em>REGISTER.</em>
          </h2>
          <div className="sheet-meta">
            <span>QUICK ANSWERS</span>
          </div>
        </div>
        <div className="faq-grid">
          <p className="about-lead">
            Everything you need to know before you show up and <em>start building.</em>
          </p>
          <div className="faq-list">
            {bfFaqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{question}</span>
                  <span className="pm">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function BuildfestView() {
  useRevealOnScroll()

  return (
    <div className="site site-dark">
      <Navbar />
      <main>
        <section className="bfv-hero">
          <div className="shell">
            <p className="bfv-eyebrow">
              <span className="flag">ARMSS PRESENTS</span>
              GNDU AMRITSAR · UIT
            </p>
            <h1 className="bfv-word">
              BUILDFEST <em>2.0</em>
            </h1>
            <p className="bfv-sub">
              A three-day hardware + software fest. A flagship Hackathon, a campus-wide Treasure Hunt and a BGMI
              E-Sports tournament — built to showcase technical skill, critical thinking and team spirit.
            </p>
            <div className="bfv-chips">
              <span className="chip chip-hot">13–15 OCTOBER 2026</span>
              <span className="chip">₹10,000 PRIZE POOL</span>
              <span className="chip">3 EVENTS</span>
              <span className="chip">OPEN TO ALL DEPARTMENTS</span>
            </div>
            <div className="bfv-ctas">
              <a href={buildfestUrl} target="_blank" rel="noopener noreferrer" className="btn btn-amber">
                REGISTER NOW <ArrowUpRight size={17} />
              </a>
              <a href="#events" className="btn btn-ghost">
                EXPLORE EVENTS <MoveDown size={16} />
              </a>
            </div>
            <KickoffCountdown variant="dark" />
          </div>
        </section>
        <BfEvents />
        <BfSchedule />
        <BfPrizes />
        <BfFaq />
        <section className="bfv-section">
          <div className="shell">
            <div className="reg-panel">
              <h3>
                LOCK YOUR
                <br />
                <em>SLOT.</em>
              </h3>
              <p>
                Registrations close when slots fill. One registration covers all three days — pick your events on the
                form and report at 10:00 AM on 13 October.
              </p>
              <a href={buildfestUrl} target="_blank" rel="noopener noreferrer" className="btn btn-amber">
                REGISTER — BUILDFEST 2.0 <ArrowUpRight size={17} />
              </a>
              <p className="reg-fine">GOOGLE FORM · TAKES 2 MIN · LIMITED SLOTS</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
