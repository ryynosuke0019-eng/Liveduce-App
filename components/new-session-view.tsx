export function NewSessionView({
  onBegin,
  onImport,
}: {
  onBegin: () => void;
  onImport: () => void;
}) {
  return (
    <div className="page-stack new-session-page">
      <section className="page-heading">
        <div>
          <span className="kicker">新規セッション</span>
          <h1>記録を始める前に</h1>
          <p>会議名・言語・記録方法を確認します。公開デモではマイクや外部AIへ接続しません。</p>
        </div>
        <button className="button secondary" onClick={onImport}>↥ ファイルから取り込む</button>
      </section>

      <div className="session-setup-grid">
        <section className="settings-card setup-card">
          <header>
            <div>
              <h2>セッション情報</h2>
              <p>本体の開始前フローを固定データで再現しています</p>
            </div>
            <span className="sandbox-badge"><i /> SAFE DEMO</span>
          </header>
          <label>
            <span>セッション名</span>
            <input defaultValue="プロダクト定例 — リリース計画" />
          </label>
          <div className="setup-fields">
            <label>
              <span>会話の言語</span>
              <select defaultValue="ja">
                <option value="ja">日本語</option>
                <option value="de">ドイツ語</option>
                <option value="en">英語</option>
              </select>
            </label>
            <label>
              <span>モード</span>
              <select defaultValue="business">
                <option value="business">ビジネス</option>
                <option value="creator">クリエイター</option>
              </select>
            </label>
          </div>
          <footer className="setup-actions">
            <p>開始すると、架空の会議データが数秒ずつ表示されます。</p>
            <button className="button dark" onClick={onBegin}>固定データで記録を開始 →</button>
          </footer>
        </section>

        <aside className="settings-card setup-safety">
          <h2>このデモで使わないもの</h2>
          <ul>
            <li>✓ マイク・カメラ</li>
            <li>✓ Supabase・本番DB</li>
            <li>✓ OpenAI・Google・Gladia API</li>
            <li>✓ 個人情報・実際の会議データ</li>
          </ul>
          <p>画面操作と成果物までの流れだけを安全に確認できます。</p>
        </aside>
      </div>
    </div>
  );
}
