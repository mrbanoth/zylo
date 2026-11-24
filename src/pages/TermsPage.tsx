import React from "react";
import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 pb-6 border-b border-neutral-100">
          <p className="text-xs font-semibold text-[#5A5D65]">Legal · Updated November 2026</p>
          <h1 className="font-display text-4xl font-bold text-[#111214] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-[#5A5D65]">
            Clear guidelines for using Zylo's scheduling, automation, and AI Studio services.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#5A5D65] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-[#111214]">
              1. Account & Connected Channel Responsibility
            </h2>
            <p>
              You retain full responsibility for content scheduled or published through your connected social accounts. Automated workflows must comply with each social platform's partner API terms and community standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-[#111214]">
              2. Intellectual Property & AI Outputs
            </h2>
            <p>
              You own all rights to drafts, media assets, and AI-generated captions produced in your Zylo workspace. Zylo claims no ownership over your published posts or audience metrics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-[#111214]">
              3. Subscription & Cancellation
            </h2>
            <p>
              Paid plans renew monthly or annually based on your selection. You may downgrade or cancel at any time before your next billing cycle without cancellation fees.
            </p>
          </section>
        </div>

        <div className="pt-4">
          <Link
            to="/privacy"
            className="text-sm font-semibold text-[#111214] underline underline-offset-4"
          >
            Read Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
