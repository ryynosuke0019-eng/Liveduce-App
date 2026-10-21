"use client";

import { useState } from "react";

import { sessions, type ViewName } from "@/lib/demo-data";

export function DashboardView({
  onStart,
  onNavigate,
  onNotice,
  plan,
}: {
  onStart: () => void;
  onNavigate: (view: ViewName) => void;
  onNotice: (text: string) => void;
  plan: "Free" | "Pro";
}) {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [query, setQuery] = useState("");
  const visibleSessions = sessions.filter((session) =>
    `${session.title} ${session.summary}`.toLowerCase().includes(query.toLowerCase()),
  );
  const validUrl = /^https?:\/\//i.test(meetingUrl);

  return (
    <div className="page-stack dashboard-page">
      <section className="page-heading">
        <div><span className="kicker">ビジネスモード</span><h1>会議の記録と成果物</h1><p>進行中のセッションと、生成したアウトプットの一覧です。</p></div>
        <div className="heading-actions"><button className="button secondary" onClick={() => onNavigate("import")}>↥ 取り込み</button><button className="button dark" onClick={onStart}>＋ 新規セッション</button></div>
      </section>

      <div className="dashboard-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="セッションや文字起こしを検索..." aria-label="セッションを検索" /><kbd>Ctrl K</kbd></div>

      <p className="dashboard-tagline">会議の記録を、議事録・資料・画像/動画へ変える新体験。</p>

      <section className="meeting-capture">
        <div><span className="kicker">ミーティングURL</span><h2>Zoom / Teams / Meet URLから始める</h2></div>
        <button className="button secondary compact" onClick={() => onNavigate("integrations")}>▣ 連携を見る</button>
        <div className="meeting-input"><span>⌁</span><input value={meetingUrl} onChange={(event) => setMeetingUrl(event.target.value)} placeholder="Zoom、Microsoft Teams、Google MeetのURLを貼り付け" /><button disabled={!validUrl} onClick={() => { onNotice("URLを確認しました。デモ用セッションを開始します（外部接続はしません）。"); onStart(); }}>▣ 取り込む</button></div>
        <p>OAuth連携前でも、会議URLをセッションに紐づけられます。</p>
      </section>

      <section className="stat-grid" aria-label="利用状況">
        <Stat label="セッション総数" value="6" note="4 完了 / 2 進行中" />
        <Stat label="今月の収録時間" value="42 分" note="公開デモの固定値" />
        <Stat label="生成アセット" value="12" note="議事録・資料・画像" />
        <Stat label="プラン" value={plan} note={plan === "Pro" ? "画像・動画機能を利用可能" : "固定デモ素材のみ表示"} />
      </section>

      <section className="dashboard-lower">
        <div className="sessions-panel">
          <header><div><span className="kicker">最近のセッション</span><h2>記録から成果物まで</h2></div><span>{visibleSessions.length}件</span></header>
          <div className="session-cards">
            {visibleSessions.map((session, index) => (
              <button key={session.id} onClick={() => onNavigate(index === 0 ? "outputs" : "session")}>
                <div className="session-card-top"><span className={session.status === "完了" ? "status done" : "status live"}>{session.status}</span><span>{session.date}</span></div>
                <h3>{session.title}</h3><p>{session.summary}</p>
                <footer><span>◷ {session.duration}</span><span>♙ {session.people}名</span><span>▧ {session.outputs}成果物</span></footer>
              </button>
            ))}
            {visibleSessions.length === 0 ? <p className="empty-state">該当するセッションはありません。</p> : null}
          </div>
        </div>
        <aside className="recent-output-panel"><span className="kicker">生成済みアウトプット</span><h2>すぐ渡せる形へ</h2><button onClick={() => onNavigate("outputs")}><i>✓</i><span><strong>決定事項サマリー</strong><small>第5回 営業会議 · 保存済み</small></span><b>→</b></button><button onClick={() => onNavigate("outputs")}><i>▤</i><span><strong>営業資料の構成案</strong><small>顧客ヒアリング · 7ページ</small></span><b>→</b></button><button onClick={() => onNavigate("outputs")}><i>▣</i><span><strong>共有画像案</strong><small>固定のデモ素材</small></span><b>→</b></button></aside>
      </section>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="stat-tile"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>;
}
