"use client";

import { useState } from "react";

export function ImportView({ onStart, onNotice }: { onStart: () => void; onNotice: (text: string) => void }) {
  const [text, setText] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");

  function continueWithFixture(kind: string) {
    onNotice(`${kind}を確認しました。公開デモのため固定データでセッションを作成します。`);
    onStart();
  }

  return (
    <div className="page-stack import-page">
      <section className="page-heading"><div><span className="kicker">取り込み</span><h1>取り込み</h1><p>過去会議・外部録音からセッションを作成</p></div><button className="button secondary" onClick={onStart}>↥ 新規セッションへ</button></section>
      <div className="import-grid">
        <section className="import-main-card">
          <header><span>▧</span><div><h2>文字起こしテキスト</h2><p>txt / md / docx / pdf / vtt / srt を読み込み。音声・動画はデモ用フローで確認できます</p></div></header>
          <button className="file-picker" onClick={() => continueWithFixture("デモファイル")}><span><strong>ファイルから読み込む</strong><small>ドラッグ&ドロップ、またはファイル選択</small></span><b>↥ ファイル選択</b></button>
          <textarea aria-label="文字起こし済みテキスト" value={text} onChange={(event) => setText(event.target.value)} placeholder="文字起こし済みテキストを貼り付け" />
          <footer><span>{text.length.toLocaleString("ja-JP")} / 180,000文字</span><button disabled={!text.trim()} onClick={() => continueWithFixture("貼り付けテキスト")}>→ 認識して確認</button></footer>
        </section>
        <aside className="import-side">
          <section><header><span>⌁</span><div><h2>会議URL</h2><p>Zoom / Teams / Meet を保存して録音準備へ</p></div></header><input aria-label="会議URL" value={meetingUrl} onChange={(event) => setMeetingUrl(event.target.value)} placeholder="会議URLを貼り付け" /><button disabled={!/^https?:\/\//i.test(meetingUrl)} onClick={() => continueWithFixture("会議URL")}>→ 認識して確認</button></section>
          <ImportCapability icon="▧" title="PDF" badge="対応">テキストPDFに対応。スキャンPDFはOCR後テキストで取り込み</ImportCapability>
          <ImportCapability icon="♬" title="音声ファイル" badge="Demo">mp3 / m4a / wav は固定データで操作確認</ImportCapability>
          <ImportCapability icon="▣" title="動画ファイル" badge="Demo">mp4 / mov は固定データで操作確認</ImportCapability>
        </aside>
      </div>
    </div>
  );
}

function ImportCapability({ icon, title, badge, children }: { icon: string; title: string; badge: string; children: React.ReactNode }) {
  return <section className="capability-card"><header><span>{icon}</span><h2>{title}</h2><b>{badge}</b></header><p>{children}</p></section>;
}
