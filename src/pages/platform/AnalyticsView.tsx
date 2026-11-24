import React, { useState } from "react";
import { Download } from "lucide-react";
import { PLATFORM_ANALYTICS_SERIES } from "../../data/mockData";
import { ChannelHeatmapInfographic } from "../../components/Infographics";
import { getPlatformBadgeColor, usePlatform } from "../../context/PlatformContext";

export function AnalyticsView() {
  const { posts, accounts, pushToast } = usePlatform();
  const [selectedMetric, setSelectedMetric] = useState<"instagram" | "linkedin" | "tiktok" | "x">("tiktok");

  const maxSeriesVal = Math.max(
    ...PLATFORM_ANALYTICS_SERIES.map((d) => d[selectedMetric])
  );

  const exportCsv = () => {
    const header = "Month,Instagram,LinkedIn,TikTok,X\n";
    const rows = PLATFORM_ANALYTICS_SERIES.map(
      (r) => `${r.month},${r.instagram},${r.linkedin},${r.tiktok},${r.x}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zylo-social-analytics.csv";
    link.click();
    URL.revokeObjectURL(url);
    pushToast({
      title: "CSV exported",
      description: "Downloaded 6-month platform reach report.",
      tone: "success",
    });
  };

  const publishedPosts = posts.filter((p) => p.status === "Published");

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="rounded-[28px] border border-neutral-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#111214]">
            Performance Analytics & Infographics
          </h2>
          <p className="text-sm text-[#5A5D65]">
            Compare reach velocity across connected networks and inspect optimal timing heatmaps.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] cursor-pointer self-start sm:self-center shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download CSV</span>
        </button>
      </div>

      {/* Platform Velocity Chart + Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold text-[#111214]">
                Monthly Impressions by Network
              </h3>
              <p className="text-xs text-[#5A5D65]">6-month organic distribution trajectory</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: "tiktok", label: "TikTok" },
                  { id: "instagram", label: "Instagram" },
                  { id: "linkedin", label: "LinkedIn" },
                  { id: "x", label: "X" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedMetric(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    selectedMetric === tab.id
                      ? "bg-[#111214] text-white"
                      : "bg-neutral-100 text-[#5A5D65]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 items-end h-52 pt-4">
            {PLATFORM_ANALYTICS_SERIES.map((row) => {
              const val = row[selectedMetric];
              const pct = Math.max(18, Math.round((val / maxSeriesVal) * 100));
              return (
                <div key={row.month} className="flex flex-col items-center justify-end h-full gap-2">
                  <span className="text-[11px] font-mono text-[#5A5D65] tabular-nums">
                    {(val / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      style={{ height: `${pct}%` }}
                      className="w-full rounded-t-2xl rounded-b-md bg-gradient-to-b from-[#B39FF8] to-[#7CF2B5] transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#111214]">{row.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connected Channel Distribution */}
        <div className="lg:col-span-5 rounded-[28px] border border-neutral-200 bg-white p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-[#111214]">
            Channel Share Breakdown
          </h3>
          <div className="space-y-4 pt-2">
            {accounts
              .filter((a) => a.connected)
              .map((acc) => {
                const pct = Math.min(100, Math.round((acc.followers / 90000) * 100));
                return (
                  <div key={acc.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111214]">
                        {acc.platform} · {acc.handle}
                      </span>
                      <span className="font-mono text-[#5A5D65] tabular-nums">
                        {acc.followers.toLocaleString()} ({acc.engagementRate}% ER)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        style={{ width: `${pct}%`, backgroundColor: acc.accentBg }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Heatmap Infographic */}
      <ChannelHeatmapInfographic />

      {/* Top Published Posts Table */}
      <div className="rounded-[28px] border border-neutral-200 bg-white overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="font-display text-lg font-bold text-[#111214]">
            Published Campaign Attribution
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold text-[#5A5D65]">
                <th className="py-3 px-6">Post Title</th>
                <th className="py-3 px-6">Network</th>
                <th className="py-3 px-6">Published</th>
                <th className="py-3 px-6 text-right">Impressions</th>
                <th className="py-3 px-6 text-right">Engagements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {publishedPosts.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/70">
                  <td className="py-3.5 px-6 font-medium text-[#111214]">{p.title}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getPlatformBadgeColor(
                        p.platform
                      )}`}
                    >
                      {p.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-mono text-xs text-[#5A5D65] tabular-nums">
                    {p.scheduledDate}
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono tabular-nums text-[#111214]">
                    {(p.actualImpressions || p.estimatedReach || 12000).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono tabular-nums font-semibold text-emerald-700">
                    {(p.actualEngagements || 820).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
