import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CalendarDays,
  LayoutDashboard,
  Link2,
  Plus,
  RotateCcw,
  X,
  Zap,
} from "lucide-react";
import { ZyloMark } from "../../components/ZyloLogo";
import { usePlatform } from "../../context/PlatformContext";

const PLATFORM_NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/accounts", label: "Social Accounts", icon: Link2, end: false },
  { to: "/app/scheduler", label: "Auto-Scheduler", icon: CalendarDays, end: false },
  { to: "/app/automations", label: "Automations", icon: Zap, end: false },
  { to: "/app/ai-studio", label: "AI Studio", icon: Bot, end: false },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3, end: false },
];

const ROUTE_TITLES: Record<string, string> = {
  "/app": "Overview",
  "/app/accounts": "Social Accounts",
  "/app/scheduler": "Auto-Post Scheduler",
  "/app/automations": "Automations Engine",
  "/app/ai-studio": "Gemini AI Studio",
  "/app/analytics": "Analytics & Infographics",
};

export function PlatformLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { accounts, posts, resetDemoData } = usePlatform();

  const currentTitle = ROUTE_TITLES[location.pathname] || "Workspace";
  const connectedCount = accounts.filter((a) => a.connected).length;
  const scheduledCount = posts.filter((p) => p.status === "Scheduled").length;

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full py-5 px-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2.5 text-[#111214]">
            <ZyloMark className="w-6 h-6" />
            <span className="font-display text-lg font-bold tracking-tight">Zylo</span>
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close workspace menu"
            className="lg:hidden w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center text-[#111214]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav aria-label="Workspace navigation" className="space-y-1">
          {PLATFORM_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#111214] text-white font-semibold"
                      : "text-[#5A5D65] hover:bg-neutral-100 hover:text-[#111214]"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-6 border-t border-neutral-200">
        <div className="rounded-2xl bg-[#7CF2B5]/30 p-3.5 text-xs space-y-1">
          <p className="font-semibold text-[#111214]">Workspace Summary</p>
          <p className="text-[#3A3D45] tabular-nums">
            {connectedCount} active channels · {scheduledCount} queued
          </p>
        </div>

        <button
          type="button"
          onClick={resetDemoData}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-[#5A5D65] hover:bg-neutral-100 hover:text-[#111214] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <Link
          to="/"
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#111214] hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-neutral-200 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Workspace Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#111214]/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Workspace Bar */}
        <header className="sticky top-0 z-30 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open workspace menu"
              className="lg:hidden w-10 h-10 rounded-xl border border-neutral-200 bg-white flex flex-col items-center justify-center gap-1 cursor-pointer shrink-0"
            >
              <span className="w-4 h-0.5 bg-[#111214] rounded-full" />
              <span className="w-3 h-0.5 bg-[#111214] rounded-full self-start ml-3" />
              <span className="w-4 h-0.5 bg-[#111214] rounded-full" />
            </button>

            <div className="flex items-center gap-2 text-sm min-w-0">
              <span className="hidden sm:inline text-[#5A5D65]">Zylo Studio</span>
              <span className="hidden sm:inline text-neutral-300">/</span>
              <h1 className="font-display font-bold text-[#111214] truncate">
                {currentTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/app/scheduler?compose=1"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Post</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
