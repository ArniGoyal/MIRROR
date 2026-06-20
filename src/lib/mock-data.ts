// ─── MIRROR — Central Mock Data ─────────────────────────────────────────────
// All AI/ML features are simulated with this rich dataset.

// ─── Style DNA Profile ──────────────────────────────────────────────────────

export interface StyleDNAProfile {
  identityScore: number;
  contentAnalyzed: number;
  platformsConnected: number;
  consistencyScore: number;
  radarMetrics: { axis: string; value: number }[];
  topKeywords: string[];
  tone: string;
  hookPattern: string;
  ctaStyle: string;
  storytellingFramework: string;
}

export const styleDNA: StyleDNAProfile = {
  identityScore: 87,
  contentAnalyzed: 342,
  platformsConnected: 4,
  consistencyScore: 91,
  radarMetrics: [
    { axis: "Vocabulary Complexity", value: 72 },
    { axis: "Emotional Intensity", value: 85 },
    { axis: "Humor Level", value: 45 },
    { axis: "Sentence Structure", value: 78 },
    { axis: "Tone Authority", value: 92 },
    { axis: "Engagement", value: 68 },
  ],
  topKeywords: ["Discipline", "Friction", "Architecture", "Momentum", "Clarity", "Void"],
  tone: "Authoritative, stoic, slightly urgent",
  hookPattern: "Negative Shift — Start with a widely accepted belief → instantly contradict it",
  ctaStyle: "Direct imperative with urgency: 'Start today. Not tomorrow.'",
  storytellingFramework: "Problem → Personal anecdote → Framework → CTA",
};

// ─── Platforms ──────────────────────────────────────────────────────────────

export interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  piecesAnalyzed: number;
  lastSync: string;
  sparkline: number[];
}

export const platforms: Platform[] = [
  { id: "youtube", name: "YouTube", icon: "▶", connected: true, piecesAnalyzed: 127, lastSync: "2 hours ago", sparkline: [30, 45, 38, 52, 61, 48, 72, 65, 80, 74, 88, 92] },
  { id: "instagram", name: "Instagram", icon: "📷", connected: true, piecesAnalyzed: 89, lastSync: "1 hour ago", sparkline: [20, 35, 42, 38, 55, 60, 48, 65, 58, 72, 68, 75] },
  { id: "twitter", name: "X / Twitter", icon: "𝕏", connected: true, piecesAnalyzed: 98, lastSync: "30 min ago", sparkline: [45, 52, 48, 60, 55, 70, 65, 78, 72, 85, 80, 88] },
  { id: "linkedin", name: "LinkedIn", icon: "in", connected: true, piecesAnalyzed: 28, lastSync: "3 hours ago", sparkline: [15, 22, 28, 25, 35, 40, 38, 45, 42, 50, 48, 55] },
  { id: "blog", name: "Blog", icon: "✍", connected: false, piecesAnalyzed: 0, lastSync: "—", sparkline: [] },
  { id: "podcast", name: "Podcast", icon: "🎙", connected: false, piecesAnalyzed: 0, lastSync: "—", sparkline: [] },
];

// ─── Content Patterns ───────────────────────────────────────────────────────

export interface ContentPattern {
  id: string;
  category: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  example: string;
  icon: string;
}

