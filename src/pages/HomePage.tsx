import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  Check,
  LineChart,
  Share2,
  Zap,
} from "lucide-react";
import { HeroSection } from "../components/HeroSection";
import {
  ChannelHeatmapInfographic,
  GrowthLoopInfographic,
  ReachROICalculator,
} from "../components/Infographics";
import { CREATOR_CASE_STUDIES } from "../data/mockData";
import { usePlatform } from "../context/PlatformContext";

export function HomePage() {
  const { accounts, posts, automations } = usePlatform();
  const connectedAccounts = accounts.filter((a) => a.connected);

  return (
    <div>
      {/* 1. Faithful Zylo Hero Section */}
      <HeroSection />

      {/* 2. Live Workspace Quick-Bridge Strip */}
      <section className="border-y border-neutral-200 bg-neutral-50/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#5A5D65]">
            <span className="font-semibold text-[#111214]">Your Live Zylo Sandbox:</span>
            <span className="tabular-nums">
              <strong className="text-[#111214]">{connectedAccounts.length}</strong> connected channels
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              <strong className="text-[#111214]">
                {posts.filter((p) => p.status === "Scheduled").length}
              </strong>{" "}
              scheduled posts
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              <strong className="text-[#111214]">
                {automations.filter((a) => a.active).length}
              </strong>{" "}
              active automations
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/app/accounts"
              className="px-4 py-2 rounded-full border border-neutral-300 bg-white text-xs font-semibold text-[#111214] hover:border-[#111214] transition-colors whitespace-nowrap"
            >
              Connect Socials
            </Link>
            <Link
              to="/app"
              className="px-4 py-2 rounded-full bg-[#7CF2B5] text-xs font-semibold text-[#111214] hover:brightness-95 transition-all whitespace-nowrap"
            >
              Open Platform Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Asymmetric Capabilities Bento Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="text-xs font-semibold text-[#5A5D65]">Platform Capabilities</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#111214] tracking-tight mt-2"
              style={{ textWrap: "balance" }}
            >
              One unified studio to connect, draft, schedule, and cross-promote
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Marquee Card 1 */}
            <div className="md:col-span-7 rounded-[32px] bg-[#7CF2B5]/35 border border-[#7CF2B5]/60 p-7 sm:p-9 flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111214] text-white flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-[#111214] tabular-nums">
                  01 / Auto-Post Scheduler
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-display text-2xl font-bold text-[#111214]">
                  Visual Multi-Channel Queue & Peak Shifting
                </h3>
                <p className="text-sm sm:text-base text-[#3A3D45] leading-relaxed max-w-xl">
                  Connect Instagram, LinkedIn, TikTok, X, YouTube Shorts, and Threads. Zylo locks each post into audience activity spikes and automatically posts first-comment hashtag sets.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/app/scheduler"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors"
                >
                  <span>Open Scheduler</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-xs text-[#3A3D45]">Supports carousels, reels & threads</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-5 rounded-[32px] bg-[#B39FF8]/30 border border-[#B39FF8]/60 p-7 sm:p-9 flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111214] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-[#111214] tabular-nums">
                  02 / Gemini AI Studio
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-display text-2xl font-bold text-[#111214]">
                  Platform-Native AI Post & Hook Generator
                </h3>
                <p className="text-sm sm:text-base text-[#3A3D45] leading-relaxed">
                  Turn a single raw idea or article link into tailored posts for every connected channel—complete with hashtags and one-click queue dispatch.
                </p>
              </div>

              <div>
                <Link
                  to="/app/ai-studio"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-neutral-300 text-[#111214] text-xs font-semibold hover:border-[#111214] transition-colors"
                >
                  <span>Launch AI Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-5 rounded-[32px] bg-[#FCE694]/45 border border-[#FCE694] p-7 sm:p-9 flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111214] text-white flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-[#111214] tabular-nums">
                  03 / Automation Rules
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-display text-2xl font-bold text-[#111214]">
                  Evergreen Recycling & Trigger Workflows
                </h3>
                <p className="text-sm sm:text-base text-[#3A3D45] leading-relaxed">
                  Re-queue your top 10% posts after 30 days, mirror Reels to TikTok automatically, and trigger smart comment replies on keywords.
                </p>
              </div>

              <div>
                <Link
                  to="/app/automations"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-neutral-300 text-[#111214] text-xs font-semibold hover:border-[#111214] transition-colors"
                >
                  <span>Configure Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-7 rounded-[32px] bg-[#F4D4FA]/45 border border-[#F4D4FA] p-7 sm:p-9 flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111214] text-white flex items-center justify-center shrink-0">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold text-[#111214] tabular-nums">
                  04 / Cross-Promotion & Analytics
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="font-display text-2xl font-bold text-[#111214]">
                  Shine Together Peer Network & Attribution
                </h3>
                <p className="text-sm sm:text-base text-[#3A3D45] leading-relaxed max-w-xl">
                  Opt in to niche-matched creator clusters so real peers share and boost your launches automatically—while tracking follower lift in unified infographics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/app/analytics"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors"
                >
                  <LineChart className="w-3.5 h-3.5" />
                  <span>View Analytics</span>
                </Link>
                <Link
                  to="/features"
                  className="text-xs font-semibold text-[#111214] underline underline-offset-4"
                >
                  Compare all features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Workflow Infographic & ROI Calculator */}
      <section className="py-12 sm:py-16 bg-neutral-50/70 border-y border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <GrowthLoopInfographic />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <ChannelHeatmapInfographic />
            </div>
            <div className="lg:col-span-5 rounded-[32px] border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#5A5D65]">Connected Ecosystem</p>
                <h3 className="font-display text-2xl font-bold text-[#111214]">
                  6 Major Social Networks, One Clean Queue
                </h3>
                <p className="text-sm text-[#5A5D65] leading-relaxed">
                  No tab juggling or manual copy-pasting. Authorize your channels once via OAuth and manage publishing, timing, and analytics centrally.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "Instagram Reels, Carousels & First-Comment Tags",
                    "LinkedIn Personal Profiles & Company Pages",
                    "TikTok Direct Video Publishing & Hook Analytics",
                    "X (Twitter) Multi-Post Threads & Auto-Retweets",
                    "YouTube Shorts & Threads Cross-Sync",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#111214]">
                      <span className="w-5 h-5 rounded-full bg-[#7CF2B5] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#111214]" strokeWidth={2.5} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100">
                <Link
                  to="/app/accounts"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors"
                >
                  <span>Manage Social Connections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <ReachROICalculator />
        </div>
      </section>

      {/* 5. Quantified Creator Case Studies */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#5A5D65]">Verified Outcomes</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111214] tracking-tight mt-1">
                Creators growing on autopilot
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] hover:text-[#5A5D65]"
            >
              <span>Read all playbooks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREATOR_CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="rounded-[28px] border border-neutral-200 bg-white p-6 sm:p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div
                    style={{ backgroundColor: cs.accent }}
                    className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold text-[#111214] tabular-nums"
                  >
                    {cs.metric}
                  </div>
                  <p className="text-sm sm:text-base text-[#111214] leading-relaxed">
                    "{cs.quote}"
                  </p>
                  <p className="text-xs text-[#5A5D65]">{cs.beforeAfter}</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <img
                    src={cs.avatar}
                    alt={cs.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-[#111214] truncate">
                      {cs.name}
                    </p>
                    <p className="text-xs text-[#5A5D65] truncate">{cs.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA Banner */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-[36px] bg-[#B39FF8]/35 border border-[#B39FF8]/60 p-8 sm:p-12 lg:p-16 text-center space-y-6">
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111214] tracking-tight max-w-2xl mx-auto"
            style={{ textWrap: "balance" }}
          >
            Ready to put your social growth on autopilot?
          </h2>
          <p className="text-sm sm:text-base text-[#3A3D45] max-w-xl mx-auto leading-relaxed">
            Connect your social channels, generate native posts with Gemini AI, and schedule a full week of content in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/app"
              className="px-7 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors"
            >
              Launch Zylo Studio
            </Link>
            <Link
              to="/pricing"
              className="px-7 py-3.5 rounded-full bg-white border border-neutral-300 text-[#111214] text-sm font-semibold hover:border-[#111214] transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
