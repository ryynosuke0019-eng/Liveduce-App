import { NextResponse } from "next/server";

import {
  allowCheckout,
  getDemoStripe,
  isSameOrigin,
} from "@/lib/demo-stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }
  if (!allowCheckout(request)) {
    return NextResponse.json(
      { error: "しばらく待ってからもう一度お試しください。" },
      { status: 429 },
    );
  }

  try {
    const stripe = getDemoStripe();
    if (!stripe) {
      return NextResponse.json(
        { code: "sandbox_unavailable" },
        { status: 503 },
      );
    }

    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "jpy",
            unit_amount: 1980,
            product_data: {
              name: "Liveduce Pro — Portfolio Demo",
              description: "Stripe Sandbox上のテスト決済です。実請求は発生しません。",
            },
          },
        },
      ],
      success_url: `${origin}/demo?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/demo?checkout=cancel`,
      metadata: { environment: "portfolio-demo", real_charge: "false" },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout unavailable." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Stripe Sandboxを開始できませんでした。" },
      { status: 502 },
    );
  }
}