export const contentPatterns: ContentPattern[] = [
  {
    id: "hook",
    category: "Hook Pattern",
    title: "Negative Shift",
    stat: "78%",
    statLabel: "of your top content uses this",
    description: "Start with a widely accepted belief → instantly contradict it.",
    example: "\"You think you need more motivation. You don't. You need a system.\"",
    icon: "zap",
  },
  {
    id: "cta",
    category: "CTA Style",
    title: "Direct Imperative",
    stat: "65%",
    statLabel: "conversion rate",
    description: "Short, commanding call-to-action with urgency built in.",
    example: "\"Start today. Not tomorrow. Today.\"",
    icon: "target",
  },
  {
    id: "story",
    category: "Storytelling",
    title: "Problem → Framework",
    stat: "4-part",
    statLabel: "structure average",
    description: "Problem → Personal anecdote → Framework reveal → CTA.",
    example: "\"I spent 3 years failing at content. Then I found the system...\"",
    icon: "book",
  },
  {
    id: "transition",
    category: "Transition Style",
    title: "Bridge & Pivot",
    stat: "2.4s",
    statLabel: "avg scene cut",
    description: "Sharp visual cuts paired with slow deliberate voiceover bridges.",
    example: "\"But here's what nobody tells you...\"",
    icon: "film",
  },
];

// ─── Audience Engagement ────────────────────────────────────────────────────

export interface EngagementPattern {
  type: string;
  description: string;
  frequency: number;
  examples: string[];
}

export const engagementPatterns: EngagementPattern[] = [
  {
    type: "Questions",
    description: "Rhetorical questions to build tension",
    frequency: 82,
    examples: ["\"But what if I told you...?\"", "\"Sound familiar?\"", "\"Think about it.\""],
  },
  {
    type: "Community",
    description: "Direct, personal, mentor-like interaction",
    frequency: 74,
    examples: ["\"Drop a 🔥 if you agree\"", "\"Tell me your biggest challenge\"", "\"Tag someone who needs this\""],
  },
  {
    type: "Replies",
    description: "Thoughtful, detailed responses with added value",
    frequency: 68,
    examples: ["Always adds a new insight", "References own content", "Uses emojis sparingly"],
  },
];

// ─── Alter Ego / Content Generation ─────────────────────────────────────────

export interface GenerationExample {
  platform: string;
  prompt: string;
  genericOutput: string;
  mirrorOutput: string;
  patternsUsed: string[];
  consistencyScore: number;
}

export const generationExamples: Record<string, GenerationExample> = {
  linkedin: {
    platform: "LinkedIn",
    prompt: "Write a motivational LinkedIn post about consistency.",
    genericOutput: `Consistency is the key to success. 🔑

When you show up every day, great things happen. It's not about being perfect — it's about being consistent.

Here are 3 tips for staying consistent:
1. Set small goals
2. Track your progress
3. Stay accountable

Remember: Success is built one day at a time. Keep going! 💪

#Consistency #Success #Motivation #Growth`,
    mirrorOutput: `You don't need motivation.

Read that again.

Every creator who's ever built something real will tell you the same thing — motivation is a trap. It comes and goes like weather.

What you need is architecture.

A system so embedded in your day that consistency becomes invisible. Not a grind. Not discipline theater. Just... how you operate.

Here's the framework I use:
→ One non-negotiable block per day (mine: 6 AM, no exceptions)
→ Kill the decision fatigue (same format, same rhythm, iterate later)
→ Measure output, not feelings

The creators you admire aren't more motivated than you. They just stopped waiting to feel ready.

Build the system. The results will follow.

Start today. Not tomorrow. Today.`,
    patternsUsed: ["Negative Shift hook", "Problem → Framework storytelling", "Direct Imperative CTA", "Stoic-authoritative tone"],
    consistencyScore: 94,
  },
  twitter: {
    platform: "X / Twitter",
    prompt: "Write a thread about building an audience from zero.",
    genericOutput: `🧵 How to build an audience from zero:

1/ Start by defining your niche
2/ Post consistently every day
3/ Engage with others in your space
4/ Provide value in every post
5/ Be patient — growth takes time

Follow me for more tips! 🚀`,
    mirrorOutput: `I had 0 followers 18 months ago.

Now I reach 2M+ people a month.

Here's the exact architecture I used (thread) 🧵

1/ The biggest lie in content: "Just post consistently."

No. Post consistently with STRUCTURE.

Random consistency is just noise.

2/ Week 1-4: I studied the top 20 accounts in my niche.

Not to copy. To decode.

What hooks worked? What formats? What time?

I built a playbook. Not a mood board.

3/ The system:
→ Monday: Contrarian take (high engagement)
→ Wednesday: Framework thread (high saves)  
→ Friday: Personal story (high shares)

Every piece had a job.

4/ The inflection point wasn't a viral post.

It was when I stopped chasing likes and started building a library.

Your archive is your compound interest.

Build it deliberately.`,
    patternsUsed: ["Personal story hook", "Framework structure", "Contrarian positioning", "Metaphor-heavy vocabulary"],
    consistencyScore: 91,
  },
  instagram: {
    platform: "Instagram",
    prompt: "Write a caption about overcoming failure.",
    genericOutput: `Failure is not the opposite of success — it's part of the journey! 🌟

Every successful person has failed multiple times. The difference? They didn't give up.

Embrace your failures, learn from them, and keep moving forward. Your breakthrough is closer than you think! 

❤️ Double tap if you agree!
#FailForward #Success #NeverGiveUp`,
    mirrorOutput: `I failed publicly. 147 people watched.

It was my third video. I forgot my lines. Stumbled through a framework I barely understood. Posted it anyway because "consistency."

That video got 3 likes. One was my mom.

But here's what that failure built:
→ Thick skin (you can't be embarrassed twice)
→ A baseline (everything after was better)
→ Proof I could ship imperfect work

The creators you admire? They all have a "147 people" moment.

The difference is they posted #148.

Your failure isn't a signal to stop.
It's a receipt that you started.`,
    patternsUsed: ["Personal vulnerability hook", "Numbered specifics", "Reframe technique", "Imperative close"],
    consistencyScore: 89,
  },
};

