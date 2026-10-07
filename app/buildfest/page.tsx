import type { Metadata } from 'next'
import BuildfestView from '@/components/buildfest-view'

export const metadata: Metadata = {
  title: 'Buildfest 2.0 — ARMSS · 13–15 Oct 2026 · GNDU Amritsar',
  description:
    'Buildfest 2.0 by ARMSS — a three-day Hackathon (₹10,000 prize pool), campus Treasure Hunt and BGMI E-Sports tournament at GNDU Amritsar, 13–15 October 2026. Register now.',
  openGraph: {
    title: 'Buildfest 2.0 — ARMSS · 13–15 Oct 2026',
    description:
      'Hackathon · Treasure Hunt · BGMI E-Sports. ₹10,000 prize pool. 13–15 October 2026 at GNDU Amritsar. Register now.',
    type: 'website',
  },
}

export default function BuildfestPage() {
  return <BuildfestView />
}
