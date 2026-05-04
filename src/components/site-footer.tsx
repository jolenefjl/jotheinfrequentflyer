import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#1E1C1A] py-12 text-[#FAFAF8]">
      <div className="container grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">Jo the Infrequent Flyer</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#FAFAF8]/75">
            Honest travel notes for people who do not travel often enough to waste a trip.
          </p>
        </div>
        <div className="text-sm leading-7">
          <p className="eyebrow text-[#FAFAF8]/65">Browse</p>
          <Link href="/stays" className="block">Stays</Link>
          <Link href="/food" className="block">Food</Link>
          <Link href="/experiences" className="block">Experiences</Link>
        </div>
        <div className="text-sm leading-7">
          <p className="eyebrow text-[#FAFAF8]/65">Social</p>
          <p>Instagram coming soon</p>
          <p>TikTok coming soon</p>
          <p>Pinterest coming soon</p>
        </div>
      </div>
    </footer>
  );
}