// ─── Brand Consistency ──────────────────────────────────────────────────────

export interface ConsistencyData {
  overallScore: number;
  trend: { month: string; score: number }[];
  drifts: {
    type: string;
    severity: "low" | "medium" | "high";
    description: string;
    example: string;
  }[];
  recentContent: {
    id: string;
    platform: string;
    title: string;
    date: string;
    score: number;
    status: "aligned" | "drifting" | "misaligned";
  }[];
  suggestions: {
    id: string;
    title: string;
    description: string;
    before: string;
    after: string;
    impact: string;
  }[];
}

export const consistencyData: ConsistencyData = {
  overallScore: 91,
  trend: [
    { month: "Jan", score: 88 },
    { month: "Feb", score: 85 },
    { month: "Mar", score: 82 },
    { month: "Apr", score: 87 },
    { month: "May", score: 90 },
    { month: "Jun", score: 91 },
    { month: "Jul", score: 89 },
    { month: "Aug", score: 93 },
    { month: "Sep", score: 91 },
  ],
  drifts: [
    {
      type: "Tone",
      severity: "low",
      description: "Slight increase in casual language detected in recent X posts.",
      example: "Used 'lol' and 'ngl' — diverges from your stoic-authoritative baseline.",
    },
    {
      type: "Vocabulary",
      severity: "medium",
      description: "Recent LinkedIn posts introduced 3 new buzzwords not in your Style DNA.",
      example: "'Synergy', 'leverage', 'ecosystem' — your DNA favors concrete nouns.",
    },
    {
      type: "Structure",
      severity: "low",
      description: "Last 2 blog posts skipped the personal anecdote section.",
      example: "Your top-performing content uses Problem → Anecdote → Framework → CTA.",
    },
  ],
  recentContent: [
    { id: "1", platform: "LinkedIn", title: "Why Systems Beat Goals", date: "2 hours ago", score: 96, status: "aligned" },
    { id: "2", platform: "X / Twitter", title: "Thread: The Discipline Myth", date: "5 hours ago", score: 92, status: "aligned" },
    { id: "3", platform: "Instagram", title: "Morning Routine Breakdown", date: "1 day ago", score: 78, status: "drifting" },
    { id: "4", platform: "YouTube", title: "Why Most Creators Fail", date: "2 days ago", score: 94, status: "aligned" },
    { id: "5", platform: "LinkedIn", title: "Leveraging Synergies in Content", date: "3 days ago", score: 62, status: "misaligned" },
    { id: "6", platform: "X / Twitter", title: "Quick thoughts on AI tools ngl", date: "4 days ago", score: 71, status: "drifting" },
  ],
  suggestions: [
    {
      id: "s1",
      title: "Replace corporate buzzwords",
      description: "Your DNA uses concrete, tangible nouns. Replace abstract jargon.",
      before: "\"Leveraging synergies to build ecosystem growth\"",
      after: "\"Building a system that compounds — one brick at a time\"",
      impact: "+15% consistency score on affected posts",
    },
    {
      id: "s2",
      title: "Restore personal anecdote section",
      description: "Your top 20% of content always includes a personal story in position 2.",
      before: "Problem → Framework → CTA",
      after: "Problem → Personal Story → Framework → CTA",
      impact: "+23% engagement on blog posts",
    },
    {
      id: "s3",
      title: "Maintain stoic tone on X",
      description: "Recent casual language dilutes your authoritative voice.",
      before: "\"ngl this AI stuff is wild lol\"",
      after: "\"AI isn't coming for creators. It's coming for creators without systems.\"",
      impact: "+8% reply rate, +12% reposts",
    },
  ],
};

