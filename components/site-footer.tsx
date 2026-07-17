import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-border bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/ice-works-logo.png"
              alt="Ice Works Skating Academy logo"
              width={56}
              height={56}
              className="h-12 w-12 rounded-full object-cover ring-1 ring-white/20"
            />
            <div className="leading-tight">
              <p className="font-serif text-lg font-bold">Ice Works</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Skating Academy
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Director Janis Coyle{' '}
            <span className="text-white/40">|</span> National Skating Coach
          </p>
          <p className="mt-2 text-sm italic text-white/60">
            Building Confidence. Developing Champions.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white">Programs</Link>
            </li>
            <li>
              <Link href="/coaches" className="hover:text-white">Coaches</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white">Register Now</Link>
            </li>
            <li>
              <Link href="/general-policy" className="hover:text-white">General policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ice" />
              <span>Elvis Stojko Arena, 350 16th Ave, Richmond Hill, ON L4C 7A9</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-ice" />
              <a href="tel:14164768896" className="hover:text-white">
                416-476-8896
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-ice" />
              <a
                href="mailto:iceworksskatingacademy@gmail.com"
                className="break-all hover:text-white"
              >
                iceworksskatingacademy@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row md:px-6">
          <p>
            &copy; {new Date().getFullYear()} Ice Works Skating Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
