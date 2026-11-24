import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  Link2,
  Repeat,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { WEEKLY_HEATMAP_DATA } from "../data/mockData";

const PIPELINE_STAGES = [
  {
    id: "connect",
    step: "01",
    title: "Connect Channels",
    accent: "#7CF2B5",
    icon: Link2,
    summary:
      "Authorize Instagram, LinkedIn, X, TikTok, and YouTube via official OAuth 2.0 in under 30 seconds.",
    metricLabel: "Setup Time",
    metricValue: "28 sec",
    detail: "Zero password storage · Granular per-channel permissions",
  },
  {
    id: "ai-draft",
    step: "02",
    title: "AI Native Adaptation",
    accent: "#B39FF8",
    icon: Sparkles,
    summary:
      "Gemini AI turns a single campaign note into distinct hooks, carousels, and threads formatted for each feed.",
    metricLabel: "Draft Speed",
    metricValue: "6.4x faster",
    detail: "Platform-specific tone, line breaks & 5-tag niche clusters",
  },
  {
    id: "schedule",
    step: "03",
    title: "Peak Auto-Queue",
    accent: "#FCE694",
    icon: CalendarClock,
    summary:
      "Posts lock into high-velocity audience windows and shift automatically when follower activity spikes.",
    metricLabel: "Window Lift",
    metricValue: "+38% reach",
    detail: "Timezone-aware slots + automated first-comment tags",
  },
  {
    id: "cross-boost",
    step: "04",
    title: "Cross-Promotion Loop",
    accent: "#F4D4FA",
    icon: Repeat,
    summary:
      "Non-competing niche partners automatically share and engage during the critical first 45-minute window.",
    metricLabel: "Early Engagement",
    metricValue: "+184%",
    detail: "Curated creator clusters · Real organic shares",
  },
  {
    id: "compound",
    step: "05",
    title: "Evergreen Compounding",
    accent: "#7CF2B5",
    icon: TrendingUp,
    summary:
      "Top 10% posts automatically re-enter your queue after 30 days with refreshed opening hooks.",
    metricLabel: "Time Saved",
    metricValue: "11 hrs/wk",
    detail: "Continuous attribution & monthly growth benchmarks",
  },
];

