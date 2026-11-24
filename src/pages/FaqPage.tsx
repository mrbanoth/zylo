import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { FAQ_ITEMS } from "../data/mockData";

const FAQ_CATEGORIES = ["All", "Platform", "Automations", "Security & OAuth", "Billing"] as const;

export function FaqPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch =
      !search.trim() ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#5A5D65]">Help & Documentation</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight">
              Frequently asked questions
            </h1>
            <p className="text-base text-[#5A5D65]">
              Answers about OAuth security, automated scheduling rules, Gemini AI Studio, and pricing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#5A5D65] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions (e.g. OAuth, hashtags, trial)..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  category === cat
                    ? "bg-[#111214] text-white border-[#111214]"
                    : "bg-white text-[#5A5D65] border-neutral-200 hover:border-[#111214]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-neutral-200 p-8 text-center space-y-3">
              <p className="font-display font-bold text-lg text-[#111214]">No matching questions</p>
              <p className="text-sm text-[#5A5D65]">
                Try clearing your search filter or reach out to our team directly.
              </p>
              <Link
                to="/contact"
                className="inline-block px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold"
              >
                Contact Support
              </Link>
            </div>
          ) : (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-neutral-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
                  >
                    <div>
                      <span className="text-xs text-[#5A5D65]">{item.category}</span>
                      <h2 className="font-display text-base sm:text-lg font-bold text-[#111214] mt-0.5">
                        {item.question}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#111214] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#5A5D65] leading-relaxed border-t border-neutral-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
