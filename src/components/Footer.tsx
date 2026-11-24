import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { ZyloMark } from "./ZyloLogo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 text-[#111214]">
              <ZyloMark className="w-7 h-7" />
              <span className="font-display text-xl font-bold tracking-tight">Zylo</span>
            </Link>
            <p className="text-sm text-[#5A5D65] max-w-sm leading-relaxed">
              Automated social media scheduling, AI content creation, and peer cross-promotion built for creators, brands, and growth teams.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-sm space-y-2" noValidate>
              <label htmlFor="footer-newsletter" className="block text-xs font-semibold text-[#111214]">
                Weekly Growth Playbook
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-neutral-200 text-sm text-[#111214] placeholder:text-neutral-400 focus:outline-none focus:border-[#111214]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              {subscribed && (
                <p className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Subscribed to Zylo weekly briefs.
                </p>
              )}
            </form>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#111214]">Product</h3>
            <ul className="space-y-2.5 text-sm text-[#5A5D65]">
              <li><Link to="/how-it-works" className="hover:text-[#111214] transition-colors">How It Works</Link></li>
              <li><Link to="/features" className="hover:text-[#111214] transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-[#111214] transition-colors">Pricing</Link></li>
              <li><Link to="/app" className="hover:text-[#111214] transition-colors">Launch Studio</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#111214]">Platform</h3>
            <ul className="space-y-2.5 text-sm text-[#5A5D65]">
              <li><Link to="/app/accounts" className="hover:text-[#111214] transition-colors">Social Accounts</Link></li>
              <li><Link to="/app/scheduler" className="hover:text-[#111214] transition-colors">Auto-Post Scheduler</Link></li>
              <li><Link to="/app/automations" className="hover:text-[#111214] transition-colors">Automations</Link></li>
              <li><Link to="/app/ai-studio" className="hover:text-[#111214] transition-colors">AI Content Studio</Link></li>
              <li><Link to="/app/analytics" className="hover:text-[#111214] transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-[#111214]">Resources & Legal</h3>
            <ul className="space-y-2.5 text-sm text-[#5A5D65]">
              <li><Link to="/blog" className="hover:text-[#111214] transition-colors">Blog & Case Studies</Link></li>
              <li><Link to="/faq" className="hover:text-[#111214] transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[#111214] transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-[#111214] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#111214] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5A5D65]">
          <p>© {new Date().getFullYear()} Zylo Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#111214]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#111214]">Terms</Link>
            <Link to="/404" className="hover:text-[#111214]">Status & 404 Page</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
