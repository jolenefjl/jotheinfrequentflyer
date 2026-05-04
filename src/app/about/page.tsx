import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src="/jo-headshot.jpg" alt="Jo outdoors in Norway" fill className="object-cover" />
      </div>
      <article className="max-w-3xl">
        <p className="eyebrow">About Jo</p>
        <h1 className="mt-4 font-serif text-6xl font-medium leading-none text-[var(--warm-brown)]">
          A Malaysian mum in Norway, making the annual leave count.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-9">
          <p>
            Jo has a full-time job, a family, and a finite number of days she can disappear
            somewhere with a suitcase. That is the whole point of this site.
          </p>
          <p>
            She grew up with a Malaysian instinct for value, good food, and calling things as they
            are. If a place is lovely but overpriced, she will say so. If breakfast unexpectedly
            saves the whole stay, she will definitely say so.
          </p>
          <p>
            Jo the Infrequent Flyer is for travellers who are not trying to be everywhere all the
            time. They just want the trips they do take to feel genuinely worth it.
          </p>
        </div>
      </article>
    </main>
  );
}
