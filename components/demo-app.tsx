"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { BillingView } from "@/components/billing-view";
import { DashboardView } from "@/components/dashboard-view";
import { ImportView } from "@/components/import-view";
import { IntegrationsView } from "@/components/integrations-view";
import { NewSessionView } from "@/components/new-session-view";
import { OutputsView } from "@/components/outputs-view";
import { SessionView } from "@/components/session-view";
import type { ViewName } from "@/lib/demo-data";

type Notice = { tone: "success" | "info" | "error"; text: string } | null;

export function DemoApp() {
  const [view, setView] = useState<ViewName>("dashboard");
  const [recording, setRecording] = useState(false);
  const [visibleLines, setVisibleLines] = useState(3);
  const [plan, setPlan] = useState<"Free" | "Pro">("Free");
  const [notice, setNotice] = useState<Notice>(null);
  const [checkoutBusy, setCheckoutBusy] = useState(false);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => {
      setVisibleLines((current) => {
        if (current >= 5) {
          setRecording(false);
          return current;
        }
        return current + 1;
      });
    }, 1700);
    return () => window.clearInterval(timer);
  }, [recording]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("checkout");
    const sessionId = params.get("session_id");
    if (state === "cancel") {
      setNotice({ tone: "info", text: "Stripeのテスト決済をキャンセルしました。実請求はありません。" });
      setView("billing");
      window.history.replaceState({}, "", "/demo");
      return;
    }
    if (state !== "success" || !sessionId) return;

    void fetch(`/api/stripe/demo-confirm?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const result = (await response.json()) as { confirmed?: boolean };
        if (!response.ok || !result.confirmed) throw new Error("unconfirmed");
        setPlan("Pro");
        setView("billing");
        setNotice({ tone: "success", text: "Stripeテスト決済を確認しました。実際のお金は動いていません。" });
      })
      .catch(() => {
        setView("billing");
        setNotice({ tone: "error", text: "Stripeテスト決済の確認に失敗しました。" });
      })
      .finally(() => window.history.replaceState({}, "", "/demo"));
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 6500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function info(text: string) {
    setNotice({ tone: "info", text });
  }

  function startSession() {
    setView("new");
    setRecording(false);
    setNotice({ tone: "info", text: "開始前の設定画面を表示しました。まだ記録は始まっていません。" });
  }

  function beginSession() {
    setView("session");
    setVisibleLines(3);
    setRecording(true);
    setNotice({ tone: "info", text: "固定の会議データを再生します。マイク・外部AI・保存処理は使用しません。" });
  }

  async function startCheckout() {
    setCheckoutBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/stripe/demo-checkout", { method: "POST" });
      const result = (await response.json()) as { url?: string; code?: string; error?: string };
      if (response.ok && result.url) {
        window.location.assign(result.url);
        return;
      }
      if (result.code === "sandbox_unavailable") {
        setNotice({ tone: "error", text: "Stripeテスト環境が一時的に利用できません。実決済へ切り替わることはありません。" });
        return;
      }
      throw new Error(result.error ?? "checkout_failed");
    } catch {
      setNotice({ tone: "error", text: "Stripeテスト決済を開始できませんでした。時間を置いてお試しください。" });
    } finally {
      setCheckoutBusy(false);
    }
  }

  return (
    <AppShell view={view} plan={plan} onNavigate={setView} onStart={startSession}>
      {view === "dashboard" ? <DashboardView onStart={startSession} onNavigate={setView} onNotice={info} plan={plan} /> : null}
      {view === "new" ? <NewSessionView onBegin={beginSession} onImport={() => setView("import")} /> : null}
      {view === "import" ? <ImportView onStart={startSession} onNotice={info} /> : null}
      {view === "session" ? <SessionView recording={recording} visibleLines={visibleLines} onToggleRecording={() => setRecording((current) => !current)} onGenerate={() => { setView("outputs"); setNotice({ tone: "success", text: "固定の会議データから成果物画面を表示しました。外部AI通信はありません。" }); }} /> : null}
      {view === "outputs" ? <OutputsView onNavigate={setView} /> : null}
      {view === "media" ? <OutputsView onNavigate={setView} initialTab="media" /> : null}
      {view === "integrations" ? <IntegrationsView onImport={() => setView("import")} onNotice={info} /> : null}
      {view === "billing" ? <BillingView plan={plan} busy={checkoutBusy} onCheckout={startCheckout} /> : null}
      {notice ? <div className={`toast toast-${notice.tone}`} role="status">{notice.text}</div> : null}
    </AppShell>
  );
}
