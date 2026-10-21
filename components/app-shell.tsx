"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { sessions, type ViewName } from "@/lib/demo-data";

type NavItem = { id: ViewName; label: string; mark: string };

const workspaceNav: NavItem[] = [
  { id: "dashboard", label: "オンタイム記録", mark: "◉" },
  { id: "dashboard", label: "セッション一覧", mark: "▧" },
  { id: "media", label: "画像・動画", mark: "▣" },
  { id: "integrations", label: "連携", mark: "⌁" },
  { id: "billing", label: "設定", mark: "⚙" },
];

export function AppShell({
  view,
  plan,
  onNavigate,
  onStart,
  children,
}: {
  view: ViewName;
  plan: "Free" | "Pro";
  onNavigate: (view: ViewName) => void;
  onStart: () => void;
  children: ReactNode;
}) {
  const planLabel = plan;
  const [planDialogOpen, setPlanDialogOpen] = useState(false);

  useEffect(() => {
    if (!planDialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlanDialogOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [planDialogOpen]);

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <button className="brand" onClick={() => onNavigate("dashboard")} aria-label="ダッシュボードへ">
          <Image
            src="/brand/liveduce-logo.png"
            alt="Liveduce"
            width={1038}
            height={214}
            priority
          />
        </button>

        <div className="side-scroll">
          <button className="search-button" onClick={() => onNavigate("dashboard")}>
            <span>⌕</span><span>セッションを検索</span><kbd>⌘K</kbd>
          </button>
          <button className="primary-side-button" onClick={onStart}><b>＋</b> 新規セッション</button>
          <button className={view === "import" ? "plain-side-button active" : "plain-side-button"} onClick={() => onNavigate("import")}><span>↥</span> 取り込み</button>

          <section className="mode-card">
            <header><span>モード</span><b>切替</b></header>
            <div><strong>ビジネス</strong><span>クリエイター</span></div>
            <button onClick={() => onNavigate("outputs")}><span>⌁</span> 編集ソフト書き出し</button>
          </section>

          <p className="side-label">ワークスペース</p>
          <nav className="side-nav" aria-label="デモ内ナビゲーション">
            {workspaceNav.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                className={view === item.id && (item.id !== "dashboard" || index === 0) ? "active" : ""}
                onClick={() => onNavigate(item.id)}
              >
                <span aria-hidden>{item.mark}</span>{item.label}
              </button>
            ))}
          </nav>

          <div className="side-section-title"><span>フォルダ</span><b>⌄</b></div>
          <div className="folder-list"><button>○ 未分類</button><button><i className="blue-dot" /> 商談</button><button>⊞ 管理</button></div>

          <div className="side-section-title"><span>最近のセッション</span><b>⌄</b></div>
          <div className="recent-list">
            {sessions.slice(0, 3).map((session, index) => (
              <button key={session.id} onClick={() => onNavigate(index === 0 ? "outputs" : "session")}><i className={index === 0 ? "green-dot" : "gray-dot"} />{session.title}</button>
            ))}
          </div>

          <div className="side-section-title"><span>最近のアウトプット</span><b>⌄</b></div>
          <button className="recent-output" onClick={() => onNavigate("outputs")}><i className="green-dot" /><span>決定事項サマリー<small>まず作る / 保存済</small></span></button>

          <section className="usage-card">
            <header><span>今月の利用</span><b>{planLabel} ✧</b></header>
            <div><span>◎ 保存済成果物<strong>4</strong></span><span>◷ 要確認<strong>1</strong></span></div>
            <p>収録時間 42分</p>
          </section>
        </div>

        <footer className="sidebar-footer"><button>▢ フィードバック</button><button onClick={() => onNavigate("billing")}>⚙ 設定</button><button aria-label="サイドバーを閉じる">◁</button></footer>
      </aside>

      <div className="main-column">
        <div className="safe-strip">
          <Link href="/" className="portfolio-return">← 制作物トップ</Link>
          <span>INTERACTIVE DEMO</span>
          <p>架空データ・実AI通信なし・Stripeはテスト環境のみ</p>
        </div>
        <header className="topbar">
          <button className="plan-change" onClick={() => setPlanDialogOpen(true)}>✦ {plan === "Free" ? "アップグレード" : "プラン変更"}</button>
          <span className="plan-pill">{planLabel}</span>
          <span className="credit-pill">⌁ {plan === "Pro" ? "360" : "120"} cr&nbsp; JPY</span>
          <button className="top-icon" aria-label="ヘルプ">?</button>
          <button className="top-link" onClick={() => onNavigate("billing")}>⚙&nbsp; 設定</button>
          <button className="account-button" onClick={() => onNavigate("billing")}><span className="avatar">LD<i /></span><span><strong>Liveduce Demo</strong><small>demo@liveduce.ai</small></span></button>
          <button className="top-icon" aria-label="ログアウトはデモでは無効">↪</button>
        </header>
        <main className="content">{children}</main>
      </div>

      {planDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setPlanDialogOpen(false)}>
          <section
            className="plan-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span className="kicker">PLAN COMPARISON</span>
                <h2 id="plan-dialog-title">プランを選ぶ</h2>
                <p>本体と同じプラン構成を、安全な固定データで確認できます。</p>
              </div>
              <button className="dialog-close" onClick={() => setPlanDialogOpen(false)} aria-label="閉じる">×</button>
            </header>
            <div className="dialog-plan-grid">
              <DialogPlan
                name="Free"
                price="¥0"
                limit="月60分"
                features={["取り込み 5件/月", "成果物 5件/月", "共有 5リンク", "クリエイター利用不可"]}
                current={plan === "Free"}
              />
              <DialogPlan
                name="Pro"
                price="¥1,980"
                limit="月180分"
                features={["取り込み 50件/月", "成果物 50件/月", "共有 50リンク", "制作は追加クレジット"]}
                recommended
                current={plan === "Pro"}
              />
              <DialogPlan
                name="Team"
                price="¥4,980"
                limit="月1,800分"
                features={["取り込み 300件/月", "成果物 100件/月", "共有・権限・支出管理", "制作は管理者が許可"]}
              />
              <DialogPlan
                name="Ultra"
                price="¥9,800"
                limit="月1,800分"
                features={["取り込み 1,000件/月", "成果物 300件/月", "編集ソフト書き出し", "クリエイター標準搭載"]}
              />
            </div>
            <footer>
              <span>公開デモでは本番請求を行いません。</span>
              <button
                className="button dark"
                onClick={() => {
                  setPlanDialogOpen(false);
                  onNavigate("billing");
                }}
              >
                設定・Stripeテストを見る →
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function DialogPlan({
  name,
  price,
  limit,
  features,
  current = false,
  recommended = false,
}: {
  name: string;
  price: string;
  limit: string;
  features: string[];
  current?: boolean;
  recommended?: boolean;
}) {
  return (
    <article className={recommended ? "dialog-plan recommended" : "dialog-plan"}>
      {recommended ? <b>おすすめ</b> : null}
      <h3>{name}</h3>
      <strong>{price}<small>/月</small></strong>
      <p>{limit}の文字起こし</p>
      <ul>
        {features.map((feature) => <li key={feature}>✓ {feature}</li>)}
      </ul>
      <span>{current ? "現在のプラン" : "比較対象"}</span>
    </article>
  );
}
