import { NextResponse } from "next/server";

import { getDemoStripe } from "@/lib/demo-stripe";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
  if (!sessionId.startsWith("cs_test_") || sessionId.length > 256) {
    return NextResponse.json({ confirmed: false }, { status: 400 });
  }

  try {
    const stripe = getDemoStripe();
    if (!stripe) {
      return NextResponse.json({ confirmed: false }, { status: 503 });
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      confirmed: session.livemode === false && session.payment_status === "paid",
    });
  } catch {
    return NextResponse.json({ confirmed: false }, { status: 404 });
  }
}
