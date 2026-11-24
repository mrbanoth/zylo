import React, { useState } from "react";
import { Bot, CalendarPlus, Check, Loader2, Repeat, Sparkles, Zap } from "lucide-react";
import { getPlatformBadgeColor, usePlatform } from "../../context/PlatformContext";
import type { SocialPlatform } from "../../data/mockData";

const TARGET_PLATFORMS: SocialPlatform[] = ["Instagram", "LinkedIn", "X", "TikTok", "YouTube", "Threads"];

interface GeneratedVariant {
  platform: string;
  hook: string;
  caption: string;
  hashtags: string[];
  bestTime: string;
  formatRecommendation: string;
  whyItWorks: string;
}

interface RepurposedPost {
  platform: string;
  content: string;
  hashtags: string[];
  bestTime: string;
}

interface AutomationBlueprint {
  name: string;
  trigger: string;
  action: string;
  scheduleWindow: string;
  platforms: string[];
  expectedOutcome: string;
}

export function AiStudioView() {
  const { accounts, addPost, addAutomation, pushToast } = usePlatform();
  const [mode, setMode] = useState<"generator" | "repurpose" | "automate">("generator");

  // Generator State
  const [topic, setTopic] = useState(
    "Launching our automated social media batching template that saves creators 8 hours every week"
  );
  const [tone, setTone] = useState("Authentic & Conversational");
  const [goal, setGoal] = useState("Saves, Shares & Profile Visits");
  const [audience, setAudience] = useState("Independent creators, founders, and lean marketing teams");
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([
    "Instagram",
    "LinkedIn",
    "X",
  ]);
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [genResult, setGenResult] = useState<{
    strategySummary: string;
    variants: GeneratedVariant[];
  } | null>(null);
  const [queuedKeys, setQueuedKeys] = useState<Record<string, boolean>>({});

  // Repurpose State
  const [sourceText, setSourceText] = useState(
    "Most founders think they need to post 3 times a day from scratch. In reality, taking one deep 5-minute product lesson and adapting the hook natively for LinkedIn, X, and Instagram Carousels builds 3x more authority with half the effort."
  );
  const [repurposeLoading, setRepurposeLoading] = useState(false);
  const [repurposeError, setRepurposeError] = useState("");
  const [repurposeResult, setRepurposeResult] = useState<{
    keyTakeaways: string[];
    posts: RepurposedPost[];
  } | null>(null);

  // Automation Blueprint State
  const [autoGoal, setAutoGoal] = useState(
    "Automatically turn every published Instagram Reel into a TikTok clip 4 hours later and re-promote top 10% posts monthly"
  );
  const [weeklyFreq, setWeeklyFreq] = useState(7);
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoError, setAutoError] = useState("");
  const [blueprint, setBlueprint] = useState<AutomationBlueprint | null>(null);

  const togglePlatform = (p: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const normalizePlatform = (raw: string): SocialPlatform => {
    const found = TARGET_PLATFORMS.find(
      (p) => p.toLowerCase() === raw.trim().toLowerCase()
    );
    return found || "Instagram";
  };

  const handleGeneratePosts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || selectedPlatforms.length === 0) {
      setGenError("Enter a topic and choose at least one platform.");
      return;
    }
    setGenLoading(true);
    setGenError("");
    try {
      const res = await fetch("/api/ai/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          platforms: selectedPlatforms,
          tone,
          goal,
          audience,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate posts.");
      }
      setGenResult(data);
      setQueuedKeys({});
    } catch (err: unknown) {
      setGenError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setGenLoading(false);
    }
  };

  const handleRepurpose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceText.trim().length < 15) {
      setRepurposeError("Paste at least a short paragraph to repurpose.");
      return;
    }
    setRepurposeLoading(true);
    setRepurposeError("");
    try {
      const res = await fetch("/api/ai/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceText,
          targetPlatforms: selectedPlatforms.length > 0 ? selectedPlatforms : ["LinkedIn", "X"],
          tone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to repurpose content.");
      }
      setRepurposeResult(data);
    } catch (err: unknown) {
      setRepurposeError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setRepurposeLoading(false);
    }
  };

  const handleBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoGoal.trim()) {
      setAutoError("Describe what you want Zylo to automate.");
      return;
    }
    setAutoLoading(true);
    setAutoError("");
    try {
      const connectedNames = accounts.filter((a) => a.connected).map((a) => a.platform);
      const res = await fetch("/api/ai/automation-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: autoGoal,
          connectedPlatforms: connectedNames,
          weeklyFrequency: weeklyFreq,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to design automation.");
      }
      setBlueprint(data);
    } catch (err: unknown) {
      setAutoError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setAutoLoading(false);
    }
  };

  const dispatchVariantToQueue = (
    key: string,
    platRaw: string,
    title: string,
    content: string,
    hashtags: string[]
  ) => {
    const plat = normalizePlatform(platRaw);
    const acc = accounts.find((a) => a.platform === plat);
    addPost({
      platform: plat,
      accountHandle: acc?.handle || `@zylo_${plat.toLowerCase()}`,
      title: title.slice(0, 72),
      content,
      hashtags: hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)),
      scheduledDate: "2026-11-28",
      scheduledTime: "11:00",
      status: "Scheduled",
      autoRecycle: true,
      firstCommentTag: plat === "Instagram",
      estimatedReach: 14500,
    });
    setQueuedKeys((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Studio Mode Switcher */}
      <div className="rounded-[28px] border border-neutral-200 bg-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-2xl bg-[#B39FF8] text-[#111214] flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-[#111214]">
              Zylo Gemini AI Studio
            </h2>
            <p className="text-sm text-[#5A5D65]">
              Generate platform-native posts, repurpose long-form notes, or architect automation rules.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-neutral-100 w-fit">
          <button
            type="button"
            onClick={() => setMode("generator")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mode === "generator"
                ? "bg-[#111214] text-white"
                : "text-[#5A5D65] hover:text-[#111214]"
            }`}
          >
            Post Generator
          </button>
          <button
            type="button"
            onClick={() => setMode("repurpose")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mode === "repurpose"
                ? "bg-[#111214] text-white"
                : "text-[#5A5D65] hover:text-[#111214]"
            }`}
          >
            Content Repurposer
          </button>
          <button
            type="button"
            onClick={() => setMode("automate")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              mode === "automate"
                ? "bg-[#111214] text-white"
                : "text-[#5A5D65] hover:text-[#111214]"
            }`}
          >
            Automation Architect
          </button>
        </div>
      </div>

      {/* Mode 1: Post Generator */}
      {mode === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleGeneratePosts}
            className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4"
          >
            <div>
              <label htmlFor="ai-topic" className="block text-xs font-semibold text-[#111214] mb-1.5">
                Campaign Topic or Brief
              </label>
              <textarea
                id="ai-topic"
                rows={4}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#111214] mb-1.5">Target Channels</p>
              <div className="flex flex-wrap gap-2">
                {TARGET_PLATFORMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                      selectedPlatforms.includes(p)
                        ? "bg-[#111214] text-white border-[#111214]"
                        : "bg-white text-[#5A5D65] border-neutral-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ai-tone" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Voice Tone
                </label>
                <select
                  id="ai-tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-[#111214] bg-white"
                >
                  <option>Authentic & Conversational</option>
                  <option>Sharp & Analytical</option>
                  <option>Bold Storytelling</option>
                  <option>Educational Step-by-Step</option>
                </select>
              </div>
              <div>
                <label htmlFor="ai-goal" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Primary Goal
                </label>
                <select
                  id="ai-goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-xs text-[#111214] bg-white"
                >
                  <option>Saves, Shares & Profile Visits</option>
                  <option>Newsletter Signups</option>
                  <option>Product Launch Awareness</option>
                  <option>Comment Discussion</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="ai-audience" className="block text-xs font-semibold text-[#111214] mb-1.5">
                Target Audience
              </label>
              <input
                id="ai-audience"
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
              />
            </div>

            {genError && (
              <div role="alert" className="rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                {genError}
              </div>
            )}

            <button
              type="submit"
              disabled={genLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] disabled:opacity-60 cursor-pointer"
            >
              {genLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Native Variants...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Posts with Gemini AI</span>
                </>
              )}
            </button>
          </form>

          {/* Output Panel */}
          <div className="lg:col-span-7 space-y-4">
            {!genResult && !genLoading && (
              <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white p-10 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#5A5D65] mx-auto" />
                <h3 className="font-display font-bold text-lg text-[#111214]">
                  Ready to draft your next campaign
                </h3>
                <p className="text-sm text-[#5A5D65] max-w-md mx-auto">
                  Select your target platforms and click Generate. Gemini will craft distinct hooks, captions, and niche hashtag clusters you can schedule in one click.
                </p>
              </div>
            )}

            {genLoading && (
              <div className="space-y-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="rounded-[28px] border border-neutral-200 bg-white p-6 space-y-3 animate-pulse"
                  >
                    <div className="h-4 w-28 bg-neutral-200 rounded-full" />
                    <div className="h-5 w-3/4 bg-neutral-200 rounded-lg" />
                    <div className="h-16 w-full bg-neutral-100 rounded-xl" />
                  </div>
                ))}
              </div>
            )}

            {genResult && !genLoading && (
              <>
                {genResult.strategySummary && (
                  <div className="rounded-3xl bg-[#7CF2B5]/35 border border-[#7CF2B5] p-5 text-sm text-[#111214]">
                    <span className="font-bold">Strategic Angle: </span>
                    {genResult.strategySummary}
                  </div>
                )}

                {genResult.variants?.map((v, idx) => {
                  const key = `gen-${idx}`;
                  const isQueued = queuedKeys[key];
                  return (
                    <div
                      key={key}
                      className="rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`px-3 py-1 rounded-full font-semibold ${getPlatformBadgeColor(
                              normalizePlatform(v.platform)
                            )}`}
                          >
                            {v.platform}
                          </span>
                          <span className="text-[#5A5D65]">{v.formatRecommendation}</span>
                        </div>
                        <span className="text-xs font-mono text-[#5A5D65]">
                          Best window: {v.bestTime}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="font-display font-bold text-base text-[#111214]">
                          {v.hook}
                        </p>
                        <p className="text-sm text-[#3A3D45] whitespace-pre-line leading-relaxed">
                          {v.caption}
                        </p>
                      </div>

                      <p className="text-xs font-mono text-[#5A5D65]">
                        {(v.hashtags || []).join(" ")}
                      </p>

                      <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs text-[#5A5D65]">{v.whyItWorks}</p>
                        <button
                          type="button"
                          disabled={isQueued}
                          onClick={() =>
                            dispatchVariantToQueue(
                              key,
                              v.platform,
                              v.hook,
                              `${v.hook}\n\n${v.caption}`,
                              v.hashtags || []
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer ${
                            isQueued
                              ? "bg-[#7CF2B5] text-[#111214]"
                              : "bg-[#111214] text-white hover:bg-[#26282D]"
                          }`}
                        >
                          {isQueued ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Queue</span>
                            </>
                          ) : (
                            <>
                              <CalendarPlus className="w-3.5 h-3.5" />
                              <span>Send to Scheduler</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Content Repurposer */}
      {mode === "repurpose" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleRepurpose}
            className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4"
          >
            <div>
              <label htmlFor="rep-source" className="block text-xs font-semibold text-[#111214] mb-1.5">
                Paste Blog Excerpt, Transcript, or Notes
              </label>
              <textarea
                id="rep-source"
                rows={7}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
              />
            </div>

            {repurposeError && (
              <div role="alert" className="rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                {repurposeError}
              </div>
            )}

            <button
              type="submit"
              disabled={repurposeLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] disabled:opacity-60 cursor-pointer"
            >
              {repurposeLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Repurposing Content...</span>
                </>
              ) : (
                <>
                  <Repeat className="w-4 h-4" />
                  <span>Repurpose Into Social Posts</span>
                </>
              )}
            </button>
          </form>

          <div className="lg:col-span-7 space-y-4">
            {!repurposeResult && !repurposeLoading && (
              <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white p-10 text-center space-y-2">
                <Repeat className="w-8 h-8 text-[#5A5D65] mx-auto" />
                <p className="font-display font-bold text-lg text-[#111214]">
                  Turn long-form ideas into multi-channel posts
                </p>
                <p className="text-sm text-[#5A5D65]">
                  Extract core insights and generate ready-to-queue social copy.
                </p>
              </div>
            )}

            {repurposeResult && (
              <div className="space-y-4">
                {repurposeResult.keyTakeaways?.length > 0 && (
                  <div className="rounded-3xl bg-[#FCE694]/50 border border-[#FCE694] p-5 space-y-2">
                    <p className="text-xs font-bold text-[#111214]">Extracted Takeaways</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-[#111214]">
                      {repurposeResult.keyTakeaways.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {repurposeResult.posts?.map((p, idx) => {
                  const key = `rep-${idx}`;
                  return (
                    <div
                      key={key}
                      className="rounded-[28px] border border-neutral-200 bg-white p-6 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPlatformBadgeColor(
                            normalizePlatform(p.platform)
                          )}`}
                        >
                          {p.platform}
                        </span>
                        <span className="text-xs font-mono text-[#5A5D65]">{p.bestTime}</span>
                      </div>
                      <p className="text-sm text-[#111214] whitespace-pre-line leading-relaxed">
                        {p.content}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                        <span className="text-xs font-mono text-[#5A5D65]">
                          {(p.hashtags || []).join(" ")}
                        </span>
                        <button
                          type="button"
                          disabled={queuedKeys[key]}
                          onClick={() =>
                            dispatchVariantToQueue(
                              key,
                              p.platform,
                              `Repurposed ${p.platform} Post`,
                              p.content,
                              p.hashtags || []
                            )
                          }
                          className="px-4 py-2 rounded-full bg-[#111214] text-white text-xs font-semibold cursor-pointer disabled:bg-[#7CF2B5] disabled:text-[#111214]"
                        >
                          {queuedKeys[key] ? "Queued" : "Schedule"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: Automation Architect */}
      {mode === "automate" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleBlueprint}
            className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4"
          >
            <div>
              <label htmlFor="auto-goal" className="block text-xs font-semibold text-[#111214] mb-1.5">
                Describe Your Automation Goal
              </label>
              <textarea
                id="auto-goal"
                rows={4}
                value={autoGoal}
                onChange={(e) => setAutoGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#111214] mb-1.5">
                <label htmlFor="auto-freq">Weekly Publishing Cadence</label>
                <span className="font-mono tabular-nums">{weeklyFreq} posts/wk</span>
              </div>
              <input
                id="auto-freq"
                type="range"
                min={2}
                max={21}
                value={weeklyFreq}
                onChange={(e) => setWeeklyFreq(Number(e.target.value))}
                className="w-full accent-[#111214]"
              />
            </div>

            {autoError && (
              <div role="alert" className="rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                {autoError}
              </div>
            )}

            <button
              type="submit"
              disabled={autoLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] disabled:opacity-60 cursor-pointer"
            >
              {autoLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Designing Workflow...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Architect Automation Rule</span>
                </>
              )}
            </button>
          </form>

          <div className="lg:col-span-7">
            {!blueprint && !autoLoading && (
              <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white p-10 text-center space-y-2">
                <Zap className="w-8 h-8 text-[#5A5D65] mx-auto" />
                <p className="font-display font-bold text-lg text-[#111214]">
                  AI Automation Blueprint
                </p>
                <p className="text-sm text-[#5A5D65]">
                  Describe what you want automated and activate the rule in one click.
                </p>
              </div>
            )}

            {blueprint && (
              <div className="rounded-[28px] border border-neutral-200 bg-white p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#5A5D65]">Recommended Rule</p>
                    <h3 className="font-display text-2xl font-bold text-[#111214] mt-1">
                      {blueprint.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#B39FF8]/40 text-xs font-mono font-semibold text-[#111214]">
                    {blueprint.scheduleWindow}
                  </span>
                </div>

                <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2 text-sm">
                  <p>
                    <strong className="text-[#111214]">Trigger: </strong>
                    <span className="text-[#5A5D65]">{blueprint.trigger}</span>
                  </p>
                  <p>
                    <strong className="text-[#111214]">Action: </strong>
                    <span className="text-[#5A5D65]">{blueprint.action}</span>
                  </p>
                  <p>
                    <strong className="text-[#111214]">Expected Outcome: </strong>
                    <span className="text-[#5A5D65]">{blueprint.expectedOutcome}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addAutomation({
                      name: blueprint.name,
                      description: blueprint.expectedOutcome,
                      trigger: blueprint.trigger,
                      action: blueprint.action,
                      platforms: (blueprint.platforms || ["Instagram"]).map(normalizePlatform),
                      active: true,
                      category: "Scheduling",
                    });
                    pushToast({
                      title: "AI Rule Activated",
                      description: "Added directly to your Automations Engine.",
                      tone: "success",
                    });
                  }}
                  className="px-6 py-3 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] cursor-pointer"
                >
                  Activate Rule in Automations Engine
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
