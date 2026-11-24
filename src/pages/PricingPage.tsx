import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { PRICING_TIERS } from "../data/mockData";

const COMPARISON_ROWS = [
  { feature: "Connected Social Channels", starter: "Up to 3", growth: "Up to 12", agency: "Unlimited (10 workspaces)" },
  { feature: "Scheduled Posts / Month", starter: "60", growth: "Unlimited", agency: "Unlimited" },
  { feature: "Gemini AI Studio Generations", starter: "50 / month", growth: "Unlimited", agency: "Unlimited + Brand Voices" },
  { feature: "Active Automation Rules", starter: "2 rules", growth: "Unlimited", agency: "Unlimited + Templates" },
  { feature: "Cross-Promotion Peer Pods", starter: "Standard queue", growth: "Priority niche match", agency: "Dedicated clusters" },
  { feature: "Analytics History & Export", starter: "30 days", growth: "12 months + CSV", agency: "24 months + White-label" },
];

export function PricingPage() {
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");

  return (
    <div className="bg-white">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-xs font-semibold text-[#5A5D65]">Simple, Transparent Pricing</p>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight max-w-2xl mx-auto"
            style={{ textWrap: "balance" }}
          >
            Scale your organic reach at any stage
          </h1>
          <p className="text-base text-[#5A5D65] max-w-xl mx-auto">
            Every plan includes a 14-day free trial with full access to OAuth social connections and AI Studio.
          </p>

          {/* Billing Cadence Segmented Control */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-neutral-100 border border-neutral-200 mt-2">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                billing === "monthly"
                  ? "bg-white text-[#111214] shadow-xs"
                  : "text-[#5A5D65] hover:text-[#111214]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                billing === "annual"
                  ? "bg-[#111214] text-white"
                  : "text-[#5A5D65] hover:text-[#111214]"
              }`}
            >
              Annual · Save 20%
            </button>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => {
              const price = billing === "annual" ? tier.annualPrice : tier.monthlyPrice;
              return (
                <div
                  key={tier.id}
                  className={`rounded-[32px] p-7 sm:p-8 flex flex-col justify-between border ${
                    tier.featured
                      ? "border-[#111214] bg-[#111214] text-white"
                      : "border-neutral-200 bg-white text-[#111214]"
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        style={{ backgroundColor: tier.accent }}
                        className="px-3.5 py-1 rounded-full text-xs font-bold text-[#111214]"
                      >
                        {tier.name}
                      </span>
                      {tier.featured && (
                        <span className="text-xs font-medium text-[#7CF2B5]">Most popular</span>
                      )}
                    </div>

                    <p
                      className={`text-sm ${
                        tier.featured ? "text-neutral-300" : "text-[#5A5D65]"
                      }`}
                    >
                      {tier.audience}
                    </p>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-4xl sm:text-5xl font-bold tabular-nums">
                        ${price}
                      </span>
                      <span
                        className={`text-sm ${
                          tier.featured ? "text-neutral-400" : "text-[#5A5D65]"
                        }`}
                      >
                        / month
                      </span>
                    </div>

                    <ul className="space-y-3 pt-2">
                      {tier.limits.map((limit) => (
                        <li key={limit} className="flex items-start gap-2.5 text-sm">
                          <span className="w-5 h-5 rounded-full bg-[#7CF2B5] text-[#111214] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span className={tier.featured ? "text-neutral-200" : "text-[#111214]"}>
                            {limit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link
                      to={tier.id === "agency" ? "/contact" : "/app"}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-colors ${
                        tier.featured
                          ? "bg-[#7CF2B5] text-[#111214] hover:brightness-95"
                          : "bg-[#111214] text-white hover:bg-[#26282D]"
                      }`}
                    >
                      <span>{tier.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concrete Limits Comparison Table */}
          <div className="mt-16 rounded-[32px] border border-neutral-200 overflow-hidden bg-white">
            <div className="p-6 sm:p-8 border-b border-neutral-200">
              <h2 className="font-display text-2xl font-bold text-[#111214]">
                Plan limits & capabilities matrix
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold text-[#5A5D65]">
                    <th className="py-3.5 px-6">Capability</th>
                    <th className="py-3.5 px-6">Starter Creator</th>
                    <th className="py-3.5 px-6">Growth Studio</th>
                    <th className="py-3.5 px-6">Agency Network</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-neutral-50/60">
                      <td className="py-4 px-6 font-medium text-[#111214]">{row.feature}</td>
                      <td className="py-4 px-6 text-[#5A5D65] tabular-nums">{row.starter}</td>
                      <td className="py-4 px-6 font-semibold text-[#111214] tabular-nums">
                        {row.growth}
                      </td>
                      <td className="py-4 px-6 text-[#5A5D65] tabular-nums">{row.agency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
