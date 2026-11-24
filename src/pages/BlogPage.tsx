import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { BLOG_ARTICLES, type BlogArticle } from "../data/mockData";

const CATEGORIES = ["All", "Creator Growth", "AI Strategy", "Automation", "Analytics"] as const;

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const filtered =
    selectedCategory === "All"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="bg-white">
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold text-[#5A5D65]">Zylo Editorial</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight">
              Growth playbooks & research
            </h1>
            <p className="text-base text-[#5A5D65]">
              Field-tested social automation frameworks, AI prompt architectures, and organic distribution benchmarks.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#111214] text-white border-[#111214]"
                    : "bg-white text-[#5A5D65] border-neutral-200 hover:border-[#111214] hover:text-[#111214]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="rounded-[32px] border border-neutral-200 bg-white p-7 sm:p-8 flex flex-col justify-between gap-6 hover:border-[#111214] transition-colors"
            >
              <div className="space-y-4">
                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A5D65]">
                  <span className="font-semibold text-[#111214]">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111214] leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-[#5A5D65] leading-relaxed">{article.excerpt}</p>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {article.keyMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl bg-neutral-50 border border-neutral-100 p-3"
                    >
                      <p className="font-display font-bold text-base text-[#111214] tabular-nums">
                        {m.value}
                      </p>
                      <p className="text-[11px] text-[#5A5D65] mt-0.5 leading-tight">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <img
                    src={article.authorAvatar}
                    alt={article.authorName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#111214]">{article.authorName}</p>
                    <p className="text-[11px] text-[#5A5D65]">{article.authorRole}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111214] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-[#111214]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="bg-white rounded-[32px] max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-9 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A5D65]">
                <span className="font-semibold text-[#111214]">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-[#111214] hover:bg-neutral-50 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2
              id="article-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-[#111214] leading-tight"
            >
              {activeArticle.title}
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {activeArticle.keyMetrics.map((m) => (
                <div
                  key={m.label}
                  style={{ backgroundColor: `${activeArticle.accentColor}40` }}
                  className="rounded-2xl p-3.5"
                >
                  <p className="font-display font-bold text-lg text-[#111214] tabular-nums">
                    {m.value}
                  </p>
                  <p className="text-xs text-[#3A3D45]">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#3A3D45] leading-relaxed">
              {activeArticle.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
