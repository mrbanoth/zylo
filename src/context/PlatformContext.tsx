import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  INITIAL_ACCOUNTS,
  INITIAL_AUTOMATIONS,
  INITIAL_POSTS,
  type AutomationRule,
  type ScheduledPost,
  type SocialAccount,
  type SocialPlatform,
} from "../data/mockData";

export type SupportedLocale = "EN" | "ES" | "FR" | "DE";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: "success" | "info" | "error";
}

interface PlatformContextValue {
  accounts: SocialAccount[];
  posts: ScheduledPost[];
  automations: AutomationRule[];
  locale: SupportedLocale;
  setLocale: (loc: SupportedLocale) => void;
  toggleConnectAccount: (id: string, customHandle?: string) => void;
  toggleAutoBoost: (id: string) => void;
  syncAccount: (id: string) => void;
  addPost: (post: Omit<ScheduledPost, "id">) => void;
  updatePost: (id: string, patch: Partial<ScheduledPost>) => void;
  deletePost: (id: string) => void;
  toggleAutomation: (id: string) => void;
  addAutomation: (rule: Omit<AutomationRule, "id" | "runsCount" | "lastRun">) => void;
  runAutomationNow: (id: string) => void;
  resetDemoData: () => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

const STORAGE_KEY = "zylo_platform_state_v1";

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<SocialAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.accounts)) return parsed.accounts;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_ACCOUNTS;
  });

  const [posts, setPosts] = useState<ScheduledPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.posts)) return parsed.posts;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_POSTS;
  });

  const [automations, setAutomations] = useState<AutomationRule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.automations)) return parsed.automations;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_AUTOMATIONS;
  });

  const [locale, setLocale] = useState<SupportedLocale>("EN");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accounts, posts, automations })
      );
    } catch {
      // ignore quota errors
    }
  }, [accounts, posts, automations]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      setTimeout(() => {
        dismissToast(id);
      }, 4000);
    },
    [dismissToast]
  );

  const toggleConnectAccount = useCallback(
    (id: string, customHandle?: string) => {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id !== id) return acc;
          const nextConnected = !acc.connected;
          pushToast({
            title: nextConnected
              ? `${acc.platform} connected`
              : `${acc.platform} disconnected`,
            description: nextConnected
              ? `Synced ${customHandle || acc.handle} via OAuth 2.0`
              : `Revoked publishing access for ${acc.handle}`,
            tone: nextConnected ? "success" : "info",
          });
          return {
            ...acc,
            connected: nextConnected,
            handle: customHandle ? customHandle : acc.handle,
            lastSynced: nextConnected ? "Just now" : "Disconnected",
          };
        })
      );
    },
    [pushToast]
  );

  const toggleAutoBoost = useCallback(
    (id: string) => {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id !== id) return acc;
          const next = !acc.autoBoost;
          pushToast({
            title: next ? "Auto-Boost enabled" : "Auto-Boost paused",
            description: `${acc.platform} (${acc.handle})`,
            tone: "info",
          });
          return { ...acc, autoBoost: next };
        })
      );
    },
    [pushToast]
  );

  const syncAccount = useCallback(
    (id: string) => {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id !== id) return acc;
          pushToast({
            title: `${acc.platform} synced`,
            description: "Follower metrics and audience online windows updated.",
            tone: "success",
          });
          return {
            ...acc,
            lastSynced: "Just now",
            followers: acc.followers + Math.floor(Math.random() * 14 + 3),
          };
        })
      );
    },
    [pushToast]
  );

  const addPost = useCallback(
    (post: Omit<ScheduledPost, "id">) => {
      const id = `post-${Date.now()}`;
      setPosts((prev) => [{ ...post, id }, ...prev]);
      pushToast({
        title: post.status === "Published" ? "Post published" : "Post scheduled",
        description: `${post.platform} · ${post.scheduledDate} at ${post.scheduledTime}`,
        tone: "success",
      });
    },
    [pushToast]
  );

  const updatePost = useCallback(
    (id: string, patch: Partial<ScheduledPost>) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
      );
      pushToast({
        title: "Queue updated",
        description: "Post schedule changes saved.",
        tone: "success",
      });
    },
    [pushToast]
  );

  const deletePost = useCallback(
    (id: string) => {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      pushToast({
        title: "Post removed",
        description: "Removed from your publishing queue.",
        tone: "info",
      });
    },
    [pushToast]
  );

  const toggleAutomation = useCallback(
    (id: string) => {
      setAutomations((prev) =>
        prev.map((rule) => {
          if (rule.id !== id) return rule;
          const next = !rule.active;
          pushToast({
            title: next ? "Automation activated" : "Automation paused",
            description: rule.name,
            tone: next ? "success" : "info",
          });
          return { ...rule, active: next };
        })
      );
    },
    [pushToast]
  );

  const addAutomation = useCallback(
    (rule: Omit<AutomationRule, "id" | "runsCount" | "lastRun">) => {
      const newRule: AutomationRule = {
        ...rule,
        id: `auto-${Date.now()}`,
        runsCount: 0,
        lastRun: "Ready",
      };
      setAutomations((prev) => [newRule, ...prev]);
      pushToast({
        title: "Automation rule created",
        description: rule.name,
        tone: "success",
      });
    },
    [pushToast]
  );

  const runAutomationNow = useCallback(
    (id: string) => {
      setAutomations((prev) =>
        prev.map((rule) => {
          if (rule.id !== id) return rule;
          pushToast({
            title: "Workflow executed",
            description: `${rule.name} completed across ${rule.platforms.join(", ")}.`,
            tone: "success",
          });
          return {
            ...rule,
            runsCount: rule.runsCount + 1,
            lastRun: "Just now",
          };
        })
      );
    },
    [pushToast]
  );

  const resetDemoData = useCallback(() => {
    setAccounts(INITIAL_ACCOUNTS);
    setPosts(INITIAL_POSTS);
    setAutomations(INITIAL_AUTOMATIONS);
    localStorage.removeItem(STORAGE_KEY);
    pushToast({
      title: "Workspace reset",
      description: "Restored default creator mock data.",
      tone: "info",
    });
  }, [pushToast]);

  return (
    <PlatformContext.Provider
      value={{
        accounts,
        posts,
        automations,
        locale,
        setLocale,
        toggleConnectAccount,
        toggleAutoBoost,
        syncAccount,
        addPost,
        updatePost,
        deletePost,
        toggleAutomation,
        addAutomation,
        runAutomationNow,
        resetDemoData,
        toasts,
        pushToast,
        dismissToast,
      }}
    >
      {children}
      {/* Non-intrusive Toast Stack */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start justify-between gap-3 rounded-2xl bg-[#111214] text-white px-4 py-3 shadow-lg border border-white/10"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-neutral-300 mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-xs text-neutral-400 hover:text-white shrink-0 px-1 py-0.5"
              aria-label="Dismiss notification"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }
  return ctx;
}

export function getPlatformBadgeColor(platform: SocialPlatform): string {
  switch (platform) {
    case "Instagram":
      return "bg-[#F4D4FA] text-[#111214]";
    case "LinkedIn":
      return "bg-[#B39FF8] text-[#111214]";
    case "TikTok":
      return "bg-[#7CF2B5] text-[#111214]";
    case "X":
      return "bg-[#FCE694] text-[#111214]";
    case "YouTube":
      return "bg-[#FCE694] text-[#111214]";
    case "Threads":
      return "bg-[#F4D4FA] text-[#111214]";
    default:
      return "bg-neutral-100 text-[#111214]";
  }
}
