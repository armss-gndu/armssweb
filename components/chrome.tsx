'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Check, Copy, Menu, MoveRight, X } from 'lucide-react'
import { buildfestUrl, joinUrl } from './bf-data'

export function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export function Mark({ light = false }: { light?: boolean }) {
  return (
    <span className={`mark ${light ? 'mark-light' : ''}`}>
      <img
        src={light ? '/armss-emblem-light.png' : '/armss-emblem.png'}
        alt="ARMSS emblem"
        className="mark-emblem"
      />
      <span className="mark-text">
        <b>ARMSS</b>
        <i>AI · ROBOTICS · MECHANICAL</i>
      </span>
    </span>
  )
}

const HOME_LINKS: [string, string][] = [
  ['About', 'about'],
  ['Domains', 'domains'],
  ['Lab', 'lab'],
  ['Workshops', 'workshops'],
  ['TechTales', 'techtales'],
  ['Team', 'team'],
]

const BF_LINKS: [string, string][] = [
  ['Events', 'events'],
  ['Schedule', 'schedule'],
  ['Prizes', 'prizes'],
  ['FAQ', 'faq'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isBf = pathname.startsWith('/buildfest')

  const links = isBf
    ? ([
        ['Home', '/'],
        ...BF_LINKS.map(([label, id]) => [label, `#${id}`]),
      ] as [string, string][])
    : (HOME_LINKS.map(([label, id]) => [label, `#${id}`]) as [string, string][])

  const href = (target: string) => target

  return (
    <header className={`topbar ${isBf ? 'topbar-dark' : ''}`}>
      <div className="shell topbar-inner">
        <Link href="/" aria-label="ARMSS home" className="topbar-brand">
          <Mark light={isBf} />
        </Link>
        <nav className="topbar-nav" aria-label="Primary">
          {links.map(([label, target]) => (
            <Link key={target} href={href(target)} className="topbar-link">
              {label}
            </Link>
          ))}
        </nav>
        {isBf ? (
          <a href={buildfestUrl} target="_blank" rel="noopener noreferrer" className="btn btn-amber topbar-cta">
            REGISTER NOW <ArrowUpRight size={15} />
          </a>
        ) : (
          <Link href="/buildfest" className="btn btn-amber topbar-cta">
            BUILDFEST 2.0 <ArrowUpRight size={15} />
          </Link>
        )}
        <button
          className="topbar-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="topbar-drawer">
          {links.map(([label, target]) => (
            <Link key={target} href={href(target)} onClick={() => setOpen(false)}>
              {label}
              <MoveRight size={15} />
            </Link>
          ))}
          <a href={buildfestUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            REGISTER — BUILDFEST 2.0 <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const home = (hash: string) => (pathname === '/' ? hash : `/${hash}`)

  const copyEmail = () => {
    navigator.clipboard.writeText('armss.gndu@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-top">
          <div className="foot-brand">
            <Mark light />
            <p>
              Department of Mechanical Engineering
              <br />
              <span>Guru Nanak Dev University, Amritsar</span>
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <p className="foot-label">EXPLORE</p>
              <Link href={home('#about')}>About</Link>
              <Link href={home('#domains')}>Domains</Link>
              <Link href={home('#lab')}>Hardware Lab</Link>
              <Link href={home('#workshops')}>Workshops</Link>
              <Link href={home('#techtales')}>TechTales</Link>
            </div>
            <div className="foot-col">
              <p className="foot-label">BUILDFEST</p>
              <Link href="/buildfest">Event Page</Link>
              <Link href="/buildfest#schedule">Schedule</Link>
              <Link href="/buildfest#faq">FAQ</Link>
              <a href={buildfestUrl} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </div>
            <div className="foot-col">
              <p className="foot-label">FIND US</p>
              <a href="https://www.instagram.com/armss.gndu/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={joinUrl} target="_blank" rel="noopener noreferrer">
                Join ARMSS
              </a>
              <button onClick={copyEmail} className="foot-copy" type="button">
                {copied ? <Check size={12} className="foot-copy-ok" /> : <Copy size={12} />}
                {copied ? 'Email copied!' : 'armss.gndu@gmail.com'}
              </button>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>ARMSS / GNDU // DEPT OF MECHANICAL ENGINEERING</span>
          <span>© 2026 ARTIFICIAL INTELLIGENCE, ROBOTICS, AND MECHANICAL STUDENT SOCIETY</span>
          <span>LAT 31.6340° N, LONG 74.8242° E</span>
        </div>
      </div>
    </footer>
  )
}
