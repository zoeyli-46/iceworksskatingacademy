export function isEarlyBirdActive(): boolean {
  // November 2, 2026 at 12:00 AM Eastern Standard Time (UTC−5)
  const earlyBirdDeadline = new Date('2026-11-02T05:00:00Z')
  const now = new Date()
  return now < earlyBirdDeadline
}
