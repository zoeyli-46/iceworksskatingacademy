'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 glass md:top-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/nav-logo.png"
            alt="Ice Works Skating Academy logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-bold text-navy">
              Ice Works
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Skating Academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80 hover:bg-secondary hover:text-secondary-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/programs"
            className="ml-2 rounded-full bg-ice px-5 py-2 text-sm font-bold text-ice-foreground shadow-sm transition-transform hover:scale-[1.03]"
          >
            Register Now
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border/70 glass md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-secondary',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/programs"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-ice px-4 py-2.5 text-center text-sm font-bold text-ice-foreground"
            >
              Register Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