// ─── Creative Block Buster ──────────────────────────────────────────────────

export interface IdeaSuggestion {
  id: string;
  title: string;
  description: string;
  platform: string;
  estimatedEngagement: string;
  tags: string[];
  basedOn: string;
}

export const ideaSuggestions: IdeaSuggestion[] = [
  {
    id: "i1",
    title: "The Hidden Cost of 'Consistency'",
    description: "A contrarian take on why blind consistency without strategy is the #1 creator mistake. Use your Negative Shift hook.",
    platform: "LinkedIn",
    estimatedEngagement: "High",
    tags: ["Contrarian", "Framework", "Discipline"],
    basedOn: "Your top 5 LinkedIn posts all challenged conventional wisdom",
  },
  {
    id: "i2",
    title: "My $0 → $100K Content Stack",
    description: "Breakdown of the exact tools, systems, and workflows. Heavy on specifics, light on fluff.",
    platform: "YouTube",
    estimatedEngagement: "Very High",
    tags: ["Tutorial", "Personal", "Systems"],
    basedOn: "Tool-breakdown videos get 3x your average watch time",
  },
  {
    id: "i3",
    title: "3 Frameworks That Changed How I Think",
    description: "Mental models that shaped your content approach. Thread format with visual diagrams.",
    platform: "X / Twitter",
    estimatedEngagement: "High",
    tags: ["Thread", "Framework", "Education"],
    basedOn: "Framework threads are your highest-save content type",
  },
  {
    id: "i4",
    title: "The Creator's Morning (Unfiltered)",
    description: "Raw, behind-the-scenes look at your actual morning. Vulnerability + relatability.",
    platform: "Instagram",
    estimatedEngagement: "Medium-High",
    tags: ["Personal", "Behind-scenes", "Authentic"],
    basedOn: "Personal vulnerability posts drive 2x comment rate",
  },
  {
    id: "i5",
    title: "Why I Almost Quit (And What Changed)",
    description: "Emotional story post about a low point and the system that pulled you through.",
    platform: "LinkedIn",
    estimatedEngagement: "Very High",
    tags: ["Story", "Vulnerability", "Comeback"],
    basedOn: "Comeback narratives are your #1 engagement driver on LinkedIn",
  },
  {
    id: "i6",
    title: "Deconstructing a Viral Post",
    description: "Take one of your best-performing posts and break down exactly why it worked.",
    platform: "X / Twitter",
    estimatedEngagement: "High",
    tags: ["Meta", "Education", "Analysis"],
    basedOn: "Meta-content (content about content) has high save rates in your niche",
  },
];

