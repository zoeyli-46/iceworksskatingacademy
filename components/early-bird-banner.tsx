export function EarlyBirdBanner() {
  const earlyBirdDeadline = new Date('2026-08-10T00:00:00Z')
  const now = new Date()
  
  // Only show banner if current date is before Aug 10, 2026
  if (now >= earlyBirdDeadline) {
    return null
  }
  
  return (
    <div className="sticky top-0 z-40 w-full bg-primary px-4 py-3 text-center font-bold text-primary-foreground">
      Early bird 10% discount before Aug 10, 2026
    </div>
  )
}
