import { averageScore } from "@/lib/mock-content";
import type { ScoreItem } from "@/lib/types";

export function JoScoreCard({
  scores,
  bestFor,
  wouldJoReturn,
  verdict,
}: {
  scores: ScoreItem[];
  bestFor: string[];
  wouldJoReturn: string;
  verdict: string;
}) {
  const average = averageScore(scores);

  return (
    <aside className="bg-transparent p-0">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5">
        <div>
          <p className="eyebrow">The Jo Score</p>
          <p className="mt-2 font-serif text-5xl font-medium text-[var(--terracotta)]">
            {average}
          </p>
        </div>
        <div className="text-sm text-[var(--muted)]">
          <p>Best for: {bestFor.join(", ")}</p>
          <p>Would Jo return? {wouldJoReturn}</p>
        </div>
      </div>
      <p className="my-5 font-serif text-2xl font-medium leading-snug text-[var(--warm-brown)]">
        {verdict}
      </p>
      <div className="grid gap-3">
        {scores.map((score) => (
          <div key={score.label} className="grid gap-1 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold text-[var(--ink)]">{score.label}</p>
              <p className="font-serif text-2xl font-medium text-[var(--terracotta)]">
                {score.value}/5
              </p>
            </div>
            <p className="text-sm leading-6 text-[var(--muted)]">{score.description}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
