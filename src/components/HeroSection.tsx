import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Sprout, ArrowRight } from "lucide-react";
import { CREATOR_ASSETS, HERO_JULY_CHART_DATA } from "../data/mockData";

const CAPABILITIES = [
  {
    id: "auto-boosting",
    label: "Auto Boosting",
    detail: "Automatically promotes top-performing posts to matched peer feeds in the first 45 minutes.",
    link: "/app/automations",
  },
  {
    id: "analytics",
    label: "Analytics",
    detail: "Track follower velocity, save ratios, and cross-channel attribution in one unified view.",
    link: "/app/analytics",
  },
  {
    id: "cross-promotion",
    label: "Cross-Promotion",
    detail: "Partner with verified non-competing creators to share and amplify real content automatically.",
    link: "/app/accounts",
  },
  {
    id: "sharing",
    label: "Sharing",
    detail: "Schedule once and adapt natively across Instagram, LinkedIn, TikTok, X, and YouTube Shorts.",
    link: "/app/scheduler",
  },
  {
    id: "hashtag-optimization",
    label: "Hashtag Optimization",
    detail: "AI-clustered 5-tag niche sets rotated automatically as first comments to boost search reach.",
    link: "/app/ai-studio",
  },
];

export function HeroSection() {
  const [selectedCap, setSelectedCap] = useState<string>("cross-promotion");
  const [activeBarIndex, setActiveBarIndex] = useState<number>(3); // Jl (+1424)

  const activeCapability = CAPABILITIES.find((c) => c.id === selectedCap) || CAPABILITIES[2];
  const activeBar = HERO_JULY_CHART_DATA[activeBarIndex];

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Subcopy, CTA, Interactive Capability Cluster */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <h1
              className="font-display font-bold tracking-tight text-[#111214] leading-[1.06]"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.85rem)",
                textWrap: "balance",
              }}
            >
              Automate your growth on social media{" "}
              <span
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4D4FA] align-middle ml-1 -translate-y-1"
                aria-hidden="true"
              >
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#111214]" strokeWidth={2} />
              </span>
            </h1>

            <p className="text-[15px] sm:text-base text-[#5A5D65] max-w-md leading-relaxed">
              Join a network where creators, brands, and entrepreneurs support each other by sharing and engaging with real content — automatically.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/app"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors whitespace-nowrap shrink-0"
              >
                Start Growing
              </Link>
              <Link
                to="/app/ai-studio"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#111214] hover:text-[#5A5D65] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Try AI Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Interactive Capability Capsule Cluster matching the Zylo design */}
            <div className="pt-4 sm:pt-6 space-y-2.5">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCap("auto-boosting")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCap === "auto-boosting"
                      ? "bg-[#7CF2B5] border-[#7CF2B5] text-[#111214] font-semibold"
                      : "bg-white border-neutral-300 text-[#111214] hover:border-[#111214]"
                  }`}
                >
                  Auto Boosting
                </button>
                <span
                  className="w-10 h-10 rounded-full border border-neutral-300 inline-flex items-center justify-center text-[#111214] shrink-0"
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCap("analytics")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCap === "analytics"
                      ? "bg-[#7CF2B5] border-[#7CF2B5] text-[#111214] font-semibold"
                      : "bg-white border-neutral-300 text-[#111214] hover:border-[#111214]"
                  }`}
                >
                  Analytics
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="w-10 h-10 rounded-full border border-neutral-300 inline-flex items-center justify-center text-[#111214] shrink-0"
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCap("cross-promotion")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCap === "cross-promotion"
                      ? "bg-[#7CF2B5] border-[#7CF2B5] text-[#111214] font-semibold"
                      : "bg-white border-neutral-300 text-[#111214] hover:border-[#111214]"
                  }`}
                >
                  Cross-Promotion
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCap("sharing")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCap === "sharing"
                      ? "bg-[#7CF2B5] border-[#7CF2B5] text-[#111214] font-semibold"
                      : "bg-white border-neutral-300 text-[#111214] hover:border-[#111214]"
                  }`}
                >
                  Sharing
                </button>
                <span
                  className="w-10 h-10 rounded-full border border-neutral-300 inline-flex items-center justify-center text-[#111214] shrink-0"
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCap("hashtag-optimization")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCap === "hashtag-optimization"
                      ? "bg-[#7CF2B5] border-[#7CF2B5] text-[#111214] font-semibold"
                      : "bg-white border-neutral-300 text-[#111214] hover:border-[#111214]"
                  }`}
                >
                  Hashtag Optimization
                </button>
                <span
                  className="w-10 h-10 rounded-full border border-neutral-300 inline-flex items-center justify-center text-[#111214] shrink-0"
                  aria-hidden="true"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </span>
              </div>

              {/* Live capability readout */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-md border-t border-neutral-100">
                <p className="text-xs text-[#5A5D65] leading-relaxed">
                  <span className="font-semibold text-[#111214]">{activeCapability.label}: </span>
                  {activeCapability.detail}
                </p>
                <Link
                  to={activeCapability.link}
                  className="text-xs font-semibold text-[#111214] underline underline-offset-4 whitespace-nowrap shrink-0 hover:text-[#5A5D65]"
                >
                  Open tool
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Organic Bento Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-5 max-w-xl mx-auto lg:max-w-none">
              {/* Left Sub-column */}
              <div className="space-y-3.5 sm:space-y-5">
                {/* Card 1: Mint Green Creator Portrait */}
                <div className="relative bento-leaf-tl bg-[#7CF2B5] overflow-hidden aspect-[4/5] group">
                  <img
                    src={CREATOR_ASSETS.hoodiePortrait}
                    alt="Creator managing scheduled posts on smartphone"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Card 3: Lilac Pink Shine Together Card */}
                <div className="relative bento-leaf-bl bg-[#F4D4FA] p-5 sm:p-6 flex flex-col justify-between min-h-[170px] sm:min-h-[205px]">
                  <div className="flex justify-end">
                    <Link
                      to="/app/accounts"
                      aria-label="Connect another creator account"
                      className="w-9 h-9 rounded-full bg-white text-[#111214] flex items-center justify-center shadow-xs hover:scale-105 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white bg-[#FCE694] shrink-0">
                      <img
                        src={CREATOR_ASSETS.avatarOne}
                        alt="Partner creator Maya"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white bg-[#7CF2B5] shrink-0">
                      <img
                        src={CREATOR_ASSETS.avatarTwo}
                        alt="Partner creator Daniel"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <p className="text-center font-display text-xs sm:text-sm font-semibold text-[#111214]">
                    Shine together
                  </p>
                </div>
              </div>

              {/* Right Sub-column */}
              <div className="space-y-3.5 sm:space-y-5">
                {/* Card 2: Periwinkle Violet July +1424 Interactive Chart */}
                <div className="bento-leaf-tr bg-[#B39FF8] p-5 sm:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[235px]">
                  <div className="flex items-center justify-between gap-2 pl-2 sm:pl-4">
                    <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeBar.month === "Jl"
                        ? "July"
                        : activeBar.month === "Ap"
                        ? "April"
                        : activeBar.month === "My"
                        ? "May"
                        : activeBar.month === "Ju"
                        ? "June"
                        : activeBar.month === "Au"
                        ? "August"
                        : "Sept"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#111214] text-white text-xs font-mono font-semibold tabular-nums">
                      + {activeBar.value}
                    </span>
                  </div>

                  {/* Interactive Gradient Vertical Bars */}
                  <div className="grid grid-cols-6 gap-2 sm:gap-2.5 items-end h-28 sm:h-32 pt-4">
                    {HERO_JULY_CHART_DATA.map((bar, idx) => {
                      const isActive = idx === activeBarIndex;
                      return (
                        <button
                          key={bar.month}
                          type="button"
                          onMouseEnter={() => setActiveBarIndex(idx)}
                          onClick={() => setActiveBarIndex(idx)}
                          aria-label={`${bar.month}: +${bar.value} followers`}
                          className="flex flex-col items-center justify-end h-full gap-1.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-md"
                        >
                          <div className="w-full flex-1 flex items-end">
                            <div
                              style={{ height: `${bar.heightPct}%` }}
                              className={`w-full rounded-t-xl rounded-b-md transition-all duration-200 ${
                                isActive
                                  ? "bg-gradient-to-b from-white via-white/90 to-white/40"
                                  : "bg-gradient-to-b from-white/80 via-white/45 to-white/15 group-hover:from-white group-hover:via-white/75"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[11px] font-medium tabular-nums ${
                              isActive ? "text-white font-bold" : "text-white/85"
                            }`}
                          >
                            {bar.month}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card 4: Butter Yellow Male Creator Portrait */}
                <div className="relative bento-leaf-br bg-[#FCE694] overflow-hidden aspect-[4/5] group">
                  <img
                    src={CREATOR_ASSETS.mustardPortrait}
                    alt="Brand founder reviewing automated social analytics"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
