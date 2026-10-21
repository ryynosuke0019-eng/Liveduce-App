import Image from "next/image";
import Link from "next/link";

const capabilities = [
  {
    number: "01",
    title: "発言から、その場で生成",
    body: "会議中の重要な一言を起点に、画像・動画コンセプト・AI解説を同じ画面で立ち上げます。",
  },
  {
    number: "02",
    title: "会議後の成果物まで整理",
    body: "文字起こしで止めず、議事録・決定事項・資料構成・共有文案へつなげます。",
  },
  {
    number: "03",
    title: "次工程へ渡せる形式",
    body: "デモ用議事録をMarkdownで書き出し、編集・共有に渡す操作を確認できます。",
  },
];

const proofItems = [
  ["記録", "会議URL・音声・動画・テキスト取り込み"],
  ["理解", "話者別文字起こし・文脈補助・用語解説"],
  ["生成", "議事録・画像・動画案・資料構成・共有文"],
  ["実行", "アクション整理・書き出し・共有導線"],
];

export function PortfolioHome() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-nav">
        <Link href="#top" className="portfolio-brand" aria-label="Liveduce トップ">
          <Image
            src="/brand/liveduce-logo.png"
            alt="Liveduce"
            width={1038}
            height={214}
            priority
          />
        </Link>
        <nav aria-label="ページ内ナビゲーション">
          <Link href="#product">プロダクト</Link>
          <Link href="#workflow">体験設計</Link>
          <Link href="#proof">実装範囲</Link>
          <Link href="/demo" className="portfolio-nav-cta">
            操作デモ
          </Link>
        </nav>
      </header>

      <section id="top" className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <div className="portfolio-eyebrow">
            <span>PRODUCT PORTFOLIO</span>
            <b>Demo snapshot · 2026.08</b>
          </div>
          <h1>
            会議の一言を、
            <br />
            <em>その場で成果物へ。</em>
          </h1>
          <p>
            Liveduceは、会議中の発言から議事録・画像・動画コンセプト・AI解説・共有文案までを、
            一つの流れで生成・整理するプロダクトです。
          </p>
          <div className="portfolio-hero-actions">
            <Link href="/demo" className="portfolio-button primary">
              操作デモを開く <span>→</span>
            </Link>
            <Link href="#product" className="portfolio-button secondary">
              制作物を見る
            </Link>
          </div>
          <div className="portfolio-safety-line">
            <span>公開ポートフォリオ</span>
            <p>固定データの操作デモです。実際の録音・AI生成・外部サービス連携は行いません。決済は任意のStripeテスト環境のみです。</p>
          </div>
        </div>
        <div className="portfolio-hero-mark" aria-hidden="true">
          <Image
            src="/brand/liveduce-mark.png"
            alt=""
            width={267}
            height={214}
            priority
          />
        </div>
      </section>

      <section className="portfolio-stage" aria-label="Liveduceプロダクト画面">
        <div className="portfolio-stage-glow" />
        <Image
          src="/portfolio/quote-to-media-stage.png"
          alt="発言から画像・動画・AI解説を生成するLiveduceのセッション画面"
          width={1672}
          height={736}
          priority
          sizes="(max-width: 900px) 96vw, 1200px"
        />
        <div className="portfolio-stage-caption">
          <span>LIVE SESSION</span>
          <p>発言を選び、画像・動画・AI解説へ展開</p>
        </div>
      </section>

      <section className="portfolio-proof-strip" aria-label="Liveduceの提供範囲">
        {proofItems.map(([title, body]) => (
          <div key={title}>
            <strong>{title}</strong>
            <span>{body}</span>
          </div>
        ))}
      </section>

      <section id="product" className="portfolio-section portfolio-capabilities">
        <header className="portfolio-section-heading">
          <div>
            <span className="portfolio-kicker">PRODUCT</span>
            <h2>文字起こしで終わらせない。</h2>
          </div>
          <p>
            記録、理解、生成、共有を別々のツールへ分断せず、会議の文脈を保ったまま次工程へ渡します。
          </p>
        </header>
        <div className="portfolio-capability-grid">
          {capabilities.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="portfolio-section portfolio-workflow">
        <header className="portfolio-section-heading compact">
          <div>
            <span className="portfolio-kicker">WORKFLOW</span>
            <h2>従来の議事録との違い。</h2>
          </div>
          <p>会議終了後に読み返すだけでなく、話している瞬間から意思決定と制作を前へ進めます。</p>
        </header>
        <figure className="portfolio-visual-card">
          <Image
            src="/portfolio/quote-difference-workflow-core.png"
            alt="従来の議事録とLiveduceのワークフロー比較"
            width={1576}
            height={600}
            sizes="(max-width: 900px) 94vw, 1180px"
          />
        </figure>
      </section>

      <section id="proof" className="portfolio-section portfolio-screens">
        <header className="portfolio-section-heading">
          <div>
            <span className="portfolio-kicker">IMPLEMENTED SURFACES</span>
            <h2>入口から成果物まで、実画面で設計。</h2>
          </div>
          <p>
            ダッシュボード、取り込み、セッション、成果物整理、料金・クレジットまで、プロダクト全体を一貫して設計しています。
          </p>
        </header>
        <div className="portfolio-screen-stack">
          <figure className="portfolio-screen-card wide">
            <figcaption>
              <span>01 / DASHBOARD</span>
              <strong>会議の記録と成果物を一画面で確認</strong>
            </figcaption>
            <Image
              src="/portfolio/liveduce-dashboard.png"
              alt="Liveduceダッシュボード"
              width={1535}
              height={678}
              sizes="(max-width: 900px) 94vw, 1180px"
            />
          </figure>
          <div className="portfolio-screen-pair">
            <figure className="portfolio-screen-card">
              <figcaption>
                <span>02 / IMPORT</span>
                <strong>会議URL・ファイル・テキストから開始</strong>
              </figcaption>
              <Image
                src="/portfolio/liveduce-import.png"
                alt="Liveduce取り込み画面"
                width={1535}
                height={730}
                sizes="(max-width: 900px) 94vw, 580px"
              />
            </figure>
            <figure className="portfolio-screen-card">
              <figcaption>
                <span>03 / OUTCOMES</span>
                <strong>会議後の成果物を一覧化</strong>
              </figcaption>
              <Image
                src="/portfolio/liveduce-outcomes-screen.png"
                alt="Liveduce成果物画面"
                width={989}
                height={688}
                sizes="(max-width: 900px) 94vw, 580px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-demo-cta">
        <Image src="/brand/liveduce-mark.png" alt="" width={267} height={214} />
        <div>
          <span className="portfolio-kicker">INTERACTIVE DEMO</span>
          <h2>実際の流れを、安全な固定データで。</h2>
          <p>
            新規セッション、記録、文脈補助、成果物、画像・動画、連携、料金画面まで操作できます。
          </p>
        </div>
        <Link href="/demo" className="portfolio-button primary light">
          操作デモを開く <span>→</span>
        </Link>
      </section>

      <footer className="portfolio-footer">
        <Image src="/brand/liveduce-logo.png" alt="Liveduce" width={1038} height={214} />
        <p>Meeting intelligence to executable outcomes.</p>
        <span>Portfolio build · 2026</span>
      </footer>
    </main>
  );
}
