"use client";

import { useState } from "react";

import { actionItems, type ViewName } from "@/lib/demo-data";

type OutputTab = "minutes" | "actions" | "slides" | "media";

export function OutputsView({ onNavigate, initialTab = "minutes" }: { onNavigate: (view: ViewName) => void; initialTab?: OutputTab }) {
  const [tab, setTab] = useState<OutputTab>(initialTab);

  function downloadMinutes() {
    const text = `# プロダクト定例 — リリース計画\n\n## 決定事項\n- 9月12日をリリース目標とする\n- オンボーディング改善を最優先する\n- 9月5日にリリース判定レビューを実施する\n\n## アクション\n${actionItems.map((item) => `- ${item.task} / ${item.owner} / ${item.due}`).join("\n")}\n\n※ Liveduce公開デモの架空データです。`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "liveduce-demo-meeting-notes.md";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page-stack outputs-page">
      <section className="page-heading"><div><span className="kicker">セッション成果物 · 保存済み</span><h1>プロダクト定例 — リリース計画</h1><p>2026年8月19日 · 42分 · 参加者3名 · 架空データ</p></div><div className="heading-actions"><button className="button secondary" onClick={() => onNavigate("session")}>← 会話に戻る</button><button className="button dark" onClick={downloadMinutes}>↥ 議事録をMDで書き出す</button></div></section>

      <nav className="output-tabs" aria-label="成果物の種類"><button className={tab === "minutes" ? "active" : ""} onClick={() => setTab("minutes")}>議事録</button><button className={tab === "actions" ? "active" : ""} onClick={() => setTab("actions")}>アクション</button><button className={tab === "slides" ? "active" : ""} onClick={() => setTab("slides")}>資料構成案</button><button className={tab === "media" ? "active" : ""} onClick={() => setTab("media")}>画像・動画</button></nav>

      <div className="output-layout">
        <article className="document-panel">
          <header><div><span className="document-badge">固定データ · 表示サンプル</span><h2>{tab === "minutes" ? "会議議事録" : tab === "actions" ? "アクション一覧" : tab === "slides" ? "提案資料の構成案" : "共有素材案"}</h2><p>プロダクト定例 — リリース計画</p></div><span className="quality-score">92<small>/100 · 表示例</small></span></header>
          {tab === "minutes" ? <Minutes /> : null}
          {tab === "actions" ? <Actions /> : null}
          {tab === "slides" ? <Slides /> : null}
          {tab === "media" ? <Media /> : null}
        </article>

        <aside className="output-side">
          <section className="side-card"><header><div><span className="kicker">次にやること</span><h2>アクション</h2></div><span className="count-badge">3</span></header><div className="action-list">{actionItems.map((item) => <div key={item.task}><i /><span><strong>{item.task}</strong><small>{item.owner} · {item.due}</small></span></div>)}</div></section>
          <section className="side-card"><span className="kicker">書き出し</span><h2>次工程へ渡す</h2><div className="format-grid"><button onClick={downloadMinutes}>MD<small>議事録</small></button><button disabled>TXT<small>未対応</small></button><button disabled>SRT<small>未対応</small></button><button onClick={() => setTab("slides")}>表示<small>資料構成案</small></button></div></section>
          <button className="button dark wide" onClick={() => onNavigate("billing")}>プランとStripeデモを見る →</button>
        </aside>
      </div>
    </div>
  );
}

function Minutes() { return <><section><h3>要約</h3><p>次回リリースを9月12日とし、顧客向けオンボーディングの改善を最優先で進める。ヘルプ記事と料金比較表を先行して準備し、9月5日のレビュー会で最終的なリリース可否を判断する。</p></section><section><h3>決定事項</h3><ol className="number-list"><li><b>01</b><span>次回リリース目標を<strong>9月12日</strong>に設定する</span></li><li><b>02</b><span>オンボーディング改善を最優先タスクとする</span></li><li><b>03</b><span>9月5日にリリース判定レビューを実施する</span></li></ol></section><section><h3>重要な論点</h3><div className="quote-block">Proプランは料金だけでなく、利用時間・生成成果物・共有範囲を同じ軸で比較し、価値を明確に伝える。</div></section></>; }
function Actions() { return <section><h3>担当・期限</h3><ol className="number-list">{actionItems.map((item, index) => <li key={item.task}><b>0{index + 1}</b><span><strong>{item.task}</strong><br />{item.owner} · 期限 {item.due}</span></li>)}</ol></section>; }
function Slides() { return <section><h3>5ページ構成の表示例</h3><ol className="slide-outline"><li><b>01</b><span>現状 — 会議後の整理に時間がかかる</span></li><li><b>02</b><span>課題 — 決定と担当が埋もれる</span></li><li><b>03</b><span>体験 — 記録しながら文脈を補助</span></li><li><b>04</b><span>成果 — 議事録・資料・素材へ変換</span></li><li><b>05</b><span>導入 — 小さな会議から開始</span></li></ol></section>; }
function Media() { return <section><h3>共有素材案</h3><div className="media-preview"><div><span>Liveduce</span><strong>会議を、<br />その場で成果物へ。</strong><small>固定データによる公開デモ</small></div><p>画像・動画生成APIには接続せず、固定の素材案と画面操作を再現しています。</p></div></section>; }
