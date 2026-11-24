export type SocialPlatform =
  | "Instagram"
  | "LinkedIn"
  | "X"
  | "TikTok"
  | "YouTube"
  | "Threads";

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string;
  displayName: string;
  followers: number;
  engagementRate: number;
  monthlyGrowth: number;
  connected: boolean;
  autoBoost: boolean;
  defaultTimezone: string;
  lastSynced: string;
  permissions: string[];
  accentBg: string;
}

export interface ScheduledPost {
  id: string;
  platform: SocialPlatform;
  accountHandle: string;
  title: string;
  content: string;
  hashtags: string[];
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:MM
  status: "Scheduled" | "Published" | "Draft";
  autoRecycle: boolean;
  firstCommentTag: boolean;
  estimatedReach?: number;
  actualImpressions?: number;
  actualEngagements?: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  platforms: SocialPlatform[];
  active: boolean;
  runsCount: number;
  lastRun: string;
  category: "Scheduling" | "Cross-Promotion" | "Hashtags" | "Engagement";
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Automation" | "AI Strategy" | "Analytics" | "Creator Growth";
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  accentColor: string;
  body: string[];
  keyMetrics: { label: string; value: string }[];
}

export interface FaqItem {
  id: string;
  category: "Platform" | "Automations" | "Security & OAuth" | "Billing";
  question: string;
  answer: string;
}

export const CREATOR_ASSETS = {
  hoodiePortrait: "/src/assets/images/hero_creator_hoodie_1795524541057.jpg",
  mustardPortrait: "/src/assets/images/hero_creator_mustard_1795524540108.jpg",
  avatarOne: "/src/assets/images/avatar_creator_one_1795524541116.jpg",
  avatarTwo: "/src/assets/images/avatar_creator_two_1795524541316.jpg",
};

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: "acc-ig-1",
    platform: "Instagram",
    handle: "@maya.creates",
    displayName: "Maya Lin Studio",
    followers: 48200,
    engagementRate: 4.9,
    monthlyGrowth: 14.2,
    connected: true,
    autoBoost: true,
    defaultTimezone: "America/Los_Angeles",
    lastSynced: "3 mins ago",
    permissions: ["Publish Reels & Carousels", "Read Insights", "Manage First Comments"],
    accentBg: "#F4D4FA",
  },
  {
    id: "acc-li-1",
    platform: "LinkedIn",
    handle: "in/daniel-okafor",
    displayName: "Daniel Okafor",
    followers: 29450,
    engagementRate: 6.1,
    monthlyGrowth: 18.7,
    connected: true,
    autoBoost: true,
    defaultTimezone: "America/New_York",
    lastSynced: "5 mins ago",
    permissions: ["Share Posts & Documents", "Organization Analytics"],
    accentBg: "#B39FF8",
  },
  {
    id: "acc-x-1",
    platform: "X",
    handle: "@zylo_creator",
    displayName: "Zylo Growth Lab",
    followers: 34120,
    engagementRate: 3.8,
    monthlyGrowth: 9.6,
    connected: true,
    autoBoost: false,
    defaultTimezone: "UTC",
    lastSynced: "11 mins ago",
    permissions: ["Post Threads", "Schedule Media", "Track Mentions"],
    accentBg: "#FCE694",
  },
  {
    id: "acc-tt-1",
    platform: "TikTok",
    handle: "@mayalin.daily",
    displayName: "Maya Daily Clips",
    followers: 86900,
    engagementRate: 7.4,
    monthlyGrowth: 22.5,
    connected: true,
    autoBoost: true,
    defaultTimezone: "America/Los_Angeles",
    lastSynced: "1 min ago",
    permissions: ["Direct Video Upload", "Read Video Analytics"],
    accentBg: "#7CF2B5",
  },
  {
    id: "acc-yt-1",
    platform: "YouTube",
    handle: "@ZyloPlaybook",
    displayName: "Zylo Playbook",
    followers: 15800,
    engagementRate: 5.2,
    monthlyGrowth: 11.4,
    connected: false,
    autoBoost: false,
    defaultTimezone: "Europe/London",
    lastSynced: "Not connected",
    permissions: ["Upload Shorts", "Read Channel Analytics"],
    accentBg: "#FCE694",
  },
  {
    id: "acc-th-1",
    platform: "Threads",
    handle: "@maya.creates",
    displayName: "Maya Lin",
    followers: 12300,
    engagementRate: 4.3,
    monthlyGrowth: 8.1,
    connected: false,
    autoBoost: false,
    defaultTimezone: "America/Los_Angeles",
    lastSynced: "Not connected",
    permissions: ["Publish Text & Carousels", "Reply Automation"],
    accentBg: "#F4D4FA",
  },
];

