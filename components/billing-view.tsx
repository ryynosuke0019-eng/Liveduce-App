export function BillingView({ plan, busy, onCheckout }: { plan: "Free" | "Pro"; busy: boolean; onCheckout: () => void }) {
  return (
    <div className="page-stack settings-page">
      <section className="page-heading"><div><span className="kicker">設定</span><h1>設定</h1><p>プロフィール・プラン・利用状況を確認できます</p></div><span className="sandbox-badge"><i /> STRIPE TEST MODE ONLY</span></section>

      <section className="settings-card"><header><div><h2>プロフィール</h2><p>公開デモ用の架空アカウント</p></div></header><div className="profile-details"><p><span>表示名</span><strong>デモユーザー</strong></p><p><span>メール</span><strong>demo@example.com</strong></p><p><span>登録日</span><strong>2026/08/19</strong></p></div></section>

      <section className="settings-card billing-card"><header><div><h2>プラン・請求</h2><p>現在のプランと、Stripeでの請求状態</p></div><span className="current-plan">{plan}</span></header><div className="billing-summary"><div><span>ステータス</span><strong>{plan === "Pro" ? "test_completed" : "demo"}</strong></div><div><span>クレジット残高</span><strong>{plan === "Pro" ? "360 cr" : "120 cr"}</strong></div><div><span>本番請求</span><strong>無効</strong></div></div>
        <div className="plan-grid">
          <Plan name="Free" price="¥0" copy="個人で試す" features={["月60分の文字起こし", "議事録・タスク生成"]} />
          <Plan name="Pro" price="¥1,980" copy="会議を成果物へ" features={["月180分の文字起こし", "資料・画像・動画ワークフロー"]} featured />
          <Plan name="Team" price="¥4,980" copy="小さなチームで" features={["月1,800分の文字起こし", "共有ワークスペース"]} />
          <Plan name="Ultra" price="¥9,800" copy="高度な生成まで" features={["月1,800分の文字起こし", "高品質生成ルート"]} />
        </div>
        <div className="stripe-action"><div><strong>Stripe Sandboxで決済フローを確認</strong><p>Stripeのテスト画面へ移動します。テストカードのみ利用でき、実際の請求は発生しません。</p></div><button className="button dark" onClick={onCheckout} disabled={busy || plan === "Pro"}>{plan === "Pro" ? "テスト決済確認済み" : busy ? "テスト画面を準備中…" : "Stripeテスト決済を開く →"}</button></div>
      </section>

      <section className="settings-card"><header><div><h2>主要な使用量</h2><p>2026/08 の月次枠から、よく見る項目だけを表示</p></div></header><div className="usage-grid"><Usage label="文字起こし" used="42分" limit={plan === "Pro" ? "180分" : "60分"} pct={plan === "Pro" ? 23 : 70} /><Usage label="取り込み" used="3件" limit="100件/月" pct={3} /><Usage label="AI成果物" used="12件" limit="300件/月" pct={4} /><Usage label="画像 / 動画" used="画像 2 / 動画 0" limit="固定デモ表示" pct={1} /></div></section>

      <section className="settings-card credits-card"><header><div><h2>追加クレジット</h2><p>残高を見て、不足分だけ追加します</p></div><span className="credit-balance">⌁ {plan === "Pro" ? "360" : "120"} cr</span></header><div className="credit-options"><button disabled><strong>100 cr</strong><span>画像生成の追加分</span></button><button disabled><strong>350 cr</strong><span>画像・短い動画案</span></button><button disabled><strong>800 cr</strong><span>まとまった生成作業</span></button></div><p className="settings-note">公開デモでは追加購入を無効化し、上のStripeテスト決済1経路だけを開放しています。</p></section>
    </div>
  );
}

function Plan({ name, price, copy, features, featured = false }: { name: string; price: string; copy: string; features: string[]; featured?: boolean }) { return <article className={featured ? "plan-card featured" : "plan-card"}>{featured ? <b>おすすめ</b> : null}<h3>{name}</h3><strong>{price}<small>/月</small></strong><p>{copy}</p><ul>{features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul></article>; }
function Usage({ label, used, limit, pct }: { label: string; used: string; limit: string; pct: number }) { return <article><span>{label}</span><strong>{used}</strong><small>上限 {limit}</small><i><b style={{ width: `${pct}%` }} /></i></article>; }
