import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import {
  Sparkle, Fingerprint, Sparkles, Shield, Lightbulb, GitBranch, Compass,
  ArrowRight, Play, Zap, ChevronRight, Check, Send, RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "MIRROR — Your AI Creative Alter Ego" },
        { name: "description", content: "MIRROR learns your unique creator voice, generates content in your style, guards brand consistency, and evolves with you." },
      ],
    }),
    component: LandingPage,
  },
);

/* ─── 3D Tilt Card ─────────────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 22 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Features data ────────────────────────────────────────────────────────── */
const features = [
  {
    icon: Fingerprint, title: "Style DNA Engine", gradient: "from-violet to-fuchsia-500",
    desc: "Extracts your unique creative fingerprint from YouTube, Instagram, X, LinkedIn, blogs, and podcasts.",
    details: ["Vocabulary complexity", "Hook patterns & CTA styles", "Storytelling frameworks", "Audience engagement patterns"],
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    icon: Sparkles, title: "AI Alter Ego", gradient: "from-cyan to-blue-500",
    desc: "Generate content that sounds authentically like you — powered by your Style DNA.",
    details: ["Same prompt, your voice", "RAG-augmented generation", "Pattern-matched output", "Platform-specific adaptation"],
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    icon: Shield, title: "Consistency Guardian", gradient: "from-amber-400 to-orange-500",
    desc: "Prevent content drift. Monitor tone, vocabulary, and structure across all platforms.",
    details: ["Real-time consistency scoring", "Drift detection alerts", "Before/after suggestions", "Content audit trail"],
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    icon: Lightbulb, title: "Block Buster", gradient: "from-pink-500 to-rose-500",
    desc: "Crush creative blocks with AI-powered idea generation and content repurposing.",
    details: ["Ideas from your history", "Cross-platform repurposing", "Trend adaptation", "Voice-preserving transforms"],
    glowColor: "rgba(236, 72, 153, 0.4)"
  },
  {
    icon: GitBranch, title: "Evolution Tracker", gradient: "from-emerald-400 to-teal-500",
    desc: "See how your creative identity evolves over time with data-driven insights.",
    details: ["Tone evolution charts", "Topic shift analysis", "Growth milestones", "Audience response trends"],
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    icon: Compass, title: "Discovery Mode", gradient: "from-violet to-cyan",
    desc: "New to content? Search niches, learn from top creators, and build your unique style from day one.",
    details: ["Niche creator analysis", "Pattern extraction", "Personal style builder", "6-week growth roadmap"],
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
];

const stats = [
  { value: "50M+", label: "Creators worldwide" },
  { value: "94%", label: "Voice match accuracy" },
  { value: "6", label: "Platforms supported" },
  { value: "3s", label: "To generate content" },
];

const samplePrompts = [
  {
    platform: "X / Twitter",
    prompt: "Consistency is crucial",
    generic: "Consistency is key. 🔑 You have to show up every single day to achieve your goals. Don't give up! 💪 #grind #motivation",
    mirror: "Motivation is a trap. You don't need 'drive' — you need systems. The creators who build empires don't rely on mood; they rely on calendar events."
  },
  {
    platform: "LinkedIn",
    prompt: "Why I hate meetings",
    generic: "I believe meetings should be kept short. Let's make sure we respect everyone's time and focus on actionable points. What do you think?",
    mirror: "99% of meetings are just performance art. If it can be a bulleted document, write it. Respect the creative flow, stop scheduled interruptions."
  },
  {
    platform: "YouTube Script Intro",
    prompt: "Today we are building an AI app",
    generic: "Hey guys! Welcome back to the channel. Today we are going to build a really cool AI application. Don't forget to like and subscribe!",
    mirror: "Most coders build apps nobody wants. Today, we are changing that. Let's write the system architecture for a real-time AI twin in under 10 minutes."
  }
];

/* ─── Landing Page ─────────────────────────────────────────────────────────── */
function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [matchingActive, setMatchingActive] = useState(false);
  const [simulationStep, setSimulationStep] = useState<"idle" | "rag" | "done">("idle");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const handleSimulate = () => {
    setMatchingActive(true);
    setSimulationStep("rag");
    setTimeout(() => {
      setSimulationStep("done");
    }, 1800);
  };

  const resetSimulate = () => {
    setMatchingActive(false);
    setSimulationStep("idle");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden relative">
      {/* Grid Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

      {/* ─── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-4 left-4 right-4 max-w-5xl mx-auto rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.55)] backdrop-blur-xl bg-[var(--background)]/80 px-4 z-50 transition-all duration-300">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center group-hover:rotate-12 transition duration-300">
              <Sparkle className="size-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold tracking-wide text-gradient font-display">MIRROR</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: "Interactive Demo", href: "#demo" },
              { label: "Features", href: "#features" },
              { label: "Architecture", href: "#architecture" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-muted-foreground hover:text-white transition duration-300 relative group/link"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover/link:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-white transition duration-300 px-4 py-2 hover:underline decoration-cyan underline-offset-4"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-1 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition duration-300"
            >
              Get Started
              <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={mounted ? { y: heroY, opacity: heroOpacity } : {}}
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 px-6 max-w-7xl mx-auto"
      >
        {/* Floating background lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] size-[500px] rounded-full bg-violet/10 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] size-[500px] rounded-full bg-cyan/10 blur-[120px]" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-muted-foreground">
                <Zap className="size-3.5 text-cyan animate-pulse" />
                <span className="text-white/90 font-medium">Next-Gen Creative Identity RAG</span>
                <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
              >
                Most AI tools
                <br />
                generate content.
                <br />
                <span className="text-gradient">MIRROR generates YOU.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Your AI creative alter ego that analyzes your voice across platforms, extracts your Style DNA, and generates content that sounds unmistakably like you. No generic responses. Just authentic creativity.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4.5 text-base font-bold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                Start Building Your Twin
                <ArrowRight className="size-5 group-hover:translate-x-1.5 transition" />
              </Link>
              <a
                href="#demo"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4.5 text-base font-semibold border border-white/10 bg-white/[0.02] text-foreground/90 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5 transition duration-300"
              >
                <Play className="size-4 text-cyan" /> Try Interactive Demo
              </a>
            </motion.div>
          </div>

          {/* Right: Premium Hologram Visualization */}
          <div className="lg:col-span-5 relative w-full aspect-square max-w-[440px] mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-full relative"
            >
              {/* Outer glowing rings */}
              <div className="absolute inset-0 rounded-full border border-violet/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-cyan/10 animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-10 rounded-full border border-white/5" />

              {/* Scanning visualizer background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-[280px] rounded-full bg-gradient-to-br from-violet/5 to-cyan/5 blur-xl animate-pulse" />
              </div>

              {/* Glowing core and hologram box */}
              <div className="absolute inset-0 flex items-center justify-center">
                <TiltCard className="perspective-[1000px] size-[320px]">
                  <div className="w-full h-full glass rounded-3xl p-6 border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                    <div className="absolute inset-0 bg-neutral-950/20" />
                    
                    {/* Laser scan line */}
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60 z-20"
                    />

                    {/* Top status bar */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-cyan animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-cyan uppercase font-bold">DNA Scanner Active</span>
                      </div>
                      <span className="text-[9px] font-mono text-white/40">ID: TWIN-889X</span>
                    </div>

                    {/* Scanning Matrix Double Helix simulation */}
                    <div className="relative z-10 flex-1 flex items-center justify-center py-4">
                      <div className="w-full h-32 relative flex items-center justify-center gap-1">
                        {Array.from({ length: 18 }).map((_, i) => {
                          const delay = i * 0.12;
                          return (
                            <div key={i} className="flex flex-col items-center justify-between h-full">
                              <motion.div
                                animate={{
                                  y: [0, 45, 0],
                                  scale: [0.8, 1.2, 0.8],
                                  backgroundColor: ["#8B5CF6", "#06B6D4", "#8B5CF6"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                                className="size-2 rounded-full shadow-[0_0_8px_currentColor]"
                              />
                              {/* Connecting lines */}
                              <motion.div 
                                animate={{ opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                                className="w-[1px] flex-1 bg-white/10" 
                              />
                              <motion.div
                                animate={{
                                  y: [0, -45, 0],
                                  scale: [1.2, 0.8, 1.2],
                                  backgroundColor: ["#06B6D4", "#8B5CF6", "#06B6D4"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
                                className="size-2 rounded-full shadow-[0_0_8px_currentColor]"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hologram details footer */}
                    <div className="relative z-10 flex items-end justify-between">
                      <div className="space-y-1">
                        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Voice match accuracy</div>
                        <div className="text-lg font-bold text-gradient">94.8% Verified</div>
                      </div>
                      <div className="flex gap-1.5 h-6 items-end">
                        {[0.6, 0.9, 0.4, 0.8, 0.3, 0.7, 0.5, 0.9].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                            transition={{ duration: 1.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[3px] bg-gradient-to-t from-violet to-cyan rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── Stats bar ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-y border-white/5 bg-white/[0.01] backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-10 text-center ${i > 0 ? "md:border-l border-white/5" : ""}`}>
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── Interactive Sandbox Preview ─────────────────────────────────── */}
      <section id="demo" className="py-28 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan mb-3">Live Simulation</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Watch your voice <span className="text-gradient">replicated in real-time</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Select a prompt category below to see the contrast between standard Claude output and MIRROR's customized DNA output.
            </p>
          </motion.div>

          <TiltCard className="perspective-[1500px]">
            <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border-white/10">
              <div className="absolute -top-32 -right-32 size-80 rounded-full bg-violet/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-cyan/5 blur-3xl" />

              {/* Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 bg-neutral-900/60 p-1.5 rounded-2xl border border-white/5 w-fit">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={p.platform}
                    onClick={() => {
                      setSelectedPromptIdx(idx);
                      resetSimulate();
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${selectedPromptIdx === idx ? "bg-gradient-to-r from-violet to-cyan text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {p.platform}
                  </button>
                ))}
              </div>

              {/* Simulation Screen */}
              <div className="space-y-6">
                <div className="bg-neutral-950/80 rounded-2xl border border-white/5 p-5">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">System Prompt Input</div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-white flex-1">{samplePrompts[selectedPromptIdx].prompt}</div>
                    {simulationStep === "idle" ? (
                      <button
                        onClick={handleSimulate}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet text-white glow-violet hover:-translate-y-0.5 transition"
                      >
                        <Send className="size-3.5" /> Match DNA
                      </button>
                    ) : (
                      <button
                        onClick={resetSimulate}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:bg-white/5 text-muted-foreground transition"
                      >
                        <RotateCcw className="size-3.5" /> Reset
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Generic */}
                  <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.01] p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-red-500/10 text-red-400 text-[9px] font-extrabold uppercase tracking-widest rounded-bl-xl border-l border-b border-red-500/10">
                      Generic Claude Output
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-4 flex items-center gap-2">
                      <div className="size-2 rounded-full bg-red-500" /> Default LLM
                    </div>
                    <div className="text-sm text-foreground/50 leading-relaxed min-h-[100px] flex items-center">
                      {samplePrompts[selectedPromptIdx].generic}
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-red-400/60 font-medium">
                      ❌ Overuses generic buzzwords & hashtags
                    </div>
                  </div>

                  {/* Right Column: Mirror */}
                  <div className={`rounded-2xl border ${simulationStep === "done" ? "border-cyan/30 bg-cyan/[0.02] glow-cyan" : "border-white/5 bg-white/[0.01]"} p-5 relative transition-all duration-500 overflow-hidden`}>
                    <div className="absolute top-0 right-0 px-3 py-1 bg-cyan/15 text-cyan text-[9px] font-extrabold uppercase tracking-widest rounded-bl-xl border-l border-b border-cyan/10">
                      Mirror Twin Output
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-cyan font-semibold mb-4 flex items-center gap-2">
                      <div className={`size-2 rounded-full ${simulationStep === "rag" ? "bg-violet animate-pulse" : "bg-cyan"}`} /> 
                      {simulationStep === "idle" && "DNA Seed Offline"}
                      {simulationStep === "rag" && "RAG Extraction in Progress..."}
                      {simulationStep === "done" && "Identity Replicated!"}
                    </div>

                    <div className="text-sm text-foreground/90 leading-relaxed min-h-[100px] flex items-center relative">
                      {simulationStep === "idle" && (
                        <div className="text-xs text-muted-foreground/60 italic text-center w-full">
                          Click "Match DNA" above to deploy your Alter Ego.
                        </div>
                      )}

                      {simulationStep === "rag" && (
                        <div className="flex flex-col items-center justify-center gap-3 w-full">
                          <div className="size-6 border-2 border-violet border-t-transparent rounded-full animate-spin" />
                          <div className="text-xs text-violet font-medium animate-pulse">Running embedding lookup & style matching...</div>
                        </div>
                      )}

                      {simulationStep === "done" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {samplePrompts[selectedPromptIdx].mirror}
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-cyan/70 font-semibold flex items-center gap-1">
                      {simulationStep === "done" && (
                        <>
                          <Check className="size-3 text-cyan" /> 97% voice match score
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6 relative border-t border-white/5 bg-neutral-950/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan mb-3">Modular Design</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Six modules. One <span className="text-gradient">creative twin</span>.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <TiltCard className="h-full perspective-[800px]">
                    <div className="h-full glass rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition duration-300">
                      <div className="absolute -top-16 -right-16 size-40 rounded-full blur-3xl group-hover:bg-violet/10 transition duration-500" style={{ backgroundColor: f.glowColor }} />
                      <div className="relative" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
                        <div className={`size-12 grid place-items-center rounded-2xl bg-gradient-to-br ${f.gradient} mb-5 shadow-lg`}>
                          <Icon className="size-5.5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold mb-2.5 text-white">{f.title}</h3>
                        <p className="text-xs leading-relaxed text-muted-foreground mb-5">{f.desc}</p>
                        <div className="space-y-2 border-t border-white/5 pt-4">
                          {f.details.map((d) => (
                            <div key={d} className="flex items-center gap-2 text-[11px] text-foreground/75">
                              <ChevronRight className="size-3 text-cyan shrink-0" />
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Architecture ────────────────────────────────────────────────── */}
      <section id="architecture" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan mb-3">Pipeline Flow</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Under the Hood of <span className="text-gradient">Style DNA</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="perspective-[1000px]">
              <div className="glass rounded-3xl p-8 relative overflow-hidden border-white/10">
                <div className="absolute -top-32 -left-32 size-72 rounded-full bg-cyan/10 blur-3xl" />
                <div className="relative space-y-4">
                  {[
                    { step: "01", label: "Multi-Source Ingestion", desc: "YouTube transcripts, Instagram posts, X threads, newsletters, and podcasts are ingested safely.", color: "border-violet/20 bg-violet/5" },
                    { step: "02", label: "Semantic Embedding", desc: "Texts are chunked, tokenized, and embedded into high-dimensional vector spaces.", color: "border-cyan/20 bg-cyan/5" },
                    { step: "03", label: "Stylistic Factorization", desc: "We run style classification algorithms for structure, cadence, vocabulary, and brand themes.", color: "border-violet/20 bg-violet/5" },
                    { step: "04", label: "DNA Profile Synthesis", desc: "The extracted weights are synthesized into a custom JSON-based DNA Profile vector.", color: "border-cyan/20 bg-cyan/5" },
                    { step: "05", label: "RAG Generation Core", desc: "User inputs trigger a prompt-tuning pipeline that merges Style DNA vectors to generate your alter ego.", color: "border-violet/20 bg-violet/5" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border ${s.color} p-4 sm:p-5`}
                    >
                      <div className="text-2xl font-extrabold text-gradient shrink-0 w-8">{s.step}</div>
                      <div className="hidden sm:block h-10 w-px bg-white/10" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white mb-0.5">{s.label}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TiltCard className="perspective-[1500px] w-full">
              <div className="w-full glass rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden border border-white/10 text-center shadow-2xl">
                {/* Background glowing effects */}
                <div className="absolute inset-0 bg-neutral-950/45 pointer-events-none z-0" />
                <div className="absolute -top-40 -left-40 size-[320px] rounded-full bg-violet/10 blur-[90px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 size-[320px] rounded-full bg-cyan/10 blur-[90px] pointer-events-none" />
                
                {/* Concentric scan target graphics */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] rounded-full border border-white/[0.02] pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] rounded-full border border-white/[0.03] pointer-events-none z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[150px] rounded-full border border-white/[0.04] pointer-events-none z-0" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] uppercase tracking-widest text-cyan font-bold">
                    <Sparkle className="size-3 text-cyan animate-pulse" />
                    Connect Your Platforms
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                    Ready to meet
                    <br />
                    <span className="text-gradient">your creative twin?</span>
                  </h2>
                  
                  <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Join 50M+ creators who scale content across channels without losing their authentic voice. Seed your twin in 3 minutes.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/signup"
                      className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl px-10 py-5 text-base font-extrabold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(139,92,246,0.55)] transition-all duration-300 w-full sm:w-auto"
                    >
                      Get Started — It's Free
                      <ArrowRight className="size-5 group-hover:translate-x-1.5 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6 bg-neutral-950/60 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="size-7.5 rounded-lg bg-gradient-to-br from-violet to-cyan grid place-items-center">
              <Sparkle className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-wide text-gradient">MIRROR</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2025 MIRROR. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
