import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, CalendarDays, MapPin, Info } from 'lucide-react'

export const metadata = {
  title: 'Programs | Ice Works Skating Academy',
  description:
    'Skating lessons in Richmond Hill for all ages and skill levels at Elvis Stojko Arena. Preschool, Learn to Skate, Figure Skating, Power Skate, Adult, Ticket Ice, and Off Ice Training programs. Fall 2026 registration open.',
}

type Program = {
  name: string
  icon: string
  points: string[]
}

const programsList: Program[] = [
  {
    name: 'Preschool',
    icon: 'preschool',
    points: [
      'Children ages 3–5',
      'A first introduction to skating. Skaters learn to get up by themselves, move forwards and backwards across the ice, and slow down and stop.',
      'Skaters are required to wear a CSA-approved helmet.',
    ],
  },
  {
    name: 'Learn to Skate',
    icon: 'learn-to-skate',
    points: [
      'Children ages 5–11',
      'Teenagers 12–16',
      'For beginners learning balance, confidence, and basic skating skills, skate forward, backward, turn and stopping techniques',
      'Skaters are required to wear a CSA-approved helmet.',
    ],
  },
  {
    name: 'Figure Skating',
    icon: 'figure-skating',
    points: [
      'STAR 1 to 5, STAR 6 to Gold',
      'Edge development, learn jumps, spins, dance and creative movement',
    ],
  },
  {
    name: 'Power Skate',
    icon: 'power-skate',
    points: [
      'For hockey and ringette players to improve their speed, agility, edge control, balance and performance',
      'Develop foundational skating skills with targeted drills',
    ],
  },
  {
    name: 'Adults',
    icon: 'adults',
    points: [
      '18+ group lessons from beginner to advanced',
      'Learn to skate or return to skating at any age',
    ],
  },
  {
    name: 'Ticket Ice',
    icon: 'ticket-ice',
    points: [
      'Ice time for open practice',
    ],
  },
  {
    name: 'Off Ice Training',
    icon: 'off-ice',
    points: [
      'Improve your jump technique, lines, strength, flexibility and creative expression',
      'Improve your endurance and form on the ice with off ice training',
    ],
  },
  {
    name: 'Private Lessons',
    icon: 'ticket-ice',
    points: [
      'Book a private lesson with one of our coaches for one on one lesson time',
    ],
  },
]

type ScheduleRow = {
  program: string
  time: string
  fall: string
  winter: string
  fullSeason: string
  note?: string
  isDiscount?: boolean
}

const schedule: ScheduleRow[] = [
  {
    program: 'Preschool',
    time: 'Saturday 10:00–10:45 AM',
    fall: '12 sessions • $468',
    winter: '13 sessions • $507',
    fullSeason: '25 sessions • $975',
  },
  {
    program: 'Learn to Skate (Levels 1–3)',
    time: 'Saturday 10:00 AM–12:00 PM',
    fall: '12 sessions • $552',
    winter: '13 sessions • $598',
    fullSeason: '25 sessions • $1,150',
  },
  {
    program: 'Learn to Skate (Levels 4–6)',
    time: 'Saturday 10:00 AM–12:00 PM',
    fall: '12 sessions • $552',
    winter: '13 sessions • $598',
    fullSeason: '25 sessions • $1,150',
  },
  {
    program: 'Figure Skating',
    time: 'Saturday 10:00–11:00 AM or 11:00 AM–12:00 PM',
    fall: '12 sessions • $528',
    winter: '13 sessions • $572',
    fullSeason: '25 sessions • $1,050',
    note: 'Off ice training recommended',
  },
  {
    program: 'Figure Skating, 2 Hours',
    time: 'Saturday 10:00 AM–12:00 PM',
    fall: '12 sessions • $1,056',
    winter: '13 sessions • $1,144',
    fullSeason: '25 sessions • $2,200',
    note: 'Off ice training recommended',
  },
  {
    program: 'Off Ice',
    time: 'Saturday 12:15–1:00 PM',
    fall: '12 sessions • $240',
    winter: '13 sessions • $260',
    fullSeason: '25 sessions • $450',
  },
  {
    program: 'Adult',
    time: 'Saturday 10:00–11:00 AM or 11:00 AM–12:00 PM',
    fall: '12 sessions • $576',
    winter: '13 sessions • $624',
    fullSeason: '25 sessions • $1,200',
  },
  {
    program: 'Power Skating',
    time: 'Saturday 10:00–11:00 AM',
    fall: '12 sessions • $600',
    winter: '13 sessions • $650',
    fullSeason: '25 sessions • $1,250',
  },
  {
    program: 'Private Lessons',
    time: 'Saturday 10:00–11:00 AM or 11:00 AM–12:00 PM',
    fall: '12 sessions • $1,400',
    winter: '13 sessions • $1,560',
    fullSeason: '25 sessions • $2,960',
  },
  {
    program: 'Semi-Private',
    time: 'Saturday 10:00–11:00 AM or 11:00 AM–12:00 PM',
    fall: '12 sessions • $840',
    winter: '13 sessions • $910',
    fullSeason: '25 sessions • $1,750',
  },
  {
    program: 'Ticket Ice',
    time: 'Saturday 10:00–11:00 AM or 11:00 AM–12:00 PM',
    fall: '$30/hour',
    winter: '$30/hour',
    fullSeason: '25-hour package • $625',
  },
]

