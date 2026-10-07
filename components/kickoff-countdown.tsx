'use client'

import { useEffect, useState } from 'react'
import { buildfestKickoffMs, buildfestEndMs } from './bf-data'

export function KickoffCountdown({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = now === null ? null : buildfestKickoffMs - now
  const isLive = diff !== null && diff <= 0 && now !== null && now < buildfestEndMs
  const isDone = now !== null && now >= buildfestEndMs

  const units: [string, string][] | null =
    diff === null
      ? [
          ['--', 'DAYS'],
          ['--', 'HRS'],
          ['--', 'MIN'],
          ['--', 'SEC'],
        ]
      : diff > 0
        ? [
            [String(Math.floor(diff / 86400000)).padStart(2, '0'), 'DAYS'],
            [String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'), 'HRS'],
            [String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'), 'MIN'],
            [String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'), 'SEC'],
          ]
        : null

  const label = isLive
    ? 'BUILDFEST 2.0 IS LIVE — FOLLOW THE SCHEDULE'
    : isDone
      ? 'BUILDFEST 2.0 CONCLUDED — SEE YOU AT THE NEXT BUILD'
      : 'KICKOFF — 13 OCT · 10:00 AM IST'

  return (
    <div className={`countdown countdown-${variant}`} role="timer">
      <div className="countdown-head">
        <span className="countdown-pulse" />
        <span>{label}</span>
      </div>
      {units !== null && (
        <div className="countdown-units">
          {units.map(([value, unit]) => (
            <div className="countdown-unit" key={unit}>
              <b>{value}</b>
              <span>{unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
