import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, CalendarDays, Link2, Send, Zap } from "lucide-react";
import { getPlatformBadgeColor, usePlatform } from "../../context/PlatformContext";
import { HERO_JULY_CHART_DATA } from "../../data/mockData";

export function OverviewView() {
  const { accounts, posts, automations, updatePost, toggleAutomation } = usePlatform();

  const connectedAccounts = accounts.filter((a) => a.connected);
  const totalFollowers = connectedAccounts.reduce((sum, a) => sum + a.followers, 0);
  const avgEngagement =
    connectedAccounts.length > 0
      ? (
          connectedAccounts.reduce((sum, a) => sum + a.engagementRate, 0) /
          connectedAccounts.length
        ).toFixed(1)
      : "0.0";
  const scheduledPosts = posts.filter((p) => p.status === "Scheduled");
  const activeAutomations = automations.filter((a) => a.active);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 space-y-2">
          <p className="text-xs font-medium text-[#5A5D65]">Connected Audience</p>
          <p className="font-display text-3xl font-bold text-[#111214] tabular-nums">
            {totalFollowers.toLocaleString()}
          </p>
          <p className="text-xs text-[#5A5D65] tabular-nums">
            Across {connectedAccounts.length} active channels
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 space-y-2">
          <p className="text-xs font-medium text-[#5A5D65]">Scheduled Queue</p>
          <p className="font-display text-3xl font-bold text-[#111214] tabular-nums">
            {scheduledPosts.length}
          </p>
          <p className="text-xs text-[#5A5D65]">Auto-timed for peak windows</p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 space-y-2">
          <p className="text-xs font-medium text-[#5A5D65]">Active Automations</p>
          <p className="font-display text-3xl font-bold text-[#111214] tabular-nums">
            {activeAutomations.length}
          </p>
          <p className="text-xs text-[#5A5D65] tabular-nums">
            {automations.reduce((s, r) => s + r.runsCount, 0)} total runs logged
          </p>
        </div>

        <div className="rounded-3xl bg-[#7CF2B5]/40 border border-[#7CF2B5] p-5 space-y-2">
          <p className="text-xs font-semibold text-[#111214]">Avg. Engagement Rate</p>
          <p className="font-display text-3xl font-bold text-[#111214] tabular-nums">
            {avgEngagement}%
          </p>
          <p className="text-xs text-[#3A3D45]">+1.4% vs previous 30 days</p>
        </div>
      </div>

      {/* Main Split: Growth Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Periwinkle Growth Trajectory Card */}
        <div className="lg:col-span-7 rounded-[28px] bg-[#B39FF8]/30 border border-[#B39FF8]/60 p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#111214]">Monthly Follower Velocity</p>
              <h2 className="font-display text-xl font-bold text-[#111214] mt-0.5">
                6-Month Net Growth Trend
              </h2>
            </div>
            <Link
              to="/app/analytics"
              className="px-4 py-2 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D]"
            >
              Full Analytics
            </Link>
          </div>

          <div className="grid grid-cols-6 gap-3 items-end h-44 pt-4">
            {HERO_JULY_CHART_DATA.map((item) => (
              <div key={item.month} className="flex flex-col items-center justify-end h-full gap-2">
                <span className="text-[11px] font-mono font-semibold text-[#111214] tabular-nums">
                  +{item.value}
                </span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    style={{ height: `${item.heightPct}%` }}
                    className="w-full rounded-t-2xl rounded-b-lg bg-[#111214]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#111214]">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Workspace Shortcuts */}
        <div className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-4">
          <h2 className="font-display text-lg font-bold text-[#111214]">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/app/ai-studio"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#F4D4FA]/45 hover:bg-[#F4D4FA]/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#111214] text-white flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#111214]">Draft with Gemini AI</p>
                  <p className="text-xs text-[#5A5D65]">Generate multi-platform hooks</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#111214]" />
            </Link>

            <Link
              to="/app/accounts"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#7CF2B5]/35 hover:bg-[#7CF2B5]/55 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#111214] text-white flex items-center justify-center">
                  <Link2 className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#111214]">Connect More Channels</p>
                  <p className="text-xs text-[#5A5D65]">YouTube & Threads available</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#111214]" />
            </Link>

            <Link
              to="/app/scheduler"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#FCE694]/50 hover:bg-[#FCE694]/75 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#111214] text-white flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#111214]">Review Weekly Calendar</p>
                  <p className="text-xs text-[#5A5D65] tabular-nums">
                    {scheduledPosts.length} posts ready to publish
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#111214]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Queue + Active Automation Switches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[#111214]">Upcoming Queue</h2>
            <Link
              to="/app/scheduler"
              className="text-xs font-semibold text-[#111214] hover:underline"
            >
              Manage all
            </Link>
          </div>

          {scheduledPosts.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#5A5D65]">
              No scheduled posts right now. Create one in Scheduler or AI Studio.
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {scheduledPosts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#5A5D65]">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-semibold ${getPlatformBadgeColor(
                          post.platform
                        )}`}
                      >
                        {post.platform}
                      </span>
                      <span className="font-mono tabular-nums">
                        {post.scheduledDate} · {post.scheduledTime}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-[#111214] truncate">{post.title}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updatePost(post.id, {
                        status: "Published",
                        actualImpressions: post.estimatedReach || 12400,
                        actualEngagements: Math.round((post.estimatedReach || 12400) * 0.065),
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] hover:border-[#111214] transition-colors shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Publish Now</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[#111214]">Automation Rules</h2>
            <Link
              to="/app/automations"
              className="text-xs font-semibold text-[#111214] hover:underline"
            >
              Configure
            </Link>
          </div>

          <div className="space-y-3">
            {automations.slice(0, 4).map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/70"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#111214] shrink-0" />
                    <p className="text-sm font-semibold text-[#111214] truncate">{rule.name}</p>
                  </div>
                  <p className="text-xs text-[#5A5D65] mt-0.5 tabular-nums">
                    {rule.runsCount} runs · Last: {rule.lastRun}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={rule.active}
                  onClick={() => toggleAutomation(rule.id)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    rule.active ? "bg-[#111214]" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      rule.active ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