type SessionKey = 'fall' | 'winter' | 'fullSeason'

const SESSION_META: Record<SessionKey, { label: string; dates: string }> = {
  fall: { label: 'Fall Session', dates: 'Oct 3 – Dec 19' },
  winter: { label: 'Winter Session', dates: 'Jan 9 – Apr 24' },
  fullSeason: { label: 'Full Season', dates: 'Oct 3 – Apr 24' },
}

function parseDetail(detail: string) {
  const parts = detail.split('•').map((s) => s.trim())
  if (parts.length === 2) return { sessions: parts[0], total: parts[1] }
  return { sessions: '', total: parts[0] }
}

function buildRegisterHref(row: ScheduleRow, sessionKey: SessionKey) {
  const meta = SESSION_META[sessionKey]
  const { sessions, total } = parseDetail(row[sessionKey])
  
  const params = new URLSearchParams()
  params.set('program', row.program)
  if (row.time) params.set('time', row.time)
  params.set('session', meta.label)
  params.set('dates', meta.dates)
  if (sessions) params.set('sessions', sessions)
  if (total) params.set('total', total)
  if (row.program.toLowerCase().includes('adult')) params.set('adult', '1')
  return `/register?${params.toString()}`
}

function RegisterButton({
  row,
  sessionKey,
}: {
  row: ScheduleRow
  sessionKey: SessionKey
}) {
  return (
    <Link
      href={buildRegisterHref(row, sessionKey)}
      className="mt-2 inline-flex w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
    >
      Register
    </Link>
  )
}

type ImportantInfo = {
  label: string
  value: string
}

const importantInfo: ImportantInfo[] = [
  {
    label: 'Season Dates',
    value: 'Fall: October 3 – December 19 • Winter: January 9 – April 24',
  },
  {
    label: 'No Classes',
    value: 'January 30, March 27, and April 10, 2027',
  },
  {
    label: 'Administration Fee',
    value: '$40 (applies to all registrations)',
  },
]

const policies = [
  'If you join after the first lesson of the season has started, prices are prorated after the first class.',
  'We cannot offer makeups for missed lessons.',
    'If you wish to withdraw one week before the start of the season, we will refund the program fees, less a $40 administration fee.',
  'After the one week before the start of the season, we can offer no refunds.',
]

type EquipmentItem = {
  text: string
  url?: string
  linkText?: string
}

const equipment: EquipmentItem[] = [
  {
    text: 'There are no rentals, please bring your own skates and CSA-approved helmet.',
  },
  {
    text: 'We recommend ',
    linkText: 'Figure Skating Boutique',
    url: 'https://skatingboutique.com/?utm_source=google&utm_medium=local&utm_campaign=1&utm_content=primary',
  },
  {
    text: 'For a complete guide on buying ice skates, check this ',
    linkText: 'guide',
    url: 'https://ice.riedellskates.com/Learn-More/Skate-Recommendations/Buying-Guide?srsltid=AfmBOoqG6aIzTEBisGl_8c5ejOVAE4H6i7-gUTk_Trlbz2bGAPNc3uiE',
  },
]

