export function IntegrationsView({ onImport, onNotice }: { onImport: () => void; onNotice: (text: string) => void }) {
  return (
    <div className="page-stack integrations-page">
      <section className="page-heading"><div><span className="kicker">連携</span><h1>会議の入口と、成果物の出口</h1><p>完成版で設計された連携導線を確認できます。公開デモでは外部サービスへ接続しません。</p></div></section>
      <section className="integration-feature"><div className="integration-logo">⌁</div><div><span className="kicker">現在使える入口</span><h2>会議URLを貼り付けて開始</h2><p>Zoom / Microsoft Teams / Google Meet のURLをセッションに紐づけ、録音準備へ進みます。</p></div><button className="button dark" onClick={onImport}>URLを取り込む →</button></section>
      <div className="integration-grid">
        <Integration name="Google Calendar" mark="31" status="準備中" description="予定から会議URLと参加者を取り込む" onClick={onNotice} />
        <Integration name="Google Docs" mark="D" status="書き出し設計済み" description="議事録と決定事項をドキュメントへ" onClick={onNotice} />
        <Integration name="Slack" mark="S" status="準備中" description="要約とアクションをチャンネルへ共有" onClick={onNotice} />
        <Integration name="Notion" mark="N" status="準備中" description="会議記録をデータベースへ保存" onClick={onNotice} />
        <Integration name="CRM" mark="C" status="将来対応" description="商談の決定事項を案件情報へ反映" onClick={onNotice} />
        <Integration name="共有リンク" mark="↗" status="操作可能" description="成果物を閲覧用リンクとして共有" onClick={onNotice} />
      </div>
    </div>
  );
}

function Integration({ name, mark, status, description, onClick }: { name: string; mark: string; status: string; description: string; onClick: (text: string) => void }) {
  return <article className="integration-card"><div className="integration-mark">{mark}</div><div><h2>{name}</h2><p>{description}</p></div><span>{status}</span><button onClick={() => onClick(`${name}は公開デモでは外部接続しません。完成版の導線のみ表示しています。`)}>詳細</button></article>;
}