export function GrowthLoopInfographic() {
  const [activeId, setActiveId] = useState<string>("cross-boost");
  const activeStage = PIPELINE_STAGES.find((s) => s.id === activeId) || PIPELINE_STAGES[0];

  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-100">
        <div>
          <p className="text-xs font-semibold text-[#5A5D65]">Interactive Workflow Infographic</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111214] tracking-tight mt-1">
            The 5-Stage Zylo Growth Engine
          </h3>
        </div>
        <Link
          to="/app/automations"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] hover:text-[#5A5D65] whitespace-nowrap"
        >
          <span>Inspect live rules</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Horizontal Flow Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
        {PIPELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveId(stage.id)}
              className={`relative text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? "border-[#111214] bg-[#111214] text-white"
                  : "border-neutral-200 bg-neutral-50/70 text-[#111214] hover:border-neutral-400"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  style={{ backgroundColor: stage.accent }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#111214] shrink-0"
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span
                  className={`font-mono text-xs font-semibold tabular-nums ${
                    isActive ? "text-neutral-300" : "text-[#5A5D65]"
                  }`}
                >
                  {stage.step}
                </span>
              </div>
              <p className="font-display font-bold text-sm mt-4">{stage.title}</p>
              <p
                className={`text-xs mt-1 font-mono tabular-nums ${
                  isActive ? "text-[#7CF2B5]" : "text-[#5A5D65]"
                }`}
              >
                {stage.metricValue}
              </p>

              {/* Connector arrow on large screens */}
              {idx < PIPELINE_STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-neutral-300 items-center justify-center text-[#111214] text-[10px]"
                >
                  →
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive */}
      <div className="mt-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#5A5D65]">
            <span className="font-mono font-semibold text-[#111214]">Stage {activeStage.step}</span>
            <span aria-hidden="true">·</span>
            <span>{activeStage.detail}</span>
          </div>
          <h4 className="font-display text-lg sm:text-xl font-bold text-[#111214]">
            {activeStage.title}
          </h4>
          <p className="text-sm text-[#5A5D65] leading-relaxed">{activeStage.summary}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-200 pt-4 lg:pt-0 lg:pl-6">
          <div>
            <p className="text-xs text-[#5A5D65]">{activeStage.metricLabel}</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#111214] tabular-nums">
              {activeStage.metricValue}
            </p>
          </div>
          <Link
            to="/app"
            className="px-4 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors whitespace-nowrap"
          >
            Test Workflow
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ReachROICalculator() {
  const [postsPerWeek, setPostsPerWeek] = useState(8);
  const [channels, setChannels] = useState(4);

  const monthlyPosts = postsPerWeek * 4;
  const projectedReach = Math.round(monthlyPosts * channels * 1420 * 1.35);
  const hoursSaved = Math.round((postsPerWeek * channels * 18) / 60 * 4);
  const followerGain = Math.round(projectedReach * 0.011);

  return (
    <div className="rounded-[32px] bg-[#111214] text-white p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#7CF2B5]">Growth Estimator</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Calculate your automated monthly lift
            </h3>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              Adjust your weekly publishing cadence and connected networks to estimate organic impressions and manual hours reclaimed.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <label htmlFor="calc-posts" className="font-medium text-neutral-200">
                  Posts published per week
                </label>
                <span className="font-mono font-semibold text-[#7CF2B5] tabular-nums">
                  {postsPerWeek} posts/wk
                </span>
              </div>
              <input
                id="calc-posts"
                type="range"
                min={2}
                max={21}
                value={postsPerWeek}
                onChange={(e) => setPostsPerWeek(Number(e.target.value))}
                className="w-full accent-[#7CF2B5] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <label htmlFor="calc-channels" className="font-medium text-neutral-200">
                  Connected social channels
                </label>
                <span className="font-mono font-semibold text-[#B39FF8] tabular-nums">
                  {channels} networks
                </span>
              </div>
              <input
                id="calc-channels"
                type="range"
                min={1}
                max={6}
                value={channels}
                onChange={(e) => setChannels(Number(e.target.value))}
                className="w-full accent-[#B39FF8] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="rounded-3xl bg-[#7CF2B5] text-[#111214] p-5 flex flex-col justify-between min-h-[140px]">
            <p className="text-xs font-semibold">Projected Reach / Mo</p>
            <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums mt-3">
              {projectedReach.toLocaleString()}
            </p>
            <p className="text-xs text-[#111214]/80 mt-1">Organic impressions</p>
          </div>

          <div className="rounded-3xl bg-[#B39FF8] text-[#111214] p-5 flex flex-col justify-between min-h-[140px]">
            <p className="text-xs font-semibold">Est. Net Followers</p>
            <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums mt-3">
              +{followerGain.toLocaleString()}
            </p>
            <p className="text-xs text-[#111214]/80 mt-1">Monthly compounding</p>
          </div>

          <div className="rounded-3xl bg-[#FCE694] text-[#111214] p-5 flex flex-col justify-between min-h-[140px]">
            <p className="text-xs font-semibold">Hours Reclaimed</p>
            <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums mt-3">
              {hoursSaved} hrs
            </p>
            <p className="text-xs text-[#111214]/80 mt-1">Every 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChannelHeatmapInfographic() {
  const timeLabels = ["08:00", "11:00", "14:00", "18:00", "21:00"];
  const [selectedCell, setSelectedCell] = useState<{ day: string; time: string; score: number }>({
    day: "Wed",
    time: "14:00",
    score: 96,
  });

  const getCellStyle = (score: number) => {
    if (score >= 85) return "bg-[#7CF2B5] text-[#111214] font-bold";
    if (score >= 70) return "bg-[#B39FF8] text-[#111214] font-semibold";
    if (score >= 50) return "bg-[#FCE694] text-[#111214]";
    return "bg-neutral-100 text-[#5A5D65]";
  };

  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-display text-xl font-bold text-[#111214]">
            Peak Engagement Timing Matrix
          </h3>
          <p className="text-xs text-[#5A5D65] mt-1">
            Tap any slot to inspect audience velocity index (0–100)
          </p>
        </div>
        <div className="text-xs font-mono bg-neutral-100 px-3.5 py-2 rounded-xl text-[#111214] tabular-nums">
          {selectedCell.day} · {selectedCell.time} — Index {selectedCell.score}/100
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          <div className="grid grid-cols-6 gap-2 mb-2 text-xs font-mono text-[#5A5D65]">
            <div />
            {timeLabels.map((t) => (
              <div key={t} className="text-center tabular-nums">
                {t}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {WEEKLY_HEATMAP_DATA.map((row) => (
              <div key={row.day} className="grid grid-cols-6 gap-2 items-center">
                <div className="text-xs font-semibold text-[#111214]">{row.day}</div>
                {row.slots.map((score, idx) => (
                  <button
                    key={`${row.day}-${idx}`}
                    type="button"
                    onClick={() =>
                      setSelectedCell({ day: row.day, time: timeLabels[idx], score })
                    }
                    className={`h-9 rounded-xl text-xs font-mono tabular-nums transition-transform hover:scale-[1.03] cursor-pointer ${getCellStyle(
                      score
                    )}`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-neutral-100 text-xs text-[#5A5D65]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#7CF2B5]" /> Peak Velocity (85+)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#B39FF8]" /> High Activity (70–84)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#FCE694]" /> Moderate (50–69)
        </span>
      </div>
    </div>
  );
}