export interface RepurposeOption {
  id: string;
  from: string;
  to: string;
  fromIcon: string;
  toIcon: string;
  description: string;
  example: string;
}

export const repurposeOptions: RepurposeOption[] = [
  { id: "r1", from: "Tweet", to: "LinkedIn Post", fromIcon: "𝕏", toIcon: "in", description: "Expand your best-performing tweet into a full LinkedIn post with your Problem → Framework structure.", example: "280 chars → 1,200 word deep-dive" },
  { id: "r2", from: "Podcast Episode", to: "Thread", fromIcon: "🎙", toIcon: "𝕏", description: "Extract 5 key insights from your podcast and turn them into a thread with hooks.", example: "45 min audio → 10-tweet thread" },
  { id: "r3", from: "YouTube Video", to: "Blog Post", fromIcon: "▶", toIcon: "✍", description: "Transform your video script into a structured blog post with SEO optimization.", example: "12 min video → 2,000 word article" },
  { id: "r4", from: "Blog Post", to: "Carousel", fromIcon: "✍", toIcon: "📷", description: "Distill your blog into a 10-slide Instagram carousel with key takeaways.", example: "2,000 words → 10 visual slides" },
  { id: "r5", from: "LinkedIn Post", to: "YouTube Script", fromIcon: "in", toIcon: "▶", description: "Turn your high-performing LinkedIn post into a scripted video with B-roll suggestions.", example: "Post → 8 min script + shot list" },
];

export interface TrendItem {
  id: string;
  topic: string;
  platform: string;
  growth: string;
  relevance: number;
  adaptation: string;
  voiceMatch: number;
}

export const trendItems: TrendItem[] = [
  { id: "t1", topic: "AI Agents in Content Creation", platform: "LinkedIn", growth: "+340%", relevance: 92, adaptation: "\"AI isn't replacing creators. It's replacing creators without systems.\" — Your Negative Shift hook applied.", voiceMatch: 95 },
  { id: "t2", topic: "Slow Content Movement", platform: "Instagram", growth: "+180%", relevance: 78, adaptation: "\"Everyone's optimizing for speed. The smartest creators are optimizing for depth.\" — Contrarian positioning.", voiceMatch: 88 },
  { id: "t3", topic: "Building in Public", platform: "X / Twitter", growth: "+220%", relevance: 85, adaptation: "Document your system-building process. Show the architecture, not just the results.", voiceMatch: 91 },
  { id: "t4", topic: "Personal Branding Fatigue", platform: "LinkedIn", growth: "+150%", relevance: 70, adaptation: "\"Personal branding is dead. Personal architecture is what matters.\" — Vocabulary DNA match.", voiceMatch: 86 },
];

// ─── Identity Evolution ─────────────────────────────────────────────────────

export interface EvolutionMilestone {
  id: string;
  date: string;
  type: "style_change" | "growth" | "milestone" | "pivot";
  title: string;
  description: string;
  metric?: string;
}

