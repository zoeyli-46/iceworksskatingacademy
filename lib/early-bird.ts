export function isEarlyBirdActive(): boolean {
  const earlyBirdDeadline = new Date('2026-08-10T00:00:00Z')
  const now = new Date()
  return now < earlyBirdDeadline
}
