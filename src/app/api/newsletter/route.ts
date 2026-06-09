import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_NEWSLETTER_WEBHOOK_URL;
  const webhookSecret = process.env.NEWSLETTER_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return NextResponse.json(
      { message: "Newsletter signup is being connected. Please try again shortly." },
      { status: 503 },
    );
  }

  let payload: { email?: unknown; website?: unknown; source?: unknown };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "You are on the list." });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.slice(0, 200) : "/";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source,
        secret: webhookSecret,
        signedUpAt: new Date().toISOString(),
      }),
      cache: "no-store",
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