export const INITIAL_POSTS: ScheduledPost[] = [
  {
    id: "post-101",
    platform: "Instagram",
    accountHandle: "@maya.creates",
    title: "5-Step Creator Content Flywheel Carousel",
    content:
      "Most creators burn out writing from scratch daily. Here is the exact 5-step batching flywheel we use to turn one 10-minute voice memo into 7 days of native carousels and reels.",
    hashtags: ["#CreatorWorkflow", "#ContentStrategy", "#SocialAutomation", "#BatchCreation"],
    scheduledDate: "2026-11-25",
    scheduledTime: "09:30",
    status: "Scheduled",
    autoRecycle: true,
    firstCommentTag: true,
    estimatedReach: 18400,
  },
  {
    id: "post-102",
    platform: "LinkedIn",
    accountHandle: "in/daniel-okafor",
    title: "Why Organic Cross-Promotion Beats Paid Boosts in Q4",
    content:
      "We analyzed 1,400 creator accounts across SaaS and consumer brands. Accounts pairing consistent peak-window scheduling with curated peer cross-shares grew 2.8x faster than ad-only campaigns.",
    hashtags: ["#B2BMarketing", "#OrganicGrowth", "#CreatorEconomy", "#Distribution"],
    scheduledDate: "2026-11-25",
    scheduledTime: "13:15",
    status: "Scheduled",
    autoRecycle: true,
    firstCommentTag: false,
    estimatedReach: 12900,
  },
  {
    id: "post-103",
    platform: "X",
    accountHandle: "@zylo_creator",
    title: "Thread: How We Automated 14 Hours of Weekly Scheduling",
    content:
      "1/ Last quarter our team spent 14 hours/week copying captions across 5 tabs. We rebuilt the pipeline around automated queues + AI hook variants. Here is the breakdown:",
    hashtags: ["#BuildInPublic", "#MarketingOps", "#GrowthSystems"],
    scheduledDate: "2026-11-26",
    scheduledTime: "16:00",
    status: "Scheduled",
    autoRecycle: false,
    firstCommentTag: false,
    estimatedReach: 9500,
  },
  {
    id: "post-104",
    platform: "TikTok",
    accountHandle: "@mayalin.daily",
    title: "Behind the Scenes: Studio Setup & Lighting Breakdown",
    content:
      "Quick 28-second walkthrough of our crisp daylight studio setup for high-retention founder videos. Save this lighting angle diagram for your next shoot.",
    hashtags: ["#StudioSetup", "#CreatorTips", "#VideoProduction", "#FilmingTips"],
    scheduledDate: "2026-11-27",
    scheduledTime: "18:45",
    status: "Scheduled",
    autoRecycle: false,
    firstCommentTag: true,
    estimatedReach: 31200,
  },
  {
    id: "post-105",
    platform: "Instagram",
    accountHandle: "@maya.creates",
    title: "July Growth Benchmark Breakdown (+1,424 Net Followers)",
    content:
      "Transparency check: every change we made to our posting cadence in July and how automated first-comment hashtags impacted discovery reach.",
    hashtags: ["#InstagramGrowth", "#Analytics", "#CreatorMetrics"],
    scheduledDate: "2026-11-22",
    scheduledTime: "10:00",
    status: "Published",
    autoRecycle: true,
    firstCommentTag: true,
    actualImpressions: 42850,
    actualEngagements: 2940,
  },
  {
    id: "post-106",
    platform: "LinkedIn",
    accountHandle: "in/daniel-okafor",
    title: "The 3-Hook Rule for High-Retention Carousels",
    content:
      "If slide one does not name a concrete outcome and timeframe, 68% of readers swipe past. Test two curiosity hooks before locking your weekly queue.",
    hashtags: ["#Copywriting", "#LinkedInGrowth", "#ContentDesign"],
    scheduledDate: "2026-11-20",
    scheduledTime: "08:45",
    status: "Published",
    autoRecycle: false,
    firstCommentTag: false,
    actualImpressions: 27410,
    actualEngagements: 1815,
  },
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Evergreen Top-10% Auto-Recycle",
    description:
      "Automatically re-queues your top decile performing posts into empty evening slots after a 30-day cooldown with refreshed opening hooks.",
    trigger: "Post engagement exceeds 1.5x account baseline",
    action: "Queue refreshed variant in 30 days",
    platforms: ["Instagram", "LinkedIn", "X"],
    active: true,
    runsCount: 48,
    lastRun: "Today, 08:15",
    category: "Scheduling",
  },
  {
    id: "auto-2",
    name: "Cross-Platform Short Video Mirror",
    description:
      "Detects newly published Instagram Reels, strips watermarks, adapts caption length, and schedules native uploads to TikTok and YouTube Shorts.",
    trigger: "New Reel published on @maya.creates",
    action: "Adapt & schedule to TikTok (+4h) and YouTube (+18h)",
    platforms: ["Instagram", "TikTok", "YouTube"],
    active: true,
    runsCount: 31,
    lastRun: "Yesterday, 19:40",
    category: "Cross-Promotion",
  },
  {
    id: "auto-3",
    name: "Smart First-Comment Hashtag Injector",
    description:
      "Keeps main Instagram captions visually clean by publishing 5 dynamic, niche-clustered hashtags as the first comment 45 seconds after launch.",
    trigger: "Instagram carousel or reel goes live",
    action: "Post rotated hashtag cluster as comment #1",
    platforms: ["Instagram"],
    active: true,
    runsCount: 112,
    lastRun: "Today, 10:02",
    category: "Hashtags",
  },
  {
    id: "auto-4",
    name: "Peer Network Cross-Boost Pod",
    description:
      "Shares newly published posts with matched non-competing creator partners in your niche cluster for authentic early-hour engagement.",
    trigger: "Priority post published during peak window",
    action: "Notify 12 matched niche partners + log share",
    platforms: ["LinkedIn", "X", "Instagram"],
    active: true,
    runsCount: 64,
    lastRun: "2 days ago",
    category: "Cross-Promotion",
  },
  {
    id: "auto-5",
    name: "Peak Window Dynamic Shifter",
    description:
      "Monitors real-time follower online velocity and shifts queued drafts by up to +/- 90 minutes to catch active audience spikes.",
    trigger: "2 hours before scheduled slot",
    action: "Re-align timestamp to highest online density",
    platforms: ["Instagram", "LinkedIn", "X", "TikTok"],
    active: false,
    runsCount: 19,
    lastRun: "Nov 18",
    category: "Scheduling",
  },
  {
    id: "auto-6",
    name: "High-Intent Comment Responder",
    description:
      "Flags questions or resource requests in comments and sends a tailored reply with your lead-magnet link within 3 minutes.",
    trigger: "Comment contains keyword ('guide', 'link', 'template')",
    action: "Send contextual reply + DM resource link",
    platforms: ["Instagram", "TikTok"],
    active: true,
    runsCount: 89,
    lastRun: "Today, 11:20",
    category: "Engagement",
  },
];

