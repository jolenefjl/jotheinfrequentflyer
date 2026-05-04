import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container grid gap-14 py-24 lg:grid-cols-[0.85fr_1.25fr] lg:py-32">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/jo-headshot.jpg" alt="Jo outdoors in Norway" fill className="object-cover" priority />
            <div className="mono absolute bottom-3.5 left-3.5 bg-[rgba(245,242,236,0.92)] px-2 py-1 text-[var(--ink)]">
              Jo / Norway
            </div>
          </div>
          <article className="flex flex-col justify-end">
            <p className="mono mb-8 text-[var(--ink-3)]">— About Jo</p>
            <h1 className="serif m-0 max-w-[840px] text-[clamp(56px,7.6vw,116px)] font-normal leading-[0.92] tracking-[-0.045em]">
              A Malaysian mum in Norway, making the annual leave count.
            </h1>
            <p className="serif mt-8 max-w-[720px] text-[clamp(22px,2.5vw,31px)] leading-[1.32] text-[var(--ink-2)]">
              I have a full-time job, a family, and a finite number of days I can disappear
              somewhere with a suitcase. That is the whole point of this site.
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container grid gap-14 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32">
          <div>
            <p className="mono sticky top-36 text-[var(--ink-3)]">— The point of view</p>
          </div>
          <div className="max-w-[760px] space-y-7 text-[18px] leading-[1.8] text-[var(--ink-2)]">
            <p>
              I grew up with a Malaysian instinct for value, good food, and calling things as they
              are. If a place is lovely but overpriced, I will say so. If breakfast unexpectedly
              saves the whole stay, I will definitely say so.
            </p>
            <p>
              Jo the Infrequent Flyer is for travellers who are not trying to be everywhere all the
              time. They just want the trips they do take to feel genuinely worth it.
            </p>
            <p>
              The reviews here are slow, detailed, and personal because that is how I travel. I care
              about the transfer, the towels, the first coffee, the kid logistics, and whether I
              would send a real friend there with their own money.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <Link href="/stays" className="btn solid">
            Start with the stay reviews
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
