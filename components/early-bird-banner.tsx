'use client'

import { isEarlyBirdActive } from '@/lib/early-bird'

export function EarlyBirdBanner() {
  // Only show banner if current date is before Aug 10, 2026
  if (!isEarlyBirdActive()) {
    return null
  }
  
  return (
    <div className="sticky top-0 z-40 w-full bg-primary px-3 py-2 text-center text-sm font-bold text-primary-foreground sm:px-4 sm:py-3 sm:text-base">
      Early bird 10% discount before Aug 10, 2026
    </div>
  )
}
