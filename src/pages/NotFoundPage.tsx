import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-mono font-semibold text-[#5A5D65]">Error 404 · Route not found</p>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold text-[#111214] tracking-tight"
              style={{ textWrap: "balance" }}
            >
              This post drifted outside the queue
            </h1>
            <p className="text-base text-[#5A5D65] leading-relaxed">
              The page you requested does not exist or has been moved. Jump back to the Zylo homepage or open your automation workspace directly.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#7CF2B5] text-[#111214] text-sm font-semibold hover:brightness-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Platform</span>
              </Link>
            </div>
          </div>

          {/* Right Zylo Organic 404 Bento Visual */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bento-leaf-tl bg-[#7CF2B5] p-6 sm:p-8 flex flex-col justify-between min-h-[160px]">
              <Compass className="w-7 h-7 text-[#111214]" />
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-[#111214] tabular-nums">
                4
              </p>
            </div>
            <div className="bento-leaf-tr bg-[#B39FF8] p-6 sm:p-8 flex flex-col justify-between min-h-[160px] text-white">
              <span className="text-xs font-mono">Missing URL</span>
              <p className="font-display text-5xl sm:text-6xl font-extrabold tabular-nums">
                0
              </p>
            </div>
            <div className="bento-leaf-bl bg-[#F4D4FA] p-6 sm:p-8 flex flex-col justify-between min-h-[150px]">
              <span className="text-xs font-semibold text-[#111214]">Quick Links</span>
              <div className="space-y-1 text-xs font-semibold text-[#111214]">
                <Link to="/features" className="block hover:underline">Features →</Link>
                <Link to="/pricing" className="block hover:underline">Pricing →</Link>
                <Link to="/faq" className="block hover:underline">Help FAQ →</Link>
              </div>
            </div>
            <div className="bento-leaf-br bg-[#FCE694] p-6 sm:p-8 flex flex-col justify-between min-h-[150px]">
              <span className="text-xs font-mono text-[#111214]">Redirect Ready</span>
              <p className="font-display text-5xl sm:text-6xl font-extrabold text-[#111214] tabular-nums">
                4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
