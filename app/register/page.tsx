import type { Metadata } from 'next'
import { RegistrationForm } from '@/components/registration-form'
import {
  Award,
  CalendarDays,
  Heart,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Registration Form | Ice Works Skating Academy',
  description:
    'Register for Ice Works Skating Academy Fall 2026 skating lessons in Richmond Hill. 12 sessions, October 3 – December 19, 2026. Spots are limited.',
}

const highlights = [
  { icon: Award, text: 'National level coaches' },
  { icon: Star, text: 'Programs for all ages and skill levels' },
  { icon: Heart, text: 'Focus on skill development, discipline, and fun' },
  { icon: Trophy, text: 'Opportunities to participate in shows and competitions' },
]

function str(v: string | string[] | undefined) {
  return typeof v === 'string' ? v : undefined
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const selection = {
    program: str(sp.program),
    time: str(sp.time),
    session: str(sp.session),
    dates: str(sp.dates),
    sessions: str(sp.sessions),
    total: str(sp.total),
    discount: sp.discount === '1',
    adult: sp.adult === '1',
  }

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Learn. Glide. Dream.
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
            Registration Form
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Join our figure skating program and build skills, confidence, and a
            lifelong love for the ice. Please fill out the form below to register.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-navy">
                Program Highlights
              </h2>
              <ul className="mt-4 space-y-4">
                {highlights.map((h) => (
                  <li key={h.text} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      <h.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {h.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <RegistrationForm selection={selection} />
        </div>
      </section>
    </>
  )
}
