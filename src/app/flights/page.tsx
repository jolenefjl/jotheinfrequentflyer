export default function FlightsPage() {
  return <ComingSoon title="Flights" />;
}

function ComingSoon({ title }: { title: string }) {
  return (
    <main className="container py-20">
      <p className="eyebrow">Coming soon</p>
      <h1 className="mt-4 font-serif text-6xl font-medium text-[var(--warm-brown)]">{title}</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--ink)]">
        This archive is ready for Sanity content, but it stays quiet until Jo has something useful
        to say.
      </p>
    </main>
  );
}
