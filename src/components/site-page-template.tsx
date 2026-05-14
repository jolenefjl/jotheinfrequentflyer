import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { RichText } from "@/components/rich-text";
import { getSitePageBySlug } from "@/lib/sanity-content";

export async function SitePageTemplate({ slug }: { slug: string }) {
  const page = await getSitePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="page">
      <section className="border-b border-[var(--ink)]">
        <div
          className={`container grid gap-14 py-24 lg:py-32 ${
            page.imageUrl ? "lg:grid-cols-[0.85fr_1.25fr]" : ""
          }`}
        >
          {page.imageUrl ? (
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={page.imageUrl}
                alt={page.imageAlt || page.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {page.imageCaption ? (
                <div className="mono absolute bottom-3.5 left-3.5 bg-[rgba(245,242,236,0.92)] px-2 py-1 text-[var(--ink)]">
                  {page.imageCaption}
                </div>
              ) : null}
            </div>
          ) : null}
          <article className="flex flex-col justify-end">
            <p className="mono mb-8 text-[var(--ink-3)]">— {page.eyebrow || page.title}</p>
            <h1 className="serif m-0 max-w-[920px] text-[clamp(46px,7vw,104px)] font-normal leading-[0.95] tracking-[-0.045em]">
              {page.title}
            </h1>
            {page.intro ? (
              <p className="serif mt-8 max-w-[720px] text-[clamp(21px,2.35vw,30px)] leading-[1.32] text-[var(--ink-2)]">
                {page.intro}
              </p>
            ) : null}
          </article>
        </div>
      </section>

      {page.body?.length ? (
        <section className="border-b border-[var(--rule)]">
          <div className="container grid gap-14 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32">
            <div>
              <p className="mono sticky top-36 text-[var(--ink-3)]">— Notes</p>
            </div>
            <article className="max-w-[760px]">
              <RichText value={page.body} />
            </article>
          </div>
        </section>
      ) : null}

      {page.cta?.label && page.cta.href ? (
        <section>
          <div className="container py-24 lg:py-32">
            <Link href={page.cta.href} className="btn solid">
              {page.cta.label}
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
