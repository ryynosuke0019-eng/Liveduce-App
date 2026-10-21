export type ViewName =
  | "dashboard"
  | "new"
  | "import"
  | "session"
  | "outputs"
  | "media"
  | "integrations"
  | "billing";

export const sessions = [
  {
    id: "demo-sales-05",
    title: "第5回 営業会議",
    date: "2026/08/18",
    duration: "42分",
    people: 4,
    outputs: 4,
    status: "完了",
    genre: "商談",
    summary: "価格改定案と9月の提案方針を決定",
  },
  {
    id: "demo-product-01",
    title: "プロダクト定例 — リリース計画",
    date: "2026/08/19",
    duration: "28分",
    people: 3,
    outputs: 3,
    status: "進行中",
    genre: "開発",
    summary: "オンボーディング改善を最優先に設定",
  },
  {
    id: "demo-customer-03",
    title: "顧客ヒアリング振り返り",
    date: "2026/08/15",
    duration: "31分",
    people: 3,
    outputs: 5,
    status: "完了",
    genre: "商談",
    summary: "導入前の不安と比較検討軸を整理",
  },
];

export const transcriptLines = [
  { speaker: "廣瀬", time: "00:04", text: "今日は次回リリースに向けて、優先順位と公開条件を決めたいです。" },
  { speaker: "佐藤", time: "00:12", text: "利用者からは、最初の設定が少し分かりにくいという声が多いです。" },
  { speaker: "田中", time: "00:25", text: "では、オンボーディング改善を最優先にして、料金比較表とヘルプ記事も同時に整えましょう。" },
  { speaker: "廣瀬", time: "00:39", text: "リリース目標は9月12日、9月5日に最終レビューを入れる形で進めます。" },
  { speaker: "佐藤", time: "00:52", text: "その日程なら、来週中に画面案と検証項目を共有できます。" },
];

export const actionItems = [
  { task: "オンボーディング画面案を作成", owner: "佐藤", due: "8月26日" },
  { task: "料金比較表の初稿を作成", owner: "田中", due: "8月27日" },
  { task: "リリース判定レビューを設定", owner: "廣瀬", due: "9月5日" },
];