export const HERO_JULY_CHART_DATA = [
  { month: "Ap", value: 640, heightPct: 52, posts: 18 },
  { month: "My", value: 890, heightPct: 68, posts: 22 },
  { month: "Ju", value: 1120, heightPct: 82, posts: 27 },
  { month: "Jl", value: 1424, heightPct: 96, posts: 34 },
  { month: "Au", value: 1290, heightPct: 88, posts: 31 },
  { month: "Se", value: 1380, heightPct: 92, posts: 33 },
];

export const PLATFORM_ANALYTICS_SERIES = [
  { month: "Apr", instagram: 24500, linkedin: 14200, tiktok: 31000, x: 11400 },
  { month: "May", instagram: 29800, linkedin: 17600, tiktok: 39400, x: 13200 },
  { month: "Jun", instagram: 35400, linkedin: 21900, tiktok: 48200, x: 16800 },
  { month: "Jul", instagram: 46200, linkedin: 28400, tiktok: 61500, x: 20400 },
  { month: "Aug", instagram: 43100, linkedin: 31200, tiktok: 67800, x: 21900 },
  { month: "Sep", instagram: 51900, linkedin: 36800, tiktok: 74200, x: 24600 },
];

export const WEEKLY_HEATMAP_DATA = [
  { day: "Mon", slots: [28, 62, 84, 71, 45] },
  { day: "Tue", slots: [34, 79, 92, 68, 52] },
  { day: "Wed", slots: [41, 88, 96, 74, 49] },
  { day: "Thu", slots: [36, 82, 89, 86, 61] },
  { day: "Fri", slots: [30, 74, 78, 63, 44] },
  { day: "Sat", slots: [22, 48, 66, 81, 69] },
  { day: "Sun", slots: [25, 55, 72, 88, 74] },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    slug: "compound-organic-reach-with-cross-promotion",
    title: "How Creator Networks Compound Organic Reach Without Ad Spend",
    excerpt:
      "Inside the mechanics of niche-matched cross-promotion pods and why the first 45 minutes after publishing determine 70% of algorithmic distribution.",
    category: "Creator Growth",
    authorName: "Maya Lin",
    authorRole: "Head of Creator Ecosystems",
    authorAvatar: CREATOR_ASSETS.avatarOne,
    publishedAt: "November 14, 2026",
    readTime: "6 min read",
    accentColor: "#7CF2B5",
    keyMetrics: [
      { label: "Early-Hour Engagement Lift", value: "+184%" },
      { label: "Avg. Discovery Reach", value: "2.7x" },
      { label: "Manual Outreach Saved", value: "9 hrs/wk" },
    ],
    body: [
      "Social algorithms across Instagram, LinkedIn, and TikTok evaluate every new post inside a narrow initial testing window—typically 30 to 60 minutes after publishing. If a post sparks saves, meaningful replies, and profile clicks inside that window, distribution expands rapidly beyond existing followers.",
      "Traditional scheduling tools solve only half the equation: they publish at a set timestamp, then leave the creator alone to manually share links across Slack communities or DMs. Zylo connects automated publishing directly to curated peer networks.",
      "When your post goes live, Zylo matches it with non-competing creators in adjacent niches who have opted into cross-promotion. Real people discover, share, and engage with relevant content automatically—creating genuine velocity without spammy engagement pods.",
      "Across 1,200 creator workspaces tracked over Q3, accounts pairing AI-tuned opening hooks with Zylo's cross-promotion triggers saw a 2.7x lift in non-follower impressions within 45 days.",
    ],
  },
  {
    id: "blog-2",
    slug: "ai-hook-testing-for-multi-platform-queues",
    title: "Writing Once, Adapting Natively: AI Hook Engineering Across 5 Networks",
    excerpt:
      "Copy-pasting the exact same caption to LinkedIn, X, and Instagram tanks retention. Learn how to structure modular prompts for native platform framing.",
    category: "AI Strategy",
    authorName: "Daniel Okafor",
    authorRole: "Lead Automation Strategist",
    authorAvatar: CREATOR_ASSETS.avatarTwo,
    publishedAt: "November 6, 2026",
    readTime: "5 min read",
    accentColor: "#B39FF8",
    keyMetrics: [
      { label: "Drafting Time Reduction", value: "-74%" },
      { label: "Carousel Save Rate", value: "6.4%" },
      { label: "Cross-Platform Variants", value: "5x" },
    ],
    body: [
      "Every social network rewards a different reading rhythm. LinkedIn favors concise first-line tension followed by scannable two-sentence paragraphs. X thrives on crisp, numbered thread mechanics. Instagram carousels demand visual curiosity in the first 90 characters before the 'more' fold.",
      "Inside Zylo AI Studio, Gemini models inspect your core idea, brand tone, and target audience, then synthesize distinct platform-native variations rather than generic translations.",
      "The winning workflow is simple: capture one raw insight or customer win, generate tailored variants in 8 seconds, adjust any personal anecdote, and dispatch the entire batch straight into your weekly queue.",
    ],
  },
  {
    id: "blog-3",
    slug: "evergreen-content-recycling-playbook",
    title: "The Evergreen Flywheel: Turning Your Top 10% Posts Into Recurring Growth",
    excerpt:
      "Most followers never see a post the first time it airs. Here is the exact 30-day cooldown rule that keeps feeds fresh without repeating yourself.",
    category: "Automation",
    authorName: "Claire Moreau",
    authorRole: "Product Growth Lead",
    authorAvatar: CREATOR_ASSETS.avatarOne,
    publishedAt: "October 28, 2026",
    readTime: "7 min read",
    accentColor: "#FCE694",
    keyMetrics: [
      { label: "Queue Fill Rate", value: "100%" },
      { label: "Evergreen Reach Retention", value: "91%" },
      { label: "Weekly Consistency", value: "7 days" },
    ],
    body: [
      "If you have been publishing consistently for six months, you already sit on a goldmine of validated ideas. Only 8% to 15% of your total audience typically sees any single organic post.",
      "Instead of letting top performers die in your archive, configure an Evergreen Auto-Recycle rule: whenever a post outperforms your 30-day median engagement by 1.5x, Zylo queues it for an automated refresh 30 days later.",
      "Combined with AI hook rotation, your best educational frameworks continue bringing in new followers month after month while freeing your creative energy for fresh experiments.",
    ],
  },
  {
    id: "blog-4",
    slug: "hashtag-clustering-vs-keyword-seo",
    title: "Hashtag Optimization in 2026: Niche Clusters vs. Social Search Keywords",
    excerpt:
      "Broad 10M+ tags dilute audience signals. Discover how micro-clustered 5-tag sets paired with caption keywords boost search discovery.",
    category: "Analytics",
    authorName: "Liam Vance",
    authorRole: "Data & Insights Editor",
    authorAvatar: CREATOR_ASSETS.avatarTwo,
    publishedAt: "October 19, 2026",
    readTime: "4 min read",
    accentColor: "#F4D4FA",
    keyMetrics: [
      { label: "Search Impressions", value: "+62%" },
      { label: "Optimal Tag Count", value: "4–6" },
      { label: "Spam Signal Risk", value: "0%" },
    ],
    body: [
      "Stuffing 30 generic hashtags at the bottom of every post is an outdated habit that often suppresses distribution. Modern social search indexes your caption keywords, on-screen text, and a tight 4–6 tag niche cluster.",
      "Zylo's Hashtag Optimization module analyzes your caption semantics and pairs two high-intent topic tags, two mid-volume community tags, and one branded tag—automatically rotating sets so you never trigger repetitive-tag filters.",
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Security & OAuth",
    question: "How does Zylo connect to my social media accounts safely?",
    answer:
      "Zylo uses official OAuth 2.0 partner integrations for Instagram, LinkedIn, X, TikTok, YouTube, and Threads. We never ask for or store your account password, and you can revoke access per channel in one click from your Accounts dashboard.",
  },
  {
    id: "faq-2",
    category: "Automations",
    question: "Will automated cross-promotion or auto-posting hurt my reach?",
    answer:
      "No. Zylo publishes through official scheduling APIs at human-paced intervals and rotates hashtags and hooks automatically. Our Cross-Promotion network pairs you with verified, real creators in adjacent niches rather than bots.",
  },
  {
    id: "faq-3",
    category: "Platform",
    question: "How does the built-in Gemini AI Studio work with the Scheduler?",
    answer:
      "Inside AI Studio, you enter a brief, product launch, or rough note. Zylo's server-side Gemini engine generates platform-specific posts, hooks, hashtags, and posting windows. One click sends any variant straight into your visual scheduler queue.",
  },
  {
    id: "faq-4",
    category: "Automations",
    question: "Can I pause or customize an automation rule at any time?",
    answer:
      "Yes. Every automation workflow—from Evergreen Auto-Recycle to First-Comment Hashtag Injection—has an instant active/paused switch, customizable cooldown windows, and full execution logs.",
  },
  {
    id: "faq-5",
    category: "Billing",
    question: "Is there a free plan or trial before choosing a paid tier?",
    answer:
      "Yes. Starter Creator lets you connect up to 3 social channels, schedule 20 posts per month, and test AI post generation free for 14 days with no credit card required.",
  },
  {
    id: "faq-6",
    category: "Platform",
    question: "Can agencies manage multiple client brands in separate workspaces?",
    answer:
      "Agency Network includes unlimited client workspaces, role-based approval workflows, white-label analytics exports, and shared automation templates.",
  },
];

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter Creator",
    audience: "For solo creators building consistency",
    monthlyPrice: 19,
    annualPrice: 15,
    accent: "#7CF2B5",
    limits: [
      "Up to 3 connected social channels",
      "60 scheduled posts per month",
      "50 AI Studio generations / month",
      "2 active automation rules",
      "30-day analytics history",
    ],
    cta: "Start 14-Day Free Trial",
  },
  {
    id: "growth",
    name: "Growth Studio",
    audience: "For scaling brands & marketing teams",
    monthlyPrice: 49,
    annualPrice: 39,
    accent: "#B39FF8",
    featured: true,
    limits: [
      "Up to 12 connected social channels",
      "Unlimited scheduled & auto-recycled posts",
      "Unlimited AI Studio & Content Repurposer",
      "Unlimited custom automation workflows",
      "Cross-Promotion peer network access",
      "12-month analytics & CSV exports",
    ],
    cta: "Launch Growth Studio",
  },
  {
    id: "agency",
    name: "Agency Network",
    audience: "For agencies & multi-brand operations",
    monthlyPrice: 129,
    annualPrice: 99,
    accent: "#FCE694",
    limits: [
      "Unlimited channels across 10 workspaces",
      "Team approvals & client review links",
      "Custom AI brand voice profiles",
      "Priority Cross-Promotion clusters",
      "Dedicated onboarding & SLA support",
    ],
    cta: "Contact Sales Team",
  },
];

