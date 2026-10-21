import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://liveduce-portfolio-demo.vercel.app"),
  title: {
    default: "Liveduce | 会議の一言を、その場で成果物へ",
    template: "%s",
  },
  description:
    "会議中の発言から議事録・画像・動画コンセプト・AI解説・共有文案までを生成・整理するLiveduceのプロダクトポートフォリオです。",
  robots: { index: false, follow: false, noarchive: true },
  openGraph: {
    title: "Liveduce | 会議の一言を、その場で成果物へ",
    description:
      "記録、理解、生成、共有を一つの流れにするLiveduceのプロダクトポートフォリオ。",
    type: "website",
    images: [
      {
        url: "/portfolio/liveduce-og.png",
        width: 1200,
        height: 675,
        alt: "Liveduce product portfolio",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f7f8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