export const evolutionMilestones: EvolutionMilestone[] = [
  { id: "e1", date: "Jan 2024", type: "milestone", title: "First Video Published", description: "Started with casual vlogs, informal tone, no clear structure.", metric: "147 views" },
  { id: "e2", date: "Mar 2024", type: "style_change", title: "Tone Shift: Casual → Authoritative", description: "After studying top creators, shifted from friendly to stoic-authoritative voice.", metric: "+45% engagement" },
  { id: "e3", date: "May 2024", type: "growth", title: "First 1K Followers", description: "Reached 1,000 followers on YouTube with consistent framework-based content." },
  { id: "e4", date: "Jul 2024", type: "style_change", title: "Hook Pattern Discovered", description: "Started using Negative Shift hooks. Open rate increased dramatically.", metric: "+120% CTR" },
  { id: "e5", date: "Sep 2024", type: "pivot", title: "Multi-Platform Expansion", description: "Expanded from YouTube-only to LinkedIn + X + Instagram. Adapted format per platform." },
  { id: "e6", date: "Nov 2024", type: "growth", title: "10K Total Followers", description: "Hit 10K across all platforms. Thread format became signature on X.", metric: "10,247 followers" },
  { id: "e7", date: "Jan 2025", type: "style_change", title: "Vocabulary Refinement", description: "Introduced signature keywords: Discipline, Architecture, Friction. Created vocabulary DNA.", metric: "+30% brand recall" },
  { id: "e8", date: "Mar 2025", type: "milestone", title: "First Brand Deal", description: "Signed first brand partnership based on authentic voice and audience trust.", metric: "$5K deal" },
  { id: "e9", date: "May 2025", type: "growth", title: "50K Followers", description: "Reached 50K total. Content system fully operational.", metric: "50K followers" },
  { id: "e10", date: "Jun 2025", type: "milestone", title: "MIRROR Initialized", description: "Style DNA captured. AI alter ego ready. The system scales with you." },
];

export const toneEvolutionData = [
  { month: "Jan '24", authority: 25, humor: 60, emotion: 45, formality: 20 },
  { month: "Mar '24", authority: 40, humor: 50, emotion: 50, formality: 35 },
  { month: "May '24", authority: 55, humor: 45, emotion: 55, formality: 45 },
  { month: "Jul '24", authority: 65, humor: 40, emotion: 60, formality: 50 },
  { month: "Sep '24", authority: 72, humor: 38, emotion: 58, formality: 55 },
  { month: "Nov '24", authority: 80, humor: 35, emotion: 65, formality: 60 },
  { month: "Jan '25", authority: 85, humor: 40, emotion: 70, formality: 62 },
  { month: "Mar '25", authority: 88, humor: 42, emotion: 75, formality: 65 },
  { month: "Jun '25", authority: 92, humor: 45, emotion: 85, formality: 68 },
];

export const topicEvolutionData = {
  past: [
    { topic: "Vlogs", value: 35 },
    { topic: "Tutorials", value: 25 },
    { topic: "Motivation", value: 20 },
    { topic: "Reviews", value: 15 },
    { topic: "Other", value: 5 },
  ],
  current: [
    { topic: "Systems & Frameworks", value: 30 },
    { topic: "Motivation", value: 25 },
    { topic: "Creator Economy", value: 20 },
    { topic: "Personal Stories", value: 15 },
    { topic: "AI & Tools", value: 10 },
  ],
};

export const growthMetricsData = {
  audience: { current: 52400, change: "+12.4%", sparkline: [8200, 12500, 18000, 24300, 31000, 38500, 44200, 52400] },
  engagement: { current: 8.7, change: "+2.1%", sparkline: [4.2, 5.1, 5.8, 6.4, 7.0, 7.5, 8.2, 8.7] },
  contentVelocity: { current: 4.2, change: "+0.8/wk", sparkline: [1.5, 2.0, 2.5, 2.8, 3.2, 3.5, 3.8, 4.2] },
  brandScore: { current: 87, change: "+15pts", sparkline: [42, 50, 58, 64, 70, 75, 82, 87] },
};

// ─── Creator Discovery ──────────────────────────────────────────────────────

