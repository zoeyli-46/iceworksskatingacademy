import { Mail, MapPin, Phone, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | Ice Works Skating Academy',
  description:
    'Contact Ice Works Skating Academy at the Elvis Stojko Arena, 350 16th Ave, Richmond Hill, ON. Call 416-476-8896 or email iceworksskatingacademy@gmail.com.',
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Get in Touch
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6 text-pretty leading-relaxed text-muted-foreground">
            <p>
              We are in Richmond Hill at the Elvis Stojko Arena, located at{' '}
              <span className="font-semibold text-navy">
                350 16th Ave, Richmond Hill, ON L4C 7A9
              </span>
              .
            </p>
            <p>
              Our expert coaching team is here to support you, whether
              you&apos;re just starting out or looking to take your skating to
              the next level.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="tel:14164768896"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-secondary"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-navy">Call Us</p>
                <p className="text-sm text-muted-foreground">416-476-8896</p>
              </div>
            </a>

            <a
              href="mailto:iceworksskatingacademy@gmail.com"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-secondary"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-navy">Email Us</p>
                <p className="break-all text-sm text-muted-foreground">
                  iceworksskatingacademy@gmail.com
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-navy">Visit Us</p>
                <p className="text-sm text-muted-foreground">
                  Ice Works Skating Academy
                  <br />
                  350 16th Ave, Richmond Hill, ON L4C 7A9
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border shadow-sm">
          <iframe
            title="Map to Elvis Stojko Arena, Richmond Hill"
            src="https://www.google.com/maps?q=Elvis+Stojko+Arena,+350+16th+Ave,+Richmond+Hill,+ON+L4C+7A9&output=embed"
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
