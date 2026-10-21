import type { Metadata } from "next";

import { DemoApp } from "@/components/demo-app";

export const metadata: Metadata = {
  title: "操作デモ | Liveduce",
  description:
    "Liveduceのセッション記録、文脈補助、成果物生成、画像・動画、料金画面を固定データで体験できる公開デモです。",
};

export default function DemoPage() {
  return <DemoApp />;
}
