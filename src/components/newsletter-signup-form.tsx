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
          email: data.get("email"),
          website: data.get("website"),
          source: window.location.pathname,
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
      <div className="flex">
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
              ? "min-w-0 flex-1 border border-r-0 border-[rgba(245,242,236,0.25)] bg-transparent px-[14px] py-3 font-mono text-xs tracking-[0.04em] text-[var(--paper)] outline-none"
              : "min-w-0 flex-1 border border-r-0 border-[var(--ink)] bg-transparent px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] outline-none"
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
