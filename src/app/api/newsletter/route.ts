import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL;
  const webhookSecret = process.env.NEWSLETTER_SIGNUP_SECRET;
  const origin = request.headers.get("origin");

  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  if (!webhookUrl || !webhookSecret) {
    return NextResponse.json(
      { message: "Newsletter signup is being connected. Please try again shortly." },
      { status: 503 },
    );
  }

  let payload: {
    firstName?: unknown;
    email?: unknown;
    consent?: unknown;
    website?: unknown;
    locale?: unknown;
  };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "You are on the list." });
  }

  const firstName = typeof payload.firstName === "string" ? payload.firstName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const locale =
    typeof payload.locale === "string" && payload.locale.toLowerCase().startsWith("no")
      ? "no"
      : "en";

  if (!firstName || firstName.length > 80) {
    return NextResponse.json({ message: "Please enter your first name." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (payload.consent !== true) {
    return NextResponse.json(
      { message: "Please confirm that you would like to receive the newsletter." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        email,
        locale,
        consent: true,
        secret: webhookSecret,
        signedUpAt: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets webhook returned ${response.status}.`);
    }

    const result = (await response.json()) as { ok?: boolean; duplicate?: boolean };

    if (!result.ok) {
      throw new Error("Google Sheets webhook rejected the signup.");
    }

    return NextResponse.json({
      message: result.duplicate ? "You are already on the list." : "You are on the list.",
    });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { message: "We could not save your email right now. Please try again." },
      { status: 502 },
    );
  }
}
