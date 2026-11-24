import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  Hash,
  LineChart,
  Share2,
  Zap,
} from "lucide-react";
import { ReachROICalculator } from "../components/Infographics";

const FEATURE_TABS = [
  {
    id: "scheduler",
    label: "Auto-Post Scheduler",
    icon: CalendarDays,
    accent: "#7CF2B5",
    headline: "Visual calendar & smart queue across 6 networks",
    summary:
      "Plan weeks of carousels, short-form videos, and text threads in a unified view. Zylo handles timezone conversions, media aspect validation, and automated first-comment hashtags.",
    specs: [
      { label: "Supported Channels", value: "IG, LI, X, TT, YT, Threads" },
      { label: "Queue Capacity", value: "Unlimited on Studio" },
      { label: "First-Comment Delay", value: "45 seconds post-publish" },
    ],
    ctaLink: "/app/scheduler",
    ctaLabel: "Open Scheduler",
  },
  {
    id: "ai-studio",
    label: "Gemini AI Studio",
    icon: Bot,
    accent: "#B39FF8",
    headline: "Platform-native copy, hooks, and content repurposing",
    summary:
      "Turn one raw idea or blog article into separate, format-aware posts for every connected channel. Review hooks, inspect predicted engagement rationale, and send directly to your queue.",
    specs: [
      { label: "Model Engine", value: "Gemini 4 Hydrogen" },
      { label: "Variants per Brief", value: "Up to 6 platforms" },
      { label: "Repurpose Input", value: "Notes, blogs, transcripts" },
    ],
    ctaLink: "/app/ai-studio",
    ctaLabel: "Try AI Studio",
  },
  {
    id: "automations",
    label: "Automation Rules",
    icon: Zap,
    accent: "#FCE694",
    headline: "Trigger-action workflows that run 24/7",
    summary:
      "Build rule-based social automation without brittle webhooks. Recycle evergreen winners after 30 days, mirror short videos across TikTok and Shorts, and auto-reply to keyword comments.",
    specs: [
      { label: "Rule Templates", value: "12+ ready-to-toggle" },
      { label: "Cooldown Controls", value: "7 to 90 days" },
      { label: "Execution Logs", value: "Full timestamp history" },
    ],
    ctaLink: "/app/automations",
    ctaLabel: "View Automation Rules",
  },
  {
    id: "cross-promo",
    label: "Cross-Promotion",
    icon: Share2,
    accent: "#F4D4FA",
    headline: "Shine Together creator amplification network",
    summary:
      "Pair automatically with verified non-competing creators in adjacent niches. Early-hour organic shares and saves give new posts the momentum needed for algorithmic discovery.",
    specs: [
      { label: "Matching Logic", value: "Niche + Audience Tier" },
      { label: "Avg. Reach Multiplier", value: "2.7x non-follower reach" },
      { label: "Opt-Out Control", value: "Per-post & per-channel" },
    ],
    ctaLink: "/app/accounts",
    ctaLabel: "Configure Cross-Promo",
  },
  {
    id: "hashtags",
    label: "Hashtag & Analytics",
    icon: Hash,
    accent: "#7CF2B5",
    headline: "Niche tag clustering & unified attribution",
    summary:
      "Stop pasting 30 generic tags. Zylo groups 4–6 high-intent topic and community tags, rotates sets to avoid repetition penalties, and attributes follower growth across every campaign.",
    specs: [
      { label: "Cluster Size", value: "4–6 high-intent tags" },
      { label: "Attribution Window", value: "Up to 12 months" },
      { label: "Export Formats", value: "CSV & JSON reports" },
    ],
    ctaLink: "/app/analytics",
    ctaLabel: "Explore Analytics",
  },
];

export function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("scheduler");
  const current = FEATURE_TABS.find((t) => t.id === activeTab) || FEATURE_TABS[0];
  const Icon = current.icon;

  return (
    <div className="bg-white">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold text-[#5A5D65]">Platform Capabilities</p>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Every tool required to run social growth in one workspace
            </h1>
            <p className="text-base text-[#5A5D65] leading-relaxed">
              Explore each module below or launch the live interactive platform to test scheduling, automations, and AI post generation.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Tabs */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-100 w-fit">
            {FEATURE_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#111214] text-white"
                      : "text-[#5A5D65] hover:text-[#111214]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-[36px] border border-neutral-200 p-7 sm:p-10 bg-white">
            <div className="lg:col-span-7 space-y-6">
              <div
                style={{ backgroundColor: current.accent }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#111214]"
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111214]">
                  {current.headline}
                </h2>
                <p className="text-base text-[#5A5D65] leading-relaxed">
                  {current.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={current.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors"
                >
                  <span>{current.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="px-5 py-3 rounded-full border border-neutral-300 text-sm font-semibold text-[#111214] hover:border-[#111214]"
                >
                  Compare Plans
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl bg-neutral-50 border border-neutral-200/80 p-6 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A5D65]">Module Specifications</span>
                <LineChart className="w-4 h-4 text-[#5A5D65]" />
              </div>
              <div className="divide-y divide-neutral-200">
                {current.specs.map((spec) => (
                  <div key={spec.label} className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-sm text-[#5A5D65]">{spec.label}</span>
                    <span className="text-sm font-semibold text-[#111214] font-mono tabular-nums text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#3A3D45] pt-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Included in Growth Studio & Agency Network</span>
              </div>
            </div>
          </div>

          <ReachROICalculator />
        </div>
      </section>
    </div>
  );
}
