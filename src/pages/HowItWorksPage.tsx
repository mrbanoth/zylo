import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Link2, Sparkles, CalendarClock, Repeat, BarChart3 } from "lucide-react";
import { GrowthLoopInfographic, ChannelHeatmapInfographic } from "../components/Infographics";

const STEPS = [
  {
    number: "01",
    title: "Authorize Your Social Channels",
    subtitle: "Official OAuth 2.0 in seconds",
    accent: "#7CF2B5",
    icon: Link2,
    description:
      "Link Instagram, LinkedIn, X, TikTok, YouTube Shorts, and Threads without ever sharing your password. Configure per-channel timezones and opt-in cross-promotion preferences.",
    checklist: [
      "Read-only or full publishing scopes per account",
      "Automatic follower & baseline engagement sync",
      "Instant one-click disconnect anytime",
    ],
  },
  {
    number: "02",
    title: "Generate Native Variants in AI Studio",
    subtitle: "Powered by Gemini models",
    accent: "#B39FF8",
    icon: Sparkles,
    description:
      "Drop a topic, product update, or rough bullet notes into Zylo AI Studio. Get distinct opening hooks, captions, and 5-tag niche hashtag clusters tailored to each platform's norms.",
    checklist: [
      "Separate framing for LinkedIn, X Threads, Instagram & TikTok",
      "Tone controls (Authentic, Analytical, Bold, Conversational)",
      "One-click dispatch straight to your publishing queue",
    ],
  },
  {
    number: "03",
    title: "Auto-Schedule Into Peak Windows",
    subtitle: "Zero manual tab switching",
    accent: "#FCE694",
    icon: CalendarClock,
    description:
      "Queue posts across days or weeks in our unified calendar. Zylo detects when your specific audience is online and shifts publishing windows automatically for maximum first-hour velocity.",
    checklist: [
      "First-comment hashtag injection for clean Instagram captions",
      "Multi-platform visual queue & instant edits",
      "Smart spacing prevents back-to-back channel overlap",
    ],
  },
  {
    number: "04",
    title: "Activate Evergreen & Cross-Promotion Rules",
    subtitle: "Compounding distribution loop",
    accent: "#F4D4FA",
    icon: Repeat,
    description:
      "Enable rules that mirror Reels to TikTok, recycle top-performing evergreen posts after 30 days, and share launches with non-competing creator partners automatically.",
    checklist: [
      "Customizable cooldown rules & trigger thresholds",
      "Real creator peer clusters—zero spam bots",
      "Live execution logs & instant pause switches",
    ],
  },
];

export function HowItWorksPage() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold text-[#5A5D65]">How Zylo Works</p>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight"
              style={{ textWrap: "balance" }}
            >
              From raw idea to automated multi-channel growth in four steps
            </h1>
            <p className="text-base text-[#5A5D65] leading-relaxed max-w-2xl">
              Replace scattered spreadsheets and daily manual posting with a connected workflow that drafts, schedules, cross-promotes, and recycles your best work.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step Breakdown */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const active = selectedStep === index;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setSelectedStep(index)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                      active
                        ? "border-[#111214] bg-[#111214] text-white"
                        : "border-neutral-200 bg-white text-[#111214] hover:border-neutral-400"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: step.accent }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#111214] shrink-0"
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-mono tabular-nums ${
                          active ? "text-[#7CF2B5]" : "text-[#5A5D65]"
                        }`}
                      >
                        Step {step.number} · {step.subtitle}
                      </p>
                      <h2 className="font-display font-bold text-lg mt-0.5">{step.title}</h2>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Detail Card */}
            <div className="lg:col-span-7 rounded-[36px] border border-neutral-200 bg-neutral-50/70 p-7 sm:p-10 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span
                  style={{ backgroundColor: STEPS[selectedStep].accent }}
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-[#111214] font-mono tabular-nums"
                >
                  Step {STEPS[selectedStep].number}
                </span>
                <BarChart3 className="w-5 h-5 text-[#5A5D65]" />
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111214]">
                  {STEPS[selectedStep].title}
                </h3>
                <p className="text-base text-[#3A3D45] leading-relaxed">
                  {STEPS[selectedStep].description}
                </p>
              </div>

              <ul className="space-y-3 pt-2">
                {STEPS[selectedStep].checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#111214]">
                    <span className="w-5 h-5 rounded-full bg-[#7CF2B5] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#111214]" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors"
                >
                  <span>Try This Step Live</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/features"
                  className="px-5 py-3 rounded-full border border-neutral-300 bg-white text-sm font-semibold text-[#111214] hover:border-[#111214]"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infographics Section */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <GrowthLoopInfographic />
          <ChannelHeatmapInfographic />
        </div>
      </section>
    </div>
  );
}
