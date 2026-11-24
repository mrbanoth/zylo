import React, { useState } from "react";
import { ShieldCheck, Lock, Check } from "lucide-react";

const SECTIONS = [
  {
    id: "data-collected",
    title: "1. Information We Collect",
    body: "When you connect a social channel to Zylo via official OAuth 2.0, we receive only the scoped tokens and profile identifiers you explicitly approve (such as handle, follower count, engagement insights, and publishing permissions). We never collect or store your social media passwords.",
  },
  {
    id: "ai-processing",
    title: "2. AI Content Studio & Data Handling",
    body: "Prompts, topic briefs, and draft captions submitted inside Zylo AI Studio are processed solely to generate your requested social media variations and automation blueprints. Your private drafts and analytics are never sold to third-party data brokers or used to train public advertising profiles.",
  },
  {
    id: "oauth-revocation",
    title: "3. OAuth Token Encryption & Instant Revocation",
    body: "All connected social channel tokens are encrypted at rest (AES-256) and transmitted over TLS 1.3. You may disconnect any Instagram, LinkedIn, X, TikTok, YouTube, or Threads account from your Zylo Accounts screen at any time, immediately purging stored tokens.",
  },
  {
    id: "retention-rights",
    title: "4. Your Privacy Rights (GDPR & CCPA)",
    body: "You have the right to access, export, correct, or permanently delete your workspace data. Export requests for scheduled queues and historical analytics are available directly from your account settings or by contacting privacy@zylo.social.",
  },
];

export function PrivacyPage() {
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  return (
    <div className="bg-white">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A5D65]">
            <span className="font-semibold text-[#111214]">Legal & Trust</span>
            <span aria-hidden="true">·</span>
            <span>Effective November 2026</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="text-base text-[#5A5D65] max-w-2xl leading-relaxed">
            How Zylo protects your connected social media accounts, OAuth tokens, AI prompts, and analytics telemetry.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-neutral-200 p-6 space-y-3 bg-neutral-50/60">
              <p className="text-xs font-bold text-[#111214]">On this page</p>
              <nav className="space-y-2 text-sm">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-[#5A5D65] hover:text-[#111214] transition-colors"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Interactive Cookie & Telemetry Preferences */}
            <div className="rounded-3xl border border-neutral-200 p-6 space-y-4 bg-white">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#7CF2B5] flex items-center justify-center text-[#111214]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <p className="font-display font-bold text-sm text-[#111214]">
                  Privacy Controls
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 py-2 border-b border-neutral-100">
                <div>
                  <p className="text-xs font-semibold text-[#111214]">Essential Session</p>
                  <p className="text-[11px] text-[#5A5D65]">Required for workspace state</p>
                </div>
                <span className="text-xs font-mono text-[#5A5D65]">Always on</span>
              </div>

              <div className="flex items-center justify-between gap-3 py-1">
                <div>
                  <p className="text-xs font-semibold text-[#111214]">Product Diagnostics</p>
                  <p className="text-[11px] text-[#5A5D65]">Anonymous performance metrics</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsCookies}
                  onClick={() => {
                    setAnalyticsCookies((v) => !v);
                    setSavedNotice(true);
                  }}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                    analyticsCookies ? "bg-[#111214]" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      analyticsCookies ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {savedNotice && (
                <p className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" /> Preferences updated.
                </p>
              )}
            </div>
          </aside>

          {/* Policy Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl bg-[#B39FF8]/25 border border-[#B39FF8]/50 p-6 flex items-start gap-4">
              <Lock className="w-5 h-5 text-[#111214] shrink-0 mt-0.5" />
              <p className="text-sm text-[#111214] leading-relaxed">
                <strong>Zero-Password Architecture:</strong> Zylo authenticates exclusively through official platform OAuth flows. You retain complete ownership of all content, follower lists, and analytics exported from your workspace.
              </p>
            </div>

            {SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-2.5 pb-6 border-b border-neutral-100">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111214]">
                  {sec.title}
                </h2>
                <p className="text-sm sm:text-base text-[#5A5D65] leading-relaxed">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
