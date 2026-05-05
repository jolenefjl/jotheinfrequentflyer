import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export const revalidate = 60;

const neighborhoods = ["Alfama", "Principe Real", "Campo de Ourique", "Cais do Sodre"];
const guideBlocks = [
  ["Stay", "A small, quiet hotel near Principe Real, close enough to walk but far enough from the tram queue."],
  ["Eat", "One excellent bakery, one proper lunch, one back-pocket dinner when everyone is tired."],
  ["Skip", "The famous tram at peak hour. Photograph it, wave at it, walk instead."],
  ["With kids", "Build the day around one hill, one snack, one playground, and a very generous margin for collapse."],
];

export default function CityGuidesPage() {
  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div className="container grid gap-14 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-32">
          <div>
            <div className="mono mb-8 text-[var(--ink-3)]">-- Mock city guide</div>
            <h1 className="serif m-0 text-[clamp(68px,11vw,168px)] font-normal italic leading-[0.88] tracking-[-0.05em]">
              Lisbon.
            </h1>
            <p className="serif mt-8 max-w-[760px] text-[clamp(22px,2.5vw,32px)] leading-[1.3] text-[var(--ink-2)]">
              A practical, opinionated city file for people who only have a few precious days and
              absolutely no appetite for wasting them in the wrong queue.
            </p>
          </div>
          <div className="self-end border-l border-[var(--rule)] pl-6">
            <div className="mono mb-4 text-[var(--ink-3)]">At a glance</div>
            {[
              ["Best for", "First-timers, food walks, hilly wandering"],
              ["Stay length", "4 nights"],
              ["When to go", "April, May, October"],
              ["Jo's rule", "One viewpoint per day, maximum"],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-[var(--rule)] py-4">
                <div className="mono mb-1 text-[var(--ink-4)]">{label}</div>
                <div className="text-sm leading-[1.5] text-[var(--ink-2)]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--rule)]">
        <div className="container py-24 lg:py-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mono mb-2.5 text-[var(--ink-3)]">-- The shape of the trip</div>
              <h2 className="serif m-0 text-[clamp(34px,4vw,56px)] font-normal leading-none">
                Four easy bases.
              </h2>
            </div>
            <span className="btn ghost">Mock layout</span>
          </div>
          <div className="grid border border-[var(--rule)] lg:grid-cols-4">
            {neighborhoods.map((neighborhood, index) => (
              <article key={neighborhood} className="min-h-[220px] border-r border-[var(--rule)] p-6 last:border-r-0">
                <div className="mb-10 flex items-center justify-between">
                  <span className="mono text-[var(--ink-3)]">{String(index + 1).padStart(2, "0")}</span>
                  <MapPin size={14} strokeWidth={1.6} />
                </div>
                <h3 className="serif m-0 text-[32px] font-normal leading-none">{neighborhood}</h3>
                <p className="mt-4 text-sm leading-[1.55] text-[var(--ink-2)]">
                  A short editorial note would explain who should base here and what kind of day it
                  unlocks.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mono mb-3 text-[var(--ink-3)]">-- Jo&apos;s city file</div>
              <h2 className="serif m-0 text-[clamp(34px,4vw,54px)] font-normal leading-[1.05]">
                Useful, personal, not encyclopedic.
              </h2>
            </div>
            <div className="grid gap-6">
              {guideBlocks.map(([label, text]) => (
                <div key={label} className="grid gap-5 border-t border-[var(--rule)] py-6 md:grid-cols-[160px_1fr_auto]">
                  <div className="mono text-[var(--ink-3)]">{label}</div>
                  <p className="m-0 text-lg leading-[1.6] text-[var(--ink-2)]">{text}</p>
                  <ArrowRight size={15} strokeWidth={1.6} />
                </div>
              ))}
              <Link href="/" className="btn solid w-fit">
                Back home
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
