'use client'

import { useState } from 'react'
import { CheckCircle2, Trash2 } from 'lucide-react'

const PROGRAMS = [
  'Preschool',
  'Learn to Skate',
  'Future Stars',
  'Power Skate',
  'Advanced & Competitive Training',
  'Adult',
]

const SESSION_TIMES = ['Saturday 10-11', 'Saturday 10-12', 'Saturday 11-12']

const SKILL_LEVELS = [
  'Preschool / First time on ice',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Competitive',
]

const labelCls = 'mb-1.5 block text-sm font-semibold text-navy'
const inputCls =
  'w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30'

function SkaterFields({ index, isAdult = false }: { index: number; isAdult?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelCls}>
          Full Name <span className="text-primary">*</span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            name={`skater_${index}_first`}
            className={inputCls}
            placeholder="First Name"
            aria-label="Skater first name"
          />
          <input
            required
            name={`skater_${index}_last`}
            className={inputCls}
            placeholder="Last Name"
            aria-label="Skater last name"
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>
          Date of Birth <span className="text-primary">*</span>
        </label>
        <input
          required
          type="date"
          name={`skater_${index}_dob`}
          className={inputCls}
        />
      </div>
      <div>
        <label className={labelCls}>
          Gender <span className="text-primary">*</span>
        </label>
        <select required name={`skater_${index}_gender`} className={inputCls} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option>Female</option>
          <option>Male</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>
          Skill Level <span className="text-primary">*</span>
        </label>
        <select required name={`skater_${index}_skill`} className={inputCls} defaultValue="">
          <option value="" disabled>
            Select Current Skill Level
          </option>
          {SKILL_LEVELS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {isAdult && (
        <>
          <div>
            <label className={labelCls}>
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              required
              type="email"
              name={`skater_${index}_email`}
              className={inputCls}
              placeholder="youremail@example.com"
              aria-label="Skater email address"
            />
          </div>
          <div>
            <label className={labelCls}>
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              required
              type="tel"
              name={`skater_${index}_phone`}
              className={inputCls}
              placeholder="123 456 7890"
              pattern="[0-9\s\-()]{10,}"
              title="Please enter a valid 10-digit phone number"
              aria-label="Skater phone number"
              onChange={(e) => {
                // Keep only digits
                const digits = e.target.value.replace(/\D/g, '')
                if (digits.length <= 10) {
                  e.target.setCustomValidity(digits.length === 10 ? '' : 'Phone number must be 10 digits')
                }
              }}
              onBlur={(e) => {
                const digits = e.target.value.replace(/\D/g, '')
                e.target.setCustomValidity(digits.length === 10 ? '' : 'Phone number must be 10 digits')
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export type RegistrationSelection = {
  program?: string
  time?: string
  session?: string
  dates?: string
  sessions?: string
  total?: string
  discount?: boolean
  adult?: boolean
}

export function RegistrationForm({
  selection,
}: {
  selection?: RegistrationSelection
}) {
  const isAdult = !!selection?.adult
  const hasSelection = !!selection?.program
  const minSkaters = 1
  
  // Early bird discount logic
  const earlyBirdDeadline = new Date('2026-08-10T00:00:00Z')
  const now = new Date()
  const isEarlyBirdActive = now < earlyBirdDeadline && !selection?.program?.toLowerCase().includes('ticket ice')
  
  // Calculate discounted price
  const getDiscountedPrice = (priceStr: string) => {
    if (!priceStr) return null
    const priceNum = parseFloat(priceStr.replace(/[$,]/g, ''))
    if (isNaN(priceNum)) return null
    const discounted = priceNum * 0.9 // 10% off
    return `$${discounted.toFixed(0)}`
  }
  
  const discountedTotal = isEarlyBirdActive ? getDiscountedPrice(selection?.total || '') : null
  
  const [skaterCount, setSkaterCount] = useState(minSkaters)
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) return
    setIsSubmitting(true)
    
    // Collect form data
    const formData = new FormData(e.currentTarget)
    const skaters: Record<string, string>[] = []
    const guardian: Record<string, string> = {}

    // Extract skater data
    for (let i = 0; i < skaterCount; i++) {
      const skater: Record<string, string> = {}
      const firstName = formData.get(`skater_${i}_first`) as string
      const lastName = formData.get(`skater_${i}_last`) as string
      const dob = formData.get(`skater_${i}_dob`) as string
      const gender = formData.get(`skater_${i}_gender`) as string
      const skillLevel = formData.get(`skater_${i}_skill`) as string

      // Validate all required fields are present
      if (firstName && lastName && dob && gender && skillLevel) {
        skater.first_name = firstName
        skater.last_name = lastName
        skater.dob = dob
        skater.gender = gender
        skater.skill_level = skillLevel
        skaters.push(skater)
      }
    }
    
    // Prevent submission if skaters are incomplete
    if (skaters.length === 0) {
      console.error('No complete skater information provided')
      setIsSubmitting(false)
      return
    }

    // Extract guardian data (if not adult program)
    if (!isAdult) {
      const guardianFirst = formData.get('guardian_first') as string
      const guardianLast = formData.get('guardian_last') as string
      const email = formData.get('email') as string
      const phone = formData.get('phone') as string
      const relationship = formData.get('relationship') as string

      // For Ticket Ice, email and phone are optional
      const isTicketIce = selection?.program?.toLowerCase().includes('ticket ice')
      
      // Validate required guardian fields
      if (guardianFirst && guardianLast && relationship && (isTicketIce || (email && phone))) {
        guardian.first_name = guardianFirst
        guardian.last_name = guardianLast
        guardian.email = email || ''
        guardian.phone = phone || ''
        guardian.relationship = relationship
      } else if (!isTicketIce) {
        // For non-Ticket Ice programs, guardian info is required
        console.error('Guardian information is incomplete')
        setIsSubmitting(false)
        return
      }
    }

    // Send to API
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program: selection?.program,
          session: selection?.session,
          dates: selection?.dates,
          total: selection?.total,
          skaters,
          guardian: Object.keys(guardian).length > 0 ? guardian : undefined,
        }),
      })

      if (!response.ok) {
        console.error('Failed to submit registration')
        setIsSubmitting(false)
        return
      }
      
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Submission error:', error)
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    const programSession = [
      selection?.program,
      selection?.session,
    ]
      .filter(Boolean)
      .join(' ')
    const confirmMessage = `Your registration form has been received for ${programSession || 'your program'}. Please proceed to payment`
    const isTicketIce = selection?.program?.toLowerCase().includes('ticket ice')
    const isPreschool = selection?.program?.toLowerCase().includes('preschool')
    
    let paymentLink = '#'
    let openInNewTab = false
    
    if (isPreschool) {
      paymentLink = 'https://square.link/u/hgJQ7rVv'
      openInNewTab = true
    } else if (isTicketIce) {
      paymentLink = 'https://book.squareup.com/appointments/hbcasks5hr7tm8/location/L2T2ADM103SVC/availability'
      openInNewTab = true
    } else if (selection?.program) {
      paymentLink = 'https://square.link/u/hgJQ7rVv'
      openInNewTab = true
    }

    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-navy">
          Registration Received!
        </h2>
        <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {confirmMessage}
        </p>
        <a
          href={paymentLink}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:brightness-95"
        >
          Pay Now
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      {/* Program summary */}
      {hasSelection && (
        <div className="mb-8 rounded-2xl border border-primary/20 bg-secondary/40 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Program
          </p>
          <p className="mt-1 font-serif text-lg font-bold text-navy">
            {selection?.program}
          </p>
          {selection?.time && (
            <p className="text-sm text-muted-foreground">{selection.time}</p>
          )}
          {(selection?.session || selection?.dates || selection?.sessions) && (
            <p className="text-sm text-muted-foreground">
              {[selection?.session, selection?.dates, selection?.sessions]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
          {selection?.total && (
            <div className="mt-4 space-y-3 border-t border-primary/20 pt-3">
              {isEarlyBirdActive && (
                <div className="rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary">
                  🎉 10% early bird discount, not including $40 admin fee
                </div>
              )}
              {isEarlyBirdActive && discountedTotal ? (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Original: <span className="line-through">{selection.total}</span>
                  </p>
                  <p className="text-lg font-bold text-navy">
                    Early Bird Total: {discountedTotal}
                  </p>
                </div>
              ) : (
                <p className="text-base font-bold text-navy">
                  Total: {selection.total}
                </p>
              )}
            </div>
          )}
          <input type="hidden" name="program_summary" value={selection?.program ?? ''} />
          <input type="hidden" name="session_summary" value={`${selection?.session ?? ''} ${selection?.dates ?? ''} ${selection?.sessions ?? ''}`.trim()} />
          <input type="hidden" name="total_summary" value={selection?.total ?? ''} />
        </div>
      )}

      {/* Skater information */}
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-wider text-primary">
          Skater Information
        </legend>
        <div className="mt-4 space-y-6">
          {Array.from({ length: skaterCount }).map((_, i) => {
            const boxed = i > 0
            const label = `Skater ${i + 1}`
            const removable = i >= minSkaters
            return (
              <div
                key={i}
                className={
                  boxed
                    ? 'relative rounded-2xl border border-dashed border-border p-5 pt-8'
                    : ''
                }
              >
                {boxed && (
                  <span className="absolute left-4 top-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                )}
                {removable && (
                  <button
                    type="button"
                    onClick={() => setSkaterCount((c) => c - 1)}
                    className="absolute right-3 top-2.5 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                )}
                <SkaterFields index={i} isAdult={isAdult} />
              </div>
            )
          })}
        </div>
      </fieldset>

      {/* Parent / guardian */}
      {!isAdult && (
      <fieldset className="mt-10">
        <legend className="text-xs font-bold uppercase tracking-wider text-primary">
          Parent / Guardian Information
          {selection?.program?.toLowerCase().includes('ticket ice') && (
            <span className="ml-2 text-xs font-normal text-destructive">
              [required only for skaters under 18]
            </span>
          )}
        </legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Full Name{' '}
              {!selection?.program?.toLowerCase().includes('ticket ice') && (
                <span className="text-primary">*</span>
              )}
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required={!selection?.program?.toLowerCase().includes('ticket ice')}
                name="guardian_first"
                className={inputCls}
                placeholder="First Name"
                aria-label="Guardian first name"
              />
              <input
                required={!selection?.program?.toLowerCase().includes('ticket ice')}
                name="guardian_last"
                className={inputCls}
                placeholder="Last Name"
                aria-label="Guardian last name"
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>
              Email Address{' '}
              {!selection?.program?.toLowerCase().includes('ticket ice') && (
                <span className="text-primary">*</span>
              )}
            </label>
            <input
              required={!selection?.program?.toLowerCase().includes('ticket ice')}
              type="email"
              name="email"
              className={inputCls}
              placeholder="youremail@example.com"
            />
          </div>
          <div>
            <label className={labelCls}>
              Phone Number{' '}
              {!selection?.program?.toLowerCase().includes('ticket ice') && (
                <span className="text-primary">*</span>
              )}
            </label>
            <input
              required={!selection?.program?.toLowerCase().includes('ticket ice')}
              type="tel"
              name="phone"
              className={inputCls}
              placeholder="123 456 7890"
              pattern="[0-9\s\-()]{10,}"
              title="Please enter a valid 10-digit phone number"
              onChange={(e) => {
                // Keep only digits
                const digits = e.target.value.replace(/\D/g, '')
                if (digits.length <= 10) {
                  e.target.setCustomValidity(digits.length === 10 ? '' : 'Phone number must be 10 digits')
                }
              }}
              onBlur={(e) => {
                const digits = e.target.value.replace(/\D/g, '')
                e.target.setCustomValidity(digits.length === 10 ? '' : 'Phone number must be 10 digits')
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Relationship to Skater{' '}
              {!selection?.program?.toLowerCase().includes('ticket ice') && (
                <span className="text-primary">*</span>
              )}
            </label>
            <select name="relationship" required={!selection?.program?.toLowerCase().includes('ticket ice')} className={inputCls} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option>Parent</option>
              <option>Guardian</option>
              <option>Self (adult skater)</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </fieldset>
      )}

      {/* Program preferences */}
      {!hasSelection && (
      <fieldset className="mt-10">
        <legend className="text-xs font-bold uppercase tracking-wider text-primary">
          Program Preferences
        </legend>
        <div className="mt-4">
          <p className={labelCls}>
            Program <span className="text-primary">*</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {PROGRAMS.map((p) => (
              <label
                key={p}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <input
                  type="checkbox"
                  name="program"
                  value={p}
                  className="h-4 w-4 accent-primary"
                />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className={labelCls}>Preferred Session Time</p>
          <div className="flex flex-wrap gap-2.5">
            {SESSION_TIMES.map((t) => (
              <label
                key={t}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <input
                  type="checkbox"
                  name="session_time"
                  value={t}
                  className="h-4 w-4 accent-primary"
                />
                {t}
              </label>
            ))}
          </div>
        </div>
      </fieldset>
      )}

      {/* Waiver */}
      <fieldset className="mt-10">
        <legend className="text-xs font-bold uppercase tracking-wider text-primary">
          Waiver
        </legend>
        <p className="mt-2 text-sm font-semibold text-navy">
          Ice Works Skate Academy — Assumption of Risk and Waiver. Please read
          carefully.
        </p>
        <div className="mt-3 h-64 space-y-4 overflow-y-auto rounded-2xl border border-border bg-secondary/40 p-5 text-xs leading-relaxed text-muted-foreground">
          <p>
            <span className="font-bold text-navy">
              1. ACKNOWLEDGMENT OF INHERENT RISK
            </span>{' '}
            I understand that participation in skating, figure skating, and any
            other sporting activities listed in the enclosed appendix (hereinafter
            the &ldquo;Sports Activity&rdquo;) is voluntary, and involves inherent
            risk during participation, including the risk of possible accidents,
            physical injury, or exposure to the COVID-19 virus or other infections
            or infectious diseases as a result of attending training, club events
            or competitive events. I freely accept and fully assume all such
            risks, dangers and hazards, including but not limited to personal
            injury, disease transmission, death, property damage or loss,
            resulting from my participation. I have carefully considered the risks
            involved, and I have full confidence that reasonable precautions will
            be taken to ensure the safety and well-being of myself (or my
            son/daughter/ward).
          </p>
          <p>
            <span className="font-bold text-navy">2. WAIVER</span> I do for myself
            (or my child), and our respective heirs, executors, administrators,
            successors and assigns, hereby waive, release, and forever discharge
            Ice Works Skate Academy, their officers, partners, agents, employees,
            servants, representatives, volunteers, coaches, officials, successors
            and assigns (the &ldquo;Representatives&rdquo;) of and from any
            actions, causes of action, complaints, demands and claims or any
            recourse whatsoever (&ldquo;Claims&rdquo;) that I have or may have in
            the future in any way connected with my (or my child&apos;s)
            participation in the Sports Activity contemplated herein, whether in
            law or in equity, in respect of personal injury, illness or disease
            transmission, loss of life, or property damage of any kind or nature,
            and I do hereby discharge the Representatives from any such liability.
            This includes negligence, breach of contract or breach of any
            statutory or other duty of care.
          </p>
          <p>
            <span className="font-bold text-navy">3. INDEMNIFICATION</span> I
            further agree to fully indemnify and defend Ice Works Skate Academy
            and any of their Representatives from and against any and all Claims
            brought against Ice Works Skate Academy and any of their
            Representatives, including all related costs and expenses, and against
            any loss, costs, damages, or expenses which Ice Works Skate Academy
            and any of their Representatives may sustain, suffer, incur, or be
            liable for resulting from, arising from, or in any way related to my
            (or my son/daughter/ward&apos;s) participation in the Sports Activity.
            I also agree and undertake not to make any claim or take any
            proceedings against the Representatives set out above, or any other
            person or corporation which might claim contribution or indemnity
            under the provisions of any statute or otherwise from the
            Representatives set out above.
          </p>
          <p>
            <span className="font-bold text-navy">4. SEVERABILITY</span> The
            provisions of this Assumption of Risk and Waiver shall be deemed
            severable and if any provision or portion thereof is held invalid,
            illegal or unenforceable for any reason, the remainder shall not
            thereby be invalidated, but shall remain in full force and effect.
            Acknowledgement: I am aware of the nature and effect of this
            Assumption of Risk and Waiver and I fully understand all of the terms
            and conditions above. I understand that I have given up substantial
            rights by signing this Assumption of Risk and Waiver and I am signing
            it freely and voluntarily without inducement. Parent/Guardian: I
            certify that I am the parent or legal guardian of the participant
            named below and that I am entitled to his or her custody and control.
            I understand the aforesaid inherent risks that could arise from these
            activities, I grant permission for my son/daughter/ward to participate
            in the Sports Activity and other activities incidental thereto and I
            execute this Assumption of Risk and Waiver on behalf of myself and my
            son/daughter/ward.
          </p>
        </div>
      </fieldset>

      {/* Agreement + submit */}
      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary"
            required
          />
          <span>
            I have read and agree to the{' '}
            <span className="font-semibold text-primary">
              program policies and terms
            </span>{' '}
            and the Assumption of Risk and Waiver above.
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed || isSubmitting}
          className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </button>
      </div>
    </form>
  )
}
