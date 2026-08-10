'use client'

import { isEarlyBirdActive } from '@/lib/early-bird'

export function EarlyBirdBanner() {
  // Only show banner before November 2, 2026 at 12:00 AM EST
  if (!isEarlyBirdActive()) {
    return null
  }
  
  return (
    <div className="sticky top-0 z-40 w-full bg-primary px-3 py-2 text-center text-sm font-bold text-primary-foreground sm:px-4 sm:py-3 sm:text-base">
      <div>{'🎓 Fall 2026 lessons registration open now'}</div>
      <div>{'🎉 Early bird discount on for January 2027 lessons: Save 10% if you sign up by Nov 2'}</div>
    </div>
  )
}
