import Link from 'next/link'
import Image from 'next/image'

const programs = [
  {
    name: 'Preschool',
    icon: 'preschool',
    description: 'A fun, supportive program with learning tools for preschoolers',
  },
  {
    name: 'Learn to Skate',
    icon: 'learn-to-skate',
    description: 'Development of skating skills from Beginners to Intermediate levels',
  },
  {
    name: 'Figure Skating',
    icon: 'figure-skating',
    description: 'STAR 1 to 5, STAR 6 to Gold. Edge development, learn jumps, spins, dance and creative movement',
  },
  {
    name: 'Power Skate',
    icon: 'power-skate',
    description:
      'Edge development, control, balance and coordination for skaters with some experience',
  },
  {
    name: 'Adults',
    icon: 'adults',
    description: 'Beginner to Advanced',
  },
  {
    name: 'Ticket Ice',
    icon: 'ticket-ice',
    description: 'Flexible ice time offered for open practice or private coaching',
  },
  {
    name: 'Off Ice Training',
    icon: 'off-ice',
    description: 'Improve your jump technique • Improve lines, strength and flexibility',
  },
]

const benefits = [
  {
    title: 'Experienced Coach',
    points: [
      'Coaching skaters of all ages and abilities',
      'Programs for Learn to Skate, Figure Skating, Skills, Dance, Power Skating, and more',
      'Supporting skaters every step of the way—on and off the ice',
    ],
  },
  {
    title: 'Social Worker Special Needs',
    points: [
      'Extensive experience working with children and individuals with special needs',
      'Compassionate, patient and inclusive approach',
      'Creating a supportive environment where every skater belongs',
    ],
  },
  {
    title: 'Committed To Your Success',
    points: [
      'Developing strong skills, confidence and character',
      'Goal setting and motivation',
      'Positive coaching that inspires a lifelong love of skating',
    ],
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-bg-sparkle.png)' }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-2xl">
            <Image
              src="/images/director-logo.png"
              alt="Ice Works Skating Academy. Director Janis Coyle | National Skating Coach"
              width={500}
              height={140}
              className="h-auto w-full max-w-md"
            />
            <div className="mt-4">
              <div
                className="relative inline-block px-8 py-4"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
                  backgroundColor: 'rgba(227, 238, 247, 0.65)',
                }}
              >
                <p className="text-2xl text-navy/80">
                  Skating lessons in Richmond Hill
                </p>
                <p className="mt-1 text-2xl font-bold text-navy">
                  FALL 2026 REGISTRATION IS OPEN
                </p>
              </div>
            </div>


            <div className="mt-6">
              <Link
                href="/programs"
                className="inline-block rounded bg-navy px-6 py-2 text-lg font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                Register for Fall 2026
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white/50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-navy">
              Programs
            </h2>
            <p className="mt-2 text-sm text-navy/70">
              Skating lessons in Richmond Hill for all ages and skill levels at Elvis Stojko Arena | Fall 2026. Early Bird discount before August 1st.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center text-center justify-between"
              >
                <div>
                  <div className="mb-4">
                    <Image
                      src={`/images/icons/${p.icon}.png`}
                      alt={p.name}
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="font-bold text-navy">
                    {p.name.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-sm text-navy/70">
                    {p.description}
                  </p>
                </div>
                <Link
                  href="/programs"
                  className="mt-4 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Schedule
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Now Section */}
      <section className="relative overflow-hidden px-4 py-32 md:px-6 md:py-48">
        <div
          className="absolute inset-0 bg-cover bg-left bg-no-repeat"
          style={{ backgroundImage: 'url(/images/register-bg.png)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-bold text-navy md:text-5xl">
              Register Now
            </h2>
            <p className="mt-4 text-base font-semibold text-navy">
              Fall Session
            </p>
            <p className="text-base text-navy">
              October 3 - December 19, 2026
            </p>
            <p className="mt-4 text-sm text-navy/90">
              Register now before August 1 for early bird discount
            </p>
            <div className="mt-6">
              <Link
                href="/programs"
                className="inline-block rounded bg-navy px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                Register for Fall 2026
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title}>
                <h3 className="font-bold uppercase text-navy">
                  {b.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-navy/70">
                  {b.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-navy" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="relative overflow-hidden px-4 py-16 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy/95" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/10">
                <span className="text-center text-xs font-semibold text-white/50">
                  Profile picture
                </span>
              </div>
            </div>
            <div className="text-white">
              <h2 className="font-serif text-4xl font-bold">
                The Director
              </h2>
              <p className="mt-2 text-lg font-bold text-ice">
                Janis Coyle | National Skating Coach
              </p>
              <p className="mt-4 leading-relaxed text-white/90">
                Over 50 years of coaching experience developing skaters from beginners through competitive levels with a commitment to excellence, confidence, and enjoyment of skating.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
