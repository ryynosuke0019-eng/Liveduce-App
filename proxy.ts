import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "liveduce-portfolio-demo.vercel.app";

export function proxy(request: NextRequest) {
  const incomingHost = request.headers.get("host")?.toLowerCase();
  if (process.env.VERCEL_ENV !== "production" || incomingHost === CANONICAL_HOST) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.protocol = "https:";
  canonicalUrl.host = CANONICAL_HOST;
  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