export interface InterestCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const interestCategories: InterestCategory[] = [
  { id: "motivation", name: "Motivation", emoji: "🔥", color: "from-orange-500/20 to-red-500/20" },
  { id: "productivity", name: "Productivity", emoji: "⚡", color: "from-yellow-500/20 to-amber-500/20" },
  { id: "finance", name: "Finance", emoji: "💰", color: "from-green-500/20 to-emerald-500/20" },
  { id: "coding", name: "Coding", emoji: "💻", color: "from-blue-500/20 to-indigo-500/20" },
  { id: "fitness", name: "Fitness", emoji: "💪", color: "from-red-500/20 to-pink-500/20" },
  { id: "education", name: "Education", emoji: "📚", color: "from-purple-500/20 to-violet-500/20" },
  { id: "storytelling", name: "Storytelling", emoji: "📖", color: "from-cyan-500/20 to-teal-500/20" },
  { id: "design", name: "Design", emoji: "🎨", color: "from-pink-500/20 to-fuchsia-500/20" },
  { id: "marketing", name: "Marketing", emoji: "📢", color: "from-violet-500/20 to-purple-500/20" },
  { id: "leadership", name: "Leadership", emoji: "👑", color: "from-amber-500/20 to-yellow-500/20" },
  { id: "mindfulness", name: "Mindfulness", emoji: "🧘", color: "from-teal-500/20 to-cyan-500/20" },
  { id: "entrepreneurship", name: "Entrepreneurship", emoji: "🚀", color: "from-indigo-500/20 to-blue-500/20" },
];

export interface CreatorArchetype {
  id: string;
  name: string;
  type: string;
  strengths: string[];
  hookStyle: string;
  toneDescription: string;
  sampleLine: string;
  matchScore: number;
}

export const creatorArchetypes: CreatorArchetype[] = [
  {
    id: "c1",
    name: "Creator A",
    type: "High-Energy Speaker",
    strengths: ["Strong emotional hooks", "Personal stories", "Short punchy sentences"],
    hookStyle: "Emotional provocation",
    toneDescription: "Passionate, urgent, empathetic",
    sampleLine: "\"Stop scrolling. This changed my entire life in 30 days.\"",
    matchScore: 85,
  },
  {
    id: "c2",
    name: "Creator B",
    type: "Data-Driven Educator",
    strengths: ["Data-driven content", "Contrarian opinions", "Strong CTAs"],
    hookStyle: "Statistical shock",
    toneDescription: "Analytical, authoritative, slightly provocative",
    sampleLine: "\"97% of creators fail in the first year. Here's what the 3% do differently.\"",
    matchScore: 72,
  },
  {
    id: "c3",
    name: "Creator C",
    type: "Inspirational Storyteller",
    strengths: ["Inspirational storytelling", "Relatable examples", "Positive tone"],
    hookStyle: "Relatable scenario",
    toneDescription: "Warm, encouraging, aspirational",
    sampleLine: "\"Two years ago, I was sitting in a cubicle wondering if this was it. It wasn't.\"",
    matchScore: 78,
  },
];

export interface StyleQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

export const styleQuestions: StyleQuestion[] = [
  {
    id: "q1",
    question: "What topics excite you most?",
    options: [
      { label: "Personal growth & mindset", value: "growth" },
      { label: "Systems & productivity", value: "systems" },
      { label: "Stories & experiences", value: "stories" },
      { label: "Data & analysis", value: "data" },
    ],
  },
  {
    id: "q2",
    question: "How do you prefer to communicate?",
    options: [
      { label: "Introverted — thoughtful, deep", value: "introvert" },
      { label: "Extroverted — energetic, bold", value: "extrovert" },
      { label: "Mix of both", value: "ambivert" },
    ],
  },
  {
    id: "q3",
    question: "What's your style vibe?",
    options: [
      { label: "Serious & authoritative", value: "serious" },
      { label: "Humorous & relatable", value: "humorous" },
      { label: "Balanced — wit with substance", value: "balanced" },
    ],
  },
  {
    id: "q4",
    question: "What's your content goal?",
    options: [
      { label: "Educate — teach frameworks & skills", value: "educational" },
      { label: "Inspire — motivate & empower", value: "inspirational" },
      { label: "Entertain — engage & delight", value: "entertainment" },
      { label: "All of the above", value: "all" },
    ],
  },
];

