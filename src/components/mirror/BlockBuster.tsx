import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lightbulb, Sparkles, ArrowRight, TrendingUp, Repeat, Flame, Zap, RefreshCcw, Wand2 } from "lucide-react";
import { ideaSuggestions, repurposeOptions, trendItems } from "@/lib/mock-data";
import { generateIdeasFn } from "@/api/blockbuster";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

type Tab = "ideas" | "repurpose" | "trends";

interface IdeaItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  estimatedEngagement: string;
  tags: string[];
  basedOn: string;
}

const engagementColors: Record<string, string> = {
  "Very High": "text-cyan bg-cyan/15",
  "High": "text-violet bg-violet/15",
  "Medium-High": "text-yellow-400 bg-yellow-400/15",
  "Medium": "text-muted-foreground bg-white/10",
};

export function BlockBuster() {
  const [activeTab, setActiveTab] = useState<Tab>("ideas");
  const [selectedRepurpose, setSelectedRepurpose] = useState<string | null>(null);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  
  // AI idea generation state
  const [aiIdeas, setAiIdeas] = useState<IdeaItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const tabs = [
    { id: "ideas" as const, label: "Idea Generator", icon: Lightbulb },
    { id: "repurpose" as const, label: "Repurposer", icon: Repeat },
    { id: "trends" as const, label: "Trend Adapter", icon: TrendingUp },
  ];

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    try {
      const result = await generateIdeasFn({ data: { niche: undefined } });
      if (result.success) {
        setAiIdeas(result.ideas);
        setHasGenerated(true);
      }
    } catch (e) {
      console.error("Failed to generate ideas:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Show AI ideas if generated, otherwise show mock data
  const displayedIdeas: IdeaItem[] = hasGenerated ? aiIdeas : ideaSuggestions;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-cyan mb-3">
          <Flame className="size-3.5" /> Creative Block Buster
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Crush <span className="text-gradient">Creative Blocks</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Ideas, repurposing, and trends — all tuned to your Style DNA.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === t.id
                  ? "glass glow-violet text-foreground"
                  : "border border-white/8 bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/15"
              }`}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          );
        })}
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "ideas" && (
          <motion.div key="ideas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            {/* AI Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 grid place-items-center rounded-xl bg-gradient-to-br from-violet to-cyan shrink-0">
                    <Wand2 className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {hasGenerated ? "AI-Generated Ideas" : "Generate Ideas with AI"}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {hasGenerated
                        ? `${aiIdeas.length} personalized ideas from your Style DNA`
                        : "Use Gemini AI to generate content ideas tailored to your Style DNA"
                      }
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition disabled:opacity-50 disabled:translate-y-0 shrink-0"
                >
                  {isGenerating ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating…
                    </>
                  ) : hasGenerated ? (
                    <>
                      <RefreshCcw className="size-4" /> Regenerate
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Generate with AI
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Loading State */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="relative mx-auto size-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/30 to-cyan/20 blur-xl animate-pulse" />
                  <div className="absolute inset-2 rounded-full border-2 border-violet/40 animate-[spin_3s_linear_infinite]" />
                  <div className="absolute inset-5 rounded-full border-2 border-cyan/40 animate-[spin_2s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Sparkles className="size-6 text-cyan" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground animate-pulse">
                  Analyzing your Style DNA and generating ideas…
                </div>
                <div className="text-[11px] text-muted-foreground/60 mt-2">
                  Powered by Google Gemini
                </div>
              </motion.div>
            )}

            {/* Ideas Grid */}
            {!isGenerating && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedIdeas.map((idea, idx) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="glass rounded-xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform flex flex-col"
                  >
                    <div className="absolute -top-12 -right-12 size-28 rounded-full bg-violet/8 blur-2xl" />
                    {/* AI badge */}
                    {hasGenerated && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan/15 text-cyan font-bold uppercase tracking-wider">
                          AI
                        </span>
                      </div>
                    )}
                    <div className="relative flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[9px] px-2 py-1 rounded-full font-medium ${engagementColors[idea.estimatedEngagement] || engagementColors["Medium"]}`}>
                          {idea.estimatedEngagement}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{idea.platform}</span>
                      </div>
                      <div className="text-sm font-semibold mb-2">{idea.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed mb-3">{idea.description}</div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {idea.tags.map((t) => (
                          <span key={t} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <div className="text-[10px] text-violet/80 italic">
                        <Sparkles className="size-3 inline mr-1" />
                        {idea.basedOn}
                      </div>
                    </div>
                    <button
                      onClick={() => setDraftingId(draftingId === idea.id ? null : idea.id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-violet/30 text-xs font-medium text-violet hover:bg-violet/10 transition"
                    >
                      {draftingId === idea.id ? (
                        <>
                          <div className="size-3.5 border-2 border-violet/30 border-t-violet rounded-full animate-spin" /> Drafting…
                        </>
                      ) : (
                        <>
                          <Zap className="size-3.5" /> Draft it
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "repurpose" && (
          <motion.div key="repurpose" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div className="space-y-3">
              {repurposeOptions.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedRepurpose(selectedRepurpose === r.id ? null : r.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="size-10 grid place-items-center rounded-lg bg-white/5 text-lg">{r.fromIcon}</div>
                      <ArrowRight className="size-4 text-violet" />
                      <div className="size-10 grid place-items-center rounded-lg bg-violet/15 text-lg">{r.toIcon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{r.from} → {r.to}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{r.description}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{r.example}</span>
                  </button>
                  <AnimatePresence>
                    {selectedRepurpose === r.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4">
                          <div className="rounded-lg border border-violet/20 bg-violet/5 p-4 mb-3">
                            <div className="text-xs text-foreground/80 mb-2">{r.description}</div>
                            <div className="flex items-center gap-3">
                              <div className="h-px flex-1 bg-gradient-to-r from-violet/50 to-cyan/50" />
                              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Style DNA preserved</div>
                              <div className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-violet/50" />
                            </div>
                          </div>
                          <button className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-violet to-cyan text-white font-medium hover:-translate-y-0.5 transition">
                            Start Repurposing
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "trends" && (
          <motion.div key="trends" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div className="space-y-4">
              {trendItems.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass rounded-xl p-5 relative overflow-hidden hover:-translate-y-0.5 transition-transform"
                >
                  <div className="absolute -top-16 -right-16 size-40 rounded-full bg-violet/8 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="size-4 text-cyan" />
                          <span className="text-sm font-semibold">{t.topic}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan/15 text-cyan font-medium">{t.growth}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">{t.platform}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gradient">{t.voiceMatch}%</div>
                        <div className="text-[9px] text-muted-foreground">Voice Match</div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gradient-to-br from-violet/8 to-cyan/5 border border-violet/15 p-3 mb-3">
                      <div className="text-[9px] uppercase tracking-widest text-violet mb-1">Your Adaptation</div>
                      <div className="text-xs text-foreground/90 italic leading-relaxed">{t.adaptation}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] text-muted-foreground">Relevance:</div>
                        <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-violet to-cyan" style={{ width: `${t.relevance}%` }} />
                        </div>
                        <span className="text-[10px] text-foreground/70">{t.relevance}%</span>
                      </div>
                      <button className="text-xs px-3 py-1.5 rounded-lg border border-violet/30 text-violet hover:bg-violet/10 transition flex items-center gap-1">
                        <Sparkles className="size-3" /> Adapt
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
