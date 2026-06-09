"use client";

import { FormEvent, useState } from "react";

type NewsletterSignupFormProps = {
  buttonText: string;
  placeholder: string;
  variant?: "light" | "dark";
};

export function NewsletterSignupForm({
  buttonText,
  placeholder,
  variant = "light",
}: NewsletterSignupFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          locale: document.documentElement.lang || navigator.language || "en",
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage(result.message || "You are on the list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const dark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-[18px] max-w-[520px] ${dark ? "" : "mx-auto"}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[0.7fr_1fr_auto]">
        <label htmlFor={`newsletter-first-name-${variant}`} className="sr-only">
          First name
        </label>
        <input
          id={`newsletter-first-name-${variant}`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          maxLength={80}
          placeholder="First name"
          className={
            dark
              ? "min-w-0 border border-b-0 border-[rgba(245,242,236,0.25)] bg-transparent px-[14px] py-3 font-mono text-xs tracking-[0.04em] text-[var(--paper)] outline-none sm:border-b sm:border-r-0"
              : "min-w-0 border border-b-0 border-[var(--ink)] bg-transparent px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] outline-none sm:border-b sm:border-r-0"
          }
        />
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          className={
            dark
              ? "min-w-0 border border-b-0 border-[rgba(245,242,236,0.25)] bg-transparent px-[14px] py-3 font-mono text-xs tracking-[0.04em] text-[var(--paper)] outline-none sm:border-b sm:border-r-0"
              : "min-w-0 border border-b-0 border-[var(--ink)] bg-transparent px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] outline-none sm:border-b sm:border-r-0"
          }
        />
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={
            dark
              ? "border border-[var(--paper)] bg-[var(--paper)] px-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink)] disabled:cursor-wait disabled:opacity-60"
              : "btn disabled:cursor-wait disabled:opacity-60"
          }
        >
          {status === "submitting" ? "Sending..." : buttonText}
        </button>
      </div>
      <label
        className={`mt-3 flex items-start gap-2 text-left text-xs leading-[1.5] ${
          dark ? "text-[rgba(245,242,236,0.7)]" : "text-[var(--ink-3)]"
        }`}
      >
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        />
        <span>
          Yes, send me the Infrequent Flyer newsletter. I can unsubscribe at any time by emailing{" "}
          <a className="underline" href="mailto:jolene.fjl@gmail.com?subject=Unsubscribe">
            jolene.fjl@gmail.com
          </a>
          .
        </span>
      </label>
      {message ? (
        <p
          className={`m-0 mt-3 text-xs leading-[1.5] ${
            status === "error"
              ? "text-[var(--accent)]"
              : dark
                ? "text-[rgba(245,242,236,0.7)]"
                : "text-[var(--ink-3)]"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