export interface StyleBlueprintData {
  introStyle: string;
  coreFormat: string;
  endingStyle: string;
  tone: string;
  postLength: string;
  keywords: string[];
  hookType: string;
}

export const generatedBlueprint: StyleBlueprintData = {
  introStyle: "Story-driven introductions",
  coreFormat: "Educational frameworks with real examples",
  endingStyle: "Motivational close with direct CTA",
  tone: "Conversational authority — serious but relatable",
  postLength: "Medium-length posts (800–1,200 words)",
  keywords: ["System", "Framework", "Architecture", "Momentum", "Growth"],
  hookType: "Personal story → Contrarian pivot",
};

export interface RoadmapWeek {
  week: number;
  title: string;
  description: string;
  tasks: string[];
  focus: string;
}

export const growthRoadmap: RoadmapWeek[] = [
  {
    week: 1,
    title: "Learn Hooks",
    description: "Master the art of capturing attention in the first 3 seconds.",
    tasks: ["Study 10 top-performing hooks in your niche", "Write 20 hook variations", "Test 3 hooks on X/Twitter"],
    focus: "Attention",
  },
  {
    week: 2,
    title: "Learn Storytelling",
    description: "Build narrative frameworks that keep audiences engaged.",
    tasks: ["Map your personal story inventory", "Practice the Problem → Story → Framework structure", "Publish 2 story-driven posts"],
    focus: "Narrative",
  },
  {
    week: 3,
    title: "Build Consistency",
    description: "Create a posting system that removes decision fatigue.",
    tasks: ["Set your content calendar (3-5x/week)", "Batch-create content for one week", "Establish your non-negotiable time block"],
    focus: "Systems",
  },
  {
    week: 4,
    title: "Experiment with Formats",
    description: "Discover which formats resonate most with your audience.",
    tasks: ["Try: carousel, thread, short-form video, long post", "Document engagement per format", "Double down on top 2 formats"],
    focus: "Exploration",
  },
  {
    week: 5,
    title: "Analyze Audience Response",
    description: "Let data guide your creative direction.",
    tasks: ["Review analytics across all platforms", "Identify top 3 performing pieces", "Extract patterns from winners"],
    focus: "Analytics",
  },
  {
    week: 6,
    title: "Refine Personal Style",
    description: "Lock in your unique creative identity.",
    tasks: ["Define your 5 signature keywords", "Write your Style DNA statement", "Commit to your voice — stop experimenting, start owning"],
    focus: "Identity",
  },
];

// ─── Source Ingestion ───────────────────────────────────────────────────────

export interface MediaSource {
  id: string;
  type: "text" | "video" | "image";
  platform: string;
  content: string; // The text content or caption
  url?: string; // URL to the media file if it's an image or video
}

export const mockSources: MediaSource[] = [
  {
    id: "src_1",
    type: "text",
    platform: "X / Twitter",
    content: "The biggest lie in content: 'Just post consistently.'\n\nNo. Post consistently with STRUCTURE.\n\nRandom consistency is just noise. Your archive is your compound interest. Build it deliberately.",
  },
  {
    id: "src_2",
    type: "video",
    platform: "YouTube",
    url: "/samples/tech_video.mp4",
    content: "You don't need motivation. Every creator who's ever built something real will tell you the same thing — motivation is a trap. It comes and goes like weather. What you need is architecture. A system so embedded in your day that consistency becomes invisible. Start today. Not tomorrow. Today.",
  },
  {
    id: "src_3",
    type: "image",
    platform: "Instagram",
    url: "/samples/tech_image.png",
    content: "I failed publicly. 147 people watched.\n\nIt was my third video. I forgot my lines. Stumbled through a framework I barely understood. Posted it anyway because 'consistency.'\n\nThat video got 3 likes. One was my mom.\n\nBut here's what that failure built:\n→ Thick skin\n→ A baseline\n→ Proof I could ship imperfect work\n\nYour failure isn't a signal to stop. It's a receipt that you started.",
  }
];
