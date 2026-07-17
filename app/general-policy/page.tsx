import { FileText, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'General Policy | Ice Works Skating Academy',
  description:
    'Rules and regulations for Ice Works Skating Academy in Richmond Hill, including acknowledgment of policies, liability disclaimer, class cancellations and refunds, parental responsibility, and program modifications.',
}

type Policy = {
  title: string
  body: string
}

const policies: Policy[] = [
  {
    title: 'Acknowledgment of Policies',
    body: 'By registering, participants confirm that they have read, understood, and agreed to abide by Ice Works Skating Academy\u2019s Policies.',
  },
  {
    title: 'Liability Disclaimer',
    body: 'Ice Works Skating Academy, its coaches, and directors are not liable for any accidents, injuries, or loss of personal belongings occurring on or off the ice.',
  },
  {
    title: 'Class Cancellations and Refunds',
    body: 'Sessions with low registrations may be cancelled at our discretion. We cannot offer makeups for missed lessons. If you wish to withdraw one week before the start of the season, we will refund the program fees, less a $40 administration fee. On or after the one week before the start of the season, we can offer no refunds.',
  },
  {
    title: 'Parental Responsibility',
    body: 'Parents and guardians are responsible for supervising their children while at the arena. Children must not be left unattended. Additionally, parents are not permitted to coach from the sidelines or over the boards.',
  },
  {
    title: 'Program Modifications',
    body: 'Schedules and programs are subject to change or cancellation as necessary.',
  },
]

export default function GeneralPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Rules &amp; Regulations
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
            General Policy
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            All participants must adhere to the policies, rules, and regulations
            of Ice Works Skating Academy, as well as those of the arena and
            associated facilities. It is the responsibility of each participant to
            review and comply with these guidelines at all times.
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
        <ol className="space-y-6">
          {policies.map((policy, i) => (
            <li
              key={policy.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-navy">
                    <FileText className="h-5 w-5 text-primary" />
                    {policy.title}
                  </h2>
                  <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                    {policy.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
