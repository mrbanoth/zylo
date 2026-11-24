import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Plus, Repeat, Search, Send, Trash2, X } from "lucide-react";
import { getPlatformBadgeColor, usePlatform } from "../../context/PlatformContext";
import type { ScheduledPost, SocialPlatform } from "../../data/mockData";

const PLATFORMS: SocialPlatform[] = [
  "Instagram",
  "LinkedIn",
  "X",
  "TikTok",
  "YouTube",
  "Threads",
];

export function SchedulerView() {
  const { accounts, posts, addPost, updatePost, deletePost } = usePlatform();
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<"All" | "Scheduled" | "Published" | "Draft">("All");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);

  // Form state
  const [platform, setPlatform] = useState<SocialPlatform>("Instagram");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtagsText, setHashtagsText] = useState("#CreatorWorkflow #SocialAutomation");
  const [scheduledDate, setScheduledDate] = useState("2026-11-28");
  const [scheduledTime, setScheduledTime] = useState("10:30");
  const [autoRecycle, setAutoRecycle] = useState(true);
  const [firstCommentTag, setFirstCommentTag] = useState(true);

  useEffect(() => {
    if (searchParams.get("compose") === "1") {
      setComposeOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filteredPosts = posts.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchPlatform = platformFilter === "All" || p.platform === platformFilter;
    const matchSearch =
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPlatform && matchSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const matchedAccount = accounts.find((a) => a.platform === platform);
    const hashtags = hashtagsText
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

    const newPost: Omit<ScheduledPost, "id"> = {
      platform,
      accountHandle: matchedAccount?.handle || `@zylo_${platform.toLowerCase()}`,
      title: title.trim(),
      content: content.trim(),
      hashtags,
      scheduledDate,
      scheduledTime,
      status: "Scheduled",
      autoRecycle,
      firstCommentTag,
      estimatedReach: Math.floor(Math.random() * 14000 + 8000),
    };
    addPost(newPost);
    setTitle("");
    setContent("");
    setComposeOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-[28px] border border-neutral-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[#111214]">
              Auto-Post Queue & Calendar
            </h2>
            <p className="text-sm text-[#5A5D65]">
              Schedule, edit, and auto-recycle posts across your connected channels.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] transition-colors cursor-pointer shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>New Scheduled Post</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 pt-2 border-t border-neutral-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A5D65] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search queued posts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["All", "Scheduled", "Published"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#111214] text-white"
                    : "bg-neutral-100 text-[#5A5D65] hover:text-[#111214]"
                }`}
              >
                {st}
              </button>
            ))}

            <select
              aria-label="Filter by platform"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-[#111214]"
            >
              <option value="All">All Platforms</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-[28px] border border-neutral-200 bg-white p-10 text-center space-y-3">
          <Calendar className="w-8 h-8 text-[#5A5D65] mx-auto" />
          <h3 className="font-display font-bold text-lg text-[#111214]">No matching posts</h3>
          <p className="text-sm text-[#5A5D65]">
            Schedule a new post or clear your filters to see your queue.
          </p>
          <button
            type="button"
            onClick={() => setComposeOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#111214] text-white text-xs font-semibold cursor-pointer"
          >
            Compose First Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-[28px] border border-neutral-200 bg-white p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${getPlatformBadgeColor(
                        post.platform
                      )}`}
                    >
                      {post.platform}
                    </span>
                    <span className="text-[#5A5D65]">{post.accountHandle}</span>
                  </div>
                  <span className="text-xs font-mono text-[#5A5D65] tabular-nums">
                    {post.scheduledDate} · {post.scheduledTime}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[#111214]">{post.title}</h3>
                <p className="text-sm text-[#5A5D65] leading-relaxed line-clamp-3">
                  {post.content}
                </p>

                <p className="text-xs text-[#3A3D45] font-mono truncate">
                  {post.hashtags.join(" ")}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-[#5A5D65]">
                  <span className="font-semibold text-[#111214]">{post.status}</span>
                  {post.autoRecycle && (
                    <span className="inline-flex items-center gap-1">
                      <Repeat className="w-3 h-3" /> Auto-Recycle
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {post.status === "Scheduled" && (
                    <button
                      type="button"
                      onClick={() =>
                        updatePost(post.id, {
                          status: "Published",
                          actualImpressions: post.estimatedReach || 11200,
                          actualEngagements: 740,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#7CF2B5] text-[#111214] text-xs font-semibold cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Publish</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    aria-label="Delete post"
                    className="p-2 rounded-full border border-neutral-200 text-[#5A5D65] hover:text-red-600 hover:border-red-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Compose Post Modal */}
      {composeOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111214]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setComposeOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white rounded-[32px] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-[#111214]">
                Schedule Automated Post
              </h3>
              <button
                type="button"
                onClick={() => setComposeOpen(false)}
                aria-label="Close composer"
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Target Network
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        platform === p
                          ? "bg-[#111214] text-white border-[#111214]"
                          : "bg-white text-[#5A5D65] border-neutral-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="post-title" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Campaign / Post Title
                </label>
                <input
                  id="post-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekly Product Launch Carousel"
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                />
              </div>

              <div>
                <label htmlFor="post-body" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Caption Copy
                </label>
                <textarea
                  id="post-body"
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your hook and body copy..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214] focus:outline-none focus:border-[#111214]"
                />
              </div>

              <div>
                <label htmlFor="post-tags" className="block text-xs font-semibold text-[#111214] mb-1.5">
                  Hashtag Cluster
                </label>
                <input
                  id="post-tags"
                  type="text"
                  value={hashtagsText}
                  onChange={(e) => setHashtagsText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-neutral-200 text-xs font-mono text-[#111214] focus:outline-none focus:border-[#111214]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="post-date" className="block text-xs font-semibold text-[#111214] mb-1.5">
                    Date
                  </label>
                  <input
                    id="post-date"
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                  />
                </div>
                <div>
                  <label htmlFor="post-time" className="block text-xs font-semibold text-[#111214] mb-1.5">
                    Time Slot
                  </label>
                  <input
                    id="post-time"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 text-sm text-[#111214]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2.5 text-xs text-[#111214] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRecycle}
                    onChange={(e) => setAutoRecycle(e.target.checked)}
                    className="accent-[#111214]"
                  />
                  <span>Enable 30-day Evergreen Auto-Recycle if engagement exceeds baseline</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#111214] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={firstCommentTag}
                    onChange={(e) => setFirstCommentTag(e.target.checked)}
                    className="accent-[#111214]"
                  />
                  <span>Inject hashtags automatically as first comment</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setComposeOpen(false)}
                  className="flex-1 py-3 rounded-full border border-neutral-200 text-xs font-semibold text-[#111214] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#111214] text-white text-xs font-semibold hover:bg-[#26282D] cursor-pointer"
                >
                  Add to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
