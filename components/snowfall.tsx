'use client'

import { Snowflake } from 'lucide-react'

// Deterministic flake config so server and client markup match (no hydration mismatch).
const FLAKES = [
  { left: 4, size: 14, duration: 14, delay: 0, drift: 24, opacity: 0.5 },
  { left: 12, size: 10, duration: 18, delay: 3, drift: -18, opacity: 0.35 },
  { left: 20, size: 18, duration: 12, delay: 1.5, drift: 30, opacity: 0.6 },
  { left: 28, size: 12, duration: 20, delay: 5, drift: -26, opacity: 0.4 },
  { left: 37, size: 16, duration: 15, delay: 2, drift: 20, opacity: 0.55 },
  { left: 45, size: 9, duration: 22, delay: 6, drift: -14, opacity: 0.3 },
  { left: 54, size: 20, duration: 13, delay: 0.5, drift: 34, opacity: 0.65 },
  { left: 62, size: 12, duration: 19, delay: 4, drift: -22, opacity: 0.4 },
  { left: 70, size: 15, duration: 16, delay: 2.5, drift: 26, opacity: 0.5 },
  { left: 78, size: 10, duration: 21, delay: 7, drift: -16, opacity: 0.35 },
  { left: 86, size: 18, duration: 14, delay: 1, drift: 28, opacity: 0.6 },
  { left: 93, size: 11, duration: 18, delay: 3.5, drift: -20, opacity: 0.4 },
]

export function Snowfall() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {FLAKES.map((f, i) => (
        <Snowflake
          key={i}
          className="animate-fall absolute -top-10 text-ice"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            // custom props consumed by the @keyframes fall
            ['--drift' as string]: `${f.drift}px`,
            ['--flake-opacity' as string]: f.opacity,
          }}
        />
      ))}
    </div>
  )
}
