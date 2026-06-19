import { motion } from "framer-motion";
import { generatedBlueprint } from "@/lib/mock-data";
import { Dna, BookOpen, Mic, Target, MessageSquare, Ruler, Sparkles, ArrowRight, Hash } from "lucide-react";

interface Props {
  onContinue: () => void;
}

const blueprintItems = [
  { label: "Intro Style", value: generatedBlueprint.introStyle, icon: BookOpen },
  { label: "Core Format", value: generatedBlueprint.coreFormat, icon: Ruler },
  { label: "Ending Style", value: generatedBlueprint.endingStyle, icon: Target },
  { label: "Tone", value: generatedBlueprint.tone, icon: Mic },
  { label: "Post Length", value: generatedBlueprint.postLength, icon: MessageSquare },
  { label: "Hook Type", value: generatedBlueprint.hookType, icon: Sparkles },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

export function StyleBlueprint({ onContinue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Step 5 of 6</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Your <span className="text-gradient">Style Blueprint</span>
        </h2>
        <p className="text-sm text-muted-foreground">This is your unique creative DNA — the foundation of your content identity.</p>
      </div>

      {/* Blueprint card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass rounded-2xl p-8 relative overflow-hidden glow-violet mb-6"
      >
        <div className="absolute -top-32 -right-32 size-72 rounded-full bg-violet/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-56 rounded-full bg-cyan/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-12 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center">
              <Dna className="size-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Your Suggested Style Blueprint</div>
              <div className="text-xs text-muted-foreground">Personalized for your creative identity</div>
            </div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {blueprintItems.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.label} variants={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="size-4 text-violet" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{b.label}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground/90">{b.value}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Keywords */}
          <div className="rounded-xl bg-gradient-to-br from-violet/8 to-cyan/5 border border-violet/15 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="size-4 text-cyan" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Signature Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {generatedBlueprint.keywords.map((k) => (
                <span key={k} className="px-3 py-1.5 text-xs rounded-full border border-violet/30 bg-violet/10 text-foreground/90 font-medium">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition"
        >
          See My Growth Roadmap <ArrowRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}
