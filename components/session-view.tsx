import { transcriptLines } from "@/lib/demo-data";

export function SessionView({
  recording,
  visibleLines,
  onToggleRecording,
  onGenerate,
}: {
  recording: boolean;
  visibleLines: number;
  onToggleRecording: () => void;
  onGenerate: () => void;
}) {
  return (
    <div className="page-stack session-page">
      <section className="session-heading">
        <div><span className="kicker">オンタイム記録 · ビジネス</span><h1>プロダクト定例 — リリース計画</h1><p>デモ用の固定会話です。マイク・音声認識・生成APIには接続しません。</p></div>
        <div className="record-controls"><span className={recording ? "recording-time active" : "recording-time"}><i />{recording ? "00:00:52 録音中" : "待機"}</span><button className={recording ? "button stop" : "button dark"} onClick={onToggleRecording}>{recording ? "■ 一時停止" : "● 録音を再開"}</button></div>
      </section>

      <div className="session-grid">
        <section className="transcript-panel">
          <header><div><span className="kicker">リアルタイム文字起こし</span><h2>会話</h2></div><span className="language-pill">日本語 ▾</span></header>
          <div className="transcript-lines">
            {transcriptLines.slice(0, visibleLines).map((line, index) => (
              <article key={`${line.time}-${line.speaker}`} className={index === visibleLines - 1 && recording ? "fresh" : ""}>
                <div><span className={`speaker speaker-${index % 3}`}>{line.speaker.slice(0, 1)}</span><strong>{line.speaker}</strong><time>{line.time}</time><button title="この発言から画像案を作る">▣</button><button title="この発言をピン留め">⌁</button></div><p>{line.text}</p>
              </article>
            ))}
            {recording && visibleLines < transcriptLines.length ? <div className="listening"><i />会話を整理しています<b /><b /><b /></div> : null}
          </div>
        </section>

        <aside className="assist-stack">
          <section className="assist-card"><header><span className="kicker">オンタイム解説</span><b>LIVE</b></header><h2>いま話している内容</h2><div className="context-card"><small>論点</small><strong>リリースの判断条件</strong><p>日程だけでなく、オンボーディング改善と公開前レビューを同じ計画にまとめています。</p></div><div className="term-row"><span>オンボーディング</span><p>利用開始直後に、価値を理解し最初の成果まで到達するための導線。</p></div></section>
          <section className="assist-card decisions"><header><span className="kicker">検出した決定</span><b>3</b></header><ul><li><i>✓</i>リリース目標は9月12日</li><li><i>✓</i>オンボーディング改善を優先</li><li><i>✓</i>9月5日に最終レビュー</li></ul></section>
          <section className="assist-card"><span className="kicker">セリフから生成</span><h2>選んだ発言を素材へ</h2><p className="small-copy">共有画像、短い動画案、投稿文を固定データで確認できます。</p><button className="button secondary wide" onClick={onGenerate}>選択箇所から成果物を作る →</button></section>
        </aside>
      </div>

      <section className="finish-bar"><div><strong>会議が終わったら</strong><span>文字起こしから議事録・決定事項・資料構成案をまとめます。</span></div><button className="button dark" onClick={onGenerate}>セッションを完了して成果物へ</button></section>
    </div>
  );
}