export const CREATOR_CASE_STUDIES = [
  {
    id: "cs-1",
    name: "Hannah Lindqvist",
    role: "Founder, Nordik Botanicals",
    avatar: CREATOR_ASSETS.avatarOne,
    metric: "+142% Organic Reach in 90 Days",
    beforeAfter: "From 4 manual posts/week to 18 automated multi-channel touchpoints",
    quote:
      "Connecting our Instagram, TikTok, and LinkedIn into one Zylo queue cut our weekly social prep from nine hours down to one Monday morning review.",
    accent: "#7CF2B5",
  },
  {
    id: "cs-2",
    name: "Marcus Delgado",
    role: "Growth Lead, Framecraft Studio",
    avatar: CREATOR_ASSETS.avatarTwo,
    metric: "+1,424 Net Followers in July",
    beforeAfter: "Replaced scattered spreadsheets with Evergreen Auto-Recycle + AI hooks",
    quote:
      "The AI Studio doesn't sound robotic—it gives us sharp platform-native drafts that drop right into our peak Tuesday and Thursday slots.",
    accent: "#B39FF8",
  },
  {
    id: "cs-3",
    name: "Sora Takahashi",
    role: "Independent Design Educator",
    avatar: CREATOR_ASSETS.hoodiePortrait,
    metric: "3.4x Carousel Saves Across 6 Months",
    beforeAfter: "Automated first-comment hashtags + matched creator cross-promotion",
    quote:
      "Shine Together cross-promotion brought my tutorials to real peers instead of cold ad traffic. My newsletter signups from social tripled.",
    accent: "#FCE694",
  },
];