export default function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Registration Open
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
            Programs
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Our expert, national-level coaching team is here to support you, whether you&apos;re just starting out or looking to take your skating to the next level, or performing in shows and competitions.
          </p>
          <div className="mt-6 rounded-2xl border border-primary/20 bg-card p-5">
            <p className="font-bold text-navy">
              Register now before August 10th, 2026 for the early bird discount of 10%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We have small class sizes to provide a personalized, engaging experience for your child. Coaches tailor lessons to each student&apos;s needs.
            </p>
            <a
              href="#program-schedule"
              className="mt-4 inline-block rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {programsList.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={`/images/icons/${p.icon}.png`}
                  alt={p.name}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <h2 className="font-serif text-2xl font-bold text-navy">
                  {p.name}
                </h2>
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {p.points.map((pt, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#program-schedule"
                className="mt-5 inline-block self-start rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-accent"
              >
                View Schedule
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="bg-secondary/60 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold text-navy">Schedule</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-bold text-navy">Elvis Stojko Rink</p>
                <p className="text-sm text-muted-foreground">
                  Richmond Hill · 350 16th Ave
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-bold text-navy">
                  12 sessions · October 3 – December 19, 2026
                </p>
                <p className="text-sm text-muted-foreground">
                  Saturdays 10–12 · 1-hour class or 2-hour class
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Schedule & Fees */}
      <section id="program-schedule" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-serif text-3xl font-bold text-navy">Program Schedule</h2>
        
        {/* Early Bird Banner */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 text-center sm:p-6">
          <p className="font-bold text-primary-foreground">
            📅 Register before August 10 and save 10%!
          </p>
          <p className="mt-1 text-sm text-primary-foreground/90">
            Early Bird Discount applies to tuition only (does not include the $40 administration fee)
          </p>
        </div>

        {/* Important Information */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {importantInfo.map((info) => (
            <div key={info.label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {info.label}
              </p>
              <p className="mt-2 text-sm font-medium text-navy">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Schedule Table - Desktop */}
        <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-border md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-navy text-primary-foreground">
                <th className="px-4 py-3 font-bold">Program</th>
                <th className="px-4 py-3 font-bold">Time</th>
                <th className="px-4 py-3 font-bold">Fall Session (Oct 3–Dec 19)</th>
                <th className="px-4 py-3 font-bold">Winter Session (Jan 9–Apr 24)</th>
                <th className="px-4 py-3 font-bold">Full Season</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr
                  key={`${row.program}-${i}`}
                  className={row.isDiscount ? 'bg-primary/5' : i % 2 === 0 ? 'bg-card' : 'bg-secondary/40'}
                >
                  <td className="px-4 py-3">
                    {row.isDiscount ? (
                      <span className="text-sm font-medium italic text-primary">{row.program}</span>
                    ) : (
                      <span className="font-semibold text-navy">
                        {row.program}
                        {row.note && (
                          <span className="mt-0.5 block text-xs font-normal italic text-primary">{row.note}</span>
                        )}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{row.time}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex flex-col">
                      <span>{row.fall}</span>
                      <RegisterButton row={row} sessionKey="fall" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex flex-col">
                      <span>{row.winter}</span>
                      <RegisterButton row={row} sessionKey="winter" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex flex-col">
                      <span>
                        {row.fullSeason}
                        {row.isDiscount && row.note && (
                          <span className="ml-2 text-xs italic text-primary">({row.note})</span>
                        )}
                      </span>
                      <RegisterButton row={row} sessionKey="fullSeason" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Schedule Cards - Mobile */}
        <div className="mt-8 space-y-4 md:hidden">
          {schedule.map((row, i) => (
            <div key={`${row.program}-${i}`} className={row.isDiscount ? 'rounded-lg border border-primary/30 bg-primary/5 p-4' : 'rounded-lg border border-border bg-card p-4'}>
              <h3 className={row.isDiscount ? 'text-sm font-medium italic text-primary' : 'font-semibold text-navy'}>{row.program}</h3>
              {row.note && <p className="mt-0.5 text-xs italic text-primary">{row.note}</p>}
              {row.time && <p className="mt-1 text-xs text-muted-foreground">{row.time}</p>}
              <div className="mt-3 space-y-3 border-t border-border pt-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary">Fall (Oct 3–Dec 19)</p>
                    <p className="text-sm text-navy">{row.fall}</p>
                  </div>
                  <RegisterButton row={row} sessionKey="fall" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary">Winter (Jan 9–Apr 24)</p>
                    <p className="text-sm text-navy">{row.winter}</p>
                  </div>
                  <RegisterButton row={row} sessionKey="winter" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary">Full Season</p>
                    <p className="text-sm text-navy">{row.fullSeason}</p>
                  </div>
                  <RegisterButton row={row} sessionKey="fullSeason" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Policies Card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-primary">
              <Info className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold text-navy">
                Policies
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {policies.map((pol, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                  <span>{pol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment Card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-primary">
              <Info className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold text-navy">
                Equipment
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {equipment.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                  <span>
                    {item.text}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:opacity-80"
                      >
                        {item.linkText}
                      </a>
                    )}
                    {item.url && item.linkText === 'guide' && ' to understand which skates to purchase for each skill level, usage type, and price ranges.'}
                    {item.url && item.linkText === 'Figure Skating Boutique' && ' in Thornhill, Ontario.'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#program-schedule"
            className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03]"
          >
            Register Now
          </a>
        </div>
      </section>
    </>
  )
}
