import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Globe, ChevronRight, X } from "lucide-react";
import { ZyloMark } from "./ZyloLogo";
import { usePlatform, type SupportedLocale } from "../context/PlatformContext";

const NAV_ITEMS = [
  { to: "/how-it-works", label: "How It Works", desc: "4-step automation flow & growth loop" },
  { to: "/features", label: "Features", desc: "Scheduler, AI Studio, & cross-promotion" },
  { to: "/pricing", label: "Pricing", desc: "Creator, studio, and agency plans" },
  { to: "/blog", label: "Blog", desc: "Playbooks and creator case studies" },
  { to: "/faq", label: "FAQ", desc: "OAuth safety, rules, and billing answers" },
  { to: "/contact", label: "Contact Us", desc: "Talk with our product & onboarding team" },
];

const LOCALES: SupportedLocale[] = ["EN", "ES", "FR", "DE"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const { locale, setLocale, accounts } = usePlatform();
  const location = useLocation();

  const connectedCount = accounts.filter((a) => a.connected).length;

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setLocaleMenuOpen(false);
  }, [location.pathname]);

  // Prevent background body scroll when mobile drawer is open & support Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[#111214] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111214] rounded-lg"
          >
            <ZyloMark className="w-7 h-7" />
            <span className="font-display text-xl font-bold tracking-tight">Zylo</span>
          </Link>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3A3D45]"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 transition-colors duration-150 py-1 border-b-2 ${
                    isActive
                      ? "text-[#111214] border-[#111214] font-semibold"
                      : "border-transparent hover:text-[#111214] hover:border-neutral-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Desktop Actions + Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Desktop Language Selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setLocaleMenuOpen((v) => !v)}
                aria-expanded={localeMenuOpen}
                aria-label="Select language"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] hover:bg-neutral-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#5A5D65]" />
                <span>{locale}</span>
              </button>

              {localeMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-28 rounded-2xl bg-white border border-neutral-200 shadow-lg py-1.5 z-50"
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setLocale(loc);
                        setLocaleMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                        locale === loc
                          ? "bg-[#7CF2B5]/35 text-[#111214] font-semibold"
                          : "text-[#5A5D65] hover:bg-neutral-50 hover:text-[#111214]"
                      }`}
                    >
                      {loc === "EN" && "EN · English"}
                      {loc === "ES" && "ES · Español"}
                      {loc === "FR" && "FR · Français"}
                      {loc === "DE" && "DE · Deutsch"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <Link
              to="/app"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#111214] text-white text-sm font-semibold hover:bg-[#26282D] transition-colors whitespace-nowrap shrink-0"
            >
              Get Started
            </Link>

            {/* Mobile Modern Morphing Hamburger Button (>= 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="zylo-mobile-drawer"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-neutral-200 bg-white text-[#111214] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <span className="relative w-5 h-4 flex flex-col justify-between items-center">
                <span
                  className={`block h-0.5 w-5 bg-[#111214] rounded-full transition-transform duration-200 origin-center ${
                    mobileOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-3.5 self-end bg-[#111214] rounded-full transition-opacity duration-150 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-[#111214] rounded-full transition-transform duration-200 origin-center ${
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Slide-Over Drawer System */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#111214]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Panel */}
          <aside
            id="zylo-mobile-drawer"
            aria-label="Mobile navigation"
            className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-[#111214]"
                >
                  <ZyloMark className="w-6 h-6" />
                  <span className="font-display text-lg font-bold tracking-tight">Zylo</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-11 h-11 rounded-2xl border border-neutral-200 flex items-center justify-center text-[#111214] hover:bg-neutral-50 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Workspace Launch Card */}
              <div className="p-5">
                <Link
                  to="/app"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-3xl bg-[#111214] text-white p-5 transition-transform active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display font-bold text-base">Open Zylo Platform</p>
                      <p className="text-xs text-neutral-300 mt-1 tabular-nums">
                        {connectedCount} social channels connected · AI Studio ready
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[#7CF2B5] text-[#111214] flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* Navigation List */}
              <nav className="px-4 pb-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors ${
                        isActive
                          ? "bg-[#7CF2B5]/30 text-[#111214]"
                          : "hover:bg-neutral-50 text-[#111214]"
                      }`
                    }
                  >
                    <div>
                      <p className="font-display font-semibold text-base">{item.label}</p>
                      <p className="text-xs text-[#5A5D65] mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#5A5D65] shrink-0" />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Drawer Footer: Locale & Legal */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50/70 space-y-4">
              <div>
                <p className="text-xs font-medium text-[#5A5D65] mb-2">Language</p>
                <div className="grid grid-cols-4 gap-2">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocale(loc)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        locale === loc
                          ? "bg-[#111214] text-white border-[#111214]"
                          : "bg-white text-[#111214] border-neutral-200 hover:bg-neutral-100"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#5A5D65] pt-1">
                <Link to="/privacy" onClick={() => setMobileOpen(false)} className="hover:text-[#111214]">
                  Privacy Policy
                </Link>
                <Link to="/terms" onClick={() => setMobileOpen(false)} className="hover:text-[#111214]">
                  Terms of Service
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
