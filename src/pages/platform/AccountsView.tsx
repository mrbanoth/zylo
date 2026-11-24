import React, { useState } from "react";
import { Check, RefreshCw, ShieldCheck, Unplug, Link2, X } from "lucide-react";
import { usePlatform } from "../../context/PlatformContext";
import type { SocialAccount } from "../../data/mockData";

export function AccountsView() {
  const { accounts, toggleConnectAccount, toggleAutoBoost, syncAccount } = usePlatform();
  const [oauthTarget, setOauthTarget] = useState<SocialAccount | null>(null);
  const [handleInput, setHandleInput] = useState("");

  const openOAuthModal = (acc: SocialAccount) => {
    setOauthTarget(acc);
    setHandleInput(acc.handle);
  };

  const confirmOAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oauthTarget) return;
    toggleConnectAccount(oauthTarget.id, handleInput.trim() || oauthTarget.handle);
    setOauthTarget(null);
  };

  const connectedCount = accounts.filter((a) => a.connected).length;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-neutral-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#111214]">
            Connected Social Media Channels
          </h2>
          <p className="text-sm text-[#5A5D65] mt-1">
            Authorize channels via OAuth 2.0 to enable auto-posting, cross-promotion, and analytics sync.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-[#7CF2B5]/40 text-xs font-bold text-[#111214] tabular-nums whitespace-nowrap self-start sm:self-center">
          {connectedCount} / {accounts.length} Connected
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-[28px] border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    style={{ backgroundColor: acc.accentBg }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-bold text-sm text-[#111214] shrink-0"
                  >
                    {acc.platform.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-base text-[#111214]">
                      {acc.platform}
                    </h3>
                    <p className="text-xs text-[#5A5D65] truncate">{acc.handle}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    acc.connected
                      ? "bg-[#7CF2B5]/50 text-[#111214]"
                      : "bg-neutral-100 text-[#5A5D65]"
                  }`}
                >
                  {acc.connected ? "Connected" : "Disconnected"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-100">
                <div>
                  <p className="text-[11px] text-[#5A5D65]">Followers</p>
                  <p className="font-display font-bold text-sm text-[#111214] tabular-nums">
                    {acc.followers.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#5A5D65]">Engagement</p>
                  <p className="font-display font-bold text-sm text-[#111214] tabular-nums">
                    {acc.engagementRate}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#5A5D65]">30d Lift</p>
                  <p className="font-display font-bold text-sm text-emerald-700 tabular-nums">
                    +{acc.monthlyGrowth}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#111214]">Cross-Promo Auto-Boost</p>
                  <p className="text-[11px] text-[#5A5D65]">
                    Last synced: {acc.lastSynced}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={acc.autoBoost}
                  disabled={!acc.connected}
                  onClick={() => toggleAutoBoost(acc.id)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer disabled:opacity-40 ${
                    acc.autoBoost && acc.connected ? "bg-[#111214]" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      acc.autoBoost && acc.connected ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {acc.connected ? (
                <>
                  <button
                    type="button"
                    onClick={() => syncAccount(acc.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] hover:border-[#111214] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleConnectAccount(acc.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#5A5D65] hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                  >
                    <Unplug className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openOAuthModal(acc)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors cursor-pointer"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Connect {acc.platform}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* OAuth Authorization Simulation Modal */}
      {oauthTarget && (
        <div
          className="fixed inset-0 z-50 bg-[#111214]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setOauthTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  style={{ backgroundColor: oauthTarget.accentBg }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-display font-bold text-sm text-[#111214]"
                >
                  {oauthTarget.platform.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#111214]">
                    Connect {oauthTarget.platform}
                  </h3>
                  <p className="text-xs text-[#5A5D65]">OAuth 2.0 Scoped Authorization</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOauthTarget(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={confirmOAuth} className="space-y-4">
              <div>
                <label htmlFor="oauth-handle" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Account Handle
                </label>
                <input
                  id="oauth-handle"
                  type="text"
                  value={handleInput}
                  onChange={(e) => setHandleInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                />
              </div>

              <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-4 space-y-2">
                <p className="text-xs font-bold text-[#111214] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Permissions requested by Zylo:
                </p>
                <ul className="space-y-1.5">
                  {oauthTarget.permissions.map((perm) => (
                    <li key={perm} className="flex items-center gap-2 text-xs text-[#5A5D65]">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOauthTarget(null)}
                  className="flex-1 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] cursor-pointer"
                >
                  Authorize & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
