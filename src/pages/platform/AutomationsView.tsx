import React, { useState } from "react";
import { Play, Plus, X, Zap } from "lucide-react";
import { getPlatformBadgeColor, usePlatform } from "../../context/PlatformContext";
import type { AutomationRule, SocialPlatform } from "../../data/mockData";

const CATEGORIES = ["All", "Scheduling", "Cross-Promotion", "Hashtags", "Engagement"] as const;
const PLATFORMS: SocialPlatform[] = ["Instagram", "LinkedIn", "X", "TikTok", "YouTube", "Threads"];

export function AutomationsView() {
  const { automations, toggleAutomation, runAutomationNow, addAutomation } = usePlatform();
  const [category, setCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState("New post scheduled for peak window");
  const [action, setAction] = useState("Adapt & cross-post +4 hours later");
  const [ruleCategory, setRuleCategory] = useState<AutomationRule["category"]>("Scheduling");
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(["Instagram", "LinkedIn"]);

  const filtered =
    category === "All"
      ? automations
      : automations.filter((r) => r.category === category);

  const togglePlat = (p: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedPlatforms.length === 0) return;
    addAutomation({
      name: name.trim(),
      description: description.trim() || `${trigger} -> ${action}`,
      trigger: trigger.trim(),
      action: action.trim(),
      platforms: selectedPlatforms,
      active: true,
      category: ruleCategory,
    });
    setName("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-neutral-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[#111214]">
              Trigger-Action Automations
            </h2>
            <p className="text-sm text-[#5A5D65]">
              Control auto-recycling, cross-platform mirroring, hashtag injection, and peer boosts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors cursor-pointer shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation Rule</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                category === cat
                  ? "bg-[#111214] text-white"
                  : "bg-neutral-100 text-[#5A5D65] hover:text-[#111214]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((rule) => (
          <div
            key={rule.id}
            className="rounded-[28px] border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#5A5D65]">
                    <span className="font-semibold text-[#111214]">{rule.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{rule.runsCount} runs</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#111214]">
                    {rule.name}
                  </h3>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={rule.active}
                  onClick={() => toggleAutomation(rule.id)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    rule.active ? "bg-[#111214]" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                      rule.active ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <p className="text-sm text-[#5A5D65] leading-relaxed">{rule.description}</p>

              <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-4 space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-[#111214]">When: </span>
                  <span className="text-[#5A5D65]">{rule.trigger}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#111214]">Then: </span>
                  <span className="text-[#5A5D65]">{rule.action}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {rule.platforms.map((p) => (
                  <span
                    key={p}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getPlatformBadgeColor(
                      p
                    )}`}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#5A5D65]">Last: {rule.lastRun}</span>
                <button
                  type="button"
                  onClick={() => runAutomationNow(rule.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] hover:border-[#111214] cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Run Test</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Automation Rule Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111214]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#FCE694] flex items-center justify-center text-[#111214]">
                  <Zap className="w-4 h-4" />
                </span>
                <h3 className="font-display text-lg font-bold text-[#111214]">
                  Create Automation Rule
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="rule-name" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Rule Name
                </label>
                <input
                  id="rule-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. LinkedIn Carousel to X Thread"
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                />
              </div>

              <div>
                <label htmlFor="rule-cat" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Category
                </label>
                <select
                  id="rule-cat"
                  value={ruleCategory}
                  onChange={(e) => setRuleCategory(e.target.value as AutomationRule["category"])}
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214] bg-white"
                >
                  <option value="Scheduling">Scheduling</option>
                  <option value="Cross-Promotion">Cross-Promotion</option>
                  <option value="Hashtags">Hashtags</option>
                  <option value="Engagement">Engagement</option>
                </select>
              </div>

              <div>
                <label htmlFor="rule-trigger" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Trigger Condition
                </label>
                <input
                  id="rule-trigger"
                  type="text"
                  required
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                />
              </div>

              <div>
                <label htmlFor="rule-action" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Automated Action
                </label>
                <input
                  id="rule-action"
                  type="text"
                  required
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                />
              </div>

              <div>
                <label htmlFor="rule-desc" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Description
                </label>
                <textarea
                  id="rule-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional notes on how this rule fits your workflow..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#111214] mb-1.5">Target Channels</p>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlat(p)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                        selectedPlatforms.includes(p)
                          ? "bg-[#111214] text-white border-[#111214]"
                          : "bg-white text-[#5A5D65] border-neutral-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-full border border-neutral-200 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#111214] text-white text-xs font-semibold cursor-pointer"
                >
                  Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
