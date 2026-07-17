import Image from 'next/image'
import { Snowflake, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Coaches | Ice Works Skating Academy',
  description:
    'Meet the Ice Works Skating Academy coaching team. Experienced, national-level coaches dedicated to developing skaters from beginner through competitive levels.',
}

const coaches = [
  {
    name: 'Valerie Calver',
    role: 'Skating Coach',
    image: '/images/coach-valerie.png',
    bio: 'Valerie has 40+ years of coaching experience and 13 years as a skating director. She holds a National Level Coaching Certification with eleven additional Level 4 tasks completed, and recognized as a Gold Level Status coach. Valerie coaches skaters at all levels from beginners to Junior Competitive athletes. She has coached students to success in Gold Free Skate, Gold Dance, and Gold Artistic programs. Her experience includes working with hockey players and holds a specialized diploma in teaching skaters with special needs.',
  },
  {
    name: 'Elizabeth Taylor',
    role: 'Skating Coach',
    image: '/images/coach-elizabeth.jpg',
    bio: 'Elizabeth has 40+ years of coaching experience with Level III National Pairs Coaches Certification. Team Coach 1987 – 1991 Ontario Winter Games, Consultant for CFSA. Her student test records include: Gold Figure, Gold Free Skate, Gold Dances, Junior Competitive Test, Junior & Senior Competitive Pair Tests, Novice Competitive Singles & Pair Test',
  },
  {
    name: 'Marwan Nazarat',
    role: 'Skating Coach',
    image: '/images/coach-marwan.png',
    bio: 'Marwan is a former national-level figure skater with 13 years of competitive experience and 3 years of coaching experience, specialized in guiding skaters from beginner to development of strong foundational skills and single jumps. Coaching approach combines technical precision, patience, and encouragement to help each skater build confidence, ability, and a lasting love for the sport.',
  },
  {
    name: 'Annette Moretti',
    role: 'Skating Coach',
    image: '/images/coach-annette.jpg',
    bio: 'Annette has over 5 years of experience coaching beginner and developing skaters of all ages, focusing on essential skating skills including edges, jumps, spins and overall technique in a positive and supportive environment. As an active adult figure skating competitor, Annette understands the challenges and rewards of skating, while inspiring students to set goals and enjoy their progress. She creates a fun, encouraging atmosphere where every skater can learn, grow and achieve their personal best.',
  },
  {
    name: 'Katarina Dodik',
    role: 'Assistant Coach',
    image: '/images/coach-katarina.jpg',
    bio: 'Katarina has been coaching Learn to Skate for four years. She helps skaters build confidence while making every session fun, positive, and encouraging. She works well with children of all ages and creates a supportive environment where they feel comfortable trying new skills and learning at their own pace. Along with coaching, she continues to train and compete. She recently competed in the United States, earning three gold medals. Staying active as a skater helps demonstrate techniques and shares her passion for the sport with her students. She believes every skater learns differently, so she focuses on being patient, reliable, and encouraging while helping each student reach their goals. Whether someone is stepping onto the ice for the first time or working toward more advanced skills, she strives to make every lesson enjoyable and rewarding.',
  },
  {
    name: 'Sarina Niakan',
    role: 'Assistant Coach',
    image: '/images/coach-sarina.jpg',
    bio: 'Sarina has been figure skating for four years currently working at the STAR 4 Freeskate level and STAR 6/7 Dance. Before becoming a coach, she volunteered as a Program Assistant, helping with CanSkate sessions. She creates an encouraging environment where skaters can build confidence, develop their skills, and enjoy being on the ice.',
  },
]

export default function CoachesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Our Team
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-navy sm:text-5xl">
            Meet the Coaches
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Our expert, national-level coaching team is here to support you, whether you&apos;re just starting out or looking to take your skating to the next level, or performing in shows and competitions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <Image
                src="/images/janis-coyle.jpg"
                alt="Janis Coyle, Director at Ice Works Skating Academy"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary">
                <Snowflake className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Director
                </span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
                Janis Coyle
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Janis has 40+ years of coaching, with National Level Coaching Certification. She encourages skaters of all levels to reach their highest potential in an encouraging and supportive environment and to develop a love of skating. She believes that skating builds character, confidence, and a sense of accomplishment, preparing children for life. She coaches all disciplines, including Learn to Skate, Star Skate to Competitive, Pre-Juvenile Competitive Skating, Juvenile, Pre-Novice, Novice, Junior, Special Olympics Level 1, and Power Skating. Additionally, she holds a diploma in social work to coach students with special needs. Janis&apos; awards and achievements include competitive coach for Pre Juvenile-Junior competitive and skaters qualifying for Challenge 2016.
              </p>
            </div>
          </article>
          {coaches.map((c) => (
            <article
              key={c.name}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={`${c.name}, ${c.role} at Ice Works Skating Academy`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Snowflake className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {c.role}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-2xl font-bold text-navy">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>


    </>
  )
}
